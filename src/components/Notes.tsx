'use client'

import { useState, useEffect } from 'react'
import { Plus } from 'lucide-react'
import { Note } from '@/types'
import { getNotes, saveNotes } from '@/utils/localStorage'
import { NoteEditor } from '@/components/NoteEditor'
import { NoteCard } from '@/components/NoteCard'
import { Toaster } from '@/components/ui/sonner'

export default function NotesPage() {
  const [mounted, setMounted] = useState(false)
  const [notes, setNotes] = useState<Note[]>([])
  const [editingNote, setEditingNote] = useState<Note | null>(null)

  useEffect(() => {
    setMounted(true)
    const savedNotes = getNotes()
    setNotes(savedNotes)
  }, [])

  if (!mounted) return null

  const handleSaveNote = (note: Note) => {
    let updatedNotes: Note[]
    if (notes.some(n => n.id === note.id)) {
      updatedNotes = notes.map(n => (n.id === note.id ? note : n))
    } else {
      updatedNotes = [{ ...note, createdAt: Date.now() }, ...notes]
    }
    setNotes(updatedNotes)
    saveNotes(updatedNotes)
  }

  const handleDeleteNote = (id: string) => {
    const updatedNotes = notes.filter(n => n.id !== id)
    setNotes(updatedNotes)
    saveNotes(updatedNotes)
  }

  const handleNewNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: '',
      content: '',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }
    setEditingNote(newNote)
  }

  if (editingNote) {
    return (
      <NoteEditor note={editingNote} onSave={handleSaveNote} onClose={() => setEditingNote(null)} />
    )
  }

  return (
    <main className="h-screen w-full flex flex-col relative">
      <Toaster position="top-center" />
      <div className="h-16 flex items-center px-4 bg-background text-foreground flex-shrink-0">
        <h1 className="text-2xl font-bold">Notes</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-4 pb-16">
        {notes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {notes.map(note => (
              <NoteCard
                key={note.id}
                note={note}
                onEdit={() => setEditingNote(note)}
                onDelete={handleDeleteNote}
              />
            ))}
          </div>
        ) : (
          <div className="text-center mt-10 text-primary-foreground">
            <p>No Notes available</p>
            <p>Click on the “+” to add a new note</p>
          </div>
        )}
      </div>

      <button
        onClick={handleNewNote}
        aria-label="Add new note"
        className="absolute bottom-30 right-6 p-4 rounded-full shadow-lg bg-gray-800 text-white hover:bg-gray-700 transition-all duration-300"
      >
        <Plus size={24} />
      </button>
    </main>
  )
}
