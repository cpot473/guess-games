// "Do you know?" engine: multiple-choice rounds from a question bank. A game page loads its data.js (which
// defines GAME) and then this file. GAME.items are questions: { q, options: [the right answer first, then the
// wrong ones], level: "easy" | "hard", fact }. The engine shuffles the options, so the data never has to.
// Progress is guessed[]: the ids (position in items, from 1) of questions answered right at least once.
// The part above startKnow is pure and also loads in node for the tests.
const ROOT = "../../"; // from a game page (games/<name>/) to the launcher and the service worker
const ROUND = 10;      // questions in a round
const LEVELS = ["all", "easy", "hard"];

// Fisher-Yates copy. rand returns a number in [0, 1).
function shuffle(list, rand = Math.random) {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

// The ids for a round: questions of that level, ones never answered right first, each group in random order.
function pickRound(items, mastered, level, size = ROUND, rand = Math.random) {
  const ids = items.map((it, i) => i + 1).filter(id => level === "all" || items[id - 1].level === level);
  const fresh = shuffle(ids.filter(id => !mastered.has(id)), rand), done = shuffle(ids.filter(id => mastered.has(id)), rand);
  return [...fresh, ...done].slice(0, size);
}

// A question's options in random order, and which one is right.
function askOptions(item, rand = Math.random) {
  const options = shuffle(item.options, rand);
  return { options, answer: options.indexOf(item.options[0]) };
}

function startKnow(game) {
  const items = game.items, total = items.length, $ = id => document.getElementById(id);
  document.body.insertAdjacentHTML("afterbegin", `
    <header>
      <a id="home" href="${ROOT}#${game.category}">🏠 Back</a>
      <h1>${game.title}</h1>
      <div class="score"><span id="score">0</span> / ${total} known <button id="reset" title="Start over">New game</button></div>
      <div class="bar"><div id="bar-fill"></div></div>
    </header>
    <main id="stage" aria-live="polite"></main>`);

  let state = load(), round = null;
  function load() {
    try {
      const s = JSON.parse(localStorage.getItem(game.id));
      if (s) return { guessed: new Set(s.guessed), best: s.best || 0 };
    } catch (e) { /* no saved game */ }
    return { guessed: new Set(), best: 0 };
  }
  function save() {
    try { localStorage.setItem(game.id, JSON.stringify({ guessed: [...state.guessed], best: state.best })); } catch (e) {}
  }
  function progress() {
    $("score").textContent = state.guessed.size;
    $("bar-fill").style.width = (state.guessed.size / total * 100) + "%";
  }

  function home() {
    round = null; progress();
    const count = l => items.filter(it => l === "all" || it.level === l).length;
    $("stage").innerHTML = `
      <p class="best">${state.best ? `Best round: ${state.best} / ${ROUND}` : "Ready for your first round?"}</p>
      <div class="levels">${LEVELS.map(l => `<button data-level="${l}">${l === "all" ? "Mixed" : l}<small>${count(l)} questions</small></button>`).join("")}</div>`;
  }

  function start(level) {
    const ids = pickRound(items, state.guessed, level);
    round = { ids, n: 0, score: 0, shown: null };
    ask();
  }

  function ask() {
    const id = round.ids[round.n], it = items[id - 1];
    round.shown = askOptions(it);
    $("stage").innerHTML = `
      <p class="count">Question ${round.n + 1} of ${round.ids.length} <span class="level ${it.level}">${it.level}</span></p>
      <h2 class="question">${it.q}</h2>
      <div class="options">${round.shown.options.map((o, i) => `<button data-o="${i}">${o}</button>`).join("")}</div>
      <div id="result"></div>`;
  }

  function answer(i) {
    const id = round.ids[round.n], it = items[id - 1], right = i === round.shown.answer;
    if (right) { round.score++; state.guessed.add(id); save(); progress(); }
    $("stage").querySelectorAll(".options button").forEach((b, k) => {
      b.disabled = true;
      b.classList.toggle("right", k === round.shown.answer);
      b.classList.toggle("wrong", k === i && !right);
    });
    const last = round.n === round.ids.length - 1;
    $("result").innerHTML = `<p class="${right ? "good" : "bad"}">${right ? "✅ Correct!" : "❌ Not quite!"} ${it.fact}</p>
      <button id="next">${last ? "See my score" : "Next question"}</button>`;
    $("next").focus({ preventScroll: true });
  }

  function finish() {
    const n = round.ids.length, s = round.score, record = s > state.best;
    if (record) { state.best = s; save(); }
    $("stage").innerHTML = `
      <h2 class="question">You got ${s} out of ${n}!</h2>
      <p class="good">${s === n ? "🏆 Perfect round!" : s >= n * 0.7 ? "🌟 Great job!" : "Good try — you'll learn more each round!"}${record ? " New best!" : ""}</p>
      <div class="levels"><button data-again>Play again</button></div>`;
    round = null;
  }

  $("stage").addEventListener("click", e => {
    const b = e.target.closest("button"); if (!b) return;
    if (b.dataset.level) start(b.dataset.level);
    else if (b.dataset.o !== undefined) answer(+b.dataset.o);
    else if (b.id === "next") { round.n++; round.n < round.ids.length ? ask() : finish(); }
    else if (b.dataset.again !== undefined) home();
  });
  $("reset").addEventListener("click", () => {
    if ((state.guessed.size || state.best) && !confirm("Start a new game? Your progress will be lost.")) return;
    state = { guessed: new Set(), best: 0 }; save(); home();
  });
  home();
}

if (typeof module !== "undefined") module.exports = { ROOT, ROUND, LEVELS, shuffle, pickRound, askOptions };
else {
  startKnow(GAME);
  if ("serviceWorker" in navigator) navigator.serviceWorker.register(ROOT + "sw.js", { scope: ROOT });
  if (navigator.storage && navigator.storage.persist) navigator.storage.persist();
}
