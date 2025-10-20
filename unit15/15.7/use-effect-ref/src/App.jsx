import { useEffect, useState } from 'react';
import './App.css';
import Notification from './components/Notification';

function App()
{
    // display a deck of cards, one card at a time
    // when page loads, create new deck from api and show a button that lets you draw a card
    // every time you click the button show a new card until deck is empty
    // if deck is empty and you click the button show 'no cards remaining' in an alert message

    const [deck, updateDeck] = useState(null);
    const [log, updateLog] = useState(""); // for showing messages to user

    const deckElement = document.getElementById("deck");

    useEffect(() =>
    {
        // called ONLY when the page loads, pulls from the api
        // ajax is async and useEffect can't be async, so we define a new async function inside here

        // notes: apparently, strict mode will render components twice in dev mode to see if there are issues;
        // when run in dev mode, initializeDeck will be called twice when the page loads and never again

        // call asynchronous initializeDeck function
        initializeDeck();

    }, []);

    function onDrawButtonPress()
    {
        // called by the draw button
        if (deck.remaining <= 0)
        {
            alert("No cards left!");
            return;
        }

        // call the api to draw a new card
        // because this process is async, this function will just start the async function and return
        drawCard();
    }

    function onShuffleButtonPress()
    {
        // called by shuffle button

        // remove all existing cards from page
        if (deckElement.hasChildNodes())
        {
            deckElement.textContent = "";
        }

        // if no cards left, start a new deck and tell the player
        if (deck.remaining <= 0)
        {
            initializeDeck();
        }
        else
        {
            // else, shuffle existing deck
            updateLog("Shuffling the deck...");
            reshuffle();
        }
    }

    async function initializeDeck()
    {
        try
        {
            const response = await axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
            let newDeck = { deckID: response.data.deck_id, remaining: response.data.remaining }; // reformat
            updateDeck(newDeck);
            updateLog("Shuffled new deck.");
        }
        catch (err)
        {
            console.error(err);
        }
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

        // notify user
        updateLog(`Drew the ${card.value.toLowerCase()} of ${card.suit.toLowerCase()}. ${response.data.remaining} cards left.`);
    }

    async function reshuffle()
    {
        const response = await axios.get(`https://deckofcardsapi.com/api/deck/${deck.deckID}/shuffle/?remaining=true`);
        updateLog("Shuffled deck.");
    }

    return (
        <>
            <button onClick={onDrawButtonPress}>Draw</button>
            <button onClick={onShuffleButtonPress} id='shuffle-button'>Shuffle</button>
            <Notification message={log} />
            <div id='deck'></div>
        </>
    );
}

export default App;
