import axios from 'axios';
import { useState, useEffect } from 'react';
import Card from './Card';
import './Deck.css';

/** DeckOfCards - draw from a deck of cards 
 * 
 * Props: none
 * 
 * State: deck, cards, isShuffling
 * 
*/

const DeckOfCards = () => {
    const [deck, setDeck] = useState(null);
    const [cards, setCards] = useState([]);
    const [isShuffling, setIsShuffling] = useState(false);

    useEffect(()=> {
        const fetchDeck = async () => {
            try {
                const res = await axios.get(`https://deckofcardsapi.com/api/deck/new/shuffle`)
                setDeck(res.data)
            }
            catch (error) {
                console.error("Error fetching deck: ", error)
            }
        }
        fetchDeck();
    }, []);

    
    const drawCard = async () => {
        try {
            const res = await axios.get(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw`);
            if (res.data.remaining === 0) throw new Error('out of cards');
            setCards(prevCards => [...prevCards, res.data.cards[0]]);
        } catch(error) {
            console.error("Error drawing card: ", error)
        }
    }   

    const shuffleCards = async () => {
        try {
            setIsShuffling(true)
            await axios.get(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/shuffle/`);
            setCards([])
        } catch (error) {
            console.error("Error shuffling deck: ", error);
        } finally {
            setIsShuffling(false);
        }
    }

    return (
        <div>
            <div>
                Deck of Cards
            </div>
            {deck && <button disabled={isShuffling} onClick={drawCard}>Draw Card</button>}
            
            {<button onClick={shuffleCards}>Shuffle Cards</button>}
            <div className='card-area'>
                {cards.map(card => <Card key={card.code} image={card.image} />)}
            </div>
        </div>
    )
}

export default DeckOfCards;