// Every Top 10s game: ten ranked answers (more if the last places tie), best first, with a clue that does not give the answer away.
const test = require("node:test");
const assert = require("node:assert/strict");
const { createMatcher, normalize } = require("../engine/match.js");
const { GAMES } = require("../games/index.js");
const fs = require("node:fs"), path = require("node:path");

const top10 = GAMES.filter(g => fs.readFileSync(path.join(__dirname, "..", "games", g, "index.html"), "utf8").includes("top10.js"));
const games = Object.fromEntries(top10.map(g => [g, require(`../games/${g}/data.js`)]));

test("the new Top 10s are there", () => {
  for (const g of ["fastestanimals", "tallestmountains", "longestrivers", "largestcountries", "populatedcountries"]) assert.ok(top10.includes(g), g);
});

for (const [g, GAME] of Object.entries(games)) {
  test(`${g}: ten, best first (more only when they tie for 10th), with a rule, a dated source and a unit`, () => {
    assert.equal(GAME.category, "top10");
    assert.ok(GAME.items.length >= 10);
    for (const it of GAME.items.slice(10)) assert.equal(it.value, GAME.items[9].value, it.name);
    assert.ok(GAME.rule && GAME.valueLabel && GAME.placeholder);
    assert.match(GAME.source, /checked \w+ 20\d\d/);
    for (let i = 1; i < 10; i++) assert.ok(GAME.items[i - 1].value >= GAME.items[i].value, GAME.items[i].name);
    for (const it of GAME.items) assert.ok(typeof it.value === "number" && it.value > 0 && it.clue, it.name);
  });

  test(`${g}: every name and alias is accepted, none shared, and no clue says its answer`, () => {
    const { match, exact } = createMatcher(GAME.items);
    const seen = new Map();
    for (const it of GAME.items) {
      assert.equal((match(it.name, true) || {}).name, it.name);
      for (const a of it.aliases || []) assert.equal((exact(a) || {}).name, it.name, a);
      for (const w of [it.name, ...(it.aliases || [])]) {
        const k = normalize(w);
        assert.ok(!seen.has(k) || seen.get(k) === it.name, `${k}: ${seen.get(k)} and ${it.name}`);
        seen.set(k, it.name);
        if (w.length > 2) assert.doesNotMatch(it.clue, new RegExp(`\\b${w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i"), `${it.name}: ${w}`);
      }
    }
  });
}

test("the facts at the top and bottom of each list", () => {
  const first = g => games[g].items[0].name, last = g => games[g].items[9].name;
  assert.equal(first("tallestmountains"), "Mount Everest"); assert.equal(games.tallestmountains.items[0].value, 8849);
  assert.equal(last("tallestmountains"), "Annapurna");
  assert.equal(first("longestrivers"), "Nile"); assert.equal(last("longestrivers"), "Amur");
  assert.equal(first("largestcountries"), "Russia"); assert.equal(last("largestcountries"), "Algeria");
  assert.equal(first("populatedcountries"), "India"); assert.equal(last("populatedcountries"), "Ethiopia");
  assert.equal(first("fastestanimals"), "Cheetah"); assert.equal(games.fastestanimals.items[0].value, 120.7);
  assert.equal(games.fastestanimals.items[1].name, "Ostrich");
  assert.equal(createMatcher(games.fastestanimals.items).exact("gnu").name, "Wildebeest");
  const { exact } = createMatcher(games.largestcountries.items);
  assert.equal(exact("USA").name, "United States");
  assert.equal(createMatcher(games.tallestmountains.items).exact("Everest").name, "Mount Everest");
  assert.equal(createMatcher(games.longestrivers.items).exact("parana").name, "Paraná");
});
