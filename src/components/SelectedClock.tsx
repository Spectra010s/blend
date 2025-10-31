'use client'

import { useState } from 'react'
import AnalogClock from '@/components/AnalogClock'
import DigitalClock from '@/components/DigitalClock'

export default function SelectedClock() {
  const [selectedClock, setSelectedClock] = useState('Analog')

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedClock(e.target.value)
  }

  return (
    <div className="flex flex-col p-4">
      <div className="w-48 h-48 flex items-center justify-center">
        {selectedClock === 'Analog' ? <AnalogClock /> : <DigitalClock />}
      </div>

      <select
        value={selectedClock}
        onChange={handleChange}
        className="p-3 h-4 w-4 border-2 border-neutral-400 rounded-sm text-sm font-semibold bg-background shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-neutral-600"
      >
        <option value="Analog">Analog Clock</option>
        <option value="Digital">Digital Clock</option>
      </select>
    </div>
  )
}
