// Paw Patrol characters. Line order = card order, and saved progress is stored by position,
// so add new characters at the end.
// Format per line: Name|kind|job|alias,alias
// kind: pup, human, villain or animal (a pet or other animal)
// Aliases are what a child might type instead of the full name; each must fit one character only.
const RAW = `
Ryder|human|Leader of the PAW Patrol
Chase|pup|Police pup
Marshall|pup|Fire pup
Skye|pup|Aviation pup
Rocky|pup|Recycling pup
Rubble|pup|Construction pup
Zuma|pup|Water rescue pup
Everest|pup|Snow rescue pup
Tracker|pup|Jungle rescue pup
Rex|pup|Dino rescue pup
Mayor Goodway|human|Mayor of Adventure Bay|Goodway
Mayor Humdinger|villain|Mayor of Foggy Bottom|Humdinger
Cap'n Turbot|human|Sea captain|Captain Turbot
Mr. Porter|human|Runs the café|Mister Porter
Alex Porter|human|Mr. Porter's grandson|Alex
Farmer Yumi|human|Farmer|Yumi
Farmer Al|human|Farmer
Katie|human|Pet groomer
Cali|animal|Katie's cat
Chickaletta|animal|Mayor Goodway's chicken
Wally|animal|Walrus
Jake|human|Mountain guide
Carlos|human|Tracker's jungle friend
Ace Sorensen|human|Stunt pilot|Ace
`;

const CHARACTERS = RAW.trim().split("\n").map(line => {
  const [name, kind, job, aliases] = line.split("|");
  return { name, kind, job, aliases: aliases ? aliases.split(",") : undefined };
});

const KINDS = ["pup", "human", "villain", "animal"];

const GAME = {
  id: "pawpatrolquiz", // localStorage key
  title: "Guess the Paw Patrol!",
  placeholder: "Type a name…",
  noun: "character", nouns: "characters", verb: "found",
  cheers: ["Paw-some!", "No job is too big!", "You got it!", "Whoa, nice one!", "Great job!", "Ryder is proud!"],
  items: CHARACTERS,
  doneStyle: c => `--c1:var(--${c.kind})`,
  filters: KINDS.map(k => ({ label: k, color: `var(--${k})`, test: c => c.kind === k })),
  // chip() comes from the engine; these only run once the page has loaded it
  hints: [
    { id: "kind", label: "🐾 Who", title: "Reveal pup, human, villain or animal", reveal: c => chip(c.kind, `var(--${c.kind})`) },
    { id: "job", label: "🚒 Job", title: "Reveal the job", reveal: c => chip(c.job) },
  ],
};

if (typeof module !== "undefined") module.exports = GAME;
