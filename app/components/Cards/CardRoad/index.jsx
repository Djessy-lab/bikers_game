import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useDice } from '../../DiceContext/index';

const CardRoad = ({ card, style, isFaceUp, isOnBoard, rotationCount, setRotationCount, canRemoveCard, onRemoveCard, pionPositions, cardIndex, onActionComplete }) => {
  const [rotation, setRotation] = useState(0);
  const { diceValue } = useDice();

  useEffect(() => {
    if (card.id === 'fake') {
      setRotation(0);
    }
  }, [card]);

  const rotateAccess = (access, direction) => {
    if (direction === 'clockwise') {
      return [access[3], access[0], access[1], access[2]];
    } else if (direction === 'counterclockwise') {
      return [access[1], access[2], access[3], access[0]];
    }
    return access;
  };

  const rotateCardRight = () => {
    if (rotationCount > 0) {
      setRotation((prevRotation) => (prevRotation + 90) % 360);
      card.access = rotateAccess(card.access, 'clockwise');
      setRotationCount((prevCount) => prevCount - 1);
      if (rotationCount - 1 === 0) {
        onActionComplete();
      }
    }
  };

  const rotateCardLeft = () => {
    if (rotationCount > 0) {
      setRotation((prevRotation) => (prevRotation - 90 + 360) % 360);
      card.access = rotateAccess(card.access, 'counterclockwise');
      setRotationCount((prevCount) => prevCount - 1);
      if (rotationCount - 1 === 0) {
        onActionComplete();
      }
    }
  };

  const handleCardClick = () => {
    const isPionOnCard = pionPositions && pionPositions.includes(cardIndex);
    if (canRemoveCard && card.id !== 'fake' && card.name !== 'depart' && card.name !== 'arrivée' && card.name !== 'aide' && !isPionOnCard) {
      onRemoveCard();
      onActionComplete();
    } else if (isOnBoard && card.id !== 'fake' && card.name !== 'depart' && card.name !== 'arrivée' && card.name !== 'aide' && rotationCount > 0) {
      if (diceValue === 2) {
        rotateCardRight();
      } else if (diceValue === 5) {
        rotateCardLeft();
      }
    }
  };

  return (
    <div className='flex justify-center items-center mt-2' style={style}>
      <div className="relative w-32 h-32 max-lg:w-24 max-lg:h-20 perspective-1000 cursor-pointer" onClick={handleCardClick} style={{ transform: `rotate(${rotation}deg)` }}>
        <div className={`absolute w-full h-full rounded-sm shadow-md transform-style-preserve-3d transition-transform duration-1000 ${isFaceUp ? '' : 'rotate-y-180'}`}>
          <div className={
            `absolute
              w-full
              h-full
              rounded-sm
              shadow-md
              backface-hidden
              ${canRemoveCard
              && card.name !== 'depart'
              && card.name !== 'arrivée'
              && card.name !== 'aide'
              ? 'hover:border-[.2rem] hover:border-dashed hover:rounded-lg hover:border-red-500'
              : ''}`}>
            <div className="w-full h-full">
              <Image src={card.image} className='rounded-sm shadow-md max-lg:h-20 ' alt={card.name} width={200} height={200} priority />
            </div>
          </div>
          <div className="absolute w-full h-full bg-4 text-white flex flex-col items-center rounded-sm shadow-md backface-hidden rotate-y-180 ">
            <h2 className="text-2xl max-lg:text-lg max-lg:mt-0 font-bRiver text-1 mt-4">Carte route</h2>
            <Image src="/img/bikers.png" className='ml-4 max-lg:w-10 max-lg:h-10 ' alt="Card Back" width={70} height={70} priority />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardRoad;
