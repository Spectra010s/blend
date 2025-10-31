'use client'

import { useState, useEffect } from 'react'
import { Plus, NotebookText } from 'lucide-react'
import { Note } from '@/types'
import { getNotes, saveNotes } from '@/utils/localStorage'
import { NoteEditor } from '@/components/NoteEditor'
import { NoteCard } from '@/components/NoteCard'

export default function NotesPage({ active }: { active?: boolean }) {
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
    <main className="h-screen w-full flex flex-col">
      <div className="absolute h-16 flex items-center px-4 bg-background text-foreground flex-shrink-0">
        <h1 className="text-2xl font-bold">Notes</h1>
      </div>
      {notes.length > 0 ? (
        <div className="flex-1 overflow-y-auto p-4 pb-20 mt-16 [overscroll-behavior:contain] [scroll-behavior:smooth]">
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
        </div>
      ) : (
        <div className="flex-1 flex flex-col justify-center ">
          <div className="text-center text-foreground flex flex-col items-center">
            <NotebookText size={60} />
            <p>No Notes available</p>
            <p>Click on the “+” to add a new note</p>
          </div>
        </div>
      )}

      {active && (
        <button
          onClick={handleNewNote}
          aria-label="Add new note"
          className="fixed bottom-24 right-6 p-4 rounded-full shadow-lg bg-gray-800 text-white hover:bg-gray-700 transition-all duration-300"
        >
          <Plus size={24} />
        </button>
      )}
    </main>
  )
}
