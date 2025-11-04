'use client'

import { useState, useEffect } from 'react'
import { Howl } from 'howler'
import { Plus, AlarmClock } from 'lucide-react'
import AlarmCard from '@/components/AlarmCard'
import { Alarm } from '@/types'
import AlarmEditor from '@/components/AlarmEditor'
import { getAlarm, saveAlarm } from '@/utils/localStorage'

export default function Alarms({ active }: { active?: boolean }) {
  const [alarms, setAlarms] = useState<Alarm[]>([])
  const [editorOpen, setEditorOpen] = useState(false)
  const [editingAlarm, setEditingAlarm] = useState<Alarm | null>(null)

  useEffect(() => setAlarms(getAlarm()), [])
  useEffect(() => saveAlarm(alarms), [alarms])

  useEffect(() => {
    const alarmSound = new Howl({ src: ['/alarm.mp3'] })
    const interval = setInterval(() => {
      const now = new Date()
      const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`
      setAlarms(prev =>
        prev.map(alarm => {
          if (alarm.time === currentTime && !alarm.isRinging) {
            alarmSound.play()
            return { ...alarm, isRinging: true }
          }
          return alarm
        })
      )
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleSave = (time: string) => {
    if (editingAlarm) {
      setAlarms(prev =>
        prev.map(a => (a.id === editingAlarm.id ? { ...a, time, isRinging: false } : a))
      )
      setEditingAlarm(null)
    } else {
      setAlarms(prev => [...prev, { id: Date.now().toString(), time, isRinging: false }])
    }
    setEditorOpen(false)
  }

  const handleDelete = (id: string) => {
    setAlarms(prev => prev.filter(a => a.id !== id))
  }

  const handleEdit = (alarm: Alarm) => {
    setEditingAlarm(alarm)
    setEditorOpen(true)
  }

  return (
    <main className="h-screen w-full flex flex-col border-x border-x-bg-black dark:border-x-bg-white md:relative">
      <div className="absolute h-16 flex items-center px-4 bg-background text-foreground flex-shrink-0">
        <h1 className="text-2xl font-bold">Alarms</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-4 pb-20 mt-16 [overscroll-behavior:contain] [scroll-behavior:smooth]">
        {alarms.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {alarms.map(alarm => (
              <AlarmCard
                key={alarm.id}
                alarm={alarm}
                onClick={() => handleEdit(alarm)}
                onDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col justify-center">
            <div className="text-center text-foreground flex flex-col items-center">
              <AlarmClock size={60} />
              <p>No Alarms available</p>
              <p>Click on the “+” to add a new Alarm</p>
            </div>
          </div>
        )}
      </div>

      {editorOpen && (
        <AlarmEditor
          onSave={handleSave}
          onClose={() => {
            setEditorOpen(false)
            setEditingAlarm(null)
          }}
          alarmTime={editingAlarm?.time}
        />
      )}

      {active ? (
        <button
          onClick={() => setEditorOpen(true)}
          aria-label="Add new Alarm"
          className="fixed bottom-24 right-6 p-4 rounded-full shadow-lg bg-gray-800 text-white hover:bg-gray-700 transition-all duration-300"
        >
          <Plus size={24} />
        </button>
      ) : (
        <button
          onClick={() => setEditorOpen(true)}
          aria-label="Add new Alarm"
          className="absolute bottom-24 right-6 p-4 rounded-full shadow-lg bg-gray-800 text-white hover:bg-gray-700 transition-all duration-300"
        >
          <Plus size={24} />
        </button>
      )}
    </main>
  )
}
