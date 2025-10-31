'use client'

import { useState, useEffect, useRef } from 'react'
import { Trash2 } from 'lucide-react'
import { AlarmCardProps } from '@/types'
import { ConfirmToast } from '@/components/ConfirmToast'

export default function AlarmCard({ onClick, alarm, onDelete }: AlarmCardProps) {
  const [isPressing, setIsPressing] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const [remainingTime, setRemainingTime] = useState('')
  const pressTimerRef = useRef<number | null>(null)

  const handlePressStart = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation()
    setIsPressing(true)

    pressTimerRef.current = window.setTimeout(() => {
      setShowDelete(true)
      setIsPressing(false)
    }, 1000)
  }

  const handlePressEnd = () => {
    setIsPressing(false)
    if (pressTimerRef.current) {
      clearTimeout(pressTimerRef.current)
      pressTimerRef.current = null
    }
  }

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    ConfirmToast({
      message: 'Are you sure you want to delete this Alarm?',
      confirmText: 'Yes, Delete',
      onConfirm: () => onDelete(alarm.id),
    })
  }

  const handleCardClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (showDelete) {
      setShowDelete(false)
    } else if (!pressTimerRef.current) {
      onClick()
    }
  }

  useEffect(() => {
    const updateRemainingTime = () => {
      const now = new Date()
      const [h, m] = alarm.time.split(':').map(Number)
      const alarmDate = new Date()
      alarmDate.setHours(h, m, 0, 0)

      if (alarmDate < now) {
        alarmDate.setDate(alarmDate.getDate() + 1)
      }

      const diff = alarmDate.getTime() - now.getTime()
      const hours = Math.floor(diff / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

      if (hours === 0) {
        if (minutes >= 2) {
          setRemainingTime(`${minutes} minutes`)
        } else if (minutes === 1) {
          setRemainingTime('a minute')
        } else {
          setRemainingTime('less than a minute')
        }
      } else {
        setRemainingTime(`${hours} hours ${minutes} minutes`)
      }
    }
    updateRemainingTime()
    const interval = setInterval(updateRemainingTime, 1000)
    return () => clearInterval(interval)
  }, [alarm.time])

  return (
    <div
      className={`relative border rounded-2xl shadow-sm flex h-20 flex-col justify-between overflow-hidden cursor-pointer
        transition-all duration-300
        ${isPressing ? 'scale-95 opacity-80' : 'bg-neutral-300 dark:bg-neutral-900 hover:shadow-md hover:-translate-y-1'}`}
      onClick={handleCardClick}
      onMouseDown={handlePressStart}
      onMouseUp={handlePressEnd}
      onMouseLeave={handlePressEnd}
      onTouchStart={handlePressStart}
      onTouchEnd={handlePressEnd}
      style={{ isolation: 'isolate' }}
    >
      <div className="flex flex-row justify-between p-3 h-full">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl text-foreground font-semibold">{alarm.time}</h1>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            Daily | Alarm in {remainingTime}
          </p>
        </div>
        {showDelete && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-10">
            <button className="p-3 bg-red-600 text-white rounded-full" onClick={handleDelete}>
              <Trash2 size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
