// Biggest Gen 1 Pokémon: the tallest Pokémon from #1-151, by the height in their Pokédex entry
// (the same in every game; Alolan Exeggutor, 10.9 m, is a later form and doesn't count).
// Heights from PokeAPI (pokeapi.co), checked November 2026. Five Pokémon tie at 2.0 m, so all five are in.
// Next in line: Arcanine and Rhydon, 1.9 m.
// Format per line: Name|metres|clue
const RAW = `
Onix|8.8|A giant snake made of boulders that tunnels underground
Gyarados|6.5|A fierce sea serpent that evolves from a weak, splashing fish
Dragonair|4|A graceful blue dragon with crystal orbs on its neck and tail
Arbok|3.5|A purple cobra with a scary face pattern on its hood
Lapras|2.5|A gentle water Pokémon that ferries people across the sea
Dragonite|2.2|A kind orange dragon that can fly around the world in 16 hours
Kangaskhan|2.2|A mother who carries her baby in a pouch on her tummy
Snorlax|2.1|A huge sleepy Pokémon that blocks the road
Venusaur|2|Has a big flower on its back, and is the last evolution of a grass starter
Ekans|2|A long purple snake whose name is a word spelled backwards
Mewtwo|2|A psychic clone made in a lab
Moltres|2|The legendary bird of fire
Exeggutor|2|A walking palm tree with three coconut-like heads
`;

const GAME = {
  id: "biggestpokemonquiz", // localStorage key
  category: "top10", // a CATEGORIES id in games/index.js
  title: "Biggest Gen 1 Pokémon",
  rule: "The tallest Pokémon from the first 151, by their Pokédex height. Five tie at 2 metres, so they all count!",
  source: "Pokédex heights from the Pokémon games, via pokeapi.co, checked November 2026. Tied Pokémon share a rank.",
  placeholder: "Type a Pokémon…",
  valueLabel: "m",
  items: RAW.trim().split("\n").map(line => {
    const [name, value, clue] = line.split("|");
    return { name, value: +value, clue };
  }),
};

if (typeof module !== "undefined") module.exports = GAME;
