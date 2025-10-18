import { ComponentType } from 'react'
import { SVGProps } from 'react'

export interface NavItem {
  id: string
  label: string
  icon: ComponentType<SVGProps<SVGSVGElement>>
  component: ComponentType
}

export interface FooterProps {
  active: string
  onNavClick: (id: string) => void
}

export interface SidebarItemProps {
  icon: ComponentType<SVGProps<SVGSVGElement>>
  label: string
  isActive?: boolean
  showLabel?: boolean
  onClick?: () => void
}

export interface SidebarProps {
  active: string
  setActive: React.Dispatch<React.SetStateAction<string>>
}
