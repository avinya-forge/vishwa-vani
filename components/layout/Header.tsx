'use client'

import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { VEDIC_LIBRARY } from '@/lib/texts'
import { useState, useEffect, useRef } from 'react'
import stats from '@/lib/stats.json'

export default function Header() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const [showLibrary, setShowLibrary] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowLibrary(false)
      }
    }
    if (showLibrary) document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [showLibrary])

  // Close mobile menu on route change
  useEffect(() => {
    setShowMobileMenu(false)
  }, [])

  // Group available books by category  
  const availableBooks = VEDIC_LIBRARY.filter(b => b.available)
  const categoryGroups: Record<string, typeof availableBooks> = {}
  availableBooks.forEach(book => {
    if (!categoryGroups[book.category]) categoryGroups[book.category] = []
    categoryGroups[book.category].push(book)
  })

  const categoryLabels: Record<string, string> = {
    itihas: 'Itihasa', upanishad: 'Upanishads',
    purana: 'Puranas', veda: 'Vedas', other: 'Other'
  }

  const topBooks = availableBooks.slice(0, 5)

  return (
    <nav className="w-full border-b border-stone-100 bg-white/90 backdrop-blur-md sticky top-0 z-50 h-16">
      <div className="max-w-[1400px] mx-auto h-full flex items-center justify-between px-6">

        {/* Logo */}
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="flex items-center gap-2.5 group"
          >
            <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center text-white text-base shadow-md group-hover:rotate-12 transition-transform duration-300">ॐ</div>
            <span className="font-serif font-black text-lg text-stone-900 group-hover:text-orange-600 transition-colors hidden sm:block">Vishwa-Vani</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">

            {/* Library dropdown — click-toggle */}
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setShowLibrary(v => !v)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-bold transition-all ${showLibrary ? 'text-orange-600 bg-orange-50' : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'}`}
              >
                Library
                <svg className={`w-3.5 h-3.5 transition-transform duration-200 ${showLibrary ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M19 9l-7 7-7-7" /></svg>
              </button>

              {showLibrary && (
                <div className="absolute top-full left-0 mt-2 w-[460px] bg-white border border-stone-100 rounded-2xl shadow-2xl shadow-stone-200/60 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                  {/* Quick links row */}
                  <div className="px-5 pt-5 pb-3 border-b border-stone-50">
                    <p className="text-[10px] font-black uppercase tracking-widest text-stone-300 mb-3">Available Now</p>
                    <div className="grid grid-cols-2 gap-1.5">
                      {topBooks.map(book => (
                        <Link
                          key={book.slug}
                          href={`/${book.slug}/1`}
                          onClick={() => setShowLibrary(false)}
                          className="flex items-center gap-2 px-3 py-2.5 rounded-xl hover:bg-orange-50 hover:text-orange-700 transition-all group"
                        >
                          <span className="text-base">{book.icon || '📜'}</span>
                          <div>
                            <div className="text-sm font-bold text-stone-800 group-hover:text-orange-700 leading-tight">
                              {book.name}
                            </div>
                            <div className="text-[10px] text-stone-400 font-medium">{book.totalChapters} chapters</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Browse all */}
                  <div className="px-5 py-3 flex items-center justify-between">
                    <span className="text-xs text-stone-400 font-medium">{availableBooks.length} texts available · More coming soon</span>
                    <Link href="/" onClick={() => setShowLibrary(false)} className="text-xs font-bold text-orange-600 hover:text-orange-700 transition-colors">
                      Full Library →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link href="/search" className="px-4 py-2 rounded-lg text-sm font-bold text-stone-600 hover:text-stone-900 hover:bg-stone-50 transition-all">
              Search
            </Link>

            <Link href="/lab" className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-bold text-orange-600 hover:bg-orange-50 transition-all">
              <span>🧪</span> Vedic Labs
            </Link>
          </div>
        </div>

        {/* Centre stats — desktop only */}
        <div className="hidden xl:flex items-center gap-8 text-center">
          <div>
            <div className="text-[10px] font-bold text-stone-300 uppercase tracking-widest">Books</div>
            <div className="text-sm font-black text-stone-700">{stats.totalBooks}</div>
          </div>
          <div className="w-px h-5 bg-stone-100" />
          <div>
            <div className="text-[10px] font-bold text-stone-300 uppercase tracking-widest">Verses</div>
            <div className="text-sm font-black text-stone-700">{stats.totalVerses.toLocaleString()}+</div>
          </div>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          <Link
            href="/bhagavad-gita/1"
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-stone-900 hover:bg-orange-600 text-white text-xs font-bold rounded-xl transition-all shadow-md"
          >
            <span>📜</span> Begin Reading
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setShowMobileMenu(v => !v)}
            className="lg:hidden p-2.5 rounded-xl bg-stone-100 text-stone-600 hover:bg-orange-50 hover:text-orange-600 transition-all"
            aria-label="Open menu"
          >
            {showMobileMenu
              ? <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M6 18L18 6M6 6l12 12" /></svg>
              : <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M4 6h16M4 12h16M4 18h16" /></svg>
            }
          </button>
        </div>
      </div>

      {/* Mobile menu — slide down panel */}
      {showMobileMenu && (
        <div className="lg:hidden fixed inset-x-0 top-16 bg-white border-b border-stone-100 shadow-xl z-40 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="max-w-[1400px] mx-auto px-6 py-6 space-y-1">
            <p className="text-[10px] font-black uppercase tracking-widest text-stone-300 mb-4">Library</p>
            {topBooks.map(book => (
              <Link
                key={book.slug}
                href={`/${book.slug}/1`}
                onClick={() => setShowMobileMenu(false)}
                className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-orange-50 transition-all"
              >
                <span className="text-lg">{book.icon || '📜'}</span>
                <span className="text-sm font-bold text-stone-800">{book.name}</span>
              </Link>
            ))}
            <div className="border-t border-stone-50 mt-4 pt-4 space-y-1">
              <Link href="/search" onClick={() => setShowMobileMenu(false)} className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-stone-50 transition-all text-sm font-bold text-stone-600">🔍 Search</Link>
              <Link href="/lab" onClick={() => setShowMobileMenu(false)} className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-orange-50 transition-all text-sm font-bold text-orange-600">🧪 Vedic Labs</Link>
              <Link href="/bhagavad-gita/1" onClick={() => setShowMobileMenu(false)} className="flex items-center justify-center gap-2 mt-4 w-full px-6 py-3.5 bg-stone-900 hover:bg-orange-600 text-white text-sm font-bold rounded-xl transition-all">📜 Begin Reading</Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
