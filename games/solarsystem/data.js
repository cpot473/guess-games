// Solar System questions. Line order = question order, and saved progress is stored by position, so add new questions at the end.
// Format per line: Question|level|Right answer|Wrong answer|Wrong answer|Wrong answer|Fact shown afterwards
// level: easy or hard. The engine shuffles the answers, so the right one is always written first here.
const RAW = `
What is at the centre of our solar system?|easy|The Sun|The Earth|The Moon|Jupiter|All the planets travel round the Sun.
How many planets are in our solar system?|easy|8|9|7|10|Pluto used to be called the ninth planet, but since 2006 it has been called a dwarf planet.
Which planet do we live on?|easy|Earth|Mars|Venus|Saturn|Earth is the third planet from the Sun.
Which planet is closest to the Sun?|easy|Mercury|Venus|Earth|Mars|Mercury is also the smallest planet.
Which planet is called the Red Planet?|easy|Mars|Jupiter|Venus|Neptune|Mars looks red because its dust is full of rusty iron.
Which is the biggest planet?|easy|Jupiter|Saturn|Earth|Neptune|More than 1,000 Earths could fit inside Jupiter.
Which planet is famous for its bright rings?|easy|Saturn|Mars|Mercury|Venus|Saturn's rings are made of billions of chunks of ice and rock.
What is the Sun?|easy|A star|A planet|A moon|A comet|The Sun is the closest star to Earth.
How long does it take Earth to travel once round the Sun?|easy|One year|One day|One week|One month|That's about 365 days.
How long does it take Earth to spin round once?|easy|One day|One year|One hour|One month|When your side of Earth faces the Sun, it's daytime.
How many moons does Earth have?|easy|1|2|0|4|Some planets have lots: Saturn has more than 270!
Who was the first person to walk on the Moon?|easy|Neil Armstrong|Buzz Aldrin|Tim Peake|Yuri Gagarin|He stepped onto the Moon in 1969, and Buzz Aldrin followed him soon after.
Which planet is the hottest?|easy|Venus|Mercury|Mars|Jupiter|Venus's thick clouds trap the heat, so it is even hotter than Mercury.
What are shooting stars really?|easy|Bits of space rock burning up in the air|Stars falling down|Fireworks|Planets moving|They are called meteors.
What do astronauts wear to go outside in space?|easy|A spacesuit|A raincoat|A swimsuit|A wetsuit|It gives them air to breathe and keeps them safe.
Which planet is the farthest from the Sun?|easy|Neptune|Uranus|Saturn|Mars|Pluto is even farther away, but it is a dwarf planet.
Why does the Moon shine?|easy|It reflects light from the Sun|It is on fire|It is made of light|It has lamps on it|The Moon makes no light of its own.
What is our galaxy called?|easy|The Milky Way|Andromeda|The Big Dipper|The Starry Road|Our galaxy has hundreds of billions of stars.
What is the Moon's surface covered in?|easy|Craters and dust|Grass|Water|Sand dunes|The craters were made by space rocks crashing into it.
Which planet spins on its side?|hard|Uranus|Neptune|Mars|Venus|It may have been knocked over by a huge crash long ago.
How long does sunlight take to reach Earth?|hard|About 8 minutes|About 8 seconds|About 8 hours|About 8 days|Light is the fastest thing there is, but the Sun is very far away.
What is the biggest moon in the solar system?|hard|Ganymede|Titan|The Moon|Europa|It goes round Jupiter, and it is bigger than the planet Mercury.
What is the Great Red Spot on Jupiter?|hard|A giant storm|A volcano|A lake|A crater|It is wider than Earth and has been raging for more than 150 years.
Which dwarf planet used to be called the ninth planet?|hard|Pluto|Ceres|Eris|Titan|Pluto has five moons. The biggest is Charon.
Where is the asteroid belt?|hard|Between Mars and Jupiter|Between Earth and Mars|Between Venus and Earth|Inside the Sun|Ceres, a dwarf planet, is the biggest thing in it.
What is a comet mostly made of?|hard|Ice and dust|Fire|Metal|Glass|Near the Sun, the ice turns to gas and makes a long, glowing tail.
Which planet has the most moons found so far?|hard|Saturn|Jupiter|Earth|Mars|Saturn has more than 270 known moons.
What is the Sun mostly made of?|hard|Hydrogen gas|Rock|Iron|Water|The Sun is mostly hydrogen and helium.
Which planet has the fastest winds?|hard|Neptune|Earth|Mercury|Mars|Winds on Neptune can blow at over 2,000 km/h.
Why does Earth have seasons?|hard|Earth is tilted|Earth gets closer to the Sun in summer|The Sun gets hotter in summer|The Moon blocks the Sun in winter|When your half of Earth tilts towards the Sun, you have summer.
What is it called when the Moon blocks out the Sun?|hard|A solar eclipse|A lunar eclipse|A meteor shower|A full moon|Never look straight at the Sun, even during an eclipse!
Who was the first person to travel into space?|hard|Yuri Gagarin|Neil Armstrong|Tim Peake|Buzz Aldrin|He went round the Earth in 1961.
What is the name of the space station where astronauts live and work?|hard|The International Space Station|Moon Base One|Space Camp|The Star Hotel|It goes round Earth about every 90 minutes.
What is a light year?|hard|How far light travels in a year|A year on another planet|A very short year|A year with lots of sunshine|One light year is about 9.5 trillion kilometres.
About how many Earths could fit inside the Sun?|hard|About 1 million|About 100|About 1,000|About 10|The Sun is enormous: more than a million Earths would fit inside it.
How long is a year on Mercury?|hard|88 Earth days|365 Earth days|10 Earth days|1,000 Earth days|Mercury is so close to the Sun that it zooms round very quickly.
Which planet is called Earth's twin, because it is nearly the same size?|hard|Venus|Mars|Mercury|Neptune|But Venus is far too hot for anything to live there.
What shape are the planets?|easy|Round, like a ball|Flat, like a plate|Square, like a box|Shaped like a star|Gravity pulls big things into a ball shape.
What do we call the Moon when we can see all of it lit up?|easy|A full moon|A new moon|A half moon|A blue moon cake|It takes about a month to go from one full moon to the next.
What is the force that keeps the planets going round the Sun?|easy|Gravity|Magnetism|Wind|Electricity|Gravity is also what keeps your feet on the ground.
What do we call a person who travels into space?|easy|An astronaut|An archaeologist|A meteorologist|A plumber|Russian astronauts are called cosmonauts.
What do we call a group of stars that makes a picture in the sky?|easy|A constellation|A galaxy|A planet|A comet|The Plough is part of a constellation called the Great Bear.
Which planet can often be seen shining brightly just after sunset or before sunrise?|easy|Venus|Neptune|Uranus|Pluto|It is sometimes called the Morning Star or the Evening Star, but it is a planet.
What is a rocket used for?|easy|Carrying things into space|Digging tunnels|Sailing across the sea|Cooking food|Rockets burn fuel to push themselves up very fast.
What is a moon?|easy|Something that travels round a planet|A small star|A hole in space|A kind of comet|Mercury and Venus are the only planets with no moons.
What does a telescope do?|easy|Makes faraway things look closer|Makes things heavier|Tells the time|Measures rain|Galileo used one to discover four of Jupiter's moons in 1610.
About how long does the Moon take to go round the Earth?|easy|About a month|About a day|About a year|About an hour|The word month comes from the word moon.
Why can't we breathe on the Moon?|easy|There is no air|It is too windy|The air is full of smoke|It is too wet|Astronauts take their air with them.
Can you hear sounds in space?|easy|No, there is no air to carry them|Yes, it is very loud|Yes, but only music|Yes, but only quietly|Astronauts use radios to talk to each other.
Which planet is named after the Roman god of war?|hard|Mars|Jupiter|Venus|Mercury|The month of March is named after him too.
Which planet is named after the king of the Roman gods?|hard|Jupiter|Saturn|Mars|Neptune|The Greeks called him Zeus.
Which planet is named after the Roman goddess of love?|hard|Venus|Mars|Mercury|Saturn|Venus is the only planet named after a goddess.
Which planet is named after the Roman god of the sea?|hard|Neptune|Mars|Saturn|Uranus|It is a deep blue colour, like the sea.
After the Sun, which is the closest star to Earth?|hard|Proxima Centauri|Sirius|The North Star|Betelgeuse|Its light takes more than 4 years to reach us.
Which space telescope, launched in 2021, can see very faraway galaxies?|hard|The James Webb Space Telescope|The Big Eye|The Star Spotter|The Moon Mirror|It sees heat (infrared light) that our eyes can't see.
About how old is the Sun?|hard|About 4.6 billion years|About 2,000 years|About 1 million years|About 100 years|It is about halfway through its life.
What do we call the path a planet takes round the Sun?|hard|Its orbit|Its axis|Its crater|Its ring|Earth's orbit is almost a circle.
What is the imaginary line that a planet spins around called?|hard|Its axis|Its orbit|Its equator|Its tail|Earth's axis is tilted, and that gives us seasons.
Which planet is so light for its size that it would float in a giant bath?|hard|Saturn|Jupiter|Earth|Mars|It is made mostly of light gases.
Which mission first landed people on the Moon?|hard|Apollo 11|Voyager 1|Sputnik 1|Discovery|The astronauts landed in a part of the spacecraft called the Eagle.
Which spacecraft has travelled farther from Earth than any other?|hard|Voyager 1|Apollo 11|The International Space Station|Sputnik 1|It was launched in 1977 and is now out beyond the planets, between the stars.
What was the first satellite ever sent into space?|hard|Sputnik 1|Voyager 1|Apollo 11|The Hubble Space Telescope|It was launched by the Soviet Union in 1957.
How much would you weigh on the Moon, compared with on Earth?|hard|About a sixth|Twice as much|The same|Ten times as much|The Moon's gravity is much weaker than Earth's, so you could jump very high.
How many moons does Mars have?|hard|2|0|1|10|They are called Phobos and Deimos.
Which planet has a day that is longer than its year?|hard|Venus|Mars|Earth|Jupiter|Venus spins so slowly that one turn takes 243 Earth days, but its year is only 225.
Which planet has the biggest volcano in the solar system?|hard|Mars|Venus|Earth|Mercury|It is called Olympus Mons, and it is about two and a half times as tall as Everest.
What is a black hole?|hard|A place where gravity is so strong that not even light can escape|A hole in the Moon|A dark planet|A tunnel through the Earth|Some black holes are millions of times heavier than the Sun.
What is a meteorite?|hard|A space rock that lands on Earth|A small planet|A star that has gone out|A kind of telescope|Most space rocks burn up in the air before they reach the ground.
What do we call the two days a year when day and night are about the same length?|hard|The equinoxes|The solstices|The eclipses|The leap days|They happen in March and September.
What is the longest day of the year called?|hard|The summer solstice|The winter solstice|The equinox|Leap day|In Britain it is on about 21 June.
Why do we have a leap year every four years?|hard|A year is about 365 and a quarter days long|The Moon slows down|To give us an extra holiday|The Sun gets tired|In a leap year, February has 29 days.
About how hot is the surface of the Sun?|hard|About 5,500 °C|About 100 °C|About 500 °C|About 50 °C|The centre of the Sun is even hotter: about 15 million °C.
Which planet did William Herschel discover with his telescope in 1781?|hard|Uranus|Mars|Venus|Jupiter|He spotted it from his garden in Bath, England.
What is a planet that goes round a different star called?|hard|An exoplanet|A dwarf planet|A moon|A comet|Scientists have found more than 5,000 of them.
`;

const GAME = {
  id: "solarsystemquiz", // localStorage key
  category: "know", // a CATEGORIES id in games/index.js
  title: "Solar System",
  items: RAW.trim().split("\n").map(line => {
    const [q, level, ...rest] = line.split("|");
    return { q, level, options: rest.slice(0, 4), fact: rest[4] };
  }),
};

if (typeof module !== "undefined") module.exports = GAME;
