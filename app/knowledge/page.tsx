'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { getAllKnowledgeTokens, type ScientificDomain } from '@/lib/vedic-science'

export default function VedicKnowledgePage() {
  const [selectedDomain, setSelectedDomain] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')

  const allTokens = getAllKnowledgeTokens()

  const filteredTokens = allTokens.filter(token => {
    const matchesDomain = selectedDomain === 'all' || token.domain === selectedDomain
    const q = searchQuery.toLowerCase().trim()
    const matchesQuery =
      !q ||
      token.title.toLowerCase().includes(q) ||
      token.sanskritTerm.includes(q) ||
      token.ancientObservation.toLowerCase().includes(q) ||
      token.modernCorroboration.toLowerCase().includes(q) ||
      token.scriptureName.toLowerCase().includes(q) ||
      token.tags.some(t => t.toLowerCase().includes(q))

    return matchesDomain && matchesQuery
  })

  return (
    <main className="min-h-screen bg-[#FDFBF7] text-stone-900 selection:bg-orange-500/30 pb-32 pt-20 relative overflow-hidden">
      {/* Background ambient accents */}
      <div className="absolute top-[-10%] left-[-10%] w-[55vw] h-[55vw] bg-sky-200/20 rounded-full blur-[100px] pointer-events-none mix-blend-multiply" />
      <div className="absolute bottom-[-15%] right-[-10%] w-[50vw] h-[50vw] bg-amber-200/20 rounded-full blur-[120px] pointer-events-none mix-blend-multiply" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        {/* Hero Section */}
        <div className="max-w-3xl mb-14 space-y-4">
          <div className="flex items-center gap-3">
            <span className="w-8 h-[2px] bg-sky-600" />
            <span className="text-[11px] font-black uppercase tracking-[0.4em] text-sky-800">
              Vaidika Vijñāna • वैदिक विज्ञान
            </span>
          </div>

          <h1 className="text-[clamp(2.75rem,5.5vw,4.5rem)] font-serif font-black tracking-tight text-stone-900 leading-[1.08]">
            Scientific &amp; Empirical Heritage
          </h1>

          <p className="text-stone-600 text-lg md:text-xl font-serif italic leading-relaxed">
            Exploring verified archaeoastronomical configurations, Ayurvedic nutritional physiology, cognitive psychology, and atomic cosmology embedded within canonical scriptures.
          </p>

          <div className="flex flex-wrap gap-2.5 pt-2 text-xs font-semibold">
            <span className="px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-900 flex items-center gap-1.5">
              <span>🪐</span> <span>Astronomy &amp; Eclipses</span>
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center gap-1.5">
              <span>🌿</span> <span>Ayurveda &amp; Nutrition</span>
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 flex items-center gap-1.5">
              <span>🧠</span> <span>Cognitive Science</span>
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-900 flex items-center gap-1.5">
              <span>⚛️</span> <span>Atomic Theory &amp; Cosmology</span>
            </span>
          </div>
        </div>

        {/* Filter Tabs and Search Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-10 pb-6 border-b border-stone-200">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {[
              { id: 'all', label: `All Domains (${allTokens.length})` },
              { id: 'astronomy', label: '🔭 Astronomy' },
              { id: 'ayurveda', label: '🌿 Ayurveda & Health' },
              { id: 'psychology', label: '🧠 Cognitive Science' },
              { id: 'cosmology', label: '⚛️ Cosmology & Physics' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedDomain(tab.id as ScientificDomain | 'all')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  selectedDomain === tab.id
                    ? 'bg-sky-800 text-white shadow-md'
                    : 'bg-white hover:bg-stone-100 text-stone-600 border border-stone-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative min-w-[260px] md:w-72">
            <input
              type="text"
              placeholder="Filter by fact, term, or text..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 pl-9 rounded-xl border border-stone-200 bg-white text-xs font-medium focus:outline-none focus:border-sky-500 shadow-sm"
            />
            <span className="absolute left-3 top-2.5 text-stone-400 text-xs">🔍</span>
          </div>
        </div>

        {/* Empirical Knowledge Tokens Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredTokens.map(token => (
            <article
              key={token.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 hover:border-sky-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-widest text-sky-800 bg-sky-50 px-3 py-1 rounded-full border border-sky-200">
                    {token.domainLabel}
                  </span>
                  <span className="text-xs font-bold text-stone-500">
                    {token.scriptureName} ({token.verseRange})
                  </span>
                </div>

                <div>
                  <div className="text-sm font-serif font-bold text-sky-950/60 mb-0.5">
                    {token.sanskritTerm}
                  </div>
                  <h2 className="text-2xl font-serif font-black text-stone-900">
                    {token.title}
                  </h2>
                </div>

                {/* Ancient Observation */}
                <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/70 space-y-1">
                  <strong className="text-[10px] font-black uppercase tracking-wider text-amber-900 block">
                    📜 Ancient Scriptural Observation
                  </strong>
                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-medium">
                    {token.ancientObservation}
                  </p>
                </div>

                {/* Modern Corroboration */}
                <div className="p-4 rounded-2xl bg-sky-50/60 border border-sky-200/70 space-y-1">
                  <strong className="text-[10px] font-black uppercase tracking-wider text-sky-900 block">
                    🔬 Modern Scientific Corroboration
                  </strong>
                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-medium">
                    {token.modernCorroboration}
                  </p>
                </div>

                {/* Empirical Significance */}
                <div className="text-xs text-stone-600 leading-relaxed pt-1">
                  <strong className="text-stone-800">💡 Historical &amp; Empirical Key: </strong>
                  {token.empiricalFact}
                </div>

                {/* Sanskrit Citation */}
                {token.keyCitations.map((cite, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-stone-50 border border-stone-100 space-y-2">
                    <p className="text-xs sm:text-sm font-serif font-bold text-stone-900 whitespace-pre-line leading-relaxed text-center">
                      {cite.sanskrit}
                    </p>
                    <p className="text-[11px] font-serif italic text-stone-600 text-center">
                      {cite.transliteration}
                    </p>
                    <p className="text-xs text-stone-700 pt-1 border-t border-stone-200/60">
                      &ldquo;{cite.translation}&rdquo;
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {token.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="text-[10px] text-stone-400 bg-stone-50 px-2 py-0.5 rounded-md border border-stone-100">
                      #{tag}
                    </span>
                  ))}
                </div>

                <Link
                  href={token.keyCitations[0]?.verseUrl || `/${token.scriptureSlug}/1`}
                  className="text-xs font-bold text-sky-800 hover:text-sky-950 flex items-center gap-1 group"
                >
                  <span>Study in Reading Canvas</span>
                  <span className="group-hover:translate-x-0.5 transition-transform">&rarr;</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  )
}
