// Fastest land animals, by the top of each animal's measured speed, from Wikipedia's "Fastest animals",
// checked November 2026. Speeds come from the page's main table where the animal is in it (cheetah, ostrich,
// pronghorn, Quarter Horse, springbok, blue wildebeest, Thomson's gazelle), otherwise from its mammals table.
// Speeds are hard to measure, so books disagree. Five animals tie at 80 km/h, so all five are in.
// (Birds diving through the air are much faster: the peregrine falcon reaches 389 km/h.)
// Format per line: Name|km/h|clue|alias,alias
const RAW = `
Cheetah|120.7|A big cat with black spots, built for sprinting
Ostrich|97|The biggest bird in the world: it can't fly, but it can run
Tsessebe|90|A reddish-brown African antelope with dark patches on its legs|Topi
Pronghorn|88.5|Looks like an antelope and lives in North America; it can keep up its speed for miles
Horse|88.5|People ride them and race them; the Quarter breed is the fastest sprinter|Quarter Horse
Springbok|88|A South African antelope that bounces high into the air when it's excited
Wildebeest|80.5|Huge herds of them cross the Serengeti every year|Blue wildebeest,Gnu
Thomson's gazelle|80.5|A small, fast antelope of East Africa, a favourite meal of cheetahs|Thomsons gazelle
Blackbuck|80|An antelope from India with long, twisting horns
Grant's gazelle|80|An African antelope with long horns shaped like a lyre|Grants gazelle
Hartebeest|80|An African antelope with a long face and bracket-shaped horns
Impala|80|An African antelope that can leap three metres into the air
Hare|80|Like a rabbit, but with longer ears and longer legs
`;

const GAME = {
  id: "fastestanimalsquiz", // localStorage key
  category: "top10", // a CATEGORIES id in games/index.js
  title: "Fastest Land Animals",
  rule: "The fastest animals that run on land, by their top speed. Five animals tie at 80 km/h, so they all count!",
  source: "Top speeds from Wikipedia's Fastest animals, checked November 2026. Speeds are hard to measure, so other books may disagree.",
  placeholder: "Type an animal…",
  valueLabel: "km/h",
  items: RAW.trim().split("\n").map(line => {
    const [name, value, clue, aliases] = line.split("|");
    return { name, value: +value, clue, aliases: aliases ? aliases.split(",") : undefined };
  }),
};

if (typeof module !== "undefined") module.exports = GAME;
