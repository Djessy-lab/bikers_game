import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { default as Image } from "next/image";
import { useState, useEffect } from "react";
import Chrono from "../../Chrono/index";
import { Button } from "@/components/ui/button";

const CardAction = ({ card, style, isTopCard }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [chronoStarted, setChronoStarted] = useState(false);
  const [chronoReset, setChronoReset] = useState(false);
  const [buttonText, setButtonText] = useState("Démarrer Chrono");

  const handleCardClick = (e) => {
    if (e.target.tagName !== 'BUTTON') {
      setIsFlipped(!isFlipped);
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
    <div className='flex justify-center items-center mt-10' style={style}>
      <div className={`relative w-72 h-[21rem] max-lg:w-48 max-lg:h-[14rem] perspective-1000 ${isFlipped ? 'max-lg:w-[22rem] max-lg:h-[22rem]' : ''}`} onClick={handleCardClick} style={{ transition: 'width 1s, height 1s' }}>
        <div className={`absolute w-full h-full rounded-sm shadow-md transform-style-preserve-3d transition-transform duration-1000 ${isFlipped ? 'rotate-y-180' : ''}`} >
          <div className={`absolute w-full h-full bg-4 text-white flex justify-center items-center rounded-sm shadow-sm backface-hidden`}>
            <div className="flex flex-col items-center">
              <p className='text-4xl text-1 font-bRiver'>Carte Action</p>
              <Image src="/img/bikers.png" className='ml-4' alt="Card Back" width={200} height={200} priority />
            </div>
          </div>
          <div className={`absolute w-full h-full rounded-sm shadow-md backface-hidden rotate-y-180`}>
            <Card className="w-full h-full overflow-hidden">
              <CardHeader>
                <CardTitle><h3 className='text-xl text-center'>{card.category}</h3></CardTitle>
                {card.description && <CardDescription>{card.description}</CardDescription>}
              </CardHeader>
              <CardContent >
                {card.question && <p className="font-bold text-sm">{card.question}</p>}
                {card.action && <p className="text-sm">{card.action}</p>}
                {card.answers && (
                  <ol>
                    {card.answers.map((answer, index) => (
                      <li key={index} className='list-decimal  text-left'>{answer.label}</li>
                    ))}
                  </ol>
                )}
                {card.imgPath && <Image src={card.imgPath} alt="Card Image Bloqué" width={200} height={200} className="mx-auto" priority />}
              </CardContent>
              <CardFooter>
                {card.chrono && (
                  <div className='flex flex-col items-center'>
                    <Button className='mb-2' onClick={handleChronoClick}>{buttonText}: {card.chrono} secondes</Button>
                    <Chrono chrono={card.chrono} isRunning={chronoStarted} reset={chronoReset} />
                  </div>
                )}
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardAction;
