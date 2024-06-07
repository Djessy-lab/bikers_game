import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { default as Image } from "next/image";
import { useState, useEffect } from "react";
import Chrono from "../../Chrono/index";
import { Button } from "@/components/ui/button";

const CardAction = ({ card, style, isTopCard, discardCard, endTurn }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [chronoStarted, setChronoStarted] = useState(false);
  const [chronoReset, setChronoReset] = useState(false);
  const [buttonText, setButtonText] = useState("Démarrer Chrono");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleCardClick = (e) => {
    if (e.target.tagName !== 'BUTTON') {
      setIsFlipped(!isFlipped);
      setIsAnimating(true);
      setIsDialogOpen(true);
      setIsAnimating(false);
    }
  };

  const handleChronoClick = (e) => {
    e.stopPropagation();
    if (!chronoStarted) {
      setChronoStarted(true);
      setChronoReset(false);
      setButtonText("Arrêter Chrono");
    } else {
      setChronoStarted(false);
      setChronoReset(true);
      setButtonText("Démarrer Chrono");
    }
  };

  const handleDiscardCard = () => {
    discardCard();
    setIsDialogOpen(false);
    setChronoStarted(false);
    setChronoReset(true);
    setButtonText("Démarrer Chrono");
    setTimeout(() => {
      endTurn();
    }, 500);
  };

  useEffect(() => {
    if (!isTopCard) {
      setIsFlipped(false);
      setChronoStarted(false);
      setChronoReset(true);
      setButtonText("Démarrer Chrono");
    }
  }, [isTopCard]);

  useEffect(() => {
    setChronoStarted(false);
    setChronoReset(true);
    setButtonText("Démarrer Chrono");
  }, [card]);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <div className='flex justify-center items-center mt-10' style={style}>
          <div className={`relative w-72 h-[21rem] max-lg:w-48 max-lg:h-[14rem] perspective-1000`} onClick={handleCardClick} style={{ transition: 'width 1s, height 1s' }}>
            <div className={`absolute w-full h-full rounded-sm shadow-md transform-style-preserve-3d transition-transform duration-1000`} >
              <div className={`absolute w-full h-full bg-4 text-white flex justify-center items-center rounded-sm shadow-sm backface-hidden`}>
                <div className="flex flex-col items-center">
                  <p className='text-4xl text-1 font-bRiver'>Carte Action</p>
                  <Image src="/img/bikers.png" className='ml-4' alt="Card Back" width={200} height={200} priority />
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="w-[32rem] h-[42rem] max-lg:w-[80%] max-lg:h-[90%]">
        <DialogHeader>
          <Button variant='secondary' onClick={handleDiscardCard}>Terminer !</Button>
          <DialogTitle className="text-4xl text-center font-bRiver">{card.category}</DialogTitle>
          {card.description && <DialogDescription className="text-md text-center">{card.description}</DialogDescription>}
        </DialogHeader>
        <div className="w-full h-full overflow-hidden">
          <div className="flex flex-col items-center">
            <Image src="/img/bikers.png" className='ml-4 mt-10' alt="Card Back" width={300} height={300} priority />
          </div>
          <div className="mt-10">
            {card.question && <p className="font-bold text-mg">{card.question}</p>}
            {card.action && <p className="text-sm">{card.action}</p>}
            {card.answers && (
              <ol>
                {card.answers.map((answer, index) => (
                  <li key={index} className='list-decimal text-sm text-left font-bold'>{answer.label}</li>
                ))}
              </ol>
            )}
            {card.imgPath && <Image src={card.imgPath} alt="Card Image Bloqué" width={150} height={150} className="mx-auto rounded-md" priority />}
          </div>
          <div className="mt-4">
            {card.chrono && (
              <div className='flex flex-col items-center'>
                <Button className='mb-2' onClick={handleChronoClick}>{buttonText}: {card.chrono} secondes</Button>
                <Chrono chrono={card.chrono} isRunning={chronoStarted} reset={chronoReset} />
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CardAction;
