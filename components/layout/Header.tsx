'use client'

import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { VEDIC_LIBRARY } from '@/lib/texts'
import { changeVishwaLocale } from './locale-provider'
import { useState } from 'react'

export default function Header() {
  const t = useTranslations('nav')
  const pt = useTranslations('prefs')
  const locale = useLocale()
  const [showTopics, setShowTopics] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  const categories = {
    itihas: 'Itihasa',
    upanishad: 'Upanishads',
    purana: 'Puranas',
    veda: 'Vedas',
    other: 'Other'
  }

  return (
    <nav className="w-full flex justify-center border-b border-stone-100 h-16 glass sticky top-0 z-50">
      <div className="w-full max-wide flex justify-between items-center px-6">
        
        <div className="flex gap-10 items-center">
          <Link href="/" className="text-2xl font-serif font-black tracking-tighter text-stone-900 group flex items-center gap-2 transition-transform active:scale-95">
             <div className="w-8 h-8 md:w-10 md:h-10 bg-orange-600 rounded-xl flex items-center justify-center text-white text-lg md:text-xl shadow-lg ring-4 ring-orange-50 group-hover:rotate-12 transition-transform">ॐ</div>
             <span className="group-hover:text-orange-600 transition-colors hidden sm:inline">Vishwa-Vani</span>
          </Link>
          
          <div className="hidden lg:flex items-center gap-8">
            <div className="relative group" onMouseEnter={() => setShowTopics(true)} onMouseLeave={() => setShowTopics(false)}>
                <button className={`flex items-center gap-2 transition-colors uppercase tracking-[0.2em] text-[13px] font-black ${showTopics ? 'text-orange-600' : 'text-stone-500 hover:text-stone-900'}`}>
                  {t('library')}
                  <svg className={`w-3.5 h-3.5 transition-transform ${showTopics ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path d="M19 9l-7 7-7-7" /></svg>
                </button>
               
                {showTopics && (
                  <div className="absolute top-10 left-0 w-80 bg-white border border-stone-100 rounded-[2rem] shadow-2xl p-6 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="grid grid-cols-1 gap-6">
                       {Object.entries(categories).map(([cat, label]) => (
                         <div key={cat}>
                           <h4 className="text-[11px] font-black text-stone-300 uppercase tracking-widest mb-3 px-1">{label}</h4>
                           <div className="space-y-1">
                             {VEDIC_LIBRARY.filter(b => b.category === cat).slice(0, 3).map(book => (
                               <Link key={book.slug} href={`/${book.slug}/1`} className="block px-3 py-2 text-sm font-bold text-stone-600 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-all">
                                 {locale === 'hi' ? book.nameHi : locale === 'mr' ? book.nameMr : book.name}
                               </Link>
                             ))}
                           </div>
                         </div>
                       ))}
                    </div>
                  </div>
                )}
            </div>

            <Link href="/search" className="text-stone-500 hover:text-stone-900 transition-colors flex items-center gap-2 uppercase tracking-[0.2em] text-[13px] font-black">
              {t('search')}
            </Link>

            <Link href="/lab" className="text-stone-500 hover:text-stone-900 transition-colors flex items-center gap-2 uppercase tracking-[0.2em] text-[13px] font-black">
              Labs
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Global Locale switcher moved to Study Workspace */}


          <Link href="/bhagavad-gita/1" className="hidden md:inline-flex py-3 px-6 rounded-2xl bg-stone-900 hover:bg-orange-600 text-white font-black text-xs uppercase tracking-widest transition-all shadow-xl active:scale-95">
            {t('readNow') || 'Read Now'}
          </Link>

          <button onClick={() => setShowMobileMenu(!showMobileMenu)} className="lg:hidden p-3 bg-stone-100 rounded-2xl text-stone-600 hover:text-orange-600 transition-all shadow-sm active:scale-95" aria-label="Menu">
             <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
        </div>

      </div>

      {/* 📱 MODERN MOBILE MENU OVERLAY */}
      {showMobileMenu && (
        <div className="lg:hidden fixed inset-0 z-[100] bg-white pt-20 px-8 flex flex-col space-y-10 animate-in fade-in slide-in-from-top-full duration-500">
           <button onClick={() => setShowMobileMenu(false)} className="absolute top-6 right-6 p-4 bg-stone-100 rounded-3xl text-stone-600 shadow-sm active:scale-95">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path d="M6 18L18 6M6 6l12 12" /></svg>
           </button>

           <div className="space-y-4">
              <Link href="/search" onClick={() => setShowMobileMenu(false)} className="block py-6 border-b border-stone-100 text-3xl font-serif font-black text-stone-900">{t('search')}</Link>
              <Link href="/lab" onClick={() => setShowMobileMenu(false)} className="block py-6 border-b border-stone-100 text-3xl font-serif font-black text-stone-900">Lab Experiments</Link>
           </div>
           
           <div className="mt-10">
              <span className="label-bold mb-6 block">Library by Category</span>
              <div className="grid grid-cols-2 gap-4">
                 {Object.entries(categories).map(([k,v]) => <div key={k} className="p-4 bg-stone-50 rounded-2xl font-black text-[11px] uppercase tracking-widest text-stone-400">{v}</div>)}
              </div>
           </div>

           <Link href="/bhagavad-gita/1" onClick={() => setShowMobileMenu(false)} className="btn-primary w-full text-center py-6 text-xl">
              Start Reading
           </Link>
        </div>
      )}
    </nav>
  )
}
