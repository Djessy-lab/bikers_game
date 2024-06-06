'use client'

import { Suspense } from 'react';
import GameBoard from '../components/GameBoard/index';
import { DiceProvider } from '../components/DiceContext';

const Game = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <DiceProvider>
      <GameBoard />
    </DiceProvider>
  </Suspense>
);

export default Game;
