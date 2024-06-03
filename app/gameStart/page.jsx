'use client'

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"

const animalImages = {
  lapine: "/img/pions/pionLapine.png",
  nounours: "/img/pions/pionNounours.png",
  louve: "/img/pions/pionLouve.png",
  sanglier: "/img/pions/pionSanglier.png",
}

const GameStart = () => {
  const router = useRouter()
  const [players, setPlayers] = useState(null)
  const [playerNames, setPlayerNames] = useState([])
  const [playerAnimals, setPlayerAnimals] = useState([])
  const { toast } = useToast()

  const handleStartGame = () => {
    if (players && playerNames.length === parseInt(players) && playerAnimals.length === parseInt(players)) {
      const allNamesFilled = playerNames.every(name => name.trim() !== '')
      if (allNamesFilled) {
        router.push(`/game?players=${players}&names=${playerNames.join(',')}&animals=${playerAnimals.join(',')}`)
      } else {
        toast({
          title: "Nom manquant",
          description: "Tous les joueurs doivent entrer leur nom.",
        })
      }
    } else {
      toast({
        title: "Ou sont tes bikers ?",
        description: "Un biker ne roule pas en solo !",
      })
    }
  }

  const handleNameChange = (index, value) => {
    const newNames = [...playerNames]
    newNames[index] = value
    setPlayerNames(newNames)
  }

  const handleAnimalChange = (index, value) => {
    const newAnimals = [...playerAnimals]
    newAnimals[index] = value
    setPlayerAnimals(newAnimals)
  }

  const isAnimalSelected = (animal) => {
    return playerAnimals.includes(animal)
  }

  return (
    <div className="flex flex-col items-center">
      <div className="bg-3 h-96 flex flex-col justify-center items-center w-screen">
        <Link href="/">
          <Image src="/img/logo.png" alt="biker" width={100} height={100} />
        </Link>
        <h1 className="text-6xl font-bRiver mt-8 text-center">Combien de bikers dans la partie ?</h1>
        <div className="mt-8 w-full max-w-md">
          <Select onValueChange={(value) => {
            setPlayers(value)
            setPlayerNames(Array(parseInt(value)).fill(''))
            setPlayerAnimals(Array(parseInt(value)).fill(''))
          }}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Bikers" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2">2 - En Duo</SelectItem>
              <SelectItem value="3">3 - Comme des mousquetaires</SelectItem>
              <SelectItem value="4">4 - Une vraie bande de motards !</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="absolute left-0 top-[6.6rem] max-lg:top-[25rem] max-lg:left-[-5rem]">
        <Image src="/img/Lapine.png" alt="biker" width={200} height={100} />
      </div>
      <div className="absolute right-0 top-[6.6rem] max-lg:top-[25rem] max-lg:right-[-6rem]">
        <Image src="/img/Nounours.png" alt="biker" width={200} height={100} />
      </div>
      <div className="h-96 flex justify-center items-center flex-col w-full">
        <h2 className="text-3xl font-bRiver mb-4 text-center">Tout est bon ?</h2>
        {players && Array.from({ length: parseInt(players) }).map((_, index) => (
          <div key={index} className="mb-4 w-full max-w-md flex items-center">
            <Input
              className="mr-2"
              placeholder={`Nom du joueur ${index + 1}`}
              value={playerNames[index]}
              onChange={(e) => handleNameChange(index, e.target.value)}
            />
            <Select onValueChange={(value) => handleAnimalChange(index, value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Hero Biker" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lapine" disabled={isAnimalSelected('lapine')}>Lapine</SelectItem>
                <SelectItem value="nounours" disabled={isAnimalSelected('nounours')}>Nounours</SelectItem>
                <SelectItem value="louve" disabled={isAnimalSelected('louve')}>Louve</SelectItem>
                <SelectItem value="sanglier" disabled={isAnimalSelected('sanglier')}>Sanglier</SelectItem>
              </SelectContent>
            </Select>
            {playerAnimals[index] && (
              <Image
                src={animalImages[playerAnimals[index]]}
                alt={playerAnimals[index]}
                width={70}
                height={70}
                className="ml-2 rotate-90"
              />
            )}
          </div>
        ))}
        <Button size="lg" className="bg-3 hover:bg-5" onClick={handleStartGame}>Commencer la partie</Button>
      </div>
    </div>
  )
}

export default GameStart;
