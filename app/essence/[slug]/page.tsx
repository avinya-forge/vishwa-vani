import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getTattvaDigestBySlug, getAllTattvaDigests } from '@/lib/speed-reader'

export async function generateStaticParams() {
  const digests = getAllTattvaDigests()
  return digests.map(d => ({ slug: d.slug }))
}

export default async function TattvaDetailPage({ params }: { params: { slug: string } }) {
  const digest = getTattvaDigestBySlug(params.slug)

  if (!digest) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-[#FDFBF7] text-stone-900 selection:bg-orange-500/30 pb-32 pt-16 relative overflow-hidden">
      {/* Background ambient accents */}
      <div className="absolute top-0 right-0 w-[45vw] h-[45vw] bg-amber-100/30 rounded-full blur-[120px] pointer-events-none mix-blend-multiply" />
      <div className="absolute bottom-10 left-0 w-[40vw] h-[40vw] bg-orange-100/30 rounded-full blur-[100px] pointer-events-none mix-blend-multiply" />

      <div className="max-w-4xl mx-auto px-5 sm:px-8 relative z-10">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between py-4 mb-8 border-b border-stone-200">
          <Link
            href="/essence"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-700 hover:text-orange-800 transition-colors"
          >
            &larr; Back to Essence Catalog
          </Link>

          <div className="flex items-center gap-3">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-orange-50 text-orange-800 border border-orange-200">
              ⚡ {digest.estimatedReadMinutes} Min Speed Read
            </span>
            <Link
              href={`/${digest.slug}/1`}
              className="text-xs font-bold px-3.5 py-1 rounded-full bg-stone-900 text-white hover:bg-orange-700 transition-colors"
            >
              Full Study Canvas &rarr;
            </Link>
          </div>
        </div>

        {/* Title Header */}
        <header className="mb-14 space-y-4">
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-orange-700 bg-orange-50 w-fit px-3 py-1 rounded-full border border-orange-200">
            <span>{digest.category}</span>
            <span>•</span>
            <span>Tattva Saṁgraha</span>
          </div>

          <div className="text-2xl sm:text-3xl font-serif font-black text-orange-950/70">
            {digest.sanskritTitle}
          </div>

          <h1 className="text-4xl sm:text-5xl font-serif font-black tracking-tight text-stone-900">
            {digest.title}
          </h1>

          <p className="text-base sm:text-lg text-stone-600 font-serif italic leading-relaxed pt-1">
            {digest.crisisAndContext.coreInsight}
          </p>
        </header>

        {/* SECTION 1: PRASTAVANA (Context & Crisis) */}
        <section className="mb-14 p-6 sm:p-8 rounded-3xl bg-white border border-stone-200/90 shadow-sm space-y-6">
          <div className="flex items-center gap-3 pb-3 border-b border-stone-100">
            <span className="text-xl">🏛️</span>
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-stone-400">Section 1 • 7 Minutes</span>
              <h2 className="text-xl font-serif font-black text-stone-900">Prastāvanā: Setting &amp; Central Crisis</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-100">
              <span className="font-bold text-stone-400 uppercase tracking-wider block mb-1">Seeker</span>
              <span className="text-sm font-semibold text-stone-800">{digest.crisisAndContext.seeker}</span>
            </div>
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-100">
              <span className="font-bold text-stone-400 uppercase tracking-wider block mb-1">Preceptor</span>
              <span className="text-sm font-semibold text-stone-800">{digest.crisisAndContext.preceptor}</span>
            </div>
          </div>

          <div>
            <span className="text-xs font-bold text-stone-400 uppercase tracking-wider block mb-1.5">Historical &amp; Dramatic Setting</span>
            <p className="text-sm text-stone-700 leading-relaxed">{digest.crisisAndContext.setting}</p>
          </div>

          <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200/60">
            <span className="text-xs font-black uppercase tracking-wider text-amber-900 block mb-1">The Core Existential Question</span>
            <p className="text-sm text-amber-950 font-serif italic leading-relaxed">
              &ldquo;{digest.crisisAndContext.centralQuestion}&rdquo;
            </p>
          </div>
        </section>

        {/* SECTION 2: PRAMUKHA SHLOKAS (Key Signpost Verses) */}
        <section className="mb-14 space-y-8">
          <div className="flex items-center justify-between pb-3 border-b border-stone-200">
            <div className="flex items-center gap-3">
              <span className="text-xl">⭐</span>
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-stone-400">Section 2 • 30 Minutes</span>
                <h2 className="text-xl font-serif font-black text-stone-900">
                  Pramukha Ślokas: {digest.signpostVerses.length} Pinnacle Signpost Verses
                </h2>
              </div>
            </div>
            <span className="text-xs font-semibold text-stone-500">
              Distilled from {digest.totalOriginalVerses} verses
            </span>
          </div>

          <div className="space-y-8">
            {digest.signpostVerses.map((verse, idx) => (
              <article
                key={idx}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6 hover:border-orange-300 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-widest text-orange-800 bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
                    Signpost {idx + 1} • Chapter {verse.chapter}, Verse {verse.verse}
                  </span>
                  <Link
                    href={verse.deepDiveUrl}
                    className="text-xs font-bold text-orange-700 hover:text-orange-800 flex items-center gap-1 group"
                  >
                    <span>Full Study Canvas</span>
                    <span className="group-hover:translate-x-0.5 transition-transform">&rarr;</span>
                  </Link>
                </div>

                {/* Sanskrit Verse */}
                <div className="p-6 rounded-2xl bg-stone-50/80 border border-stone-100 text-center space-y-3">
                  <p className="text-lg sm:text-xl font-serif font-black text-stone-900 whitespace-pre-line leading-loose">
                    {verse.sanskrit}
                  </p>
                  <p className="text-xs sm:text-sm font-serif italic text-stone-600 whitespace-pre-line leading-relaxed">
                    {verse.transliteration}
                  </p>
                </div>

                {/* English Translation */}
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-stone-400 block mb-1.5">
                    Universal English Meaning
                  </span>
                  <p className="text-sm sm:text-base text-stone-800 leading-relaxed font-medium">
                    {verse.translation}
                  </p>
                </div>

                {/* Philosophical Essence & Takeaway */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-stone-100 text-xs">
                  <div className="p-4 rounded-xl bg-orange-50/50 border border-orange-100">
                    <strong className="text-orange-950 font-bold block mb-1">💡 Philosophical Essence</strong>
                    <p className="text-orange-900/90 leading-relaxed">{verse.essence}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-100">
                    <strong className="text-emerald-950 font-bold block mb-1">🧘 Actionable Practice</strong>
                    <p className="text-emerald-900/90 leading-relaxed">{verse.actionableTakeaway}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* SECTION 3: SIDDHANTA SAMGRAHA (Philosophical Pillars) */}
        <section className="mb-14 p-6 sm:p-8 rounded-3xl bg-white border border-stone-200/90 shadow-sm space-y-6">
          <div className="flex items-center gap-3 pb-3 border-b border-stone-100">
            <span className="text-xl">🧭</span>
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-stone-400">Section 3 • 15 Minutes</span>
              <h2 className="text-xl font-serif font-black text-stone-900">Siddhānta Saṁgraha: Foundational Pillars</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {digest.philosophicalPillars.map((pillar, i) => (
              <div key={i} className="p-5 rounded-2xl bg-stone-50 border border-stone-200/60 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-orange-900 font-serif">{pillar.sanskritTerm}</span>
                  <span className="text-[10px] font-black text-stone-400">{pillar.keyVerseCitation}</span>
                </div>
                <h3 className="text-base font-serif font-bold text-stone-900">{pillar.title}</h3>
                <p className="text-xs text-stone-600 leading-relaxed">{pillar.definition}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 4: SADHANA PRAYOGA (Daily Practice) */}
        <section className="mb-14 p-6 sm:p-8 rounded-3xl bg-white border border-stone-200/90 shadow-sm space-y-6">
          <div className="flex items-center gap-3 pb-3 border-b border-stone-100">
            <span className="text-xl">🌸</span>
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-stone-400">Section 4 • 8 Minutes</span>
              <h2 className="text-xl font-serif font-black text-stone-900">Sādhanā Prayoga: Daily Life Application</h2>
            </div>
          </div>

          <ul className="space-y-3.5">
            {digest.sadhanaTakeaways.map((takeaway, i) => (
              <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-stone-700">
                <span className="text-orange-600 font-bold mt-0.5">•</span>
                <span className="leading-relaxed">{takeaway}</span>
              </li>
            ))}
          </ul>

          <div className="pt-4 border-t border-stone-100 text-xs text-stone-500 italic">
            <strong>Timeless Impact:</strong> {digest.historicalImpact}
          </div>
        </section>

        {/* BOTTOM CALL TO ACTION */}
        <div className="p-8 sm:p-10 rounded-3xl bg-stone-900 text-white text-center space-y-4 shadow-xl">
          <span className="text-[10px] font-black uppercase tracking-widest text-orange-400">
            Ready for Word-by-Word Scholar Commentary?
          </span>
          <h3 className="text-2xl sm:text-3xl font-serif font-black">
            Enter the Complete Study Canvas
          </h3>
          <p className="text-xs sm:text-sm text-stone-400 max-w-lg mx-auto leading-relaxed">
            Read all {digest.totalOriginalVerses} verses with multi-lineage commentaries from Shankara, Ramanuja, Madhva, and Prabhupada.
          </p>
          <div className="pt-2">
            <Link
              href={`/${digest.slug}/1`}
              className="inline-block py-3 px-8 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-lg"
            >
              Start Reading Chapter 1 &rarr;
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
