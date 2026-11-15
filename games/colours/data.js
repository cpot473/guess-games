// Colours. Line order = card order, and saved progress is stored by position, so add new colours at the end.
// Format per line: Name|#hex|family|clue|alias,alias
// The swatch of the colour is always shown on the card: that is what the player guesses.
// Chips capitalise every word, so keep the clue short.
const RAW = `
Red|#e53935|red|Like a fire engine
Blue|#1e66d0|blue|Like a sunny sky
Yellow|#ffd600|yellow|Like the sun
Green|#2e7d32|green|Like fresh grass
Orange|#fb8c00|orange|Like the fruit
Purple|#8e24aa|purple|The colour of royalty
Pink|#ffc0cb|pink|Like candyfloss
Brown|#795548|brown|Like tree bark
Black|#111111|neutral|Like the night sky
White|#ffffff|neutral|Like snow
Grey|#808080|neutral|Like a rain cloud|Gray
Scarlet|#ff2400|red|Bright red, like a ladybird
Crimson|#dc143c|red|A deep, rich red
Maroon|#800000|red|A very dark red
Burgundy|#800020|red|The colour of red wine
Ruby|#9b111e|red|Like a precious jewel
Cherry|#d2042d|red|Like a ripe fruit
Amber|#ffbf00|orange|The middle traffic light
Tangerine|#f28500|orange|Like a small citrus fruit
Apricot|#fbceb1|orange|A soft, pale orange
Peach|#ffcba4|orange|Soft and pinky-orange
Coral|#ff7f50|orange|Like a reef in the sea
Rust|#b7410e|orange|Like old metal
Pumpkin|#ff7518|orange|Like a Halloween lantern
Lemon|#fff44f|yellow|Sharp and sour
Mustard|#e1ad01|yellow|Like a hot dog topping
Gold|#d4af37|yellow|Like a first-place medal
Cream|#fffdd0|yellow|Like the top of the milk
Sunflower|#ffc512|yellow|Like a tall garden flower
Lime|#32cd32|green|Zingy and bright
Olive|#808000|green|Like a pizza topping
Emerald|#50c878|green|Like a bright jewel
Mint|#98ff98|green|Cool and fresh
Sage|#9caf88|green|A soft grey-green
Jade|#00a86b|green|Like a carved stone
Forest|#228b22|green|Like the trees in the woods|Forest Green
Chartreuse|#7fff00|green|A zingy yellow-green
Navy|#000080|blue|Like a sailor's uniform|Navy Blue
Sky Blue|#87ceeb|blue|Like a clear day
Royal Blue|#4169e1|blue|Rich and bright
Cobalt|#0047ab|blue|Named after a metal
Azure|#007fff|blue|Like a cloudless sky
Cyan|#00bcd4|blue|A printer ink colour
Turquoise|#40e0d0|blue|Like a tropical sea
Teal|#008080|blue|A dark blue-green
Aqua|#00ffff|blue|Like water in a pool
Baby Blue|#89cff0|blue|A soft, pale blue
Periwinkle|#ccccff|blue|Like a small flower
Denim|#1560bd|blue|Like jeans
Indigo|#4b0082|purple|Between blue and violet
Violet|#7f00ff|purple|The end of the rainbow
Lavender|#b57edc|purple|Like a sweet-smelling flower
Lilac|#c8a2c8|purple|A pale spring purple
Mauve|#e0b0ff|purple|A soft pinky-purple
Plum|#8e4585|purple|Like a juicy fruit
Amethyst|#9966cc|purple|Like a jewel in a rock
Hot Pink|#ff1493|pink|Super bright pink
Rose|#ff007f|pink|Like a flower with thorns
Fuchsia|#d63aa1|pink|A bright pinky-purple
Magenta|#ff00ff|pink|A printer ink colour
Salmon|#fa8072|pink|Like a pink fish
Blush|#de5d83|pink|Like rosy cheeks
Cerise|#de3163|pink|French for cherry
Bubblegum|#ffc1cc|pink|Chewy and sweet
Chocolate|#5d3a1a|brown|A yummy dark treat
Tan|#d2b48c|brown|A light leathery brown
Beige|#f5f5dc|brown|A pale, sandy colour
Chestnut|#954535|brown|Like a shiny conker
Mahogany|#c04000|brown|Like rich, dark wood
Caramel|#c68e17|brown|Like toffee
Khaki|#c3b091|brown|Like army trousers
Sand|#c2b280|brown|Like the beach
Coffee|#6f4e37|brown|Like a hot drink
Copper|#b87333|brown|Like an old penny
Bronze|#cd7f32|brown|Like a third-place medal
Charcoal|#36454f|neutral|Like burnt wood
Silver|#c0c0c0|neutral|Like a second-place medal
Ivory|#fffff0|neutral|Like piano keys
Slate|#708090|neutral|Like a roof tile
`;

const COLOURS = RAW.trim().split("\n").map(line => {
  const [name, hex, family, clue, aliases] = line.split("|");
  return { name, hex, family, clue, aliases: aliases ? aliases.split(",") : undefined };
});

const FAMILIES = ["red", "orange", "yellow", "green", "blue", "purple", "pink", "brown", "neutral"];

// Light swatches need dark text on the found card (theme.css reads the --light marker).
const isLightColour = hex => {
  const [r, g, b] = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16));
  return 0.299 * r + 0.587 * g + 0.114 * b > 170;
};

const GAME = {
  id: "coloursquiz", // localStorage key
  category: "learn", // a CATEGORIES id in games/index.js
  title: "Guess the Colours!",
  placeholder: "Type a colour…",
  noun: "colour", nouns: "colours", verb: "found",
  cheers: ["Colourful!", "Brilliant!", "You got it!", "Wow, nice one!", "Great job!", "Over the rainbow!"],
  items: COLOURS,
  tag: c => `<span class="swatch" style="background:${c.hex}"></span>`,
  doneStyle: c => `--c1:${c.hex};` + (isLightColour(c.hex) ? "--c2:#555;--light:1" : ""),
  filters: FAMILIES.map(f => ({ label: f, test: c => c.family === f })),
  // chip() comes from the engine; these only run once the page has loaded it
  hints: [
    { id: "family", label: "🌈 Family", title: "Reveal the colour family", reveal: c => chip(c.family) },
    { id: "clue", label: "💡 Clue", title: "Reveal a clue", reveal: c => chip(c.clue) },
  ],
};

if (typeof module !== "undefined") module.exports = GAME;
