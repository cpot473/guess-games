// The offline layer: the root sw.js must cache exactly the files the app needs, and its VERSION must
// change whenever any of them does. Also checks that every relative URL in the app points at a file.
const test = require("node:test");
const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const GAMES = require("../games/index.js");
const { ROOT } = require("../engine/quiz.js");
const { guessedCount, tileHTML } = require("../launcher.js");

const repo = path.join(__dirname, "..");

// Every file the app serves, as the URL sw.js uses: all files in the repo except dotfiles, tests/,
// Markdown and the service workers themselves (the browser fetches those, not the pages).
function appFiles(dir = "") {
  return fs.readdirSync(path.join(repo, dir), { withFileTypes: true }).flatMap(e => {
    const rel = dir + e.name;
    if (e.name.startsWith(".") || rel === "tests" || e.name === "sw.js" || e.name.endsWith(".md")) return [];
    if (e.isDirectory()) return appFiles(rel + "/");
    return [e.name === "index.html" ? dir || "./" : rel];
  });
}
// The file on disk behind a URL relative to the repo root ("games/pokemon/" -> games/pokemon/index.html).
const fileOf = url => path.join(repo, url.endsWith("/") ? url + "index.html" : url);

function readSW() {
  const ctx = vm.createContext({ self: { addEventListener() {} } });
  const sw = vm.runInContext(fs.readFileSync(path.join(repo, "sw.js"), "utf8") + "\n;({ VERSION, FILES })", ctx);
  return { VERSION: sw.VERSION, FILES: Array.from(sw.FILES) }; // an array of this realm, for deepEqual
}

test("sw.js caches exactly the files the app needs", () => {
  const { FILES } = readSW();
  const need = appFiles();
  assert.deepEqual(FILES.filter(f => !need.includes(f)), [], "in FILES but not an app file");
  assert.deepEqual(need.filter(f => !FILES.includes(f)), [], "app files missing from FILES in sw.js");
  assert.equal(new Set(FILES).size, FILES.length, "FILES has duplicates");
});

test("sw.js VERSION carries the hash of the cached files' contents", () => {
  const { VERSION, FILES } = readSW();
  const h = crypto.createHash("sha256");
  for (const f of [...FILES].sort()) h.update(f + "\0").update(fs.readFileSync(fileOf(f))).update("\0");
  const hash = h.digest("hex").slice(0, 8);
  assert.ok(VERSION.includes(hash), `The cached files changed: set VERSION in sw.js to "guess-games-${hash}"`);
});

test("every relative URL in the pages and the manifest points at a file", () => {
  const pages = appFiles().filter(f => f.endsWith("/"));
  assert.ok(pages.length >= 2 + GAMES.length);
  for (const page of pages) {
    const html = fs.readFileSync(fileOf(page), "utf8");
    const refs = [...html.matchAll(/(?:src|href)="([^"]+)"|url=([^"]+)"|location\.replace\("([^"]+)"\)/g)]
      .map(m => m[1] || m[2] || m[3]).filter(r => !/^([a-z]+:|\/\/|#)/.test(r));
    assert.ok(refs.length > 0, page);
    for (const r of refs) assert.ok(fs.existsSync(fileOf(path.posix.join(page, r))), `${page}: ${r}`);
  }
  const manifest = JSON.parse(fs.readFileSync(path.join(repo, "manifest.webmanifest"), "utf8"));
  for (const r of [manifest.start_url, manifest.scope, ...manifest.icons.map(i => i.src)]) assert.ok(fs.existsSync(fileOf(r)), r);
});

test("games/index.js lists every game folder, and each has its files", () => {
  const dirs = fs.readdirSync(path.join(repo, "games"), { withFileTypes: true }).filter(e => e.isDirectory()).map(e => e.name);
  assert.deepEqual([...GAMES].sort(), dirs.sort());
  for (const g of GAMES) for (const f of ["index.html", "data.js", "theme.css"]) assert.ok(fs.existsSync(path.join(repo, "games", g, f)), `${g}/${f}`);
});

test("from a game page, the engine's ROOT is the launcher, next to sw.js", () => {
  for (const g of GAMES) {
    assert.equal(path.join(repo, "games", g, ROOT), repo + path.sep);
  }
  assert.ok(fs.existsSync(path.join(repo, "sw.js")));
});

test("a launcher tile shows the saved progress, and copes with no or bad saves", () => {
  assert.equal(guessedCount('{"guessed":[1,5,9],"hints":{}}'), 3);
  for (const bad of [null, "", "nonsense", "{}", '{"guessed":7}', "null"]) assert.equal(guessedCount(bad), 0, String(bad));
  const game = { title: "Guess!", items: [{}, {}, {}, {}] };
  const html = tileHTML("abc", game, '{"guessed":[2]}');
  assert.match(html, /href="games\/abc\/"/);
  assert.match(html, /Guess!/);
  assert.match(html, /1 \/ 4/);
  assert.match(html, /width:25%/);
  assert.match(tileHTML("abc", game, null), /0 \/ 4/);
  assert.match(tileHTML("abc", null, null), /href="games\/abc\/".*abc/);
});

test("the launcher reads each game's progress under its save key, the one the engine writes", () => {
  for (const g of GAMES) {
    const GAME = require(`../games/${g}/data.js`);
    assert.equal(typeof GAME.id, "string");
    assert.match(tileHTML(g, GAME, JSON.stringify({ guessed: [1, 2], hints: {} })), new RegExp(`2 / ${GAME.items.length}`));
  }
});
