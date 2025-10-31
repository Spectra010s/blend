'use client'

import { navItems } from '@/data/navigation'
import { FooterProps } from '@/types'

export const Footer = ({ active, onNavClick }: FooterProps) => {
  return (
    <div className="fixed bottom-0 left-0 w-full rounded-t-xl border-t-2 border-neutral-200 dark:border-neutral-500 bg-background backdrop-blur-md z-50">
      <div className="flex justify-around items-center">
        {navItems.map(item => {
          const Icon = item.icon
          const isActive = active === item.id
          return (
            <button
              key={item.id}
              onClick={() => onNavClick(item.id)}
              className="flex flex-col items-center justify-center text-sm focus:outline-none p-2 rounded-lg transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800"
              aria-label={`Navigate to ${item.label}`}
              aria-pressed={isActive}
            >
              <Icon
                className={`w-6 h-6 transition-all ${
                  isActive
                    ? 'text-neutral-900 dark:text-neutral-100 scale-120'
                    : 'text-neutral-400 dark:text-neutral-600 scale-90'
                }`}
              />
              <span
                className={`text-xs mt-1 transition-colors ${
                  isActive
                    ? 'text-neutral-900 dark:text-neutral-100 font-medium'
                    : 'text-neutral-400 dark:text-neutral-600'
                }`}
              >
                {item.label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
