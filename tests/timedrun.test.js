// Plays timed runs through the real page scripts (data.js, match.js, timer.js and the engine), with a fake page
// and a fake clock: there is no browser in the tests. Elements are found by id, and events are fired by hand.
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs"), path = require("node:path"), vm = require("node:vm");

function fakeElement(id) {
  return {
    id, value: "", textContent: "", className: "", hidden: false, innerHTML: "", style: {}, children: [], offsetWidth: 0,
    classList: { add() {}, remove() {}, toggle() {} }, handlers: {},
    addEventListener(type, f) { (this.handlers[type] = this.handlers[type] || []).push(f); },
    fire(type, e = {}) { for (const f of this.handlers[type] || []) f(e); },
    querySelectorAll: () => [], focus() {},
  };
}

// Opens a game page. storage is shared between openings, like a browser's localStorage.
function openPage(game, storage, clock) {
  const els = {}, docHandlers = {}, winHandlers = {};
  const $ = id => els[id] || (els[id] = fakeElement(id));
  class FakeDate extends Date { static now() { return clock.now; } }
  const document = {
    hidden: false, body: { insertAdjacentHTML() {} }, getElementById: $,
    addEventListener(t, f) { (docHandlers[t] = docHandlers[t] || []).push(f); },
  };
  const ctx = vm.createContext({
    document, navigator: {}, Date: FakeDate, Math, JSON, Set, Map, Array, Object, String, Number,
    setTimeout: () => 0, clearTimeout() {}, setInterval: () => 0, clearInterval() {},
    confirm: () => true, addEventListener(t, f) { (winHandlers[t] = winHandlers[t] || []).push(f); },
    localStorage: { getItem: k => (k in storage ? storage[k] : null), setItem: (k, v) => { storage[k] = String(v); } },
  });
  const dir = path.join(__dirname, "..", "games", game);
  const html = fs.readFileSync(path.join(dir, "index.html"), "utf8");
  for (const src of [...html.matchAll(/<script src="([^"]+)"/g)].map(m => m[1]).filter(s => !s.includes("fullscreen"))) {
    vm.runInContext(fs.readFileSync(path.join(dir, src), "utf8"), ctx, { filename: src });
  }
  const items = vm.runInContext("GAME.items", ctx);
  return {
    $, items,
    type(text) { $("guess").value = text; $("guess").fire("keydown", { key: "Enter" }); },
    click(id) { $("timer").fire("click", { target: { closest: () => ({ id }) } }); },
    hide() { document.hidden = true; (docHandlers.visibilitychange || []).forEach(f => f()); },
    score: () => +$("score").textContent,
    message: () => $("message").textContent,
    saved: key => JSON.parse(storage[key]),
  };
}

test("guessing game: a timed run has its own board, pauses, resumes on the next answer, and records the time", () => {
  const storage = {}, clock = { now: 1000000 };
  let page = openPage("gabby", storage, clock);
  const names = page.items.map(c => c.name), total = names.length;
  assert.match(page.$("timer").innerHTML, /t-start/);           // off by default
  assert.doesNotMatch(page.$("timer").innerHTML, /t-clock/);

  page.type(names[0]);                                           // free play
  assert.deepEqual(page.saved("gabbyquiz").guessed, [1]);

  page.click("t-start");
  assert.equal(page.score(), 0);                                 // an empty board for the run
  assert.match(page.$("timer").innerHTML, /t-clock[\s\S]*Pause/);
  clock.now += 5000;
  page.type(names[1]);
  assert.equal(page.score(), 1);
  assert.deepEqual(page.saved("gabbyquiz").guessed, [1, 2]);     // the find counts for the saved game too

  page.click("t-pause");
  assert.match(page.$("timer").innerHTML, /Paused[\s\S]*Resume/);
  clock.now += 60000;                                            // a long pause: not counted
  page.type("not a name at all");                                // submitting resumes, even when wrong
  assert.doesNotMatch(page.$("timer").innerHTML, /Paused/);
  clock.now += 3000;
  page.type(names[0]);                                           // found in free play, but not yet in this run
  assert.equal(page.score(), 2);

  for (const n of names.slice(2)) { clock.now += 1000; page.type(n); }
  const times = page.saved("gabbyquiz-times");
  assert.equal(times.run, null);
  assert.deepEqual(times.best.map(t => t.ms), [5000 + 3000 + (total - 2) * 1000]);
  assert.match(page.message(), new RegExp(`found all ${total} in 0:\\d\\d\\.0!.*number 1 best time`));
  assert.equal(page.score(), total);                             // back on the saved game, which has everything now
  assert.equal(page.saved("gabbyquiz").guessed.length, total);

  page = openPage("gabby", storage, clock);                      // the best time survives a reload
  page.click("t-best");
  assert.match(page.$("timer").innerHTML, /<ol>[\s\S]*0:\d\d\.0/);
});

test("guessing game: a run left behind comes back paused, and Stop ends it without a time", () => {
  const storage = {}, clock = { now: 5000 };
  let page = openPage("gabby", storage, clock);
  const names = page.items.map(c => c.name);
  page.click("t-start");
  clock.now += 2000; page.type(names[3]);
  clock.now += 4000; page.hide();                                // switching away pauses the clock
  assert.equal(page.saved("gabbyquiz-times").run.clock.since, null);
  assert.equal(page.saved("gabbyquiz-times").run.clock.elapsed, 6000);

  clock.now += 999999;
  page = openPage("gabby", storage, clock);                      // reopened much later
  assert.equal(page.score(), 1);                                 // still on the run's board
  assert.match(page.$("timer").innerHTML, /0:06 Paused/);

  page.click("t-stop");
  assert.equal(page.saved("gabbyquiz-times").run, null);
  assert.deepEqual(page.saved("gabbyquiz-times").best, []);
  assert.match(page.$("timer").innerHTML, /t-start/);
});

test("Top 10: a timed run records a time, keeps only the ten best, and giving up ends a run without one", () => {
  const storage = {}, clock = { now: 0 };
  const page = openPage("pokemonstrongest", storage, clock);
  const names = page.items.map(p => p.name);
  for (let run = 0; run < 11; run++) {
    page.click("t-start");
    for (const n of names) { clock.now += 1000 + run; page.type(n); }
  }
  const best = page.saved("pokemonstrongestquiz-times").best.map(t => t.ms);
  assert.equal(best.length, 10);
  assert.deepEqual(best, [...best].sort((a, b) => a - b));
  assert.equal(best[0], 10 * 1000);
  assert.match(page.message(), /found all 10 in/);
  assert.doesNotMatch(page.message(), /best time/);              // the 11th, slowest run is not in the top 10

  page.click("t-start");
  page.type(names[0]);
  page.$("giveup").fire("click");
  assert.equal(page.saved("pokemonstrongestquiz-times").run, null);
  assert.equal(page.saved("pokemonstrongestquiz-times").best.length, 10);
  assert.equal(page.saved("pokemonstrongestquiz").shown, true);
});
