// The launcher: one tile per game in games/index.js, with the player's progress.
// The part above the page code is pure and also loads in node for the tests.

// How many items a saved game ({"guessed":[...], ...} under GAME.id) has guessed; 0 if none or unreadable.
function guessedCount(saved) {
  try {
    const s = JSON.parse(saved);
    return s && Array.isArray(s.guessed) ? s.guessed.length : 0;
  } catch (e) { return 0; }
}

// One tile. game is the game's GAME, or null if its data.js could not be loaded (then no score).
function tileHTML(dir, game, saved) {
  if (!game) return `<a class="tile" href="games/${dir}/"><span class="name">${dir}</span></a>`;
  const total = game.items.length, n = Math.min(guessedCount(saved), total);
  return `<a class="tile" href="games/${dir}/"><span class="name">${game.title}</span>
    <span class="score">${n} / ${total}</span>
    <span class="bar"><span style="width:${n / total * 100}%"></span></span></a>`;
}

// A category tile on the home page: its name and icon only.
function categoryTileHTML(cat) {
  return `<a class="tile" href="#${cat.id}"><span class="icon">${cat.icon}</span><span class="name">${cat.name}</span></a>`;
}

// A category's page: its games' tiles (entries: {dir, game, saved}), or "Coming soon" if it has none.
function categoryPageHTML(cat, entries) {
  const tiles = entries.length ? entries.map(e => tileHTML(e.dir, e.game, e.saved)).join("")
    : `<div class="tile soon"><span class="name">Coming soon</span></div>`;
  return `<h2><a id="back" href="#">🏠 Back</a> ${cat.icon} ${cat.name}</h2>${tiles}`;
}

if (typeof module !== "undefined") module.exports = { guessedCount, tileHTML, categoryTileHTML, categoryPageHTML };
else {
  // Each data.js is a classic script that declares `const GAME`, so two cannot share one page:
  // run each in its own function scope instead. The service worker has them cached.
  const games = Promise.all(GAMES.map(dir => fetch(`games/${dir}/data.js`)
    .then(r => r.ok ? r.text() : Promise.reject(r.status))
    .then(js => new Function(`${js}\nreturn GAME;`)())
    .catch(() => null)));
  const saved = game => { try { return game && localStorage.getItem(game.id); } catch (e) { return null; } };
  // The hash picks the page: "" is the home page, "#<category id>" a category. pageshow also fires when the
  // browser's Back button restores this page, so the scores stay current.
  const render = () => games.then(list => {
    const cat = CATEGORIES.find(c => c.id === location.hash.slice(1));
    document.getElementById("games").innerHTML = cat
      ? categoryPageHTML(cat, list.map((g, i) => ({ dir: GAMES[i], game: g, saved: saved(g) }))
          .filter(e => e.game ? e.game.category === cat.id : false))
      : CATEGORIES.map(categoryTileHTML).join("");
    scrollTo(0, 0);
  });
  addEventListener("pageshow", render);
  addEventListener("hashchange", render);

  // Offline support for the launcher and every game, and keep saved progress from being evicted.
  if ("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js");
  if (navigator.storage && navigator.storage.persist) navigator.storage.persist();
}
