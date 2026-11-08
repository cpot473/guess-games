const test = require("node:test");
const assert = require("node:assert/strict");
const GAME = require("../games/pawpatrol/data.js");
const { createMatcher, normalize } = require("../engine/quiz.js");

const { match, exact } = createMatcher(GAME.items);
const name = (text, force) => (match(text, force) || {}).name || null;
const paused = text => (exact(text) || {}).name || null;

test("single names, aliases and titles are accepted", () => {
  assert.equal(name("chase", true), "Chase");
  assert.equal(name("marsh"), "Marshall");
  assert.equal(paused("Rex"), "Rex");
  assert.equal(name("Captain Turbot"), "Cap'n Turbot");
  assert.equal(name("capn turbot"), "Cap'n Turbot");
  assert.equal(name("mister porter"), "Mr. Porter");
  assert.equal(name("humdinger"), "Mayor Humdinger");
  assert.equal(paused("Ace"), "Ace Sorensen");
});

test("ambiguous starts are not accepted, even on Enter", () => {
  for (const t of ["Mayor", "Farmer", "Porter", "Ma", "Pikachu"]) assert.equal(name(t, true), null, t);
  assert.equal(name("farmer a", true), "Farmer Al");
  assert.equal(name("farmer y"), "Farmer Yumi");
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

test("every character has a kind with a filter, and a job", () => {
  const kinds = GAME.filters.map(f => f.label);
  for (const c of GAME.items) {
    assert.ok(kinds.includes(c.kind), c.name);
    assert.ok(c.job, c.name);
  }
});
