import Alarms from '@/components/Alarms'
import Timer from '@/components/Timer'
import TodoPage from '@/components/Todo'
import NotePage from '@/components/Notes'
import Dashboard from '@/components/Dashboard'
import { NavItem } from '@/types'
import {
  LayoutDashboard,
  AlarmClock,
  Timer as TimerIcon,
  ListTodo,
  NotebookText,
} from 'lucide-react'

export const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, component: Dashboard },
  { id: 'alarms', label: 'Alarms', icon: AlarmClock, component: Alarms },
  { id: 'timer', label: 'Timer', icon: TimerIcon, component: Timer },
  { id: 'todo', label: 'To-Do', icon: ListTodo, component: TodoPage },
  { id: 'notes', label: 'Notes', icon: NotebookText, component: NotePage },
]
