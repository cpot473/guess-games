// Generation 2 data (Pokédex #152-251), as known in Gen 2:
// - types: Steel and Dark are new; there is no Fairy yet (e.g. Togepi and Marill are not Fairy)
// - evolution stage "n/m" counts only Gen 1 and Gen 2 species (e.g. Sneasel is 1/1, as Weavile didn't exist yet)
// Format per line: Name|type,type|stage/total  (line order = Pokédex number, from 152)
const RAW = `
Chikorita|grass|1/3
Bayleef|grass|2/3
Meganium|grass|3/3
Cyndaquil|fire|1/3
Quilava|fire|2/3
Typhlosion|fire|3/3
Totodile|water|1/3
Croconaw|water|2/3
Feraligatr|water|3/3
Sentret|normal|1/2
Furret|normal|2/2
Hoothoot|normal,flying|1/2
Noctowl|normal,flying|2/2
Ledyba|bug,flying|1/2
Ledian|bug,flying|2/2
Spinarak|bug,poison|1/2
Ariados|bug,poison|2/2
Crobat|poison,flying|3/3
Chinchou|water,electric|1/2
Lanturn|water,electric|2/2
Pichu|electric|1/3
Cleffa|normal|1/3
Igglybuff|normal|1/3
Togepi|normal|1/2
Togetic|normal,flying|2/2
Natu|psychic,flying|1/2
Xatu|psychic,flying|2/2
Mareep|electric|1/3
Flaaffy|electric|2/3
Ampharos|electric|3/3
Bellossom|grass|3/3
Marill|water|1/2
Azumarill|water|2/2
Sudowoodo|rock|1/1
Politoed|water|3/3
Hoppip|grass,flying|1/3
Skiploom|grass,flying|2/3
Jumpluff|grass,flying|3/3
Aipom|normal|1/1
Sunkern|grass|1/2
Sunflora|grass|2/2
Yanma|bug,flying|1/1
Wooper|water,ground|1/2
Quagsire|water,ground|2/2
Espeon|psychic|2/2
Umbreon|dark|2/2
Murkrow|dark,flying|1/1
Slowking|water,psychic|2/2
Misdreavus|ghost|1/1
Unown|psychic|1/1
Wobbuffet|psychic|1/1
Girafarig|normal,psychic|1/1
Pineco|bug|1/2
Forretress|bug,steel|2/2
Dunsparce|normal|1/1
Gligar|ground,flying|1/1
Steelix|steel,ground|2/2
Snubbull|normal|1/2
Granbull|normal|2/2
Qwilfish|water,poison|1/1
Scizor|bug,steel|2/2
Shuckle|bug,rock|1/1
Heracross|bug,fighting|1/1
Sneasel|dark,ice|1/1
Teddiursa|normal|1/2
Ursaring|normal|2/2
Slugma|fire|1/2
Magcargo|fire,rock|2/2
Swinub|ice,ground|1/2
Piloswine|ice,ground|2/2
Corsola|water,rock|1/1
Remoraid|water|1/2
Octillery|water|2/2
Delibird|ice,flying|1/1
Mantine|water,flying|1/1
Skarmory|steel,flying|1/1
Houndour|dark,fire|1/2
Houndoom|dark,fire|2/2
Kingdra|water,dragon|3/3
Phanpy|ground|1/2
Donphan|ground|2/2
Porygon2|normal|2/2
Stantler|normal|1/1
Smeargle|normal|1/1
Tyrogue|fighting|1/2
Hitmontop|fighting|2/2
Smoochum|ice,psychic|1/2
Elekid|electric|1/2
Magby|fire|1/2
Miltank|normal|1/1
Blissey|normal|2/2
Raikou|electric|1/1
Entei|fire|1/1
Suicune|water|1/1
Larvitar|rock,ground|1/3
Pupitar|rock,ground|2/3
Tyranitar|rock,dark|3/3
Lugia|psychic,flying|1/1
Ho-Oh|fire,flying|1/1
Celebi|psychic,grass|1/1
`;

const TYPES = ["normal","fire","water","electric","grass","ice","fighting","poison","ground","flying","psychic","bug","rock","ghost","dragon","dark","steel"];

const POKEMON = RAW.trim().split("\n").map((line, i) => {
  const [name, types, evo] = line.split("|");
  return { num: 152 + i, name, types: types.split(","), evo };
});

const GAME = {
  id: "pokequiz-gen2", // localStorage key
  category: "characters", // a CATEGORIES id in games/index.js
  title: "Gotta Guess 'Em All! Gen 2",
  placeholder: "Type a Pokémon name…",
  noun: "Pokémon", nouns: "Pokémon", verb: "caught",
  cheers: ["Awesome!", "You got it!", "Super!", "Amazing!", "Wow, nice one!", "Great job!"],
  items: POKEMON,
  tag: p => "#" + p.num,
  doneStyle: p => `--c1:var(--${p.types[0]});--c2:var(--${p.types[p.types.length - 1]})`,
  filters: [
    { label: "152-201", test: p => p.num <= 201 },
    { label: "202-251", test: p => p.num > 201 },
    ...TYPES.map(t => ({ label: t, color: `var(--${t})`, test: p => p.types.includes(t) })),
  ],
  // chip() comes from the engine; these only run once the page has loaded it
  hints: [
    { id: "type", label: "🔥 Type", title: "Reveal type", reveal: p => p.types.map(t => chip(t, `var(--${t})`)).join("") },
    { id: "evo", label: "⭐ Evo", title: "Reveal evolution level", reveal: p => chip(p.evo) },
  ],
};

if (typeof module !== "undefined") module.exports = GAME;
