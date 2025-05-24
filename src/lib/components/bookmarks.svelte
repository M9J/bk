<script lang="ts">
  import type { IBookmark } from "$lib/interfaces/Bookmark";
  import { getBookmarksConfigs, getFaviconsLinks } from "$lib/util/bookmarks";
  import { onMount } from "svelte";
  import Bookmark from "./bookmark.svelte";

  let allBookmarksConfigs: IBookmark[] = [];
  let pinnedBookmarksConfigs: IBookmark[] = [];
  let unpinnedBookmarksConfigs: IBookmark[] = [];
  let allFaviconLinks: any = {};
  async function getBookmarks() {
    const bookmarksConfigs = await getBookmarksConfigs();
    if (bookmarksConfigs) {
      const sortedBookmarks = bookmarksConfigs.sort((a, b) => a.NAME.localeCompare(b.NAME));
      allBookmarksConfigs = sortedBookmarks;
      pinnedBookmarksConfigs = allBookmarksConfigs.filter((c) => c.IS_PINNED);
      unpinnedBookmarksConfigs = allBookmarksConfigs.filter((c) => !c.IS_PINNED);
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
    {#if pinnedBookmarksConfigs.length > 0}
      <div class="bk-container-pinned">
        {#each pinnedBookmarksConfigs as bookmarkConfig}
          {#if bookmarkConfig.bookmarkIndexName}
            <Bookmark
              bookmark={bookmarkConfig}
              faviconLink={allFaviconLinks[bookmarkConfig.bookmarkIndexName]}
            />
          {/if}
        {/each}
      </div>
    {/if}
    {#if unpinnedBookmarksConfigs.length > 0}
      <div class="bk-container-grid">
        {#each unpinnedBookmarksConfigs as bookmarkConfig}
          {#if bookmarkConfig.bookmarkIndexName}
            <Bookmark
              bookmark={bookmarkConfig}
              faviconLink={allFaviconLinks[bookmarkConfig.bookmarkIndexName]}
            />
          {/if}
        {/each}
      </div>
    {/if}
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
    display: flex;
    flex-direction: column;
  }

  .bk-container-pinned {
    gap: 16px;
    padding: 16px;
    padding-bottom: 0;
    display: grid;
    grid-template-columns: repeat(auto-fit, 84px);
    grid-auto-rows: min-content;
  }

  .bk-container-grid {
    gap: 16px;
    padding: 16px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    grid-auto-rows: min-content;
  }
</style>
