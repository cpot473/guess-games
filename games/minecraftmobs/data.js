// Minecraft mobs (Java Edition). Line order = card order, and saved progress is stored by position,
// so add new mobs at the end.
// Format per line: Name|type|where|clue|alias,alias
// type: passive, neutral, hostile or boss. Neutral mobs only fight back (or in some cases, in the dark).
const RAW = `
Pig|passive|Grassy plains|Oinks, and you can ride it with a saddle
Cow|passive|Grassy plains|Gives milk and leather
Sheep|passive|Grassy plains|Gives wool in many colours
Chicken|passive|Grassy plains|Lays eggs
Horse|passive|Plains and savannas|Can be tamed and ridden
Donkey|passive|Plains and savannas|Can carry chests
Mule|passive|Bred from a horse and a donkey|Can carry chests
Rabbit|passive|Deserts, snow and flowers|Hops, and drops a lucky foot
Cat|passive|Villages|Scares creepers away
Ocelot|passive|Jungles|Wild cat that runs away from you
Parrot|passive|Jungles|Sits on your shoulder and copies sounds
Fox|passive|Taigas|Picks up berries and other items
Mooshroom|passive|Mushroom islands|Red and white cow with mushrooms
Villager|passive|Villages|Trades with you for emeralds
Bat|passive|Dark caves|Flies around, upside down
Squid|passive|Oceans and rivers|Drops ink
Glow Squid|passive|Underwater caves|Squid that glows in the dark
Cod|passive|Oceans and rivers|Fish you can cook
Salmon|passive|Rivers and cold oceans|Fish you can cook
Tropical Fish|passive|Warm oceans|Colourful fish that swim in schools
Turtle|passive|Beaches|Lays eggs on its home beach
Axolotl|passive|Lush caves|Helps you fight underwater
Frog|passive|Swamps|Eats small slimes and leaves froglights
Camel|passive|Deserts|Can carry two riders
Sniffer|passive|Hatched from ancient eggs|Digs up ancient seeds
Allay|passive|Pillager outposts and woodland mansions|Blue flyer that collects items for you
Strider|passive|The Nether|Walks on lava
Snow Golem|passive|Built from snow and a pumpkin|Throws snowballs
Armadillo|passive|Savannas|Rolls up into a ball
Panda|passive|Bamboo jungles|Munches on bamboo
Wolf|neutral|Forests and taigas|Becomes a pet if you feed it bones
Llama|neutral|Mountains and savannas|Spits at you
Bee|neutral|Flower forests and plains|Stings you if its hive is hurt
Polar Bear|neutral|Snowy lands|Fights fiercely to protect its cubs
Dolphin|neutral|Oceans|Leads you to treasure
Pufferfish|neutral|Warm oceans|Poisons you when you touch it
Goat|neutral|Mountains|Rams you and jumps very high
Iron Golem|neutral|Villages|Protects villagers
Enderman|neutral|Everywhere, mostly at night|Gets angry if you look at it|Ender Man
Piglin|neutral|The Nether|Loves gold and trades for it
Zombified Piglin|neutral|The Nether|Fights back in a gang|Zombie Piglin
Zombie|hostile|Everywhere in the dark|Groans and burns in sunlight
Skeleton|hostile|Everywhere in the dark|Shoots arrows
Creeper|hostile|Everywhere in the dark|Hisses, then explodes
Spider|hostile|Everywhere in the dark|Climbs walls, and is calm in daylight
Cave Spider|hostile|Mineshafts|Small blue spider with a poisonous bite
Witch|hostile|Swamps|Throws potions
Slime|hostile|Swamps and slime chunks|Green bouncing cube that splits in two
Phantom|hostile|The sky, if you do not sleep|Swoops at night
Drowned|hostile|Oceans and rivers|Underwater zombie that may throw a trident
Husk|hostile|Deserts|Sandy zombie that does not burn
Stray|hostile|Snowy lands|Icy skeleton that slows you down
Pillager|hostile|Outposts and raids|Fires a crossbow
Vindicator|hostile|Mansions and raids|Swings an axe
Evoker|hostile|Mansions and raids|Summons fangs and vexes
Vex|hostile|Called by evokers|Small ghost that flies through walls
Ravager|hostile|Raids|Giant beast that charges
Silverfish|hostile|Strongholds and mountains|Hides in stone blocks
Endermite|hostile|The End and ender pearls|Tiny purple bug that annoys endermen
Guardian|hostile|Ocean monuments|Fires a laser beam
Elder Guardian|hostile|Ocean monuments|Big spiky guardian that tires you out
Blaze|hostile|Nether fortresses|Floating fire spirit
Ghast|hostile|The Nether|Floating crying ghost that shoots fireballs
Magma Cube|hostile|The Nether|Hot bouncing cube
Wither Skeleton|hostile|Nether fortresses|Tall, black skeleton that drops skulls
Hoglin|hostile|The Nether|Big boar that charges at you
Zoglin|hostile|The Nether|Zombie hoglin that attacks everything
Piglin Brute|hostile|Bastion remnants|Strong piglin with an axe
Shulker|hostile|End cities|Hides in a box and shoots floating bullets
Warden|hostile|Deep dark|Blind giant that hunts by sound
Breeze|hostile|Trial chambers|Whirlwind that blows you around
Bogged|hostile|Swamps|Mushroom skeleton with poison arrows
Zombie Villager|hostile|Villages|A zombie that can be cured with a golden apple
Ender Dragon|boss|The End|Huge black dragon you fight at the end
Wither|boss|Built from wither skulls|Three-headed flying skeleton boss
`;

const MOBS = RAW.trim().split("\n").map(line => {
  const [name, type, where, clue, aliases] = line.split("|");
  return { name, type, where, clue, aliases: aliases ? aliases.split(",") : undefined };
});

const TYPES = ["passive", "neutral", "hostile", "boss"];

const GAME = {
  id: "minecraftmobsquiz", // localStorage key
  category: "characters", // a CATEGORIES id in games/index.js
  title: "Guess the Minecraft Mobs!",
  placeholder: "Type a mob…",
  noun: "mob", nouns: "mobs", verb: "found",
  cheers: ["Crafty!", "Epic!", "Nice find!", "Diamond!", "Creeper? Aw man!", "Well mined!"],
  items: MOBS,
  doneStyle: m => `--c1:var(--${m.type})`,
  filters: TYPES.map(t => ({ label: t, color: `var(--${t})`, test: m => m.type === t })),
  // chip() comes from the engine; these only run once the page has loaded it
  hints: [
    { id: "type", label: "👾 Type", title: "Reveal passive, neutral, hostile or boss", reveal: m => chip(m.type, `var(--${m.type})`) },
    { id: "where", label: "🌍 Where", title: "Reveal where it lives", reveal: m => chip(m.where) },
    { id: "clue", label: "💡 Clue", title: "Reveal a clue", reveal: m => chip(m.clue) },
  ],
};

if (typeof module !== "undefined") module.exports = GAME;
