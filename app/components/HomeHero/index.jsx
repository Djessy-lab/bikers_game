import Image from "next/image"

const HomeHero = () => {
  return (
    <div>
      <h1 className="text-8xl text-center mt-10 font-bRiver">Bikers au grand cœur</h1>
      <h2 className="text-4xl text-center mt-10 font-bRiver">Le jeu en ligne</h2>
      <div className="flex justify-center items-center">
        <Image src="/img/bikers.png" alt="Bikers" width={500} height={500} />
      </div>
    </div>
  )
}

export default HomeHero
