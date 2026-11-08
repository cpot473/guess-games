// Generation 1 data (Pokédex #1-151), as known in Gen 1:
// - types: Gen 1 had no Fairy/Steel/Dark (e.g. Clefairy and Magnemite are single-typed)
// - evolution stage "n/m" counts only Gen 1 species (e.g. Pikachu is 1/2, as Pichu didn't exist yet)
// Format per line: Name|type,type|stage/total  (line order = Pokédex number)
const RAW = `
Bulbasaur|grass,poison|1/3
Ivysaur|grass,poison|2/3
Venusaur|grass,poison|3/3
Charmander|fire|1/3
Charmeleon|fire|2/3
Charizard|fire,flying|3/3
Squirtle|water|1/3
Wartortle|water|2/3
Blastoise|water|3/3
Caterpie|bug|1/3
Metapod|bug|2/3
Butterfree|bug,flying|3/3
Weedle|bug,poison|1/3
Kakuna|bug,poison|2/3
Beedrill|bug,poison|3/3
Pidgey|normal,flying|1/3
Pidgeotto|normal,flying|2/3
Pidgeot|normal,flying|3/3
Rattata|normal|1/2
Raticate|normal|2/2
Spearow|normal,flying|1/2
Fearow|normal,flying|2/2
Ekans|poison|1/2
Arbok|poison|2/2
Pikachu|electric|1/2
Raichu|electric|2/2
Sandshrew|ground|1/2
Sandslash|ground|2/2
Nidoran♀|poison|1/3
Nidorina|poison|2/3
Nidoqueen|poison,ground|3/3
Nidoran♂|poison|1/3
Nidorino|poison|2/3
Nidoking|poison,ground|3/3
Clefairy|normal|1/2
Clefable|normal|2/2
Vulpix|fire|1/2
Ninetales|fire|2/2
Jigglypuff|normal|1/2
Wigglytuff|normal|2/2
Zubat|poison,flying|1/2
Golbat|poison,flying|2/2
Oddish|grass,poison|1/3
Gloom|grass,poison|2/3
Vileplume|grass,poison|3/3
Paras|bug,grass|1/2
Parasect|bug,grass|2/2
Venonat|bug,poison|1/2
Venomoth|bug,poison|2/2
Diglett|ground|1/2
Dugtrio|ground|2/2
Meowth|normal|1/2
Persian|normal|2/2
Psyduck|water|1/2
Golduck|water|2/2
Mankey|fighting|1/2
Primeape|fighting|2/2
Growlithe|fire|1/2
Arcanine|fire|2/2
Poliwag|water|1/3
Poliwhirl|water|2/3
Poliwrath|water,fighting|3/3
Abra|psychic|1/3
Kadabra|psychic|2/3
Alakazam|psychic|3/3
Machop|fighting|1/3
Machoke|fighting|2/3
Machamp|fighting|3/3
Bellsprout|grass,poison|1/3
Weepinbell|grass,poison|2/3
Victreebel|grass,poison|3/3
Tentacool|water,poison|1/2
Tentacruel|water,poison|2/2
Geodude|rock,ground|1/3
Graveler|rock,ground|2/3
Golem|rock,ground|3/3
Ponyta|fire|1/2
Rapidash|fire|2/2
Slowpoke|water,psychic|1/2
Slowbro|water,psychic|2/2
Magnemite|electric|1/2
Magneton|electric|2/2
Farfetch'd|normal,flying|1/1
Doduo|normal,flying|1/2
Dodrio|normal,flying|2/2
Seel|water|1/2
Dewgong|water,ice|2/2
Grimer|poison|1/2
Muk|poison|2/2
Shellder|water|1/2
Cloyster|water,ice|2/2
Gastly|ghost,poison|1/3
Haunter|ghost,poison|2/3
Gengar|ghost,poison|3/3
Onix|rock,ground|1/1
Drowzee|psychic|1/2
Hypno|psychic|2/2
Krabby|water|1/2
Kingler|water|2/2
Voltorb|electric|1/2
Electrode|electric|2/2
Exeggcute|grass,psychic|1/2
Exeggutor|grass,psychic|2/2
Cubone|ground|1/2
Marowak|ground|2/2
Hitmonlee|fighting|1/1
Hitmonchan|fighting|1/1
Lickitung|normal|1/1
Koffing|poison|1/2
Weezing|poison|2/2
Rhyhorn|ground,rock|1/2
Rhydon|ground,rock|2/2
Chansey|normal|1/1
Tangela|grass|1/1
Kangaskhan|normal|1/1
Horsea|water|1/2
Seadra|water|2/2
Goldeen|water|1/2
Seaking|water|2/2
Staryu|water|1/2
Starmie|water,psychic|2/2
Mr. Mime|psychic|1/1
Scyther|bug,flying|1/1
Jynx|ice,psychic|1/1
Electabuzz|electric|1/1
Magmar|fire|1/1
Pinsir|bug|1/1
Tauros|normal|1/1
Magikarp|water|1/2
Gyarados|water,flying|2/2
Lapras|water,ice|1/1
Ditto|normal|1/1
Eevee|normal|1/2
Vaporeon|water|2/2
Jolteon|electric|2/2
Flareon|fire|2/2
Porygon|normal|1/1
Omanyte|rock,water|1/2
Omastar|rock,water|2/2
Kabuto|rock,water|1/2
Kabutops|rock,water|2/2
Aerodactyl|rock,flying|1/1
Snorlax|normal|1/1
Articuno|ice,flying|1/1
Zapdos|electric,flying|1/1
Moltres|fire,flying|1/1
Dratini|dragon|1/3
Dragonair|dragon|2/3
Dragonite|dragon,flying|3/3
Mewtwo|psychic|1/1
Mew|psychic|1/1
`;

const POKEMON = RAW.trim().split("\n").map((line, i) => {
  const [name, types, evo] = line.split("|");
  return { num: i + 1, name, types: types.split(","), evo, key: normalize(name) };
});

// Lowercase, letters only; Nidoran♀/♂ become "nidoranf"/"nidoranm".
function normalize(s) {
  return s.toLowerCase().replace("♀", "f").replace("♂", "m").replace(/[^a-z]/g, "");
}

const MIN_LETTERS = 5;

// Auto-accept: typed text (>= 5 letters) is a prefix of exactly one Pokémon's name.
// With force=true (Enter pressed) an exact full-name match is also accepted,
// which covers names that are prefixes of others (Pidgeot vs Pidgeotto).
function matchGuess(text, force = false) {
  const t = normalize(text);
  if (t.length < MIN_LETTERS && !(force && t.length > 0)) return null;
  const prefix = POKEMON.filter(p => p.key.startsWith(t));
  if (prefix.length === 1) return prefix[0];
  if (force) return POKEMON.find(p => p.key === t) || null;
  return null;
}

if (typeof module !== "undefined") module.exports = { POKEMON, matchGuess };
