// Weakest Gen 1 Pokémon: the ten Pokémon from #1-151 with the lowest base stat total
// (HP + Attack + Defense + Sp. Atk + Sp. Def + Speed, as in the current games, like Strongest Gen 1 Pokémon).
// Totals from PokeAPI (pokeapi.co), checked November 2026. Weakest first, so ties sit side by side
// (Caterpie and Weedle, Metapod and Kakuna). Next in line: Jigglypuff 270, then Nidoran♂ 273.
// Format per line: Name|total|clue
const RAW = `
Caterpie|195|A little green caterpillar, the very first bug you meet in the forest
Weedle|195|A hairy bug with a sharp poison stinger on its head
Magikarp|200|A fish that can only splash about, but it evolves into a fierce sea serpent
Metapod|205|A green cocoon that can only harden its shell
Kakuna|205|A yellow cocoon that hangs from trees and barely moves
Zubat|245|A blue bat with no eyes that lives in caves
Pidgey|251|A small brown bird that is very common in grass
Rattata|253|A purple rat with big front teeth
Spearow|262|A grumpy little bird that flaps its short wings very fast
Diglett|265|A tiny mole that pokes its head up out of the ground
`;

const GAME = {
  id: "weakestpokemonquiz", // localStorage key
  category: "top10", // a CATEGORIES id in games/index.js
  title: "Weakest Gen 1 Pokémon",
  rule: "The ten Pokémon from the first 151 with the lowest total of all six base stats. Number 1 is the weakest!",
  source: "Base stats from the Pokémon games, via pokeapi.co, checked November 2026. Tied Pokémon share a rank.",
  placeholder: "Type a Pokémon…",
  valueLabel: "total",
  lowestFirst: true, // number 1 has the lowest value
  items: RAW.trim().split("\n").map(line => {
    const [name, value, clue] = line.split("|");
    return { name, value: +value, clue };
  }),
};

if (typeof module !== "undefined") module.exports = GAME;
