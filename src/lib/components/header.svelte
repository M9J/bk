<script>
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

<style>
  .header {
    padding: 16px;
    color: #fff;
    justify-content: space-between;
    display: flex;
    flex-direction: row;
    align-items: center;
    border-top: 1px solid #222;
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
</style>
