// "Guess the Top 10" engine. A game page loads its data.js (which defines GAME), match.js and then this file.
// GAME.items are the ranked answers, best first: { name, aliases?, value, clue }. Rows are revealed as they are found.
// The part above startTop10 is pure and also loads in node for the tests.
if (typeof require !== "undefined") var { createMatcher, normalize, MIN_LETTERS } = require("./match.js");
const ROOT = "../../"; // from a game page (games/<name>/) to the launcher and the service worker

// The rank shown for item i. Items with the same value share a rank: 1, 2=, 2=, 4 ...
function rankLabels(items) {
  return items.map((it, i) => {
    const first = items.findIndex(o => o.value === it.value);
    const tied = items.filter(o => o.value === it.value).length > 1;
    return (first + 1) + (tied ? "=" : "");
  });
}

// One row. found: guessed; shown: the player gave up, so the answer is revealed but not scored.
function rowHTML(game, item, label, found, hinted, shown) {
  const value = `<span class="value">${item.value.toLocaleString("en-GB")} ${game.valueLabel}</span>`;
  if (found || shown) return `<li class="row ${found ? "done" : "missed"}"><span class="rank">${label}</span><span class="name">${item.name}</span>${value}</li>`;
  return `<li class="row"><span class="rank">${label}</span><span class="name">?</span>
    ${hinted ? `<span class="clue">${item.clue}</span>` : `<button data-hint title="Show a clue">💡 Clue</button>`}</li>`;
}

function startTop10(game) {
  const items = game.items, total = items.length, labels = rankLabels(items), { match, exact } = createMatcher(items);
  document.body.insertAdjacentHTML("afterbegin", `
    <header>
      <a id="home" href="${ROOT}#${game.category}">🏠 Back</a>
      <h1>${game.title}</h1>
      <p id="rule">${game.rule}</p>
      <div class="score"><span id="score">0</span> / ${total} <button id="reset" title="Start over">New game</button></div>
      <div class="bar"><div id="bar-fill"></div></div>
      <div id="timer" class="timer"></div>
      <input id="guess" type="text" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false"
             enterkeyhint="go" placeholder="${game.placeholder}">
      <div id="message" aria-live="polite">Type a name. After ${MIN_LETTERS} letters it's checked automatically!</div>
    </header>
    <ol id="rows"></ol>
    <footer><button id="giveup">Show me the answers</button><p id="source">${game.source}</p></footer>`);

  const $ = id => document.getElementById(id), input = $("guess");
  let state = load();
  // A timed run (timer.js) has a board of its own, in the same shape: board() is the one in use.
  const timer = createTimer(game, $("timer"), {
    fresh: () => ({ guessed: new Set(), hints: new Set(), shown: false }),
    load: b => ({ guessed: new Set(b.guessed), hints: new Set(b.hints || []), shown: false }),
    dump: b => ({ guessed: [...b.guessed], hints: [...b.hints] }),
    changed() { render(); say(timer.board() ? `⏱️ Go! Find all ${total}!` : `Back to your saved game.`); },
    refocus: () => {}, // focusing the input after a tap would pop up the phone keyboard
  });
  const board = () => timer.board() || state;

  function load() {
    try {
      const s = JSON.parse(localStorage.getItem(game.id));
      if (s) return { guessed: new Set(s.guessed), hints: new Set(s.hints || []), shown: !!s.shown };
    } catch (e) { /* no saved game */ }
    return { guessed: new Set(), hints: new Set(), shown: false };
  }
  function save() {
    try { localStorage.setItem(game.id, JSON.stringify({ guessed: [...state.guessed], hints: [...state.hints], shown: state.shown })); } catch (e) {}
  }
  function say(text, cls) { $("message").textContent = text; $("message").className = cls || ""; }
  function render() {
    const b = board();
    $("rows").innerHTML = items.map((it, i) => rowHTML(game, it, labels[i], b.guessed.has(i + 1), b.hints.has(i + 1), b.shown)).join("");
    $("score").textContent = b.guessed.size;
    $("bar-fill").style.width = (b.guessed.size / total * 100) + "%";
    $("giveup").hidden = b.shown || b.guessed.size === total;
  }
  function accept(item) {
    const id = items.indexOf(item) + 1;
    input.value = "";
    timer.resume();
    const b = board();
    if (b.guessed.has(id)) { say(`You already found ${item.name}!`, "bad"); return; }
    b.guessed.add(id);
    state.guessed.add(id); // a find in a timed run counts towards the saved game too
    save(); timer.save(); render();
    if (b !== state && b.guessed.size === total) {
      const { ms, rank } = timer.finish();
      say(`🏆 You found all ${total} in ${formatTime(ms, true)}!` + (rank ? ` That's your number ${rank} best time!` : ""), "good");
      return;
    }
    say(b.guessed.size === total ? `🏆 YOU DID IT! The whole top ${total}! 🏆` : `Yes! ${item.name} is number ${labels[id - 1]}!`, "good");
  }

  // A full name that also starts a longer one (Mew / Mewtwo) is accepted after a pause, or on Enter.
  let pauseTimer;
  input.addEventListener("input", () => {
    clearTimeout(pauseTimer);
    const it = match(input.value);
    if (it) { accept(it); return; }
    const key = normalize(input.value), later = exact(input.value);
    if (later) pauseTimer = setTimeout(() => { if (normalize(input.value) === key) accept(later); }, 800);
  });
  input.addEventListener("keydown", e => {
    if (e.key !== "Enter" || !input.value.trim()) return;
    clearTimeout(pauseTimer);
    timer.resume(); // submitting an answer ends a pause
    const it = match(input.value, true);
    if (it) accept(it);
    else { say("Not in the top 10 — try again!", "bad"); input.classList.remove("shake"); void input.offsetWidth; input.classList.add("shake"); }
  });
  $("rows").addEventListener("click", e => {
    const row = e.target.closest("button[data-hint]"); if (!row) return;
    board().hints.add([...$("rows").children].indexOf(row.closest("li")) + 1); save(); timer.save(); render();
  });
  // Giving up in a timed run ends the run without a time, and shows the answers on the saved game.
  $("giveup").addEventListener("click", () => {
    if (timer.board()) timer.stop();
    state.shown = true; save(); render(); say("Here they are. Press New game to try again!");
  });
  $("reset").addEventListener("click", () => {
    if (timer.board()) { // in a timed run, New game starts the run again
      if (confirm("Start the timed run again from 0:00?")) timer.start();
      input.focus(); return;
    }
    if ((state.guessed.size || state.shown) && !confirm("Start a new game? Your progress will be lost.")) return;
    state = { guessed: new Set(), hints: new Set(), shown: false };
    save(); render(); say("New game! Type a name."); input.focus();
  });
  render();
  input.focus();
}

if (typeof module !== "undefined") module.exports = { ROOT, rankLabels, rowHTML };
else {
  startTop10(GAME);
  if ("serviceWorker" in navigator) navigator.serviceWorker.register(ROOT + "sw.js", { scope: ROOT });
  if (navigator.storage && navigator.storage.persist) navigator.storage.persist();
}
