// The games on the launcher, in tile order: one folder per game under games/, holding
// index.html, data.js (defines GAME: title, items, and id = its localStorage key) and theme.css.
// To add a game, add its folder and one line here (then run the tests: they list what else to update).
const GAMES = [
  "pokemon",
  "peppa",
  "countries",
  "pawpatrol",
];

if (typeof module !== "undefined") module.exports = GAMES;
