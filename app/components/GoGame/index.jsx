'use client'
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'

const GoGame = () => {
  const router = useRouter()
  return (
    <div>
      <h1 className="text-4xl font-bRiver text-center mt-10 mb-10">Est-ce que tu es prêt à jouer comme un vrai biker ?</h1>
      <div className="flex justify-center h-80">
        <Button size="lg" className="bg-5 hover:bg-3" onClick={() => router.push('/gameStart')}>Jouer</Button>
      </div>
    </div>
  )
}

export default GoGame
