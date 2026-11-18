// The Top 10s engine and its first game, Strongest Gen 1 Pokémon.
const test = require("node:test");
const assert = require("node:assert/strict");
const { createMatcher } = require("../engine/match.js");
const { rankLabels, rowHTML } = require("../engine/top10.js");
const GAME = require("../games/pokemonstrongest/data.js");
const { tileHTML } = require("../launcher.js");

test("rank labels: tied values share a rank, and the next rank skips", () => {
  const v = values => rankLabels(values.map(value => ({ value })));
  assert.deepEqual(v([9, 7, 7, 7, 5, 4, 4]), ["1", "2=", "2=", "2=", "5", "6=", "6="]);
});

test("a row hides its name until found, shows the clue only once asked, and shows everything when given up", () => {
  const it = GAME.items[0];
  const hidden = rowHTML(GAME, it, "1", false, false, false);
  assert.doesNotMatch(hidden, new RegExp(it.name));
  assert.match(hidden, /data-hint/);
  const hinted = rowHTML(GAME, it, "1", false, true, false);
  assert.match(hinted, new RegExp(it.clue));
  assert.doesNotMatch(hinted, new RegExp(it.name));
  assert.match(rowHTML(GAME, it, "1", true, false, false), new RegExp(`done.*${it.name}.*${it.value} total`, "s"));
  assert.match(rowHTML(GAME, it, "1", false, false, true), new RegExp(`missed.*${it.name}`, "s"));
});

test("strongest Pokémon: ten, best first, each with a clue that does not give the name away", () => {
  assert.equal(GAME.category, "top10");
  assert.equal(GAME.items.length, 10);
  assert.ok(GAME.source && GAME.rule);
  for (let i = 1; i < 10; i++) assert.ok(GAME.items[i - 1].value >= GAME.items[i].value, GAME.items[i].name);
  for (const it of GAME.items) {
    assert.ok(Number.isInteger(it.value) && it.clue, it.name);
    assert.doesNotMatch(it.clue.toLowerCase(), new RegExp(it.name.toLowerCase()));
  }
  assert.deepEqual(GAME.items.slice(0, 3).map(i => i.name), ["Mewtwo", "Dragonite", "Mew"]);
  assert.equal(GAME.items[9].name, "Lapras");
});

test("strongest Pokémon: Mew and Mewtwo can both be guessed, and the launcher tile counts found rows", () => {
  const { exact, match } = createMatcher(GAME.items);
  assert.equal(exact("mew").name, "Mew");
  assert.equal(match("mewtwo").name, "Mewtwo");
  assert.match(tileHTML("pokemonstrongest", GAME, '{"guessed":[1,2,3],"hints":[4],"shown":false}'), /3 \/ 10/);
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

test("pokemonstrongest: index.html loads its data and engine together, and every row renders", () => {
  const { refs, ctx } = loadPage("pokemonstrongest", "top10");
  assert.deepEqual(refs, ["../../engine/quiz.css", "../../engine/top10.css", "theme.css", "data.js", "../../engine/match.js", "../../engine/top10.js", "../../engine/fullscreen.js"]);
  assert.ok(require("vm").runInContext("typeof GAME.items.length === 'number' && typeof rowHTML === 'function'", ctx));
});
