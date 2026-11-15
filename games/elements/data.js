// The 118 chemical elements, in atomic-number order: line order = card order = atomic number, and saved
// progress is stored by position. Names use British spellings; the American ones are aliases.
// Format per line: Symbol|Name|category|state|alias,alias
// state is at room temperature; "not known" is for elements too rare or unstable to measure.
const RAW = `
H|Hydrogen|nonmetal|gas
He|Helium|noble|gas
Li|Lithium|alkali|solid
Be|Beryllium|alkaline|solid
B|Boron|metalloid|solid
C|Carbon|nonmetal|solid
N|Nitrogen|nonmetal|gas
O|Oxygen|nonmetal|gas
F|Fluorine|halogen|gas
Ne|Neon|noble|gas
Na|Sodium|alkali|solid
Mg|Magnesium|alkaline|solid
Al|Aluminium|post|solid|Aluminum
Si|Silicon|metalloid|solid
P|Phosphorus|nonmetal|solid
S|Sulphur|nonmetal|solid|Sulfur
Cl|Chlorine|halogen|gas
Ar|Argon|noble|gas
K|Potassium|alkali|solid
Ca|Calcium|alkaline|solid
Sc|Scandium|transition|solid
Ti|Titanium|transition|solid
V|Vanadium|transition|solid
Cr|Chromium|transition|solid
Mn|Manganese|transition|solid
Fe|Iron|transition|solid
Co|Cobalt|transition|solid
Ni|Nickel|transition|solid
Cu|Copper|transition|solid
Zn|Zinc|transition|solid
Ga|Gallium|post|solid
Ge|Germanium|metalloid|solid
As|Arsenic|metalloid|solid
Se|Selenium|nonmetal|solid
Br|Bromine|halogen|liquid
Kr|Krypton|noble|gas
Rb|Rubidium|alkali|solid
Sr|Strontium|alkaline|solid
Y|Yttrium|transition|solid
Zr|Zirconium|transition|solid
Nb|Niobium|transition|solid
Mo|Molybdenum|transition|solid
Tc|Technetium|transition|solid
Ru|Ruthenium|transition|solid
Rh|Rhodium|transition|solid
Pd|Palladium|transition|solid
Ag|Silver|transition|solid
Cd|Cadmium|transition|solid
In|Indium|post|solid
Sn|Tin|post|solid
Sb|Antimony|metalloid|solid
Te|Tellurium|metalloid|solid
I|Iodine|halogen|solid
Xe|Xenon|noble|gas
Cs|Caesium|alkali|solid|Cesium
Ba|Barium|alkaline|solid
La|Lanthanum|lanthanide|solid
Ce|Cerium|lanthanide|solid
Pr|Praseodymium|lanthanide|solid
Nd|Neodymium|lanthanide|solid
Pm|Promethium|lanthanide|solid
Sm|Samarium|lanthanide|solid
Eu|Europium|lanthanide|solid
Gd|Gadolinium|lanthanide|solid
Tb|Terbium|lanthanide|solid
Dy|Dysprosium|lanthanide|solid
Ho|Holmium|lanthanide|solid
Er|Erbium|lanthanide|solid
Tm|Thulium|lanthanide|solid
Yb|Ytterbium|lanthanide|solid
Lu|Lutetium|lanthanide|solid
Hf|Hafnium|transition|solid
Ta|Tantalum|transition|solid
W|Tungsten|transition|solid
Re|Rhenium|transition|solid
Os|Osmium|transition|solid
Ir|Iridium|transition|solid
Pt|Platinum|transition|solid
Au|Gold|transition|solid
Hg|Mercury|transition|liquid
Tl|Thallium|post|solid
Pb|Lead|post|solid
Bi|Bismuth|post|solid
Po|Polonium|post|solid
At|Astatine|halogen|not known
Rn|Radon|noble|gas
Fr|Francium|alkali|not known
Ra|Radium|alkaline|solid
Ac|Actinium|actinide|solid
Th|Thorium|actinide|solid
Pa|Protactinium|actinide|solid
U|Uranium|actinide|solid
Np|Neptunium|actinide|solid
Pu|Plutonium|actinide|solid
Am|Americium|actinide|solid
Cm|Curium|actinide|solid
Bk|Berkelium|actinide|solid
Cf|Californium|actinide|solid
Es|Einsteinium|actinide|not known
Fm|Fermium|actinide|not known
Md|Mendelevium|actinide|not known
No|Nobelium|actinide|not known
Lr|Lawrencium|actinide|not known
Rf|Rutherfordium|transition|not known
Db|Dubnium|transition|not known
Sg|Seaborgium|transition|not known
Bh|Bohrium|transition|not known
Hs|Hassium|transition|not known
Mt|Meitnerium|transition|not known
Ds|Darmstadtium|transition|not known
Rg|Roentgenium|transition|not known
Cn|Copernicium|transition|not known
Nh|Nihonium|post|not known
Fl|Flerovium|post|not known
Mc|Moscovium|post|not known
Lv|Livermorium|post|not known
Ts|Tennessine|halogen|not known
Og|Oganesson|noble|not known
`;

const ELEMENTS = RAW.trim().split("\n").map((line, i) => {
  const [symbol, name, category, state, aliases] = line.split("|");
  return { number: i + 1, symbol, name, category, state, aliases: aliases ? aliases.split(",") : undefined };
});

// category id -> the label that is shown
const CATEGORIES_OF_ELEMENTS = {
  alkali: "Alkali metals", alkaline: "Alkaline earth metals", transition: "Transition metals",
  post: "Post-transition metals", metalloid: "Metalloids", nonmetal: "Nonmetals", halogen: "Halogens",
  noble: "Noble gases", lanthanide: "Lanthanides", actinide: "Actinides",
};

const GAME = {
  id: "elementsquiz", // localStorage key
  category: "learn", // a CATEGORIES id in games/index.js
  title: "Guess the Elements!",
  placeholder: "Type an element…",
  noun: "element", nouns: "elements", verb: "found",
  cheers: ["Element-ary!", "Atom-ic!", "You got it!", "Super science!", "Great job!", "Eureka!"],
  items: ELEMENTS,
  tag: e => `#${e.number}`, // the atomic number, always shown
  doneStyle: e => `--c1:var(--${e.category})`,
  filters: Object.entries(CATEGORIES_OF_ELEMENTS).map(([k, label]) => ({ label, color: `var(--${k})`, test: e => e.category === k })),
  // chip() comes from the engine; these only run once the page has loaded it
  hints: [
    { id: "symbol", label: "🔤 Symbol", title: "Reveal the chemical symbol", reveal: e => chip(e.symbol) },
    { id: "category", label: "🧪 Type", title: "Reveal the type of element", reveal: e => chip(CATEGORIES_OF_ELEMENTS[e.category], `var(--${e.category})`) },
    { id: "state", label: "💧 State", title: "Reveal if it is a solid, liquid or gas", reveal: e => chip(e.state) },
  ],
};

if (typeof module !== "undefined") module.exports = GAME;
