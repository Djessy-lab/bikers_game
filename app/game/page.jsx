'use client'

import { Suspense } from 'react';
import GameBoard from '../components/GameBoard';

const Game = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <GameBoard />
  </Suspense>
);

export default Game;
