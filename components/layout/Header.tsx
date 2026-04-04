'use client'

import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { usePathname } from 'next/navigation'
import { VEDIC_LIBRARY } from '@/lib/texts'
import { useState, useEffect, useRef } from 'react'
import stats from '@/lib/stats.json'

// Custom hook to handle clicks outside the ref element generically
function useOnClickOutside(ref: React.RefObject<HTMLDivElement | null>, handler: (event: MouseEvent | TouchEvent) => void) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      // Do nothing if clicking ref's element or descendant elements
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return
      }
      handler(event)
    }
    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)
    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [ref, handler])
}

export default function Header() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const pathname = usePathname()
  const [showLibrary, setShowLibrary] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [defaultTextSlug, setDefaultTextSlug] = useState('bhagavad-gita')
  const [continueReading, setContinueReading] = useState<{text: string, chapter: number, verse: number} | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Attach generic click outside handler
  useOnClickOutside(dropdownRef, () => setShowLibrary(false))

  // Load continue reading position
  useEffect(() => {
    const saved = localStorage.getItem('vishwa_continue_reading')
    if (saved) {
      try {
        setContinueReading(JSON.parse(saved))
      } catch (e) {
        // Ignore invalid data
      }
    }
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setShowMobileMenu(false)
  }, [pathname])

  // Check if current path is a text page
  const isOnTextPage = pathname.startsWith('/') && pathname.split('/').length >= 3 && !['search', 'lab', 'acknowledgments'].includes(pathname.split('/')[1])

  // Group available books by category  
  const availableBooks = VEDIC_LIBRARY.filter(b => b.available)
  
  const topBooks = availableBooks.slice(0, 5)

  return (
    <nav className="w-full border-b border-stone-100 bg-white/95 backdrop-blur-md sticky top-0 z-[100] h-14">
      <div className="max-w-[1400px] mx-auto h-full flex items-center justify-between px-4 sm:px-6">

        {/* Logo */}
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="flex items-center gap-2 group"
          >
            <div className="w-7 h-7 bg-orange-600 rounded-md flex items-center justify-center text-white text-[13px] shadow-sm group-hover:rotate-12 transition-transform duration-300">ॐ</div>
            <span className="font-serif font-black text-base text-stone-900 group-hover:text-orange-600 transition-colors hidden sm:block">Vishwa-Vani</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-0.5">

            {/* Library dropdown — click-toggle */}
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setShowLibrary(v => !v)}
                aria-expanded={showLibrary}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-bold transition-all ${showLibrary || isOnTextPage ? 'text-orange-600 bg-orange-50' : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'}`}
              >
                Library
                <svg className={`w-3 h-3 transition-transform duration-200 ${showLibrary ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M19 9l-7 7-7-7" /></svg>
              </button>

              {showLibrary && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[420px] bg-white border border-stone-100 rounded-xl shadow-2xl shadow-stone-200/50 overflow-hidden animate-in fade-in slide-in-from-top-1 duration-150 z-[150] origin-top">
                  {/* Continue Reading */}
                  {continueReading && (
                    <div className="px-4 py-3 border-b border-stone-50 bg-orange-50/30">
                      <p className="text-[9px] font-black uppercase tracking-widest text-orange-600 mb-2.5">Continue Reading</p>
                      <Link
                        href={`/${continueReading.text}/${continueReading.chapter}/${continueReading.verse}`}
                        onClick={() => setShowLibrary(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-orange-100 hover:bg-orange-200 text-orange-800 transition-all border border-orange-200 group"
                      >
                        <span className="text-[17px]">📖</span>
                        <div>
                          <div className="text-xs font-bold leading-tight">
                            {VEDIC_LIBRARY.find(b => b.slug === continueReading.text)?.name || continueReading.text}
                          </div>
                          <div className="text-[9px] text-orange-600/70 font-medium">Chapter {continueReading.chapter}, Verse {continueReading.verse}</div>
                        </div>
                      </Link>
                    </div>
                  )}

                  {/* Quick links row */}
                  <div className="px-4 py-3 border-b border-stone-50 bg-stone-50/30">
                    <p className="text-[9px] font-black uppercase tracking-widest text-stone-400 mb-2.5">Available Now</p>
                    <div className="grid grid-cols-2 gap-1.5">
                      {topBooks.map(book => (
                        <Link
                          key={book.slug}
                          href={`/${book.slug}/1`}
                            onClick={() => {
                              setShowLibrary(false)
                              setDefaultTextSlug(book.slug)
                              localStorage.setItem('vishwa_last_text', book.slug)
                            }}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-orange-50 hover:text-orange-700 transition-all border border-transparent hover:border-orange-100 group bg-white shadow-sm"
                        >
                          <span className="text-[17px] opacity-80 group-hover:opacity-100 transition-opacity">{book.icon || '📜'}</span>
                          <div>
                            <div className="text-xs font-bold text-stone-800 group-hover:text-orange-700 leading-tight">
                              {book.name}
                            </div>
                            <div className="text-[9px] text-stone-400 font-medium group-hover:text-orange-500/70">{book.totalChapters} chap</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Browse all */}
                  <div className="px-4 py-2.5 flex items-center justify-between">
                    <span className="text-[10px] text-stone-400 font-medium">{availableBooks.length} texts available</span>
                    <Link href="/" onClick={() => setShowLibrary(false)} className="text-[11px] font-bold text-orange-600 hover:text-orange-700 transition-colors inline-flex items-center gap-1">
                      Full Library <span aria-hidden="true">&rarr;</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link href="/search" className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${pathname === '/search' ? 'text-orange-600 bg-orange-50' : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'}`}>
              Search
            </Link>

            <Link href="/lab" className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-all ${pathname === '/lab' ? 'text-orange-600 bg-orange-50' : 'text-orange-600 hover:bg-orange-50'}`}>
              <span className="text-[13px]">🧪</span> Vedic Labs
            </Link>
          </div>
        </div>

        {/* Centre stats — desktop only */}
        <div className="hidden xl:flex items-center gap-6 text-center">
          <div>
            <div className="text-[9px] font-bold text-stone-300 uppercase tracking-[0.2em]">Books</div>
            <div className="text-xs font-black text-stone-700">{stats.totalBooks}</div>
          </div>
          <div className="w-px h-4 bg-stone-100" />
          <div>
            <div className="text-[9px] font-bold text-stone-300 uppercase tracking-[0.2em]">Verses</div>
            <div className="text-xs font-black text-stone-700">{stats.totalVerses.toLocaleString()}+</div>
          </div>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <Link
            href={`/${defaultTextSlug}/1`}
            onClick={() => {
              localStorage.setItem('vishwa_last_text', defaultTextSlug)
            }}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 bg-stone-900 hover:bg-orange-600 text-white text-[11px] font-bold rounded-lg transition-all shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-stone-900"
          >
            <span className="text-[13px]">📜</span> Begin Reading
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setShowMobileMenu(v => !v)}
            className="lg:hidden p-2 rounded-lg bg-stone-50 text-stone-600 hover:bg-orange-50 hover:text-orange-600 transition-all"
            aria-label="Toggle Navigation Menu"
            aria-expanded={showMobileMenu}
          >
            {showMobileMenu
              ? <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M6 18L18 6M6 6l12 12" /></svg>
              : <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M4 6h16M4 12h16M4 18h16" /></svg>
            }
          </button>
        </div>
      </div>

      {/* Mobile menu — slide down panel */}
      {showMobileMenu && (
        <div className="lg:hidden fixed inset-x-0 top-14 bg-white/95 backdrop-blur-xl border-b border-stone-100 shadow-2xl z-[150] animate-in slide-in-from-top-0 duration-200 h-[calc(100vh-3.5rem)] overflow-y-auto">
          <div className="max-w-[1400px] mx-auto px-4 py-5 space-y-1.5">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 mb-3 ml-2">Available Library</p>
            {topBooks.map(book => (
              <Link
                key={book.slug}
                href={`/${book.slug}/1`}
                onClick={() => setShowMobileMenu(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-orange-50 transition-all bg-stone-50/50"
              >
                <span className="text-xl opacity-80">{book.icon || '📜'}</span>
                <span className="text-sm font-bold text-stone-800">{book.name}</span>
              </Link>
            ))}
            <div className="border-t border-stone-100 mt-5 pt-5 space-y-1.5">
              <Link href="/search" onClick={() => setShowMobileMenu(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-stone-50 transition-all text-sm font-bold text-stone-600">🔍 Deep Search</Link>
              <Link href="/lab" onClick={() => setShowMobileMenu(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-orange-50 transition-all text-sm font-bold text-orange-600">🧪 Vedic Labs</Link>
              <Link href="/bhagavad-gita/1" onClick={() => setShowMobileMenu(false)} className="flex items-center justify-center gap-2 mt-4 w-full px-6 py-3.5 bg-stone-900 hover:bg-orange-600 text-white text-sm font-bold rounded-xl transition-all shadow-md">📜 Begin Reading</Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

