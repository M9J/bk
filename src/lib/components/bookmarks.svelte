<script lang="ts">
  import type { IBookmark } from "$lib/interfaces/Bookmark";
  import { getBookmarksConfigs, getFaviconsLinks } from "$lib/util/bookmarks";
  import { onMount } from "svelte";
  import Bookmark from "./bookmark.svelte";

  let allBookmarksConfigs: IBookmark[] = [];
  let allFaviconLinks: any = {};
  async function getBookmarks() {
    const bookmarksConfigs = await getBookmarksConfigs();
    if (bookmarksConfigs) {
      const sortedBookmarks = bookmarksConfigs.sort((a, b) => a.NAME.localeCompare(b.NAME));
      allBookmarksConfigs = sortedBookmarks;
    }
  }
  onMount(async () => {
    await getBookmarks();
    const faviconLinks = await getFaviconsLinks(allBookmarksConfigs);
    if (faviconLinks) allFaviconLinks = faviconLinks;
  });
</script>

<div class="bk-wrapper">
  <div class="bk-container">
    {#each allBookmarksConfigs as bookmarkConfig}
      {#if bookmarkConfig.bookmarkIndexName}
        <Bookmark
          bookmark={bookmarkConfig}
          faviconLink={allFaviconLinks[bookmarkConfig.bookmarkIndexName]}
        />
      {/if}
    {/each}
  </div>
</div>

<style>
  .bk-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .bk-container {
    flex: 1;
    gap: 16px;
    padding: 16px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    grid-auto-rows: min-content;
  }
</style>
