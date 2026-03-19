'use client'

import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { VEDIC_LIBRARY } from '@/lib/texts'
import { changeVishwaLocale } from './LocaleProvider'
import { useState } from 'react'

export default function Header() {
  const t = useTranslations('nav')
  const pt = useTranslations('prefs')
  const locale = useLocale()
  const [showTopics, setShowTopics] = useState(false)
  const [showLangs, setShowLangs] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  const categories = {
    itihas: 'Itihasa',
    upanishad: 'Upanishads',
    purana: 'Puranas',
    veda: 'Vedas',
    other: 'Other'
  }

  return (
    <nav className="w-full flex justify-center border-b border-stone-200 h-14 bg-white/70 backdrop-blur-xl sticky top-0 z-50 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)]">
      <div className="w-full max-wide flex justify-between items-center px-4 sm:px-8">
        
        <div className="flex gap-8 items-center">
          <Link href="/" className="text-xl font-serif font-black tracking-tighter text-orange-600 hover:scale-105 transition-transform">
            Vishwa-Vani
          </Link>
          
          <div className="hidden lg:flex items-center gap-7 text-[13px] font-semibold text-stone-500">
            <div className="relative group">
                <button 
                  onClick={() => setShowTopics(!showTopics)}
                  onBlur={() => setTimeout(() => setShowTopics(false), 200)}
                  className="flex items-center gap-1.5 hover:text-orange-600 transition-colors uppercase tracking-widest text-[12px]"
                >
                 {t('library')}
                 <svg className={`w-3 h-3 transition-transform ${showTopics ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
               </button>
               
               {showTopics && (
                 <div className="absolute top-10 left-0 w-64 bg-white border border-stone-100 rounded-2xl shadow-2xl p-4 animate-in fade-in slide-in-from-top-2 duration-200">
                   {Object.entries(categories).map(([cat, label]) => (
                     <div key={cat} className="mb-3 last:mb-0">
                       <h4 className="text-[11px] font-bold text-stone-300 uppercase tracking-widest mb-2 px-2">{label}</h4>
                       <div className="space-y-1">
                         {VEDIC_LIBRARY.filter(b => b.category === cat).slice(0, 3).map(book => (
                           <Link 
                             key={book.slug} 
                             href={`/${book.slug}/1`}
                             className="block px-2 py-1.5 text-stone-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors overflow-hidden text-ellipsis whitespace-nowrap"
                           >
                             {locale === 'hi' ? book.nameHi : locale === 'mr' ? book.nameMr : book.name}
                           </Link>
                         ))}
                       </div>
                     </div>
                   ))}
                 </div>
               )}
            </div>

            <Link href="/search" className="hover:text-orange-600 transition-colors flex items-center gap-1.5 uppercase tracking-widest text-[11px]">
              {t('search')}
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Language Selector */}
          <div className="relative">
            <button 
              onClick={() => setShowLangs(!showLangs)}
              onBlur={() => setTimeout(() => setShowLangs(false), 200)}
              className="px-3 py-1.5 bg-stone-100 rounded-full text-[11px] font-bold text-stone-600 hover:bg-stone-200 transition-colors flex items-center gap-2"
            >
              <span className="opacity-50">🌐</span> {pt(locale)}
            </button>
            
            {showLangs && (
              <div className="absolute top-10 right-0 w-32 bg-white border border-stone-100 rounded-xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-100">
                {(['en', 'hi', 'mr'] as const).map(l => (
                  <button 
                    key={l}
                    onClick={() => changeVishwaLocale(l)}
                    className={`w-full text-left px-4 py-2.5 text-xs font-medium hover:bg-orange-50 hover:text-orange-600 transition-colors ${locale === l ? 'bg-orange-50 text-orange-600' : 'text-stone-600'}`}
                  >
                    {pt(l)}
                  </button>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/bhagavad-gita/1"
            className="hidden sm:inline-flex py-1.5 px-5 rounded-full bg-stone-900 hover:bg-orange-600 text-white font-bold text-[12px] uppercase tracking-wider transition-all shadow-md active:scale-95"
          >
            {t('readNow') || 'Read Now'}
          </Link>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="lg:hidden p-2 text-stone-600 hover:text-orange-600 transition-colors ml-1"
            aria-label="Toggle mobile menu"
          >
            {showMobileMenu ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            )}
          </button>
        </div>

      </div>

      {/* Mobile Menu Overlay */}
      {showMobileMenu && (
        <div className="lg:hidden absolute top-14 left-0 w-full bg-white border-b border-stone-200 shadow-2xl animate-in slide-in-from-top-2 duration-300 z-40 max-h-[80vh] overflow-y-auto">
          <div className="p-4 space-y-6">
            <Link 
              href="/search" 
              onClick={() => setShowMobileMenu(false)}
              className="flex items-center gap-2 p-3 bg-stone-50 rounded-xl font-bold text-orange-600 border border-stone-100"
            >
              <span>🔍</span> {t('search')}
            </Link>

            <div>
              <h3 className="text-xs font-black text-stone-400 uppercase tracking-widest mb-3 px-2">Library</h3>
              {Object.entries(categories).map(([cat, label]) => (
                <div key={cat} className="mb-4 last:mb-0">
                  <h4 className="text-[11px] font-bold text-stone-800 uppercase tracking-widest bg-stone-100 py-1 px-3 rounded-md mb-2">{label}</h4>
                  <div className="space-y-1">
                    {VEDIC_LIBRARY.filter(b => b.category === cat).map(book => (
                      <Link 
                        key={book.slug} 
                        href={`/${book.slug}/1`}
                        onClick={() => setShowMobileMenu(false)}
                        className="block px-3 py-2 text-sm text-stone-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors border-b border-stone-50 last:border-0"
                      >
                        {locale === 'hi' ? book.nameHi : locale === 'mr' ? book.nameMr : book.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            <Link
              href="/bhagavad-gita/1"
              onClick={() => setShowMobileMenu(false)}
              className="sm:hidden block w-full text-center py-3 rounded-xl bg-stone-900 text-white font-bold text-sm tracking-widest uppercase shadow-md"
            >
              {t('readNow') || 'Read Now'}
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

