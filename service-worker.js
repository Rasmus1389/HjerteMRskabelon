self.addEventListener("install", event => {
  event.waitUntil(
    caches.open("v2").then(cache => {
      return cache.addAll([
        "./",
        "./index.html",
        "./manifest.json",
        "./icon-192.png",
        "./icon-512.png"
      ]);
    })
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== "v2").map(k => caches.delete(k))
    ))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});