// The Learn! games with plain data lists: fruit, colours, elements, bones, vegetables, planets and animals.
const test = require("node:test");
const assert = require("node:assert/strict");
const { createMatcher, normalize, cellHTML } = require("../engine/quiz.js");

const games = Object.fromEntries(["fruit", "colours", "elements", "bones", "vegetables", "planets", "animals"].map(g => [g, require(`../games/${g}/data.js`)]));

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

test("vegetables: the everyday vegetables are there, each with a plant part and a colour", () => {
  const { exact } = createMatcher(games.vegetables.items);
  const names = games.vegetables.items.map(v => v.name);
  for (const n of ["Carrot", "Potato", "Broccoli", "Cabbage", "Onion", "Pea", "Cucumber", "Spinach"]) assert.ok(names.includes(n), n);
  assert.ok(games.vegetables.items.length >= 60);
  for (const v of games.vegetables.items) assert.ok(v.part && v.colour, v.name);
  for (const f of games.vegetables.filters) assert.ok(games.vegetables.items.some(f.test), f.label);
  assert.equal(exact("Zucchini").name, "Courgette");
  assert.equal(exact("Eggplant").name, "Aubergine");
  assert.equal(exact("Corn").name, "Sweetcorn");
  assert.equal(games.vegetables.items.find(v => v.name === "Broccoli").part, "flower");
});

test("planets: the eight planets, the five dwarf planets, and moons that each orbit one of them", () => {
  const items = games.planets.items, of = k => items.filter(p => p.kind === k).map(p => p.name);
  assert.deepEqual(of("planet"), ["Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune"]);
  assert.deepEqual(of("dwarf").sort(), ["Ceres", "Eris", "Haumea", "Makemake", "Pluto"]);
  const bodies = items.filter(p => p.kind !== "moon").map(p => p.name);
  for (const p of items) {
    assert.ok(p.clue, p.name);
    assert.equal(p.orbits, p.kind === "moon" ? p.orbits : "The Sun", p.name);
    if (p.kind === "moon") assert.ok(bodies.includes(p.orbits), `${p.name} orbits ${p.orbits}`);
  }
  for (const n of ["Moon", "Ganymede", "Titan", "Europa", "Io", "Triton", "Charon", "Phobos"]) assert.ok(of("moon").includes(n), n);
  const { exact } = createMatcher(items);
  assert.equal(exact("The Moon").name, "Moon");
  assert.equal(items.find(p => p.name === "Ganymede").orbits, "Jupiter");
});

test("animals: every group has animals, each with a home and a clue, and everyday names are accepted", () => {
  const items = games.animals.items;
  assert.ok(items.length >= 100, String(items.length));
  for (const f of games.animals.filters) assert.ok(items.filter(f.test).length >= 5, f.label);
  for (const a of items) assert.ok(a.home && a.clue && !new RegExp(`\\b${a.name}\\b`, "i").test(a.clue), a.name);
  const group = n => items.find(a => a.name === n).group;
  assert.equal(group("Dolphin"), "mammal");
  assert.equal(group("Bat"), "mammal");
  assert.equal(group("Penguin"), "bird");
  assert.equal(group("Frog"), "amphibian");
  assert.equal(group("Seahorse"), "fish");
  assert.equal(group("Spider"), "invertebrate");
  const { exact } = createMatcher(items);
  assert.equal(exact("Hippo").name, "Hippopotamus");
  assert.equal(exact("Killer whale").name, "Orca");
  assert.equal(exact("Ladybug").name, "Ladybird");
});
