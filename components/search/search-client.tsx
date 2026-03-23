'use client'

import React, { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { searchLake } from '@/lib/lake'
import { VEDIC_LIBRARY } from '@/lib/texts'

interface SearchResult {
  textSlug: string
  chapter: number
  verse: number
  slok: string
  transliteration: string
}

export default function search-client() {
  const t = useTranslations('study')
  const nt = useTranslations('nav')
  const locale = useLocale()
  // App Router in this project handles translation at the component level without route prefixes
  const localePrefix = ''

  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [activeTab, setActiveTab] = useState<'all' | 'itihas' | 'upanishad' | 'purana'>('all')

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (query.trim().length > 2) {
        setIsSearching(true)
        try {
          // In Milestone 1, we search the primary vedic-lake.db. 
          // Future milestones will search itihasa-lake and purana-lake shards.
          const res = await searchLake(query)
          setResults(res)
        } catch (error) {
          console.error('Search failed:', error)
        } finally {
          setIsSearching(false)
        }
      } else {
        setResults([])
      }
    }, 400)

    return () => clearTimeout(delayDebounceFn)
  }, [query])

  const filteredResults = useMemo(() => {
    if (activeTab === 'all') return results
    return results.filter(r => {
        const meta = VEDIC_LIBRARY.find(l => l.slug === r.textSlug)
        return meta?.category === activeTab
    })
  }, [results, activeTab])

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <div className="mb-5">
        <h1 className="text-2xl font-serif font-black text-stone-900 mb-4 flex items-center gap-2">
          <span className="p-1.5 bg-orange-100 text-orange-600 rounded-lg text-lg">🔍</span>
          {nt('search')}
        </h1>
        
        <div className="relative group">
          <input
            type="text"
            placeholder="Search verses (e.g., 'Dharma', 'Karma', 'कर्म')..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-4 py-3 bg-white border-2 border-stone-100 rounded-xl shadow-sm focus:border-orange-500 focus:outline-none transition-all text-base font-serif"
            autoFocus
          />
          {isSearching && (
            <div className="absolute right-6 top-5 animate-spin rounded-full h-5 w-5 border-b-2 border-orange-600" />
          )}
        </div>
      </div>

      <div className="flex gap-2 mb-5 overflow-x-auto pb-1.5">
        {['all', 'itihas', 'upanishad', 'purana'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${
              activeTab === tab 
              ? 'bg-orange-600 text-white shadow-md' 
              : 'bg-white text-stone-500 hover:bg-stone-50 border border-stone-100'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filteredResults.length > 0 ? (
          filteredResults.map((result, idx) => {
            const meta = VEDIC_LIBRARY.find(l => l.slug === result.textSlug)
            return (
              <Link 
                key={idx}
                href={`/${result.textSlug}/${result.chapter}`}
                className="block group"
              >
                <div className="bg-white p-4 rounded-xl border border-stone-100 shadow-sm hover:shadow-md hover:border-orange-200 transition-all">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[9px] font-bold text-orange-600 uppercase tracking-widest bg-orange-50 px-2 py-0.5 rounded">
                      {meta?.name || result.textSlug} • Ch {result.chapter} • Vs {result.verse}
                    </span>
                  </div>
                  <p className="text-stone-800 font-serif text-[15px] mb-1.5 leading-relaxed">
                    {result.slok}
                  </p>
                  <p className="text-stone-400 italic text-[11px] line-clamp-2">
                    {result.transliteration}
                  </p>
                </div>
              </Link>
            )
          })
        ) : query.length > 2 && !isSearching ? (
          <div className="text-center py-20 bg-stone-50 rounded-3xl border border-dashed border-stone-200">
             <p className="text-stone-400 font-serif">No matches found in the current sharded library.</p>
          </div>
        ) : (
          <div className="text-center py-20">
             <p className="text-stone-300 font-serif italic">Type keywords to explore the Vedic Wikipedia...</p>
          </div>
        )}
      </div>
    </div>
  )
}
