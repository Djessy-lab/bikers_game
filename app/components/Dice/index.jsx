'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import { useDice } from '../DiceContext/index';


const Dice = ({ onRoll, size }) => {
  const faces = [
    { value: 'suppr', src: "/img/dice/1.png" },
    { value: 'droite', src: "/img/dice/2.png" },
    { value: 'dist', src: "/img/dice/3.png" },
    { value: 'zero', src: "/img/dice/4.png" },
    { value: 'gauche', src: "/img/dice/5.png" },
    { value: 'dist', src: "/img/dice/6.png" }
  ];
  const [currentFace, setCurrentFace] = useState(0);
  const [rolling, setRolling] = useState(false);
  const [spinDirection, setSpinDirection] = useState('');
  const { setDiceValue } = useDice();

  const rollDice = () => {
    setRolling(true);
    setSpinDirection(Math.random() > 0.5 ? 'animate-spin-clockwise' : 'animate-spin-counterclockwise');
    setTimeout(() => {
      const newFace = Math.floor(Math.random() * faces.length);
      setCurrentFace(newFace);
      setDiceValue(newFace + 1);
      setRolling(false);
      onRoll(newFace + 1);
      console.log(newFace + 1);
      console.log(faces[newFace]);
    }, 1000);
  };

  const diceSize = size === 'small' ? 'w-16 h-16' : 'w-24 h-24';
  const imageSize = size === 'small' ? 64 : 96;
  const perspective = size === 'small' ? '' : 'perspective-1000';

  return (
    <div className={`flex items-center justify-center h-16 ${perspective}`} onClick={size !== 'small' ? rollDice : null}>
      <div className={`dice ${diceSize} flex items-center justify-center text-4xl bg-white border border-gray-100 rounded-lg transition-transform duration-1000 transform-style-preserve-3d ${rolling ? spinDirection : ''}`}>
        <Image src={faces[currentFace].src} alt={`Face ${currentFace + 1}`} width={imageSize} height={imageSize} className="face front" />
        <Image src={faces[1].src} alt="Face 2" width={imageSize} height={imageSize} className="face back" />
        <Image src={faces[2].src} alt="Face 3" width={imageSize} height={imageSize} className="face left" />
        <Image src={faces[3].src} alt="Face 4" width={imageSize} height={imageSize} className="face right" />
        <Image src={faces[4].src} alt="Face 5" width={imageSize} height={imageSize} className="face top" />
        <Image src={faces[5].src} alt="Face 6" width={imageSize} height={imageSize} className="face bottom" />
      </div>
    </div>
  );
}

export default Dice;
