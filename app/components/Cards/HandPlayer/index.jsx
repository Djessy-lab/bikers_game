import React from 'react';
import CardRoad from '../CardRoad';

const HandPlayer = ({ playerHand, isHandSpread, onCardClick, selectedCardIndex }) => {
  return (
    <div className="player-hand">
      <div>
        <div className={`flex relative ${isHandSpread ? 'grid grid-cols-2 gap-0 max-lg:grid-cols-4' : ''}`}>
          {playerHand.map((card, cardIndex) => (
            <div key={cardIndex} onClick={() => onCardClick(cardIndex)} className={`card ${selectedCardIndex === cardIndex ? 'opacity-50' : ''}`}>
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
    </div>
  );
};

export default HandPlayer;
