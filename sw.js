// Offline support for the launcher and every game: cache every file on install, serve from cache first.
// VERSION holds a hash of the files' contents. tests/offline.test.js fails until it matches (and says
// what to set), so no change ships without a new VERSION; the next online visit then fetches the new files.
const VERSION = "guess-games-e2a7d315";
// Everything the app needs (tests/offline.test.js checks the list). An index.html is listed by its
// folder, the URL that the links use. pokequiz/ is the redirect left at the old game's address.
const FILES = [
  "./", "launcher.js", "manifest.webmanifest", "icon-192.png", "icon-512.png",
  "engine/quiz.css", "engine/quiz.js", "engine/match.js", "engine/timer.js", "engine/fullscreen.js",
  "engine/top10.css", "engine/top10.js", "engine/know.css", "engine/know.js",
  "games/index.js",
  "games/pokemon/", "games/pokemon/data.js", "games/pokemon/theme.css",
  "games/peppa/", "games/peppa/data.js", "games/peppa/theme.css",
  "games/countries/", "games/countries/data.js", "games/countries/theme.css",
  "games/pawpatrol/", "games/pawpatrol/data.js", "games/pawpatrol/theme.css",
  "games/bluey/", "games/bluey/data.js", "games/bluey/theme.css",
  "games/sprunki/", "games/sprunki/data.js", "games/sprunki/theme.css",
  "games/fruit/", "games/fruit/data.js", "games/fruit/theme.css",
  "games/colours/", "games/colours/data.js", "games/colours/theme.css",
  "games/elements/", "games/elements/data.js", "games/elements/theme.css",
  "games/bones/", "games/bones/data.js", "games/bones/theme.css",
  "games/vegetables/", "games/vegetables/data.js", "games/vegetables/theme.css",
  "games/planets/", "games/planets/data.js", "games/planets/theme.css",
  "games/animals/", "games/animals/data.js", "games/animals/theme.css",
  "games/gabby/", "games/gabby/data.js", "games/gabby/theme.css",
  "games/marvel/", "games/marvel/data.js", "games/marvel/theme.css",
  "games/minecraftmobs/", "games/minecraftmobs/data.js", "games/minecraftmobs/theme.css",
  "games/minecraftblocks/", "games/minecraftblocks/data.js", "games/minecraftblocks/theme.css",
  "games/pokemongen2/", "games/pokemongen2/data.js", "games/pokemongen2/theme.css",
  "games/mrmen/", "games/mrmen/data.js", "games/mrmen/theme.css",
  "games/pokemonstrongest/", "games/pokemonstrongest/data.js", "games/pokemonstrongest/theme.css",
  "games/biggestpokemon/", "games/biggestpokemon/data.js", "games/biggestpokemon/theme.css",
  "games/humanbody/", "games/humanbody/data.js", "games/humanbody/theme.css",
  "games/solarsystem/", "games/solarsystem/data.js", "games/solarsystem/theme.css",
  "games/volcanoes/", "games/volcanoes/data.js", "games/volcanoes/theme.css",
  "games/weather/", "games/weather/data.js", "games/weather/theme.css",
  "games/stoneage/", "games/stoneage/data.js", "games/stoneage/theme.css",
  "games/fastestanimals/", "games/fastestanimals/data.js", "games/fastestanimals/theme.css",
  "games/tallestmountains/", "games/tallestmountains/data.js", "games/tallestmountains/theme.css",
  "games/longestrivers/", "games/longestrivers/data.js", "games/longestrivers/theme.css",
  "games/largestcountries/", "games/largestcountries/data.js", "games/largestcountries/theme.css",
  "games/populatedcountries/", "games/populatedcountries/data.js", "games/populatedcountries/theme.css",
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
