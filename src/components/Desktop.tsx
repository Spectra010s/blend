'use client'

import { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import { navItems } from '@/data/navigation'

export default function Desktop() {
  const [activeComponentId, setActiveComponentId] = useState(navItems[0]?.id || 'dashboard')

  const CurrentPage = navItems.find(item => item.id === activeComponentId)?.component

  return (
    <main className="min-h-screen hidden md:block overflow-hidden">
      <div className="flex flex-row overflow-hidden">
        <Sidebar active={activeComponentId} setActive={setActiveComponentId} />
        <div className="flex flex-1 flex-col">{CurrentPage ? <CurrentPage /> : null}</div>
      </div>
    </main>
  )
}
