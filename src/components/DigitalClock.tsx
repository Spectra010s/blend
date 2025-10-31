'use client'

import { useEffect, useState } from 'react'

export default function DigitalClock({ showSeconds = true }: { showSeconds?: boolean }) {
  const [now, setNow] = useState(new Date())

  const two = (n: number) => {
    return n.toString().padStart(2, '0')
  }
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), showSeconds ? 1000 : 1000)
    return () => clearInterval(id)
  }, [showSeconds])

  const hours = two(now.getHours())
  const minutes = two(now.getMinutes())
  const seconds = two(now.getSeconds())

  return (
    <div className="inline-flex items-baseline px-4 py-2 rounded-lg bg-none shadow-sm border">
      <div className="text-2xl font-mono">
        {hours}:{minutes}
        {showSeconds ? `:${seconds}` : ''}
      </div>
    </div>
  )
}
