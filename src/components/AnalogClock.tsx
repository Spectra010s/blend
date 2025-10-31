'use client'

import { useState, useEffect } from 'react'

const markers = Array.from({ length: 12 }, (_, i) => ({
  rotation: i * 30,
  isMajor: i % 3 === 0,
}))

export default function AnalogClock() {
  const [time, setTime] = useState(new Date())
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const intervalId = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(intervalId)
  }, [])

  if (!isClient) return null

  const hours = time.getHours()
  const minutes = time.getMinutes()
  const seconds = time.getSeconds()

  const secondDegrees = (seconds / 60) * 360
  const minuteDegrees = (minutes / 60) * 360
  const hourDegrees = ((hours % 12) / 12) * 360 + (minutes / 60) * 30

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-none transition-colors duration-500">
      <div className="relative w-48 h-48 border-4 border-gray-800 dark:border-gray-300 rounded-full bg-gray-50 dark:bg-gray-700 shadow-xl transition-colors duration-500">
        {markers.map((marker, index) => (
          <div
            key={`line-${index}`}
            className="absolute top-0 left-1/2 w-px h-full"
            style={{
              transform: `rotate(${marker.rotation}deg)`,
              transformOrigin: '50% 50%',
              zIndex: 0,
            }}
          >
            <div
              className={`absolute top-0 left-1/2 -ml-px ${
                marker.isMajor
                  ? 'w-1 h-3 bg-gray-600 dark:bg-gray-300'
                  : 'w-px h-2 bg-gray-400 dark:bg-gray-500'
              }`}
              style={{ transform: 'translateX(-50%)', marginTop: 1 }}
            ></div>
          </div>
        ))}

        <div
          className="absolute bottom-1/2 left-1/2 w-1 h-10 -ml-0.5 bg-black dark:bg-gray-100 rounded-sm z-30 transition-colors duration-500"
          style={{
            transform: `rotate(${hourDegrees}deg)`,
            transformOrigin: '50% 100%',
          }}
        ></div>

        <div
          className="absolute bottom-1/2 left-1/2 w-0.5 h-14 -ml-px bg-gray-600 dark:bg-gray-300 rounded-sm z-20 transition-colors duration-500"
          style={{
            transform: `rotate(${minuteDegrees}deg)`,
            transformOrigin: '50% 100%',
          }}
        ></div>

        <div
          className="absolute bottom-1/2 left-1/2 w-0.5 h-18 -ml-px bg-red-600 z-10"
          style={{
            transform: `rotate(${secondDegrees}deg)`,
            transformOrigin: '50% 100%',
          }}
        ></div>

        <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-gray-800 dark:bg-gray-100 border border-white dark:border-gray-800 rounded-full transform -translate-x-1/2 -translate-y-1/2 z-40 transition-colors duration-500"></div>
        <div className="absolute inset-0 flex items-start mt-10 justify-center font-semibold text-gray-700 dark:text-gray-300 text-base font-mono mt-3 transition-colors duration-500">
          {time.toLocaleTimeString()}
        </div>
      </div>
    </div>
  )
}
