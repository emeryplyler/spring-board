// go to the spoonacular api, get random recipe //
// click a button ad display that recipe //
// the browser needs to display it //

const spoonacularAPIKEY = "3bcc4c318e6c41b4a2015b597b52c0ae";

document.addEventListener("DOMContentLoaded", () =>
{
    const button = document.getElementById("generate-button"); // grab references to page elements
    const display = document.getElementById("display-div");
    // notes: can probably use either the display div's class, 'food-display', or its id, 'display-div'
    // unsure why it has both a class and id in this case, one for styling and one for code
    // couldn't you use a class both for styling and for selecting in code?
    button.addEventListener("click", () => getRecipe()); // call async function getRecipe when button is clicked

    // will be hoisted to top, so it's fine if it's down here
    async function getRecipe()
    {
        try
        {
            const response = await axios.get(`https://api.spoonacular.com/recipes/random?apiKey=${spoonacularAPIKEY}`);
            const recipe = response.data.recipes[0]; // response has an array of recipes, use the first one's name

            display.innerHTML = ""; // clear previous code out
            // make a new header for the title and a new div for the text:
            let h3 = document.createElement("h3");
            let div = document.createElement("div");

            h3.innerHTML = recipe.title;
            display.appendChild(h3); // add h3 to DOM under display div

            div.innerHTML = recipe.summary; // show summary in the text box
            display.appendChild(div); // add div to DOM also under display div but after h3 so it will be below
        }
        catch (reason)
        {
            console.error(reason); // if it fails for some reason
        }
    }
});
