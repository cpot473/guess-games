// Offline support for the launcher and every game: cache every file on install, serve from cache first.
// VERSION holds a hash of the files' contents. tests/offline.test.js fails until it matches (and says
// what to set), so no change ships without a new VERSION; the next online visit then fetches the new files.
const VERSION = "guess-games-2b59c5a7";
// Everything the app needs (tests/offline.test.js checks the list). An index.html is listed by its
// folder, the URL that the links use. pokequiz/ is the redirect left at the old game's address.
const FILES = [
  "./", "launcher.js", "manifest.webmanifest", "icon-192.png", "icon-512.png",
  "engine/quiz.css", "engine/quiz.js",
  "games/index.js",
  "games/pokemon/", "games/pokemon/data.js", "games/pokemon/theme.css",
  "games/peppa/", "games/peppa/data.js", "games/peppa/theme.css",
  "pokequiz/",
];

self.addEventListener("install", e => {
  // cache: "reload" skips the HTTP cache, so a new VERSION never stores stale copies.
  e.waitUntil(caches.open(VERSION)
    .then(c => c.addAll(FILES.map(f => new Request(f, { cache: "reload" }))))
    .then(() => self.skipWaiting()));
});

// Delete this app's old caches, including "pokequiz-v1" from the retired pokequiz/sw.js. Other
// caches on the origin (other sites under cpot473.github.io) are left alone.
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== VERSION && /^(guess-games|pokequiz)-/.test(k)).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then(hit => hit || fetch(e.request)));
});
