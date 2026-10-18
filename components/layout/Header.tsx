'use client'

import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { usePathname } from 'next/navigation'
import { VEDIC_LIBRARY, isTextCompleted, COMPLETED_BOOK_STATS, COMPLETED_BOOKS_SLUGS, PIPELINE_BOOK_STATS } from '@/lib/texts'
import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { AnimatedStat } from '@/components/ui/animated-stat'

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

export interface HeaderStatsProp {
  completedBooks?: number
  pipelineBooks?: number
  completedVerses?: number
  completedChapters?: number
  totalBooks?: number
}

export default function Header({ stats }: { stats?: HeaderStatsProp }) {
  const defaultVerses = Object.values(COMPLETED_BOOK_STATS).reduce((acc, b) => acc + b.verses, 0)
  const defaultChapters = Object.values(COMPLETED_BOOK_STATS).reduce((acc, b) => acc + b.chapters, 0)
  const defaultBooks = COMPLETED_BOOKS_SLUGS.length
  const defaultPipeline = Object.keys(PIPELINE_BOOK_STATS).length

  const safeStats = {
    completedBooks: stats?.completedBooks ?? defaultBooks,
    pipelineBooks: stats?.pipelineBooks ?? defaultPipeline,
    completedVerses: stats?.completedVerses ?? defaultVerses,
    completedChapters: stats?.completedChapters ?? defaultChapters,
    totalBooks: stats?.totalBooks ?? VEDIC_LIBRARY.length,
  }
  const _t = useTranslations('nav')
  const _locale = useLocale()
  const pathname = usePathname()
  const [showLibrary, setShowLibrary] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [defaultTextSlug, setDefaultTextSlug] = useState('bhagavad-gita')
  const [continueReading, setContinueReading] = useState<{text: string, chapter: number, verse: number} | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Attach generic click outside handler
  useOnClickOutside(dropdownRef, () => setShowLibrary(false))

  useEffect(() => {
    setMounted(true)
  }, [])

  // Handle escape key and body scroll locking for mobile menu
  useEffect(() => {
    if (showMobileMenu) {
      document.body.style.overflow = 'hidden'
      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setShowMobileMenu(false)
      }
      window.addEventListener('keydown', onKeyDown)
      return () => {
        document.body.style.overflow = ''
        window.removeEventListener('keydown', onKeyDown)
      }
    } else {
      document.body.style.overflow = ''
    }
  }, [showMobileMenu])

  // Load continue reading position and last text
  useEffect(() => {
    const savedReading = localStorage.getItem('vishwa_continue_reading')
    if (savedReading) {
      try {
        setContinueReading(JSON.parse(savedReading))
      } catch {
        // Ignore invalid data
      }
    }

    const savedText = localStorage.getItem('vishwa_last_text')
    if (savedText) {
      setDefaultTextSlug(savedText)
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
  const completedBooksList = VEDIC_LIBRARY.filter(b => isTextCompleted(b.slug))
  const topBooks = completedBooksList.length > 0 ? completedBooksList : availableBooks.slice(0, 5)

  return (
    <nav className="w-full border-b border-stone-100/50 dark:border-stone-800/50 glass sticky top-0 z-[100] h-14">
      <div className="max-w-[1400px] mx-auto h-full flex items-center justify-between px-4 sm:px-6">

        {/* Logo */}
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="flex items-center gap-2 group"
          >
            <div className="w-7 h-7 bg-orange-600 rounded-md flex items-center justify-center text-white text-base font-serif font-bold shadow-sm group-hover:rotate-12 transition-transform duration-300 select-none" aria-label="Om">ॐ</div>
            <span className="font-serif font-black text-base text-stone-900 dark:text-stone-100 group-hover:text-orange-600 transition-colors hidden sm:block">Vishwa-Vani</span>
            <div className="hidden md:flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-orange-100/50 dark:bg-orange-900/30 border border-orange-200 dark:border-orange-800 text-[10px] font-bold text-orange-700 dark:text-orange-400 uppercase tracking-wider ml-3">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
              <span><AnimatedStat targetCount={safeStats.completedVerses} /> Gold Verses</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-0.5">

            {/* Library dropdown — click-toggle and direct link */}
            <div ref={dropdownRef} className="relative flex items-center">
              <Link
                href="/library"
                className={`flex items-center gap-1 pl-3 pr-1 py-1.5 rounded-l-md text-xs font-bold transition-all focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:outline-none ${pathname === '/library' || isOnTextPage ? 'text-orange-600 bg-orange-50 dark:bg-orange-950/40' : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200 hover:bg-stone-50 dark:hover:bg-stone-800'}`}
              >
                Library
              </Link>
              <button
                onClick={() => setShowLibrary(v => !v)}
                aria-expanded={showLibrary}
                aria-label="Toggle Quick Library Menu"
                className={`pr-2 pl-1 py-1.5 rounded-r-md text-xs font-bold transition-all focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:outline-none ${showLibrary ? 'text-orange-600 bg-orange-50 dark:bg-orange-950/40' : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200 hover:bg-stone-50 dark:hover:bg-stone-800'}`}
              >
                <svg className={`w-3 h-3 transition-transform duration-200 ${showLibrary ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M19 9l-7 7-7-7" /></svg>
              </button>

              {showLibrary && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[420px] bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800 rounded-xl shadow-2xl shadow-stone-200/50 dark:shadow-stone-950/50 overflow-hidden animate-in fade-in slide-in-from-top-1 duration-150 z-[150] origin-top">
                  {/* Continue Reading */}
                  {continueReading && (
                    <div className="px-4 py-3 border-b border-stone-50 dark:border-stone-800 bg-orange-50/30 dark:bg-orange-950/20">
                      <p className="text-[9px] font-black uppercase tracking-widest text-orange-600 dark:text-orange-500 mb-2.5">Continue Reading</p>
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
                  <div className="px-4 py-3 border-b border-stone-50 dark:border-stone-800 bg-stone-50/30 dark:bg-stone-800/30">
                    <p className="text-[9px] font-black uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-2.5">Available Now</p>
                    <div className="flex flex-col gap-1 max-h-[360px] overflow-y-auto pr-1">
                      {topBooks.map(book => (
                        <Link
                          key={book.slug}
                          href={`/${book.slug}/1`}
                            onClick={() => {
                              setShowLibrary(false)
                              setDefaultTextSlug(book.slug)
                              localStorage.setItem('vishwa_last_text', book.slug)
                            }}
                          className="px-3 py-2 rounded-md hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors flex justify-between items-center"
                        >
                          <div className="text-sm font-semibold text-stone-700 dark:text-stone-300">
                            {book.name}
                          </div>
                          <div className="text-[10px] text-stone-400 dark:text-stone-500">{book.totalChapters} chap</div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Browse all */}
                  <div className="px-4 py-2.5 flex items-center justify-between">
                    <span className="text-[10px] text-stone-400 dark:text-stone-500 font-medium">{safeStats.totalBooks} Canonical Scriptures</span>
                    <Link href="/library" onClick={() => setShowLibrary(false)} className="text-[11px] font-bold text-orange-600 hover:text-orange-700 transition-colors inline-flex items-center gap-1">
                      Full Library <span aria-hidden="true">&rarr;</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link href="/essence" className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-all focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:outline-none ${pathname.startsWith('/essence') ? 'text-orange-600 bg-orange-50 dark:bg-orange-950/40' : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200 hover:bg-stone-50 dark:hover:bg-stone-800'}`}>
              <span>⚡</span>
              <span>Essence</span>
            </Link>

            <Link href="/knowledge" className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-all focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:outline-none ${pathname.startsWith('/knowledge') ? 'text-orange-600 bg-orange-50 dark:bg-orange-950/40' : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200 hover:bg-stone-50 dark:hover:bg-stone-800'}`}>
              <span>🔬</span>
              <span>Science</span>
            </Link>

            <Link href="/search" className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-all focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:outline-none ${pathname === '/search' ? 'text-orange-600 bg-orange-50 dark:bg-orange-950/40' : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200 hover:bg-stone-50 dark:hover:bg-stone-800'}`}>
              <span>🔍</span>
              <span>Search</span>
            </Link>

            <Link href="/lab" className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-all focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:outline-none ${pathname === '/lab' ? 'text-orange-600 bg-orange-50 dark:bg-orange-950/40' : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200 hover:bg-stone-50 dark:hover:bg-stone-800'}`}>
              <span>🧪</span>
              <span>Vedic Labs</span>
            </Link>

            <Link href="/roadmap" className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-all focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:outline-none ${pathname === '/roadmap' ? 'text-orange-600 bg-orange-50 dark:bg-orange-950/40' : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200 hover:bg-stone-50 dark:hover:bg-stone-800'}`}>
              <span>📊</span>
              <span>Roadmap</span>
            </Link>

            <Link href="/admin" className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-all focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:outline-none ${pathname === '/admin' ? 'text-orange-600 bg-orange-50 dark:bg-orange-950/40' : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200 hover:bg-stone-50 dark:hover:bg-stone-800'}`}>
              <span>⚡</span>
              <span>Admin</span>
            </Link>
          </div>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {continueReading ? (
            <Link
              href={`/${continueReading.text}/${continueReading.chapter}/${continueReading.verse}`}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 bg-stone-900 hover:bg-orange-600 text-white text-[11px] font-bold rounded-lg transition-all shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-stone-900"
            >
              <span>📖</span>
              <span>Resume Reading</span>
            </Link>
          ) : (
            <Link
              href="/library"
              onClick={() => {
                localStorage.setItem('vishwa_last_text', defaultTextSlug)
              }}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 bg-stone-900 hover:bg-orange-600 text-white text-[11px] font-bold rounded-lg transition-all shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-stone-900"
            >
              <span>📜</span>
              <span>Explore Library</span>
            </Link>
          )}

          {/* Mobile hamburger */}
          <button
            onClick={() => setShowMobileMenu(v => !v)}
            className="lg:hidden p-2 rounded-lg bg-stone-50 dark:bg-stone-900 text-stone-600 dark:text-stone-400 hover:bg-orange-50 dark:hover:bg-orange-950/40 hover:text-orange-600 dark:hover:text-orange-500 transition-all focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:outline-none"
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

// Mobile menu — rendered via React Portal directly into body to completely escape nav glass containing block
      {mounted && showMobileMenu && typeof document !== 'undefined' && createPortal(
        <div className="lg:hidden">
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 top-14 bg-stone-950/70 backdrop-blur-sm z-[999] animate-in fade-in duration-200"
            onClick={() => setShowMobileMenu(false)}
            aria-hidden="true"
          />

          {/* Opaque sliding drawer container */}
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Navigation Menu"
            className="fixed inset-x-0 top-14 bg-[#FDFBF7] dark:bg-stone-950 border-b border-stone-200 dark:border-stone-800 shadow-2xl z-[1000] animate-in slide-in-from-top-0 duration-200 h-[calc(100dvh-3.5rem)] overflow-y-auto"
          >
            <div className="max-w-[1400px] mx-auto px-4 py-5 space-y-4">
              {/* Continue Reading Card if available */}
              {continueReading && (
                <div className="p-3.5 rounded-xl bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800/50">
                  <p className="text-[10px] font-black uppercase tracking-wider text-orange-600 dark:text-orange-400 mb-1.5">Resume Reading</p>
                  <Link
                    href={`/${continueReading.text}/${continueReading.chapter}/${continueReading.verse}`}
                    onClick={() => setShowMobileMenu(false)}
                    className="flex items-center justify-between text-sm font-bold text-stone-800 dark:text-stone-200 hover:text-orange-600 transition-colors"
                  >
                    <span>{VEDIC_LIBRARY.find(b => b.slug === continueReading.text)?.name || continueReading.text}</span>
                    <span className="text-xs text-orange-600 font-semibold">Ch {continueReading.chapter}, V {continueReading.verse} &rarr;</span>
                  </Link>
                </div>
              )}

              {/* Canonical Scriptures Spotlight */}
              <div>
                <div className="flex items-center justify-between mb-2.5 px-1">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400">Featured Scriptures</p>
                  <Link
                    href="/library"
                    onClick={() => setShowMobileMenu(false)}
                    className="text-[11px] font-bold text-orange-600 dark:text-orange-400 hover:underline"
                  >
                    All {safeStats.completedBooks} Books &rarr;
                  </Link>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {topBooks.slice(0, 8).map(book => (
                    <Link
                      key={book.slug}
                      href={`/${book.slug}/1`}
                      onClick={() => setShowMobileMenu(false)}
                      className="px-3 py-2.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-orange-500 dark:hover:border-orange-500 transition-all text-xs font-bold text-stone-800 dark:text-stone-200 line-clamp-1 shadow-sm"
                    >
                      {book.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Main Navigation Links */}
              <div className="border-t border-stone-200 dark:border-stone-800 pt-4 space-y-1.5">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400 mb-2 px-1">Explore</p>
                
                <Link
                  href="/essence"
                  onClick={() => setShowMobileMenu(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-bold border ${pathname.startsWith('/essence') ? 'text-orange-600 bg-orange-50 dark:bg-orange-950/30 border-orange-200 dark:border-orange-900' : 'text-stone-700 dark:text-stone-300 bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-800'}`}
                >
                  <span>⚡</span>
                  <span>Essence (Quick Wisdom)</span>
                </Link>

                <Link
                  href="/knowledge"
                  onClick={() => setShowMobileMenu(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-bold border ${pathname.startsWith('/knowledge') ? 'text-orange-600 bg-orange-50 dark:bg-orange-950/30 border-orange-200 dark:border-orange-900' : 'text-stone-700 dark:text-stone-300 bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-800'}`}
                >
                  <span>🔬</span>
                  <span>Vedic Science &amp; Ontologies</span>
                </Link>

                <Link
                  href="/search"
                  onClick={() => setShowMobileMenu(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-bold border ${pathname === '/search' ? 'text-orange-600 bg-orange-50 dark:bg-orange-950/30 border-orange-200 dark:border-orange-900' : 'text-stone-700 dark:text-stone-300 bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-800'}`}
                >
                  <span>🔍</span>
                  <span>Deep Multi-Lingual Search</span>
                </Link>

                <Link
                  href="/lab"
                  onClick={() => setShowMobileMenu(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-bold border ${pathname === '/lab' ? 'text-orange-600 bg-orange-50 dark:bg-orange-950/30 border-orange-200 dark:border-orange-900' : 'text-stone-700 dark:text-stone-300 bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-800'}`}
                >
                  <span>🧪</span>
                  <span>Vedic Labs &amp; Simulators</span>
                </Link>

                <Link
                  href="/roadmap"
                  onClick={() => setShowMobileMenu(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-bold border ${pathname === '/roadmap' ? 'text-orange-600 bg-orange-50 dark:bg-orange-950/30 border-orange-200 dark:border-orange-900' : 'text-stone-700 dark:text-stone-300 bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-800'}`}
                >
                  <span>📊</span>
                  <span>Roadmap &amp; Metrics</span>
                </Link>

                <Link
                  href="/admin"
                  onClick={() => setShowMobileMenu(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-bold border ${pathname === '/admin' ? 'text-orange-600 bg-orange-50 dark:bg-orange-950/30 border-orange-200 dark:border-orange-900' : 'text-stone-700 dark:text-stone-300 bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-800'}`}
                >
                  <span>⚡</span>
                  <span>Admin Terminal Console</span>
                </Link>

                <Link
                  href="/library"
                  onClick={() => setShowMobileMenu(false)}
                  className="flex items-center justify-center gap-2 mt-4 w-full px-6 py-3.5 bg-stone-900 hover:bg-orange-600 text-white text-sm font-bold rounded-xl transition-all shadow-md"
                >
                  <span>📜</span>
                  <span>Explore Full Sacred Library ({safeStats.completedBooks} Books)</span>
                </Link>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </nav>
  )
}



