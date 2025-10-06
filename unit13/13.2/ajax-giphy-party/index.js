// look back at the <readme.md> file for some hints //
// working API key //
const giphyApiKey = "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym";
const backupApiKey = "lAa1EbLv9XMrhYnU8G0c7RQaPeZANN9O";
const limit = 10; // how many gifs to request at once
const url = `http://api.giphy.com/v1/gifs/search?api_key=${giphyApiKey}&rating=g&limit=${limit}&q=`;

document.addEventListener("DOMContentLoaded", () => 
{
    const searchBox = document.getElementById("search-box");
    const searchButton = document.getElementById("search-button");
    const clearButton = document.getElementById("clear-button");
    const gifContainer = document.getElementById("gif-container");

    // search functionality: another async function
    // when user clicks the button, the async function will begin and the response will come back eventually;
    // entire chain of events is in sequence (async)
    searchButton.addEventListener("click", async (ev) =>
    {
        ev.preventDefault(); // don't refresh page!
        const query = searchBox.value;
        const gifUrl = await search(query); // call async search function and wait for response
        const newImg = document.createElement("img"); // make new image element
        newImg.src = gifUrl;
        gifContainer.appendChild(newImg); // add image element to DOM
    });
});

async function search(query)
{
    try
    {
        const response = await axios.get(url.concat(query));
        // found response fields by logging entire object to console
        const numImg = response.data.data.length;
        let rand = Math.floor(Math.random() * numImg); // grab a random one
        const gifUrl = response.data.data[rand].images["original"].url;
        if (gifUrl) {
            return gifUrl;
        }
        else
        {
            console.error(response);
        }
        
    }
    catch (err)
    {
        console.error(err);
    }
}
