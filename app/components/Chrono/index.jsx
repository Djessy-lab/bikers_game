'use client'

import { Progress } from "@/components/ui/progress"
import { useEffect, useState } from "react"

const Chrono = ({ chrono, isRunning, reset }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + 100 / (chrono * 10);
          if (newProgress >= 100) {
            clearInterval(interval);
            return 100;
          }
          return newProgress;
        });
      }, 100);
    } else if (!isRunning && progress !== 0 && progress !== 100) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, chrono, progress]);

  useEffect(() => {
    if (reset) {
      setProgress(0);
    }
  }, [reset]);

  return (
    <div className="w-full">
      <Progress value={progress} />
      {progress === 100 && <p className='text-red-500'>Temps écoulé ⏱️</p>}
    </div>
  )
}

export default Chrono
