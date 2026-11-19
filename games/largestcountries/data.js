// Largest countries by total area (land plus lakes and rivers), from Wikipedia's "List of countries and
// dependencies by area" (United Nations Statistics Division figures), checked November 2026.
// Some sources count coastal waters too, which puts the United States ahead of China.
// Next in line: DR Congo 2,344,858 km², then Saudi Arabia 2,149,690 km².
// Format per line: Name|km²|clue|alias,alias
const RAW = `
Russia|17098246|Stretches across Europe and Asia, with 11 time zones|Russian Federation
Canada|9984670|Its flag has a red maple leaf
China|9596960|Home of the Great Wall|People's Republic of China
United States|9525067|Has 50 states, and its flag has 50 stars|USA,US,America,United States of America
Brazil|8510346|Most of the Amazon rainforest is here, and people speak Portuguese
Australia|7741220|A country that is a whole continent, home of kangaroos
India|3287263|Home of the Taj Mahal
Argentina|2780400|In South America, home of the tango
Kazakhstan|2724910|The biggest country in the world with no coast
Algeria|2381741|The biggest country in Africa, mostly covered by the Sahara
`;

const GAME = {
  id: "largestcountriesquiz", // localStorage key
  category: "top10", // a CATEGORIES id in games/index.js
  title: "Largest Countries",
  rule: "The ten biggest countries in the world by area, counting land, lakes and rivers.",
  source: "Areas from the United Nations, via Wikipedia's List of countries and dependencies by area, checked November 2026.",
  placeholder: "Type a country…",
  valueLabel: "km²",
  items: RAW.trim().split("\n").map(line => {
    const [name, value, clue, aliases] = line.split("|");
    return { name, value: +value, clue, aliases: aliases ? aliases.split(",") : undefined };
  }),
};

if (typeof module !== "undefined") module.exports = GAME;
