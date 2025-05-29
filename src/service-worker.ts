const CACHE_NAME = "mybookmarks-dyncache-v1";
const excludedAPI = "https://api.github.com/repos/m9j/bk/contents/version.json?ref=gh-pages";

self.addEventListener("fetch", (event: FetchEvent) => {
  const requestURL = new URL(event.request.url);

  if (requestURL.href === excludedAPI) {
    event.respondWith(fetch(event.request)); // Exclude specific API request from caching
    return;
  }

  event.respondWith(
    caches
      .match(event.request)
      .then((cachedResponse) => {
        // Return cached response if available, otherwise fetch from network
        return (
          cachedResponse ||
          fetch(event.request).then(async (networkResponse) => {
            return caches.open(CACHE_NAME).then((cache) => {
              console.log("CACHED:", event.request.url);
              cache.put(event.request, networkResponse.clone());
              return networkResponse;
            });
          })
        );
      })
      .catch((error) => {
        console.error("Fetch failed:", event.request.url, error);
      })
  );
});
