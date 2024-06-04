'use client'

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from "next/link";
import { Home } from "lucide-react";
import CardRoad from "../components/Cards/CardRoad";
import HandPlayer from "../components/Cards/HandPlayer";
import roadBoard from '../datas/roadBoard';

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const getCardCount = (players) => {
  switch (players) {
    case 2: return 8;
    case 3: return 5;
    case 4: return 4;
    default: return 8;
  }
};

const Game = () => {
  const searchParams = useSearchParams();
  const players = parseInt(searchParams.get('players'), 10) || 2;
  const playerNames = searchParams.get('names') ? searchParams.get('names').split(',') : Array(players).fill('Joueur');
  const playerPions = searchParams.get('animals') ? searchParams.get('animals').split(',') : Array(players).fill('Pion');

  const [deck, setDeck] = useState([]);
  const [playerHands, setPlayerHands] = useState([]);
  const [board, setBoard] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(0);

  useEffect(() => {
    const cardCount = getCardCount(players);
    const shuffledDeck = shuffleArray([...roadBoard]);
    const hands = Array.from({ length: players }, (_, i) => shuffledDeck.slice(i * cardCount, (i + 1) * cardCount));
    const remainingDeck = shuffledDeck.slice(players * cardCount);

    setPlayerHands(hands);
    setDeck(remainingDeck);
  }, [players]);

  const drawCard = () => {
    if (deck.length > 0) {
      const newDeck = deck.slice(1);
      const newCard = deck[0];
      const newPlayerHands = [...playerHands];
      newPlayerHands[currentPlayer].push(newCard);

      setDeck(newDeck);
      setPlayerHands(newPlayerHands);
      endTurn();
    } else {
      alert("Toutes les cartes ont été tirées !");
    }
  };

  const placeCardOnBoard = (cardIndex) => {
    const newPlayerHands = [...playerHands];
    const card = newPlayerHands[currentPlayer].splice(cardIndex, 1)[0];
    setPlayerHands(newPlayerHands);
    setBoard([...board, card]);
    endTurn();
  };

  const endTurn = () => {
    setCurrentPlayer((prevPlayer) => (prevPlayer + 1) % players);
  };

  return (
    <div>
      <Link href="/">
        <Home className="w-6 h-6" />
      </Link>
      <h1>JEU</h1>
      <div className="mt-10">
        <h2>Pioche</h2>
        <div className="pioche" onClick={drawCard}>
          {deck.map((card, index) => (
            <CardRoad key={index} card={card} isFaceUp={false} style={{ position: 'absolute', top: `${index * 0.5}px`, left: `${index * 0.5}px`, zIndex: index }} />
          ))}
        </div>
      </div>
      <div className="mt-10">
        <h2>Plateau</h2>
        <div className="plateau grid grid-cols-5 gap-4">
          {board.map((card, index) => (
            <CardRoad key={index} card={card} isFaceUp={true} />
          ))}
        </div>
      </div>
      <div className="mt-10">
        <h2>{playerNames[currentPlayer]} - {playerPions[currentPlayer]} (Votre tour)</h2>
        {playerHands[currentPlayer] && (
          <>
            <HandPlayer
              playerHand={playerHands[currentPlayer]}
              isHandSpread={true}
              onCardClick={(cardIndex) => placeCardOnBoard(cardIndex)}
            />
            <button onClick={drawCard}>Tirer une carte</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Game;
