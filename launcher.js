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

if (typeof module !== "undefined") module.exports = { guessedCount, tileHTML };
else {
  // Each data.js is a classic script that declares `const GAME`, so two cannot share one page:
  // run each in its own function scope instead. The service worker has them cached.
  const games = Promise.all(GAMES.map(dir => fetch(`games/${dir}/data.js`)
    .then(r => r.ok ? r.text() : Promise.reject(r.status))
    .then(js => new Function(`${js}\nreturn GAME;`)())
    .catch(() => null)));
  const saved = game => { try { return game && localStorage.getItem(game.id); } catch (e) { return null; } };
  // pageshow also fires when the browser's Back button restores this page, so the scores stay current.
  addEventListener("pageshow", () => games.then(list => {
    document.getElementById("games").innerHTML = list.map((g, i) => tileHTML(GAMES[i], g, saved(g))).join("");
  }));

  // Offline support for the launcher and every game, and keep saved progress from being evicted.
  if ("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js");
  if (navigator.storage && navigator.storage.persist) navigator.storage.persist();
}
