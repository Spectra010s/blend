'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { AlarmEditorProps } from '@/types'

export default function AlarmEditor({ onSave, onClose, alarmTime }: AlarmEditorProps) {
  const [hours, setHours] = useState(alarmTime ? alarmTime.split(':')[0] : '00')
  const [minutes, setMinutes] = useState(alarmTime ? alarmTime.split(':')[1] : '00')
  const overlayRef = useRef<HTMLDivElement>(null)

  const handleSave = () => {
    onSave(`${hours}:${minutes}`)
    onClose()
  }

  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      if (overlayRef.current && !overlayRef.current.contains(e.target as Node)) {
        onClose()
      }
    },
    [onClose]
  )

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [handleClickOutside])

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-20">
      <div
        ref={overlayRef}
        className="bg-white dark:bg-gray-800 p-6 rounded-xl w-80 flex flex-col gap-4"
      >
        <h2 className="text-xl font-bold text-foreground dark:text-white">Set Alarm</h2>
        <div className="flex gap-4 justify-center items-end">
          <div className="flex flex-col items-center">
            <span className="mb-2 text-sm font-medium">Hours</span>
            <select
              value={hours}
              onChange={e => setHours(e.target.value)}
              className="border p-2 rounded dark:bg-gray-700 dark:text-white"
            >
              {Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0')).map(h => (
                <option key={h} value={h}>
                  {h}
                </option>
              ))}
            </select>
          </div>
          <span className="text-gray-500 dark:text-gray-300 mb-2">:</span>
          <div className="flex flex-col items-center">
            <span className="mb-2 text-sm font-medium">Mins</span>
            <select
              value={minutes}
              onChange={e => setMinutes(e.target.value)}
              className="border p-2 rounded dark:bg-gray-700 dark:text-white"
            >
              {Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0')).map(m => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onClose} className="px-4 py-2 border dark:border-0 rounded">
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-gray-800 text-white hover:bg-gray-700 transition-all duration-300 rounded dark:border"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}
