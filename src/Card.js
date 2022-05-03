import React from "react";

/** Displays a single card
 *
 * state: none
 * props: card
 */
function Card({ card }) {
  return <img className="card" src={card.image} alt="card"></img>;
}

export default Card;
