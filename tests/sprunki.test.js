const test = require("node:test");
const assert = require("node:assert/strict");
const GAME = require("../games/sprunki/data.js");
const { createMatcher, normalize } = require("../engine/quiz.js");

const { match, exact } = createMatcher(GAME.items);
const name = (text, force) => (match(text, force) || {}).name || null;
const paused = text => (exact(text) || {}).name || null;

test("names and aliases are accepted", () => {
  assert.equal(paused("oren"), "Oren");
  assert.equal(paused("Mister Sun"), "Mr. Sun");
  assert.equal(name("mr tree"), "Mr. Tree");
  assert.equal(name("fun bot"), "Fun Bot");
  assert.equal(name("fun-computer"), "Mr. Fun Computer");
  assert.equal(name("owakcx"), "OWAKCX");
});

test("ambiguous starts are not accepted, even on Enter", () => {
  for (const t of ["Mr", "Mr.", "Fun", "Pikachu"]) assert.equal(name(t, true), null, t);
});

test("every name and alias is accepted, and no two characters share a name or alias", () => {
  const seen = new Map();
  for (const c of GAME.items) {
    assert.equal(name(c.name, true), c.name);
    for (const a of c.aliases || []) assert.equal(paused(a), c.name, a);
    for (const k of [c.name, ...(c.aliases || [])].map(normalize)) {
      assert.ok(!seen.has(k) || seen.get(k) === c.name, `${k}: ${seen.get(k)} and ${c.name}`);
      seen.set(k, c.name);
    }
  }
});

test("every character has a group with a filter, a sound and a look; the scary Black is left out", () => {
  const groups = GAME.filters.map(f => f.label);
  for (const c of GAME.items) {
    assert.ok(groups.includes(c.group), c.name);
    assert.ok(c.sound && c.look, c.name);
  }
  assert.equal(GAME.items.length, 19);
  assert.ok(!GAME.items.some(c => c.name === "Black"));
});
