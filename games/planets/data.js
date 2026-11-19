// Planets and moons of our solar system: the eight planets (Sun outwards), the five dwarf planets,
// then moons grouped by the planet they orbit. Line order = card order, and saved progress is stored
// by position, so add new ones at the end.
// Format per line: Name|kind|orbits|clue|alias,alias
// kind: planet, dwarf (dwarf planet) or moon
const RAW = `
Mercury|planet|The Sun|The closest planet to the Sun, and the smallest
Venus|planet|The Sun|The hottest planet, hidden under thick clouds
Earth|planet|The Sun|Our home: the only planet known to have life|The Earth
Mars|planet|The Sun|The Red Planet, with the biggest volcano in the solar system
Jupiter|planet|The Sun|The biggest planet, with a giant storm called the Great Red Spot
Saturn|planet|The Sun|Famous for its wide, bright rings
Uranus|planet|The Sun|An icy giant that spins on its side
Neptune|planet|The Sun|The farthest planet from the Sun, with the fastest winds
Pluto|dwarf|The Sun|Was called the ninth planet until 2006
Ceres|dwarf|The Sun|The biggest thing in the asteroid belt, between Mars and Jupiter
Eris|dwarf|The Sun|Almost the same size as Pluto, but heavier, and much farther away
Haumea|dwarf|The Sun|Spins so fast that it's stretched into an egg shape
Makemake|dwarf|The Sun|Named after a god of the people of Easter Island
Moon|moon|Earth|The only place beyond Earth where people have walked|The Moon,Luna
Phobos|moon|Mars|The bigger of the two tiny moons of Mars
Deimos|moon|Mars|The smaller of the two tiny moons of Mars
Io|moon|Jupiter|Has more erupting volcanoes than anywhere else in the solar system
Europa|moon|Jupiter|Has a deep ocean of water hidden under its icy shell
Ganymede|moon|Jupiter|The biggest moon in the solar system, bigger than the planet Mercury
Callisto|moon|Jupiter|One of the most cratered places in the solar system
Titan|moon|Saturn|Has a thick, orange sky and lakes of liquid methane
Enceladus|moon|Saturn|Shoots fountains of icy water out into space
Mimas|moon|Saturn|Has one giant crater that makes it look like a huge eye
Rhea|moon|Saturn|The second-biggest moon of Saturn
Iapetus|moon|Saturn|One side is very dark and the other side very bright
Dione|moon|Saturn|An icy moon with long, bright cliffs of ice
Tethys|moon|Saturn|An icy moon with an enormous canyon
Hyperion|moon|Saturn|Looks like a sponge, and tumbles as it goes round
Phoebe|moon|Saturn|Goes round its planet backwards, far out
Titania|moon|Uranus|The biggest moon of Uranus, named after the fairy queen in a Shakespeare play
Oberon|moon|Uranus|Named after the fairy king in A Midsummer Night's Dream
Miranda|moon|Uranus|Has the tallest cliff in the solar system
Ariel|moon|Uranus|The brightest moon of Uranus
Umbriel|moon|Uranus|The darkest of the big moons of Uranus
Triton|moon|Neptune|Goes round its planet backwards and has geysers of ice
Proteus|moon|Neptune|The second-biggest moon of Neptune
Charon|moon|Pluto|So big next to Pluto that the two swing round each other
`;

const BODIES = RAW.trim().split("\n").map(line => {
  const [name, kind, orbits, clue, aliases] = line.split("|");
  return { name, kind, orbits, clue, aliases: aliases ? aliases.split(",") : undefined };
});

const KINDS = [["planet", "planet"], ["dwarf", "dwarf planet"], ["moon", "moon"]];

const GAME = {
  id: "planetsquiz", // localStorage key
  category: "learn", // a CATEGORIES id in games/index.js
  title: "Guess the Planets and Moons!",
  placeholder: "Type a planet or moon…",
  noun: "planet or moon", nouns: "planets and moons", verb: "found",
  cheers: ["Out of this world!", "Stellar!", "Blast off!", "Astronomical!", "You got it!", "Great job!"],
  items: BODIES,
  doneStyle: p => `--c1:var(--${p.kind})`,
  filters: KINDS.map(([k, label]) => ({ label, color: `var(--${k})`, test: p => p.kind === k })),
  // chip() comes from the engine; these only run once the page has loaded it
  hints: [
    { id: "orbits", label: "🪐 Orbits", title: "Reveal what it goes round", reveal: p => chip(p.orbits === "The Sun" ? "Goes round the Sun" : "Goes round " + p.orbits, `var(--${p.kind})`) },
    { id: "clue", label: "💡 Clue", title: "Reveal a clue", reveal: p => chip(p.clue) },
  ],
};

if (typeof module !== "undefined") module.exports = GAME;
