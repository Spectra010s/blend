'use client'

import { useTheme } from '@/context/theme-provider'
import { useEffect } from 'react'

export default function ThemeMeta() {
  const { theme } = useTheme()

  useEffect(() => {
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) {
      meta.setAttribute('content', theme === 'dark' ? '#000000' : '#ffffff')
    }
  }, [theme])

  return null
}
