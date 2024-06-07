import { Button } from '@/components/ui/button';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp } from 'lucide-react';

const PlayerActions = ({ drawCard, movePawn, pionPositions, currentPlayer }) => {
  return (
    <div className="flex flex-col">
      <Button className="mt-10 w-[200px]" onClick={drawCard}>Tirer une carte</Button>
      <div className="mt-4 flex items-center">
        <Button className="w-[3rem]" variant="secondary" onClick={() => movePawn(pionPositions[currentPlayer] - 5)}><ArrowUp /></Button>
        <Button className="w-[3rem]" variant="secondary" onClick={() => movePawn(pionPositions[currentPlayer] + 5)}><ArrowDown /></Button>
        <Button className="w-[3rem]" variant="secondary" onClick={() => movePawn(pionPositions[currentPlayer] - 1)}><ArrowLeft /></Button>
        <Button className="w-[3rem]" variant="secondary" onClick={() => movePawn(pionPositions[currentPlayer] + 1)}><ArrowRight /></Button>
      </div>
    </div>
  );
};

export default PlayerActions;
