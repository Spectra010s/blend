export interface Note {
  id: string
  title: string
  content: string
  createdAt: number
  updatedAt: number
}

export interface NoteEditorProps {
  note: Note
  onSave: (note: Note) => void
  onClose: () => void
}

export interface NoteCardProps {
  note: Note
  onEdit: () => void
  onDelete: (id: string) => void
}
