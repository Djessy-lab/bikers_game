'use client'

import { useSearchParams } from 'next/navigation'
import Image from "next/image"

const basePath = '/img/pions/pion'

const Pions = () => {
  const searchParams = useSearchParams()
  const animals = searchParams.get('animals')
  const names = searchParams.get('names')

  // Si animals est une chaîne, la convertir en tableau
  const pieces = animals ? animals.split(',') : []
  const playerNames = names ? names.split(',') : []

  return (
    <div className="flex">
      {pieces.map((piece, index) => (
        <div key={index} className='flex flex-col items-center'>
          <Image src={`${basePath}${piece}.png`} className='ml-4 rotate-90' alt={`Pièce de ${piece}`} width={100} height={100} priority />
          <p className='mt-8 ml-4 text-2xl font-bRiver'>{playerNames[index]}</p>
        </div>
      ))}
    </div>
  )
}

export default Pions
