// Tallest mountains: the ten highest peaks above sea level, all in the Himalaya and Karakoram of Asia.
// Heights from Wikipedia's "List of highest mountains on Earth", checked November 2026.
// Next in line: Gasherbrum I 8,080 m, then Broad Peak 8,051 m.
// Format per line: Name|metres|clue|alias,alias
const RAW = `
Mount Everest|8849|The highest place on Earth, on the border of Nepal and China|Everest
K2|8611|Its name is just a letter and a number; it's in Pakistan and China|K two
Kangchenjunga|8586|Its name means "five treasures of the snow"; it's between Nepal and India|Kanchenjunga
Lhotse|8516|Joined to Everest by a high, icy ridge
Makalu|8485|Shaped like a four-sided pyramid, near Everest
Cho Oyu|8188|Its name means "turquoise goddess"; it's on the Nepal–China border
Dhaulagiri|8167|Its name means "dazzling white mountain"; it's in Nepal
Manaslu|8163|Its name means "mountain of the spirit"; it's in Nepal
Nanga Parbat|8126|Its name means "naked mountain"; it's in Pakistan
Annapurna|8091|Named after a goddess of food, it was the first 8,000 m peak ever climbed
`;

const GAME = {
  id: "tallestmountainsquiz", // localStorage key
  category: "top10", // a CATEGORIES id in games/index.js
  title: "Tallest Mountains",
  rule: "The ten highest mountains in the world, measured in metres above sea level.",
  source: "Heights from Wikipedia's List of highest mountains on Earth, checked November 2026.",
  placeholder: "Type a mountain…",
  valueLabel: "m",
  items: RAW.trim().split("\n").map(line => {
    const [name, value, clue, aliases] = line.split("|");
    return { name, value: +value, clue, aliases: aliases ? aliases.split(",") : undefined };
  }),
};

if (typeof module !== "undefined") module.exports = GAME;
