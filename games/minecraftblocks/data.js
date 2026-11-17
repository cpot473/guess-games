// Minecraft blocks (Java Edition). Line order = card order, and saved progress is stored by position,
// so add new blocks at the end.
// Format per line: Name|type|where|used for|alias,alias
// type: natural, stone, ore, wood, useful or nether-end
const RAW = `
Dirt|natural|Almost everywhere|Grows crops and grass
Grass Block|natural|Grassy lands|Green on top, dirt below|Grass
Sand|natural|Deserts and beaches|Falls down, and makes glass when smelted
Gravel|natural|Under the ground|Falls down, and sometimes drops flint
Clay|natural|Rivers and swamps|Makes bricks and terracotta
Snow Block|natural|Snowy lands|Made from four snowballs
Ice|natural|Frozen lakes|Slippery to walk on
Mycelium|natural|Mushroom islands|Lets mushrooms grow in daylight
Moss Block|natural|Lush caves|Spreads over stone
Cactus|natural|Deserts|Prickly, and hurts you
Pumpkin|natural|Grassy lands|Wear it on your head, or carve it into a lantern
Melon|natural|Jungles and villages|Gives melon slices
Hay Bale|natural|Villages|Made from wheat and breaks your fall
Stone|stone|Under the ground|Smelts into smooth stone, and cobblestone when mined
Cobblestone|stone|Under the ground|Builds tools and furnaces
Granite|stone|Under the ground|Reddish-pink stone
Diorite|stone|Under the ground|White and grey speckled stone
Andesite|stone|Under the ground|Smooth grey stone
Deepslate|stone|Deep underground|Darker, harder stone
Obsidian|stone|Where water meets lava|Makes Nether portals
Bricks|stone|Made from clay bricks|Red building blocks
Stone Bricks|stone|Made from stone|Neat building blocks
Glass|stone|Made by smelting sand|See-through window
Terracotta|stone|Badlands|Dyes into many colours
Wool|stone|Dropped by sheep|Soft block in many colours
Block of Quartz|stone|Made from Nether quartz|Smooth white building block|Quartz Block
Coal Ore|ore|Everywhere underground|Makes fuel and torches
Iron Ore|ore|Underground|Smelts into iron ingots
Copper Ore|ore|Underground|Smelts into copper, which turns green
Gold Ore|ore|Deep and in badlands|Smelts into gold ingots
Redstone Ore|ore|Deep underground|Glows when you touch it
Lapis Lazuli Ore|ore|Underground|Blue dye and enchanting|Lapis Ore
Diamond Ore|ore|Very deep underground|Makes the best tools
Emerald Ore|ore|Mountains|Used for trading with villagers
Block of Iron|ore|Crafted from nine iron ingots|Makes an iron golem|Iron Block
Block of Gold|ore|Crafted from nine gold ingots|Shiny block, loved by piglins|Gold Block
Block of Diamond|ore|Crafted from nine diamonds|Treasure to show off|Diamond Block
Oak Log|wood|Forests|The most common tree trunk
Oak Planks|wood|Crafted from logs|Basic building block
Birch Log|wood|Birch forests|White tree trunk with black marks
Spruce Log|wood|Taigas|Dark brown trunk from a snowy tree
Jungle Log|wood|Jungles|Trunk from the tallest trees
Acacia Log|wood|Savannas|Orange-grey trunk of a bendy tree
Dark Oak Log|wood|Dark forests|Almost black trunk
Cherry Log|wood|Cherry groves|Pink-brown trunk
Crafting Table|useful|Crafted from planks|Makes tools and other items
Furnace|useful|Crafted from cobblestone|Cooks food and smelts ore
Chest|useful|Crafted from planks|Stores your stuff
Bed|useful|Villages|Skips the night and sets your spawn
Torch|useful|Crafted from coal and sticks|Lights up the dark
Bookshelf|useful|Libraries|Makes enchantments stronger
Enchanting Table|useful|Crafted with diamonds and obsidian|Adds magic to your tools
Anvil|useful|Crafted from iron blocks|Repairs and renames items
TNT|useful|Crafted from gunpowder and sand|Explodes when lit
Piston|useful|Crafted with redstone|Pushes blocks
Hopper|useful|Crafted from iron and a chest|Moves items into a container
Note Block|useful|Crafted with redstone|Plays a sound when you hit it
Jukebox|useful|Crafted from planks and a diamond|Plays music discs
Beacon|useful|Crafted with a Nether star|Shoots a beam and gives powers
Redstone Block|useful|Crafted from redstone dust|Powers things nearby
Netherrack|nether-end|The Nether|Red rock that burns forever when lit
Soul Sand|nether-end|The Nether|Slows you down
Glowstone|nether-end|The Nether|Shiny block that gives light
Nether Bricks|nether-end|Nether fortresses|Dark red-brown bricks
Magma Block|nether-end|The Nether|Hot block that hurts your feet
Basalt|nether-end|The Nether|Dark grey, striped pillars
Blackstone|nether-end|Bastions|Dark stone that lava can make
Crying Obsidian|nether-end|Ruined portals|Weeping purple obsidian
Ancient Debris|nether-end|The Nether|Makes netherite
Shroomlight|nether-end|The Nether|Glowing block grown on huge fungi
End Stone|nether-end|The End|Pale yellow stone
Purpur Block|nether-end|End cities|Pink-purple building block
`;

const BLOCKS = RAW.trim().split("\n").map(line => {
  const [name, type, where, use, aliases] = line.split("|");
  return { name, type, where, use, aliases: aliases ? aliases.split(",") : undefined };
});

const TYPES = ["natural", "stone", "ore", "wood", "useful", "nether-end"];

const GAME = {
  id: "minecraftblocksquiz", // localStorage key
  category: "characters", // a CATEGORIES id in games/index.js
  title: "Guess the Minecraft Blocks!",
  placeholder: "Type a block…",
  noun: "block", nouns: "blocks", verb: "found",
  cheers: ["Crafty!", "Epic!", "Nice find!", "Diamond!", "Well mined!", "Block party!"],
  items: BLOCKS,
  doneStyle: b => `--c1:var(--${b.type})`,
  filters: TYPES.map(t => ({ label: t, color: `var(--${t})`, test: b => b.type === t })),
  // chip() comes from the engine; these only run once the page has loaded it
  hints: [
    { id: "type", label: "🧱 Type", title: "Reveal the kind of block", reveal: b => chip(b.type, `var(--${b.type})`) },
    { id: "where", label: "🌍 Where", title: "Reveal where to find it", reveal: b => chip(b.where) },
    { id: "use", label: "🔨 Use", title: "Reveal what it is used for", reveal: b => chip(b.use) },
  ],
};

if (typeof module !== "undefined") module.exports = GAME;
