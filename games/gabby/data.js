// Gabby's Dollhouse characters. Line order = card order, and saved progress is stored by position,
// so add new characters at the end.
// Format per line: Name|kind|who|room or skill|alias,alias
// kind: person, cat or pal
// Aliases are what a child might type instead of the full name; each must fit one character only.
const RAW = `
Gabby Girl|person|The girl who shrinks to dollhouse size|Has a magic dollhouse|Gabby
Pandy Paws|pal|A panda-cat who loves to garden|Lives in the Garden Room|Pandy
Cakey Cat|cat|A cake-baking cat|Runs the Kitchen|Cakey
MerCat|cat|A mermaid cat|Lives in the Bathroom, loves to swim
Kitty Fairy|cat|A fairy cat|Lives in the Fairy Garden, grants wishes
DJ Catnip|cat|A music-loving cat|Plays music in the Music Room|Catnip,DJ
Carlita|pal|A little toy car|Gabby's friend who goes on trips
Baby Box|pal|A tiny cardboard box|Cakey's baby box, loves to play
Pillow Cat|cat|A cat made of pillows|Hangs out in the Sleepy Time Room|Pillow
CatRat|cat|A mischievous cat-rat|Loves to cause trouble
Mama Box|pal|Baby Box's mum|Looks after Baby Box|Mama
Marty the Party Cat|cat|A party-planning cat|Runs the Party Room|Marty
`;

const CHARACTERS = RAW.trim().split("\n").map(line => {
  const [name, kind, who, room, aliases] = line.split("|");
  return { name, kind, who, room, aliases: aliases ? aliases.split(",") : undefined };
});

const KINDS = ["person", "cat", "pal"];

const GAME = {
  id: "gabbyquiz", // localStorage key
  category: "characters", // a CATEGORIES id in games/index.js
  title: "Guess Gabby's Dollhouse!",
  placeholder: "Type a name…",
  noun: "character", nouns: "characters", verb: "found",
  cheers: ["Let's get tiny!", "Meow-vellous!", "Purr-fect!", "Dollhouse time!", "Great guess!", "You got it!"],
  items: CHARACTERS,
  doneStyle: c => `--c1:var(--${c.kind})`,
  filters: KINDS.map(k => ({ label: k, color: `var(--${k})`, test: c => c.kind === k })),
  // chip() comes from the engine; these only run once the page has loaded it
  hints: [
    { id: "who", label: "🐱 Who", title: "Reveal who they are", reveal: c => chip(c.who, `var(--${c.kind})`) },
    { id: "room", label: "🏠 Room", title: "Reveal their room or skill", reveal: c => chip(c.room) },
  ],
};

if (typeof module !== "undefined") module.exports = GAME;
