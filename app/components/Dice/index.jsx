'use client'

import React, { useState } from 'react';
import Image from 'next/image';

const basePath = '/img/dice/'

const Dice = () => {
  const faces = ["1.png", "2.png", "3.png", "4.png", "5.png", "6.png"];
  const [currentFace, setCurrentFace] = useState(0);
  const [rolling, setRolling] = useState(false);
  const [spinDirection, setSpinDirection] = useState('');

  const rollDice = () => {
    setRolling(true);
    setSpinDirection(Math.random() > 0.5 ? 'animate-spin-clockwise' : 'animate-spin-counterclockwise');
    setTimeout(() => {
      const newFace = Math.floor(Math.random() * 6);
      setCurrentFace(newFace);
      setRolling(false);
    }, 1000);
  };

  return (
    <div className="flex items-center justify-center h-48 perspective-1000" onClick={rollDice}>
      <div className={`dice w-24 h-24 flex items-center justify-center text-4xl bg-white border border-gray-100 rounded-lg transition-transform duration-1000 transform-style-preserve-3d ${rolling ? spinDirection : ''}`}>
        <Image src={`${basePath}${faces[currentFace]}`} alt={`Face ${currentFace + 1}`} width={96} height={96} className="face front" />
        <Image src={`${basePath}${faces[1]}`} alt="Face 2" width={96} height={96} className="face back" />
        <Image src={`${basePath}${faces[2]}`} alt="Face 3" width={96} height={96} className="face left" />
        <Image src={`${basePath}${faces[3]}`} alt="Face 4" width={96} height={96} className="face right" />
        <Image src={`${basePath}${faces[4]}`} alt="Face 5" width={96} height={96} className="face top" />
        <Image src={`${basePath}${faces[5]}`} alt="Face 6" width={96} height={96} className="face bottom" />
      </div>
    </div>
  );
}

export default Dice;
