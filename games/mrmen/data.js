// Mr. Men and Little Miss. Line order = card order, and saved progress is stored by position,
// so add new characters at the end.
// Format per line: Name|clue   (the clue says what they are like, without the word in their name)
// "Mr." or "Little Miss" can be left out when typing, if the last word belongs to one character only.
const RAW = `
Mr. Tickle|Has extraordinarily long arms and loves to tickle
Mr. Greedy|Eats far, far too much food
Mr. Happy|Always has a great big smile
Mr. Nosey|Has a long nose and pokes it into everyone's business
Mr. Sneeze|Atishoo! He can't stop
Mr. Bump|Always crashing into things, covered in bandages
Mr. Snow|A snowman who helps Father Christmas
Mr. Messy|Never tidies up, and his house is a muddle
Mr. Topsy-Turvy|Does everything upside down and back to front
Mr. Silly|Has the daftest ideas
Mr. Uppity|Very rich and very rude
Mr. Small|Not much bigger than a beetle
Mr. Daydream|Always dreaming about faraway adventures
Mr. Forgetful|Can never remember anything
Mr. Jelly|Scared of absolutely everything
Mr. Noisy|SO LOUD that everyone covers their ears
Mr. Lazy|Would rather stay in bed all day
Mr. Funny|Pulls faces that make everyone laugh
Mr. Mean|Never wants to share or spend his money
Mr. Chatterbox|Talks and talks and never stops
Mr. Fussy|Everything has to be just perfect, or else!
Mr. Bounce|Bounces about like a rubber ball
Mr. Muddle|Mixes everything up
Mr. Dizzy|Gets in a spin whenever he tries to think
Mr. Impossible|Can do things that nobody else can do
Mr. Strong|The strongest person in the world, thanks to eggs
Mr. Grumpy|Always cross and in a bad mood
Mr. Clever|Thinks he knows everything
Mr. Mischief|Loves playing tricks
Mr. Busy|Rushing about, always got something to do
Mr. Slow|Talks... very... very... slowly
Mr. Brave|Never scared to help someone in trouble
Mr. Grumble|Moans about everything and says "Bah!"
Mr. Perfect|Never does anything wrong
Mr. Cheerful|Always looking on the bright side
Mr. Cool|Wears sunglasses and is very calm
Mr. Rush|Always in a hurry
Mr. Tall|Has the longest legs you ever saw
Mr. Worry|Frets about every little thing
Mr. Nonsense|Says things that make no sense at all
Mr. Wrong|Gets everything the wrong way
Mr. Skinny|As thin as a pencil
Mr. Clumsy|Breaks everything he touches
Mr. Quiet|So shy he only speaks in a whisper
Mr. Rude|Has terrible manners
Mr. Good|Always does the right thing
Mr. Nobody|So faint you can hardly see him
Little Miss Bossy|Always telling everyone what to do
Little Miss Naughty|Gets up to mischief and pranks
Little Miss Neat|Keeps everything spick and span
Little Miss Sunshine|Always happy, and makes others happy too
Little Miss Tiny|So small she lives in a mousehole
Little Miss Trouble|Gets other people told off for things they didn't do
Little Miss Helpful|Tries to help, but makes things worse
Little Miss Magic|Can cast spells
Little Miss Shy|Hides away and goes red when people talk to her
Little Miss Splendid|Very grand, and wears fancy hats
Little Miss Late|Never on time for anything
Little Miss Scatterbrain|Forgets things and gets in a muddle
Little Miss Twins|There are two of her!
Little Miss Star|Wants to be famous
Little Miss Fun|Loves parties and games
Little Miss Busy|Never stops working, always on the go
Little Miss Chatterbox|Can't stop talking
Little Miss Giggles|Can't stop laughing
Little Miss Hug|Loves to squeeze everyone tight
Little Miss Princess|Has a crown and lives in a palace
Little Miss Stubborn|Will never change her mind
Little Miss Curious|Always asking questions
Little Miss Quick|Does everything in a flash
Little Miss Wise|Knows a lot, and gives good advice
Little Miss Brainy|The cleverest of them all
Little Miss Lucky|Good things always happen to her
Little Miss Greedy|Eats everything in sight
Little Miss Somersault|Loves doing flips and cartwheels
Little Miss Contrary|Says the opposite of what she means
Little Miss Whoops|Always having accidents
Little Miss Fickle|Can't make up her mind
Little Miss Tidy|Puts everything away, sometimes too well
Little Miss Dotty|Does the strangest things
Little Miss Inventor|Builds amazing machines
`;

const kindOf = name => name.startsWith("Mr.") ? "mr" : "miss";
const lastWord = name => name.replace(/^(Mr\.|Little Miss) /, "");

const CHARACTERS = RAW.trim().split("\n").map(line => {
  const [name, clue] = line.split("|");
  return { name, kind: kindOf(name), clue };
});
// "Tickle" for Mr. Tickle, but not "Busy": Mr. Busy and Little Miss Busy share it.
const count = {};
for (const c of CHARACTERS) count[lastWord(c.name)] = (count[lastWord(c.name)] || 0) + 1;
for (const c of CHARACTERS) if (count[lastWord(c.name)] === 1) c.aliases = [lastWord(c.name)];

const GAME = {
  id: "mrmenquiz", // localStorage key
  category: "characters", // a CATEGORIES id in games/index.js
  title: "Guess the Mr. Men & Little Miss!",
  placeholder: "Type a name…",
  noun: "character", nouns: "characters", verb: "found",
  cheers: ["Brilliant!", "Splendid!", "Hooray!", "Super!", "You got it!", "How clever!"],
  items: CHARACTERS,
  doneStyle: c => `--c1:var(--${c.kind})`,
  filters: [
    { label: "Mr. Men", color: "var(--mr)", test: c => c.kind === "mr" },
    { label: "Little Miss", color: "var(--miss)", test: c => c.kind === "miss" },
  ],
  // chip() comes from the engine; these only run once the page has loaded it
  hints: [
    { id: "clue", label: "💡 Clue", title: "Reveal what they're like", reveal: c => chip(c.clue, `var(--${c.kind})`) },
    { id: "start", label: "🔤 Start", title: "Reveal the first letter", reveal: c => chip(c.name.replace(/^(Mr\.|Little Miss) (.).*/, "$1 $2…")) },
  ],
};

if (typeof module !== "undefined") module.exports = GAME;
