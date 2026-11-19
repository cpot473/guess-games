// Earth and Volcanoes questions. Line order = question order, and saved progress is stored by position, so add new questions at the end.
// Format per line: Question|level|Right answer|Wrong answer|Wrong answer|Wrong answer|Fact shown afterwards
// level: easy or hard. The engine shuffles the answers, so the right one is always written first here.
const RAW = `
What comes out of an erupting volcano?|easy|Lava|Water|Snow|Sand|Lava is melted rock, and it can be over 1,000 °C.
What is melted rock under the ground called?|easy|Magma|Lava|Clay|Soil|Magma is called lava once it comes out of the ground.
What do we call it when the ground shakes?|easy|An earthquake|A tornado|A tsunami|A hurricane|Earthquakes happen when giant pieces of the Earth's crust move.
What is the layer of the Earth that we live on called?|easy|The crust|The core|The mantle|The magma|The crust is thinnest under the oceans.
What is at the very middle of the Earth?|easy|The core|The crust|The mantle|The ocean|The core is about as hot as the surface of the Sun.
What is a giant sea wave, often caused by an earthquake, called?|easy|A tsunami|A tornado|A geyser|A glacier|Tsunami is a Japanese word that means "harbour wave".
About how much of the Earth's surface is covered by water?|easy|About 70%|About 10%|About 30%|About 50%|That's why Earth is sometimes called the Blue Planet.
Which is the biggest ocean?|easy|Pacific|Atlantic|Indian|Arctic|The Pacific is bigger than all the land on Earth put together.
Which is the tallest mountain above sea level?|easy|Mount Everest|K2|Ben Nevis|Mount Fuji|Mount Everest is 8,849 metres high.
How many continents are there?|easy|7|5|6|9|Africa, Antarctica, Asia, Australia (Oceania), Europe, North America and South America.
Which is the biggest continent?|easy|Asia|Africa|Europe|Antarctica|More than half of all the people in the world live in Asia.
What falls from the sky after a big eruption, like grey snow?|easy|Ash|Snow|Rain|Hail|Volcanic ash is made of tiny bits of rock and glass.
Which country is called "the land of fire and ice" because of its volcanoes and glaciers?|easy|Iceland|Spain|France|Egypt|Iceland also has lots of geysers and hot springs.
What is a big river of ice that moves very slowly called?|easy|A glacier|An iceberg|A geyser|A delta|Glaciers carved out many valleys long ago.
Which Roman town was buried by a volcano in AD 79?|easy|Pompeii|Rome|Athens|London|Mount Vesuvius covered it in ash. Today you can walk its streets.
Which famous mountain in Japan is a volcano?|easy|Mount Fuji|Mount Everest|Ben Nevis|Uluru|It is Japan's tallest mountain, and it last erupted in 1707.
What are fossils?|easy|Remains of ancient plants and animals kept in rock|Old coins|Rocks from space|Bits of lava|Most dinosaur bones we know about are fossils.
A volcano that is asleep but could erupt again is called...|hard|Dormant|Extinct|Active|Frozen|An extinct volcano is not expected to ever erupt again.
What is the hot, slowly moving layer under the crust called?|hard|The mantle|The core|The ozone layer|The bedrock|The mantle is the thickest layer of the Earth.
What is the Earth's core mostly made of?|hard|Iron and nickel|Gold|Rock and soil|Water|The inner core is solid, and the outer core is liquid metal.
What are the giant pieces that the Earth's crust is broken into?|hard|Tectonic plates|Lava lakes|Ocean beds|Magma blocks|The plates move about as fast as your fingernails grow.
What is the Ring of Fire?|hard|A ring of volcanoes around the Pacific Ocean|A volcano in Iceland|A ring around the Sun|A circus trick|Most of the world's volcanoes and earthquakes are on it.
Hot water that shoots up out of the ground is called a...|hard|Geyser|Glacier|Delta|Canyon|Old Faithful, in Yellowstone in the USA, erupts many times a day.
What kind of rock forms when lava cools down?|hard|Igneous|Sedimentary|Metamorphic|Fossil|Igneous comes from a Latin word for fire.
Which rock is so full of air bubbles that it can float on water?|hard|Pumice|Granite|Marble|Slate|Pumice is made when frothy lava cools very quickly.
Which is the largest active volcano on Earth?|hard|Mauna Loa|Mount Etna|Vesuvius|Mount Fuji|It is in Hawaii, and it erupted most recently in 2022.
Which very active volcano is on the island of Sicily, in Italy?|hard|Mount Etna|Mount Everest|Ben Nevis|Mont Blanc|Etna erupts very often, and it is the tallest active volcano in Europe.
What is a scientist who studies volcanoes called?|hard|A volcanologist|An astronomer|A dentist|A botanist|They measure gases and tiny earthquakes to tell when a volcano might erupt.
What is the deepest place in the ocean?|hard|The Mariana Trench|The Grand Canyon|The Dead Sea|The Bermuda Triangle|It is almost 11 kilometres deep, deeper than Everest is tall.
Which is the biggest hot desert in the world?|hard|The Sahara|The Gobi|The Kalahari|The Atacama|The biggest desert of all is cold Antarctica, because it gets so little snow or rain.
A crack in the Earth's crust where earthquakes often happen is called a...|hard|Fault|Vent|Crater|Geyser|The San Andreas Fault in California is a famous one.
What is the opening that lava and ash come out of called?|hard|A vent|A fault|A glacier|A trench|The vent is often at the bottom of a bowl-shaped crater.
Which scale is used to measure how strong an earthquake is?|hard|The Richter scale|The Beaufort scale|The Celsius scale|The decibel scale|Today scientists mostly use a similar scale, called the moment magnitude scale.
What do we call a mountain that can erupt?|easy|A volcano|A glacier|A canyon|A valley|The word volcano comes from Vulcan, the Roman god of fire.
What is a very big, deep valley with steep sides called?|easy|A canyon|A cave|A crater|A beach|The Grand Canyon in the USA was carved by the Colorado River.
What do we call land with water all around it?|easy|An island|A valley|A desert|A canyon|Some islands, like Iceland and Hawaii, were made by volcanoes.
What is a very dry place with very little rain called?|easy|A desert|A rainforest|A swamp|A glacier|Deserts can be hot, like the Sahara, or cold, like Antarctica.
What is a big hollow in rock that leads under the ground called?|easy|A cave|A geyser|A crater|A delta|Many caves are carved out by water over thousands of years.
Which US state is a chain of islands made by volcanoes?|easy|Hawaii|Florida|California|Texas|The islands grew from volcanoes on the sea floor.
What is the imaginary line around the middle of the Earth called?|easy|The equator|The North Pole|The horizon|The Arctic Circle|It is hot all year round near the equator.
Where is the North Pole?|easy|At the very top of the Earth|In the middle of Africa|At the bottom of the Earth|In the Pacific Ocean|There is no land at the North Pole, just frozen sea.
Which continent is the South Pole on?|easy|Antarctica|Africa|Australia|South America|Antarctica is covered in ice that is kilometres thick.
How many oceans are there?|easy|5|3|7|10|The Pacific, Atlantic, Indian, Southern and Arctic Oceans.
What should you do indoors if there is an earthquake?|easy|Drop, cover and hold on under a strong table|Run outside|Stand next to a window|Climb onto the roof|Stay under cover until the shaking stops.
Which mountain range has Mount Everest in it?|easy|The Himalayas|The Alps|The Andes|The Rockies|The Himalayas are still growing a tiny bit each year, as two plates push together.
What is the tallest mountain in the UK?|easy|Ben Nevis|Snowdon|Scafell Pike|Mount Everest|It is in Scotland and is 1,345 metres high.
What do we call the very top of a mountain?|easy|The summit|The base|The valley|The cave|Climbers usually set off for the summit in the middle of the night.
What is lava like when it first comes out of a volcano?|easy|Red-hot and runny|Cold and hard|Blue and icy|Green and fizzy|As it cools down, it turns dark and hard.
Which of these is a fossil fuel?|hard|Coal|Wood|Wind|Sunlight|Coal was made from ancient plants, squashed underground for millions of years.
Which is the biggest island in the world?|hard|Greenland|Iceland|Madagascar|Great Britain|Australia is bigger, but it counts as a continent.
What do we call the wearing away of rock and soil by wind, water or ice?|hard|Erosion|Eruption|Evaporation|Excavation|Erosion carved out the Grand Canyon over millions of years.
Which layer of the Earth is the thinnest?|hard|The crust|The mantle|The outer core|The inner core|Compared with the whole Earth, the crust is as thin as the skin on an apple.
How can volcanoes help farmers?|hard|Volcanic ash makes very rich soil|They water the fields|They scare birds away|They keep the crops cool|That's why many people farm near volcanoes, even though it can be risky.
Which volcano buried the town of Pompeii?|hard|Mount Vesuvius|Mount Etna|Mount Fuji|Mount St Helens|Vesuvius is still active today, near the city of Naples.
Which volcano in the USA erupted in 1980 and blew its top off?|hard|Mount St Helens|Mauna Loa|Mount Rushmore|Mount Everest|The eruption made the mountain about 400 metres shorter.
Which volcanic island in Indonesia erupted with an enormous bang in 1883?|hard|Krakatoa|Vesuvius|Etna|Fuji|The bang was heard thousands of kilometres away.
What is the dark, shiny glass that forms when lava cools very quickly?|hard|Obsidian|Chalk|Limestone|Sandstone|Stone Age people chipped it into very sharp blades.
What is the layer of gases around the Earth called?|hard|The atmosphere|The mantle|The crust|The core|It gives us air to breathe and keeps us warm.
About how old is the Earth?|hard|About 4.5 billion years|About 6,000 years|About 1 million years|About 100,000 years|Scientists worked it out from the oldest rocks and meteorites.
What is the hardest natural material?|hard|Diamond|Gold|Chalk|Iron|Diamonds form deep under the ground, under enormous heat and pressure.
What is chalk mostly made of?|hard|The tiny shells of sea creatures|Melted rock|Sand|Ice|The White Cliffs of Dover are made of chalk.
What kind of rock is made from layers of sand, mud and shells pressed together?|hard|Sedimentary|Igneous|Metamorphic|Volcanic|Fossils are usually found in sedimentary rock.
What kind of rock is marble?|hard|Metamorphic|Igneous|Sedimentary|Volcanic|Marble is limestone that has been changed by heat and pressure.
About how many volcanoes on land could still erupt?|hard|About 1,350|About 10|About 100|About 1 million|Many more volcanoes are hidden under the sea.
Which is the longest mountain range on land?|hard|The Andes|The Alps|The Himalayas|The Pennines|The Andes run all the way down the west side of South America.
What does Iceland use the heat from under the ground for?|hard|Making electricity and heating homes|Making ice cream|Melting glaciers|Drying clothes|It is called geothermal energy.
What are the shaking waves sent out by an earthquake called?|hard|Seismic waves|Radio waves|Ocean waves|Microwaves|Machines called seismometers measure them.
`;

const GAME = {
  id: "volcanoesquiz", // localStorage key
  category: "know", // a CATEGORIES id in games/index.js
  title: "Earth and Volcanoes",
  items: RAW.trim().split("\n").map(line => {
    const [q, level, ...rest] = line.split("|");
    return { q, level, options: rest.slice(0, 4), fact: rest[4] };
  }),
};

if (typeof module !== "undefined") module.exports = GAME;
