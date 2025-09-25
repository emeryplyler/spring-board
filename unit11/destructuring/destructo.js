/* Task 1: Unveiling the Coordinates */
const coordinates = { x: 34, y: 42, z: 67 };

const { x, y } = coordinates;
console.log(`Coordinates: ${x}, ${y}`);


/* Task 2: The Map of Secrets */
const locations = {
    first: "Cave of Wonders",
    second: "Lake of Mystery",
    third: "Mount of Ages",
    fourth: "Desert of Shadows"
};

const { first, second, ...remaining } = locations;
console.log(`Key locations: ${first}, ${second}`);


/* Task 3: The Mysterious Door */
const doorCode = {
    upper: "Alpha",
    lower: "Omega"
};

const { upper, middle = remaining.third, lower } = doorCode;
console.log(`Door code sequence: ${upper}, ${middle}, ${lower}`);


/* Task 4: The Guardian's Riddle */
const riddle = {
    ancientWord: "Sphinx",
    modernWord: "Cat"
};

const { ancientWord: translation, modernWord } = riddle;
console.log(`Translation: ${translation}`);


/* Task 5: The Array of Elements */
const elements = ["Fire", "Water", "Earth", "Air"];

const [e1, e2] = elements; // use square brackets for arrays; by default, assigns the first two items in order
console.log(`Essential elements: ${e1} and ${e2}`);


/* Task 6: Skipping Stones */
const stones = [1, 2, 3, 4, 5, 6];

const [firstStone, , , , , sixthStone] = stones; // spaces skips in-between items
// if the array were much longer, it would probably be better to just use indices instead of destructuring
console.log(`Stones: ${firstStone}, ${sixthStone}`);


/* Task 7: The Array of Shadows */
const shadows = ["Darkness", "Silence", "Whisper", "Echo"];

const [visible, ...hidden] = shadows;
console.log(`Shadows: visible - ${visible}, hidden - ${hidden.join(", ")}`); // had to add a join() or else it just squishes them together


/* Task 8: The Wise Function */

function revealPath({ direction, distance })
{
    console.log(`Path direction: ${direction}, path distance: ${distance}m`);
}
revealPath({ "direction": "forth", "distance": 30 });


/* Task 9: The Scroll of Defaults */

// notes: when setting the defaults for properties inside an object here, you need a default value for the object itself as well
// by default, ingredient1 and 2 are water and fireflower, and by default, the object received is an empty object; that's what the = {} is at the end
// this way, you don't get the TypeError from trying to read properties of undefined in case the object you receive isn't usable
function mixPotion({ ingredient1 = "Water", ingredient2 = "Fireflower" } = {})
{
    console.log(`Mixing ${ingredient1} and ${ingredient2}`);
}
mixPotion();
mixPotion({"ingredient1": "Oranges", "ingredient2": "Chocolate"});


/* Task 10: The Array Spell */

// notes: my answer turned out different from the solution, but still uses destructuring and should return the correct responses
// 'ingredients' is assumed to be an array already
// this results in a little bug where if you pass in a string as 'ingredients' it will destructure the string like an array and return the first two letters
function castSpell(ingredients)
{
    if (ingredients.length >= 2)
    {
        let [first, second] = ingredients; // grab first two items from destructured array
        console.log(`Casting spell using ${first} and ${second}`);
    }
    else
    {
        console.log("Spell fizzled");
    }
}
castSpell(["mouse fur", "crow's feather", "ram's horn", "manatee hair"]);


/* Task 11: The Nested Secret */
const nestedSecret = { outer: { inner: "The Final Key" } };

// notes: the only variable being created here is "key", which is a rename of inner
// specifying 'outer' here is just to tell which property we need to look inside, which is the 'outer' object's 'inner' property
const { outer: { inner: key } } = nestedSecret;
console.log(`Key retrieved: ${key}`);


/* Task 12: The Swap of Fate */
let stoneA = "Emerald";
let stoneB = "Ruby";

[stoneA, stoneB] = [stoneB, stoneA];
console.log(`Left stone: ${stoneA}, right stone: ${stoneB}`); // now ruby is stoneA
