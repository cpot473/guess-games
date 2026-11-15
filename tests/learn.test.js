// The Learn! games with plain data lists: fruit, colours, elements and bones.
const test = require("node:test");
const assert = require("node:assert/strict");
const { createMatcher, normalize, cellHTML } = require("../engine/quiz.js");

const games = Object.fromEntries(["fruit", "colours", "elements", "bones"].map(g => [g, require(`../games/${g}/data.js`)]));

for (const [g, GAME] of Object.entries(games)) {
  test(`${g}: no two items share a name or alias, and every name and alias is accepted`, () => {
    const { match, exact } = createMatcher(GAME.items);
    const seen = new Map();
    for (const it of GAME.items) {
      assert.equal((match(it.name, true) || {}).name, it.name);
      for (const a of it.aliases || []) assert.equal((exact(a) || {}).name, it.name, a);
      for (const k of [it.name, ...(it.aliases || [])].map(normalize)) {
        assert.ok(!seen.has(k) || seen.get(k) === it.name, `${k}: ${seen.get(k)} and ${it.name}`);
        seen.set(k, it.name);
      }
    }
  });

  test(`${g}: is in Learn!, and every item is reachable through exactly one filter`, () => {
    assert.equal(GAME.category, "learn");
    for (const it of GAME.items) assert.equal(GAME.filters.filter(f => f.test(it)).length, 1, it.name);
  });
}

test("fruit: the everyday fruit are there, with a type and a colour each", () => {
  const names = games.fruit.items.map(f => f.name);
  for (const n of ["Apple", "Banana", "Strawberry", "Pineapple", "Kiwi", "Blueberry", "Watermelon", "Lemon"]) assert.ok(names.includes(n), n);
  assert.ok(games.fruit.items.length >= 60);
  for (const f of games.fruit.items) assert.ok(f.type && f.colour, f.name);
});

test("colours: every colour has a valid hex swatch, shown on its card, and the colours are all different", () => {
  const items = games.colours.items;
  assert.ok(items.length >= 70);
  assert.equal(new Set(items.map(c => c.hex.toLowerCase())).size, items.length, "two colours share a hex");
  for (const c of items) {
    assert.match(c.hex, /^#[0-9a-f]{6}$/i, c.name);
    assert.ok(c.family && c.clue, c.name);
    assert.match(cellHTML(games.colours, c, 1, false), new RegExp(`background:${c.hex}`));
  }
  const style = n => games.colours.doneStyle(items.find(c => c.name === n));
  assert.match(style("White"), /--light/);   // a light card needs dark text
  assert.doesNotMatch(style("Navy"), /--light/);
});

test("elements: 118 of them in atomic-number order, with the American spellings as aliases", () => {
  const items = games.elements.items;
  assert.equal(items.length, 118);
  const at = n => items[n - 1];
  assert.deepEqual([at(1).name, at(6).symbol, at(26).name, at(79).symbol, at(118).name], ["Hydrogen", "C", "Iron", "Au", "Oganesson"]);
  assert.equal(new Set(items.map(e => e.symbol)).size, 118, "symbols are unique");
  assert.ok(items.every((e, i) => e.number === i + 1));
  const { exact } = createMatcher(items);
  assert.equal(exact("Aluminum").name, "Aluminium");
  assert.equal(exact("Sulfur").name, "Sulphur");
  assert.equal(exact("Cesium").name, "Caesium");
  assert.match(cellHTML(games.elements, at(26), 26, false), /#26/);
  assert.equal(at(80).state, "liquid");
  assert.equal(at(35).state, "liquid");
  assert.equal(at(10).category, "noble");
});

test("bones: every region has bones, and the everyday names are accepted", () => {
  const { exact } = createMatcher(games.bones.items);
  const regions = new Set(games.bones.items.map(b => b.region));
  assert.deepEqual([...regions].sort(), games.bones.filters.map(f => f.label).sort());
  for (const [common, real] of [["Kneecap", "Patella"], ["Collarbone", "Clavicle"], ["Shin bone", "Tibia"], ["Tailbone", "Coccyx"], ["Shoulder blade", "Scapula"], ["Jawbone", "Mandible"]]) {
    assert.equal(exact(common).name, real, common);
  }
  assert.ok(games.bones.items.every(b => b.where && b.clue));
  assert.ok(games.bones.items.length >= 60);
});
