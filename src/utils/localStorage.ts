import { Note, TimerKey, Todo, Alarm } from '@/types'

const blendnotekey = 'blendnotes'
const blendtodokey = 'blendtodos'
const blendtimerkey = 'blendtimer'
const blendalarmkey = 'blendalarm'

export const getNotes = (): Note[] => {
  if (typeof window !== 'undefined') {
    const notesJson = localStorage.getItem(blendnotekey)
    return notesJson ? JSON.parse(notesJson) : []
  }
  return []
}

export const saveNotes = (notes: Note[]): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(blendnotekey, JSON.stringify(notes))
  }
}

export const getTodos = (): Todo[] => {
  if (typeof window !== 'undefined') {
    const todosJson = localStorage.getItem(blendtodokey)
    return todosJson ? JSON.parse(todosJson) : []
  }
  return []
}

export const saveTodos = (todos: Todo[]): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(blendtodokey, JSON.stringify(todos))
  }
}

export const getTimer = (): TimerKey | null => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(blendtimerkey)
    return saved ? JSON.parse(saved) : null
  }
  return null
}

export const saveTimer = (timer: TimerKey) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(blendtimerkey, JSON.stringify(timer))
  }
}

export const getAlarm = (): Alarm[] => {
  if (typeof window !== 'undefined') {
    const alarmJson = localStorage.getItem(blendalarmkey)
    return alarmJson ? JSON.parse(alarmJson) : []
  }
  return []
}

export const saveAlarm = (alarm: Alarm[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(blendalarmkey, JSON.stringify(alarm))
  }
}
