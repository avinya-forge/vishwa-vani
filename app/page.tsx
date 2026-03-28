'use client'

import Link from 'next/link'
import { getLibraryStats, getVedicHierarchy, VEDIC_LIBRARY } from '@/lib/texts'
import { useTranslations, useLocale } from 'next-intl'
import { useState, useEffect } from 'react'

export default function Home() {
  const t = useTranslations('home')
  const locale = useLocale()
  const [mounted, setMounted] = useState(false)
  const stats = getLibraryStats()
  const hierarchy = getVedicHierarchy()

  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return <div className="min-h-screen bg-[#FDFBF7]" />

  // Only show categories that have at least one available book
  const categories = stats.categories.filter((cat: string) =>
    hierarchy.tree.some((t: any) => t.category === cat && t.available)
  )

  return (
    <div className="min-h-screen bg-[#FDFBF7]">

      {/* ═══════ HERO ═══════ */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-10 pb-12 text-center">
        <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-orange-50 border border-orange-100 text-orange-700 text-[10px] font-bold uppercase tracking-[0.2em]">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
          Eternal Wisdom · Open Access
        </div>

        <h1 className="text-4xl md:text-6xl font-serif font-black text-stone-900 leading-[1.05] tracking-tight mb-4">
          The Universal Repository<br className="hidden md:block" /> of Vedic Wisdom
        </h1>

        <p className="text-base md:text-lg text-stone-500 max-w-2xl mx-auto leading-relaxed font-serif italic mb-8">
          &ldquo;{t('description')}&rdquo;
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/bhagavad-gita/1"
            className="inline-flex items-center gap-2 px-6 py-3 bg-stone-900 hover:bg-orange-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-stone-200/50 text-xs tracking-wide"
          >
            <span className="text-sm">📜</span> Begin Reading
          </Link>
          <Link
            href="/lab"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-orange-50 text-stone-700 font-bold rounded-xl border border-stone-200 hover:border-orange-200 transition-all text-xs shadow-sm"
          >
            <span className="text-sm">🧪</span> Explore Labs
          </Link>
        </div>

        {/* Quick stats */}
        <div className="flex justify-center gap-8 mt-10 pt-8 border-t border-stone-100">
          {[
            { n: stats.totalBooks, label: 'Sacred Texts' },
            { n: `${stats.totalVerses.toLocaleString()}+`, label: 'Verses' },
            { n: '3', label: 'Languages' },
          ].map(s => (
            <div key={s.label} className="text-center">
              <div className="text-xl md:text-2xl font-serif font-black text-stone-900">{s.n}</div>
              <div className="text-[9px] md:text-[10px] font-bold text-stone-400 uppercase tracking-widest mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════ LIBRARY ═══════ */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 pb-20">
        
        {categories.map((cat: string) => {
          const books = hierarchy.tree.filter((t: any) => t.category === cat)
          const catLabels: Record<string, string> = {
            itihas: 'Itihasa', upanishad: 'Upanishads',
            purana: 'Puranas', veda: 'Vedas', other: 'Other'
          }

          return (
            <div key={cat} className="mb-12">
              {/* Section header */}
              <div className="flex items-center gap-4 mb-6">
                <h2 className="text-xl md:text-2xl font-serif font-black text-stone-900">{catLabels[cat] || cat}</h2>
                <div className="flex-1 h-px bg-stone-100" />
                <span className="text-xs font-bold text-stone-400">
                  {books.filter((b: any) => b.available).length} available
                </span>
              </div>

              {/* Book cards grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {books.map((book: any) => (
                  <BookCard key={book.slug} book={book} locale={locale} />
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
function BookCard({ book, locale }: { book: any, locale: string }) {
  const name = locale === 'hi' ? book.nameHi : locale === 'mr' ? book.nameMr : book.name
  const isAvailable = book.available

  return (
    <div className={`group relative bg-white rounded-xl border border-stone-100 overflow-hidden transition-all duration-300 flex flex-col h-full 
      ${isAvailable ? 'hover:border-orange-200 hover:shadow-lg hover:shadow-orange-50/50' : 'opacity-60 pointer-events-none grayscale'}`}
    >
      {/* Top accent line on hover */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-orange-600 opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="p-5 flex flex-col flex-1">
        {/* Category + status badges */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-[9px] font-bold uppercase tracking-widest text-stone-400 bg-stone-50 px-2 py-0.5 rounded-md">
            {book.category}
          </span>
          {isAvailable
            ? <span className="text-[9px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-md">Available</span>
            : <span className="text-[9px] font-bold text-stone-400 bg-stone-50 px-2 py-0.5 rounded-md">Coming Soon</span>
          }
        </div>

        {/* Title */}
        <Link href={`/${book.slug}/1`} className="block mb-2">
          <h3 className="text-lg font-serif font-black text-stone-900 leading-tight group-hover:text-orange-700 transition-colors line-clamp-2">
            {name}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-stone-500 text-xs leading-relaxed mb-4 line-clamp-3 flex-1">
          {book.description}
        </p>

        {/* Child texts (e.g. Bhagavad Gita within Mahabharata) */}
        {book.children?.length > 0 && (
          <div className="mb-4 space-y-1">
            <p className="text-[9px] font-bold uppercase tracking-widest text-stone-300 mb-1.5 mt-2">Includes</p>
            {book.children.map((child: any) => (
              <Link
                key={child.slug}
                href={`/${child.slug}/1`}
                className="flex items-center justify-between p-2.5 rounded-lg bg-stone-50 hover:bg-orange-50 hover:text-orange-700 transition-all text-xs font-bold text-stone-600 border border-transparent hover:border-orange-100"
              >
                {child.name}
                <svg className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M9 5l7 7-7 7" /></svg>
              </Link>
            ))}
          </div>
        )}

        {/* Footer CTA */}
        <div className="flex items-center justify-between pt-3 border-t border-stone-50 mt-auto">
          <div>
            <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-stone-300">Chapters</div>
            <div className="text-lg font-serif font-black text-stone-900 leading-none mt-0.5">{book.totalChapters}</div>
          </div>
          <Link
            href={`/${book.slug}/1`}
            className="flex items-center gap-1.5 px-4 py-2 bg-stone-900 group-hover:bg-orange-600 text-white text-[10px] uppercase tracking-wider font-bold rounded-lg transition-all shadow-sm"
          >
            Read <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </Link>
        </div>
      </div>
    </div>
  )
}
