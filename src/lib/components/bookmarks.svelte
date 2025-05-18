<script lang="ts">
  import type { IBookmark } from "$lib/interfaces/Bookmark";
  import { getBookmarksConfigs, getFaviconsLinks } from "$lib/util/bookmarks";
  import { onMount } from "svelte";
  import Bookmark from "./bookmark.svelte";

  let allBookmarksConfigs: IBookmark[] = [];
  let allFaviconLinks: any = {};
  async function getBookmarks() {
    const bookmarksConfigs = await getBookmarksConfigs();
    if (bookmarksConfigs) allBookmarksConfigs = bookmarksConfigs;
  }
  onMount(async () => {
    await getBookmarks();
    const faviconLinks = await getFaviconsLinks(allBookmarksConfigs);
    if (faviconLinks) allFaviconLinks = faviconLinks;
  });
</script>

<div class="bookmark-container" id="bookmark-container">
  {#each allBookmarksConfigs as bookmarkConfig}
    {#if bookmarkConfig.bookmarkIndexName}
      <Bookmark
        bookmark={bookmarkConfig}
        faviconLink={allFaviconLinks[bookmarkConfig.bookmarkIndexName]}
      />
    {/if}
  {/each}
</div>

<style>
  .bookmark-container {
    flex: 1;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: flex-start;
    gap: 16px;
    padding: 16px;
    background-color: #000;
    min-height: 0;
    overflow: auto;
    justify-content: space-between;
  }
</style>
