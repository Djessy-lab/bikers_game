'use client'

import { useSearchParams } from 'next/navigation'
import Image from "next/image"
import { Suspense } from 'react'

const animalImages = {
  lapine: "/img/pions/pionLapine.png",
  nounours: "/img/pions/pionNounours.png",
  louve: "/img/pions/pionLouve.png",
  sanglier: "/img/pions/pionSanglier.png",
}

const Pions = () => {
  const searchParams = useSearchParams()
  const animals = searchParams.get('animals')
  const names = searchParams.get('names')

  const pieces = animals ? animals.split(',') : []
  const playerNames = names ? names.split(',') : []

  return (
    <div className="flex">
      {pieces.map((piece, index) => (
        <div key={index} className="flex flex-col items-center m-4">
          <Image src={animalImages[piece]} className='rotate-90' alt={`Pièce de ${piece}`} width={100} height={100} priority />
          <p className="mt-10 text-2xl font-bRiver text-center">{playerNames[index]}</p>
        </div>
      ))}
    </div>
  )
}

const PionsWithSuspense = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Pions />
  </Suspense>
)

export default PionsWithSuspense
