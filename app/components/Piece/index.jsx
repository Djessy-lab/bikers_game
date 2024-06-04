import Image from "next/image"

const basePath = '/img/pieces/'
const pieces = ['casque.png', 'essence.png', 'guidon.png', 'roues.png']

const Piece = () => {
  return (
    <div className="flex">
      {pieces.map((piece, index) => (
        <Image key={index} src={`${basePath}${piece}`} className='ml-4' alt="Pièce de moto" width={100} height={100} priority />
      ))}
    </div>
  )
}

export default Piece
