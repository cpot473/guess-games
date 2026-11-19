// Timed mode, shared by the guessing games (quiz.js) and the Top 10s (top10.js). Off until the player starts a
// timed run. A run has its own empty board, so the saved progress is kept (and still gets every find); the clock
// runs until every item is found, can be paused, and resumes by itself when the player next submits an answer.
// The ten best times are kept under timesKey(game), apart from the progress that the launcher reads.
// The part above createTimer is pure and also loads in node for the tests.
const TOP_TIMES = 10;

// 65432 -> "1:05", or "1:05.4" with tenths; hours only when needed.
function formatTime(ms, tenths) {
  const t = Math.floor(ms / 100), s = Math.floor(t / 10), h = Math.floor(s / 3600), m = Math.floor(s / 60) % 60;
  const ss = String(s % 60).padStart(2, "0");
  return (h ? `${h}:${String(m).padStart(2, "0")}` : `${m}`) + `:${ss}` + (tenths ? `.${t % 10}` : "");
}

// A clock is { elapsed: ms counted so far, since: when it last started (ms), or null while paused }.
function newClock(now) { return { elapsed: 0, since: now }; }
function clockElapsed(c, now) { return c.elapsed + (c.since === null ? 0 : now - c.since); }
function pauseClock(c, now) { return c.since === null ? c : { elapsed: clockElapsed(c, now), since: null }; }
function resumeClock(c, now) { return c.since === null ? { elapsed: c.elapsed, since: now } : c; }

// Adds a time to the best times ({ ms, date }, fastest first). rank: its place from 1, or 0 if not in the top 10.
// A time that ties an older one goes after it.
function addTime(times, ms, date) {
  const entry = { ms, date }, all = [...times, entry].sort((a, b) => a.ms - b.ms);
  const rank = all.indexOf(entry) + 1;
  return { times: all.slice(0, TOP_TIMES), rank: rank <= TOP_TIMES ? rank : 0 };
}

function timesKey(game) { return game.id + "-times"; }

// The best-times list; newRank (from 1) highlights the time just set.
function bestTimesHTML(times, newRank) {
  if (!times.length) return `<p class="none">No times yet. Start a timed run and find them all!</p>`;
  return `<ol>${times.map((t, i) => `<li${i + 1 === newRank ? ` class="new"` : ""}><b>${formatTime(t.ms, true)}</b> <span>${t.date}</span></li>`).join("")}</ol>`;
}

// The timer's buttons, clock and best times, in el. The engine owns the boards; hooks:
//   fresh() -> a new, empty board; load(json) -> board; dump(board) -> json; changed(): the board in use changed.
// board() is the run's board, or null when no run is on; the engine shows and changes that one instead of its own.
function createTimer(game, el, hooks) {
  const key = timesKey(game), now = () => Date.now();
  let best = [], run = null, newRank = 0, listOpen = false, ticker = null;
  try {
    const s = JSON.parse(localStorage.getItem(key));
    if (s) {
      best = s.best || [];
      // A run left running (the page was closed) comes back paused, at the time last saved.
      if (s.run) run = { board: hooks.load(s.run.board), clock: { elapsed: s.run.clock.elapsed, since: null } };
    }
  } catch (e) { /* no saved times */ }

  function save() {
    try {
      localStorage.setItem(key, JSON.stringify({ best, run: run && { board: hooks.dump(run.board), clock: pauseClock(run.clock, now()) } }));
    } catch (e) {}
  }
  function draw() {
    const paused = run && run.clock.since === null;
    el.innerHTML = (run
      ? `<span class="clock${paused ? " paused" : ""}" id="t-clock">⏱️ ${formatTime(clockElapsed(run.clock, now()))}${paused ? " Paused" : ""}</span>
         <button id="t-pause">${paused ? "▶️ Resume" : "⏸️ Pause"}</button><button id="t-stop" title="Stop the timed run">✖️ Stop</button>`
      : `<button id="t-start" title="Find them all against the clock">⏱️ Timed run</button>`)
      + `<button id="t-best" aria-expanded="${listOpen}">🏆 Best times</button>`
      + (listOpen ? `<div id="t-list">${bestTimesHTML(best, newRank)}</div>` : "");
    clearInterval(ticker);
    if (run && !paused) ticker = setInterval(() => {
      const c = document.getElementById("t-clock");
      if (c) c.textContent = `⏱️ ${formatTime(clockElapsed(run.clock, now()))}`;
    }, 250);
  }
  function setPaused(p) {
    if (!run) return;
    run.clock = p ? pauseClock(run.clock, now()) : resumeClock(run.clock, now());
    save(); draw();
  }
  function start() {
    run = { board: hooks.fresh(), clock: newClock(now()) };
    newRank = 0; save(); draw(); hooks.changed();
  }
  function stop() { run = null; save(); draw(); hooks.changed(); }

  el.addEventListener("click", e => {
    const b = e.target.closest("button"); if (!b) return;
    if (b.id === "t-start") start();
    else if (b.id === "t-pause") setPaused(run.clock.since !== null);
    else if (b.id === "t-stop") { if (confirm("Stop the timed run? This time won't count.")) stop(); }
    else if (b.id === "t-best") { listOpen = !listOpen; draw(); }
    hooks.refocus && hooks.refocus(e);
  });
  // Leaving the page pauses the clock, so a run left in another tab doesn't count the time away.
  document.addEventListener("visibilitychange", () => { if (document.hidden) setPaused(true); });
  addEventListener("pagehide", () => setPaused(true));
  draw();

  return {
    board: () => run && run.board,
    save,
    resume: () => setPaused(false),
    start, stop,
    // Ends the run with every item found: records the time. Returns { ms, rank } (rank 0: not in the top 10).
    finish() {
      const ms = clockElapsed(run.clock, now());
      const added = addTime(best, ms, new Date().toISOString().slice(0, 10));
      best = added.times; newRank = added.rank; listOpen = added.rank > 0;
      run = null; save(); draw(); hooks.changed();
      return { ms, rank: added.rank };
    },
  };
}

if (typeof module !== "undefined") module.exports = { TOP_TIMES, formatTime, newClock, clockElapsed, pauseClock, resumeClock, addTime, timesKey, bestTimesHTML };
