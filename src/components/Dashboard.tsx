'use client'

import { useState, useEffect } from 'react'
import SelectedClock from '@/components/SelectedClock'
import { Badge } from '@/components/ui/badge'
import { ClockIcon } from 'lucide-react'

export default function Dashboard() {
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

  return (
    <main className="h-screen w-full flex flex-col relative">
      <div className="h-16 flex items-center px-4 bg-background text-foreground flex-shrink-0">
        <h1 className="text-2xl font-medium font-bold">Blend - Dashboard</h1>
      </div>
      <div className="flex flex-col gap-10 m-3 overflow-x-hidden">
        <div className="flex flex-row items-center justify-between">
          <div className="text-xl font-mono text-gray-800 dark:text-gray-200 mt-6 transition-colors duration-500 p-2">
            <p>Today&apos;s Date is</p>
            {time.toLocaleDateString()}
          </div>
          <div className="flex flex-col items-end p-4 h-52">
            <SelectedClock />
          </div>
        </div>
        <div className="flex flex-col items-baseline gap-2 m-3">
          <h1 className="text-lg">Recents</h1>
          <div className="w-full h-64 border-2 rounded-xl border-black dark:border-gray-200 ">
            <div className="h-full border rounded-xl backdrop-blur-sm flex justify-center items-center bg-black/5 dark:bg-white/5">
              <Badge
                variant="secondary"
                className="flex items-center gap-2 shadow-lg px-3 py-1 cursor-pointer"
              >
                <ClockIcon />
                Coming Soon
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
