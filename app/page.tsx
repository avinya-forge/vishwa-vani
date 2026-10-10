import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { getVedicHierarchy, isTextCompleted } from '@/lib/texts'
import { getDynamicLibraryStats } from '@/lib/server-lake'
import { setRequestLocale } from 'next-intl/server'
import BeginReadingButton from '@/components/ui/begin-reading-button'
import { AnimatedStat } from '@/components/ui/animated-stat'
import PipelineTracker from '@/components/ui/pipeline-tracker'
import DailyShloka from '@/components/home/daily-shloka'

export default async function Home() {
  setRequestLocale('en')
  const t = await getTranslations('home')
  const locale = 'en'
  const stats = await getDynamicLibraryStats()
  const hierarchy = getVedicHierarchy()

  const statsList = [
    { n: stats.totalBooks, label: 'Sacred Scriptures', icon: '📜' },
    { n: stats.completedVerses, label: 'Gold Shlokas', icon: '✨' },
    { n: stats.databaseVerses, label: 'Corpus Database', icon: '🏛️' },
    { n: '4', label: 'Classical Languages', icon: '🌐' },
  ]

  const categories = stats.categories

  return (
    <div className="min-h-screen bg-[#FDFBF7] selection:bg-orange-500/20 relative overflow-hidden">
      {/* 🌌 AMBIENT GLOWS & SACRED SANSKRIT WATERMARK */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] sm:w-[900px] sm:h-[900px] bg-gradient-to-bl from-amber-200/40 via-orange-100/30 to-transparent rounded-full blur-[140px] -mr-64 -mt-64 pointer-events-none animate-pulse duration-1000" />
      <div className="absolute top-[28%] left-0 w-[500px] h-[500px] sm:w-[700px] sm:h-[700px] bg-gradient-to-tr from-orange-200/30 via-amber-100/20 to-transparent rounded-full blur-[120px] -ml-64 pointer-events-none" />

      {/* Floating Sacred Devanagari Background Mantra Watermark */}
      <div className="absolute top-24 inset-x-0 flex justify-center pointer-events-none opacity-[0.03] select-none overflow-hidden -z-0">
        <span className="font-serif text-[120px] sm:text-[180px] md:text-[240px] font-black tracking-widest text-stone-900 whitespace-nowrap">
          ॐ असतो मा सद्गमय
        </span>
      </div>

      {/* ━━━━━ HERO SECTION ━━━━━ */}
      <section className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 pt-12 sm:pt-20 pb-12 text-center">
        {/* Top Sacred Pill Badge */}
        <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-white/80 border border-amber-200/80 shadow-sm text-orange-800 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.25em] backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
          <span>Universal Vedic Digital Sanctuary · सम्पूर्ण वैदिक ज्ञान</span>
        </div>

        {/* Hero Title with Subtle Gradient */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-black text-stone-900 leading-[1.08] tracking-tight mb-6 max-w-4xl mx-auto">
          The Universal Voice of{' '}
          <span className="bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 bg-clip-text text-transparent">
            Vedic Wisdom
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed font-serif italic mb-10 opacity-90">
          &ldquo;{t('description')}&rdquo;
        </p>

        {/* Hero Action CTA Buttons */}
        <div className="flex flex-wrap justify-center items-center gap-4 mb-14">
          <BeginReadingButton />
          
          <Link
            href="/lab"
            className="inline-flex items-center gap-2.5 px-8 py-4 bg-white/90 hover:bg-amber-50 text-stone-900 font-black rounded-2xl border border-stone-200 hover:border-amber-400 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 text-xs uppercase tracking-widest shadow-sm hover:shadow-md"
          >
            <span>🧪</span>
            <span>Explore Vedic Labs</span>
          </Link>

          <Link
            href="/search"
            className="inline-flex items-center gap-2 px-6 py-4 bg-stone-100/80 hover:bg-stone-200 text-stone-700 font-bold rounded-2xl border border-transparent transition-all duration-300 text-xs uppercase tracking-wider"
          >
            <span>🔍</span>
            <span>Deep Search</span>
          </Link>
        </div>

        {/* Quick Search Bar */}
        <div className="max-w-2xl mx-auto mb-16 px-2">
          <Link href="/search" className="group relative block">
            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
              <span className="text-xl transition-transform group-hover:scale-110">🔍</span>
            </div>
            <div className="w-full pl-16 pr-8 py-4 sm:py-5 bg-white/80 backdrop-blur-md border border-stone-200/80 rounded-3xl shadow-md group-hover:shadow-lg group-hover:border-orange-400 transition-all text-left">
              <span className="text-stone-400 font-serif text-base sm:text-lg">
                Search verses, Sanskrit concepts, or commentaries (e.g. Dharma, Karma, Yoga, Brahman)...
              </span>
            </div>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 px-3 py-1 bg-stone-100 rounded-lg text-[9px] font-black uppercase tracking-widest text-stone-500 opacity-0 group-hover:opacity-100 transition-opacity">
              Press Enter &rarr;
            </div>
          </Link>

          <div className="flex flex-wrap justify-center items-center gap-2 mt-3.5">
            <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">Popular Searches:</span>
            {['Dharma', 'Nishkama Karma', 'Atman', 'Brahman', 'Bhakti', 'Samadhi'].map(topic => (
              <Link
                key={topic}
                href={`/search?q=${encodeURIComponent(topic.toLowerCase())}`}
                className="text-[11px] font-bold text-stone-500 hover:text-orange-600 transition-colors bg-white/60 px-2.5 py-0.5 rounded-full border border-stone-200/60"
              >
                #{topic}
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto">
          {statsList.map(s => (
            <div
              key={s.label}
              className="bg-white/80 backdrop-blur-md border border-amber-200/60 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-orange-300 transition-all group text-center"
            >
              <div className="text-2xl mb-1 group-hover:scale-110 transition-transform">{s.icon}</div>
              <div className="text-2xl sm:text-3xl font-serif font-black text-stone-900">
                {typeof s.n === 'number' ? <AnimatedStat targetCount={s.n} /> : s.n}
              </div>
              <div className="text-[10px] font-black text-stone-400 uppercase tracking-widest mt-1">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ━━━━━ DAILY SHLOKA COMPONENT (TIMLESS WISDOM GEMS) ━━━━━ */}
      <DailyShloka />

      {/* ━━━━━ PIPELINE METRICS TICKER ━━━━━ */}
      <PipelineTracker />

      {/* ━━━━━ UNIVERSAL SACRED LIBRARY ━━━━━ */}
      <section id="library" className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-12 pb-24 scroll-mt-20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-[10px] font-bold uppercase tracking-[0.2em]">
            <span>📜</span> Complete Sacred Corpus · १७ संपूर्ण वैदिक ग्रन्थ
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-black text-stone-900 tracking-tight mb-4">
            The Living Library of Vedic Texts
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed font-serif max-w-2xl mx-auto">
            Spanning all 17 canonical scriptures across Veda Saṁhitās, Upaniṣads, Itihāsa, Purāṇas, and Darśana Sūtras. Choose any scripture below to enter the uninterrupted study canvas.
          </p>
        </div>

        {/* Categorized Scripture Grid */}
        {categories.map((cat: string) => {
          const books = hierarchy.tree.filter((t: unknown) => (t as Record<string, unknown>).category === cat)
          if (books.length === 0) return null

          const catInfo: Record<string, { title: string; subtitle: string; icon: string }> = {
            itihas: { title: 'Itihāsa & Gītā', subtitle: 'Epic Histories & Divine Battlefield Dialogue', icon: '🏹' },
            upanishad: { title: 'The Principal Upaniṣads', subtitle: 'Vedānta & Non-Dual Supreme Knowledge', icon: '✨' },
            purana: { title: 'Purāṇas', subtitle: 'Cosmic Chronicles, Genealogies & Sacred Lore', icon: '📜' },
            veda: { title: 'Veda Saṁhitās', subtitle: 'The Four Eternal Mantra Collections', icon: '🕉️' },
            other: { title: 'Darśana Sūtras & Heritage', subtitle: 'Aphorisms, Yoga, Rituals & Devotional Heritage', icon: '🌿' }
          }
          const info = catInfo[cat] || { title: cat, subtitle: '', icon: '📖' }

          return (
            <div key={cat} className="mb-16">
              <div className="flex items-center gap-3 mb-6 pb-2 border-b border-stone-200">
                <span className="text-2xl">{info.icon}</span>
                <div>
                  <h3 className="text-xl sm:text-2xl font-serif font-black text-stone-900">{info.title}</h3>
                  {info.subtitle && <p className="text-xs text-stone-500 font-serif italic mt-0.5">{info.subtitle}</p>}
                </div>
                <div className="ml-auto">
                  <span className="text-xs font-bold text-stone-400 bg-stone-100 px-3 py-1 rounded-full uppercase tracking-wider">
                    {books.length} {books.length === 1 ? 'Text' : 'Texts'}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {books.map((book: unknown) => (
                  <BookCard key={(book as Record<string, unknown>).slug as string} book={book as Record<string, unknown>} locale={locale} />
                ))}
              </div>
            </div>
          )
        })}
      </section>

      {/* ━━━━━ VEDIC LABS INTERACTIVE SANCTUM ━━━━━ */}
      <section className="bg-gradient-to-b from-stone-50/80 to-[#FDFBF7] py-20 border-t border-stone-200">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-2xl mb-2 block">🧪</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-black text-stone-900 mb-3">
              Vedic Labs &amp; Experimental Tools
            </h2>
            <p className="text-stone-600 text-sm font-serif">
              Bridge timeless spiritual concepts with modern interactive instruments. Over 20 specialized apps designed for contemplative study and research.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link
              href="/lab"
              className="p-6 rounded-3xl bg-white border border-stone-200/80 hover:border-orange-300 hover:shadow-lg transition-all group"
            >
              <div className="w-10 h-10 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform">
                🧬
              </div>
              <h4 className="text-base font-bold text-stone-900 mb-1 group-hover:text-orange-600 transition-colors">
                Semantic Explorer
              </h4>
              <p className="text-xs text-stone-500 leading-relaxed">
                Trace philosophical connections, cross-text parallels, and lineages across verses.
              </p>
            </Link>

            <Link
              href="/lab"
              className="p-6 rounded-3xl bg-white border border-stone-200/80 hover:border-amber-300 hover:shadow-lg transition-all group"
            >
              <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform">
                📿
              </div>
              <h4 className="text-base font-bold text-stone-900 mb-1 group-hover:text-amber-600 transition-colors">
                Chanting Trainer
              </h4>
              <p className="text-xs text-stone-500 leading-relaxed">
                Practice accurate Sanskrit meter (chhanda), phonetic weight, and Vedic svara recitation.
              </p>
            </Link>

            <Link
              href="/lab"
              className="p-6 rounded-3xl bg-white border border-stone-200/80 hover:border-rose-300 hover:shadow-lg transition-all group"
            >
              <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform">
                🧘
              </div>
              <h4 className="text-base font-bold text-stone-900 mb-1 group-hover:text-rose-600 transition-colors">
                Pranayama Timer
              </h4>
              <p className="text-xs text-stone-500 leading-relaxed">
                Authentic yogic breath rhythms following traditional ratio standards (1:4:2).
              </p>
            </Link>

            <Link
              href="/lab"
              className="p-6 rounded-3xl bg-white border border-stone-200/80 hover:border-emerald-300 hover:shadow-lg transition-all group"
            >
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform">
                🗺️
              </div>
              <h4 className="text-base font-bold text-stone-900 mb-1 group-hover:text-emerald-600 transition-colors">
                Interactive Tattva Map
              </h4>
              <p className="text-xs text-stone-500 leading-relaxed">
                Explore the 24 universal elements from Prakriti to Purusha based on classical Sāṅkhya.
              </p>
            </Link>
          </div>

          <div className="text-center mt-10">
            <Link
              href="/lab"
              className="inline-flex items-center gap-2 px-6 py-3 bg-stone-900 hover:bg-orange-600 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-sm"
            >
              <span>Explore All 20+ Vedic Labs</span>
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

function BookCard({ book, locale }: { book: Record<string, unknown>, locale: string }) {
  const name = locale === 'hi' ? book.nameHi : locale === 'mr' ? book.nameMr : book.name
  const devanagariName = String(book.nameDevanagari || book.nameHi || name)
  const isCompleted = isTextCompleted(String(book.slug))

  return (
    <div className="group relative bg-white rounded-2xl border border-stone-200/80 overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col h-full hover:border-amber-400/80 hover:shadow-xl hover:-translate-y-1">
      {/* Top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[9px] font-bold uppercase tracking-widest text-stone-400 bg-stone-100 px-2.5 py-1 rounded-md">
            {String(book.category)}
          </span>
          {isCompleted ? (
            <span className="text-[9px] font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-md">
              ✨ 100% GOLD EDITION
            </span>
          ) : (
            <span className="text-[9px] font-bold text-stone-600 bg-stone-100 px-2.5 py-1 rounded-md">
              📜 CANONICAL INGESTION
            </span>
          )}
        </div>

        <Link href={`/${book.slug as string}/${book.hasPreface ? 'preface' : '1'}`} className="block mb-2 group/title">
          <p className="text-xs font-serif font-bold text-amber-800 mb-1">{devanagariName}</p>
          <h4 className="text-lg font-serif font-black text-stone-900 leading-tight group-hover/title:text-orange-600 transition-colors line-clamp-2">
            {String(name)}
          </h4>
        </Link>

        <p className="text-stone-600 text-xs leading-relaxed mb-6 line-clamp-3 flex-1 font-serif">
          {String(book.description)}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-stone-100 mt-auto">
          <div>
            <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-stone-400">Chapters</div>
            <div className="text-base font-serif font-black text-stone-800 leading-none mt-0.5">{String(book.totalChapters)}</div>
          </div>
          <Link
            href={`/${book.slug as string}/${book.hasPreface ? 'preface' : '1'}`}
            className="flex items-center gap-1.5 px-4 py-2 bg-stone-900 group-hover:bg-orange-600 text-white text-[11px] uppercase tracking-wider font-bold rounded-xl transition-all shadow-sm"
          >
            {isCompleted ? 'Start Reading' : 'Explore'} <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
