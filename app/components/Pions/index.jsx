'use client'

import { useSearchParams } from 'next/navigation'
import Image from "next/image"
import { Suspense } from 'react'

const Pions = () => {
  const searchParams = useSearchParams()
  const animals = searchParams.get('animals')
  const names = searchParams.get('names')

  const pieces = animals ? animals.split(',') : []
  const playerNames = names ? names.split(',') : []

  return (
    <div className="flex">
      {pieces.map((piece, index) => (
        <div key={index} className="flex flex-col items-center">
          <Image src={`/img/pions/pion${piece}.png`} className='ml-4 rotate-90' alt={`Pièce de ${piece}`} width={100} height={100} priority />
          <p className="mt-10 ml-4 font-bRiver text-2xl">{playerNames[index]}</p>
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
