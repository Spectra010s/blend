'use client'

import { useEffect, useState, createContext, useContext } from 'react'

type ThemeContextType = {
  theme: 'light' | 'dark'
  setTheme: (theme: 'light' | 'dark') => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<'light' | 'dark'>('light')

  const setTheme = (newTheme: 'light' | 'dark') => {
    setThemeState(newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
    localStorage.setItem('theme', newTheme)
  }

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    const initialTheme: 'light' | 'dark' = storedTheme
      ? (storedTheme as 'light' | 'dark')
      : prefersDark
        ? 'dark'
        : 'light'

    setThemeState(initialTheme)
    document.documentElement.classList.toggle('dark', initialTheme === 'dark')
    if (!storedTheme) {
      localStorage.setItem('theme', initialTheme)
    }
  }, [])
  useEffect(() => {
    let meta = document.querySelector('meta[name="theme-color"]') as HTMLMetaElement | null
    if (!meta) {
      meta = document.createElement('meta') as HTMLMetaElement
      meta.name = 'theme-color'
      document.head.appendChild(meta)
    }
    meta.content = theme === 'dark' ? '#171717' : '#ffffff'
  }, [theme])

  const contextValue = { theme, setTheme }

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>
}
