const test = require("node:test");
const assert = require("node:assert/strict");
const GAME = require("../games/peppa/data.js");
const { createMatcher, normalize } = require("../engine/quiz.js");

const { match, exact } = createMatcher(GAME.items);
const name = (text, force) => (match(text, force) || {}).name || null;
const paused = text => (exact(text) || {}).name || null;

test("multi-word names: spaces, case and dots don't matter", () => {
  assert.equal(name("Peppa Pig"), "Peppa Pig");
  assert.equal(name("peppapig"), "Peppa Pig");
  assert.equal(name("MUMMY SHEEP"), "Mummy Sheep");
  assert.equal(name("mummy she"), "Mummy Sheep");
  assert.equal(name("Mr Bull", true), "Mr. Bull");
  assert.equal(name("Doctor Brown Bear"), "Doctor Brown Bear");
  assert.equal(name("chloe pig"), "Chloé Pig");
  assert.equal(name("Chloé"), "Chloé Pig");
});

test("first names are enough when only one character has them", () => {
  assert.equal(name("peppa"), "Peppa Pig");
  assert.equal(name("georg"), "George Pig");
  assert.equal(paused("Suzy"), "Suzy Sheep");   // under 5 letters: accepted after a pause
  assert.equal(name("suzy"), null);
  assert.equal(name("suzy", true), "Suzy Sheep");
  assert.equal(paused("zoe"), "Zoe Zebra");
  assert.equal(paused("Zuzu"), "Zuzu Zebra");
  assert.equal(paused("zaza"), "Zaza Zebra");
  assert.equal(paused("gazelle"), "Madame Gazelle");
  assert.equal(name("gazel"), "Madame Gazelle");
  assert.equal(name("Dr Brown Bear"), "Doctor Brown Bear");
  assert.equal(name("mister bull"), "Mr. Bull");
});

test("ambiguous starts are not accepted, even on Enter", () => {
  for (const t of ["Mummy", "Mumm", "Grand", "Mr", "Mister", "z", "Pe", "Gran"])
    assert.equal(name(t, true), null, t);
  assert.equal(paused("Mummy"), null);
  assert.equal(name("mummyr"), "Mummy Rabbit");
  assert.equal(name("grandp"), "Grandpa Pig");
  assert.equal(name("granda"), "Grandad Dog");
  assert.equal(name("granny"), "Granny Pig");
  assert.equal(name("mrz", true), "Mr. Zebra");
});

test("wrong guesses are rejected", () => {
  for (const t of ["Peppa Pug", "Pikachu", "Mummy Pony", "Suzie Sheep", "Daddy Dog"])
    assert.equal(name(t, true), null, t);
});

test("every name and alias is accepted, and no two characters share a name or alias", () => {
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

test("every character has a known role and an animal with a filter", () => {
  const animals = GAME.filters.map(f => f.label);
  for (const c of GAME.items) {
    assert.ok(["child", "parent", "grandparent", "grown-up"].includes(c.role), c.name);
    assert.ok(animals.includes(c.animal), c.name);
  }
});
