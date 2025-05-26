<script lang="ts">
  import type { ILambda } from "$lib/interfaces/Lambda";
  import { next } from "$lib/util/common";
  import { getLambdas } from "$lib/util/lambdas";
  import { onMount } from "svelte";
  import { writable } from "svelte/store";

  let lambdas: ILambda[] = [];
  const results = writable<Array<any>>([]);

  onMount(async () => {
    const lambdaModules = await getLambdas();
    if (lambdaModules) {
      const hasLambdas = Array.isArray(lambdaModules) ? lambdaModules.length > 0 : false;
      if (hasLambdas) {
        const lambdasCollection = [];
        for (const lambdaModule of lambdaModules) {
          lambdasCollection.push({
            ...lambdaModule,
            result: writable(""),
          });
        }
        lambdas = lambdasCollection;
        runLambdas(lambdas);
      }
    }
  });

  async function runLambdas(lambdas: ILambda[]) {
    const hasLambdas = Array.isArray(lambdas) ? lambdas.length > 0 : false;
    if (hasLambdas)
      for (const [index, lambda] of Object.entries(lambdas)) runLambda(lambda, Number(index));
  }

  async function runLambda(lambda: ILambda, index: number) {
    next(async () => {
      if (lambda.action && typeof lambda.action === "function") {
        const updateFn = (v: any) => {
          results.update((r) => {
            r[index] = v;
            return r;
          });
        };
        const result = await lambda.action(updateFn);
        if (result) updateFn(result);
      }
    });
  }
</script>

{#if lambdas.length > 0}
  <div class="lambdas-container">
    {#each lambdas as lambda, index (index)}
      <div class="lambda">
        <div class="lambda-title">
          {lambda.prompt}:
          <span class="lambda-result">{$results[index] ?? "..."}</span>
        </div>
      </div>
    {/each}
  </div>
{/if}

<style>
  .lambdas-container {
    display: flex;
    flex-direction: column;
    padding: 16px;
    gap: 16px;
    padding-top: 0;
  }

  .lambda {
    background-color: #111;
    color: #fff;
    padding: 16px;
    border-radius: 16px;
  }
</style>
