// Longest rivers: each counted with its longest headwaters, as in Wikipedia's "List of river systems by length",
// checked November 2026. River lengths are hard to measure: some experts think the Amazon is longer than the Nile.
// Next in line: Lena 4,400 km, then Mekong 4,350 km.
// Format per line: Name|km|clue|alias,alias
const RAW = `
Nile|6650|Flows north through Egypt, past the pyramids
Amazon|6400|Flows through the biggest rainforest in the world, in South America
Yangtze|6300|The longest river in China, with the giant Three Gorges Dam|Chang Jiang
Mississippi|6275|The longest river system in the USA, reaching the sea near New Orleans|Missouri,Mississippi-Missouri
Yenisei|5539|Flows north across Siberia, in Russia, to the Arctic Ocean|Yenisey
Yellow River|5464|Named after the colour of the mud it carries, in China|Huang He
Ob|5410|Another long Siberian river, with a very short name: just two letters|Irtysh,Ob-Irtysh
Paraná|4880|Flows through Brazil, Paraguay and Argentina, past huge waterfalls|Parana
Congo|4700|The deepest river in the world, in the middle of Africa|Zaire
Amur|4444|Forms a long border between Russia and China
`;

const GAME = {
  id: "longestriversquiz", // localStorage key
  category: "top10", // a CATEGORIES id in games/index.js
  title: "Longest Rivers",
  rule: "The ten longest rivers in the world, counting each river from its farthest source to the sea.",
  source: "Lengths from Wikipedia's List of river systems by length, checked November 2026. Rivers are hard to measure, so other books may give different lengths.",
  placeholder: "Type a river…",
  valueLabel: "km",
  items: RAW.trim().split("\n").map(line => {
    const [name, value, clue, aliases] = line.split("|");
    return { name, value: +value, clue, aliases: aliases ? aliases.split(",") : undefined };
  }),
};

if (typeof module !== "undefined") module.exports = GAME;
