import React from 'react';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog';
import Confetti from 'react-confetti';

const WinGame = ({ isOpen, onClose }) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <div style={{ position: 'relative', zIndex: 1000 }}>
        <Confetti
          width={2000}
          height={2000}
          numberOfPieces={300}
        />
      </div>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Félicitations !</AlertDialogTitle>
          <AlertDialogDescription>
            Vous avez atteint la case d&apos;arrivée. Que souhaitez-vous faire ensuite ?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => window.location.href = '/'}>Retour à l&apos;accueil</AlertDialogCancel>
          <AlertDialogAction onClick={() => window.location.reload()}>Rejouer</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default WinGame;
