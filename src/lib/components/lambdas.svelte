<script lang="ts">
  import type { ILambda } from "$lib/interfaces/Lambda";
  import { getLambdas, lambdaResults, runLambdas } from "$lib/util/lambdas";
  import { onMount } from "svelte";

  let lambdas: ILambda[] = [];
  const results = lambdaResults;

  onMount(async () => {
    const lambdaModules = await getLambdas();
    if (lambdaModules) {
      const hasLambdas = Array.isArray(lambdaModules) ? lambdaModules.length > 0 : false;
      if (hasLambdas) {
        lambdas = lambdaModules;
        runLambdas(lambdas);
      }
    }
  });
</script>

{#if lambdas.length > 0}
  <div class="lambdas-container">
    {#each lambdas as lambda, index (index)}
      <div class="lambda">
        <div class="lambda-title">
          {lambda.prompt}:&nbsp;
        </div>
        <p class="lambda-result">{$results[index] ?? "..."}</p>
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
    display: flex;
    flex-direction: column;
  }

  .lambda-result {
    white-space: pre-line;
    font-size: 150%;
  }
</style>
