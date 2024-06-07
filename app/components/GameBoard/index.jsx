import React, { useState, useEffect, Suspense, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import CardRoad from "../Cards/CardRoad";
import HandPlayer from "../Cards/HandPlayer";
import roadBoard from '../../datas/roadBoard';
import Dice from '../Dice';
import CardActionStack from '../Cards/CardActionStack';
import Pieces from '../Pieces';
import { toast } from '@/components/ui/use-toast';
import EndGame from '../EndGame';
import Pions from '../Pions';
import PionBoard from '../PionBoard';
import WinGame from '../WinGame';
import PlayerActions from '../PlayerActions';

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
  const helpImages = {
    lapine: "/img/plateau/aideLapine.png",
    nounours: "/img/plateau/aideNounours.png",
    louve: "/img/plateau/aideLouve.png",
    sanglier: "/img/plateau/aideSanglier.png",
  };

  const board = Array(25).fill({ id: 'fake', name: 'Fake Card', image: '/img/logo.png', access: [false, false, false, false] });
  board[0] = { id: 'depart', name: 'depart', image: '/img/plateau/depart.png', access: [true, true, true, true] };
  board[24] = { id: 'arrivee', name: 'arrivée', image: '/img/plateau/arrivée.png', access: [true, true, true, true] };

  const availableIndices = [];
  for (let i = 1; i < 24; i++) {
    availableIndices.push(i);
  }

  const shuffledIndices = shuffleArray(availableIndices);

  playerHelp.forEach((help, index) => {
    const aideCard = { id: 'aide', name: 'aide', image: helpImages[help], access: [true, true, true, true] };
    const cardIndex = shuffledIndices[index];
    board[cardIndex] = aideCard;
  });

  return board;
};

const GameBoard = () => {
  const searchParams = useSearchParams();
  const players = parseInt(searchParams.get('players'), 10) || 2;
  const playerNames = searchParams.get('names') ? searchParams.get('names').split(',') : Array(players).fill('Joueur');

  const playerPions = useMemo(() => {
    return searchParams.get('animals') ? searchParams.get('animals').split(',') : Array(players).fill('Pion');
  }, [searchParams, players]);

  const [deck, setDeck] = useState([]);
  const [playerHands, setPlayerHands] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [pionPositions, setPionPositions] = useState(Array(players).fill(0));
  const [isWinGameOpen, setIsWinGameOpen] = useState(false);
  const [chrono, setChrono] = useState(null);
  const [rotationCount, setRotationCount] = useState(0);
  const [canRemoveCard, setCanRemoveCard] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [board, setBoard] = useState([]);

  useEffect(() => {
    setBoard(initializeBoard(playerPions));
  }, [playerPions]);

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

  const movePawn = (newPosition) => {
    const currentPosition = pionPositions[currentPlayer];
    const currentCard = board[currentPosition] || { access: [false, false, false, false] };
    const newCard = board[newPosition] || { access: [false, false, false, false] };

    const isMoveValid = (currentPos, newPos) => {
      if (newPos < 0 || newPos >= board.length) {
        return false;
      }

      if (!currentCard || !newCard) {
        return false;
      }

      if (!currentCard.access || !newCard.access) {
        return false;
      }

      const direction = newPos - currentPos;
      switch (direction) {
        case -5:
          return currentCard.access[0] && newCard.access[2];
        case 5:
          return currentCard.access[2] && newCard.access[0];
        case -1:
          return currentCard.access[3] && newCard.access[1];
        case 1:
          return currentCard.access[1] && newCard.access[3];
        default:
          return false;
      }
    };

    if (isMoveValid(currentPosition, newPosition)) {
      setPionPositions((prevPositions) => {
        const newPositions = [...prevPositions];
        newPositions[currentPlayer] = newPosition;
        return newPositions;
      });
      endTurn();
    } else {
      toast({
        title: "Déplacement impossible !",
        description: "Vous ne pouvez pas vous déplacer dans cette direction.",
      });
    }
  };

  const handleCardClick = (cardIndex) => {
    setSelectedCard({ cardIndex, card: playerHands[currentPlayer][cardIndex] });
  };

  const handleBoardClick = (boardIndex) => {
    if (selectedCard && board[boardIndex].id === 'fake') {
      const newPlayerHands = [...playerHands];
      newPlayerHands[currentPlayer].splice(selectedCard.cardIndex, 1);
      const newBoard = [...board];
      newBoard[boardIndex] = selectedCard.card;

      setPlayerHands(newPlayerHands);
      setBoard(newBoard);
      setSelectedCard(null);
      setChrono(selectedCard.card.chrono || null);
      endTurn();
    } else if (board[boardIndex].id === 'aide') {
      return false
    }
  };

  const removeCardFromBoard = (cardIndex) => {
    const newBoard = [...board];
    newBoard[cardIndex] = { id: 'fake', name: 'Fake Card', image: '/img/bikers.png' };
    setBoard(newBoard);
    setCanRemoveCard(false);
  };

  useEffect(() => {
    if (pionPositions.every(position => position === board.length - 1)) {
      setIsWinGameOpen(true);
    }
  }, [pionPositions, board.length]);

  const endTurn = () => {
    setCurrentPlayer((prevPlayer) => {
      const nextPlayer = (prevPlayer + 1) % players;
      if (pionPositions[nextPlayer] === board.length - 1) {
        return (nextPlayer + 1) % players;
      }
      return nextPlayer;
    });
    setRotationCount(0);
    setCanRemoveCard(false);
  };

  const handleRoll = (diceValue) => {
    if (diceValue === 2 || diceValue === 6) {
      setRotationCount(2);
    } else if (diceValue === 1) {
      setCanRemoveCard(true);
    } else if (diceValue === 3) {
      setTimeout(() => {
        distributeCardsToAllPlayers();
      }, 1000);
    } else {
      setRotationCount(0);
      setCanRemoveCard(false);
      setTimeout(() => {
        endTurn();
      }, 1000);
    }
  };

  const distributeCardsToAllPlayers = () => {
    setPlayerHands((prevHands) => {
      const newHands = prevHands.map((hand) => {
        if (deck.length > 0) {
          const newDeck = [...deck];
          const newCard = newDeck.shift();
          setDeck(newDeck);
          return [...hand, newCard];
        }
        return hand;
      });
      return newHands;
    });
    endTurn();
  };

  const handleCardActionComplete = () => {
    setTimeout(() => {
      endTurn();
    }, 1000);
  };

  const allPlayersAtEnd = pionPositions.every(position => position === board.length - 1);
  const currentPionPosition = pionPositions[currentPlayer];
  const nextPionPosition = currentPionPosition + 1;
  const canMove = nextPionPosition < board.length && board[nextPionPosition].id !== 'fake';

  return (
    <div className='flex flex-col'>
      {allPlayersAtEnd && <WinGame isOpen={isWinGameOpen} onClose={() => setIsWinGameOpen(false)} />}
      <div className='fixed top-0 right-20 z-50'>
        <EndGame />
      </div>
      <div className="mt-10 flex max-lg:block">
        <div className="ml-10">
          <h1 className='text-2xl font-bRiver'>Au tour de : {playerNames[currentPlayer]} - {playerPions[currentPlayer]}</h1>
          {playerHands[currentPlayer] && (
            <>
              <HandPlayer
                playerHand={playerHands[currentPlayer]}
                isHandSpread={true}
                onCardClick={handleCardClick}
                selectedCardIndex={selectedCard ? selectedCard.cardIndex : null}
              />
              <PlayerActions
                drawCard={drawCard}
                movePawn={movePawn}
                pionPositions={pionPositions}
                currentPlayer={currentPlayer}
              />
            </>
          )}
        </div>
        <div className="mx-auto w-[50%] max-lg:w-full lg:ml-12">
          <div className="plateau grid grid-cols-5 gap-0">
            {board.map((card, index) => (
              <div
                key={index}
                className={`relative ${selectedCard && board[index].id === 'fake' ? 'hover:opacity-50' : ''}`}
                onClick={() => handleBoardClick(index)}
              >
                <CardRoad
                  card={card}
                  isFaceUp={card.id !== 'fake'}
                  isOnBoard={true}
                  rotationCount={rotationCount}
                  setRotationCount={setRotationCount}
                  canRemoveCard={canRemoveCard}
                  onRemoveCard={() => removeCardFromBoard(index)}
                  pionPositions={pionPositions}
                  cardIndex={index}
                  onActionComplete={handleCardActionComplete}
                />
                {pionPositions.map((position, pionIndex) => (
                  position === index && (
                    <div
                      key={pionIndex}
                      className="absolute z-50"
                      style={{
                        top: pionIndex % 2 === 0 ? '0' : '50%',
                        left: pionIndex < 2 ? '0' : '50%',
                        transform: 'translate(30%, -15%)'
                      }}
                    >
                      <PionBoard pion={playerPions[pionIndex]} />
                    </div>
                  )
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className='w-[25%] flex flex-col lg:ml-10'>
          <CardActionStack endTurn={endTurn} />
          <div className='flex justify-around'>
            <Dice onRoll={handleRoll} />
            <Pions />
          </div>
          <div className='w-full'>
            <Pieces />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
