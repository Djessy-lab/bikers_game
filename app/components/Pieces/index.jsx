import { useState } from 'react';
import Image from "next/image";

const offsets = [
  { x: 10, y: 10 },
  { x: -10, y: 20 },
  { x: 15, y: -15 },
  { x: -20, y: -10 }
];

const pieces = [
  { name: "casque", src: "/img/pieces/casque.png" },
  { name: "essence", src: "/img/pieces/essence.png" },
  { name: "guidon", src: "/img/pieces/guidon.png" },
  { name: "roues", src: "/img/pieces/roues.png" }
];

const Pieces = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="relative h-32" onClick={handleClick} >
      {pieces.map((piece, index) => (
        <div
          key={index}
          className={`transition-all duration-500 ml-6 ${isExpanded ? `inline-block` : `absolute`}`}
          style={{
            left: isExpanded ? `${index * 110}px` : `${offsets[index].x}px`,
            top: isExpanded ? '0px' : `${offsets[index].y}px`,
            zIndex: pieces.length - index
          }}
        >
          <Image
            src={piece.src}
            alt="Pièce de moto"
            width={50}
            height={50}
            priority
          />
        </div>
      ))}
    </div>
  );
};

export default Pieces;
