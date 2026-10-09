import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { getLibraryStats, getVedicHierarchy, isTextCompleted, PIPELINE_BOOK_STATS } from '@/lib/texts'
import { setRequestLocale } from 'next-intl/server'
import BeginReadingButton from '@/components/ui/begin-reading-button'
import { AnimatedStat } from '@/components/ui/animated-stat'
import PipelineTracker from '@/components/ui/pipeline-tracker'

export default async function Home() {
  setRequestLocale('en')
  const t = await getTranslations('home')
  const locale = 'en'
  const stats = getLibraryStats()
  const hierarchy = getVedicHierarchy()

  const statsList = [
    { n: stats.completedBooks, label: 'Sacred Texts (Gold)', icon: '📜' },
    { n: stats.completedVerses, label: 'Verses (Verified)', icon: '✨' },
    { n: '4', label: 'Languages', icon: '🌐' },
  ]

  const categories = stats.categories.filter((cat: string) =>
    hierarchy.tree.some((t: unknown) => (t as Record<string, unknown>).category === cat && (t as Record<string, unknown>).available)
  )

  return (
    <div className="min-h-screen bg-[#FDFBF7] dark:bg-[#1C1917] selection:bg-orange-500/20">
      {/* 🌌 AMBIENT GLOW */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-orange-100/40 dark:bg-orange-900/10 rounded-full blur-[120px] -mr-96 -mt-96 pointer-events-none" />
      <div className="absolute top-[20%] left-0 w-[600px] h-[600px] bg-stone-100/60 dark:bg-stone-900/30 rounded-full blur-[100px] -ml-96 pointer-events-none" />

      {/* ━━━━━ HERO ━━━━━ */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-10 pb-12 text-center">
        <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-orange-50 border border-orange-100 text-orange-700 text-[10px] font-bold uppercase tracking-[0.2em]">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
          Eternal Wisdom · Open Access
        </div>

        <h1 className="text-[clamp(1.5rem,3.5vw,2.75rem)] whitespace-nowrap font-serif font-black text-stone-900 dark:text-stone-100 leading-[1.1] tracking-tight mb-6 text-balance">
          The Universal Portal to <span className="text-amber-600 dark:text-amber-400">Vedic Wisdom</span>
        </h1>

        <p className="text-base md:text-[1.05rem] text-stone-600 dark:text-stone-400 max-w-7xl mx-auto leading-relaxed font-serif italic mb-10 opacity-80">
          &ldquo;{t('description')}&rdquo;
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <BeginReadingButton />
          <Link
            href="/lab"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white hover:bg-amber-50/50 dark:bg-stone-900 dark:hover:bg-amber-950/30 text-stone-900 dark:text-stone-100 font-black rounded-2xl border border-stone-200 dark:border-stone-800 hover:border-amber-400/40 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 text-[11px] uppercase tracking-widest shadow-sm"
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

                {/* DAILY UPLIFTMENT WIDGET */}
        <div className="max-w-3xl mx-auto mt-16 mb-8 relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-orange-500/5 to-amber-500/10 dark:from-amber-500/5 dark:via-orange-500/5 dark:to-amber-500/5 rounded-3xl blur-xl transition-all duration-500 group-hover:blur-2xl"></div>
          <div className="relative bg-white/80 dark:bg-stone-900/80 backdrop-blur-xl border border-amber-200/50 dark:border-amber-900/30 rounded-3xl p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xl">✨</span>
              <h3 className="text-xs font-black uppercase tracking-widest text-amber-600 dark:text-amber-500">Daily Upliftment</h3>
            </div>
            <p className="text-stone-800 dark:text-stone-200 font-serif text-xl sm:text-2xl leading-relaxed font-black mb-4">
              "Perform your duty without attachment, remaining equal to success or failure. Such equanimity is called Yoga."
            </p>
            <div className="flex justify-between items-end">
              <p className="text-stone-500 dark:text-stone-400 text-sm italic font-serif">— Bhagavad Gita 2.48</p>
              <span className="text-[10px] font-bold text-stone-400 bg-stone-100 dark:bg-stone-800 px-3 py-1 rounded-full uppercase tracking-wider">Practical Wisdom</span>
            </div>
          </div>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-3 gap-4 sm:gap-8 mt-16 max-w-3xl mx-auto">
          {statsList.map(s => (
            <div key={s.label} className="bg-white/50 dark:bg-stone-800/50 backdrop-blur-sm border border-stone-100 dark:border-stone-700 rounded-2xl p-4 sm:p-6 shadow-sm hover:shadow-md hover:border-orange-200 dark:hover:border-orange-800 transition-all group">
              <div className="text-xl mb-1 group-hover:scale-110 transition-transform">{s.icon}</div>
              <div className="text-2xl sm:text-3xl font-serif font-black text-stone-900 dark:text-stone-100">{typeof s.n === 'number' ? <AnimatedStat targetCount={s.n} /> : (s.label === 'Verses' ? <AnimatedStat targetCount={parseInt(s.n as string, 10)} /> : s.n)}</div>
              <div className="text-[10px] font-black text-stone-400 dark:text-stone-500 uppercase tracking-widest mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <PipelineTracker />

      {/* ━━━━━ LIBRARY ━━━━━ */}
      <section className="max-w-[1200px] mx-auto px-4 sm:px-6 pb-20">
        {categories.map((cat: string) => {
          const books = hierarchy.tree.filter((t: unknown) => (t as Record<string, unknown>).category === cat)
          const catLabels: Record<string, string> = {
            itihas: 'Itihasa', upanishad: 'Upanishads',
            purana: 'Puranas', veda: 'Vedas', other: 'Other'
          }

          return (
            <div key={cat} className="mb-12">
              <div className="flex items-center gap-4 mb-6">
                <h2 className="text-xl md:text-2xl font-serif font-black text-stone-900 dark:text-stone-100">{catLabels[cat] || cat}</h2>
                <div className="flex-1 h-px bg-stone-100 dark:bg-stone-800" />
                <span className="text-xs font-bold text-stone-400 dark:text-stone-500">
                  {books.filter((b: unknown) => (b as Record<string, unknown>).available).length} available
                </span>
              </div>

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

function BookCard({ book, locale }: { book: Record<string, unknown>, locale: string }) {
  const name = locale === 'hi' ? book.nameHi : locale === 'mr' ? book.nameMr : book.name
  const isAvailable = Boolean(book.available)

  return (
    <div className={`group relative bg-white dark:bg-stone-900/80 rounded-xl border border-stone-200/80 dark:border-stone-800 overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col h-full
      ${isAvailable ? 'hover:border-amber-400/50 dark:hover:border-amber-700/50 hover:shadow-xl hover:-translate-y-1' : 'opacity-60 pointer-events-none grayscale'}`}
    >
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-orange-600 opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[9px] font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500 bg-stone-50 dark:bg-stone-800 px-2 py-0.5 rounded-md">
            {String(book.category)}
          </span>
          {isAvailable && <span className="text-[9px] font-bold text-amber-600 dark:text-amber-500 bg-amber-50 dark:bg-amber-950/30 px-2 py-0.5 rounded-md">100% GOLD</span>}
        </div>

        <Link href={`/${book.slug as string}/${book.hasPreface ? 'preface' : '1'}`} className="block mb-2">
          <h3 className="text-lg font-serif font-black text-stone-900 dark:text-stone-100 leading-tight group-hover:text-orange-700 dark:group-hover:text-orange-400 transition-colors line-clamp-2">
            {String(name)}
          </h3>
        </Link>

        <p className="text-stone-500 dark:text-stone-400 text-xs leading-relaxed mb-4 line-clamp-3 flex-1">
          {String(book.description)}
        </p>

        

        

        <div className="flex items-center justify-between pt-3 border-t border-stone-50 dark:border-stone-800 mt-auto">
          <div>
            <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-stone-300 dark:text-stone-600">Chapters</div>
            <div className="text-lg font-serif font-black text-stone-900 dark:text-stone-100 leading-none mt-0.5">{String(book.totalChapters)}</div>
          </div>
          <Link
            href={`/${book.slug as string}/${book.hasPreface ? 'preface' : '1'}`}
            className="flex items-center gap-1.5 px-4 py-2 bg-stone-900 group-hover:bg-orange-600 text-white text-[10px] uppercase tracking-wider font-bold rounded-lg transition-all shadow-sm"
          >
            Read <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </Link>
        </div>
      </div>
    </div>
  )
}



