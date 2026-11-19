// The Stone Age questions. Line order = question order, and saved progress is stored by position, so add new questions at the end.
// Format per line: Question|level|Right answer|Wrong answer|Wrong answer|Wrong answer|Fact shown afterwards
// level: easy or hard. The engine shuffles the answers, so the right one is always written first here.
const RAW = `
What were most tools made of in the Stone Age?|easy|Stone|Plastic|Iron|Steel|People also used wood, bone and antler.
Which hard stone did Stone Age people chip to make sharp tools?|easy|Flint|Chalk|Sandstone|Marble|Flint can be chipped into an edge as sharp as a knife.
How did early Stone Age people get their food?|easy|Hunting animals and gathering plants|Buying it in shops|Ordering takeaways|Growing it in greenhouses|They moved from place to place, following the animals they hunted.
What did Stone Age people often paint on cave walls?|easy|Animals they hunted|Cars|Castles|Aeroplanes|The cave paintings at Lascaux in France are about 17,000 years old.
Which big, hairy relative of the elephant did Stone Age people hunt?|easy|Woolly mammoth|Tyrannosaurus rex|Giraffe|Kangaroo|Mammoths had thick fur to keep warm in the Ice Age.
Did Stone Age people live at the same time as dinosaurs?|easy|No, dinosaurs died out millions of years earlier|Yes, they rode them|Yes, they kept them as pets|Yes, but only the small ones|Dinosaurs died out about 66 million years ago, long before the first people.
What did Stone Age people learn to use to keep warm and cook food?|easy|Fire|Electricity|Gas heaters|Microwaves|Fire also kept wild animals away at night.
What is the famous stone circle in Wiltshire, England?|easy|Stonehenge|Hadrian's Wall|Big Ben|The Tower of London|People started building it about 5,000 years ago.
What did Stone Age people make from animal skins?|easy|Clothes and shelters|Paper|Glass|Coins|They used bone needles to sew the skins together.
Which age came after the Stone Age?|easy|The Bronze Age|The Iron Age|The Ice Age|The Space Age|After the Bronze Age came the Iron Age.
Where did early Stone Age people often shelter?|easy|Caves and simple huts|Blocks of flats|Castles|Caravans|Huts were made from wood, animal skins and even mammoth bones.
What is a scientist who digs up things from the past called?|easy|An archaeologist|An astronaut|A dentist|A chef|Archaeologists dig carefully, using small trowels and brushes.
What is the Old Stone Age called?|hard|Palaeolithic|Neolithic|Mesolithic|Jurassic|Palaeo means old, and lithic means stone.
What is the New Stone Age called, when farming began?|hard|Neolithic|Palaeolithic|Mesolithic|Cretaceous|Neo means new.
What is the Middle Stone Age called?|hard|Mesolithic|Neolithic|Palaeolithic|Triassic|Meso means middle.
What big change happened in the New Stone Age?|hard|People started farming|People invented cars|People built castles|People started printing books|Farming began in Britain about 6,000 years ago.
Which animal was the first to be tamed by people?|hard|Dog|Cat|Horse|Chicken|Dogs were tamed from wolves in the Stone Age.
What is the Stone Age village in Orkney, Scotland, with stone beds and dressers?|hard|Skara Brae|Stonehenge|Pompeii|Jorvik|It is about 5,000 years old, and a storm uncovered it in 1850.
What is a long mound of earth where Neolithic people buried their dead called?|hard|A long barrow|A wheelbarrow|A castle|A pyramid|West Kennet Long Barrow in Wiltshire is a famous one.
What is a teardrop-shaped stone tool held in the hand called?|hard|A hand axe|A chainsaw|A spanner|A screwdriver|Hand axes were used for chopping, cutting and digging.
What did Neolithic people make out of clay?|hard|Pots|Coins|Windows|Swords|They baked the clay pots in fires to make them hard.
How do we know about the Stone Age, when people then could not write?|hard|From things they left behind, like tools and bones|From their diaries|From old newspapers|From their emails|The time before writing is called prehistory.
What was the Ice Age?|hard|A long cold time when ice covered much of the land|A time when everyone ate ice cream|A time when the sea froze solid forever|A kind of winter sport|During the coldest times, Britain was joined to Europe by land.
About how long ago did the Stone Age end in Britain?|hard|About 4,500 years ago|About 100 years ago|About 1,000 years ago|About 1 million years ago|Then people learned to make tools from bronze.
What did Neolithic people use to grind grain into flour?|hard|A quern stone|A kettle|A blender|A toaster|They rubbed the grain between two stones.
What did cave painters use to make their paint?|hard|Coloured earth and charcoal|Felt-tip pens|Wax crayons|Spray cans|They sometimes blew paint through hollow bones to make pictures of their hands.
What were Stone Age arrowheads and spear tips often made of?|hard|Flint|Plastic|Gold|Glass|They tied them to wooden shafts with animal sinew.
Which large animal with huge antlers, now extinct, lived in Ice Age Britain?|hard|Giant deer (Irish elk)|Moose|Reindeer|Unicorn|Its antlers could be more than 3 metres across.
What did Stone Age people use bows, arrows and spears for?|easy|Hunting animals|Playing tennis|Writing letters|Painting caves|Bows and arrows came late in the Stone Age.
Which of these did Stone Age people NOT have?|easy|Metal tools|Fire|Stone tools|Clothes|Tools made of metal came later, in the Bronze Age.
What do we call people who hunt animals and gather wild plants to eat?|easy|Hunter-gatherers|Farmers|Shopkeepers|Knights|Hunter-gatherers moved on when the food ran out.
What musical instrument made from a bird's bone has been found from the Stone Age?|hard|A flute|A guitar|A piano|A trumpet|Bone flutes found in Germany are more than 35,000 years old.
What were the homes in Neolithic villages often made of?|easy|Wood, mud and thatch|Bricks and glass|Steel and concrete|Plastic|At Skara Brae in Orkney, where there were few trees, they were built of stone.
Which of these animals did Neolithic farmers keep?|easy|Sheep, cattle and pigs|Lions and tigers|Penguins|Kangaroos|They also kept goats and dogs.
What did Neolithic farmers grow?|easy|Wheat and barley|Potatoes and tomatoes|Bananas|Chocolate|Potatoes and tomatoes came to Europe from America much later.
Which hairy animal with horns on its nose lived in Ice Age Britain?|easy|Woolly rhinoceros|Unicorn|Triceratops|Narwhal|It died out at the end of the last Ice Age.
Which of these would a Stone Age hunter-gatherer have eaten?|easy|Berries, nuts and meat|Pizza|Chips|Chocolate cake|They also caught fish and collected shellfish.
What did Stone Age people use as needles?|easy|Sharpened bone|Steel pins|Plastic needles|Glass rods|They used animal sinew as thread.
Which of these did Stone Age people use to catch fish?|easy|Spears and harpoons|Fishing rods with reels|Nylon nets|Submarines|Harpoons had sharp barbs carved from antler.
What did Stone Age children probably spend their days doing?|easy|Helping to find food and learning to make tools|Going to school|Playing video games|Watching TV|They learned by watching and helping the grown-ups.
How did people keep warm in the Ice Age?|easy|With furs, fire and shelter|With central heating|With electric blankets|With hot water bottles|Some huts were covered with animal skins held down by mammoth bones.
Which of these could Stone Age people make?|easy|Stone tools|Televisions|Bicycles|Phones|Stone Age tools have been found all over the world.
What was Britain like during the coldest part of the Ice Age?|easy|Freezing cold, with ice sheets|Boiling hot|Like a tropical beach|Covered in jungle|Huge sheets of ice covered much of the land.
What did Stone Age people make jewellery from?|easy|Shells, teeth and bones|Gold and diamonds|Plastic beads|Glass|They wore necklaces of shells and animal teeth.
What is a mammoth's long, curved tooth called?|easy|A tusk|A horn|An antler|A claw|Mammoth tusks could be more than 4 metres long.
Which animal did Ice Age hunters follow across the frozen land?|easy|Reindeer|Camels|Kangaroos|Penguins|Reindeer gave them meat, skins for clothes, and antlers for tools.
What did people start to do once they became farmers?|easy|Live in one place, in villages|Live on boats|Move every single day|Live in the treetops|Farming meant they didn't have to follow the animals.
How did Stone Age people light fires?|hard|By striking flint to make sparks|With matches|With lighters|With electric heaters|They struck flint against a rock called iron pyrite. They could also rub sticks together.
Which early people lived in Europe in the Ice Age, before modern humans arrived?|hard|Neanderthals|Romans|Vikings|Egyptians|Neanderthals were short and strong, with big brains.
Where did the very first humans like us come from?|hard|Africa|Europe|Australia|Antarctica|Our species first appeared in Africa about 300,000 years ago.
What is the name of our species?|hard|Homo sapiens|Tyrannosaurus rex|Homo dinosaurus|Canis lupus|Homo sapiens means wise human.
What do we call a single tall stone set upright by Neolithic people?|hard|A standing stone|A stepping stone|A gemstone|A millstone|At Carnac in France, rows of standing stones stretch for kilometres.
What is a henge?|hard|A round bank of earth with a ditch|A Stone Age weapon|A cave|A boat|Stonehenge is the most famous, but many henges had no stones at all.
Where did the smaller bluestones of Stonehenge come from?|hard|Wales|France|Scotland|Ireland|They were brought more than 200 kilometres from the Preseli Hills.
Stonehenge lines up with the Sun on which days?|hard|The longest and shortest days of the year|Every Monday|Everyone's birthday|New Year's Day|At the summer solstice, the Sun rises over the Heel Stone.
What is a dugout canoe?|hard|A boat made from a hollowed-out tree trunk|A boat made of stone|A sledge for snow|A house in a cave|Stone Age people used them to fish and to travel along rivers.
At Star Carr in Yorkshire, archaeologists found headdresses made from what?|hard|Deer skulls and antlers|Gold|Feathers|Seashells|They are about 11,000 years old.
Cheddar Man is a skeleton about 10,000 years old. Where was he found?|hard|In a cave|In a castle|In a river|In a tree|He was found in Gough's Cave in Somerset in 1903.
Who discovered the Lascaux cave paintings in France in 1940?|hard|Some teenagers and their dog|A king|A famous scientist|An astronaut|The dog was called Robot!
What did Neolithic people use to dig flint mines and ditches?|hard|Picks made from deer antlers|Metal shovels|Diggers|Spoons|At Grime's Graves in Norfolk, you can climb down into a Neolithic flint mine.
How long did the Stone Age last?|hard|Millions of years|About 100 years|About 1,000 years|About 10 years|It began more than 3 million years ago, when the first stone tools were made.
Which tool did people use to clean animal skins?|hard|A scraper|A hammer|A saw|A drill|Flint scrapers are one of the most common Stone Age tools found.
Doggerland was land that once joined Britain to which country?|hard|The Netherlands|Spain|Iceland|Italy|Rising seas covered Doggerland about 8,000 years ago.
What is a cairn?|hard|A pile of stones, often over a grave|A Stone Age weapon|A kind of boat|A cave painting|Some cairns in Scotland are about 5,000 years old.
Why did early Stone Age people move from place to place?|hard|To follow animals and find food as the seasons changed|To go on holiday|To find shops|To visit friends by car|Moving people are called nomads.
`;

const GAME = {
  id: "stoneagequiz", // localStorage key
  category: "know", // a CATEGORIES id in games/index.js
  title: "The Stone Age",
  items: RAW.trim().split("\n").map(line => {
    const [q, level, ...rest] = line.split("|");
    return { q, level, options: rest.slice(0, 4), fact: rest[4] };
  }),
};

if (typeof module !== "undefined") module.exports = GAME;
