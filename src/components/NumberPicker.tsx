import { NumberPickerProps } from '@/types'
import React, { useRef, useEffect } from 'react'

export const NumberPicker: React.FC<NumberPickerProps> = ({
  numbers,
  value,
  setValue,
  label,
  disabled = false,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      const itemHeight = 30
      const index = numbers.indexOf(value)

      if (index !== -1) {
        scrollRef.current.scrollTop =
          index * itemHeight - scrollRef.current.clientHeight / 2 + itemHeight / 2
      }
    }
  }, [scrollRef, numbers, value])

  const handleSelect = (n: number) => {
    if (disabled) return
    setValue(n)
  }

  return (
    <div className="flex flex-col items-center">
      <span className="mb-2 text-sm font-medium">{label}</span>
      <div
        ref={scrollRef}
        className={`flex flex-col max-h-[90px] border-y border-gray-200 overflow-y-auto scrollbar-hidden p-1 snap-y snap-mandatory ${disabled && 'overflow-hidden'}`}
      >
        <div style={{ height: '30px' }} />

        {numbers.map(n => (
          <div
            key={n}
            onClick={() => handleSelect(n)}
            className={`number-item-${n} cursor-pointer px-2 py-1 text-center snap-center ${
              n === value ? 'text-black dark:text-white font-bold' : 'text-gray-500'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {n.toString().padStart(2, '0')}
          </div>
        ))}

        <div style={{ height: '30px' }} />
      </div>
    </div>
  )
}
