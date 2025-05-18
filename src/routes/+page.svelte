<script>
  import Bookmarks from "$lib/components/bookmarks.svelte";
  import Header from "$lib/components/header.svelte";
  import Settings from "$lib/components/settings.svelte";
  import { selectedPage } from "$lib/stores/main";
</script>

<Bookmarks />
<Header />
{#if $selectedPage === "settings"}
  <Settings />
{/if}
