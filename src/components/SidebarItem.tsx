import React from 'react'
import { SidebarItemProps } from '@/types'

export const SidebarItem: React.FC<SidebarItemProps> = ({
  icon: Icon,
  label,
  isActive = false,
  showLabel = false,
  onClick,
}) => {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      className={`flex items-center rounded-lg p-3 my-1 transition-all duration-200 cursor-pointer
                  ${
                    isActive
                      ? 'bg-gray-200 text-gray-900 shadow-inner'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
    >
      <div className="flex items-center justify-center w-10 h-10">
        <Icon />
      </div>
      <span
        className={`ml-4 overflow-hidden whitespace-nowrap transition-all duration-300
          ${showLabel ? 'opacity-100 max-w-full' : 'opacity-0 max-w-0'}`}
      >
        {label}
      </span>
    </div>
  )
}
