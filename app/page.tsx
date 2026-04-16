'use client'

import Link from 'next/link'
import { getLibraryStats, getVedicHierarchy, VEDIC_LIBRARY } from '@/lib/texts'
import { useTranslations, useLocale } from 'next-intl'
import { useState, useEffect } from 'react'

export default function Home() {
  const t = useTranslations('home')
  const locale = useLocale()
  const [mounted, setMounted] = useState(false)
  const [defaultTextSlug, setDefaultTextSlug] = useState('bhagavad-gita')
  const stats = getLibraryStats()
  const hierarchy = getVedicHierarchy()

  useEffect(() => { 
    setMounted(true)
    const saved = localStorage.getItem('vishwa_last_text')
    if (saved) setDefaultTextSlug(saved)
  }, [])
  if (!mounted) return <div className="min-h-screen bg-[#FDFBF7] dark:bg-[#1C1917]" />
  
  const statsList = [
    { n: stats.totalBooks, label: 'Sacred Texts', icon: '📜' },
    { n: `${stats.totalVerses}`, label: 'Verses', icon: '✨' },
    { n: '3', label: 'Languages', icon: '🌍' },
  ]

  // Only show categories that have at least one available book
  const categories = stats.categories.filter((cat: string) =>
    hierarchy.tree.some((t: unknown) => (t as Record<string, unknown>).category === cat && (t as Record<string, unknown>).available)
  )

  return (
    <div className="min-h-screen bg-[#FDFBF7] dark:bg-[#1C1917] selection:bg-orange-500/20">
      {/* 🌌 AMBIENT GLOW */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-orange-100/40 dark:bg-orange-900/10 rounded-full blur-[120px] -mr-96 -mt-96 pointer-events-none" />
      <div className="absolute top-[20%] left-0 w-[600px] h-[600px] bg-stone-100/60 dark:bg-stone-900/30 rounded-full blur-[100px] -ml-96 pointer-events-none" />


      {/* ═══════ HERO ═══════ */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-10 pb-12 text-center">
        <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-orange-50 border border-orange-100 text-orange-700 text-[10px] font-bold uppercase tracking-[0.2em]">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
          Eternal Wisdom · Open Access
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif font-black text-stone-900 dark:text-stone-100 leading-[1.1] tracking-tight mb-6">
          The Universal Portal to <span className="bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">Vedic Wisdom</span>
        </h1>

        <p className="text-lg md:text-xl text-stone-600 dark:text-stone-400 max-w-3xl mx-auto leading-relaxed font-serif italic mb-10 opacity-80">
          &ldquo;{t('description') || 'Restoring the Universal Voice of Vedic Wisdom through AI-integrated scholarship and open-access intelligence.'}&rdquo;
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Link
            href={`/${defaultTextSlug}/1`}
            className="inline-flex items-center gap-3 px-8 py-4 bg-stone-900 hover:bg-orange-600 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-orange-400 text-white font-black rounded-2xl transition-all shadow-xl shadow-stone-200/50 dark:shadow-none text-[11px] uppercase tracking-widest group"
          >
            <span>📜</span> Begin Reading
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </Link>
          <Link
            href="/lab"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white hover:bg-orange-50 dark:bg-stone-900 dark:hover:bg-orange-950/30 text-stone-900 dark:text-stone-100 font-black rounded-2xl border border-stone-200 dark:border-stone-800 hover:border-orange-200 transition-all text-[11px] uppercase tracking-widest shadow-sm"
          >
            <span>🧪</span> Explore Labs
          </Link>
        </div>

        {/* 🔍 QUICK SEARCH BAR */}
        <div className="max-w-2xl mx-auto mb-16 px-2">
            <Link href="/search" className="group relative block">
                <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                    <span className="text-xl grayscale group-hover:grayscale-0 transition-all duration-300">🔍</span>
                </div>
                <div className="w-full pl-16 pr-8 py-5 bg-white/70 dark:bg-stone-900/70 backdrop-blur-md border border-stone-200/60 dark:border-stone-800 rounded-3xl shadow-lg group-hover:shadow-xl group-hover:border-orange-300 dark:group-hover:border-orange-900 transition-all text-left">
                    <span className="text-stone-300 dark:text-stone-600 font-serif text-lg">Search the Universal Library...</span>
                </div>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 px-3 py-1 bg-stone-100 dark:bg-stone-800 rounded-lg text-[9px] font-black uppercase tracking-widest text-stone-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    Enter
                </div>
            </Link>
            
            <div className="flex flex-wrap justify-center gap-2 mt-4 opacity-60">
                {['Dharma', 'Karma', 'Yoga', 'Brahman'].map(topic => (
                    <Link key={topic} href={`/search?q=${topic.toLowerCase()}`} className="text-[10px] font-bold text-stone-500 hover:text-orange-600 dark:text-stone-400 dark:hover:text-orange-400 transition-colors">#{topic}</Link>
                ))}
            </div>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-3 gap-4 sm:gap-8 mt-16 max-w-3xl mx-auto">
          {statsList.map(s => (
            <div key={s.label} className="bg-white/50 dark:bg-stone-800/50 backdrop-blur-sm border border-stone-100 dark:border-stone-700 rounded-2xl p-4 sm:p-6 shadow-sm hover:shadow-md hover:border-orange-200 dark:hover:border-orange-800 transition-all group">
              <div className="text-xl mb-1 group-hover:scale-110 transition-transform">{s.icon}</div>
              <div className="text-2xl sm:text-3xl font-serif font-black text-stone-900 dark:text-stone-100">{s.n}</div>
              <div className="text-[10px] font-black text-stone-400 dark:text-stone-500 uppercase tracking-widest mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════ LIBRARY ═══════ */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 pb-20">
        
        {categories.map((cat: string) => {
          const books = hierarchy.tree.filter((t: unknown) => (t as Record<string, unknown>).category === cat)
          const catLabels: Record<string, string> = {
            itihas: 'Itihasa', upanishad: 'Upanishads',
            purana: 'Puranas', veda: 'Vedas', other: 'Other'
          }

          return (
            <div key={cat} className="mb-12">
              {/* Section header */}
              <div className="flex items-center gap-4 mb-6">
                <h2 className="text-xl md:text-2xl font-serif font-black text-stone-900 dark:text-stone-100">{catLabels[cat] || cat}</h2>
                <div className="flex-1 h-px bg-stone-100 dark:bg-stone-800" />
                <span className="text-xs font-bold text-stone-400 dark:text-stone-500">
                  {books.filter((b: unknown) => (b as Record<string, unknown>).available).length} available
                </span>
              </div>

              {/* Book cards grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {books.map((book: unknown) => (
                  <BookCard key={(book as Record<string, unknown>).slug as string} book={book as Record<string, unknown>} locale={locale} />
                ))}
              </div>
            </div>
          )
        })}
      </section>
    </div>
  )
}

// ─── Reusable BookCard ────────────────────────────────────────────────────────
function BookCard({ book, locale }: { book: Record<string, unknown>, locale: string }) {
  const name = locale === 'hi' ? book.nameHi : locale === 'mr' ? book.nameMr : book.name
  const isAvailable = book.available

  const parentBook = book.parent ? VEDIC_LIBRARY.find(b => b.slug === book.parent as string) : null
  const childBooks = book.children ? (book.children as string[]).map((slug: string) => VEDIC_LIBRARY.find(b => b.slug === slug)).filter(Boolean) : []

  return (
    <div className={`group relative bg-white dark:bg-stone-900 rounded-xl border border-stone-100 dark:border-stone-800 overflow-hidden transition-all duration-300 flex flex-col h-full
      ${isAvailable ? 'hover:border-orange-200 dark:hover:border-orange-800 hover:shadow-lg hover:shadow-orange-50/50 dark:hover:shadow-orange-900/20' : 'opacity-60 pointer-events-none grayscale'}`}
    >
      {/* Top accent line on hover */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-orange-600 opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="p-5 flex flex-col flex-1">
        {/* Category + status badges */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-[9px] font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500 bg-stone-50 dark:bg-stone-800 px-2 py-0.5 rounded-md">
            {String(book.category)}
          </span>
          {isAvailable
            ? <span className="text-[9px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-md">Available</span>
            : <span className="text-[9px] font-bold text-stone-400 bg-stone-50 px-2 py-0.5 rounded-md">Coming Soon</span>
          }
        </div>

        {/* Title */}
        <Link href={`/${book.slug as string}/1`} className="block mb-2">
          <h3 className="text-lg font-serif font-black text-stone-900 dark:text-stone-100 leading-tight group-hover:text-orange-700 dark:group-hover:text-orange-400 transition-colors line-clamp-2">
            {String(name)}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-stone-500 dark:text-stone-400 text-xs leading-relaxed mb-4 line-clamp-3 flex-1">
          {String(book.description)}
        </p>

        {/* Child texts (e.g. Bhagavad Gita within Mahabharata) */}
        {childBooks.length > 0 && (
          <div className="mb-4 space-y-1">
            <p className="text-[9px] font-bold uppercase tracking-widest text-stone-300 mb-1.5 mt-2">Includes</p>
            {childBooks.map((child: unknown) => {
              const childObj = child as Record<string, unknown>
              return (
              <Link
                key={childObj.slug as string}
                href={`/${childObj.slug as string}/1`}
                className="flex items-center justify-between p-2.5 rounded-lg bg-stone-50 dark:bg-stone-800 hover:bg-orange-50 dark:hover:bg-orange-950/50 hover:text-orange-700 dark:hover:text-orange-400 transition-all text-xs font-bold text-stone-600 dark:text-stone-400 border border-transparent hover:border-orange-100 dark:hover:border-orange-900"
              >
                {String(childObj.name)}
                <svg className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M9 5l7 7-7 7" /></svg>
              </Link>
              )
            })}
          </div>
        )}

        {/* Parent reference */}
        {parentBook && (
          <div className="mb-4">
            <p className="text-[9px] font-bold uppercase tracking-widest text-stone-300 mb-1.5">Part of</p>
            <Link
              href={`/${parentBook.slug as string}/1`}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-orange-50 hover:bg-orange-100 text-orange-700 transition-all text-xs font-bold border border-orange-200"
            >
              {parentBook.name as string}
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M15 19l-7-7 7-7" /></svg>
            </Link>
          </div>
        )}

        {/* Footer CTA */}
        <div className="flex items-center justify-between pt-3 border-t border-stone-50 dark:border-stone-800 mt-auto">
          <div>
            <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-stone-300 dark:text-stone-600">Chapters</div>
            <div className="text-lg font-serif font-black text-stone-900 dark:text-stone-100 leading-none mt-0.5">{String(book.totalChapters)}</div>
          </div>
          <Link
            href={`/${book.slug as string}/1`}
            className="flex items-center gap-1.5 px-4 py-2 bg-stone-900 group-hover:bg-orange-600 text-white text-[10px] uppercase tracking-wider font-bold rounded-lg transition-all shadow-sm"
          >
            Read <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </Link>
        </div>
      </div>
    </div>
  )
}
