'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { BookOpen, ArrowRight } from 'lucide-react'
import { VEDIC_LIBRARY } from '@/lib/texts'

export default function BeginReadingButton() {
  const [resumeData, setResumeData] = useState<{ text: string, chapter: number, verse?: number, bookName: string } | null>(null)

  useEffect(() => {
    try {
      const saved = localStorage.getItem('vishwa_continue_reading')
      if (saved) {
        const parsed = JSON.parse(saved)
        if (parsed.text && parsed.chapter) {
          const bookMeta = VEDIC_LIBRARY.find(b => b.slug === parsed.text)
          if (bookMeta) {
            setResumeData({
              text: parsed.text,
              chapter: parsed.chapter,
              verse: parsed.verse,
              bookName: bookMeta.name
            })
            return
          }
        }
      }
      
      const lastText = localStorage.getItem('vishwa_last_text')
      if (lastText) {
        const bookMeta = VEDIC_LIBRARY.find(b => b.slug === lastText)
        if (bookMeta) {
          setResumeData({ text: lastText, chapter: 1, bookName: bookMeta.name })
        }
      }
    } catch (e) {
      console.error('Failed to parse resume data', e)
    }
  }, [])

  if (resumeData) {
    const { text, chapter, verse, bookName } = resumeData
    const href = `/${text}/${chapter}${verse ? `#verse-${verse}` : ''}`
    
    return (
      <Link
        href={href}
        suppressHydrationWarning
        className="inline-flex items-center gap-3 px-8 py-4 bg-stone-900 hover:bg-orange-600 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-orange-500 text-white font-black rounded-2xl transition-all shadow-xl shadow-stone-200/50 dark:shadow-none text-[11px] uppercase tracking-widest group"
      >
        <BookOpen className="w-4 h-4 text-orange-500 group-hover:text-white dark:text-orange-600 dark:group-hover:text-stone-900" /> 
        <div className="flex flex-col items-start text-left">
          <span className="text-[9px] opacity-70 leading-none mb-0.5">Resume Reading</span>
          <span className="leading-none">{bookName} &middot; Ch {chapter}</span>
        </div>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform opacity-70" />
      </Link>
    )
  }

  // Default state
  return (
    <Link
      href="/#library"
      suppressHydrationWarning
      className="inline-flex items-center gap-3 px-8 py-4 bg-stone-900 hover:bg-orange-600 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-orange-400 text-white font-black rounded-2xl transition-all shadow-xl shadow-stone-200/50 dark:shadow-none text-[11px] uppercase tracking-widest group"
    >
      <BookOpen className="w-4 h-4 text-orange-500 group-hover:text-white dark:text-orange-600 dark:group-hover:text-stone-900" />
      <span>Begin Reading</span>
      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform opacity-70" />
    </Link>
  )
}
