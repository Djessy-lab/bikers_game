import React from 'react';
import Image from 'next/image';

const CardRoad = ({ card, style, isFaceUp }) => {
  return (
    <div className='flex justify-center items-center mt-10' style={style}>
      <div className="relative w-56 h-56 perspective-1000">
        <div className={`absolute w-full h-full rounded-sm shadow-md transform-style-preserve-3d transition-transform duration-1000 ${isFaceUp ? '' : 'rotate-y-180'}`}>
          <div className="absolute w-full h-full rounded-sm shadow-md backface-hidden">
            <Image src={card.image} className='rounded-sm shadow-md' alt={card.name} width={300} height={300} priority />
          </div>
          <div className="absolute w-full h-full bg-4 text-white flex justify-center items-center rounded-sm shadow-md backface-hidden rotate-y-180">
            <Image src="/img/logo.png" className='ml-4' alt="Card Back" width={200} height={200} priority />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardRoad;
