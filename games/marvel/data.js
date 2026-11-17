// Marvel superheroes and villains. Line order = card order, and saved progress is stored by position,
// so add new characters at the end.
// Format per line: Name|side|real name|power|alias,alias
// side: hero, villain or anti-hero
// Aliases are what a child might type instead of the full name; each must fit one character only.
const RAW = `
Spider-Man|hero|Peter Parker|Climbs walls and shoots webs
Iron Man|hero|Tony Stark|Flies in a powered armour suit|Tony Stark
Captain America|hero|Steve Rogers|Super-strong with a vibranium shield|Cap
Thor|hero|Thor Odinson|God of Thunder with a mighty hammer
Hulk|hero|Bruce Banner|Turns huge, green and very strong
Black Widow|hero|Natasha Romanoff|Spy and master fighter
Hawkeye|hero|Clint Barton|Never misses with a bow and arrow
Black Panther|hero|T'Challa|King of Wakanda with a vibranium suit
Captain Marvel|hero|Carol Danvers|Flies and fires energy blasts
Ant-Man|hero|Scott Lang|Shrinks to the size of an ant
Wasp|hero|Hope van Dyne|Shrinks and flies with wings
Doctor Strange|hero|Stephen Strange|Sorcerer Supreme who casts spells|Dr Strange
Scarlet Witch|hero|Wanda Maximoff|Bends reality with red magic|Wanda
Vision|hero|Vision|Android who can fly and walk through walls
Falcon|hero|Sam Wilson|Soars with mechanical wings
War Machine|hero|James Rhodes|Heavily armed armoured suit|Rhodey
Star-Lord|hero|Peter Quill|Leader of the Guardians of the Galaxy
Gamora|hero|Gamora|Deadliest woman in the galaxy
Drax|hero|Drax the Destroyer|Super-strong Guardian of the Galaxy
Rocket|hero|Rocket Raccoon|Clever raccoon with big guns|Rocket Raccoon
Groot|hero|Groot|Tree who only says three words
Mantis|hero|Mantis|Senses feelings and calms people down
Wolverine|hero|Logan|Metal claws and fast healing
Storm|hero|Ororo Munroe|Controls the weather
Cyclops|hero|Scott Summers|Fires beams from his eyes
Beast|hero|Hank McCoy|Blue, furry and brilliant scientist
Rogue|hero|Anna Marie|Takes powers by touching people
Jean Grey|hero|Jean Grey|Moves things with her mind
Professor X|hero|Charles Xavier|Reads minds and leads the X-Men|Professor Xavier
Nightcrawler|hero|Kurt Wagner|Teleports in a puff of smoke
Mister Fantastic|hero|Reed Richards|Stretches like rubber|Mr Fantastic
Invisible Woman|hero|Sue Storm|Turns invisible and makes force fields
Human Torch|hero|Johnny Storm|Bursts into flame and flies
The Thing|hero|Ben Grimm|Rocky orange strongman|Thing
Miles Morales|hero|Miles Morales|Spider powers plus invisibility and venom blasts
Ms. Marvel|hero|Kamala Khan|Stretches her body into any shape|Kamala Khan
Shang-Chi|hero|Shang-Chi|Kung fu master with the Ten Rings
Nick Fury|hero|Nick Fury|Head of S.H.I.E.L.D.|Fury
Daredevil|hero|Matt Murdock|Blind lawyer with super senses
Winter Soldier|anti-hero|Bucky Barnes|Metal arm and expert fighter|Bucky
Nebula|anti-hero|Nebula|Cyborg who was Thanos's daughter
Venom|anti-hero|Eddie Brock|Black alien symbiote with sharp teeth
Thanos|villain|Thanos|The Mad Titan who wants all the Infinity Stones
Loki|villain|Loki Laufeyson|Trickster god and Thor's brother
Green Goblin|villain|Norman Osborn|Flies on a glider and throws pumpkin bombs
Doctor Octopus|villain|Otto Octavius|Four metal arms|Doc Ock,Dr Octopus
Red Skull|villain|Johann Schmidt|Leader of Hydra
Ultron|villain|Ultron|Robot who wants to destroy humans
Hela|villain|Hela|Goddess of Death
Killmonger|villain|Erik Killmonger|Wants to take the throne of Wakanda
Magneto|villain|Erik Lehnsherr|Controls metal
Doctor Doom|villain|Victor von Doom|Armoured ruler of Latveria|Dr Doom
Galactus|villain|Galactus|Giant who eats whole planets
Mysterio|villain|Quentin Beck|Fools heroes with illusions
Vulture|villain|Adrian Toomes|Flies with a high-tech wing suit
Sandman|villain|Flint Marko|Turns his body into sand
Electro|villain|Max Dillon|Shoots lightning bolts
Lizard|villain|Curt Connors|Scientist who turns into a giant lizard|The Lizard
Kingpin|villain|Wilson Fisk|Powerful New York crime boss
Mystique|villain|Raven Darkholme|Shapeshifter who can look like anyone
Sabretooth|villain|Victor Creed|Fast, fierce, and clawed
Apocalypse|villain|En Sabah Nur|Ancient mutant who wants only the strongest to survive
Kang|villain|Nathaniel Richards|Conqueror who travels through time|Kang the Conqueror
Dormammu|villain|Dormammu|Ruler of the Dark Dimension
Abomination|villain|Emil Blonsky|Bigger, scalier rival of the Hulk
Taskmaster|villain|Tony Masters|Copies any fighting move he sees
Carnage|villain|Cletus Kasady|Red symbiote and Venom's offspring
Whiplash|villain|Mark Scarlotti|Uses electric whips
Zemo|villain|Helmut Zemo|Plotted to break up the Avengers|Baron Zemo
Ego|villain|Ego the Living Planet|Peter Quill's dad, who is a planet
Ronan|villain|Ronan the Accuser|Kree warrior with a giant hammer
`;

const CHARACTERS = RAW.trim().split("\n").map(line => {
  const [name, side, real, power, aliases] = line.split("|");
  return { name, side, real, power, aliases: aliases ? aliases.split(",") : undefined };
});

const SIDES = ["hero", "villain", "anti-hero"];

const GAME = {
  id: "marvelquiz", // localStorage key
  category: "characters", // a CATEGORIES id in games/index.js
  title: "Guess the Marvel Heroes and Villains!",
  placeholder: "Type a name…",
  noun: "character", nouns: "characters", verb: "found",
  cheers: ["Avengers, assemble!", "Excelsior!", "Super!", "Heroic!", "Nice one!", "You got it!"],
  items: CHARACTERS,
  doneStyle: c => `--c1:var(--${c.side})`,
  filters: SIDES.map(s => ({ label: s, color: `var(--${s})`, test: c => c.side === s })),
  // chip() comes from the engine; these only run once the page has loaded it
  hints: [
    { id: "real", label: "🙂 Real name", title: "Reveal the real name", reveal: c => chip(c.real, `var(--${c.side})`) },
    { id: "power", label: "⚡ Power", title: "Reveal a power", reveal: c => chip(c.power) },
  ],
};

if (typeof module !== "undefined") module.exports = GAME;
