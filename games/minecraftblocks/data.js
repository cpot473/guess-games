// Minecraft blocks (Java Edition 1.21.4), one card for every block that has its own name in the game's
// Creative inventory (so Oak Stairs and Red Wool each get a card), except for blocks that only exist
// for technical reasons (command blocks, barriers, unobtainable blocks, wall variants of signs and so on).
// Line order = card order, and saved progress is stored by position, so add new blocks at the end:
// at the end of MORE, or by adding a new generator after the existing ones.
//
// RAW and MORE are hand-written lines. The blocks that come in a family (colours, woods, stone
// shapes, copper) are generated below from short lists, so each family is one line to extend.
// Format per line: Name|type|where|used for|alias,alias
// type: natural, stone, ore, wood, colour, copper, useful or nether-end
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


const MORE = `
Dandelion|natural|Grassy lands|Yellow flower that makes yellow dye
Poppy|natural|Grassy lands|Red flower that makes red dye
Blue Orchid|natural|Swamps|Blue flower that makes light blue dye
Allium|natural|Flower forests|Purple pom-pom flower
Azure Bluet|natural|Plains and flower forests|Tiny white flower
Red Tulip|natural|Flower forests|Red flower
Orange Tulip|natural|Flower forests|Orange flower
White Tulip|natural|Flower forests|White flower
Pink Tulip|natural|Flower forests|Pink flower
Oxeye Daisy|natural|Plains and flower forests|White and yellow flower
Cornflower|natural|Plains and flower forests|Blue flower that makes blue dye
Lily of the Valley|natural|Flower forests|Tiny white bells
Wither Rose|natural|Grows where a wither kills a mob|Black rose that gives the wither effect
Sunflower|natural|Sunflower plains|Tall flower that faces east
Lilac|natural|Flower forests|Tall purple flower
Rose Bush|natural|Flower forests|Tall red flower
Peony|natural|Flower forests|Tall pink flower
Torchflower|natural|Grown from ancient seeds|Orange flower that glows in the night
Pitcher Plant|natural|Grown from ancient seeds|Tall plant with a cup
Spore Blossom|natural|Lush caves|Pink flower that drips spores
Short Grass|natural|Grassy lands|Gives seeds when broken
Tall Grass|natural|Grassy lands|Taller grass that gives seeds
Fern|natural|Taigas and jungles|Leafy green plant
Large Fern|natural|Taigas and jungles|Tall fern
Dead Bush|natural|Deserts and badlands|Dried-up bush that drops sticks
Seagrass|natural|Oceans and rivers|Green plant that grows under water
Tall Seagrass|natural|Oceans and rivers|Taller seagrass
Kelp|natural|Oceans|Tall, wavy sea plant
Dried Kelp Block|natural|Crafted from dried kelp|Fuel that burns for a long time
Sugar Cane|natural|Next to water|Makes sugar and paper
Bamboo|natural|Bamboo jungles|Grows quickly and makes sticks
Vine|natural|Jungles and swamps|Climb up it like a ladder
Lily Pad|natural|Swamps|Walk across water on it
Sweet Berry Bush|natural|Taigas|Gives berries, but is prickly
Cocoa Pods|natural|Jungles|Grow on jungle logs and give cocoa beans|Cocoa
Red Mushroom|natural|Dark places|Spotted mushroom
Brown Mushroom|natural|Dark places|Plain mushroom
Red Mushroom Block|natural|Giant mushrooms|Red cap of a huge mushroom
Brown Mushroom Block|natural|Giant mushrooms|Brown cap of a huge mushroom
Mushroom Stem|natural|Giant mushrooms|White stalk of a huge mushroom
Azalea|natural|Lush caves|Small bush that can grow a tree
Flowering Azalea|natural|Lush caves|Azalea with pink flowers
Azalea Leaves|natural|Azalea trees|Leaves of an azalea tree
Flowering Azalea Leaves|natural|Azalea trees|Leaves with pink flowers
Moss Carpet|natural|Lush caves|Thin layer of moss
Big Dripleaf|natural|Lush caves|Tips over when you stand on it
Small Dripleaf|natural|Lush caves|Small plant that grows in clay
Glow Lichen|natural|Caves|Glowing patch on cave walls
Hanging Roots|natural|Lush caves|Roots dangling from the ceiling
Cave Vines|natural|Lush caves|Hanging vines with glow berries|Glow Berries
Rooted Dirt|natural|Under azalea trees|Dirt with hanging roots
Coarse Dirt|natural|Savannas and badlands|Dirt where grass does not spread
Podzol|natural|Old growth taigas|Forest floor that grows mushrooms
Mud|natural|Mangrove swamps|Soft, squishy block
Muddy Mangrove Roots|natural|Mangrove swamps|Roots stuck in mud
Dirt Path|natural|Use a shovel on grass|Flat path for walking
Farmland|natural|Use a hoe on dirt|Wet soil where crops grow
Red Sand|natural|Badlands|Red sand that falls down
Suspicious Sand|natural|Desert temples and ruins|Brush it to find buried treasure
Suspicious Gravel|natural|Cold ocean ruins|Brush it to find buried treasure
Snow|natural|Snowy lands|Thin layer of snow
Powder Snow|natural|Snowy mountains|Soft snow that you sink into
Packed Ice|natural|Ice spikes|Hard ice that does not melt
Blue Ice|natural|Icebergs|The slipperiest block
Honey Block|natural|Crafted from honey bottles|Sticky; slows you and bounces off it
Honeycomb Block|natural|Crafted from honeycombs|Golden block of honeycomb
Slime Block|natural|Crafted from slimeballs|Bouncy block
Sponge|natural|Ocean monuments|Soaks up water
Wet Sponge|natural|Dry a sponge in the Nether|Sponge full of water
Cobweb|natural|Mineshafts|Sticky strands that slow you down
Turtle Egg|natural|Beaches|Hatches into a baby turtle
Frogspawn|natural|Swamps|Hatches into tadpoles
Sniffer Egg|natural|Warm ocean ruins|Hatches into a sniffer
Dragon Egg|nether-end|The End|Teleports when you touch it
Bedrock|natural|The bottom of the world|Cannot be broken in survival mode
Pink Petals|natural|Cherry groves|Pink flower petals on the ground
Carved Pumpkin|natural|Use shears on a pumpkin|Wear it, or build a snow golem
Jack o'Lantern|natural|Crafted from a carved pumpkin and a torch|Glowing pumpkin face|Jack o Lantern,Jack-o'-Lantern
Pale Moss Block|natural|Pale gardens|Grey-green moss
Pale Moss Carpet|natural|Pale gardens|Thin layer of grey-green moss
Pale Hanging Moss|natural|Pale gardens|Moss hanging from trees
Open Eyeblossom|natural|Pale gardens at night|Orange flower that opens at night
Closed Eyeblossom|natural|Pale gardens by day|Grey flower that closes in the day
Dripstone Block|natural|Dripstone caves|Brown block of dripping stone
Pointed Dripstone|natural|Dripstone caves|Sharp spikes that grow up and down
Calcite|natural|Inside amethyst geodes|White stone around amethyst
Amethyst Block|natural|Amethyst geodes|Purple crystal that rings when hit
Budding Amethyst|natural|Amethyst geodes|Grows amethyst crystals
Small Amethyst Bud|natural|Amethyst geodes|Smallest crystal
Medium Amethyst Bud|natural|Amethyst geodes|Medium crystal
Large Amethyst Bud|natural|Amethyst geodes|Large crystal
Amethyst Cluster|natural|Amethyst geodes|Fully grown crystals that drop amethyst shards
Smooth Basalt|nether-end|Made by smelting basalt|Smooth dark rock
Sculk|natural|Deep dark|Spreads and gives experience
Sculk Vein|natural|Deep dark|Thin veins of sculk
Sculk Catalyst|natural|Deep dark|Spreads sculk when something dies nearby
Sculk Sensor|natural|Deep dark|Feels vibrations and sends a signal
Calibrated Sculk Sensor|useful|Crafted from a sculk sensor and amethyst|Listens for one particular sound
Sculk Shrieker|natural|Deep dark|Screams, and can summon a warden
Deepslate Coal Ore|ore|Deep underground|Coal in dark stone
Deepslate Iron Ore|ore|Deep underground|Iron in dark stone
Deepslate Copper Ore|ore|Deep underground|Copper in dark stone
Deepslate Gold Ore|ore|Deep underground|Gold in dark stone
Deepslate Redstone Ore|ore|Deep underground|Redstone in dark stone
Deepslate Lapis Lazuli Ore|ore|Deep underground|Lapis in dark stone|Deepslate Lapis Ore
Deepslate Diamond Ore|ore|Deep underground|Diamonds in dark stone
Deepslate Emerald Ore|ore|Mountains, deep|Emerald in dark stone
Nether Gold Ore|ore|The Nether|Gold in netherrack
Nether Quartz Ore|ore|The Nether|Quartz in netherrack
Raw Iron Block|ore|Crafted from nine raw iron|Block of unsmelted iron
Raw Copper Block|ore|Crafted from nine raw copper|Block of unsmelted copper
Raw Gold Block|ore|Crafted from nine raw gold|Block of unsmelted gold
Block of Coal|ore|Crafted from nine coal|Fuel that burns for a long time|Coal Block
Block of Lapis Lazuli|ore|Crafted from nine lapis lazuli|Deep blue block|Lapis Block
Block of Emerald|ore|Crafted from nine emeralds|Green treasure block|Emerald Block
Block of Netherite|ore|Crafted from nine netherite ingots|The strongest block|Netherite Block
Soul Soil|nether-end|Soul sand valleys|Dark soil that does not slow you
Nether Wart Block|nether-end|The Nether|Red block that grows on crimson trees
Warped Wart Block|nether-end|The Nether|Blue-green block that grows on warped trees
Crimson Nylium|nether-end|Crimson forests|Red grass-like block on netherrack
Warped Nylium|nether-end|Warped forests|Blue-green grass-like block on netherrack
Crimson Fungus|nether-end|Crimson forests|Red mushroom that grows trees
Warped Fungus|nether-end|Warped forests|Blue mushroom that grows trees
Crimson Roots|nether-end|Crimson forests|Red plant on the ground
Warped Roots|nether-end|Warped forests|Blue-green plant on the ground
Nether Sprouts|nether-end|Warped forests|Tiny green sprouts
Weeping Vines|nether-end|Crimson forests|Red vines hanging down
Twisting Vines|nether-end|Warped forests|Blue vines growing up
Nether Wart|nether-end|Nether fortresses|Red plant used for potions
Bone Block|nether-end|Crafted from bone meal|Pale, bony building block
Gilded Blackstone|nether-end|Bastions|Dark stone with gold
Reinforced Deepslate|nether-end|Ancient cities|Very hard block that cannot be mined
Chorus Plant|nether-end|The End|Purple plant on End islands
Chorus Flower|nether-end|The End|Flower on top of a chorus plant
End Portal Frame|nether-end|Strongholds|Frame that opens the way to the End
Barrel|useful|Crafted from planks and slabs|Stores your stuff
Smoker|useful|Crafted from logs and a furnace|Cooks food faster
Blast Furnace|useful|Crafted from iron and smooth stone|Smelts ore faster
Cartography Table|useful|Villages|Makes and copies maps
Fletching Table|useful|Villages|Villagers use it to make arrows
Grindstone|useful|Villages|Repairs tools and removes enchantments
Loom|useful|Villages|Adds patterns to banners
Smithing Table|useful|Villages|Upgrades armour and tools
Stonecutter|useful|Villages|Cuts stone into shapes
Brewing Stand|useful|Crafted from a blaze rod|Brews potions
Cauldron|useful|Witch huts|Holds water, lava or powder snow
Composter|useful|Villages|Turns plants into bone meal
Lectern|useful|Villages|Holds a book for reading
Bell|useful|Villages|Rings when hit
Campfire|useful|Crafted from logs and coal|Cooks food without a furnace
Soul Campfire|useful|Crafted from soul sand and logs|Blue fire that cooks food
Lantern|useful|Crafted from a torch and iron nuggets|Light that hangs or stands
Soul Lantern|useful|Crafted from a soul torch and iron nuggets|Blue light
Soul Torch|useful|Crafted from soul sand and a stick|Blue torch
Redstone Torch|useful|Crafted from redstone and a stick|Gives off a redstone signal
Chain|useful|Crafted from iron|Hangs lanterns
Iron Bars|useful|Villages and strongholds|Like glass, but made of metal
Ladder|useful|Crafted from sticks|Climb up and down
Scaffolding|useful|Crafted from bamboo|Climb it and build high
Lightning Rod|useful|Crafted from copper|Catches lightning
Respawn Anchor|useful|Crafted from crying obsidian and glowstone|Sets your spawn in the Nether
Lodestone|useful|Crafted from netherite and chiseled stone|Points compasses to it
Ender Chest|useful|Crafted from obsidian and an eye of ender|Shares your items between all ender chests
Trapped Chest|useful|Crafted from a chest and a tripwire hook|Sends a signal when opened
Shulker Box|useful|Crafted from shulker shells and a chest|Carries items, even when broken
Conduit|useful|Crafted from nautilus shells|Gives breathing powers underwater
Target|useful|Crafted from redstone and hay bales|Sends a signal when hit by an arrow
Daylight Detector|useful|Crafted from glass and quartz|Sends a signal that follows the sun
Lever|useful|Crafted from a stick and cobblestone|Switches a signal on and off
Redstone Lamp|useful|Crafted from redstone and glowstone|Lights up when powered
Repeater|useful|Crafted from redstone and stone|Delays and boosts a signal
Comparator|useful|Crafted from redstone and quartz|Compares and measures signals
Observer|useful|Crafted from redstone and cobblestone|Sends a signal when a block changes
Dropper|useful|Crafted from cobblestone and redstone|Drops items one by one
Dispenser|useful|Crafted from cobblestone, a bow and redstone|Shoots arrows and other items
Sticky Piston|useful|Crafted from a piston and a slimeball|Pushes and pulls blocks
Crafter|useful|Crafted from iron, a crafting table and redstone|Crafts items automatically
Tripwire Hook|useful|Crafted from iron, a stick and a plank|Sets off a signal when someone walks through
Stone Button|useful|Crafted from stone|Sends a short signal
Stone Pressure Plate|useful|Crafted from stone|Sends a signal when stepped on
Polished Blackstone Button|useful|Crafted from polished blackstone|Sends a short signal
Polished Blackstone Pressure Plate|useful|Crafted from polished blackstone|Sends a signal when stepped on
Heavy Weighted Pressure Plate|useful|Crafted from iron ingots|Stronger signal with more items on it
Light Weighted Pressure Plate|useful|Crafted from gold ingots|Stronger signal with more items on it
Rail|useful|Crafted from iron and sticks|Track for minecarts
Powered Rail|useful|Crafted from gold and redstone|Speeds up minecarts
Detector Rail|useful|Crafted from iron and a pressure plate|Sends a signal when a minecart goes over
Activator Rail|useful|Crafted from iron, sticks and a redstone torch|Switches on special minecarts
Sea Lantern|useful|Ocean monuments|Bright underwater light
End Rod|useful|End cities|Bright, thin, white light
Decorated Pot|useful|Crafted from four pottery sherds or bricks|Stores one item stack
Flower Pot|useful|Crafted from three bricks|Holds a flower or plant
Chiseled Bookshelf|useful|Crafted from planks and slabs|Stores up to six books
Monster Spawner|useful|Dungeons|Makes mobs appear|Spawner
Trial Spawner|useful|Trial chambers|Makes mobs for the trials
Vault|useful|Trial chambers|Opens with a trial key for treasure
Heavy Core|useful|Ominous vaults|Used to craft a mace
Cake|useful|Crafted from milk, sugar, eggs and wheat|Eat it slice by slice
Candle|useful|Crafted from string and honeycomb|Lights up, with up to four on one block
Glass Pane|useful|Crafted from glass|Thin window
Sea Pickle|useful|Warm oceans|Glows under water
Skeleton Skull|useful|Dropped by creepers killed by skeletons|Decoration, or a mob head
Zombie Head|useful|Dropped by creepers killed by zombies|Decoration, or a mob head
Creeper Head|useful|Dropped by charged creepers|Decoration, or a mob head
Player Head|useful|Crafted from a skull|Decoration with a player's face
Piglin Head|useful|Dropped by charged creepers|Decoration, or a mob head
Wither Skeleton Skull|useful|Nether fortresses|Used to summon the wither
Dragon Head|useful|End ships|Decoration, or a mob head
`;

const parse = raw => raw.trim().split("\n").filter(Boolean).map(line => {
  const [name, type, where, use, aliases] = line.split("|");
  return { name, type, where, use, aliases: aliases ? aliases.split(",") : undefined };
});
const BLOCKS = parse(RAW);

// A generator adds a block unless the hand-written list above already has one with that name.
const have = new Set(BLOCKS.map(b => b.name));
function add(name, type, where, use, aliases) {
  if (have.has(name)) return;
  have.add(name);
  BLOCKS.push({ name, type, where, use, aliases });
}

// Colours: one block per dye colour for each kind. "Gray" is also accepted as "Grey".
const COLOURS = ["White", "Orange", "Magenta", "Light Blue", "Yellow", "Lime", "Pink", "Gray", "Light Gray", "Cyan", "Purple", "Blue", "Brown", "Green", "Red", "Black"];
// kind, where (c = the colour in lower case), used for
const COLOUR_KINDS = [
  ["Wool", "Crafted with {c} dye, or from {c} sheep", "Soft block for building and beds"],
  ["Carpet", "Crafted from two {c} wool", "Thin covering for floors that stops mobs spawning"],
  ["Concrete", "Made when {c} concrete powder touches water", "Smooth, bright building block"],
  ["Concrete Powder", "Crafted with {c} dye, sand and gravel", "Falls like sand, then turns into concrete in water"],
  ["Terracotta", "Crafted with {c} dye and terracotta", "Earthy building block"],
  ["Glazed Terracotta", "Smelted from {c} terracotta", "Patterned tile for floors and walls"],
  ["Stained Glass", "Crafted with {c} dye and glass", "See-through coloured window"],
  ["Stained Glass Pane", "Crafted from {c} stained glass", "Thin coloured window"],
  ["Bed", "Crafted from {c} wool and planks", "Skips the night and sets your spawn"],
  ["Banner", "Crafted from {c} wool and a stick", "Hangs on walls; add patterns with a loom"],
  ["Shulker Box", "Dye a shulker box {c}", "Carries items, even when broken"],
  ["Candle", "Crafted from {c} dye and a candle", "Lights up, with up to four on one block"],
];
for (const [kind, where, use] of COLOUR_KINDS) {
  for (const colour of COLOURS) {
    const grey = colour.includes("Gray") ? [`${colour.replace("Gray", "Grey")} ${kind}`] : undefined;
    add(`${colour} ${kind}`, "colour", where.replace("{c}", colour.toLowerCase()), use, grey);
  }
}

// Woods that grow on trees. Each gives the same set of blocks.
// name, where its logs grow
const WOODS = [
  ["Oak", "Forests"], ["Spruce", "Taigas"], ["Birch", "Birch forests"], ["Jungle", "Jungles"], ["Acacia", "Savannas"],
  ["Dark Oak", "Dark forests"], ["Mangrove", "Mangrove swamps"], ["Cherry", "Cherry groves"], ["Pale Oak", "Pale gardens"],
];
// Wooden blocks that every kind of wood has, as [name pattern, where, used for]. {w} is the wood.
const WOOD_BLOCKS = [
  ["{w} Log", "wood", "{where}", "The trunk of the tree; makes planks"],
  ["{w} Wood", "wood", "Crafted from four {w} logs", "Bark on every side"],
  ["Stripped {w} Log", "wood", "Use an axe on a {w} log", "Smooth trunk with no bark"],
  ["Stripped {w} Wood", "wood", "Use an axe on {w} wood", "Smooth block with no bark"],
  ["{w} Planks", "wood", "Crafted from {w} logs", "Basic building block"],
  ["{w} Stairs", "wood", "Crafted from {w} planks", "Climb up a step"],
  ["{w} Slab", "wood", "Crafted from {w} planks", "Half-height block"],
  ["{w} Fence", "wood", "Crafted from {w} planks and sticks", "Keeps animals in; you cannot jump over it"],
  ["{w} Fence Gate", "wood", "Crafted from {w} planks and sticks", "Lets you through a fence"],
  ["{w} Door", "wood", "Crafted from six {w} planks", "Opens and closes; keeps zombies out"],
  ["{w} Trapdoor", "wood", "Crafted from six {w} planks", "A hatch for floors, or a shutter for windows"],
  ["{w} Button", "wood", "Crafted from one {w} plank", "Sends a short redstone signal"],
  ["{w} Pressure Plate", "wood", "Crafted from two {w} planks", "Sends a redstone signal when stepped on"],
  ["{w} Sign", "wood", "Crafted from {w} planks and a stick", "Write messages on it"],
  ["{w} Hanging Sign", "wood", "Crafted from {w} logs and chains", "A sign that hangs from a chain"],
];
const TREE_BLOCKS = [
  ["{w} Leaves", "natural", "{where}", "Grow on trees; sometimes drop saplings or apples"],
  ["{w} Sapling", "natural", "Dropped by {w} leaves", "Plant it to grow a tree"],
];
for (const [w, where] of WOODS) {
  for (const [pattern, type, wh, use] of [...WOOD_BLOCKS, ...TREE_BLOCKS]) {
    const sapling = w === "Mangrove" && pattern.endsWith("Sapling");
    add(sapling ? "Mangrove Propagule" : pattern.replace("{w}", w), type, wh.replace("{where}", where).replace("{w}", w.toLowerCase()), use);
  }
}
add("Mangrove Roots", "wood", "Mangrove swamps", "Tangled roots under a mangrove tree");

// Woods that do not grow from saplings: the same blocks, with their own names for the trunk.
// [name, [kind, where, used for]...] for each block
function woodSet(w, stem, stripped, whereStem, from, extras) {
  const lower = w.toLowerCase();
  const plank = `${w} Planks`;
  const rows = [
    [stem, whereStem, "Makes planks"],
    [stripped, `Use an axe on ${stem === "Block of Bamboo" ? "a block of bamboo" : "a " + stem.toLowerCase()}`, "Smooth trunk with no bark"],
    [plank, `Crafted from ${from}`, "Basic building block"],
    [`${w} Stairs`, `Crafted from ${lower} planks`, "Climb up a step"],
    [`${w} Slab`, `Crafted from ${lower} planks`, "Half-height block"],
    [`${w} Fence`, `Crafted from ${lower} planks and sticks`, "Keeps animals in; you cannot jump over it"],
    [`${w} Fence Gate`, `Crafted from ${lower} planks and sticks`, "Lets you through a fence"],
    [`${w} Door`, `Crafted from six ${lower} planks`, "Opens and closes; keeps zombies out"],
    [`${w} Trapdoor`, `Crafted from six ${lower} planks`, "A hatch for floors, or a shutter for windows"],
    [`${w} Button`, `Crafted from one ${lower} plank`, "Sends a short redstone signal"],
    [`${w} Pressure Plate`, `Crafted from two ${lower} planks`, "Sends a redstone signal when stepped on"],
    [`${w} Sign`, `Crafted from ${lower} planks and a stick`, "Write messages on it"],
    [`${w} Hanging Sign`, `Crafted from ${from} and chains`, "A sign that hangs from a chain"],
    ...extras,
  ];
  for (const [name, where, use] of rows) add(name, "wood", where, use);
}
woodSet("Bamboo", "Block of Bamboo", "Stripped Block of Bamboo", "Crafted from nine bamboo", "blocks of bamboo", [
  ["Bamboo Mosaic", "Crafted from bamboo slabs", "Neat tiled bamboo"],
  ["Bamboo Mosaic Stairs", "Crafted from bamboo mosaic", "Climb up a step"],
  ["Bamboo Mosaic Slab", "Crafted from bamboo mosaic", "Half-height block"],
]);
woodSet("Crimson", "Crimson Stem", "Stripped Crimson Stem", "Giant red fungus in the Nether", "crimson stems", [
  ["Crimson Hyphae", "Crafted from four crimson stems", "Bark on every side"],
  ["Stripped Crimson Hyphae", "Use an axe on crimson hyphae", "Smooth block with no bark"],
]);
woodSet("Warped", "Warped Stem", "Stripped Warped Stem", "Giant blue-green fungus in the Nether", "warped stems", [
  ["Warped Hyphae", "Crafted from four warped stems", "Bark on every side"],
  ["Stripped Warped Hyphae", "Use an axe on warped hyphae", "Smooth block with no bark"],
]);

// Stone shapes. Each line is: base block|name used for the shapes|shapes|where the base is found|what the base is used for.
// Shapes: S = stairs, L = slab, W = wall. The base block itself is added too, unless the lists above have it.
const STONES = `
Cobblestone|Cobblestone|SLW
Mossy Cobblestone|Mossy Cobblestone|SLW|Dungeons and jungle temples|Mossy building block
Stone|Stone|SL
Smooth Stone|Smooth Stone|L|Smelted from stone|Smooth building block
Stone Bricks|Stone Brick|SLW
Mossy Stone Bricks|Mossy Stone Brick|SLW|Strongholds and jungle temples|Mossy building block
Cracked Stone Bricks|Cracked Stone Bricks||Strongholds|Cracked, old-looking bricks
Chiseled Stone Bricks|Chiseled Stone Bricks||Strongholds and ruins|Carved bricks with a pattern
Granite|Granite|SLW
Polished Granite|Polished Granite|SL|Crafted from granite|Smooth reddish-pink stone
Diorite|Diorite|SLW
Polished Diorite|Polished Diorite|SL|Crafted from diorite|Smooth white stone
Andesite|Andesite|SLW
Polished Andesite|Polished Andesite|SL|Crafted from andesite|Smooth grey stone
Sandstone|Sandstone|SLW|Deserts and beaches|Yellow building block
Cut Sandstone|Cut Sandstone|L|Crafted from sandstone|Neat, flat sandstone
Chiseled Sandstone|Chiseled Sandstone||Crafted from sandstone slabs|Sandstone with a carved face
Smooth Sandstone|Smooth Sandstone|SL|Smelted from sandstone|Very smooth sandstone
Red Sandstone|Red Sandstone|SLW|Badlands and red sand deserts|Orange-red building block
Cut Red Sandstone|Cut Red Sandstone|L|Crafted from red sandstone|Neat, flat red sandstone
Chiseled Red Sandstone|Chiseled Red Sandstone||Crafted from red sandstone slabs|Red sandstone with a carved face
Smooth Red Sandstone|Smooth Red Sandstone|SL|Smelted from red sandstone|Very smooth red sandstone
Bricks|Brick|SLW
Mud Bricks|Mud Brick|SLW|Crafted from packed mud|Muddy-brown bricks
Packed Mud|Packed Mud||Crafted from mud and wheat|Strong mud for building
Nether Bricks|Nether Brick|SLW
Cracked Nether Bricks|Cracked Nether Bricks||Smelted from nether bricks|Cracked dark bricks
Chiseled Nether Bricks|Chiseled Nether Bricks||Crafted from nether brick slabs|Carved dark bricks
Red Nether Bricks|Red Nether Brick|SLW|Crafted from nether wart and nether bricks|Red dark bricks
Blackstone|Blackstone|SLW
Polished Blackstone|Polished Blackstone|SLW|Crafted from blackstone|Smooth dark stone
Chiseled Polished Blackstone|Chiseled Polished Blackstone||Crafted from polished blackstone slabs|Carved dark stone
Polished Blackstone Bricks|Polished Blackstone Brick|SLW|Crafted from polished blackstone|Dark building bricks
Cracked Polished Blackstone Bricks|Cracked Polished Blackstone Bricks||Smelted from polished blackstone bricks|Cracked dark bricks
Cobbled Deepslate|Cobbled Deepslate|SLW|Deep underground|What deepslate drops when mined
Polished Deepslate|Polished Deepslate|SLW|Crafted from cobbled deepslate|Smooth dark grey stone
Deepslate Bricks|Deepslate Brick|SLW|Crafted from polished deepslate|Dark grey bricks
Cracked Deepslate Bricks|Cracked Deepslate Bricks||Smelted from deepslate bricks|Cracked dark grey bricks
Deepslate Tiles|Deepslate Tile|SLW|Crafted from deepslate bricks|Dark grey roof tiles
Cracked Deepslate Tiles|Cracked Deepslate Tiles||Smelted from deepslate tiles|Cracked dark grey tiles
Chiseled Deepslate|Chiseled Deepslate||Crafted from cobbled deepslate slabs|Carved dark stone
Tuff|Tuff|SLW|Deep underground|Grey-green building stone
Polished Tuff|Polished Tuff|SLW|Crafted from tuff|Smooth tuff
Tuff Bricks|Tuff Brick|SLW|Crafted from polished tuff|Tuff building bricks
Chiseled Tuff|Chiseled Tuff||Crafted from tuff slabs|Carved tuff
Chiseled Tuff Bricks|Chiseled Tuff Bricks||Crafted from tuff brick slabs|Carved tuff bricks
Prismarine|Prismarine|SLW|Ocean monuments|Blue-green building stone
Prismarine Bricks|Prismarine Brick|SL|Ocean monuments|Blue-green bricks
Dark Prismarine|Dark Prismarine|SL|Ocean monuments|Deep blue-green stone
Block of Quartz|Quartz|SL
Smooth Quartz Block|Smooth Quartz|SL|Smelted from quartz blocks|Very smooth white block
Chiseled Quartz Block|Chiseled Quartz Block||Crafted from quartz slabs|Carved white block
Quartz Pillar|Quartz Pillar||Crafted from quartz blocks|Tall white column
Quartz Bricks|Quartz Bricks||Crafted from quartz blocks|White bricks
Purpur Block|Purpur|SL
Purpur Pillar|Purpur Pillar||End cities|Tall purple column
End Stone Bricks|End Stone Brick|SLW|Crafted from end stone|Pale yellow bricks
Resin Block|Resin Block||Crafted from nine resin clumps|Orange-red block
Resin Bricks|Resin Brick|SLW|Smelted from resin clumps|Orange-red bricks
Chiseled Resin Bricks|Chiseled Resin Bricks||Crafted from resin brick slabs|Carved orange-red bricks
`;
const SHAPES = {
  S: ["Stairs", "Crafted from {s}", "Climb up a step"],
  L: ["Slab", "Crafted from {s}", "Half-height block"],
  W: ["Wall", "Crafted from {s}", "Taller than a block, so you cannot jump over it"],
};
for (const line of STONES.trim().split("\n")) {
  const [base, stem, shapes, where, use] = line.split("|");
  const lower = base === "Block of Quartz" ? "quartz blocks" : base.toLowerCase();
  add(base, "stone", where, use);
  for (const s of shapes) {
    const [kind, wh, u] = SHAPES[s];
    add(`${stem} ${kind}`, "stone", wh.replace("{s}", lower), u);
  }
}

// Copper rusts through four stages, and wax stops it. Each kind comes in every stage, plain and waxed.
const STAGES = [["", "Shiny and new"], ["Exposed ", "Slightly tarnished"], ["Weathered ", "Half rusted, with green patches"], ["Oxidized ", "Fully green with rust"]];
const COPPER_KINDS = [
  ["Copper", "Crafted from nine copper ingots", "Orange metal block", "Block of "],
  ["Cut Copper", "Crafted from copper blocks", "Neat copper tiles"],
  ["Cut Copper Stairs", "Crafted from cut copper", "Climb up a step"],
  ["Cut Copper Slab", "Crafted from cut copper", "Half-height block"],
  ["Chiseled Copper", "Crafted from cut copper slabs", "Carved copper"],
  ["Copper Grate", "Crafted from copper blocks", "Lets water and light through"],
  ["Copper Bulb", "Crafted from copper, a blaze rod and redstone", "A light that switches with redstone"],
  ["Copper Door", "Crafted from six copper ingots", "Opens and closes"],
  ["Copper Trapdoor", "Crafted from four copper ingots", "A copper hatch"],
];
for (const waxed of [false, true]) {
  for (const [kind, where, use, only] of COPPER_KINDS) {
    for (const [stage, look] of STAGES) {
      const name = (waxed ? "Waxed " : "") + (only && !stage ? only + kind : stage + kind);
      add(name, "copper", waxed ? `Use honeycomb on ${stage.toLowerCase()}${kind.toLowerCase()}` : where, `${use}. ${waxed ? "Wax stops it from rusting" : look}`);
    }
  }
}

// Coral comes in five kinds. Each kind has a coral block, a coral and a fan, alive and dead.
const CORALS = ["Tube", "Brain", "Bubble", "Fire", "Horn"];
for (const [kind, where, use] of [
  ["Coral Block", "Warm oceans", "Colourful reef block; it dies when it has no water"],
  ["Coral", "Warm oceans", "Sea plant that needs water"],
  ["Coral Fan", "Warm oceans", "A flat sea fan"],
]) {
  for (const dead of [false, true]) {
    for (const c of CORALS) add(`${dead ? "Dead " : ""}${c} ${kind}`, "natural", where, dead ? `${use}. This one is dead and grey` : use);
  }
}

BLOCKS.push(...parse(MORE));

const TYPES = ["natural", "stone", "ore", "wood", "colour", "copper", "useful", "nether-end"];

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
