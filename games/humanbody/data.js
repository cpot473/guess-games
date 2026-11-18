// Human Body questions. Line order = question order, and saved progress is stored by position, so add new questions at the end.
// Format per line: Question|level|Right answer|Wrong answer|Wrong answer|Wrong answer|Fact shown afterwards
// level: easy or hard. The engine shuffles the answers, so the right one is always written first here.
const RAW = `
How many bones does a grown-up have?|easy|206|106|306|406|Babies are born with about 300 bones. Some join together as they grow!
Which organ pumps blood around your body?|easy|Heart|Lungs|Stomach|Brain|Your heart beats about 100,000 times every day.
Which organ do you think with?|easy|Brain|Heart|Liver|Skin|Your brain controls everything you do, even while you sleep.
What do your lungs help you do?|easy|Breathe|Digest food|See|Hear|You breathe in oxygen and breathe out carbon dioxide.
Which is the biggest organ in your body?|easy|Skin|Heart|Brain|Stomach|Your skin covers your whole body and keeps germs out.
Which bone protects your brain?|easy|Skull|Rib|Spine|Pelvis|Your skull is made of several bones joined together.
Which bones protect your heart and lungs?|easy|Ribs|Skull|Femur|Fingers|Most people have 12 pairs of ribs.
Which part of your body do you use to hear?|easy|Ears|Eyes|Nose|Tongue|Sound makes tiny parts inside your ear wobble.
Which part of your body do you use to taste?|easy|Tongue|Nose|Teeth|Ears|Your tongue is covered in tiny taste buds.
Which of these is NOT a taste your tongue can find?|easy|Sticky|Sweet|Salty|Bitter|Sweet, sour, salty, bitter and savoury (umami) are the main tastes.
What does your stomach do?|easy|Breaks down food|Pumps blood|Helps you breathe|Sends messages|Strong juices in your stomach help break food into tiny pieces.
What is your backbone also called?|easy|Spine|Skull|Ribcage|Pelvis|Your spine is made of small bones called vertebrae.
What carries messages between your brain and your body?|easy|Nerves|Veins|Hairs|Teeth|Messages zoom along your nerves in a split second.
Which part of your blood fights germs?|easy|White blood cells|Red blood cells|Plasma|Bones|White blood cells hunt down germs and help you get better.
What do you feel when you check your pulse?|easy|Your heart pumping blood|Your lungs breathing|Your stomach digesting|Your brain thinking|Press two fingers on your wrist or neck to find it.
What is the black circle in the middle of your eye called?|easy|Pupil|Lens|Eyelid|Iris|Your pupil gets bigger in the dark to let more light in.
Which body part do you use to smell?|easy|Nose|Ears|Tongue|Skin|Tiny sensors high up in your nose pick up smells.
How many senses do people usually talk about?|easy|5|3|7|10|Sight, hearing, smell, taste and touch.
Which organ cleans your blood and makes wee?|hard|Kidneys|Liver|Heart|Lungs|You have two kidneys, and each is about the size of your fist.
What is the longest bone in your body?|hard|Femur (thigh bone)|Tibia (shin bone)|Humerus (arm bone)|Rib|The femur is about a quarter of your height.
What is the hardest substance in your body?|hard|Tooth enamel|Bone|Nails|Skull|Enamel covers your teeth to protect them. It is harder than bone!
Where are the smallest bones in your body?|hard|In your ear|In your toes|In your fingers|In your nose|The stapes bone in your ear is about the size of a grain of rice.
How many chambers (rooms) does your heart have?|hard|4|2|3|6|Two at the top (atria) and two at the bottom (ventricles).
What do red blood cells carry around your body?|hard|Oxygen|Germs|Food|Light|Red blood cells pick up oxygen in your lungs and drop it off all around your body.
What is the tube that carries air to your lungs called?|hard|Windpipe (trachea)|Food pipe|Artery|Spine|Air goes down your windpipe when you breathe in.
How many baby teeth do children usually have?|hard|20|10|28|32|Grown-ups usually have 32 teeth.
About how long is your small intestine?|hard|6 metres|1 metre|3 metres|20 metres|It is long, but folded up so it fits inside your tummy.
Which organ makes bile to help digest fat?|hard|Liver|Heart|Lungs|Spleen|The liver is also your body's chemical factory, with hundreds of jobs.
Which joint works like a door hinge?|hard|Elbow|Shoulder|Hip|Neck|Your elbow bends and straightens one way, like a hinge.
Which muscle helps you breathe, under your lungs?|hard|Diaphragm|Biceps|Heart|Tongue|When your diaphragm moves down, air is pulled into your lungs.
What are your fingernails made of?|hard|Keratin|Bone|Calcium|Skin cells only|Keratin is the same stuff your hair is made of.
Blood travelling away from your heart flows through...|hard|Arteries|Veins|Nerves|Tendons|Veins carry blood back to the heart.
About how much of your body is water?|hard|About 60%|About 10%|About 30%|About 90%|That is why it is important to drink water.
What is your kneecap called?|hard|Patella|Femur|Clavicle|Scapula|It protects your knee joint.
What is your collarbone called?|hard|Clavicle|Scapula|Patella|Sternum|It joins your shoulder to your chest bone.
What do muscles do to make you move?|hard|Pull on your bones|Push your bones|Make blood|Make air|Muscles can only pull, so they work in pairs.
How many lungs do most people have?|easy|2|1|3|4|Your right lung is a little bigger than your left to make room for your heart.
How many kidneys do most people have?|easy|2|1|3|4|You can stay healthy with just one, though!
What do your eyes do?|easy|See|Hear|Smell|Taste|Your eyes catch light and send pictures to your brain.
Which sense do you use your skin for most?|easy|Touch|Hearing|Sight|Taste|Skin has millions of tiny sensors that feel hot, cold, soft and sharp things.
What helps you chew your food?|easy|Teeth|Ribs|Eyebrows|Elbows|Chewing breaks food into small pieces so it is easier to swallow.
What happens to your heart when you run?|easy|It beats faster|It stops|It beats slower|It gets smaller|Your muscles need more oxygen, so your heart pumps faster.
What does your body do while you sleep?|easy|Rests and repairs itself|Stops breathing|Stops its heart|Switches off its brain|Your brain stays busy while you sleep, sorting out what you learned.
Which joint bends in the middle of your leg?|easy|Knee|Elbow|Wrist|Neck|Your knee is the biggest joint in your body.
Where does food go when you swallow it?|easy|Down your food pipe|Down your windpipe|Into your ears|Into your nose|Your food pipe squeezes the food down to your stomach.
Which gas do you breathe in that your body needs?|easy|Oxygen|Helium|Smoke|Steam|Oxygen is in the air all around you.
Why do you sweat?|easy|To cool you down|To make you taller|To feed you|To help you hear|Sweat dries on your skin and takes heat away.
What does a scab do?|easy|Protects a cut while it heals|Helps you hear|Pumps blood|Makes you grow|Underneath it, new skin is growing.
Which muscle makes a bump at the front of your upper arm when you bend it?|easy|Biceps|Calf|Tongue|Heart|Flex your arm and feel it!
What is the frame of bones inside your body called?|easy|Skeleton|Muscle|Skin|Stomach|Your skeleton holds you up and protects your organs.
Which mineral helps to make your bones and teeth strong?|easy|Calcium|Sugar|Plastic|Helium|Milk, cheese and yoghurt have lots of calcium.
What do we call a place where two bones meet?|easy|Joint|Muscle|Nerve|Vein|Knees, elbows and hips are all joints.
What is snot also called?|easy|Mucus|Plasma|Bile|Sweat|Mucus in your nose traps dust and germs.
Which part of your body stores wee until you go to the toilet?|easy|Bladder|Liver|Heart|Lungs|Your bladder stretches as it fills up.
What is spit also called?|easy|Saliva|Mucus|Bile|Plasma|Your mouth makes about a litre of it every day.
Whose fingerprints are exactly like yours?|easy|Nobody's|Your mum's|Your best friend's|Your teacher's|Even identical twins have different fingerprints.
Which muscle never gets to rest?|easy|Heart|Biceps|Tongue|Calf|Your heart beats day and night, all your life.
What do tears do for your eyes?|easy|Wash and protect them|Make them bigger|Change their colour|Help them hear|Blinking spreads tears over your eyes to keep them clean.
How much sleep do children your age need each night?|easy|About 9 to 11 hours|About 4 hours|About 6 hours|About 14 hours|Sleep helps your brain and body grow.
What do your hair and nails keep doing all your life?|easy|Growing|Shrinking|Turning into bone|Stopping at age 5|Fingernails grow faster than toenails.
Which part of your eye gives it its colour?|hard|Iris|Pupil|Eyelid|Lens|The iris is a ring of muscle that also changes the size of your pupil.
What does the lens in your eye do?|hard|Focuses light|Makes tears|Gives your eye its colour|Closes your eye|It helps you see things clearly, near and far.
What wobbles inside your ear when sound hits it?|hard|Eardrum|Pupil|Windpipe|Rib|The eardrum is a thin skin stretched tight, a bit like a drum.
Which part of your body, deep inside your ear, helps you balance?|hard|Inner ear|Elbow|Knee|Ribs|That is why spinning round makes you feel dizzy.
Which sense works closely with taste?|hard|Smell|Hearing|Touch|Sight|Hold your nose while you eat and food tastes much blander.
About what temperature is a healthy body?|hard|37°C|20°C|50°C|10°C|That is about 98.6°F.
About how much blood does a grown-up have?|hard|About 5 litres|About 1 litre|About 20 litres|About 50 litres|That is about 8 big bottles of milk.
About how big is your heart?|hard|About the size of your fist|The size of a football|The size of a pea|The size of your head|Make a fist: that is roughly your heart's size.
About how much does a grown-up's brain weigh?|hard|About 1.4 kilograms|About 100 grams|About 10 kilograms|About 50 grams|That is about the same as one and a half bags of sugar.
What does your large intestine mostly do?|hard|Takes water from leftover food|Makes blood|Helps you see|Pumps air|What is left over leaves your body as poo.
Where does most of the goodness from your food pass into your blood?|hard|Small intestine|Lungs|Heart|Skull|Tiny finger-like bumps inside it soak up the goodness.
Where does digestion begin?|hard|In your mouth|In your stomach|In your small intestine|In your lungs|Chewing and spit start breaking food down.
Which organ makes insulin, which helps control sugar in your blood?|hard|Pancreas|Liver|Kidney|Heart|The pancreas also makes juices that help digest food.
Which part of your brain helps you balance and move smoothly?|hard|Cerebellum|Diaphragm|Pancreas|Kidney|It is at the back of your brain, under the main part.
How many bones are in one hand and wrist?|hard|27|10|14|50|That is why your hands can do so many clever things.
About a quarter of all your bones are in your...|hard|Feet|Skull|Arms|Back|Each foot has 26 bones.
What gives your skin its colour?|hard|Melanin|Keratin|Calcium|Insulin|Melanin also helps protect skin from the Sun.
Which of these is a blood group?|hard|O|X|Z|Q|The main blood groups are A, B, AB and O.
Which tiny parts of your blood help to close up a cut?|hard|Platelets|Keratin|Enamel|Bile|They clump together to plug the hole.
Where inside your bones are new blood cells made?|hard|Bone marrow|Hair|Nails|Teeth|Bone marrow is a soft, jelly-like middle part of some bones.
What is it called when your leg kicks by itself if the doctor taps your knee?|hard|A reflex|A pulse|A habit|A sneeze|A reflex happens quickly, without you thinking about it.
What are goosebumps?|hard|Tiny muscles pulling your hairs upright|Little scabs|Bumps made by bones|Insect bites|They happen when you are cold or scared.
Which teeth do most of the grinding at the back of your mouth?|hard|Molars|Incisors|Canines|Gums|Molars are wide and flat, like little millstones.
What are the small bones that make up your spine called?|hard|Vertebrae|Ribs|Femurs|Patellas|Your neck has 7 of them.
`;

const GAME = {
  id: "humanbodyquiz", // localStorage key
  category: "know", // a CATEGORIES id in games/index.js
  title: "Human Body",
  items: RAW.trim().split("\n").map(line => {
    const [q, level, ...rest] = line.split("|");
    return { q, level, options: rest.slice(0, 4), fact: rest[4] };
  }),
};

if (typeof module !== "undefined") module.exports = GAME;
