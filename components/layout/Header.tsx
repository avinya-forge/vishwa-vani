'use client'

import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { VEDIC_LIBRARY } from '@/lib/texts'
import { changeVishwaLocale } from './locale-provider'
import { useState } from 'react'
import stats from '@/lib/stats.json'

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
    <nav className="w-full flex justify-center border-b border-stone-100 h-20 glass sticky top-0 z-50">
      <div className="w-full max-wide flex justify-between items-center px-6">
        
        <div className="flex gap-8 items-center">
          <Link href="/" className="text-2xl font-serif font-black tracking-tighter text-stone-900 group flex items-center gap-2 transition-transform active:scale-95">
             <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center text-white text-xl shadow-lg ring-4 ring-orange-50 group-hover:rotate-12 transition-transform">ॐ</div>
             <span className="group-hover:text-orange-600 transition-colors hidden xl:inline">Vishwa-Vani</span>
          </Link>
          
          <div className="hidden lg:flex items-center gap-6">
            <div className="relative" onMouseEnter={() => setShowTopics(true)} onMouseLeave={() => setShowTopics(false)}>
                <button className={`flex items-center gap-2 py-4 transition-colors uppercase tracking-[0.2em] text-[11px] font-black ${showTopics ? 'text-orange-600' : 'text-stone-500 hover:text-stone-900'}`}>
                  Library
                  <svg className={`w-3 h-3 transition-transform ${showTopics ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path d="M19 9l-7 7-7-7" /></svg>
                </button>
               
                {showTopics && (
                  <>
                    <div className="absolute top-full left-0 w-[400px] bg-white border border-stone-100 rounded-[2rem] shadow-2xl p-8 animate-in fade-in slide-in-from-top-2 duration-300">
                      <div className="grid grid-cols-2 gap-8">
                         {Object.entries(categories).map(([cat, label]) => (
                           <div key={cat}>
                             <h4 className="text-[10px] font-black text-stone-300 uppercase tracking-widest mb-4 px-1">{label}</h4>
                             <div className="space-y-2">
                               {VEDIC_LIBRARY.filter(b => b.category === cat).slice(0, 3).map(book => (
                                 <Link key={book.slug} href={`/${book.slug}/1`} className="block px-3 py-2 text-[13px] font-bold text-stone-600 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-all">
                                   {locale === 'hi' ? book.nameHi : locale === 'mr' ? book.nameMr : book.name}
                                 </Link>
                               ))}
                             </div>
                           </div>
                         ))}
                      </div>
                    </div>
                    {/* Bridge to prevent accidental closing */}
                    <div className="absolute top-10 left-0 w-full h-4" />
                  </>
                )}
            </div>

            <Link href="/search" className="text-stone-500 hover:text-stone-900 transition-colors uppercase tracking-[0.2em] text-[11px] font-black">
              {t('search')}
            </Link>

            <Link href="/lab" className="text-orange-600 font-black uppercase tracking-[0.2em] text-[11px] flex items-center gap-2 px-4 py-1.5 bg-orange-50 rounded-full border border-orange-100 hover:bg-orange-100 transition-all">
              <span className="animate-pulse">🧪</span> Vedic Labs
            </Link>
          </div>
        </div>

        {/* 💓 ARCHIVAL HEARTBEAT (Center Metrics) */}
        <div className="hidden md:flex items-center gap-12 bg-stone-50/50 px-8 py-2 rounded-full border border-stone-100">
           <div className="flex flex-col items-center">
              <span className="text-[9px] font-black text-stone-300 uppercase tracking-widest">Library</span>
              <span className="text-sm font-black text-stone-700">{stats.totalBooks} <span className="text-[10px] text-stone-400">Books</span></span>
           </div>
           <div className="w-px h-6 bg-stone-200" />
           <div className="flex flex-col items-center">
              <span className="text-[9px] font-black text-stone-300 uppercase tracking-widest">Repository</span>
              <span className="text-sm font-black text-stone-700">{stats.totalVerses.toLocaleString()}+ <span className="text-[10px] text-stone-400">Shlokas</span></span>
           </div>
           <div className="w-px h-6 bg-stone-200" />
           <div className="flex flex-col items-center">
              <span className="text-[9px] font-black text-stone-300 uppercase tracking-widest">AI Status</span>
              <span className="text-sm font-black text-orange-600">Active</span>
           </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Global Locale switcher moved to Study Workspace */}


          <Link href="/bhagavad-gita/1" className="hidden sm:inline-flex py-3 px-8 rounded-2xl bg-stone-900 hover:bg-orange-600 text-white font-black text-xs uppercase tracking-widest transition-all shadow-xl active:scale-95">
            Read Now
          </Link>

          <button onClick={() => setShowMobileMenu(!showMobileMenu)} className="lg:hidden p-3 bg-stone-100 rounded-2xl text-stone-600 hover:text-orange-600 transition-all shadow-sm active:scale-95" aria-label="Menu">
             <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
        </div>

      </div>

      {/* 📱 MODERN MOBILE MENU OVERLAY */}
      {showMobileMenu && (
        <div className="lg:hidden fixed inset-0 z-[100] bg-white pt-20 px-8 flex flex-col animate-in fade-in slide-in-from-top-full duration-500">
           <div className="flex justify-between items-center mb-12">
              <div className="text-2xl font-serif font-black">Menu</div>
              <button onClick={() => setShowMobileMenu(false)} className="p-4 bg-stone-100 rounded-3xl text-stone-600">
                 <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
           </div>

           <div className="space-y-2">
              <Link href="/" onClick={() => setShowMobileMenu(false)} className="block py-6 border-b border-stone-50 text-4xl font-serif font-black text-stone-900 italic">Home</Link>
              <Link href="/lab" onClick={() => setShowMobileMenu(false)} className="block py-6 border-b border-stone-50 text-4xl font-serif font-black text-stone-900 italic">Vedic Labs</Link>
              <Link href="/search" onClick={() => setShowMobileMenu(false)} className="block py-6 border-b border-stone-50 text-4xl font-serif font-black text-stone-900 italic">Search</Link>
           </div>
           
           <div className="mt-auto pb-12">
              <Link href="/bhagavad-gita/1" onClick={() => setShowMobileMenu(false)} className="btn-primary w-full text-center py-6 text-xl">
                 Start Reading
              </Link>
           </div>
        </div>
      )}
    </nav>
  )
}
