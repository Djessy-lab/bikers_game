import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import CardRoad from "../Cards/CardRoad";
import HandPlayer from "../Cards/HandPlayer";
import roadBoard from '../../datas/roadBoard';
import { Button } from '@/components/ui/button';
import Dice from '../Dice';
import CardActionStack from '../Cards/CardActionStack';
import PionsWithSuspense from '../Pions';
import Pieces from '../Pieces';
import { toast } from '@/components/ui/use-toast';
import EndGame from '../EndGame';


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

const initializeBoard = (playerHelp) => {
  const animalImages = {
    lapine: "/img/plateau/aideLapine.png",
    nounours: "/img/plateau/aideNounours.png",
    louve: "/img/plateau/aideLouve.png",
    sanglier: "/img/plateau/aideSanglier.png",
  };

  const board = Array(25).fill({ id: 'fake', name: 'Fake Card', image: '/img/logo.png' });
  board[0] = { id: 'depart', name: 'depart', image: '/img/plateau/depart.png' };
  board[24] = { id: 'arrivee', name: 'arrivée', image: '/img/plateau/arrivée.png' };

  playerHelp.forEach((help, index) => {
    const aideCard = { id: `aide${help}`, name: `aide${help}`, image: animalImages[help] };
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * 23) + 1;
    } while (board[randomIndex].id !== 'fake');
    board[randomIndex] = aideCard;
  });

  return board;
};

const GameBoard = () => {
  const searchParams = useSearchParams();
  const players = parseInt(searchParams.get('players'), 10) || 2;
  const playerNames = searchParams.get('names') ? searchParams.get('names').split(',') : Array(players).fill('Joueur');
  const playerPions = searchParams.get('animals') ? searchParams.get('animals').split(',') : Array(players).fill('Pion');

  const [deck, setDeck] = useState([]);
  const [playerHands, setPlayerHands] = useState([]);
  const [board, setBoard] = useState(initializeBoard(playerPions));
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
      toast({
        title: "Toutes les cartes ont été tirées !",
        description: "Il va falloir faire avec ce qu'il y a sur la table !",
      });
    }
  };

  const placeCardOnBoard = (cardIndex) => {
    const newPlayerHands = [...playerHands];
    const card = newPlayerHands[currentPlayer].splice(cardIndex, 1)[0];
    const newBoard = [...board];
    const emptyIndex = newBoard.findIndex(c => c.id === 'fake');
    if (emptyIndex !== -1) {
      newBoard[emptyIndex] = card;
    }
    setPlayerHands(newPlayerHands);
    setBoard(newBoard);
    endTurn();
  };

  const endTurn = () => {
    setCurrentPlayer((prevPlayer) => (prevPlayer + 1) % players);
  };



  return (
    <div className='flex flex-col '>
      <PionsWithSuspense />
      <Pieces />
      <div className="mt-10 flex max-lg:block">
        <div className="ml-10">
          <h1 className='text-2xl font-bRiver'>Au tour de : {playerNames[currentPlayer]} - {playerPions[currentPlayer]}</h1>
          {playerHands[currentPlayer] && (
            <>
              <HandPlayer
                playerHand={playerHands[currentPlayer]}
                isHandSpread={true}
                onCardClick={(cardIndex) => placeCardOnBoard(cardIndex)}
              />
              <div className="flex justify-center">
                <Button className="mt-10 w-[200px]" onClick={drawCard}>Tirer une carte</Button>
              </div>
            </>
          )}
        </div>
        <div className="mx-auto w-[50%] max-lg:w-full lg:ml-12">
          <div className="plateau grid grid-cols-5 gap-0">
            {board.map((card, index) => (
              <CardRoad key={index} card={card} isFaceUp={card.id !== 'fake'} />
            ))}
          </div>
        </div>
        <div className='w-[25%] flex flex-col'>
          <CardActionStack />
          <div className='mt-96'>
            <Dice />
          </div>
        </div>
      </div>
      <EndGame />
    </div>
  );
};

export default GameBoard;
