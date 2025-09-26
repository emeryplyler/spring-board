const mythicalCreatures = [
	{name: "Dragon", type: "Fire", lastSeen: "Volcano Valley"},
	{name: "Mermaid", type: "Water", lastSeen: "Coral Caves"},
	{name: "Unicorn", type: "Land", lastSeen: "Enchanted Forest"},
	{name: "Griffin", type: "Air", lastSeen: "Highwind Mountains"},
	{name: "Kraken", type: "Water", lastSeen: "Abyssal Depths"}
];

// 1: use find() to locate the first water creature, log its name
// don't actually need to store find() result in a variable; could just print to console
// I wanted to separate them to make the print statements easier to read
{
    // using brackets to make smaller sections so I can reuse the name 'found' without conflicts (and because found items don't need to interact)
    // arrow function shortcuts and implicit return
    const found = mythicalCreatures.find(creature => creature.type === "Water");
    console.log(`First water-type creature: ${found.name}`); // print name of found creature
}

// 2: use findIndex() to get the index of the griffin and log to console
{
    const found = mythicalCreatures.findIndex(creature => creature.name === "Griffin");
    console.log(`Index of Griffin in array: ${found}`);
}

// 3: use find() to locate first enchanted forest creature
{
    const found = mythicalCreatures.find(creature => creature.lastSeen === "Enchanted Forest");
    console.log(`First creature that was last seen in the Enchanted Forest: ${found.name}`);
}

