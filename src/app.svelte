<script>
  import Bookmarks from "$lib/components/bookmarks.svelte";
  import Header from "$lib/components/header.svelte";
  import Lambdas from "$lib/components/lambdas.svelte";
  import Settings from "$lib/components/settings.svelte";
  import Widgets from "$lib/components/widgets.svelte";
  import { selectedPage } from "$lib/stores/main";
</script>

<div class="app-wrapper">
  <Bookmarks />
  <Lambdas />
  <Widgets />
  <div class="app-bottom-wrapper">
    <Header />
    {#if $selectedPage === "settings"}
      <Settings />
    {/if}
  </div>
</div>

<style>
  .app-wrapper {
    flex: 1;
    min-height: 0;
    overflow: auto;
    background-color: #222;
    display: flex;
    flex-direction: column;
  }

  .app-bottom-wrapper {
    position: sticky;
    bottom: 0;
    backdrop-filter: blur(100px);
    background: rgba(0, 0, 0, 1);
  }
</style>
