import type { ILambda } from "$lib/interfaces/Lambda";
import { writable } from "svelte/store";
import { next } from "./common";

export async function getLambdas() {
  const basePath = import.meta.env.MODE === "production" ? "/bk" : "";
  const lambdasFolder = basePath + "/lambdas";
  try {
    const lambdasFolderIndexModule = await fetch(lambdasFolder + "/index.json");
    if (lambdasFolderIndexModule) {
      let lambdasIndex = await lambdasFolderIndexModule.json();
      lambdasIndex = lambdasIndex.filter((l: string) => !!l);
      const hasLambdasIndex = Array.isArray(lambdasIndex) ? lambdasIndex.length > 0 : false;
      if (hasLambdasIndex) {
        const lambdaFileFetchPromises = lambdasIndex.map(
          (lambdaFileName: string) =>
            import(/* @vite-ignore */ lambdasFolder + "/" + lambdaFileName + ".lambda.js")
        );
        return await Promise.all(lambdaFileFetchPromises);
      }
    }
  } catch (err) {
    console.error("lambdas folder or lambdas/index.json not found. Error:", err);
  }
}

export async function runLambdas(lambdas: ILambda[]) {
  const hasLambdas = Array.isArray(lambdas) ? lambdas.length > 0 : false;
  if (hasLambdas) {
    for (const [index, lambda] of Object.entries(lambdas)) {
      runLambda(lambda, Number(index));
    }
  }
}

export const lambdaResults = writable<Array<any>>([]);

export async function runLambda(lambda: ILambda, index: number) {
  next(async () => {
    if (lambda.action && typeof lambda.action === "function") {
      const updateFn = (v: any) => {
        lambdaResults.update((currentArr) => {
          currentArr[index] = v;
          return currentArr;
        });
      };
      const result = await lambda.action(updateFn);
      const isValue = ["string", "number", "boolean"].includes(typeof result);
      const isObject = typeof result === "object";
      const isFunc = typeof result === "function";
      if (result) {
        if (isValue) updateFn(result);
        else if (isObject) {
          const isArray = Array.isArray(result);
          if (isArray) {
            updateFn(result.join(","));
          } else updateFn(JSON.stringify(result));
        } else if (isFunc) {
          const repeatedFn = () => {
            let tmr1 = setTimeout(() => {
              clearTimeout(tmr1);
              result(updateFn);
              repeatedFn();
            }, lambda.CONFIG_ACTION_DELAY || 1000);
          };
          repeatedFn();
        }
      }
    }
  });
}
