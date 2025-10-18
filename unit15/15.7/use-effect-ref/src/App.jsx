import { useEffect, useState } from 'react';
import './App.css';

function App()
{
    // display a deck of cards, one card at a time
    // when page loads, create new deck from api and show a button that lets you draw a card
    // every time you click the button show a new card until deck is empty
    // if deck is empty and you click the button show 'no cards remaining' in an alert message

    const [deck, updateDeck] = useState(null);

    const deckElement = document.getElementById("deck");

    useEffect(() =>
    {
        // called ONLY when the page loads, pulls from the api
        // ajax is async and useEffect can't be async, so we define a new async function inside here

        // notes: apparently, strict mode will render components twice in dev mode to see if there are issues;
        // when run in dev mode, initializeDeck will be called twice when the page loads and never again
        async function initializeDeck()
        {
            try
            {
                const response = await axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
                let newDeck = { deckID: response.data.deck_id, remaining: response.data.remaining }; // reformat
                updateDeck(newDeck);
            }
            catch (err)
            {
                console.error(err);
            }
        }
        // now actually call the function and make the deck
        initializeDeck();

    }, []);

    function onDrawButtonPress()
    {
        // called by the draw button
        if (deck.remaining <= 0)
        {
            console.log("No cards left!");
            return;
        }

        // call the api to draw a new card
        // because this process is async, this function will just start the async function and return
        drawCard();
    }

    async function drawCard()
    {
        const response = await axios.get(`https://deckofcardsapi.com/api/deck/${deck.deckID}/draw/?count=1`);
        let card = response.data.cards[0]; // get first item, since there will always only be one
        let newDeck = { ...deck, remaining: response.data.remaining }; // make a new version of deck with the new 'remaining' count
        updateDeck(newDeck);

        // display the card drawn
        let cardElement = document.createElement("img");
        cardElement.src = card.image;
        cardElement.id = "card";
        deckElement.appendChild(cardElement);
    }

    return (
        <>
            <button onClick={onDrawButtonPress}>Draw</button>
            <div id='deck'></div>
        </>
    );
}

export default App;
