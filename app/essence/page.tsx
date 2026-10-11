'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { getAllTattvaDigests } from '@/lib/speed-reader'

export default function EssenceHubPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')

  const allDigests = getAllTattvaDigests()

  const filteredDigests = allDigests.filter(d => {
    const matchesCategory =
      selectedCategory === 'all' ||
      (selectedCategory === 'upanishads' && d.category.includes('Upanishad')) ||
      (selectedCategory === 'gita' && d.slug === 'bhagavad-gita') ||
      (selectedCategory === 'yoga' && d.slug === 'yoga-sutras')

    const q = searchQuery.toLowerCase().trim()
    const matchesQuery =
      !q ||
      d.title.toLowerCase().includes(q) ||
      d.sanskritTitle.includes(q) ||
      d.crisisAndContext.centralQuestion.toLowerCase().includes(q) ||
      d.crisisAndContext.seeker.toLowerCase().includes(q) ||
      d.crisisAndContext.preceptor.toLowerCase().includes(q)

    return matchesCategory && matchesQuery
  })

  return (
    <main className="min-h-screen bg-[#FDFBF7] text-stone-900 selection:bg-orange-500/30 pb-32 pt-20 relative overflow-hidden">
      {/* Ambient spiritual glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-amber-200/20 rounded-full blur-[100px] pointer-events-none mix-blend-multiply" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-orange-200/20 rounded-full blur-[120px] pointer-events-none mix-blend-multiply" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Hero Section */}
        <div className="max-w-3xl mb-16 space-y-5">
          <div className="flex items-center gap-3">
            <span className="w-8 h-[2px] bg-orange-600" />
            <span className="text-[11px] font-black uppercase tracking-[0.4em] text-orange-700">
              Tattva Saṁgraha • तत्त्व सङ्ग्रह
            </span>
          </div>

          <h1 className="text-[clamp(2.75rem,5.5vw,4.5rem)] font-serif font-black tracking-tight text-stone-900 leading-[1.08]">
            The 1-Hour Vedic Essence
          </h1>

          <p className="text-stone-600 text-lg md:text-xl font-serif italic leading-relaxed">
            Short on time? Master the foundational breakthrough, pinnacle verses, and daily practices of humanity&apos;s greatest spiritual classics in under 60 minutes.
          </p>

          <div className="flex flex-wrap gap-3 pt-2 text-xs font-semibold text-stone-600">
            <div className="px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-900 flex items-center gap-2">
              <span>⚡</span> <span>45–60 Min Structured Flows</span>
            </div>
            <div className="px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 flex items-center gap-2">
              <span>📜</span> <span>100% Authentic Sanskrit Shlokas</span>
            </div>
            <div className="px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center gap-2">
              <span>🔗</span> <span>1-Click Deep Dives into Full Text</span>
            </div>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-10 pb-6 border-b border-stone-200">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {[
              { id: 'all', label: 'All Classics' },
              { id: 'gita', label: 'Bhagavad Gita' },
              { id: 'upanishads', label: 'Mukhya Upanishads' },
              { id: 'yoga', label: 'Yoga Sutras' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  selectedCategory === tab.id
                    ? 'bg-orange-700 text-white shadow-md'
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
              placeholder="Search by topic, seeker, inquiry..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 pl-9 rounded-xl border border-stone-200 bg-white text-xs font-medium focus:outline-none focus:border-orange-500 shadow-sm"
            />
            <span className="absolute left-3 top-2.5 text-stone-400 text-xs">🔍</span>
          </div>
        </div>

        {/* Catalog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDigests.map(digest => (
            <article
              key={digest.id}
              className="group bg-white rounded-3xl p-7 border border-stone-200/90 hover:border-orange-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-widest text-orange-800 bg-orange-50 px-2.5 py-1 rounded-full border border-orange-200/70">
                    {digest.category}
                  </span>
                  <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200/70 flex items-center gap-1">
                    <span>⚡</span> {digest.estimatedReadMinutes} min read
                  </span>
                </div>

                <div>
                  <div className="text-sm font-serif font-bold text-orange-900/60 mb-0.5">
                    {digest.sanskritTitle}
                  </div>
                  <h2 className="text-2xl font-serif font-black text-stone-900 group-hover:text-orange-700 transition-colors">
                    {digest.title}
                  </h2>
                </div>

                <div className="text-xs text-stone-500 space-y-1">
                  <div>
                    <strong className="text-stone-700">Seeker:</strong> {digest.crisisAndContext.seeker}
                  </div>
                  <div>
                    <strong className="text-stone-700">Preceptor:</strong> {digest.crisisAndContext.preceptor}
                  </div>
                </div>

                <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-100 text-xs text-stone-600 leading-relaxed font-serif italic">
                  &ldquo;{digest.crisisAndContext.centralQuestion}&rdquo;
                </div>

                <div className="flex items-center gap-2 text-[11px] text-stone-500 font-medium">
                  <span>🏛️ {digest.totalOriginalVerses} Canonical Verses</span>
                  <span>•</span>
                  <span>⭐ {digest.signpostVerses.length} Pinnacle Signposts</span>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-stone-100 flex items-center justify-between">
                <Link
                  href={`/essence/${digest.slug}`}
                  className="w-full text-center py-2.5 px-4 rounded-xl bg-stone-900 hover:bg-orange-700 text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
                >
                  Start 1-Hour Read &rarr;
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  )
}
