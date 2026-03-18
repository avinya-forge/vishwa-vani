'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

/**
 * Root Redirector
 * For static exports on GitHub Pages, we need a root index.html that
 * shuffles the user into the default locale (/en) or their preferred one.
 */
export default function RootRedirect() {
  const router = useRouter()

  useEffect(() => {
    // Check if the user has a stored preference
    const stored = localStorage.getItem('vishwa_lang')
    const target = stored && ['en', 'hi', 'mr'].includes(stored) ? stored : 'en'
    
    // Redirect now
    router.replace(`/${target}`)
  }, [router])

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-serif font-bold text-orange-900 mb-4 animate-pulse">Vishwa-Vani</h1>
        <p className="text-stone-500">Entering the Digital Sanctuary...</p>
      </div>
    </div>
  )
}
