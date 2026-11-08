const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const { normalize, createMatcher, hiddenLetters, cellHTML, shouldRefocus } = require("../engine/quiz.js");

test("normalize keeps letters and symbols, drops accents, spaces, punctuation and digits", () => {
  assert.equal(normalize("Mr. Mime"), "mrmime");
  assert.equal(normalize("Farfetch’d"), "farfetchd");
  assert.equal(normalize("Chloé Pig"), "chloepig");
  assert.equal(normalize("Nidoran ♀"), "nidoran♀");
  assert.equal(normalize("pikachu 1"), "pikachu");
});

test("an exact name that two items share is not accepted", () => {
  const { match, exact } = createMatcher([{ name: "Ann" }, { name: "Bob", aliases: ["Ann"] }]);
  assert.equal(exact("ann"), null);
  assert.equal(match("ann", true), null);
});

test("hiddenLetters skips spaces, punctuation and revealed letters", () => {
  assert.deepEqual(hiddenLetters("Mr. Mime", []), [0, 1, 4, 5, 6, 7]);
  assert.deepEqual(hiddenLetters("Mr. Mime", [0, 5]), [1, 4, 6, 7]);
  assert.deepEqual(hiddenLetters("Chloé", []), [0, 1, 2, 3, 4]);
});

test("refocus the input after mouse or keyboard, not after touch or pen", () => {
  assert.equal(shouldRefocus({ pointerType: "mouse" }, ""), true);
  assert.equal(shouldRefocus({ pointerType: "" }, "touch"), true); // keyboard-activated click
  assert.equal(shouldRefocus({ pointerType: "touch" }, "mouse"), false);
  assert.equal(shouldRefocus({ pointerType: "pen" }, ""), false);
  assert.equal(shouldRefocus({}, "touch"), false); // click without pointerType: use last pointerdown
  assert.equal(shouldRefocus({}, "mouse"), true);
});

test("a masked card shows a gap between words and the hint buttons", () => {
  const game = { hints: [{ id: "x", label: "X", title: "t", reveal: it => `<b>${it.name}</b>` }] };
  const html = cellHTML(game, { name: "Mr. Bo" }, 3, false, { letters: [4] });
  assert.match(html, /_ _ \.   B _/);
  assert.match(html, /data-h="letter" *title/);   // 3 letters hidden: Letter still enabled
  assert.match(html, /data-h="x" *title/);
  assert.doesNotMatch(html, /<b>/);
  const revealed = cellHTML(game, { name: "Mr. Bo" }, 3, false, { letters: [0, 1, 4], x: true });
  assert.match(revealed, /data-h="letter" disabled/);  // one letter left: keep it hidden
  assert.match(revealed, /data-h="x" disabled/);
  assert.match(revealed, /<b>Mr. Bo<\/b>/);
  assert.match(cellHTML(game, { name: "Mr. Bo" }, 3, true), /<div class="name">Mr. Bo<\/div>[\s\S]*<b>Mr. Bo<\/b>/);
});

// Loads each game the way its index.html does: data.js, then the engine, as classic scripts sharing one
// global scope. A `module` stub stops the engine from starting the page (no DOM in node).
for (const g of ["pokemon", "peppa"]) {
  test(`${g}: index.html, data.js and the engine load together and render every card`, () => {
    const dir = path.join(__dirname, "..", "games", g);
    const html = fs.readFileSync(path.join(dir, "index.html"), "utf8");
    const refs = [...html.matchAll(/(?:src|href)="([^"]+)"/g)].map(m => m[1]);
    assert.deepEqual(refs, ["../../engine/quiz.css", "theme.css", "data.js", "../../engine/quiz.js"]);
    for (const r of refs) assert.ok(fs.existsSync(path.join(dir, r)), r);

    const ctx = vm.createContext({ module: {} });
    for (const r of ["data.js", "../../engine/quiz.js"]) vm.runInContext(fs.readFileSync(path.join(dir, r), "utf8"), ctx, { filename: r });
    const out = vm.runInContext(`(() => {
      const { match } = createMatcher(GAME.items);
      const all = { letters: [] }; for (const h of GAME.hints || []) all[h.id] = true;
      return GAME.items.map((it, i) => [match(it.name, true) === it,
        cellHTML(GAME, it, i + 1, false), cellHTML(GAME, it, i + 1, false, all), cellHTML(GAME, it, i + 1, true)]);
    })()`, ctx);
    assert.ok(out.length > 0);
    for (const [found, ...cards] of out) {
      assert.ok(found);
      for (const c of cards) assert.doesNotMatch(c, /undefined|NaN/);
    }
    // every colour variable the game uses is defined in its theme
    const theme = fs.readFileSync(path.join(dir, "theme.css"), "utf8");
    const used = new Set([...out.flat().join("").matchAll(/var\(--([\w-]+)\)/g)].map(m => m[1]));
    vm.runInContext("GAME.filters || []", ctx).forEach(f => f.color && used.add(f.color.slice(6, -1)));
    for (const v of used) assert.match(theme, new RegExp(`--${v}:`), v);
  });
}
