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
    background-color: #000;
    min-height: 0;
    overflow: auto;
  }

  .bk-container {
    display: grid;
    gap: 16px;
    padding: 16px;
    min-height: 0;
    overflow: auto;
  }

  @media (max-width: 600px) {
    .bk-container {
      grid-template-columns: 1fr;
    }
  }

  @media (min-width: 601px) and (max-width: 1200px) {
    .bk-container {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (min-width: 1201px) {
    .bk-container {
      grid-template-columns: repeat(3, 1fr);
    }
  }
</style>
