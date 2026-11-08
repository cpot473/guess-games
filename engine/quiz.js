// "Guess the character" engine. A game page loads its data.js (which defines GAME) and then this file.
// The part above startQuiz is pure and also loads in node for the tests.

const MIN_LETTERS = 5; // a unique prefix this long is accepted while typing

// Lowercase, accents dropped; only letters and symbols such as ♀/♂ count, so spaces, dots,
// apostrophes and digits don't matter ("Mr. Mime" = "mrmime", "Chloé" = "chloe").
function normalize(s) {
  return s.normalize("NFD").toLowerCase().replace(/[^\p{L}\p{So}]/gu, "");
}

// Each item can be guessed by its name or by any of its aliases.
function createMatcher(items) {
  const keys = items.map(it => [it.name, ...(it.aliases || [])].map(normalize));
  const only = test => {
    const hits = items.filter((it, i) => keys[i].some(test));
    return hits.length === 1 ? hits[0] : null;
  };
  // A full name or alias. Accepted after a pause or on Enter, because it can also be
  // the start of a longer name (Pidgeot / Pidgeotto, Mew / Mewtwo).
  function exact(text) {
    const t = normalize(text);
    return t ? only(k => k === t) : null;
  }
  // Auto-accept: the text (MIN_LETTERS or more) is a prefix of exactly one item.
  // With force=true (Enter) any length counts, and an exact match is accepted as well.
  function match(text, force = false) {
    const t = normalize(text);
    if (t.length < MIN_LETTERS && !(force && t.length > 0)) return null;
    return only(k => k.startsWith(t)) || (force ? exact(text) : null);
  }
  return { match, exact };
}

const isLetter = ch => /\p{L}/u.test(ch);

// Indexes of the letters in name that are not revealed yet.
function hiddenLetters(name, revealed) {
  return [...name].flatMap((ch, i) => isLetter(ch) && !revealed.includes(i) ? [i] : []);
}

// Helper for the games' hint reveal functions.
function chip(text, color) {
  return `<span class="chip"${color ? ` style="--c:${color}"` : ""}>${text}</span>`;
}

// One card. h = { letters: [indexes], <hint id>: true, ... }
function cellHTML(game, item, id, guessed, h) {
  const tag = game.tag ? `<div class="tag">${game.tag(item)}</div>` : "";
  const hints = game.hints || [];
  if (guessed) {
    return `<div class="cell done" data-n="${id}" style="${game.doneStyle ? game.doneStyle(item) : ""}">
      ${tag}<div class="name">${item.name}</div>
      <div>${hints.map(x => x.reveal(item)).join(" ")}</div></div>`;
  }
  h = h || { letters: [] };
  // an em space between words, as normal spaces collapse with the ones between letters
  const shown = [...item.name].map((ch, i) => ch === " " ? " " : isLetter(ch) && !h.letters.includes(i) ? "_" : ch).join(" ");
  const left = hiddenLetters(item.name, h.letters).length;
  return `<div class="cell" data-n="${id}">
    ${tag}<div class="name">${shown}</div>
    <div>${hints.filter(x => h[x.id]).map(x => x.reveal(item)).join(" ")}</div>
    <div class="hints">
      <button data-h="letter" ${left <= 1 ? "disabled" : ""} title="Reveal a letter">🔤 Letter</button>
      ${hints.map(x => `<button data-h="${x.id}" ${h[x.id] ? "disabled" : ""} title="${x.title}">${x.label}</button>`).join("")}
    </div></div>`;
}

// Refocusing the input after a touch tap reopens the on-screen keyboard and scrolls the page,
// so only refocus after a mouse click or a keyboard press. Older browsers send a click without
// pointerType; for them the type of the last pointerdown is used.
function shouldRefocus(e, lastPointerType) {
  const type = e && "pointerType" in e ? e.pointerType : lastPointerType;
  return type !== "touch" && type !== "pen";
}

function startQuiz(game) {
  const items = game.items, total = items.length, { match, exact } = createMatcher(items);
  const filters = game.filters ? [{ label: "All", test: () => true }, ...game.filters] : [];

  document.body.insertAdjacentHTML("afterbegin", `
    <header>
      <h1>${game.title}</h1>
      <div class="score"><span id="score">0</span> / ${total} <button id="reset" title="Start over">New game</button></div>
      <div class="bar"><div id="bar-fill"></div></div>
      <input id="guess" type="text" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false"
             enterkeyhint="go" placeholder="${game.placeholder}">
      <div id="message" aria-live="polite">Type a ${game.noun}'s name. After ${MIN_LETTERS} letters it's checked automatically!</div>
    </header>
    <nav id="filters" aria-label="Filter"></nav>
    <main id="table"></main>`);

  const $ = id => document.getElementById(id);
  const input = $("guess"), msg = $("message");

  // state: guessed = Set of ids (position in items, from 1); hints[id] = { letters: [indexes], <hint id>: true }
  let state = load();
  let filter = 0;

  function load() {
    try {
      const s = JSON.parse(localStorage.getItem(game.id));
      if (s) return { guessed: new Set(s.guessed), hints: s.hints || {} };
    } catch (e) { /* no saved game */ }
    return { guessed: new Set(), hints: {} };
  }
  function save() {
    try { localStorage.setItem(game.id, JSON.stringify({ guessed: [...state.guessed], hints: state.hints })); } catch (e) {}
  }

  let lastPointerType = "";
  document.addEventListener("pointerdown", e => { lastPointerType = e.pointerType; }, true);
  function refocus(e) {
    if (shouldRefocus(e, lastPointerType)) input.focus({ preventScroll: true });
  }

  function render() {
    const test = filters.length ? filters[filter].test : () => true;
    $("table").innerHTML = items.map((it, i) => test(it) ? cellHTML(game, it, i + 1, state.guessed.has(i + 1), state.hints[i + 1]) : "")
      .join("") || `<p class="empty">Nothing here!</p>`;
    $("score").textContent = state.guessed.size;
    $("bar-fill").style.width = (state.guessed.size / total * 100) + "%";
    $("filters").querySelectorAll("button").forEach(b => b.classList.toggle("active", +b.dataset.f === filter));
  }

  function say(text, cls) { msg.textContent = text; msg.className = cls || ""; }

  function accept(item) {
    const id = items.indexOf(item) + 1;
    input.value = "";
    if (state.guessed.has(id)) { say(`You already ${game.verb} ${item.name}!`, "bad"); return; }
    state.guessed.add(id);
    save(); render();
    const done = state.guessed.size === total;
    say(done ? `🏆 YOU DID IT! You guessed all ${total} ${game.nouns}! 🏆`
             : `${game.cheers[Math.floor(Math.random() * game.cheers.length)]} ${item.name}!`, "good");
  }

  // The input event also fires while an Android keyboard is composing a word, and input.value
  // then already holds the composed text, so no key codes are needed here.
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
    const it = match(input.value, true);
    if (it) accept(it);
    else {
      say("Not quite — try again!", "bad");
      input.classList.remove("shake"); void input.offsetWidth; input.classList.add("shake");
    }
  });

  if (filters.length) {
    $("filters").innerHTML = filters.map((f, i) =>
      `<button data-f="${i}"${f.color ? ` class="tinted" style="--c:${f.color}"` : ""}>${f.label}</button>`).join("");
    $("filters").addEventListener("click", e => {
      const b = e.target.closest("button"); if (!b) return;
      filter = +b.dataset.f; render(); refocus(e);
    });
  }

  $("table").addEventListener("click", e => {
    const b = e.target.closest("button[data-h]"); if (!b) return;
    const n = +b.closest(".cell").dataset.n, it = items[n - 1];
    const h = state.hints[n] = state.hints[n] || { letters: [] };
    if (b.dataset.h !== "letter") h[b.dataset.h] = true;
    else {
      // random letter that isn't revealed yet; always keep at least one letter hidden
      const hidden = hiddenLetters(it.name, h.letters);
      if (hidden.length > 1) h.letters.push(hidden[Math.floor(Math.random() * hidden.length)]);
    }
    save(); render(); refocus(e);
  });

  $("reset").addEventListener("click", e => {
    if (state.guessed.size && !confirm("Start a new game? Your progress will be lost.")) { refocus(e); return; }
    state = { guessed: new Set(), hints: {} };
    save(); render(); say(`New game! Type a ${game.noun}'s name.`); refocus(e);
  });

  render();
  input.focus();
}

if (typeof module !== "undefined") module.exports = { MIN_LETTERS, normalize, createMatcher, hiddenLetters, chip, cellHTML, shouldRefocus };
else startQuiz(GAME);
