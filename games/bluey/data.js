// Bluey characters. Line order = card order, and saved progress is stored by position,
// so add new characters at the end.
// Format per line: Name|group|breed|who|alias,alias
// group: family, neighbours, school, kindy, grown-ups or others
// Aliases are what a child might type instead of the full name; each must fit one character only
// (so not "Mum", "Dad" or "Grandpa").
const RAW = `
Bluey Heeler|family|Blue Heeler|Six-year-old big sister|Bluey
Bingo Heeler|family|Red Heeler|Bluey's little sister|Bingo
Bandit Heeler|family|Blue Heeler|Dad, an archaeologist|Bandit
Chilli Heeler|family|Red Heeler|Mum, works at the airport|Chilli
Muffin Heeler|family|White Heeler|Bluey's cousin, Socks's big sister|Muffin
Socks Heeler|family|Blue Heeler|Bluey's cousin, Muffin's little sister|Socks
Stripe Heeler|family|Blue Heeler|Bluey's uncle, Muffin and Socks's dad|Stripe
Trixie Heeler|family|White Heeler|Bluey's aunt, Muffin and Socks's mum|Trixie
Radley Heeler|family|Red and Blue Heeler mix|Bluey's uncle, Bandit's brother|Radley,Uncle Rad,Rad
Frisky Heeler|family|English Cocker Spaniel|Bluey's godmother, Radley's wife|Frisky
Chris Heeler|family|Blue Heeler|Bluey's Nana, Bandit's mum|Nana
Bob Heeler|family|White Heeler|Bluey's Grandpa, Bandit's dad|Bob,Bobba
Mort Cattle|family|Red Heeler|Bluey's Grandad, Chilli's dad|Mort,Grandad
Brandy Cattle|family|Red Heeler|Chilli's big sister|Brandy
Pat|neighbours|Labrador|Lucky's dad|Lucky's Dad
Janelle|neighbours|Labrador|Lucky's mum|Lucky's Mum
Lucky|neighbours|Labrador|The boy next door
Chucky|neighbours|Labrador|Lucky's little brother
Wendy|neighbours|Chow Chow|Judo's mum
Judo|neighbours|Chow Chow|Neighbour and friend of Bluey and Bingo
Doreen|neighbours|Pyrenean Mountain Dog|Elderly neighbour
Mackenzie|school|Border Collie|Bluey's friend from New Zealand
Rusty|school|Australian Kelpie|Bluey's friend, Jack's best friend
Chloe|school|Dalmatian|Bluey's best friend
Honey|school|Beagle|Bluey's friend
Coco|school|Poodle|Indy's best friend
Snickers|school|Dachshund|Bluey's friend
Indy|school|Afghan Hound|Bluey's friend, Coco's best friend
Jack|school|Jack Russell Terrier|New kid, Rusty's best friend|Jack Russell
Winton|school|English Bulldog|Bluey's friend
The Terriers|school|Miniature Schnauzer|Triplet brothers|Terriers
Pretzel|school|Chihuahua|Bluey's classmate
Lulu|school|Jack Russell Terrier|Jack's little sister|Lulu Russell
Dusty|school|Australian Kelpie|Rusty's little sister
Digger|school|Australian Kelpie|Rusty's teenage big brother
Winnie|school|Chocolate Labrador|Met Bluey playing Café
Jean-Luc|school|Black Labrador|Canadian friend from the camping trip|Jean Luc
Captain Hound|school|American Foxhound|Mackenzie's big buddy|Captain
Mia Setter|school|English Setter|Bluey's big buddy|Mia
Tiny C.|school|Great Dane|Teenage cricketer|Tiny
Pom Pom|school|Pomeranian|Friend of Bluey and Bingo
Dougie|school|Cavapoo|Friend who uses Auslan
Lila|kindy|Maltese|Bingo's best friend
Missy|kindy|Australian Terrier|Bingo's friend
Buddy|kindy|Pug|Bingo's friend
Juniper|kindy|Shiba Inu|Bingo's friend
Bentley|kindy|Cavalier King Charles Spaniel|Zara's twin
Zara|kindy|Cavalier King Charles Spaniel|Bentley's twin
Calypso|grown-ups|Australian Shepherd|Bluey's teacher
Mrs Retriever|grown-ups|Golden Retriever|Bingo's kindy teacher|Mrs. Retriever
Frank|grown-ups|Dalmatian|Chloe's dad
Marcus|grown-ups|Beagle|Honey's dad, an archaeologist
Bella|grown-ups|Poodle|Coco's mum, Chilli's friend
Cornelius|grown-ups|English Bulldog|Winton's dad
Fido|grown-ups|Chocolate Labrador|Winnie's dad, Bandit's friend
Maynard|grown-ups|Irish Wolfhound|Mort's eccentric neighbour
Busker|grown-ups|Irish Terrier|Street musician
Postie|grown-ups|Catahoula Leopard Dog|Delivers the post
Alfie|grown-ups|Dingo|Toy shop assistant
Chippy|grown-ups|Afghan Hound|Apprentice carpenter
Cherry|grown-ups|Saluki|Chippy's girlfriend
Sparky|grown-ups|Pit bull|Lead builder
Bucky Dunstan|grown-ups|Toy Fox Terrier|Real estate agent|Bucky
Jeremy|others|Garden gnome|Gnome in the garden
Major Tom|others|Brown Icelandic horse|One of the few non-dogs
`;

const CHARACTERS = RAW.trim().split("\n").map(line => {
  const [name, group, breed, who, aliases] = line.split("|");
  return { name, group, breed, who, aliases: aliases ? aliases.split(",") : undefined };
});

const GROUPS = ["family", "neighbours", "school", "kindy", "grown-ups", "others"];

const GAME = {
  id: "blueyquiz", // localStorage key
  category: "characters", // a CATEGORIES id in games/index.js
  title: "Guess Bluey!",
  placeholder: "Type a name…",
  noun: "character", nouns: "characters", verb: "found",
  cheers: ["Wackadoo!", "Hooray!", "Real life!", "Brilliant!", "Let's play!", "Nice one!"],
  items: CHARACTERS,
  doneStyle: c => `--c1:var(--${c.group})`,
  filters: GROUPS.map(g => ({ label: g, color: `var(--${g})`, test: c => c.group === g })),
  // chip() comes from the engine; these only run once the page has loaded it
  hints: [
    { id: "breed", label: "🐕 Breed", title: "Reveal the breed", reveal: c => chip(c.breed, `var(--${c.group})`) },
    { id: "who", label: "👪 Who", title: "Reveal who they are", reveal: c => chip(c.who) },
  ],
};

if (typeof module !== "undefined") module.exports = GAME;
