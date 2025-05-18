import { IMAGE_PLACEHOLDER } from "$lib/base64/images";
import { CONFIG } from "$lib/configs/main";
import type { IBookmark } from "$lib/interfaces/Bookmark";

export async function getBookmarksConfigs() {
  const bookmarksFolder = "/bookmarks";
  try {
    const bookmarksFolderIndexModule = await fetch(bookmarksFolder + "/index.json");
    if (bookmarksFolderIndexModule) {
      const bookmarkIndex = await bookmarksFolderIndexModule.json();
      const hasBookmarkIndex = Array.isArray(bookmarkIndex) ? bookmarkIndex.length > 0 : false;
      if (hasBookmarkIndex) {
        const sortedBookmarkIndex = bookmarkIndex.sort();
        const bookmarkFileFetchPromises = sortedBookmarkIndex.map((bookmarkFileName: string) =>
          fetch(bookmarksFolder + "/" + bookmarkFileName + ".json")
            .then((res) => res.json())
            .then((res) => {
              res.bookmarkIndexName = bookmarkFileName;
              return res;
            })
        );
        return await Promise.all(bookmarkFileFetchPromises);
      }
    }
  } catch (err) {
    console.error("bookmarks folder or bookmarks/index.json not found. Error:", err);
  }
}

export async function getFavicons1() {
  const alinks = document.querySelectorAll("a.bookmark");
  const hasAlinks = alinks ? alinks.length > 0 : false;
  if (hasAlinks) {
    for (let i = 0; i < alinks.length; i++) {
      const item = alinks.item(i);
      const href = item.getAttribute("href");
      const bkIcon = item.getAttribute("data-bookmark-icon");
      let iconLink = null;
      if (bkIcon) iconLink = bkIcon;
      else if (href) {
        const hrefURL = new URL(href);
        const baseHref = hrefURL.protocol + "//" + hrefURL.hostname;
        iconLink = CONFIG.faviconFetchServiceURL(baseHref);
      }
      const itemIconImage = item.getElementsByTagName("img").item(0);
      if (itemIconImage) {
        if (iconLink) itemIconImage.setAttribute("src", iconLink);
        itemIconImage.onerror = function () {
          this.src = IMAGE_PLACEHOLDER;
        };
      }
    }
  }
}

export async function getFaviconsLinks(bookmarkConfigs: IBookmark[]) {
  const iconLinks: any = {};
  const hasBookmarkConfigs = Array.isArray(bookmarkConfigs) ? bookmarkConfigs.length > 0 : false;
  if (hasBookmarkConfigs) {
    for (let i = 0; i < bookmarkConfigs.length; i++) {
      const bookmarkConfig = bookmarkConfigs[i];
      const bookmarkLink = bookmarkConfig.LINK;
      const bookmarkIcon = bookmarkConfig.ICON;
      let iconLink = "";
      if (bookmarkIcon) iconLink = bookmarkIcon;
      else if (bookmarkLink) {
        const hrefURL = new URL(bookmarkLink);
        const baseHref = hrefURL.protocol + "//" + hrefURL.hostname;
        iconLink = CONFIG.faviconFetchServiceURL(baseHref);
      } else {
        iconLink = IMAGE_PLACEHOLDER;
      }
      if (bookmarkConfig.bookmarkIndexName) {
        iconLinks[bookmarkConfig.bookmarkIndexName] = iconLink;
      }
    }
  }
  return iconLinks;
}
