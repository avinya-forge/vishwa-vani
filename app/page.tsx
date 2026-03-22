'use client'

import Link from 'next/link'
import { getAvailableTexts, VEDIC_LIBRARY } from '@/lib/texts'
import { useTranslations, useLocale } from 'next-intl'
import { useState, useEffect } from 'react'

export default function Home() {
  const t = useTranslations('home')
  const locale = useLocale()
  const availableTexts = getAvailableTexts()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <div className="min-h-screen bg-[#FDFBF7]" />

  return (
    <main className="min-h-screen bg-[#FDFBF7] selection:bg-orange-100 py-12 px-4">
      <div className="max-wide mx-auto">
        
        {/* Hero Section */}
        <header className="mb-10 text-center relative px-4">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[400px] bg-orange-200/15 blur-[150px] rounded-full pointer-events-none vedic-gradient" />
          <div className="relative z-10 space-y-4">
            <span className="inline-block py-1 px-5 rounded-full glass text-orange-600 text-[8px] font-bold tracking-widest uppercase shadow-sm animate-in fade-in slide-in-from-top-4 duration-1000">
               Exploring the Eternal Wisdom
            </span>
            <h1 className="text-3xl md:text-5xl font-serif font-black text-stone-900 leading-[0.95] tracking-tight text-glow">
              {t('title')}
            </h1>
            <p className="text-base md:text-lg text-stone-500 max-w-2xl mx-auto leading-relaxed font-medium opacity-90">
              {t('description')}
            </p>
            <div className="flex justify-center gap-4 pt-2">
              <Link 
                href="/bhagavad-gita/1" 
                className="px-8 py-4 bg-stone-900 text-white rounded-2xl hover:bg-orange-600 transition-all font-bold text-[10px] uppercase tracking-widest shadow-lg hover:shadow-orange-100 active:scale-95"
              >
                {t('beginReading')}
              </Link>
            </div>
          </div>
        </header>

        {/* Global Library Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:px-4">
          {VEDIC_LIBRARY.map((text) => (
            <div 
              key={text.slug} 
              className={`group relative p-6 rounded-3xl transition-all duration-700 flex flex-col h-full bg-white/40 glass ${text.available ? 'hover:shadow-[0_45px_100px_-25px_rgba(234,88,12,0.15)] hover:-translate-y-2' : 'opacity-50 grayscale pointer-events-none'}`}
            >
              <div className="flex justify-between items-center mb-4">
                <span className={`px-2.5 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-widest border ${text.available ? 'bg-orange-50/50 text-orange-600 border-orange-100/50' : 'bg-stone-200/50 text-stone-400 border-stone-200/30'}`}>
                  {text.available ? 'Available' : 'Archive'}
                </span>
                <span className="text-[9px] font-bold text-stone-300 uppercase tracking-tighter">{text.category}</span>
              </div>
              
              <h3 className="text-xl md:text-2xl font-serif font-black text-stone-900 mb-2 leading-tight group-hover:text-orange-600 transition-colors">
                {locale === 'hi' ? text.nameHi : locale === 'mr' ? text.nameMr : text.name}
              </h3>
              <p className="text-stone-500 text-[13px] mb-6 leading-relaxed font-medium line-clamp-3">
                {text.description}
              </p>

              <div className="mt-auto border-t border-stone-50 pt-5">
                {text.available ? (
                   <div className="flex items-center justify-between">
                     <span className="text-[9px] font-black text-stone-300 uppercase tracking-widest">{text.totalChapters} Chapters</span>
                     <Link 
                       href={`/${text.slug}/1`}
                       className="p-2.5 bg-stone-50 rounded-xl group-hover:bg-orange-600 group-hover:text-white transition-all shadow-sm"
                     >
                       <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                     </Link>
                   </div>
                ) : (
                  <p className="text-[9px] font-black text-stone-300 uppercase tracking-widest">Digitalization Pending</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
