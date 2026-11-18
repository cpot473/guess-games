// The Do you know? engine and its first game, Human Body.
const test = require("node:test");
const assert = require("node:assert/strict");
const { ROUND, shuffle, pickRound, askOptions } = require("../engine/know.js");
const GAME = require("../games/humanbody/data.js");
const { tileHTML } = require("../launcher.js");

// a repeatable "random" so the tests do not flake
const seeded = () => { let x = 7; return () => (x = (x * 16807) % 2147483647) / 2147483647; };

test("shuffle keeps every element and leaves the input alone", () => {
  const a = [1, 2, 3, 4, 5, 6];
  assert.deepEqual(shuffle(a, seeded()).sort(), a);
  assert.deepEqual(a, [1, 2, 3, 4, 5, 6]);
});

test("a round has ROUND distinct questions of the chosen level, ones not yet known first", () => {
  const items = Array.from({ length: 30 }, (_, i) => ({ level: i % 2 ? "hard" : "easy" }));
  const r = rand => pickRound(items, new Set(), "all", ROUND, rand);
  assert.equal(r(seeded()).length, ROUND);
  assert.equal(new Set(r(seeded())).size, ROUND);
  for (const id of pickRound(items, new Set(), "hard", ROUND, seeded())) assert.equal(items[id - 1].level, "hard");
  const known = new Set(Array.from({ length: 25 }, (_, i) => i + 1));
  const round = pickRound(items, known, "all", ROUND, seeded());
  assert.deepEqual(round.slice(0, 5).sort((a, b) => a - b), [26, 27, 28, 29, 30]);
  assert.ok(round.slice(5).every(id => known.has(id)));
  assert.equal(pickRound(items.slice(0, 4), new Set(), "all").length, 4); // a small bank gives a short round
});

test("askOptions shuffles the options and says where the right one went", () => {
  const it = { options: ["right", "a", "b", "c"] };
  for (let s = 0; s < 20; s++) {
    const { options, answer } = askOptions(it, seeded());
    assert.equal(options[answer], "right");
    assert.deepEqual([...options].sort(), ["a", "b", "c", "right"]);
  }
  const places = new Set(Array.from({ length: 40 }, () => askOptions(it).answer));
  assert.ok(places.size > 1, "the right answer never moves");
});

test("human body: every question has four different answers, a level and a fact", () => {
  assert.equal(GAME.category, "know");
  assert.ok(GAME.items.length >= 30);
  for (const l of ["easy", "hard"]) assert.ok(GAME.items.filter(i => i.level === l).length >= ROUND, l);
  const seen = new Set();
  for (const it of GAME.items) {
    assert.ok(it.q.endsWith("?") || it.q.endsWith("..."), it.q);
    assert.ok(["easy", "hard"].includes(it.level), it.q);
    assert.equal(it.options.length, 4, it.q);
    assert.equal(new Set(it.options).size, 4, it.q);
    assert.ok(it.options.every(Boolean) && it.fact, it.q);
    assert.ok(!seen.has(it.q), `duplicate question: ${it.q}`);
    seen.add(it.q);
  }
});

test("human body: the launcher tile counts questions answered right", () => {
  assert.match(tileHTML("humanbody", GAME, '{"guessed":[1,2],"best":7}'), new RegExp(`2 / ${GAME.items.length}`));
});

// Loads the page's scripts as classic scripts sharing one global scope, like the browser (no DOM: `module` stub).
function loadPage(game, engine) {
  const fs = require("node:fs"), path = require("node:path"), vm = require("node:vm");
  const dir = path.join(__dirname, "..", "games", game);
  const html = fs.readFileSync(path.join(dir, "index.html"), "utf8");
  const refs = [...html.matchAll(/(?:src|href)="([^"]+)"/g)].map(m => m[1]);
  for (const r of refs) assert.ok(fs.existsSync(path.join(dir, r)), r);
  const ctx = vm.createContext({ module: {} });
  for (const r of refs.filter(r => r.endsWith(".js") && !r.includes("fullscreen"))) vm.runInContext(fs.readFileSync(path.join(dir, r), "utf8"), ctx, { filename: r });
  return { refs, ctx, theme: fs.readFileSync(path.join(dir, "theme.css"), "utf8") };
}

test("humanbody: index.html loads its data and engine together, and every row renders", () => {
  const { refs, ctx } = loadPage("humanbody", "know");
  assert.deepEqual(refs, ["../../engine/quiz.css", "../../engine/know.css", "theme.css", "data.js", "../../engine/know.js", "../../engine/fullscreen.js"]);
  assert.ok(require("vm").runInContext("typeof GAME.items.length === 'number' && typeof shuffle === 'function'", ctx));
});
