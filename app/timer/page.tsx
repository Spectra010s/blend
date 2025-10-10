'use client'

import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Pause } from "lucide-react";

export default function Timer() {
    const [sec, setSec] = useState(0)
    const [min, setMin] = useState(0)
    const [hour, setHour] = useState(0)
    const interval = useRef<ReturnType<typeof setInterval> | null>(null)
    const [time, setTime] = useState<number |null>(null)
    const [isRunning, setIsRunning] = useState(false)
    const minsec = min * 60
    const hoursec = hour * 3600
    const [isPauseorplay, setIsPauseorplay] = useState(false)
    
    const seconds: number[] = Array.from({length: 60}, (_, i) => i)
    const minutes: number[] = Array.from({length: 60}, (_, i) => i)
    const hours: number[] = Array.from({length: 24}, (_, i) => i)

    function startTimer() {
        if (hour === 0 && min === 0 && sec === 0) return;
        if (isRunning) return;
        setIsRunning(true)
        setIsPauseorplay(true)
        const totalSeconds = hoursec + minsec + sec

        if (totalSeconds <= 0) return;

        setTime(totalSeconds);

        interval.current = setInterval(() => {
          setTime(prevTime => {
            if (prevTime === null || prevTime <= 0) {
              clearInterval(interval.current!);
              interval.current = null;
              setIsRunning(false)
              setIsPauseorplay(false)
              return 0;
            }
            return prevTime - 1;
          });
        }, 1000);
      }

    const pauseTimer = () => {
      if(interval.current) {
        clearInterval(interval.current)
        interval.current = null
      }
      
      setIsRunning(false)
    }

    const resumeTimer = () => {
     if (isRunning || time === null || time <= 0) return;
          
            setIsRunning(true);
          
            interval.current = setInterval(() => {
              setTime(prevTime => {
                if (prevTime === null || prevTime <= 0) {
                  clearInterval(interval.current!);
                  interval.current = null;
                  setIsRunning(false);
                  return 0;
                }
                return prevTime - 1; 
              });
            }, 1000);
    };
    
    const resetTimer = () => {
        pauseTimer()
        setTime(null)
        setIsRunning(false)
       setIsPauseorplay(false)
    }

    const convertSecondsToTime = (seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;
        return `${hours}:${minutes}:${remainingSeconds}`;
    }

    return (
        <main className="min-h-screen bg-background">
        <div className=" absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col gap-10 m-3 items-center justify-center">
            <div className="flex flex-row gap-2 justify-center">
                <select value={hour} onChange={(e) => setHour(Number(e.target.value))}>
                    {hours.map((hour) => (
                        <option key={hour} value={hour}>
                            {hour}
                        </option>
                    ))}
                </select>
                <select value={min} onChange={(e) => setMin(Number(e.target.value))}>
                    {minutes.map((minute) => (
                        <option key={minute} value={minute}>
                            {minute}
                        </option>
                    ))}
                </select>
                <select value={sec} onChange={(e) => setSec(Number(e.target.value))}>
                    {seconds.map((second) => (
                        <option key={second} value={second}>
                            {second}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex flex-1">{time ? convertSecondsToTime(time) : "00:00:00"}</div>
           
            {isPauseorplay? <div className="flex gap-2 justify-center">
                <Button variant="default" onClick={startTimer}>Start</Button>

                {isRunning? <Button variant="outline" onClick={pauseTimer}>Pause</Button> : <Button variant="default" onClick={resumeTimer}>Resume</Button>}

                <Button variant="outline" onClick={resetTimer}>Reset</Button>

            </div>
             : 
             <div className="flex gap-2 justify-center">
                <Button variant="default" onClick={startTimer}>Start</Button>
               <Button variant="outline" onClick={resetTimer}>Reset</Button>
            </div>
            }
        </div>
        </main>
    )
}