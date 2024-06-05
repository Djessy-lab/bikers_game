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

const Pion = () => {
  const searchParams = useSearchParams()
  const animals = searchParams.get('animals')
  const names = searchParams.get('names')

  const pieces = animals ? animals.split(',') : []
  const playerNames = names ? names.split(',') : []

  return (
    <div className="flex">
      {pieces.map((piece, index) => (
        <div key={index} className="flex flex-col items-center justify-center m-4">
          <Image src={animalImages[piece]} alt={`Pièce de ${piece}`} width={50} height={50} priority />
          <p className="text-2xl font-bRiver text-center">{playerNames[index]}</p>
        </div>
      ))}
    </div>
  )
}

const Pions = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Pion />
  </Suspense>
)

export default Pions
