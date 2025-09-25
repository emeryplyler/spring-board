/* Task 1: Track Animal Sightings */
// Write a function with rest parameters to print sightings of different animals within the sanctuary. This function should accept an arbitrary number of animal names.
function trackAnimals(...sightings)
{
    // stores all arguments in an array called sightings
    for (const sighting of sightings)
    {
        console.log(sighting);
    }
}
trackAnimals("bear", "cat", "tiger", "bear", "mountain lion");
// output:
// bear
// cat
// tiger
// bear
// mountain lion

/* Task 2: Merge Habitat Areas */
const forestHabitats = ["Forest A", "Forest B"];
const savannahHabitats = ["Savannah C", "Savannah D"];
// You are given two arrays of habitat names. Use the spread operator to combine them into a comprehensive list of protected areas within the sanctuary.
const protectedHabitats = [...forestHabitats, ...savannahHabitats];
// console.log(protectedHabitats);
// output:
// [ 'Forest A', 'Forest B', 'Savannah C', 'Savannah D' ]

/* Task 3: Update Conservation Status */
const rhinoStatus = {
    population: 500,
    status: "Endangered"
};
// You are given an object representing an animal's conservation status. Use the spread operator to update this status with new information, such as an increase in population or a change in habitat.
const newRhinoStatus = { ...rhinoStatus, population: 600 }; // had to make a new variable because rhinoStatus is const

/* Task 4: Catalog Genetic Diversity */
const lionProfile = {
    name: "Leo",
    age: 5,
    species: "Lion"
};
// Duplicate an animal profile object using a shallow copy. Add genetic diversity information using the `genetics` property to this copy. Observe and explain how changes to nested properties affect both the original and the copied object.
const lionProfile2 = lionProfile;
const lionProfile3 = { ...lionProfile };
lionProfile2.genetics = "valuable";
lionProfile3.age = 9;
// console.log(lionProfile); // output: { name: 'Leo', age: 5, species: 'Lion', genetics: 'valuable' }

/*
 * Observations:
 * When just setting lionProfile2 to equal lionProfile, any changes made to lionProfile2 will also happen to lionProfile.
 * When copying using the spread operator, they become separate and changes don't happen to both anymore.
 */

/* Task 5: Analyze Ecosystem Health */
const ecosystemHealth = {
    waterQuality: "Good",
    foodSupply: {
        herbivores: "Abundant",
        carnivores: "Sufficient"
    }
};
// You are given an object with a nested structure detailing the ecosystem's health, including water quality and food supply. Perform a shallow copy and modify a nested property. Observe and explain how changes to nested properties affect both the original and the copied object.
const ecosystemHealth2 = { ...ecosystemHealth };
ecosystemHealth2.foodSupply.carnivores = "Abundant";
console.log(ecosystemHealth);
console.log(ecosystemHealth2);
// output for both is the same:
// {
//   waterQuality: 'Good',
//   foodSupply: { herbivores: 'Abundant', carnivores: 'Abundant' }
// }

/*
 * Observations:
 * When changing a property that's not directly inside the object but is inside something else, changes made to it will affect both the copy and the original, even when using the spread operator. 
 * It's probably because in the original, the foodSupply property is a reference to an object somewhere in memory storing the herbivore and carnivore food info. 
 * When making a copy, the copy's foodSupply property will be a reference to the same object.
 * So a 'shallow' copy will fully copy all the 'shallow' properties, but not the others.
 */
