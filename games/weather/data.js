// Weather questions. Line order = question order, and saved progress is stored by position, so add new questions at the end.
// Format per line: Question|level|Right answer|Wrong answer|Wrong answer|Wrong answer|Fact shown afterwards
// level: easy or hard. The engine shuffles the answers, so the right one is always written first here.
const RAW = `
What are clouds made of?|easy|Tiny drops of water or ice|Cotton wool|Smoke|Sand|A single cloud can weigh as much as lots of elephants.
What do we call balls of ice that fall from the sky?|easy|Hail|Snow|Sleet|Fog|Hailstones can be bigger than a golf ball!
What can you see in the sky when the Sun shines while it is raining?|easy|A rainbow|Lightning|A tornado|A comet|Stand with the Sun behind you to see it.
How many colours are usually named in a rainbow?|easy|7|5|3|10|Red, orange, yellow, green, blue, indigo and violet.
In a thunderstorm, which do you notice first?|easy|The flash of lightning|The rumble of thunder|They always arrive together|The rain stopping|Light travels much faster than sound, so you see the flash first.
What is a spinning funnel of wind that reaches down to the ground?|easy|A tornado|A rainbow|A blizzard|A drought|Tornadoes have the fastest winds on Earth.
What is a big snowstorm with strong winds called?|easy|A blizzard|A drizzle|A heatwave|A drought|In a blizzard it can be hard to see anything at all.
What do we call a long time with little or no rain?|easy|A drought|A flood|A breeze|A blizzard|In a drought, rivers can dry up and plants wilt.
What do we use to measure temperature?|easy|A thermometer|A ruler|A clock|A compass|Temperature is measured in degrees, like °C.
A light, gentle wind is called a...|easy|Breeze|Gale|Hurricane|Tornado|A gale is a very strong wind.
What do we call a cloud that is down at ground level?|easy|Fog|Hail|Frost|Sleet|Fog can make it hard to see very far.
What are the four seasons?|easy|Spring, summer, autumn, winter|Monday, Tuesday, Wednesday, Thursday|Rain, snow, wind, sun|Morning, noon, evening, night|In autumn, many trees lose their leaves.
What is the white, icy coating on grass on a cold morning?|easy|Frost|Dew|Hail|Mist|When it isn't cold enough for frost, you get drops of water called dew.
At what temperature does water freeze?|easy|0 °C|10 °C|100 °C|50 °C|Water boils at 100 °C.
Which season is the coldest?|easy|Winter|Summer|Spring|Autumn|In the south of the world, winter comes in June, July and August!
What does a weather vane show?|hard|Which way the wind is blowing|How hot it is|How much rain has fallen|What time it is|Many weather vanes are shaped like a cockerel.
What is a scientist who studies the weather called?|hard|A meteorologist|A geologist|An astronomer|A biologist|They use computers and satellites to forecast the weather.
What measures how much rain has fallen?|hard|A rain gauge|A thermometer|A barometer|An anemometer|You can make one with a plastic bottle and a ruler.
What measures how fast the wind is blowing?|hard|An anemometer|A thermometer|A barometer|A rain gauge|Most have little cups that spin round in the wind.
What measures air pressure, to help forecast the weather?|hard|A barometer|A thermometer|An anemometer|A telescope|Falling air pressure often means rain is on the way.
Which scale describes how strong the wind is, from 0 (calm) to 12?|hard|The Beaufort scale|The Richter scale|The Celsius scale|The pH scale|12 on the Beaufort scale is hurricane force.
What are huge spinning storms over the warm Atlantic Ocean called?|hard|Hurricanes|Blizzards|Tsunamis|Droughts|In the Pacific near Asia, the same storms are called typhoons.
What is the calm middle of a hurricane called?|hard|The eye|The heart|The nose|The tail|The strongest winds spin all around the eye.
What makes the sound of thunder?|hard|Lightning heating the air so fast that it bangs|Clouds bumping together|Rain hitting the ground|Wind blowing over mountains|Lightning can be about five times hotter than the surface of the Sun.
What is it called when water warms up and turns into vapour?|hard|Evaporation|Condensation|Precipitation|Hibernation|It is the first step of the water cycle.
What is it called when water vapour cools and turns into tiny drops, making clouds?|hard|Condensation|Evaporation|Erosion|Migration|You see it when your breath fogs up a cold window.
What is the word for rain, snow, sleet and hail?|hard|Precipitation|Evaporation|Pollution|Translation|Precipitation is any water that falls from the clouds.
Which is the coldest continent?|hard|Antarctica|Asia|Europe|North America|The coldest temperature ever measured on Earth was -89.2 °C, in Antarctica.
What are the huge, tall clouds that bring thunderstorms called?|hard|Cumulonimbus|Cirrus|Stratus|Contrails|They can tower higher than Mount Everest.
What are the thin, wispy clouds high up in the sky called?|hard|Cirrus|Cumulus|Stratus|Nimbus|They are so high and cold that they are made of ice crystals.
What makes the wind blow?|hard|Air moving from where it is warm to where it is cool|Trees waving their branches|The Moon pulling the air|Birds flapping their wings|The Sun heats some places more than others, so the air moves around.
What is a monsoon?|hard|A season of very heavy rain|A snowstorm|A desert wind|A giant wave|Countries such as India get most of their rain in the monsoon.
What causes the colourful Northern Lights?|hard|Tiny bits from the Sun hitting the air|Rainbows at night|Moonlight on snow|Lightning far away|They are also called the aurora borealis.
What do we call light rain falling in very tiny drops?|easy|Drizzle|A blizzard|A hurricane|A drought|Drizzle drops are smaller than half a millimetre.
What is a weather forecast?|easy|What the weather is expected to be like|A list of last year's weather|A kind of cloud|A storm siren|Forecasters use computers, satellites and weather stations.
What is useful to have on a rainy day?|easy|An umbrella|Sunglasses|Sun cream|A sledge|Umbrellas have been used for thousands of years, first as shade from the Sun.
What gives us heat and light during the day?|easy|The Sun|The Moon|The clouds|The wind|Without the Sun, Earth would be frozen and dark.
What can too much rain cause?|easy|A flood|A drought|A heatwave|An earthquake|Floods happen when rivers overflow their banks.
What is a long spell of very hot weather called?|easy|A heatwave|A cold snap|A blizzard|A breeze|In a heatwave, drink lots of water and stay in the shade.
What should you wear on a sunny summer day?|easy|Sun cream and a hat|A woolly scarf|Snow boots|A thick coat|Sun cream protects your skin from burning.
Which season comes after summer?|easy|Autumn|Spring|Winter|Monsoon|In North America, autumn is called fall.
What is snow made of?|easy|Ice crystals|Frozen milk|Tiny feathers|Cotton|Snowflakes almost always have six sides.
What is it called when rain and snow fall together?|easy|Sleet|Hail|Fog|Dew|Sleet is wet and slushy.
Is it safe to shelter under a tree in a thunderstorm?|easy|No, lightning often strikes tall things|Yes, trees stop lightning|Yes, if it is a big tree|Only in summer|Go indoors, or into a car, if you can.
What are the water drops on grass on a cool morning called?|easy|Dew|Frost|Hail|Sleet|Dew forms when the air cools down in the night.
Why can you see your breath on a cold day?|easy|Your warm, wet breath turns into tiny water drops|You breathe out smoke|Your lungs are freezing|It is magic|It is the same thing that makes clouds: condensation.
What is it called when animals sleep through the winter?|easy|Hibernation|Migration|Evaporation|Hydration|Hedgehogs and dormice hibernate.
What is it called when birds fly to warmer places for the winter?|easy|Migration|Hibernation|Condensation|Erosion|Swallows fly all the way from Britain to Africa.
Which word in a cloud's name means that it brings rain?|hard|Nimbus|Cirrus|Cumulus|Stratus|So nimbostratus clouds bring steady rain.
What are flat, grey layers of cloud that cover the whole sky called?|hard|Stratus|Cirrus|Cumulus|Cumulonimbus|Stratus comes from a Latin word meaning spread out.
What are the fluffy white clouds of a fine day called?|hard|Cumulus|Cirrus|Stratus|Nimbostratus|Cumulus means heap in Latin.
What is the white line a plane sometimes leaves across the sky called?|hard|A contrail|A cirrus|A rainbow|A comet|It is made of ice crystals that form from the engine's hot, wet gases.
What is the hottest temperature ever measured in the UK?|hard|40.3 °C|25 °C|55 °C|32 °C|It was measured in Lincolnshire in July 2022.
What is climate?|hard|The usual weather of a place over many years|The weather today|A type of cloud|A weather instrument|Weather changes every day, but climate is the pattern over a long time.
What is global warming?|hard|The Earth's air and seas slowly getting warmer|The Sun moving closer|Summers getting shorter|Snow getting warmer|Burning coal, oil and gas adds gases that trap heat.
What are the gases that trap heat around the Earth like a blanket called?|hard|Greenhouse gases|Laughing gases|Noble gases|Cooking gases|Carbon dioxide is one of them.
What is lightning?|hard|A giant spark of electricity|A ray of sunlight|Burning gas|A shooting star|It can jump from a cloud to the ground, or between clouds.
How can you tell how far away a thunderstorm is?|hard|Count the seconds between the lightning and the thunder|Measure the rain|Look at the colour of the clouds|Listen to the wind|Every 3 seconds is about 1 kilometre.
What is humidity?|hard|How much water vapour is in the air|How windy it is|How cold it is|How cloudy it is|High humidity makes hot days feel sticky.
Which is warmer, the North Pole or the South Pole?|hard|The North Pole|The South Pole|They are exactly the same|Neither ever gets sunlight|The South Pole is on high, icy land, so it is much colder.
What is a tornado over water called?|hard|A waterspout|A whirlpool|A geyser|A tsunami|Waterspouts can suck up water and even fish!
What is a weather satellite?|hard|A machine in space that takes pictures of the clouds|A cloud that goes round the Earth|A kind of weather vane|A storm on another planet|Satellites help forecasters see storms coming.
On a weather map, what is the line where warm air and cold air meet?|hard|A front|A border|An edge|A wall|A cold front often brings showers.
In the USA, temperature is often measured in...|hard|Fahrenheit|Celsius|Metres|Kilograms|Water freezes at 32 °F.
Which colour is on the outside of a rainbow's arch?|hard|Red|Violet|Green|Blue|Violet is on the inside.
Why is the sky blue?|hard|The air scatters blue sunlight the most|The sea reflects onto it|Space is blue|Clouds are blue inside|At sunset the light travels through more air, so we see more red and orange.
How is a rainbow made?|hard|Sunlight is split into colours by raindrops|Coloured gas in the sky|Paint in the clouds|Light from the Moon|Each raindrop acts like a tiny prism.
`;

const GAME = {
  id: "weatherquiz", // localStorage key
  category: "know", // a CATEGORIES id in games/index.js
  title: "Weather",
  items: RAW.trim().split("\n").map(line => {
    const [q, level, ...rest] = line.split("|");
    return { q, level, options: rest.slice(0, 4), fact: rest[4] };
  }),
};

if (typeof module !== "undefined") module.exports = GAME;
