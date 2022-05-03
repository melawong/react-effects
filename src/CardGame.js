import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

// baseURL

/** Component for card-draw game
 * state: deck, cards
 */
function CardGame() {
    const [deck, setDeck] = useState(null);
    const [cards, setCards] = useState([]);

    useEffect(function getDeck() {

        async function createDeck() {
            const response = await axios.get("http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
            setDeck(response.data);
        }

        createDeck();
    }, []);

    //make alert nicer using component or smth (disable button)
    async function drawCard() {
        if (deck.remaining === 0) return alert("No more cards to draw!");

        const response = await axios.get("http://deckofcardsapi.com/api/deck/" + deck.deck_id + "/draw/?count=1")
        setCards([...cards, response.data.cards[0]]);
        setDeck({...deck, ["remaining"] : response.data.remaining});
    }
    // make card component

    return (
        <div>
            <button onClick={drawCard}>Draw Card</button>

            {53 > cards.length > 0 && <section className="cardSection">
                {cards.map(card => <img key={card.code} className="card" src={card.image} ></img>)}
            </section>}
        </div>

    )
}

export default CardGame;