'use client'

import React, { useState, useEffect } from 'react';
import cards from '../../../datas/cards';
import CardAction from '../CardAction';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};


const CardActionStack = () => {
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
      toast({
        title: "Toutes les cartes ont été tirées !",
        description: "C'est le moment de se serrer les coudes !",
      });
    }
  };

  return (
    <div>
      <div className="relative">
        {Array.isArray(deck) && deck.map((card, index) => (
          <CardAction key={index} card={card} style={{ position: 'absolute', top: `${index * 0.5}px`, left: `${index * 0.5}px`, zIndex: deck.length - index }} />
        ))}
      </div>
      <div className="ml-20 mt-[25rem]">
        <Button onClick={drawCard}>Tirer une carte</Button>
      </div>
    </div>
  );
};

export default CardActionStack;
