'use client'

import React, { useRef, useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import CircularProgress from '@/components/CircularProgress'
import { Play, Pause, RefreshCw } from 'lucide-react'
import { NumberPicker } from '@/components/NumberPicker'
import { getTimer, saveTimer } from '@/utils/localStorage'
import { TimerKey } from '@/types'

export default function Timer() {
  const [sec, setSec] = useState(0)
  const [min, setMin] = useState(0)
  const [hour, setHour] = useState(0)
  const [timeLeft, setTimeLeft] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [showPauseResume, setShowPauseResume] = useState<boolean>(false)
  const [initialTime, setInitialTime] = useState(0)
  const interval = useRef<ReturnType<typeof setInterval> | null>(null)
  const alarm = useRef<HTMLAudioElement | null>(null)

  const seconds = Array.from({ length: 60 }, (_, i) => i)
  const minutes = Array.from({ length: 60 }, (_, i) => i)
  const hours = Array.from({ length: 24 }, (_, i) => i)

  useEffect(() => {
    if (!isRunning) {
      const totalSeconds = hour * 3600 + min * 60 + sec
      setTimeLeft(totalSeconds)
      setInitialTime(totalSeconds)
    }
  }, [hour, min, sec])

  useEffect(() => {
    alarm.current = new Audio('/alarm.mp3')
  }, [])

  useEffect(() => {
    const data: TimerKey | null = getTimer()
    if (data !== null && data.initialTime !== null) {
      setTimeLeft(data.timeLeft || 0)
      setInitialTime(data.initialTime || 0)
      setIsRunning(false)
      setShowPauseResume(data.initialTime > 0)
    }
  }, [])

  useEffect(() => {
    saveTimer({ timeLeft, initialTime })
  }, [timeLeft, initialTime])

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      interval.current = setInterval(() => {
        setTimeLeft(prev => {
          const next = prev - 1
          if (next <= 0) {
            clearInterval(interval.current!)
            alarm.current?.play()
            setShowPauseResume(false)
            setIsRunning(false)
            return 0
          }
          return next
        })
      }, 1000)
    }

    return () => clearInterval(interval.current!)
  }, [isRunning, timeLeft])

  const startTimer = () => {
    if (timeLeft <= 0) return
    setInitialTime(timeLeft)
    setIsRunning(true)
    setShowPauseResume(true)
  }

  const pauseTimer = () => {
    setIsRunning(false)
    clearInterval(interval.current!)
  }

  const resumeTimer = () => {
    if (timeLeft > 0) {
      setIsRunning(true)
    }
  }

  const resetTimer = () => {
    clearInterval(interval.current!)
    setTimeLeft(initialTime)
    setIsRunning(false)
    setShowPauseResume(false)
    alarm.current?.pause()
    if (alarm.current) alarm.current.currentTime = 0
  }

  const convertSecondsToTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600)
      .toString()
      .padStart(2, '0')
    const m = Math.floor((seconds % 3600) / 60)
      .toString()
      .padStart(2, '0')
    const s = (seconds % 60).toString().padStart(2, '0')
    return `${h}:${m}:${s}`
  }

  return (
    <div className="flex flex-col w-full h-screen overflow-hidden relative">
      <div className="h-16 flex items-center px-4 bg-background text-foreground flex-shrink-0">
        <h1 className="text-2xl font-bold">Timer</h1>
      </div>

      <div className="flex justify-center">
        <div className="flex flex-col gap-8 items-center w-full max-w-md">
          <div className="flex justify-center">
            <CircularProgress
              progress={timeLeft && initialTime ? (timeLeft / initialTime) * 100 : 0}
              text={convertSecondsToTime(timeLeft)}
            />
          </div>

          <div className="flex flex-wrap justify-center gap-25">
            <NumberPicker
              numbers={hours}
              value={hour}
              setValue={setHour}
              label="Hours"
              disabled={isRunning}
            />
            <NumberPicker
              numbers={minutes}
              value={min}
              setValue={setMin}
              label="Mins"
              disabled={isRunning}
            />
            <NumberPicker
              numbers={seconds}
              value={sec}
              setValue={setSec}
              label="Secs"
              disabled={isRunning}
            />
          </div>

          <div className="flex gap-5 justify-center mt-6 flex-wrap">
            {!showPauseResume ? (
              <>
                <Button variant="default" onClick={startTimer}>
                  <Play /> Start
                </Button>
                <Button variant="outline" onClick={resetTimer}>
                  <RefreshCw /> Reset
                </Button>
              </>
            ) : (
              <>
                {isRunning ? (
                  <Button variant="outline" onClick={pauseTimer}>
                    <Pause /> Pause
                  </Button>
                ) : (
                  <Button variant="default" onClick={resumeTimer}>
                    <Play /> Resume
                  </Button>
                )}
                <Button variant="outline" onClick={resetTimer}>
                  <RefreshCw /> Reset
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
