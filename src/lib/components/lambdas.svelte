<script lang="ts">
  import type { ILambda } from "$lib/interfaces/Lambda";
  import { getLambdas, runLambdas, lambdaResults } from "$lib/util/lambdas";
  import { onMount } from "svelte";
  import { writable } from "svelte/store";

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
