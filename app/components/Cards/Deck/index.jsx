import React, { useState, useEffect } from 'react';
import CardRoad from '../CardRoad';
import roadBoard from '../../../datas/roadBoard';

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const Deck = ({ setDeck }) => {
  const [deck, setLocalDeck] = useState([]);

  useEffect(() => {
    const shuffledDeck = shuffleArray([...roadBoard]);
    setLocalDeck(shuffledDeck);
    setDeck(shuffledDeck);
  }, [setDeck]);

  return (
    <div className="pioche">
      {deck.map((card, index) => (
        <CardRoad
          key={index}
          card={card}
          isFaceUp={false}
          style={{
            position: 'absolute',
            top: `${index * 0.5}px`,
            left: `${index * 0.5}px`,
            zIndex: deck.length - index,
          }}
        />
      ))}
    </div>
  );
};

export default Deck;
