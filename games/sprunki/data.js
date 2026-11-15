// Sprunki characters: the 20 from the original fan-made Incredibox mod, except Black, the one who
// switches the mod to its scary Horror Mode. Line order = card order, and saved progress is stored by
// position, so add new characters at the end.
// Format per line: Name|group|sound|look|alias,alias
// group: beats, effects, melodies or vocals (the sound type each one adds to the music)
// Fan wikis disagree about some colours (Fun Bot, Jevin), so a look only states what they agree on.
// Aliases are what a child might type instead of the full name; each must fit one character only.
const RAW = `
Oren|beats|Kick drum|Orange, wears headphones
Raddy|beats|Snare drum|Red, spiky head
Clukr|beats|Cymbals|Silver robot with a dish on its head
Fun Bot|beats|Amen break beat|Robot with a screen for a face|Funbot
Vineria|beats|Maracas|Green plant
Gray|effects|Synth bass|Kitten with cat ears
Brud|effects|Effect percussion|Brown, bucket on its head
Garnold|effects|Metallic effects|Gold inventor with a dark visor
OWAKCX|effects|Bright effects|Lime green, spiky hair
Sky|effects|Music box|Blue teddy bear with round ears
Mr. Sun|melodies|Piano|Cheerful yellow sun|Mister Sun
Durple|melodies|Trumpet|Purple dragon
Mr. Tree|melodies|Organ|Calm, wise tree|Mister Tree
Simon|melodies|8-bit synth|Yellow alien
Tunner|melodies|Whistling|Tan sheriff
Mr. Fun Computer|vocals|Robot voice|Computer for a head|Mister Fun Computer,Fun Computer
Wenda|vocals|Singing|White cat
Pinki|vocals|Singing|Pink bunny
Jevin|vocals|Choir vocals|Pinki's big sister
`;

const CHARACTERS = RAW.trim().split("\n").map(line => {
  const [name, group, sound, look, aliases] = line.split("|");
  return { name, group, sound, look, aliases: aliases ? aliases.split(",") : undefined };
});

const GROUPS = ["beats", "effects", "melodies", "vocals"];

const GAME = {
  id: "sprunkiquiz", // localStorage key
  category: "characters", // a CATEGORIES id in games/index.js
  title: "Guess the Sprunkis!",
  placeholder: "Type a name…",
  noun: "character", nouns: "characters", verb: "found",
  cheers: ["Sprunki!", "Nice beat!", "Groovy!", "You got it!", "Drop the beat!", "Rockin'!"],
  items: CHARACTERS,
  doneStyle: c => `--c1:var(--${c.group})`,
  filters: GROUPS.map(g => ({ label: g, color: `var(--${g})`, test: c => c.group === g })),
  // chip() comes from the engine; these only run once the page has loaded it
  hints: [
    { id: "sound", label: "🎵 Sound", title: "Reveal the sound they make", reveal: c => chip(c.sound, `var(--${c.group})`) },
    { id: "look", label: "👀 Look", title: "Reveal what they look like", reveal: c => chip(c.look) },
  ],
};

if (typeof module !== "undefined") module.exports = GAME;
