// The TV Shows & Games games with plain data lists: Gabby's Dollhouse, Marvel, the two Minecraft games and Mr. Men.
const test = require("node:test");
const assert = require("node:assert/strict");
const { createMatcher, normalize } = require("../engine/quiz.js");

const games = Object.fromEntries(["gabby", "marvel", "minecraftmobs", "minecraftblocks", "mrmen"].map(g => [g, require(`../games/${g}/data.js`)]));

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

  test(`${g}: is in Characters, and every item is reachable through exactly one filter`, () => {
    assert.equal(GAME.category, "characters");
    for (const it of GAME.items) assert.equal(GAME.filters.filter(f => f.test(it)).length, 1, it.name);
  });

  test(`${g}: every hint has text for every item`, () => {
    global.chip = s => s;
    for (const it of GAME.items) for (const h of GAME.hints) assert.ok(String(h.reveal(it)).trim().length > 2 && !/undefined/.test(h.reveal(it)), `${it.name}: ${h.id}`);
  });
}

test("gabby: the main cast is there", () => {
  const names = games.gabby.items.map(c => c.name);
  for (const n of ["Gabby Girl", "Pandy Paws", "Cakey Cat", "MerCat", "Kitty Fairy", "DJ Catnip", "Carlita", "Baby Box", "Pillow Cat", "CatRat"]) assert.ok(names.includes(n), n);
});

test("marvel: heroes and villains, with a real name and a power each", () => {
  const { exact } = createMatcher(games.marvel.items);
  const names = games.marvel.items.map(c => c.name);
  for (const n of ["Spider-Man", "Iron Man", "Thor", "Hulk", "Thanos", "Loki", "Magneto", "Doctor Doom"]) assert.ok(names.includes(n), n);
  assert.equal(exact("spiderman").name, "Spider-Man");
  assert.equal(exact("Doc Ock").name, "Doctor Octopus");
  assert.equal(games.marvel.items.find(c => c.name === "Thanos").side, "villain");
  for (const c of games.marvel.items) assert.ok(c.real && c.power, c.name);
});

test("minecraftmobs: each type is used, and the two bosses are the dragon and the wither", () => {
  const items = games.minecraftmobs.items;
  for (const t of ["passive", "neutral", "hostile", "boss"]) assert.ok(items.some(m => m.type === t), t);
  assert.deepEqual(items.filter(m => m.type === "boss").map(m => m.name), ["Ender Dragon", "Wither"]);
  assert.equal(items.find(m => m.name === "Creeper").type, "hostile");
  for (const m of items) assert.ok(m.where && m.clue, m.name);
});

test("minecraftblocks: over 900 blocks, every type used, and every block has a place and a use", () => {
  const items = games.minecraftblocks.items;
  assert.ok(items.length >= 900, String(items.length));
  for (const f of games.minecraftblocks.filters) assert.ok(items.some(b => f.test(b)), f.label);
  for (const b of items) assert.ok(b.where && b.use, b.name);
  const { exact } = createMatcher(items);
  assert.equal(exact("Diamond Block").name, "Block of Diamond");
});

test("minecraftblocks: the first blocks keep their places, because saved progress is stored by position", () => {
  const names = games.minecraftblocks.items.map(b => b.name);
  assert.deepEqual(names.slice(0, 5), ["Dirt", "Grass Block", "Sand", "Gravel", "Clay"]);
  assert.equal(names[71], "Purpur Block");
});

test("minecraftblocks: families are generated in full, and Grey is accepted for Gray", () => {
  const items = games.minecraftblocks.items;
  const names = items.map(b => b.name);
  for (const kind of ["Wool", "Concrete", "Terracotta", "Stained Glass", "Bed", "Banner", "Candle"]) {
    assert.equal(names.filter(n => n.endsWith(` ${kind}`) && n !== kind && !n.includes("Glazed") && !n.includes("Powder")).length, 16, kind);
  }
  for (const n of ["Oak Stairs", "Pale Oak Door", "Stripped Cherry Log", "Mangrove Propagule", "Bamboo Mosaic", "Crimson Hyphae", "Cobblestone Wall",
    "Stone Brick Stairs", "Smooth Stone Slab", "Waxed Oxidized Cut Copper Stairs", "Block of Copper", "Dead Brain Coral Fan", "Tube Coral Block"]) assert.ok(names.includes(n), n);
  const { exact } = createMatcher(items);
  assert.equal(exact("Light Grey Wool").name, "Light Gray Wool");
  assert.equal(items.find(b => b.name === "Waxed Exposed Copper").type, "copper");
});

test("mrmen: Mr. Men and Little Miss, and a child can type just the last word", () => {
  const items = games.mrmen.items, names = items.map(c => c.name);
  for (const n of ["Mr. Tickle", "Mr. Happy", "Mr. Bump", "Mr. Strong", "Little Miss Sunshine", "Little Miss Bossy", "Little Miss Naughty"]) assert.ok(names.includes(n), n);
  for (const c of items) assert.match(c.name, c.kind === "mr" ? /^Mr\. / : /^Little Miss /, c.name);
  const { exact } = createMatcher(items);
  assert.equal(exact("Mr Tickle").name, "Mr. Tickle");
  assert.equal(exact("tickle").name, "Mr. Tickle");
  assert.equal(exact("Sunshine").name, "Little Miss Sunshine");
  assert.equal(exact("Busy"), null); // Mr. Busy and Little Miss Busy
  assert.equal(exact("Mr Busy").name, "Mr. Busy");
});
