// Gen 2 Pokémon (Pokédex #152-251), with types and evolution stages as they were in Gen 2.
const test = require("node:test");
const assert = require("node:assert/strict");
const GAME = require("../games/pokemongen2/data.js");
const { createMatcher } = require("../engine/quiz.js");

const P = GAME.items, by = n => P.find(p => p.name === n);

test("100 Pokémon, numbered 152 to 251, in Pokédex order", () => {
  assert.equal(P.length, 100);
  assert.deepEqual(P.map(p => p.num), Array.from({ length: 100 }, (_, i) => 152 + i));
  assert.equal(P[0].name, "Chikorita");
  assert.equal(P[99].name, "Celebi");
  assert.equal(GAME.tag(by("Pichu")), "#172");
});

test("in TV Shows & Games, with its own save key", () => {
  assert.equal(GAME.category, "characters");
  assert.equal(GAME.id, "pokequiz-gen2");
});

test("Gen 2 types: Steel and Dark are new, and there is no Fairy yet", () => {
  assert.deepEqual(by("Steelix").types, ["steel", "ground"]);
  assert.deepEqual(by("Umbreon").types, ["dark"]);
  assert.deepEqual(by("Tyranitar").types, ["rock", "dark"]);
  assert.deepEqual(by("Togepi").types, ["normal"]);
  assert.deepEqual(by("Marill").types, ["water"]);
  assert.ok(!P.some(p => p.types.includes("fairy")));
});

test("evolution stages count Gen 1 and Gen 2 species only", () => {
  assert.equal(by("Pichu").evo, "1/3");
  assert.equal(by("Crobat").evo, "3/3");
  assert.equal(by("Scizor").evo, "2/2");
  assert.equal(by("Sneasel").evo, "1/1"); // Weavile is Gen 4
  assert.equal(by("Kingdra").evo, "3/3");
  for (const p of P) assert.match(p.evo, /^[1-3]\/[1-3]$/, p.name);
});

test("every name is accepted, including Ho-Oh and Porygon2", () => {
  const { match } = createMatcher(P);
  for (const p of P) assert.equal((match(p.name, true) || {}).name, p.name);
  assert.equal(match("hooh", true).name, "Ho-Oh");
  assert.equal(match("porygon2", true).name, "Porygon2");
});

test("every type filter is used, and the number filters cover every Pokémon once", () => {
  const nums = GAME.filters.filter(f => /\d/.test(f.label));
  for (const p of P) assert.equal(nums.filter(f => f.test(p)).length, 1, p.name);
  for (const f of GAME.filters) assert.ok(P.some(p => f.test(p)), f.label);
});
