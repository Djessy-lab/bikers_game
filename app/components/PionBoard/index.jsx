import Image from "next/image";

const PionBoard = ({ pion, pionIndex, currentPlayer }) => {
  const animalImages = {
    lapine: "/img/pions/pionLapine.png",
    nounours: "/img/pions/pionNounours.png",
    louve: "/img/pions/pionLouve.png",
    sanglier: "/img/pions/pionSanglier.png",
  };

  return (
    <Image
      src={animalImages[pion]}
      alt={`Pion de ${pion}`}
      width={40}
      height={40}
      className="z-50 max-lg:w-10 max-lg:h-10"
      style={
        pionIndex === currentPlayer
          ? { filter: 'drop-shadow(0 0 15px rgba(255, 165, 0, 1))' }
          : {}
      }
    />
  );
};

export default PionBoard;
