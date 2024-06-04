'use client'

import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import Deck from '../Deck';
import HandPlayer from '../HandPlayer';

const CardRoadContainer = () => {
  const searchParams = useSearchParams();
  const players = parseInt(searchParams.get('players'), 10) || 2;

  const [playerHands, setPlayerHands] = useState([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [isHandSpread, setIsHandSpread] = useState(false);

  const switchPlayer = () => {
    setCurrentPlayerIndex((prevIndex) => (prevIndex + 1) % players);
    setIsHandSpread(false);
  };

  const toggleHandSpread = () => {
    setIsHandSpread(!isHandSpread);
  };

  return (
    <div className="relative">
      <button onClick={switchPlayer} className="mb-4 p-2 bg-green-500 text-white rounded">Changer de joueur</button>
      <HandPlayer playerHand={playerHands[currentPlayerIndex]} isHandSpread={isHandSpread} />
      <Deck players={players} setPlayerHands={setPlayerHands} />
    </div>
  );
};

export default CardRoadContainer;
