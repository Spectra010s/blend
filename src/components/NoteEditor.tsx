'use client'

import { useState, useEffect, useCallback } from 'react'
import { X } from 'lucide-react'
import { Note, NoteEditorProps } from '@/types'

export const NoteEditor: React.FC<NoteEditorProps> = ({ note, onSave, onClose }) => {
  const [localNote, setLocalNote] = useState<Note>(note)

  const autoSave = useCallback(
    (currentNote: Note) => {
      if (!currentNote.title && !currentNote.content) return

      const updatedNote = { ...currentNote, updatedAt: Date.now() }
      onSave(updatedNote)
    },
    [onSave]
  )

  useEffect(() => {
    autoSave(localNote)
  }, [localNote.title, localNote.content, autoSave])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setLocalNote(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <div className="fixed inset-0 z-50 bg-background dark:bg-neutral-900 flex flex-col pr-4 pl-4 sm:p-10">
      <div className="flex justify-end items-center mb-2">
        <button
          onClick={onClose}
          className="p-3 text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-colors"
          aria-label="Close editor"
        >
          <X size={28} />
        </button>
      </div>

      <input
        type="text"
        name="title"
        value={localNote.title}
        onChange={handleChange}
        placeholder="Title"
        className="w-full text-3xl font-bold text-foreground border-b-2 border-b-neutral-300 dark:border-b-neutral-700 outline-none mb-6 p-0 bg-transparent placeholder:text-neutral-500 dark:placeholder:text-neutral-400"
      />

      <textarea
        name="content"
        value={localNote.content}
        onChange={handleChange}
        placeholder="Note content..."
        className="flex-grow w-full text-lg text-foreground/80 border-none outline-none resize-none p-0 bg-transparent placeholder:text-neutral-500 dark:placeholder:text-neutral-400"
      />
    </div>
  )
}
