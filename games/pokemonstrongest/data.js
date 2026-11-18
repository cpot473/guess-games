// Strongest Gen 1 Pokémon: the ten Pokémon from #1-151 with the highest base stat total
// (HP + Attack + Defense + Sp. Atk + Sp. Def + Speed, as in the current games, where Special is split in two).
// Checked against pokemondb.net/pokedex/stats/gen1 in November 2026. Rankings only change if a new game changes a stat.
// Best first, so ties sit side by side (Mew and Dragonite, the three birds, Gyarados and Snorlax).
// Next in line: Charizard 534, then Blastoise and Exeggutor 530.
const RAW = `
Mewtwo|680|A psychic clone made in a lab
Dragonite|600|An orange dragon that can fly around the world in 16 hours
Mew|600|A tiny pink Pokémon said to hold the DNA of every Pokémon
Articuno|580|The legendary bird of ice
Zapdos|580|The legendary bird of lightning
Moltres|580|The legendary bird of fire
Arcanine|555|A fast, fiery dog Pokémon
Gyarados|540|It evolves from a weak Magikarp
Snorlax|540|A huge sleepy Pokémon that blocks the road
Lapras|535|A gentle water Pokémon that ferries people across the sea
`;

const GAME = {
  id: "pokemonstrongestquiz", // localStorage key
  category: "top10", // a CATEGORIES id in games/index.js
  title: "Strongest Gen 1 Pokémon",
  rule: "The ten Pokémon from the first 151 with the highest total of all six base stats.",
  source: "Base stats from the Pokémon games, via pokemondb.net, checked November 2026. Tied Pokémon share a rank.",
  placeholder: "Type a Pokémon…",
  valueLabel: "total",
  items: RAW.trim().split("\n").map(line => {
    const [name, value, clue] = line.split("|");
    return { name, value: +value, clue };
  }),
};

if (typeof module !== "undefined") module.exports = GAME;
