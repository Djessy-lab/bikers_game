import React from 'react';
import CardRoad from '../CardRoad';

const HandPlayer = ({ playerHand, isHandSpread, onCardClick }) => {
  return (
    <div className="player-hand">
      <div className={`flex mt-96 relative ${isHandSpread ? 'grid grid-cols-4 gap-4' : ''}`}>
        {playerHand.map((card, cardIndex) => (
          <div key={cardIndex} onClick={() => onCardClick(cardIndex)}>
            <CardRoad
              card={card}
              isFaceUp={isHandSpread}
              style={{
                position: isHandSpread ? 'relative' : 'absolute',
                top: isHandSpread ? 'auto' : `${cardIndex * 0.5}px`,
                left: isHandSpread ? 'auto' : `${cardIndex * 0.5}px`,
                zIndex: isHandSpread ? 0 : cardIndex,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HandPlayer;
