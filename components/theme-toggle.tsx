'use client'

import * as React from 'react'
import { useTheme } from 'next-themes'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <button className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center opacity-50"><span className="sr-only">Toggle theme</span></button>
  }

  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="p-2 rounded-lg bg-stone-50 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-orange-50 hover:text-orange-600 transition-all focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:outline-none"
      aria-label="Toggle theme"
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  )
}
