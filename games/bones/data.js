// The human skeleton. Line order = card order, and saved progress is stored by position, so add new
// bones at the end. Paired bones (left and right) are one card, and the many small bones of the wrist,
// foot and spine are covered by one group card each as well as, for the wrist and foot, by their own.
// Format per line: Name|region|where|clue|alias,alias
// region: head, spine, chest, arm, hand, pelvis, leg or foot
// Aliases are the everyday names. Chips capitalise every word, so keep where and clue short.
const RAW = `
Skull|head|Head|Protects the brain|Cranium
Frontal Bone|head|Forehead|Sits above the eyes
Parietal Bone|head|Top and sides|Two of them form the roof
Occipital Bone|head|Back of the head|The spinal cord passes through it
Temporal Bone|head|Side of the head|Next to each ear
Sphenoid|head|Behind the eyes|Shaped like a butterfly|Sphenoid Bone
Ethmoid|head|Between the eyes|Spongy bone behind the nose|Ethmoid Bone
Nasal Bone|head|Top of the nose|Two small bones make the bridge
Maxilla|head|Upper jaw|Holds the top teeth|Upper Jaw
Zygomatic Bone|head|Cheek|Forms the cheek
Lacrimal Bone|head|Eye socket|Smallest bone in the face
Palatine Bone|head|Roof of the mouth|Forms the back of the roof
Vomer|head|Inside the nose|Divides the nose in two|Vomer Bone
Inferior Nasal Concha|head|Inside the nose|Curled bone that warms the air
Mandible|head|Lower jaw|The only skull bone that moves|Jawbone,Lower Jaw
Malleus|head|Middle ear|Tiny bone shaped like a hammer|Hammer
Incus|head|Middle ear|Tiny bone shaped like an anvil|Anvil
Stapes|head|Middle ear|Smallest bone in the body|Stirrup
Hyoid|head|Neck|Joined to no other bone|Hyoid Bone
Atlas|spine|Top of the neck|Holds up the skull
Axis|spine|Neck|Lets you shake your head
Cervical Vertebrae|spine|Neck|Seven bones in the neck
Thoracic Vertebrae|spine|Upper back|Twelve bones joined to the ribs
Lumbar Vertebrae|spine|Lower back|Five big, strong bones
Sacrum|spine|Base of the spine|Triangle between the hips
Coccyx|spine|Bottom of the spine|What is left of a tail|Tailbone
Sternum|chest|Middle of the chest|The ribs join it at the front|Breastbone
Manubrium|chest|Top of the sternum|Top part of the sternum
Xiphoid Process|chest|Bottom of the sternum|A small pointed tip
Ribs|chest|Around the chest|Protect the heart and lungs|Rib,Ribcage
Clavicle|arm|Shoulder|Joins the shoulder to the chest|Collarbone
Scapula|arm|Back of the shoulder|Flat and triangle-shaped|Shoulder Blade
Humerus|arm|Upper arm|Between the shoulder and elbow
Radius|arm|Forearm, thumb side|The shorter forearm bone
Ulna|arm|Forearm, little-finger side|Forms the point of the elbow
Carpals|hand|Wrist|Eight small bones|Wrist Bones
Scaphoid|hand|Wrist|Shaped like a boat
Lunate|hand|Wrist|Shaped like a moon
Triquetrum|hand|Wrist|Has three corners
Pisiform|hand|Wrist|Pea-shaped and tiny
Trapezium|hand|Wrist|Joins to the thumb
Trapezoid|hand|Wrist|Joins to the index finger
Capitate|hand|Wrist|The biggest wrist bone
Hamate|hand|Wrist|Has a little hook
Metacarpals|hand|Palm|Five long bones in the palm|Palm Bones
Phalanges|hand|Fingers and toes|Three in each finger, two in the thumb|Phalanx,Finger Bones,Toe Bones
Hip Bone|pelvis|Hip|Made of three bones joined together|Pelvis,Pelvic Bone
Ilium|pelvis|Top of the hip|The wide wing you feel at your waist
Ischium|pelvis|Bottom of the hip|The part you sit on
Pubis|pelvis|Front of the hip|Joins the two hip bones in front
Femur|leg|Thigh|Longest bone in the body|Thigh Bone
Patella|leg|Knee|Protects the knee joint|Kneecap
Tibia|leg|Lower leg|The bigger bone in the lower leg|Shin Bone
Fibula|leg|Lower leg|The thin bone next to the big one
Tarsals|foot|Ankle and heel|Seven bones in the back of the foot
Talus|foot|Ankle|Links the leg to the foot|Ankle Bone
Calcaneus|foot|Heel|Biggest bone in the foot|Heel Bone
Navicular|foot|Middle of the foot|Shaped like a little boat
Cuboid|foot|Outside of the foot|Shaped like a cube
Medial Cuneiform|foot|Inside of the foot|Biggest of the three wedge bones
Intermediate Cuneiform|foot|Middle of the foot|Smallest of the three wedge bones
Lateral Cuneiform|foot|Outer middle of the foot|Middle-sized wedge bone
Metatarsals|foot|Arch of the foot|Five long bones before the toes
`;

const BONES = RAW.trim().split("\n").map(line => {
  const [name, region, where, clue, aliases] = line.split("|");
  return { name, region, where, clue, aliases: aliases ? aliases.split(",") : undefined };
});

const REGIONS = ["head", "spine", "chest", "arm", "hand", "pelvis", "leg", "foot"];

const GAME = {
  id: "bonesquiz", // localStorage key
  category: "learn", // a CATEGORIES id in games/index.js
  title: "Guess the Bones!",
  placeholder: "Type a bone…",
  noun: "bone", nouns: "bones", verb: "found",
  cheers: ["Bone-afide!", "Rattling good!", "You got it!", "Skele-tastic!", "Great job!", "No bones about it!"],
  items: BONES,
  doneStyle: b => `--c1:var(--${b.region})`,
  filters: REGIONS.map(r => ({ label: r, color: `var(--${r})`, test: b => b.region === r })),
  // chip() comes from the engine; these only run once the page has loaded it
  hints: [
    { id: "where", label: "📍 Where", title: "Reveal where it is", reveal: b => chip(b.where, `var(--${b.region})`) },
    { id: "clue", label: "💡 Clue", title: "Reveal a clue", reveal: b => chip(b.clue) },
  ],
};

if (typeof module !== "undefined") module.exports = GAME;
