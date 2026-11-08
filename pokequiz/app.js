const TYPES = ["normal","fire","water","electric","grass","ice","fighting","poison","ground","flying","psychic","bug","rock","ghost","dragon"];
const STORE = "pokequiz-gen1";

// state: guessed = Set of nums; hints[num] = { letters: [indexes], type: bool, evo: bool }
let state = load();
let filter = "all";

const $ = id => document.getElementById(id);
const input = $("guess"), msg = $("message");

function load() {
  try {
    const s = JSON.parse(localStorage.getItem(STORE));
    if (s) return { guessed: new Set(s.guessed), hints: s.hints || {} };
  } catch (e) { /* no saved game */ }
  return { guessed: new Set(), hints: {} };
}
function save() {
  try { localStorage.setItem(STORE, JSON.stringify({ guessed: [...state.guessed], hints: state.hints })); } catch (e) {}
}

const FILTERS = [
  ["all", "All", () => true],
  ["r1", "1-50", p => p.num <= 50],
  ["r2", "51-100", p => p.num > 50 && p.num <= 100],
  ["r3", "101-151", p => p.num > 100],
  ...TYPES.map(t => ["t-" + t, t, p => p.types.includes(t)]),
];

function typeChip(t) { return `<span class="chip" style="--c:var(--${t})">${t}</span>`; }

function buildFilters() {
  $("filters").innerHTML = FILTERS.map(([id, label]) => {
    const t = id.startsWith("t-") ? ` type" style="--c:var(--${label})` : "";
    return `<button data-f="${id}" class="${id === filter ? "active " : ""}${t}">${label}</button>`;
  }).join("");
}

function cellHTML(p) {
  if (state.guessed.has(p.num)) {
    return `<div class="cell done" data-n="${p.num}" style="--c1:var(--${p.types[0]});--c2:var(--${p.types[p.types.length - 1]})">
      <div class="num">#${p.num}</div><div class="name">${p.name}</div>
      <div>${p.types.map(typeChip).join("")} <span class="evo">${p.evo}</span></div></div>`;
  }
  const h = state.hints[p.num] || { letters: [] };
  const shown = [...p.name].map((ch, i) => /[A-Za-z]/.test(ch) ? (h.letters.includes(i) ? ch : "_") : ch).join(" ");
  const left = [...p.name].filter(ch => /[A-Za-z]/.test(ch)).length - h.letters.length;
  return `<div class="cell" data-n="${p.num}">
    <div class="num">#${p.num}</div><div class="name">${shown}</div>
    <div>${h.type ? p.types.map(typeChip).join("") : ""}${h.evo ? `<span class="evo">${p.evo}</span>` : ""}</div>
    <div class="hints">
      <button data-h="letter" ${left <= 1 ? "disabled" : ""} title="Reveal a letter">🔤 Letter</button>
      <button data-h="type" ${h.type ? "disabled" : ""} title="Reveal type">🔥 Type</button>
      <button data-h="evo" ${h.evo ? "disabled" : ""} title="Reveal evolution level">⭐ Evo</button>
    </div></div>`;
}

function render() {
  const fn = FILTERS.find(f => f[0] === filter)[2];
  const list = POKEMON.filter(fn);
  $("table").innerHTML = list.map(cellHTML).join("") || `<p class="empty">Nothing here!</p>`;
  $("score").textContent = state.guessed.size;
  $("bar-fill").style.width = (state.guessed.size / 151 * 100) + "%";
  $("filters").querySelectorAll("button").forEach(b => b.classList.toggle("active", b.dataset.f === filter));
}

function say(text, cls) { msg.textContent = text; msg.className = cls || ""; }

const CHEERS = ["Awesome!", "You got it!", "Super!", "Amazing!", "Wow, nice one!", "Great job!"];

function accept(p) {
  input.value = "";
  if (state.guessed.has(p.num)) { say(`You already caught ${p.name}!`, "bad"); return; }
  state.guessed.add(p.num);
  save(); render();
  const done = state.guessed.size === 151;
  say(done ? "🏆 YOU DID IT! You guessed all 151 Pokémon! 🏆" : `${CHEERS[Math.floor(Math.random() * CHEERS.length)]} ${p.name}!`, "good");
}

// A full name that is also the start of a longer name (Pidgeot / Pidgeotto, Mew / Mewtwo)
// can't be auto-accepted instantly, so accept it once the player pauses typing.
let pauseTimer;
input.addEventListener("input", () => {
  clearTimeout(pauseTimer);
  const p = matchGuess(input.value);
  if (p) { accept(p); return; }
  const key = normalize(input.value);
  const exact = POKEMON.find(q => q.key === key);
  if (exact) pauseTimer = setTimeout(() => { if (normalize(input.value) === key) accept(exact); }, 800);
});
input.addEventListener("keydown", e => {
  if (e.key !== "Enter" || !input.value.trim()) return;
  clearTimeout(pauseTimer);
  const p = matchGuess(input.value, true);
  if (p) accept(p);
  else {
    say("Not quite — try again!", "bad");
    input.classList.remove("shake"); void input.offsetWidth; input.classList.add("shake");
  }
  input.focus();
});

$("filters").addEventListener("click", e => {
  const b = e.target.closest("button"); if (!b) return;
  filter = b.dataset.f; render(); input.focus();
});

$("table").addEventListener("click", e => {
  const b = e.target.closest("button[data-h]"); if (!b) return;
  const n = +b.closest(".cell").dataset.n, p = POKEMON[n - 1];
  const h = state.hints[n] = state.hints[n] || { letters: [] };
  if (b.dataset.h === "type") h.type = true;
  else if (b.dataset.h === "evo") h.evo = true;
  else {
    // random letter that isn't revealed yet; always keep at least one letter hidden
    const hidden = [...p.name].map((ch, i) => i).filter(i => /[A-Za-z]/.test(p.name[i]) && !h.letters.includes(i));
    if (hidden.length > 1) h.letters.push(hidden[Math.floor(Math.random() * hidden.length)]);
  }
  save(); render(); input.focus();
});

$("reset").addEventListener("click", () => {
  if (state.guessed.size && !confirm("Start a new game? Your progress will be lost.")) { input.focus(); return; }
  state = { guessed: new Set(), hints: {} };
  save(); render(); say("New game! Type a Pokémon's name."); input.focus();
});

buildFilters();
render();
input.focus();
