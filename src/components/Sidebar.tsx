'use client'

import { useState } from 'react'
import { SidebarItem } from '@/components/SidebarItem'
import { navItems } from '@/data/navigation'
import { SidebarProps } from '@/types'

export default function Sidebar({ active, setActive }: SidebarProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={`flex-shrink-0 h-screen bg-background border-r border-gray-200 rounded-tr-xl shadow-lg
                  w-16 ${isHovered ? 'w-64' : 'w-16'} transition-all duration-300 ease-in-out`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <nav className="flex flex-col p-2 space-y-1">
        {navItems.map(item => (
          <SidebarItem
            key={item.id}
            icon={item.icon}
            label={item.label}
            isActive={active === item.id}
            showLabel={isHovered}
            onClick={() => setActive(item.id)}
          />
        ))}
      </nav>
    </div>
  )
}
