const test = require("node:test");
const assert = require("node:assert/strict");
const GAME = require("../games/countries/data.js");
const { createMatcher, normalize } = require("../engine/quiz.js");

const { match, exact } = createMatcher(GAME.items);
const name = (text, force) => (match(text, force) || {}).name || null;
const paused = text => (exact(text) || {}).name || null;

test("193 countries, each with a continent that has a filter and a capital", () => {
  assert.equal(GAME.items.length, 193);
  const continents = GAME.filters.map(f => f.label);
  assert.equal(continents.length, 6);
  for (const c of GAME.items) {
    assert.ok(continents.includes(c.continent), c.name);
    assert.ok(c.capital, c.name);
  }
});

test("other names for a country are accepted", () => {
  assert.equal(paused("USA"), "United States");
  assert.equal(paused("uk"), "United Kingdom");
  assert.equal(name("uk", true), "United Kingdom");   // also a prefix of Ukraine
  assert.equal(paused("Burma"), "Myanmar");
  assert.equal(paused("Côte d'Ivoire"), "Ivory Coast");
  assert.equal(name("czech republic"), "Czechia");
  assert.equal(paused("Türkiye"), "Turkey");
});

test("a name that starts another needs a pause or Enter", () => {
  assert.equal(name("niger"), null);
  assert.equal(name("niger", true), "Niger");
  assert.equal(name("nigeri"), "Nigeria");
  assert.equal(paused("sudan"), "Sudan");
  assert.equal(paused("guinea"), "Guinea");
  assert.equal(paused("dominica"), "Dominica");
  assert.equal(paused("congo"), "Congo");
});

test("ambiguous starts are not accepted, even on Enter", () => {
  for (const t of ["Korea", "South", "Saint", "United", "z"])
    assert.equal(name(t, true), null, t);
  assert.equal(name("north k"), "North Korea");
  assert.equal(name("papua"), "Papua New Guinea");
});

test("every name and alias is accepted, and no two countries share a name or alias", () => {
  const seen = new Map();
  for (const c of GAME.items) {
    assert.equal(name(c.name, true), c.name);
    assert.equal(paused(c.name), c.name);
    for (const a of c.aliases || []) assert.equal(paused(a), c.name, a);
    for (const k of [c.name, ...(c.aliases || [])].map(normalize)) {
      assert.ok(!seen.has(k) || seen.get(k) === c.name, `${k}: ${seen.get(k)} and ${c.name}`);
      seen.set(k, c.name);
    }
  }
});
