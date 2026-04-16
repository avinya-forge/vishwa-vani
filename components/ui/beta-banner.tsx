'use client'

import { useState, useEffect } from 'react'

export default function BetaBanner() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Only access localStorage on client after mount
    const isDismissed = localStorage.getItem('vishwa_beta_dismissed') === 'true'
    if (!isDismissed) {
      setIsVisible(true)
    }
  }, [])

  const dismiss = () => {
    localStorage.setItem('vishwa_beta_dismissed', 'true')
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="bg-orange-600 dark:bg-orange-700 text-white px-8 py-2.5 text-[11px] sm:text-xs text-center relative font-bold uppercase tracking-wider shadow-md z-[60]">
      <div className="flex items-center justify-center gap-2">
        <span aria-hidden="true">🕊️</span>
        <p className="max-w-[80%]">
          Vishwa-Vani Preview — report bugs to help refine the experience.
        </p>
      </div>
      <button
        onClick={dismiss}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 opacity-60 hover:opacity-100 hover:scale-110 active:scale-95 transition-all focus:outline-none rounded-full bg-white/10"
        aria-label="Dismiss banner"
      >
        ✕
      </button>
    </div>
  )
}
