import type { ILambda } from "$lib/interfaces/Lambda";

export async function getLambdas() {
  const basePath = import.meta.env.MODE === "production" ? "/bk" : "";
  const lambdasFolder = basePath + "/lambdas";
  try {
    const lambdasFolderIndexModule = await fetch(lambdasFolder + "/index.json");
    if (lambdasFolderIndexModule) {
      const lambdasIndex = await lambdasFolderIndexModule.json();
      const hasLambdasIndex = Array.isArray(lambdasIndex) ? lambdasIndex.length > 0 : false;
      if (hasLambdasIndex) {
        const sortedLambdaIndex = lambdasIndex.sort();
        const lambdaFileFetchPromises = sortedLambdaIndex.map((lambdaFileName: string) =>
          fetch(lambdasFolder + "/" + lambdaFileName + ".json")
            .then((res) => res.json())
            .then((res) => {
              res.lambdaIndexName = lambdaFileName;
              return res;
            })
        );
        return await Promise.all(lambdaFileFetchPromises);
      }
    }
  } catch (err) {
    console.error("lambdas folder or lambdas/index.json not found. Error:", err);
  }
}

export async function runLambda(lambdaFile: ILambda) {
  if (lambdaFile) {
    
  }
}
