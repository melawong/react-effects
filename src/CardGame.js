import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Alert from "./Alert";
import Card from "./Card";

const BASE_API_URL = "http://deckofcardsapi.com/api/deck/";

/** Component for card-draw game
 *
 * props: none
 * state: deck, cards, isShuffling, deckFinished
 */
function CardGame() {

  // try to cut down how many states you have. put as much as you can into one object.
  // this example can have just one state 
  const [deck, setDeck] = useState(null);
  const [cards, setCards] = useState([]);
  const [isShuffling, setIsShuffling] = useState(false);
  const [deckFinished, setDeckFinished] = useState(false);

  useEffect(function getDeck() {
    async function createDeck() {
      const response = await axios.get(
        `${BASE_API_URL}/new/shuffle/?deck_count=1`
      );
      setDeck(response.data);
    }

    createDeck();
  }, []);

  /** Function checks if deck is finished, updates state as necessary
   *  If deck not finished, draws a new card and updates state
   */
  async function drawCard() {
    const response = await axios.get(
      BASE_API_URL + deck.deck_id + "/draw/?count=1"
    );

    if (response.data.remaining === 0) {
      setDeckFinished(true);
      return;
    }
    setCards([...cards, response.data.cards[0]]);
  }

  /** Function updates shuffling state and makes API call to shuffle deck */
  async function shuffleDeck() {
    setIsShuffling(true);
    const response = await axios.get(
      `${BASE_API_URL}/${deck.deck_id}/shuffle/`
    );
    setCards([]);
    setDeck(response.data);
    setIsShuffling(false);
    setDeckFinished(false);
  }

  return (
    <div>
      <button onClick={drawCard}>Draw Card</button>
      {isShuffling ? (
        <button disabled={true} onClick={shuffleDeck}>
          Shuffle The Deck
        </button>
      ) : (
        <button onClick={shuffleDeck}>Shuffle The Deck</button>
      )}

      {deckFinished ? (
        <Alert />
      ) : (
        <section className="cardSection">
          {cards.map((card) => (
            <Card card={card} key={card.code} />
          ))}
        </section>
      )}
    </div>
  );
}

export default CardGame;
