<script>
  import { selectedPage } from "$lib/stores/main";

  let brandTitle = "BOOKMARKS";
</script>

<div class="header">
  <a class="brand" href="https://m9j.github.io/bookmarks">{brandTitle}</a>
  <select class="view-list" id="view-list" bind:value={$selectedPage}>
    <option value="home">Home</option>
    <option value="settings">Settings</option>
  </select>
</div>

<style>
  .header {
    padding: 16px;
    background-color: #000;
    color: #fff;
    justify-content: space-between;
    display: flex;
    flex-direction: row;
    align-items: center;
    border-top: 8px solid red;
  }

  .brand {
    font-weight: 100;
    letter-spacing: 2px;
    text-decoration: none;
    color: #fff;
  }
</style>
