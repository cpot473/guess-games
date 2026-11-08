// Peppa Pig characters (UK names). Line order = card order, and saved progress is stored by
// position, so add new characters at the end.
// Format per line: Name|animal|role|alias,alias
// role: child, parent, grandparent or grown-up (any other adult)
// Aliases are what a child might type instead of the full name; each must fit one character only
// (so not "Mummy" or "Grandpa").
const RAW = `
Peppa Pig|pig|child|Peppa
George Pig|pig|child|George
Mummy Pig|pig|parent
Daddy Pig|pig|parent
Granny Pig|pig|grandparent
Grandpa Pig|pig|grandparent
Uncle Pig|pig|grown-up
Aunty Pig|pig|grown-up
Chloé Pig|pig|child|Chloé
Alexander Pig|pig|child|Alexander
Suzy Sheep|sheep|child|Suzy
Mummy Sheep|sheep|parent
Rebecca Rabbit|rabbit|child|Rebecca
Richard Rabbit|rabbit|child|Richard
Mummy Rabbit|rabbit|parent
Miss Rabbit|rabbit|grown-up
Grampy Rabbit|rabbit|grandparent|Grampy
Danny Dog|dog|child|Danny
Mummy Dog|dog|parent
Captain Dog|dog|parent
Grandad Dog|dog|grandparent
Pedro Pony|pony|child|Pedro
Zoe Zebra|zebra|child|Zoe
Zuzu Zebra|zebra|child|Zuzu
Zaza Zebra|zebra|child|Zaza
Mr. Zebra|zebra|parent|Mister Zebra
Emily Elephant|elephant|child|Emily
Edmond Elephant|elephant|child|Edmond
Candy Cat|cat|child|Candy
Freddy Fox|fox|child|Freddy
Wendy Wolf|wolf|child|Wendy
Gerald Giraffe|giraffe|child|Gerald
Molly Mole|mole|child|Molly
Mandy Mouse|mouse|child|Mandy
Belinda Bear|bear|child|Belinda
Doctor Brown Bear|bear|grown-up|Dr Brown Bear
Kylie Kangaroo|kangaroo|child|Kylie
Delphine Donkey|donkey|child|Delphine
Didier Donkey|donkey|child|Didier
Madame Gazelle|gazelle|grown-up|Gazelle
Mr. Bull|bull|grown-up|Mister Bull
`;

const CHARACTERS = RAW.trim().split("\n").map(line => {
  const [name, animal, role, aliases] = line.split("|");
  return { name, animal, role, aliases: aliases ? aliases.split(",") : undefined };
});

const ANIMALS = [...new Set(CHARACTERS.map(c => c.animal))];

const GAME = {
  id: "peppaquiz", // localStorage key
  title: "Guess Peppa's Friends!",
  placeholder: "Type a name…",
  noun: "character", nouns: "characters", verb: "found",
  cheers: ["Hooray!", "Well done!", "You got it!", "Brilliant!", "Super!", "Oink oink, yes!"],
  items: CHARACTERS,
  doneStyle: c => `--c1:var(--${c.animal})`,
  filters: ANIMALS.map(a => ({ label: a, color: `var(--${a})`, test: c => c.animal === a })),
  // chip() comes from the engine; these only run once the page has loaded it
  hints: [
    { id: "animal", label: "🐾 Animal", title: "Reveal the animal", reveal: c => chip(c.animal, `var(--${c.animal})`) },
    { id: "role", label: "👪 Who", title: "Reveal child, parent, grandparent or grown-up", reveal: c => chip(c.role) },
  ],
};

if (typeof module !== "undefined") module.exports = GAME;
