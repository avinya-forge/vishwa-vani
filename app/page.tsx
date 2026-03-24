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

  if (!mounted) return <div className="min-h-screen bg-background" />

  return (
    <main className="min-h-screen bg-background selection:bg-orange-100 py-12 md:py-24 px-6">
      <div className="max-wide mx-auto">
        
        {/* 🏛️ VEDIC PORTAL HERO */}
        <header className="mb-20 text-center relative max-w-4xl mx-auto">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-orange-100/20 blur-[120px] rounded-full pointer-events-none vedic-bg-shimmer" />
          <div className="relative z-10 space-y-8">
            <span className="inline-block py-2 px-6 rounded-full glass border border-orange-100 text-orange-600 text-[11px] font-black tracking-[0.3em] uppercase shadow-sm">
               Exploring Eternal Wisdom
            </span>
            <h1 className="heading-hero">
              {t('title')}
            </h1>
            <p className="text-xl md:text-2xl text-stone-500 max-w-2xl mx-auto leading-relaxed font-serif italic">
              &ldquo;{t('description')}&rdquo;
            </p>
            <div className="flex justify-center gap-4 pt-4">
              <Link 
                href="/bhagavad-gita/1" 
                className="btn-primary flex items-center gap-3 px-10 shadow-orange-100"
              >
                <span>📖</span> {t('beginReading')}
              </Link>
            </div>
          </div>
        </header>

        {/* 📚 THE UNIVERSAL COLLECTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {VEDIC_LIBRARY.map((text) => (
            <Link 
              key={text.slug} 
              href={text.available ? `/${text.slug}/1` : '#'}
              className={`group card-premium p-8 flex flex-col h-full min-h-[380px] bg-white/60 relative overflow-hidden ${!text.available && 'opacity-40 grayscale pointer-events-none'}`}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-orange-100 transition-colors duration-700" />
              
              <div className="flex justify-between items-center mb-6 relative z-10">
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border transition-colors ${text.available ? 'bg-orange-50 text-orange-700 border-orange-200' : 'bg-stone-100 text-stone-400 border-stone-200'}`}>
                  {text.available ? 'Available' : 'Coming Soon'}
                </span>
                <span className="label-bold !text-[11px] !text-stone-300 group-hover:!text-orange-400 transition-colors">{text.category}</span>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-serif font-black text-stone-900 mb-4 leading-[1.1] group-hover:text-orange-600 transition-colors relative z-10">
                {locale === 'hi' ? text.nameHi : locale === 'mr' ? text.nameMr : text.name}
              </h3>
              
              <p className="text-stone-500 text-sm mb-8 leading-relaxed font-medium line-clamp-4 font-serif relative z-10">
                {text.description}
              </p>

              <div className="mt-auto pt-6 border-t border-stone-100 flex items-center justify-between relative z-10">
                <div>
                   <span className="label-bold !text-stone-300 block mb-0.5">Chapters</span>
                   <span className="text-2xl font-serif font-black text-stone-900 group-hover:text-orange-600 transition-colors">{text.totalChapters}</span>
                </div>
                <div className="w-12 h-12 bg-stone-900 text-white rounded-2xl flex items-center justify-center transition-all group-hover:bg-orange-600 group-hover:scale-110 shadow-lg">
                   <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
