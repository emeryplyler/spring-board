let pokeapi = "https://pokeapi.co/api/v2/";

// 1: fetching from pokeapi.co/api/v2/pokemon?limit=100000&offset=0 will return every pokemon and its url.

// 2: getting three random pokemon

// // helper function to get info on one pokemon using its url
// async function getMon(url)
// {
//     const d = await fetch(url);
//     const data = await d.json();
// }

async function threeMons()
{
    // get every pokemon
    const d = await fetch(pokeapi.concat("pokemon?limit=100000&offset=0"));
    const data = await d.json(); // convert to json
    const toGet = 3; // how many pokemon to select at once (three in this case)
    const totalMons = data.count; // could hard code, but they may add more pokemon someday
    // use Array.from, use length = 3, use a mapping function to run on each created item of the array
    // mapping function will generate a random index from 0 to totalMons - 1
    const randomNums = Array.from({ length: toGet }, () => Math.floor(Math.random() * totalMons));
    // make an empty array for the pokemon 
    const pokes = Array.from({ length: toGet });

    for (let i = 0; i < toGet; i++)
    {
        const index = randomNums[i];
        pokes[i] = data.results[index]; // get that number pokemon from the fetch results
    }

    // now we have three objects, each with a name and a url
    for (let i in pokes)
    {
        console.log(`Name: ${pokes[i].name}, URL: ${pokes[i].url}`);
    }

    return pokes; // return pokemon names and urls for speciesInfo() to use
}
// threeMons();

// 3: get species info

// helper function
// takes in a pokemon's regular url, then goes to the species url and returns info from there
async function speciesInfo(url)
{
    // retrieve base data
    const d = await fetch(url);
    const data = await d.json();
    const specUrl = data.species.url; // grab species url from base data

    // get species data
    const s = await fetch(specUrl);
    const specData = await s.json();

    // search specData.flavor-text-entries for english results, console log the first one found
    for (let i = 0; i < specData.flavor_text_entries.length; i++)
    {
        const entry = specData.flavor_text_entries[i];
        if (entry.language.name === "en")
        {
            console.log(entry.flavor_text);
            return entry.flavor_text; // return entry for later use
        }
        // else, continue        
    }
}

// chooses three random pokemon and prints their names and some information to the console
async function printThree()
{
    const pokemon = await threeMons(); // get array of three pokemon
    // store species info in another array for later
    const pokemonInfo = [];
    for (let i in pokemon)
    {
        console.log(`${pokemon[i].name}: `); // print name
        const info = await speciesInfo(pokemon[i].url); // call species function on url
        // speciesInfo() will print the information
        pokemonInfo.push([pokemon[i], info]); // add the pokemon and its dex entry to new info array
    }
    return pokemonInfo; // this will be helpful for part 4
}

printThree();

// 4: using html


// first, only do this after page is done loading
document.addEventListener("DOMContentLoaded", () => 
{
    try
    {
        const button = document.querySelector("button");
        const entrySpot = document.querySelector(".entry-spot");

        // add a function to the button clicking
        button.addEventListener("click", async () =>
        {
            const pokes = await threeMons();
        });
    }
    catch (err)
    {
        console.error(err);
    }
    // call threemons and get an array of three random pokemon names and urls
    // for each pokemon:
    // make a new box and add a text box to display the name in it
    // add an image and use the front default sprite
    // call the species info function and add that to a text box under the sprite
});
