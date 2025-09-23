const api = "http://deckofcardsapi.com/api/deck/";

// 1: single card request from newly shuffled deck; console log value and suit
async function singleCard()
{
    try
    {
        // make and shuffle a new deck
        const url = api.concat("new/shuffle/?deck_count=1");
        let data = await fetch(url); // request using new url
        let json = await data.json(); // after getting data, convert data to json

        // draw a card
        const drawUrl = api.concat(`${json.deck_id}/draw/?count=1`);
        let drawData = await fetch(drawUrl);
        let draw = await drawData.json();

        console.log(`Drew the ${draw.cards[0].value} of ${draw.cards[0].suit}`);
    }
    catch (error)
    {
        console.error(error);
    }
}
singleCard();

// 2: single card, then another card from same deck
async function doubleCard()
{
    try
    {
        const url = api.concat("new/shuffle/?deck_count=1");
        let data = await fetch(url);
        let json = await data.json();

        // draw two cards; because it's the same deck id, both will be taken from the same deck and not be drawn again
        const drawUrl = api.concat(`${json.deck_id}/draw/?count=2`);
        let drawData = await fetch(drawUrl);
        let draw = await drawData.json();

        console.log(`Drew the ${draw.cards[0].value} of ${draw.cards[0].suit}`); // first card (0)
        console.log(`Drew the ${draw.cards[1].value} of ${draw.cards[1].suit}`); // second card (1)
    }
    catch (err)
    {
        console.error(err);
    }
}
doubleCard();

// 3: make html page; when page loads, make new deck, show button;
// when button is pressed, display new card until there are no cards left in deck
let deckID = ""; // will be the id of our deck
// deckID is not set here, but is created here so that drawFromDeck() can see it (it's in scope)
// drawFromDeck() will only ever be called after deckID is set

// helper function that returns one card from a specified deck
async function drawFromDeck()
{
    try
    {
        const drawUrl = api.concat(`${deckID}/draw/?count=1`);
        let drawData = await fetch(drawUrl);
        let draw = await drawData.json();
        // if remaining is 0, return nothing
        if (draw.remaining < 1)
        {
            return;
        }
        else
        {
            return draw.cards[0]; // return card object with value and suit and image
        }
    }
    catch (err)
    {
        console.error(`Couldn't draw from deck: ${err}`);
    }
}

async function buttonPress() 
{
    let card = await drawFromDeck(); // wait for card to finish being drawn
    // are there any cards left?
    if (!card)
    {
        const button = document.querySelector("button");
        const h = button.parentNode;
        h.removeChild(button); // remove button
        return;
    }
    // add card image to page dom
    const image = document.createElement("img"); // make new image
    image.src = card.image; // set image to card image
    image.style.position = "absolute"; // make the cards appear on top of each other
    const cardSpot = document.querySelector(".card-spot");
    cardSpot.appendChild(image); // add image as a child of cardSpot; now image is in the page
}

async function pageSetup()
{
    // page setup
    const url = api.concat("new/shuffle/?deck_count=1"); // create the deck we'll use
    try
    {
        let data = await fetch(url);
        let json = await data.json();
        // catch
        deckID = json.deck_id; // actually set deckID before any button presses
    }
    catch (err)
    {
        console.error(`Couldn't set up page: ${err}`);
    }
}

document.addEventListener("DOMContentLoaded", () => 
{
    pageSetup();

    const button = document.querySelector("button");
    button.addEventListener("click", buttonPress); // button connected to buttonPress()
});


