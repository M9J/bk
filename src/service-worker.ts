const CACHE_NAME = "mybookmarks-dyncache-v1";
// const folderPattern = /^\/(src|dist)?\/?(bookmarks\/)?/;

// Define API endpoint to exclude from caching
const excludedAPI = "https://api.github.com/repos/m9j/bk/contents/version.json?ref=gh-pages";

self.addEventListener("fetch", (event: any) => {
  const requestURL = new URL(event.request.url);

  // Check if the request should be excluded from caching
  if (requestURL.href === excludedAPI) {
    event.respondWith(fetch(event.request)); // Directly fetch from network
    return;
  }

  debugger;
  // Normal caching logic for other requests
  // if (folderPattern.test(requestURL.pathname)) {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => {
        return (
          response ||
          fetch(event.request).then(async (fetchResponse: any) => {
            return caches.open(CACHE_NAME).then((cache) => {
              console.log("CACHED:", event.request.url);
              cache.put(event.request, fetchResponse.clone());
              return fetchResponse;
            });
          })
        );
      })
      .catch((error) => {
        console.error("Fetch failed:", event.request.url, error);
      })
  );
  // }
});
