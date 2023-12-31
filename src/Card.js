import { useState } from 'react';
import './Card.css';

/** Card - single card from a deck
 * 
 * Props: card
 * 
 * State: 
 * 
*/

const Card = ( {image} ) => {
   
    const [{ angle, xPos, yPos }] = useState({
        angle: Math.random() * 90 - 45,
        xPos: Math.random() * 40 - 20,
        yPos: Math.random() * 40 - 20
        })

    const transform = `translate(${xPos}px, ${yPos}px) rotate(${angle}deg)`;


    return (
        <img className="Card" src={image} alt='a card from deck' style={{ transform }}></img>
    )
}

export default Card;