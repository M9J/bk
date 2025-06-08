<script>
  import { isGranted } from "$lib/util/access";
  import App from "../app.svelte";
</script>

{#await isGranted()}
  <div class="message"></div>
{:then isAccessible}
  {#if isAccessible}
    <App />
  {:else}
    <div class="message">Access: 401 Unauthorized</div>
  {/if}
{:catch error}
  <div class="message">Access: ERROR: {error}</div>
{/await}

<style>
  .message {
    flex: 1;
    background-color: #222;
    color: white;
    padding: 16px;
  }
</style>
