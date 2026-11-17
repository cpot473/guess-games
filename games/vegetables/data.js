// Vegetables. Line order = card order, and saved progress is stored by position, so add new vegetables at the end.
// Format per line: Name|part|colour|alias,alias
// part: the part of the plant that we eat: root, leaf, stem, flower, fruit, seed or bulb
// (Potatoes and sweet potatoes are listed as roots, though a potato is really a stem tuber.)
// Fruit that are usually eaten as fruit (tomato, avocado) are in the Fruit game, not here.
// Chips capitalise every word, so keep the colour short.
const RAW = `
Carrot|root|Orange
Potato|root|Brown outside, white inside
Sweet Potato|root|Orange inside
Parsnip|root|Cream
Beetroot|root|Deep red|Beet
Radish|root|Red and white
Turnip|root|Purple and white
Swede|root|Orange and purple|Rutabaga
Celeriac|root|Brown and knobbly
Yam|root|Brown
Cassava|root|Brown outside, white inside|Manioc
Horseradish|root|Cream
Ginger|root|Beige
Jerusalem Artichoke|root|Brown|Sunchoke
Daikon|root|White|Mooli
Onion|bulb|Brown or red
Garlic|bulb|White
Shallot|bulb|Brown or purple
Spring Onion|bulb|Green and white|Scallion
Chive|bulb|Green|Chives
Cabbage|leaf|Green, red or white
Lettuce|leaf|Green
Spinach|leaf|Dark green
Kale|leaf|Dark green and curly
Brussels Sprout|leaf|Green|Sprout,Brussels Sprouts,Sprouts
Rocket|leaf|Green|Arugula
Watercress|leaf|Green
Chard|leaf|Green with colourful stalks|Swiss Chard
Pak Choi|leaf|Green and white|Bok Choy
Spring Greens|leaf|Green
Collard Greens|leaf|Dark green|Collards
Endive|leaf|Pale green|Chicory
Radicchio|leaf|Dark red and white
Iceberg Lettuce|leaf|Pale green
Romaine Lettuce|leaf|Green|Cos Lettuce,Cos
Celery|stem|Pale green
Asparagus|stem|Green
Rhubarb|stem|Pink and red
Leek|stem|White and green
Kohlrabi|stem|Pale green or purple
Fennel|stem|White and green
Broccoli|flower|Green
Cauliflower|flower|White
Artichoke|flower|Green|Globe Artichoke
Romanesco|flower|Lime green swirls
Cucumber|fruit|Green
Courgette|fruit|Green|Zucchini
Marrow|fruit|Green
Pumpkin|fruit|Orange
Butternut Squash|fruit|Beige outside, orange inside|Butternut
Aubergine|fruit|Dark purple|Eggplant
Red Pepper|fruit|Red|Bell Pepper
Green Pepper|fruit|Green
Yellow Pepper|fruit|Yellow
Chilli|fruit|Red or green|Chili,Chilli Pepper
Okra|fruit|Green|Ladies' Fingers,Lady's Fingers
Gherkin|fruit|Small and green|Pickle
Pea|seed|Green|Peas
Green Bean|seed|Green|French Bean,Runner Bean
Broad Bean|seed|Pale green|Fava Bean
Sweetcorn|seed|Yellow|Corn,Corn on the Cob
Mangetout|seed|Green|Snow Pea
Sugar Snap Pea|seed|Green|Sugar Snap
Edamame|seed|Green|Soybean
Chickpea|seed|Beige|Garbanzo Bean
Lentil|seed|Brown, green or red|Lentils
Kidney Bean|seed|Dark red
`;

const VEG = RAW.trim().split("\n").map(line => {
  const [name, part, colour, aliases] = line.split("|");
  return { name, part, colour, aliases: aliases ? aliases.split(",") : undefined };
});

const PARTS = ["root", "bulb", "leaf", "stem", "flower", "fruit", "seed"];

const GAME = {
  id: "vegetablesquiz", // localStorage key
  category: "learn", // a CATEGORIES id in games/index.js
  title: "Guess the Vegetables!",
  placeholder: "Type a vegetable…",
  noun: "vegetable", nouns: "vegetables", verb: "found",
  cheers: ["Eat your greens!", "Veg-tastic!", "You got it!", "Crunchy!", "Fresh!", "Great job!"],
  items: VEG,
  doneStyle: v => `--c1:var(--${v.part})`,
  filters: PARTS.map(p => ({ label: p, color: `var(--${p})`, test: v => v.part === p })),
  // chip() comes from the engine; these only run once the page has loaded it
  hints: [
    { id: "colour", label: "🎨 Colour", title: "Reveal the colour", reveal: v => chip(v.colour) },
    { id: "part", label: "🌱 Part", title: "Reveal which part of the plant we eat", reveal: v => chip(v.part, `var(--${v.part})`) },
  ],
};

if (typeof module !== "undefined") module.exports = GAME;
