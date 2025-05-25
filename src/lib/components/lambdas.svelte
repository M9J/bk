<script lang="ts">
  import type { ILambda } from "$lib/interfaces/Lambda";
  import { getLambdas } from "$lib/util/lambdas";
  import { onMount } from "svelte";

  let lambdas: ILambda[] = [];
  onMount(async () => {
    const lambdaModules = await getLambdas();
    if (lambdaModules) {
      const extractedLambdas = lambdaModules.map((lp) => lp.default);
      const hasLambdas = Array.isArray(extractedLambdas) ? extractedLambdas.length > 0 : false;
      if (hasLambdas) {
        lambdas = extractedLambdas;
        lambdas.forEach((l: ILambda) => {
          if (!l.result && l.action && typeof l.action === "function") l.result = l.action();
        });
      }
    }
  });
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
