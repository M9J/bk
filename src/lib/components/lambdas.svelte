<script lang="ts">
  import type { ILambda } from "$lib/interfaces/Lambda";
  import { getLambdas } from "$lib/util/lambdas";
  import { onMount } from "svelte";

  let lambdas: ILambda[] = [];
  onMount(async () => {
    const lambdaModules = await getLambdas();
    if (lambdaModules) {
      console.log("lambdaModules", lambdaModules);
      const hasLambdas = Array.isArray(lambdaModules) ? lambdaModules.length > 0 : false;
      if (hasLambdas) {
        for (let i = 0; i < 2; i++) lambdaModules.push(...lambdaModules);
        const lambdasCollection = [];
        for (const lambdaModule of lambdaModules) {
          lambdasCollection.push({
            ...lambdaModule,
            result: null,
          });
        }
        lambdas = lambdasCollection;
        runLambdas(lambdas);
      }
    }
  });

  async function runLambdas(lambdas: ILambda[]) {
    const hasLambdas = Array.isArray(lambdas) ? lambdas.length > 0 : false;
    if (hasLambdas) {
      for (const lambda of lambdas) {
        runLambda(lambda);
      }
    }
  }

  async function runLambda(lambda: ILambda) {
    if (lambda.action && typeof lambda.action === "function") {
      lambda.result = lambda.action();
    }
  }
</script>

{#if lambdas.length > 0}
  <div class="lambdas-container">
    {#each lambdas as lambda}
      <div class="lambda">
        <div class="lambda-title">
          {lambda.prompt}: <span class="lambda-result">{lambda.result}</span>
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
