// The games on the launcher, in tile order: one folder per game under games/, holding
// index.html, data.js (defines GAME: title, category, items, and id = its localStorage key) and theme.css.
// To add a game, add its folder and one line here (then run the tests: they list what else to update).
const GAMES = [
  "pokemon",
  "peppa",
  "countries",
  "pawpatrol",
  "bluey",
  "sprunki",
  "fruit",
  "colours",
  "elements",
  "bones",
];

// The launcher's home page: one tile per category, in this order. A game's GAME.category is one of these ids.
// A category with no game yet shows a "Coming soon" tile.
const CATEGORIES = [
  { id: "characters", name: "Characters", icon: "🎭" },
  { id: "know", name: "Do you know?", icon: "🤔" },
  { id: "top10", name: "Top 10s", icon: "🏆" },
  { id: "learn", name: "Learn!", icon: "📚" },
];

if (typeof module !== "undefined") module.exports = { GAMES, CATEGORIES };
