// Locks in the Pokémon matching rules. Written against the original pokequiz/data.js,
// then pointed at the engine + games/pokemon data, unchanged.
const test = require("node:test");
const assert = require("node:assert/strict");
const GAME = require("../games/pokemon/data.js");
const { createMatcher } = require("../engine/quiz.js");

const POKEMON = GAME.items, { match, exact } = createMatcher(POKEMON);
const name = (text, force) => (match(text, force) || {}).name || null;
const paused = text => (exact(text) || {}).name || null;

test("151 Pokémon", () => {
  assert.equal(POKEMON.length, 151);
});

test("a unique prefix of 5+ letters is auto-accepted", () => {
  assert.equal(name("pikac"), "Pikachu");
  assert.equal(name("Bulba"), "Bulbasaur");
  assert.equal(name("CHARMA"), "Charmander");
  assert.equal(name("  squir  "), "Squirtle");
});

test("under 5 letters is not auto-accepted, even if unique", () => {
  assert.equal(name("pika"), null);
  assert.equal(name("ekan"), null);
  assert.equal(name("muk"), null);
});

test("forced (Enter): any unique prefix or an exact name is accepted", () => {
  assert.equal(name("pika", true), "Pikachu");
  assert.equal(name("muk", true), "Muk");
  assert.equal(name("abra", true), "Abra");
  assert.equal(name("", true), null);
  assert.equal(name("   ", true), null);
  assert.equal(name("a", true), null); // many names start with a
});

test("a prefix shared by several names is not accepted", () => {
  assert.equal(name("pidge"), null);
  assert.equal(name("pidge", true), null);
  assert.equal(name("charm"), null);
  assert.equal(name("charm", true), null);
});

test("Pidgeot vs Pidgeotto", () => {
  assert.equal(name("pidgeot"), null); // could still become Pidgeotto
  assert.equal(name("pidgeot", true), "Pidgeot");
  assert.equal(name("pidgeott"), "Pidgeotto");
  assert.equal(name("Pidgeotto"), "Pidgeotto");
});

test("Mew vs Mewtwo", () => {
  assert.equal(name("mew"), null);
  assert.equal(name("mew", true), "Mew");
  assert.equal(name("mewt"), null); // unique but under 5 letters
  assert.equal(name("mewt", true), "Mewtwo");
  assert.equal(name("mewtw"), "Mewtwo");
});

test("Nidoran♀ / Nidoran♂", () => {
  assert.equal(name("nidoran"), null);
  assert.equal(name("nidoran", true), null);
  assert.equal(name("nidoranf"), "Nidoran♀");
  assert.equal(name("nidoranm"), "Nidoran♂");
  assert.equal(name("Nidoran F"), "Nidoran♀");
  assert.equal(name("Nidoran♀"), "Nidoran♀");
  assert.equal(name("Nidoran♂"), "Nidoran♂");
  assert.equal(name("nidorina"), "Nidorina");
  assert.equal(name("nidorin"), null); // Nidorina / Nidorino
});

test("punctuation and spaces are ignored: Mr. Mime, Farfetch'd", () => {
  assert.equal(name("mrmime"), "Mr. Mime");
  assert.equal(name("Mr. Mime"), "Mr. Mime");
  assert.equal(name("mr mi"), null); // only 4 letters
  assert.equal(name("mr mim"), "Mr. Mime");
  assert.equal(name("farfetchd"), "Farfetch'd");
  assert.equal(name("Farfetch'd"), "Farfetch'd");
  assert.equal(name("farfetch’d"), "Farfetch'd"); // phone keyboards type a curly apostrophe
  assert.equal(name("farfe"), "Farfetch'd");
});

test("wrong guesses are rejected", () => {
  assert.equal(name("pikachoo"), null);
  assert.equal(name("pikachoo", true), null);
  assert.equal(name("digimon", true), null);
  assert.equal(name("agumon", true), null);
  assert.equal(name("pikachuu", true), null);
});

test("every name is accepted when forced", () => {
  for (const p of POKEMON) assert.equal(name(p.name, true), p.name);
});

test("after a pause, an exact name is accepted, even if short or the start of a longer name", () => {
  assert.equal(paused("mew"), "Mew");
  assert.equal(paused("Muk"), "Muk");
  assert.equal(paused("pidgeot"), "Pidgeot");
  assert.equal(paused("nidoranf"), "Nidoran♀");
  assert.equal(paused("pidge"), null);
  assert.equal(paused("pika"), null); // only a prefix
  assert.equal(paused(""), null);
});

test("save key is the original pokequiz key", () => {
  assert.equal(GAME.id, "pokequiz-gen1");
});
