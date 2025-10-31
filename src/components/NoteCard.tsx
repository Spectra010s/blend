'use client'

import { useState, useRef, MouseEvent } from 'react'
import { Trash2 } from 'lucide-react'
import { NoteCardProps } from '@/types'
import { ConfirmToast } from '@/components/ConfirmToast'

export const NoteCard = ({ note, onEdit, onDelete }: NoteCardProps) => {
  const [showDelete, setShowDelete] = useState(false)
  const [isPressing, setIsPressing] = useState(false)
  const pressTimerRef = useRef<number | null>(null)

  const handlePressStart = (e: MouseEvent | React.TouchEvent) => {
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

  const handleCardClick = (e: MouseEvent) => {
    e.stopPropagation()
    if (showDelete) {
      setShowDelete(false)
    } else if (!pressTimerRef.current) {
      onEdit()
    }
  }

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    ConfirmToast({
      message: 'Are you sure you want to delete this note?',
      confirmText: 'Yes, Delete',
      onConfirm: () => onDelete(note.id),
    })
  }

  return (
    <div
      className={`relative border rounded-2xl shadow-sm flex h-32 flex-col justify-between overflow-hidden cursor-pointer 
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
      <div className="flex flex-col justify-between p-3 h-full">
        <div>
          <h2 className="text-lg text-foreground font-semibold truncate mb-1">
            {note.title || 'Untitled'}
          </h2>
          <p className="text-sm text-gray-500/dark:text-gray-400 line-clamp-2">
            {note.content || 'No content'}
          </p>
        </div>

        <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
          Last edited: {formatTimestamp(note.updatedAt)}
        </p>
      </div>

      {showDelete && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm transition-opacity z-10">
          <button
            className="p-3 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 transition-transform transform hover:scale-110"
            onClick={handleDelete}
            aria-label="Delete note"
          >
            <Trash2 size={20} />
          </button>
        </div>
      )}
    </div>
  )
}
