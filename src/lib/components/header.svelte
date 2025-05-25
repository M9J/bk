<script lang="ts">
  import { selectedPage } from "$lib/stores/main";

  const brandTitle = "BOOKMARKS";
  const brandLink = "https://m9j.github.io/bk";
</script>

<div class="header">
  <a class="brand" href={brandLink}>{brandTitle}</a>
  <select class="view-list" id="view-list" bind:value={$selectedPage}>
    <option value="home">Home</option>
    <option value="settings">Settings</option>
  </select>
</div>
{#if $selectedPage !== "home"}
  <hr class="separator" />
{/if}

<style>
  .header {
    padding: 16px;
    color: #fff;
    justify-content: space-between;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .brand {
    font-weight: 100;
    letter-spacing: 2px;
    text-decoration: none;
    color: #fff;
  }

  .view-list {
    padding: 8px;
  }

  .separator {
    border-bottom: 1px solid #fff;
    border-top: 1px solid #000;
    height: 0px;
    opacity: 0.1;
  }
</style>
