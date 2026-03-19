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
    <main className="min-h-screen bg-[#FDFBF7] selection:bg-orange-100 py-16 px-4">
      <div className="max-wide mx-auto">
        
        {/* Hero Section */}
        <header className="mb-24 text-center relative px-4">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[400px] bg-orange-200/20 blur-[130px] rounded-full pointer-events-none" />
          <div className="relative z-10 space-y-8">
            <span className="inline-block py-1.5 px-6 rounded-full bg-orange-600/5 text-orange-600 text-[10px] font-black tracking-[0.3em] uppercase border border-orange-100 shadow-sm animate-in fade-in slide-in-from-top-4 duration-1000">
               Exploring the Eternal Wisdom
            </span>
            <h1 className="text-4xl md:text-6xl font-serif font-black text-stone-900 leading-[1] tracking-tighter">
              {t('title')}
            </h1>
            <p className="text-lg md:text-xl text-stone-500 max-w-3xl mx-auto leading-relaxed font-medium">
              {t('description')}
            </p>
            <div className="flex justify-center gap-6 pt-4">
              <Link 
                href="/bhagavad-gita/1" 
                className="px-10 py-5 bg-stone-900 text-white rounded-2xl hover:bg-orange-600 transition-all font-black text-xs uppercase tracking-[0.2em] shadow-2xl hover:shadow-orange-200 active:scale-95"
              >
                {t('beginReading')}
              </Link>
            </div>
          </div>
        </header>

        {/* Global Library Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:px-4">
          {VEDIC_LIBRARY.map((text) => (
            <div 
              key={text.slug} 
              className={`group relative p-10 rounded-[2.5rem] border transition-all duration-700 flex flex-col h-full bg-white ${text.available ? 'border-stone-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.03)] hover:shadow-[0_25px_80px_-25px_rgba(0,0,0,0.1)] hover:-translate-y-2' : 'border-stone-50 opacity-60 bg-stone-50/50 grayscale'}`}
            >
              <div className="flex justify-between items-center mb-8">
                <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${text.available ? 'bg-orange-50/50 text-orange-600 border-orange-100/50' : 'bg-stone-200/50 text-stone-400 border-stone-200/30'}`}>
                  {text.available ? 'Available' : 'Archive'}
                </span>
                <span className="text-[10px] font-bold text-stone-300 uppercase tracking-tighter">{text.category}</span>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-serif font-black text-stone-900 mb-4 leading-tight group-hover:text-orange-600 transition-colors">
                {locale === 'hi' ? text.nameHi : locale === 'mr' ? text.nameMr : text.name}
              </h3>
              <p className="text-stone-500 text-sm mb-10 leading-relaxed font-medium line-clamp-4">
                {text.description}
              </p>

              <div className="mt-auto border-t border-stone-50 pt-8">
                {text.available ? (
                   <div className="flex items-center justify-between">
                     <span className="text-[10px] font-black text-stone-300 uppercase tracking-widest">{text.totalChapters} Chapters</span>
                     <Link 
                       href={`/${text.slug}/1`}
                       className="p-3 bg-stone-50 rounded-2xl group-hover:bg-orange-600 group-hover:text-white transition-all shadow-sm"
                     >
                       <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                     </Link>
                   </div>
                ) : (
                  <p className="text-[10px] font-black text-stone-300 uppercase tracking-widest">Digitalization Pending</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
