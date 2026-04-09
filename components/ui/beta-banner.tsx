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
    <div className="bg-orange-600 text-white px-4 py-2 text-sm text-center relative font-medium shadow-md z-40">
      <p>
        <span className="mr-2" aria-hidden="true">🧪</span>
        Preview Release — expect rough edges, bugs welcome.
      </p>
      <button
        onClick={dismiss}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 opacity-80 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-white rounded"
        aria-label="Dismiss beta banner"
      >
        ✕
      </button>
    </div>
  )
}
