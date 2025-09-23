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
    try
    {
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
    catch (error)
    {
        console.error(`Couldn't retrieve Pokemon: ${error}`);
    }
}
// threeMons();

// 3: get species info

// helper function
// takes in a pokemon's regular url, then goes to the species url and returns info from there
async function speciesInfo(url)
{
    try
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
                return [data, entry.flavor_text]; // return data and entry for later use
            }
            // else, continue        
        }
    }
    catch (error)
    {
        console.error(`Couldn't retrieve Pokemon species: ${error}`);
    }

}

// chooses three random pokemon and prints their names and some information to the console
async function speciesThree()
{
    const pokemon = await threeMons(); // get array of three pokemon
    // store species info in another array for later
    const pokemonInfo = [];
    for (let i in pokemon)
    {
        console.log(`${pokemon[i].name}: `); // print name
        const info = await speciesInfo(pokemon[i].url); // call species function on url
        // speciesInfo() will print the information to the console

        const data = info[0]; // the first item returned was all the pokemon's data
        const entry = info[1]; // the second item was the dex entry
        pokemonInfo.push([data, entry]); // add the pokemon and its dex entry to new info array
    }
    return pokemonInfo; // this will be helpful for part 4
}

speciesThree();

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
            // remove previous pokemon, if there are any
            // uses while instead of for because iterating over something while deleting things from it can cause issues
            while (entrySpot.hasChildNodes())
            {
                entrySpot.removeChild(entrySpot.lastChild); // remove one of the nodes
            }

            const pokes = await speciesThree(); // get three sets of pokemon and dex entries
            for (let mon in pokes)
            {
                // each item in pokes is a pair of two things: 'data', 'entry'
                // data has all base information about the pokemon, including name and image
                // entry is the flavor text as a string
                const pair = pokes[mon];
                // make a new container element that will hold all the pokemon's info in it
                const pokeball = document.createElement("div");
                entrySpot.appendChild(pokeball); // add to DOM

                // make a name tag
                const nametag = document.createElement("h2");
                nametag.textContent = pair[0].name; // use the 'name' property of the first item in the pair, 'data'
                pokeball.appendChild(nametag); // add to new container

                // make a portrait
                const sprite = document.createElement("img");
                sprite.src = pair[0].sprites["front_default"]; // 'data' has a dictionary of sprite type names to sprite urls
                pokeball.appendChild(sprite);

                // show the flavor text
                const para = document.createElement("p");
                para.textContent = pair[1]; // set equal to 'entry'
                pokeball.appendChild(para);
            }
        });
    }
    catch (err)
    {
        console.error(err);
    }
});
