// Fruit. Line order = card order, and saved progress is stored by position, so add new fruit at the end.
// Format per line: Name|type|colour|alias,alias
// type: citrus, berry, stone, orchard, melon, tropical or other
// Chips capitalise every word, so keep the colour short.
const RAW = `
Apple|orchard|Red/green
Banana|tropical|Yellow
Orange|citrus|Orange
Strawberry|berry|Red
Grape|other|Green, red or purple
Lemon|citrus|Yellow
Lime|citrus|Green
Pear|orchard|Green/yellow
Peach|stone|Orange and pink
Plum|stone|Purple
Cherry|stone|Red
Blueberry|berry|Blue
Raspberry|berry|Red
Blackberry|berry|Black
Watermelon|melon|Green outside, red inside
Pineapple|tropical|Yellow, spiky skin
Mango|tropical|Yellow/orange/red
Kiwi|tropical|Brown outside, green inside|Kiwi Fruit
Coconut|tropical|Brown and hairy
Papaya|tropical|Orange inside|Pawpaw
Passion Fruit|tropical|Purple/yellow
Pomegranate|other|Red, full of seeds
Fig|other|Purple/green
Apricot|stone|Orange
Nectarine|stone|Red/yellow
Grapefruit|citrus|Yellow/pink
Tangerine|citrus|Orange
Mandarin|citrus|Orange
Clementine|citrus|Orange
Satsuma|citrus|Orange
Kumquat|citrus|Orange
Pomelo|citrus|Green/yellow
Blood Orange|citrus|Orange outside, red inside
Cranberry|berry|Red
Gooseberry|berry|Green
Blackcurrant|berry|Black
Redcurrant|berry|Red
Elderberry|berry|Dark purple
Mulberry|berry|Dark purple
Damson|stone|Dark purple
Greengage|stone|Green
Olive|stone|Green/black
Date|tropical|Brown
Quince|orchard|Yellow
Cantaloupe|melon|Orange inside
Honeydew Melon|melon|Green|Honeydew
Galia Melon|melon|Yellow outside, green inside|Galia
Guava|tropical|Green/yellow
Lychee|tropical|Red and bumpy|Litchi
Dragon Fruit|tropical|Pink with scales|Pitaya,Pitahaya
Starfruit|tropical|Yellow|Star Fruit,Carambola
Durian|tropical|Green and spiky
Jackfruit|tropical|Green and bumpy
Persimmon|tropical|Orange|Sharon Fruit
Mangosteen|tropical|Dark purple
Rambutan|tropical|Red and hairy
Tamarind|tropical|Brown pod
Plantain|tropical|Green/yellow
Custard Apple|tropical|Green and bumpy|Sugar Apple
Physalis|tropical|Orange in a papery case|Cape Gooseberry
Soursop|tropical|Green and spiky
Longan|tropical|Light brown
Breadfruit|tropical|Green
Avocado|tropical|Dark green
Tomato|other|Red
`;

const FRUIT = RAW.trim().split("\n").map(line => {
  const [name, type, colour, aliases] = line.split("|");
  return { name, type, colour, aliases: aliases ? aliases.split(",") : undefined };
});

const TYPES = ["citrus", "berry", "stone", "orchard", "melon", "tropical", "other"];

const GAME = {
  id: "fruitquiz", // localStorage key
  category: "learn", // a CATEGORIES id in games/index.js
  title: "Guess the Fruit!",
  placeholder: "Type a fruit…",
  noun: "fruit", nouns: "fruits", verb: "found",
  cheers: ["Fruit-tastic!", "Juicy!", "You got it!", "Delicious!", "Peachy!", "Great job!"],
  items: FRUIT,
  doneStyle: f => `--c1:var(--${f.type})`,
  filters: TYPES.map(t => ({ label: t, color: `var(--${t})`, test: f => f.type === t })),
  // chip() comes from the engine; these only run once the page has loaded it
  hints: [
    { id: "colour", label: "🎨 Colour", title: "Reveal the colour", reveal: f => chip(f.colour) },
    { id: "type", label: "🌳 Type", title: "Reveal the type of fruit", reveal: f => chip(f.type, `var(--${f.type})`) },
  ],
};

if (typeof module !== "undefined") module.exports = GAME;
