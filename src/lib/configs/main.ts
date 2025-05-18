export const CONFIG = {
  faviconSize: 24,
  faviconFetchServiceURL: (link: string) =>
    `https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${link}&size=${CONFIG.faviconSize}`,
};
