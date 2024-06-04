'use client'

import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import roadBoard from '../../../datas/roadBoard';

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const CardBoard = ({ card, style }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className='flex justify-center items-center mt-10' style={style}>
      <div className="relative w-56 h-56 perspective-1000" onClick={handleCardClick}>
        <div className={`absolute w-full h-full rounded-sm shadow-md transform-style-preserve-3d transition-transform duration-1000 ${isFlipped ? 'rotate-y-180' : ''}`}>
          <div className={`absolute w-full h-full bg-4 text-white flex justify-center items-center rounded-sm shadow-md backface-hidden`}>
            <Image src="/img/logo.png" className='ml-4' alt="Card Back" width={200} height={200} priority />
          </div>
          <div className={`absolute w-full h-full rounded-sm shadow-md backface-hidden rotate-y-180`}>
            <Image src={card.image} className='rounded-sm shadow-md' alt={card.name} width={300} height={300} priority />
          </div>
        </div>
      </div>
    </div>
  );
};

const CardBoardContainer = () => {
  const [deck, setDeck] = useState([]);

  useEffect(() => {

    setDeck(shuffleArray([...roadBoard]));
  }, []);

  const [currentCard, setCurrentCard] = useState(null);

  useEffect(() => {
    if (deck.length > 0) {
      setCurrentCard(deck[0]);
    }
  }, [deck]);

  const drawCard = () => {
    if (deck.length > 1) {
      const newDeck = deck.slice(1);
      setDeck(newDeck);
      setCurrentCard(newDeck[0]);
    } else {
      alert("Toutes les cartes ont été tirées !");
    }
  };

  return (
    <div className="relative">
      <button onClick={drawCard} className="mb-4 p-2 bg-blue-500 text-white rounded">Tirer une carte</button>
      {Array.isArray(deck) && deck.map((card, index) => (
        <CardBoard key={index} card={card} style={{ position: 'absolute', top: `${index * 0.5}px`, left: `${index * 0.5}px`, zIndex: deck.length - index }} />
      ))}
    </div>
  );
};

export default CardBoardContainer;
