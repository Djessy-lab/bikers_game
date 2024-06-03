import GameRules from "./components/GameRules";
import GoGame from "./components/GoGame";
import HomeHero from "./components/HomeHero";

export default function Home() {
  return (
    <div className="h-screen">
      <HomeHero />
      <GameRules />
      <GoGame />
    </div>
  );
}
