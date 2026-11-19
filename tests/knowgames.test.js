// Every Do you know? game: a bank of questions, enough of each level for a full round, four different answers each.
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs"), path = require("node:path");
const { ROUND } = require("../engine/know.js");
const { GAMES } = require("../games/index.js");

const know = GAMES.filter(g => fs.readFileSync(path.join(__dirname, "..", "games", g, "index.html"), "utf8").includes("know.js"));

test("the Do you know? games are there", () => {
  for (const g of ["humanbody", "solarsystem", "volcanoes", "weather", "stoneage"]) assert.ok(know.includes(g), g);
});

// At least double the first bank of each of these, so rounds repeat less.
const MIN = { solarsystem: 74, volcanoes: 66, weather: 66, stoneage: 64 };

for (const g of know) {
  const GAME = require(`../games/${g}/data.js`);
  test(`${g}: in Do you know?, with a full round of each level, and four different answers and a fact per question`, () => {
    assert.equal(GAME.category, "know");
    assert.ok(GAME.title);
    assert.ok(GAME.items.length >= (MIN[g] || 30), String(GAME.items.length));
    for (const l of ["easy", "hard"]) assert.ok(GAME.items.filter(i => i.level === l).length >= ROUND, l);
    const seen = new Set();
    for (const it of GAME.items) {
      assert.ok(it.q.endsWith("?") || it.q.endsWith("..."), it.q);
      assert.ok(["easy", "hard"].includes(it.level), it.q);
      assert.equal(it.options.length, 4, it.q);
      assert.equal(new Set(it.options.map(o => o.toLowerCase())).size, 4, it.q);
      assert.ok(it.options.every(o => o && o.trim() === o) && it.fact && it.fact.length > 10, it.q);
      assert.ok(!seen.has(it.q), `duplicate question: ${it.q}`);
      seen.add(it.q);
    }
  });
}
