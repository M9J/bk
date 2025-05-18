<script lang="ts">
  import { IMAGE_PLACEHOLDER } from "$lib/base64/images";
  import type { IBookmark } from "$lib/interfaces/Bookmark";

  export let bookmark: IBookmark;
  export let faviconLink: string;

  const link = bookmark.LINK || "javascript:void(0)";
  let name = bookmark.NAME || bookmark.LINK;

  function handleError(event: Event) {
    const target = event?.target as HTMLImageElement;
    if (target) {
      target.src = IMAGE_PLACEHOLDER;
    }
  }
</script>

<a
  class="bk"
  href={link}
  target="_blank"
  rel="noopener noreferrer"
  title={name}
  data-bookmark-icon={bookmark.ICON}
>
  <div class="bk-meta">
    <div class="bk-icon">
      <img
        class="bk-icon-img"
        src={faviconLink}
        alt="icon"
        width="100%"
        height="100%"
        loading="lazy"
        on:error={handleError}
      />
    </div>
    <div class="bk-meta-info">
      <div class="bk-name">{bookmark.NAME}</div>
      <div class="bk-link">{bookmark.LINK}</div>
    </div>
  </div>
  {#if bookmark.TITLE}
    <div class="bk-title">{bookmark.TITLE}</div>
  {/if}
  {#if bookmark.DESC}
    <div class="bk-desc">{bookmark.DESC}</div>
  {/if}
</a>

<style>
  .bk {
    background-color: #222;
    color: #fff;
    display: flex;
    flex-direction: column;
    padding: 16px;
    text-decoration: none;
    gap: 8px;
    border-radius: 18px;
    box-sizing: border-box;
    width: 100%;
  }

  .bk:hover {
    background-color: #fff;
    color: #000;
  }

  .bk-meta {
    display: flex;
    flex-direction: row;
  }

  .bk-icon {
    width: 36px;
    height: 36px;
    min-width: 36px;
    min-height: 36px;
    object-fit: contain;
    background-color: #fff;
    padding: 8px;
    border-radius: 16px;
  }

  .bk-icon-img {
    border-radius: 8px;
    overflow: hidden;
  }

  .bk-meta-info {
    display: flex;
    flex-direction: column;
    padding-left: 16px;
    justify-content: center;
  }

  .bk-name {
    font-weight: 500;
  }

  .bk-link {
    font-size: 0.9em;
  }

  .bk-title {
    font-size: 20px;
  }

  .bk-desc {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    overflow: hidden;
  }

  .bk-name,
  .bk-link,
  .bk-title {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    line-clamp: 1;
    overflow: hidden;
    overflow-wrap: anywhere;
  }
</style>
