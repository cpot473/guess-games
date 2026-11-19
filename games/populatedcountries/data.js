// Most populated countries: United Nations World Population Prospects 2024 estimates for 2025, in millions
// (rounded), via statisticstimes.com, checked November 2026. In 2023 Mexico was still ahead of Ethiopia.
// Next in line: Mexico 132, then Japan 123.
// Format per line: Name|millions|clue|alias,alias
const RAW = `
India|1464|Has had the most people in the world since 2023
China|1416|Home of the Great Wall; its capital is Beijing|People's Republic of China
United States|347|Has 50 states; its capital is Washington, D.C.|USA,US,America,United States of America
Indonesia|286|Made of more than 17,000 islands
Pakistan|255|Its capital is Islamabad, and the mountain K2 is here
Nigeria|238|The African country with the most people
Brazil|213|Famous for football, carnival and the Amazon rainforest
Bangladesh|176|Its capital is Dhaka, and Bengal tigers live in its mangrove forests
Russia|144|The biggest country in the world by area|Russian Federation
Ethiopia|135|In East Africa; legend says coffee was first found here
`;

const GAME = {
  id: "populatedcountriesquiz", // localStorage key
  category: "top10", // a CATEGORIES id in games/index.js
  title: "Most Populated Countries",
  rule: "The ten countries with the most people living in them, in 2025.",
  source: "United Nations World Population Prospects 2024 estimates for 2025, checked November 2026.",
  placeholder: "Type a country…",
  valueLabel: "million people",
  items: RAW.trim().split("\n").map(line => {
    const [name, value, clue, aliases] = line.split("|");
    return { name, value: +value, clue, aliases: aliases ? aliases.split(",") : undefined };
  }),
};

if (typeof module !== "undefined") module.exports = GAME;
