import Image from "next/image";

const PionBoard = ({ pion }) => {
  const animalImages = {
    lapine: "/img/pions/pionLapine.png",
    nounours: "/img/pions/pionNounours.png",
    louve: "/img/pions/pionLouve.png",
    sanglier: "/img/pions/pionSanglier.png",
  };

  return <Image src={animalImages[pion]} alt={`Pion de ${pion}`} width={50} height={50} />;
};

export default PionBoard;
