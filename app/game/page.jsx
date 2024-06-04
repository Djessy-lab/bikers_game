import Link from "next/link"
import { Home } from "lucide-react"
import CardBoard from "../components/Cards/CardBoard"
import CardAction from "../components/Cards/CardAction"
import Piece from "../components/Piece"
import Pions from "../components/Pions"
import Dice from "../components/Dice"


const Game = () => {
  return (
    <div>
      <Link href="/">
        <Home className="w-6 h-6" />
      </Link>
      <h1>JEU</h1>
      <div className="flex justify-around items-center">
        <CardBoard />
        <CardAction />
      </div>
      <div className="mt-96">
        <Piece />
      </div>
      <div className="mt-10">
        <Pions />
      </div>
      <div>
        <Dice />
      </div>
    </div>
  )
}

export default Game
