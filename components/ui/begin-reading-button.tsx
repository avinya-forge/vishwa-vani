'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function BeginReadingButton() {
  const [slug, setSlug] = useState('bhagavad-gita')

  useEffect(() => {
    const saved = localStorage.getItem('vishwa_last_text')
    if (saved) setSlug(saved)
  }, [])

  return (
    <Link
      href={`/${slug}/1`}
      suppressHydrationWarning
      className="inline-flex items-center gap-3 px-8 py-4 bg-stone-900 hover:bg-orange-600 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-orange-400 text-white font-black rounded-2xl transition-all shadow-xl shadow-stone-200/50 dark:shadow-none text-[11px] uppercase tracking-widest group"
    >
      <span>📜</span> Begin Reading
      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
    </Link>
  )
}
