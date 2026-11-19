// Timed mode for the guessing games and the Top 10s: a stopwatch that runs until every item is found,
// can be paused, and keeps the player's ten best times.
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs"), path = require("node:path");
const { TOP_TIMES, formatTime, newClock, clockElapsed, pauseClock, resumeClock, addTime, timesKey, bestTimesHTML } = require("../engine/timer.js");
const { GAMES } = require("../games/index.js");

test("times read as m:ss, with tenths when asked, and hours only when needed", () => {
  assert.equal(formatTime(0), "0:00");
  assert.equal(formatTime(9999), "0:09");
  assert.equal(formatTime(65432), "1:05");
  assert.equal(formatTime(65432, true), "1:05.4");
  assert.equal(formatTime(3600000 + 61000), "1:01:01");
});

test("the clock counts only while running, and pausing or resuming twice changes nothing", () => {
  let c = newClock(1000);                       // starts running
  assert.equal(clockElapsed(c, 4000), 3000);
  c = pauseClock(c, 4000);
  assert.equal(clockElapsed(c, 60000), 3000);   // paused: no time passes
  assert.deepEqual(pauseClock(c, 70000), c);
  c = resumeClock(c, 100000);
  assert.deepEqual(resumeClock(c, 200000), c);
  assert.equal(clockElapsed(c, 102500), 5500);
});

test("best times keep the ten fastest, and say where a new time ranks", () => {
  let times = [];
  for (const ms of [5000, 3000, 4000]) ({ times } = addTime(times, ms, "2026-11-19"));
  assert.deepEqual(times.map(t => t.ms), [3000, 4000, 5000]);
  assert.equal(addTime(times, 3500, "d").rank, 2);
  assert.equal(addTime(times, 3000, "d").rank, 2);   // a tie goes after the older time
  for (let i = 0; i < 20; i++) ({ times } = addTime(times, 10000 + i, "d"));
  assert.equal(times.length, TOP_TIMES);
  const slow = addTime(times, 999999, "d");
  assert.equal(slow.rank, 0);                         // not in the top 10
  assert.equal(slow.times.length, TOP_TIMES);
  assert.equal(addTime(times, 1, "d").rank, 1);
});

test("the best-times list shows each time and its date, or says there are none yet", () => {
  assert.match(bestTimesHTML([]), /No times yet/);
  const html = bestTimesHTML([{ ms: 65432, date: "2026-11-19" }, { ms: 70000, date: "2026-11-18" }], 2);
  assert.match(html, /<ol[\s\S]*1:05\.4[\s\S]*1:10\.0/);
  assert.match(html, /class="new"[^>]*>[\s\S]*1:10\.0/);  // the newest time is highlighted
});

test("times are saved under their own key, apart from the game's progress", () => {
  const ids = GAMES.map(g => require(`../games/${g}/data.js`).id);
  for (const id of ids) {
    assert.notEqual(timesKey({ id }), id);
    assert.ok(!ids.includes(timesKey({ id })), id);
  }
});

test("every guessing and Top 10 page loads the timer before its engine; Do you know? pages do not", () => {
  for (const g of GAMES) {
    const html = fs.readFileSync(path.join(__dirname, "..", "games", g, "index.html"), "utf8");
    const engine = ["quiz.js", "top10.js", "know.js"].find(e => html.includes(`engine/${e}`));
    const timer = html.indexOf("../../engine/timer.js");
    if (engine === "know.js") assert.equal(timer, -1, g);
    else assert.ok(timer > 0 && timer < html.indexOf(`engine/${engine}`), g);
  }
});
