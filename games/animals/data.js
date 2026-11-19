// Animals, in six groups. Line order = card order, and saved progress is stored by position,
// so add new animals at the end.
// Format per line: Name|group|home|clue|alias,alias
// group: mammal, bird, reptile, amphibian, fish or invertebrate (no backbone: insects, spiders, snails, octopuses...)
// The clue must not say the animal's name. Chips capitalise every word, so keep the home short.
const RAW = `
Lion|mammal|African grasslands|A big cat that lives in a family group called a pride; the males have a mane
Tiger|mammal|Asian forests|The biggest cat, with orange fur and black stripes
Cheetah|mammal|African grasslands|The fastest runner on land, with black spots
Leopard|mammal|Africa and Asia|A spotty big cat that drags its food up into trees
Elephant|mammal|Africa and Asia|The biggest land animal, with a long trunk and tusks
Giraffe|mammal|African grasslands|The tallest animal, with a very long neck
Zebra|mammal|African grasslands|A wild horse with black and white stripes
Hippopotamus|mammal|African rivers|Spends the day in the water and has enormous teeth|Hippo
Rhinoceros|mammal|Africa and Asia|A huge animal with one or two horns on its nose|Rhino
Gorilla|mammal|African forests|The biggest ape, which beats its chest
Chimpanzee|mammal|African forests|A clever ape that uses sticks as tools|Chimp
Orangutan|mammal|Asian rainforests|A red-haired ape that lives high in the trees|Orang-utan
Monkey|mammal|Warm forests|Swings through the trees, and many have long tails
Kangaroo|mammal|Australia|Hops on strong back legs and carries its baby in a pouch
Koala|mammal|Australian forests|Sleeps most of the day and eats eucalyptus leaves|Koala bear
Panda|mammal|Chinese mountains|A black and white bear that eats bamboo|Giant panda
Polar Bear|mammal|The Arctic|A white bear that hunts seals on the sea ice
Brown Bear|mammal|Northern forests|A big bear that catches salmon in rivers|Grizzly bear,Grizzly
Wolf|mammal|Forests and mountains|Lives in a pack and howls to call the others
Fox|mammal|Woods and towns|Has reddish fur and a big bushy tail|Red fox
Rabbit|mammal|Fields|Has long ears and lives in burrows called a warren|Bunny
Squirrel|mammal|Woods and parks|Buries nuts to eat in the winter
Hedgehog|mammal|Gardens and woods|Rolls up into a prickly ball when it's scared
Badger|mammal|Woods|Has black and white stripes on its face and lives in a sett
Deer|mammal|Forests and fields|The males grow new antlers every year
Mouse|mammal|Fields and houses|A tiny animal with a long tail and whiskers
Bat|mammal|Caves and trees|The only mammal that can really fly
Horse|mammal|Farms|People ride them, and a baby one is called a foal|Pony
Cow|mammal|Farms|Gives us milk and says moo
Pig|mammal|Farms|A farm animal that rolls in mud to keep cool|Piglet
Sheep|mammal|Farms and hills|Its woolly coat is used to make jumpers|Lamb
Goat|mammal|Farms and mountains|A great climber, with horns and a beard
Dog|mammal|Homes|A loyal pet that wags its tail|Puppy
Cat|mammal|Homes|A pet that purrs and has whiskers|Kitten
Camel|mammal|Deserts|Stores fat in its hump and can go days without water
Dolphin|mammal|Oceans|A clever sea animal that talks with clicks and whistles
Blue Whale|mammal|Oceans|The biggest animal that has ever lived|Whale
Orca|mammal|Oceans|A black and white hunter of the sea: the biggest kind of dolphin|Killer whale
Seal|mammal|Coasts|Lies on rocks and swims with flippers
Walrus|mammal|The Arctic|Has two long tusks and a bristly moustache
Otter|mammal|Rivers and coasts|A playful swimmer; some sleep floating on their backs
Sloth|mammal|South American rainforests|Moves very slowly and hangs upside down in trees
Platypus|mammal|Australian rivers|A furry animal with a bill like a duck's, which lays eggs
Meerkat|mammal|African deserts|Stands up on its back legs to keep watch
Mole|mammal|Underground|Digs tunnels with its big front paws
Raccoon|mammal|North America|Has a black mask around its eyes and a stripy tail
Skunk|mammal|North America|Sprays a terrible smell when it's scared
Hamster|mammal|Homes|A small pet that stuffs food into its cheeks
Llama|mammal|South American mountains|A woolly animal from the Andes that can spit
Lemur|mammal|Madagascar|Lives only on one island and has a long, stripy tail
Armadillo|mammal|The Americas|Covered in bony armour plates
Beaver|mammal|Rivers and lakes|Builds dams out of sticks, using its strong teeth
Moose|mammal|Northern forests|The biggest deer, with huge flat antlers
Hyena|mammal|African grasslands|Makes a noise that sounds like laughing
Eagle|bird|Mountains and forests|A big bird of prey with sharp eyes and strong talons
Owl|bird|Woods and barns|Hunts at night and can turn its head almost all the way round
Penguin|bird|Antarctica and coasts|Can't fly, but swims brilliantly
Ostrich|bird|African grasslands|The biggest bird in the world, too heavy to fly
Flamingo|bird|Lakes|A pink bird that often stands on one leg
Parrot|bird|Rainforests|A colourful bird that can copy words
Peacock|bird|India and parks|The male spreads a huge fan of tail feathers with eye spots|Peafowl
Swan|bird|Lakes and rivers|A big white water bird with a long, curved neck
Duck|bird|Ponds and rivers|Says quack and has webbed feet
Robin|bird|Gardens|A small bird with a red breast
Hummingbird|bird|The Americas|A tiny bird that hovers by beating its wings super fast
Woodpecker|bird|Woods|Drums on tree trunks with its beak
Pigeon|bird|Towns and cities|A city bird that can always find its way home
Crow|bird|Everywhere|A very clever black bird
Toucan|bird|South American rainforests|Has a huge, colourful beak
Kiwi|bird|New Zealand|A small bird that can't fly and comes out at night
Puffin|bird|Sea cliffs|A seabird with a bright, stripy orange beak
Chicken|bird|Farms|Lays the eggs that we eat|Hen
Seagull|bird|Coasts|A noisy seaside bird that steals chips|Gull
Vulture|bird|Deserts and grasslands|A big bird that eats animals that are already dead
Emu|bird|Australia|A huge bird from Australia that can't fly
Crocodile|reptile|Rivers in hot countries|Has a long, pointed snout and very strong jaws|Croc
Alligator|reptile|Swamps|Like its cousin the croc, but with a wider, rounder snout|Gator
Cobra|reptile|Africa and Asia|A snake that spreads out a hood when it's angry
Python|reptile|Hot countries|A big snake that squeezes its prey
Rattlesnake|reptile|The Americas|A snake that shakes its tail to warn you away
Tortoise|reptile|Dry land|Carries its shell on its back and can live for over 100 years
Turtle|reptile|Seas and rivers|Has a shell and swims with flippers or webbed feet
Chameleon|reptile|Africa and Madagascar|A lizard that changes colour and catches insects with a long sticky tongue
Gecko|reptile|Warm countries|A small lizard that can climb walls with its sticky feet
Iguana|reptile|Central and South America|A big green lizard with spikes along its back
Komodo Dragon|reptile|Indonesian islands|The biggest lizard in the world
Frog|amphibian|Ponds|Hops, and starts life as a tadpole
Toad|amphibian|Gardens and ponds|Like a frog, but with dry, bumpy skin
Newt|amphibian|Ponds|A small amphibian with a tail that lays its eggs in ponds
Salamander|amphibian|Damp forests|Looks like a lizard, but has smooth, damp skin
Axolotl|amphibian|Lakes in Mexico|A smiley amphibian that can grow back lost legs
Shark|fish|Oceans|A hunter with rows and rows of sharp teeth
Goldfish|fish|Ponds and tanks|A popular orange pet fish
Clownfish|fish|Coral reefs|An orange and white fish that hides in a sea anemone
Salmon|fish|Rivers and oceans|Swims up rivers and leaps up waterfalls to lay its eggs
Seahorse|fish|Seas|The dad carries the babies in his pouch
Pufferfish|fish|Warm seas|Blows itself up into a spiky ball|Puffer fish,Blowfish
Stingray|fish|Seas|A flat fish with a long tail that can sting|Ray
Swordfish|fish|Oceans|Has a long, flat, pointed bill
Eel|fish|Rivers and seas|A long, thin fish that looks like a snake
Tuna|fish|Oceans|A big, fast fish that often goes in sandwiches
Bee|invertebrate|Gardens and hives|An insect that makes honey|Honeybee,Bumblebee
Butterfly|invertebrate|Gardens and meadows|An insect that starts life as a caterpillar
Ant|invertebrate|Everywhere|A tiny insect that lives in a huge colony
Ladybird|invertebrate|Gardens|A red beetle with black spots|Ladybug
Spider|invertebrate|Everywhere|Has eight legs and spins webs
Snail|invertebrate|Gardens|Carries its shell and leaves a slimy trail
Worm|invertebrate|Soil|Wriggles through the soil and keeps it healthy|Earthworm
Octopus|invertebrate|Oceans|Has eight arms and three hearts
Squid|invertebrate|Oceans|Has eight arms, two long tentacles, and squirts ink
Jellyfish|invertebrate|Oceans|Has no brain or bones, and can sting
Crab|invertebrate|Beaches and seas|Walks sideways and has big claws
Starfish|invertebrate|Seas|Has five arms and can grow back a lost one|Sea star
Dragonfly|invertebrate|Ponds|A fast insect with four see-through wings
Grasshopper|invertebrate|Grasslands|Jumps high and chirps by rubbing its legs
Scorpion|invertebrate|Deserts|Has a stinger on the end of its tail
Lobster|invertebrate|Seas|Has big claws and turns red when it's cooked
`;

const ANIMALS = RAW.trim().split("\n").map(line => {
  const [name, group, home, clue, aliases] = line.split("|");
  return { name, group, home, clue, aliases: aliases ? aliases.split(",") : undefined };
});

const GROUPS = ["mammal", "bird", "reptile", "amphibian", "fish", "invertebrate"];

const GAME = {
  id: "animalsquiz", // localStorage key
  category: "learn", // a CATEGORIES id in games/index.js
  title: "Guess the Animals!",
  placeholder: "Type an animal…",
  noun: "animal", nouns: "animals", verb: "found",
  cheers: ["Roar-some!", "Wild!", "You got it!", "Paws-itively great!", "Amazing!", "Great job!"],
  items: ANIMALS,
  doneStyle: a => `--c1:var(--${a.group})`,
  filters: GROUPS.map(g => ({ label: g, color: `var(--${g})`, test: a => a.group === g })),
  // chip() comes from the engine; these only run once the page has loaded it
  hints: [
    { id: "home", label: "🏠 Home", title: "Reveal where it lives", reveal: a => chip(a.home, `var(--${a.group})`) },
    { id: "clue", label: "💡 Clue", title: "Reveal a clue", reveal: a => chip(a.clue) },
  ],
};

if (typeof module !== "undefined") module.exports = GAME;
