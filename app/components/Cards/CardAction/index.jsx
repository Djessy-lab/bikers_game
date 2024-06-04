'use client'

import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../../../components/ui/card';
import cards from '../../../datas/cards';

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const CardAction = ({ card, style }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className='flex justify-center items-center mt-10' style={style}>
      <div className="relative w-72 h-96 perspective-1000" onClick={handleCardClick}>
        <div className={`absolute w-full h-full rounded-sm shadow-md transform-style-preserve-3d transition-transform duration-1000 ${isFlipped ? 'rotate-y-180' : ''}`}>
          <div className={`absolute w-full h-full bg-4 text-white flex justify-center items-center rounded-sm shadow-md backface-hidden`}>
            <div className="flex flex-col items-center">
              <p className='text-4xl text-1 font-bRiver'>Carte Action</p>
              <Image src="/img/bikers.png" className='ml-4' alt="Card Back" width={200} height={200} priority />
            </div>
          </div>
          <div className={`absolute w-full h-full rounded-sm shadow-md backface-hidden rotate-y-180`}>
            <Card className="w-full h-full overflow-hidden">
              <CardHeader>
                <CardTitle>{card.category}</CardTitle>
                {card.description && <CardDescription>{card.description}</CardDescription>}
              </CardHeader>
              <CardContent className="overflow-y-auto">
                {card.question && <p>{card.question}</p>}
                {card.action && <p>{card.action}</p>}
                {card.answers && (
                  <ul>
                    {card.answers.map((answer, index) => (
                      <li key={index}>{answer.label}</li>
                    ))}
                  </ul>
                )}
              </CardContent>
              <CardFooter>
                {card.chrono && <p className='font-bold'>Chrono: {card.chrono} secondes</p>}
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

const CardActionContainer = () => {
  const [deck, setDeck] = useState([]);

  useEffect(() => {
    setDeck(shuffleArray([...cards]));
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
        <CardAction key={index} card={card} style={{ position: 'absolute', top: `${index * 0.5}px`, left: `${index * 0.5}px`, zIndex: deck.length - index }} />
      ))}
    </div>
  );
};

export default CardActionContainer;
