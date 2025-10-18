'use client'

import { useState, useEffect } from 'react'
import { Todo } from '@/types'
import { getTodos, saveTodos } from '@/utils/localStorage'
import { X } from 'lucide-react'

export default function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTask, setNewTask] = useState('')

  useEffect(() => {
    setTodos(getTodos())
  }, [])

  const addTodo = () => {
    if (!newTask.trim()) return

    const newTodo: Todo = {
      id: Date.now(),
      task: newTask,
      done: false,
    }

    const updatedTodos = [...todos, newTodo]
    setTodos(updatedTodos)
    saveTodos(updatedTodos)
    setNewTask('')
  }

  const toggleDone = (id: number) => {
    const updatedTodos = todos.map(todo => (todo.id === id ? { ...todo, done: !todo.done } : todo))
    setTodos(updatedTodos)
    saveTodos(updatedTodos)
  }

  const deleteTodo = (id: number) => {
    const updatedTodos = todos.filter(todo => todo.id !== id)
    setTodos(updatedTodos)
    saveTodos(updatedTodos)
  }

  return (
    <main className="min-h-screen w-full flex flex-col relative bg-background border-x border-x-bg-black dark:border-x-bg-white">
      <div className="h-16 flex items-center px-4 bg-background text-foreground flex-shrink-0">
        <h1 className="text-2xl font-bold">Todo/Tasks</h1>
      </div>

      <div className="flex mt-4 p-4 gap-2">
        <input
          type="text"
          placeholder="Add a task"
          className="flex-1 border border-gray-400 rounded px-2 py-1"
          value={newTask}
          onChange={e => setNewTask(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addTodo()}
        />
        <button className="px-4 py-1 bg-blue-500 text-white rounded" onClick={addTodo}>
          Add
        </button>
      </div>

      <ul className="mt-3 flex-1 p-5 overflow-y-auto">
        <div className="flex justify-center">
          {todos.length === 0 && <p className="text-gray-500">No tasks yet.</p>}
        </div>
        {todos.map(todo => (
          <li
            key={todo.id}
            className="flex items-center justify-between py-2 border-b border-gray-200"
          >
            <div className="flex items-center gap-2">
              <input type="checkbox" checked={todo.done} onChange={() => toggleDone(todo.id)} />
              <span className={todo.done ? 'line-through text-gray-500' : ''}>{todo.task}</span>
            </div>
            <button
              className={todo.done ? 'text-red-500' : 'text-muted-foreground'}
              onClick={() => deleteTodo(todo.id)}
            >
              <X size={18} />
            </button>
          </li>
        ))}
      </ul>
    </main>
  )
}
