// The old pokequiz/ app has moved to games/pokemon/. Devices that installed its offline worker
// (scope pokequiz/, cache "pokequiz-v1") fetch this file on their next online visit and replace it:
// it deletes the old cache, unregisters itself and reloads open pokequiz tabs, which then get
// pokequiz/index.html (a redirect) from the network, or from the root sw.js cache when offline.
self.addEventListener("install", () => self.skipWaiting());

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k.startsWith("pokequiz-")).map(k => caches.delete(k))))
    .then(() => self.registration.unregister())
    .then(() => self.clients.matchAll({ type: "window" }))
    .then(tabs => tabs.forEach(t => t.navigate(t.url).catch(() => {}))));
});
