// Typed-answer matching, shared by the engines (quiz.js, top10.js). Loads as a classic script (globals) and in node.

var MIN_LETTERS = 5; // a unique prefix this long is accepted while typing

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

var isLetter = ch => /\p{L}/u.test(ch);

if (typeof module !== "undefined") module.exports = { MIN_LETTERS, normalize, createMatcher, isLetter };
