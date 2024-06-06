import React from 'react';
import Image from 'next/image';

const CardRoad = ({ card, style, isFaceUp }) => {
  return (
    <div className='flex justify-center items-center mt-2' style={style}>
      <div className="relative w-32 h-32 max-lg:w-24 max-lg:h-20 perspective-1000">
        <div className={`absolute w-full h-full rounded-sm shadow-md transform-style-preserve-3d transition-transform duration-1000 ${isFaceUp ? '' : 'rotate-y-180'}`}>
          <div className="absolute w-full h-full rounded-sm shadow-md backface-hidden">
            <Image src={card.image} className='rounded-sm shadow-md' alt={card.name} width={200} height={200} priority />
          </div>
          <div className="absolute w-full h-full bg-4 text-white flex flex-col items-center rounded-sm shadow-md backface-hidden rotate-y-180">
            <h2 className="text-2xl font-bRiver text-1 mt-4">Carte route</h2>
            <Image src="/img/bikers.png" className='ml-4' alt="Card Back" width={70} height={70} priority />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardRoad;
