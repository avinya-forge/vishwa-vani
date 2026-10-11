'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import type { TattvaSamgrahaDigest } from '@/lib/speed-reader'
import type { BookChapterSummaries, SummaryGranularity } from '@/lib/chapter-summaries'
import { calculateBookReadTime, calculateReadingTime } from '@/lib/chapter-summaries'
import type { EmpiricalKnowledgeToken } from '@/lib/vedic-science'

interface Props {
  digest: TattvaSamgrahaDigest
  chapterSummaries: BookChapterSummaries | null
  knowledgeTokens: EmpiricalKnowledgeToken[]
}

export default function AdaptiveEssenceReader({ digest, chapterSummaries, knowledgeTokens }: Props) {
  const [granularity, setGranularity] = useState<SummaryGranularity>('short')
  const [activeChapterFilter, setActiveChapterFilter] = useState<number | 'all'>('all')

  // Calculate dynamic reading time for the active granularity
  const dynamicReadTime = useMemo(() => {
    if (chapterSummaries) {
      return calculateBookReadTime(chapterSummaries, granularity)
    }
    return calculateReadingTime(JSON.stringify(digest))
  }, [chapterSummaries, digest, granularity])

  // Filtered chapters if chapterSummaries exists
  const displayedChapters = useMemo(() => {
    if (!chapterSummaries) return []
    if (activeChapterFilter === 'all') return chapterSummaries.chapters
    return chapterSummaries.chapters.filter(ch => ch.chapter === activeChapterFilter)
  }, [chapterSummaries, activeChapterFilter])

  return (
    <div className="max-w-4xl mx-auto px-5 sm:px-8 relative z-10">
      {/* Navigation Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 mb-8 border-b border-stone-200">
        <Link
          href="/essence"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-700 hover:text-orange-800 transition-colors w-fit"
        >
          &larr; Back to Essence Catalog
        </Link>

        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-orange-50 text-orange-800 border border-orange-200 flex items-center gap-1.5 shadow-sm">
            <span>⚡</span>
            <span>{dynamicReadTime} Min Calculated Read</span>
          </span>
          <Link
            href={`/${digest.slug}/1`}
            className="text-xs font-bold px-3.5 py-1 rounded-full bg-stone-900 text-white hover:bg-orange-700 transition-colors"
          >
            Full Study Canvas &rarr;
          </Link>
        </div>
      </div>

      {/* Header Banner */}
      <header className="mb-10 space-y-4">
        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-orange-800 bg-orange-50 w-fit px-3 py-1 rounded-full border border-orange-200">
          <span>{digest.category}</span>
          <span>•</span>
          <span>Adaptive Tattva Saṁgraha</span>
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

      {/* ━━━━━━━━━━━━━━━━━ ADAPTIVE GRANULARITY SWITCHER ━━━━━━━━━━━━━━━━━ */}
      <div className="sticky top-16 z-30 mb-12 p-3 sm:p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-stone-200/90 shadow-lg space-y-3">
        <div className="flex items-center justify-between text-xs font-black uppercase tracking-wider text-stone-400">
          <span>Reading Depth &amp; Granularity</span>
          <span className="text-orange-700 lowercase font-medium">
            dynamically computed ({dynamicReadTime} min read)
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            {
              id: 'very_short' as SummaryGranularity,
              label: '⚡ Very Short',
              sub: 'Sūtra Essence (1–3 min)'
            },
            {
              id: 'short' as SummaryGranularity,
              label: '📝 Short',
              sub: 'Executive Digest'
            },
            {
              id: 'long' as SummaryGranularity,
              label: '📖 Long',
              sub: 'Chapter Exegesis'
            },
            {
              id: 'very_long' as SummaryGranularity,
              label: '🔬 Very Long',
              sub: 'Master Analytical'
            }
          ].map(tier => (
            <button
              key={tier.id}
              onClick={() => setGranularity(tier.id)}
              className={`p-3 rounded-xl text-left transition-all ${
                granularity === tier.id
                  ? 'bg-orange-600 text-white shadow-md'
                  : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border border-stone-200/60'
              }`}
            >
              <div className="text-xs font-black leading-tight">{tier.label}</div>
              <div className={`text-[10px] ${granularity === tier.id ? 'text-orange-100' : 'text-stone-400'}`}>
                {tier.sub}
              </div>
            </button>
          ))}
        </div>

        {/* Chapter Jump Filter (if scripture has multiple chapters) */}
        {chapterSummaries && chapterSummaries.chapters.length > 1 && (
          <div className="pt-2 border-t border-stone-100 flex items-center gap-2 overflow-x-auto scrollbar-none text-xs">
            <span className="text-stone-400 font-bold whitespace-nowrap pl-1">Chapter:</span>
            <button
              onClick={() => setActiveChapterFilter('all')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                activeChapterFilter === 'all'
                  ? 'bg-stone-900 text-white'
                  : 'text-stone-600 hover:bg-stone-100'
              }`}
            >
              All Chapters ({chapterSummaries.chapters.length})
            </button>
            {chapterSummaries.chapters.map(ch => (
              <button
                key={ch.chapter}
                onClick={() => setActiveChapterFilter(ch.chapter)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                  activeChapterFilter === ch.chapter
                    ? 'bg-stone-900 text-white'
                    : 'text-stone-600 hover:bg-stone-100'
                }`}
              >
                Ch {ch.chapter}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ━━━━━━━━━━━━━━━━━ CONTENT RENDERING BY GRANULARITY ━━━━━━━━━━━━━━━━━ */}

      {/* TIER 1: VERY SHORT (Sutra Essence) */}
      {granularity === 'very_short' && (
        <section className="space-y-6 animate-in fade-in duration-200">
          <div className="p-6 rounded-3xl bg-amber-50/70 border border-amber-200/70">
            <span className="text-[10px] font-black uppercase tracking-widest text-amber-900 block mb-1">
              One-Sentence Master Thesis
            </span>
            <p className="text-base sm:text-lg font-serif italic text-amber-950 leading-relaxed">
              &ldquo;{digest.crisisAndContext.coreInsight}&rdquo;
            </p>
          </div>

          <div className="space-y-4">
            {displayedChapters.map(ch => (
              <article key={ch.chapter} className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-widest text-orange-800 bg-orange-50 px-2.5 py-0.5 rounded-full border border-orange-200">
                    Chapter {ch.chapter} • {ch.sanskritTitle}
                  </span>
                  <Link
                    href={`/${digest.slug}/${ch.chapter}`}
                    className="text-xs font-bold text-orange-700 hover:text-orange-800"
                  >
                    Read Chapter &rarr;
                  </Link>
                </div>
                <h3 className="text-lg font-serif font-black text-stone-900">{ch.title}</h3>
                <p className="text-sm text-stone-700 leading-relaxed font-medium">{ch.veryShort}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* TIER 2: SHORT (Tattva Samgraha) */}
      {granularity === 'short' && (
        <section className="space-y-10 animate-in fade-in duration-200">
          {/* Prastavana Box */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200/90 shadow-sm space-y-4">
            <div className="flex items-center gap-2.5 pb-2 border-b border-stone-100">
              <span className="text-xl">🏛️</span>
              <h2 className="text-lg font-serif font-black text-stone-900">Historical Setting &amp; Seeker Dilemma</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-100">
                <strong className="text-stone-400 block mb-0.5 uppercase tracking-wider">Seeker</strong>
                <span className="font-semibold text-stone-800">{digest.crisisAndContext.seeker}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-100">
                <strong className="text-stone-400 block mb-0.5 uppercase tracking-wider">Preceptor</strong>
                <span className="font-semibold text-stone-800">{digest.crisisAndContext.preceptor}</span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">{digest.crisisAndContext.setting}</p>
          </div>

          {/* Chapter-wise Short Summaries */}
          <div className="space-y-8">
            {displayedChapters.map(ch => (
              <article key={ch.chapter} className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-widest text-orange-800 bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
                    Chapter {ch.chapter} • {ch.sanskritTitle}
                  </span>
                  <Link
                    href={`/${digest.slug}/${ch.chapter}`}
                    className="text-xs font-bold text-orange-700 hover:text-orange-800"
                  >
                    Open Chapter {ch.chapter} &rarr;
                  </Link>
                </div>

                <h3 className="text-xl font-serif font-black text-stone-900">{ch.title}</h3>

                <div className="space-y-2">
                  <strong className="text-[10px] font-black uppercase tracking-widest text-stone-400 block">Topics Discussed</strong>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-700">
                    {ch.short.topics.map((t, idx) => (
                      <li key={idx} className="flex items-start gap-2 bg-stone-50 p-2.5 rounded-xl border border-stone-100">
                        <span className="text-orange-600 font-bold">•</span>
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-1">
                  <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-100">
                    <strong className="text-rose-900 font-bold block mb-1">⚖️ Core Dilemma</strong>
                    <p className="text-rose-900/90 leading-relaxed">{ch.short.coreDilemma}</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100">
                    <strong className="text-emerald-900 font-bold block mb-1">✨ Philosophical Resolution</strong>
                    <p className="text-emerald-900/90 leading-relaxed">{ch.short.philosophicalResolution}</p>
                  </div>
                </div>

                {/* Anchor Verse */}
                <div className="p-5 rounded-2xl bg-stone-50 border border-stone-100 space-y-2 text-center">
                  <span className="text-[10px] font-black uppercase tracking-widest text-stone-400 block">
                    Anchor Verse • Chapter {ch.short.anchorVerse.chapter}, Verse {ch.short.anchorVerse.verse}
                  </span>
                  <p className="text-sm sm:text-base font-serif font-bold text-stone-900 whitespace-pre-line leading-relaxed">
                    {ch.short.anchorVerse.sanskrit}
                  </p>
                  <p className="text-xs font-serif italic text-stone-600">
                    {ch.short.anchorVerse.transliteration}
                  </p>
                  <p className="text-xs text-stone-700 pt-2 border-t border-stone-200/60">
                    &ldquo;{ch.short.anchorVerse.translation}&rdquo;
                  </p>
                  <div className="pt-1">
                    <Link
                      href={ch.short.anchorVerse.deepDiveUrl}
                      className="text-[11px] font-bold text-orange-700 hover:text-orange-800"
                    >
                      Study Verse in Full Canvas &rarr;
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* TIER 3: LONG (Chapter Exegesis) */}
      {granularity === 'long' && (
        <section className="space-y-10 animate-in fade-in duration-200">
          {displayedChapters.map(ch => (
            <article key={ch.chapter} className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-orange-800 bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
                    Chapter {ch.chapter} • {ch.sanskritTitle}
                  </span>
                  <h3 className="text-2xl font-serif font-black text-stone-900 mt-2">{ch.title}</h3>
                </div>
                <Link
                  href={`/${digest.slug}/${ch.chapter}`}
                  className="text-xs font-bold px-3 py-1.5 rounded-xl bg-stone-900 text-white hover:bg-orange-700 transition-colors"
                >
                  Full Canvas &rarr;
                </Link>
              </div>

              <p className="text-sm text-stone-700 leading-relaxed font-medium bg-stone-50 p-4 rounded-2xl border border-stone-100">
                {ch.long.overview}
              </p>

              {/* Thematic Sections */}
              <div className="space-y-3">
                <strong className="text-xs font-black uppercase tracking-widest text-stone-400 block">Thematic Section Breakdown</strong>
                <div className="space-y-2.5">
                  {ch.long.thematicSections.map((sec, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-stone-50 border border-stone-100 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-stone-900">{sec.sectionTitle}</span>
                        <span className="text-[10px] font-black text-orange-700 bg-orange-50 px-2 py-0.5 rounded border border-orange-200/60">
                          Verses {sec.verseRange}
                        </span>
                      </div>
                      <p className="text-xs text-stone-600 leading-relaxed">{sec.discussion}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Multi-Scholar Perspectives */}
              <div className="space-y-3">
                <strong className="text-xs font-black uppercase tracking-widest text-stone-400 block">Multi-Scholar Synthesis (Lineages)</strong>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  {ch.long.scholarPerspectives.map((pers, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-amber-50/50 border border-amber-200/60 space-y-1">
                      <strong className="text-amber-950 font-bold block">{pers.tradition}</strong>
                      <p className="text-stone-700 leading-relaxed text-[11px]">{pers.keyInsight}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Conclusions */}
              <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100 space-y-1.5 text-xs">
                <strong className="text-emerald-950 font-bold block">✨ Chapter Conclusions</strong>
                <ul className="space-y-1 text-emerald-900">
                  {ch.long.conclusions.map((c, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="font-bold">•</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </section>
      )}

      {/* TIER 4: VERY LONG (Master Analytical Exegesis) */}
      {granularity === 'very_long' && (
        <section className="space-y-12 animate-in fade-in duration-200">
          {displayedChapters.map(ch => (
            <article key={ch.chapter} className="p-6 sm:p-10 rounded-3xl bg-white border border-stone-200 shadow-md space-y-8">
              <div className="flex items-center justify-between pb-4 border-b border-stone-200">
                <div>
                  <span className="text-xs font-black uppercase tracking-widest text-orange-800 bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
                    Chapter {ch.chapter} • {ch.sanskritTitle}
                  </span>
                  <h3 className="text-3xl font-serif font-black text-stone-900 mt-2">{ch.title}</h3>
                </div>
                <Link
                  href={`/${digest.slug}/${ch.chapter}`}
                  className="text-xs font-bold px-4 py-2 rounded-xl bg-stone-900 text-white hover:bg-orange-700 transition-colors shadow-sm"
                >
                  Open All {ch.totalVerses} Verses &rarr;
                </Link>
              </div>

              <div className="p-5 rounded-2xl bg-stone-50 border border-stone-100 text-sm sm:text-base text-stone-800 leading-relaxed font-medium">
                {ch.long.overview}
              </div>

              {/* Purvapaksha vs Siddhanta Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
                <div className="p-5 rounded-2xl bg-rose-50/70 border border-rose-200/80 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-base">❓</span>
                    <strong className="font-bold text-rose-950 uppercase tracking-wider text-xs">
                      Pūrvapakṣa (Doubts &amp; Objections)
                    </strong>
                  </div>
                  <ul className="space-y-2 text-rose-900">
                    {ch.veryLong.purvapaksha.map((p, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="font-bold text-rose-600">•</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-base">🛡️</span>
                    <strong className="font-bold text-emerald-950 uppercase tracking-wider text-xs">
                      Siddhānta (Established Truths)
                    </strong>
                  </div>
                  <ul className="space-y-2 text-emerald-900">
                    {ch.veryLong.siddhanta.map((s, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="font-bold text-emerald-600">•</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Practical Sadhana Instructions */}
              <div className="p-6 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-3 text-xs sm:text-sm">
                <strong className="text-xs font-black uppercase tracking-wider text-amber-950 block">
                  🧘 Actionable Sādhanā Instructions
                </strong>
                <ul className="space-y-2 text-amber-900">
                  {ch.veryLong.sadhanaInstructions.map((inst, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="font-bold text-orange-600">•</span>
                      <span>{inst}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Etymological & Linguistic Notes */}
              <div className="space-y-3 text-xs">
                <strong className="font-black uppercase tracking-wider text-stone-400 block">
                  📜 Key Sanskrit Technical Vocabulary
                </strong>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {ch.veryLong.etymologicalNotes.map((note, idx) => (
                    <div key={idx} className="p-3 bg-stone-50 rounded-xl border border-stone-100 text-stone-700">
                      {note}
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </section>
      )}

      {/* ━━━━━━━━━━━━━━━━━ SCIENTIFIC FACTS CROSS-LINK ━━━━━━━━━━━━━━━━━ */}
      {knowledgeTokens.length > 0 && (
        <section className="mt-16 p-6 sm:p-8 rounded-3xl bg-sky-50/70 border border-sky-200/80 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">🔬</span>
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-sky-800">
                  Diamond Tier 💎 Vaidika Vijñāna
                </span>
                <h3 className="text-xl font-serif font-black text-stone-900">
                  Scientific Facts in {digest.title}
                </h3>
              </div>
            </div>
            <Link
              href="/knowledge"
              className="text-xs font-bold text-sky-800 hover:text-sky-950"
            >
              Explore All Facts &rarr;
            </Link>
          </div>

          <p className="text-xs text-stone-600 leading-relaxed">
            This scripture contains verified empirical observations in natural science, astronomy, or human psychology:
          </p>

          <div className="space-y-3">
            {knowledgeTokens.map(token => (
              <div key={token.id} className="p-4 rounded-2xl bg-white border border-sky-200/60 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-900">{token.title}</span>
                  <span className="text-[10px] font-black text-sky-800 bg-sky-50 px-2 py-0.5 rounded">
                    {token.domainLabel}
                  </span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">{token.ancientObservation}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <div className="mt-16 p-8 sm:p-10 rounded-3xl bg-stone-900 text-white text-center space-y-4 shadow-xl">
        <span className="text-[10px] font-black uppercase tracking-widest text-orange-400">
          Deep Dive Into The Living Sacred Text
        </span>
        <h3 className="text-2xl sm:text-3xl font-serif font-black">
          Enter The Full Interactive Reading Canvas
        </h3>
        <p className="text-xs sm:text-sm text-stone-400 max-w-lg mx-auto leading-relaxed">
          Read every word with authentic Sanskrit typography, IAST phonetics, and comparative scholar commentaries.
        </p>
        <div className="pt-2">
          <Link
            href={`/${digest.slug}/1`}
            className="inline-block py-3 px-8 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-lg"
          >
            Start Chapter 1 &rarr;
          </Link>
        </div>
      </div>
    </div>
  )
}
