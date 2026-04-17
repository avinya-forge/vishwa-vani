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

export default function SearchClient() {
  const _t = useTranslations('study')
  const _nt = useTranslations('nav')
  const _locale = useLocale()

  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [activeTab, setActiveTab] = useState<'all' | 'itihas' | 'upanishad' | 'purana'>('all')

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (query.trim().length > 2) {
        setIsSearching(true)
        try {
          const res = await searchLake(query)
          setResults((res as unknown as SearchResult[]) || [])
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
    const base = [...results]
    
    // BUG-028: Natural sort by text, chapter, verse
    base.sort((a, b) => {
      if (a.textSlug !== b.textSlug) return a.textSlug.localeCompare(b.textSlug)
      if (a.chapter !== b.chapter) return a.chapter - b.chapter
      return a.verse - b.verse
    })

    if (activeTab === 'all') return base
    return base.filter(r => {
        const meta = VEDIC_LIBRARY.find(l => l.slug === r.textSlug)
        return meta?.category === activeTab
    })
  }, [results, activeTab])

  const getSnippet = (text: string, q: string) => {
    if (!text || !q || q.length < 3) return null
    const lowerText = text.toLowerCase()
    const lowerQ = q.toLowerCase()
    const idx = lowerText.indexOf(lowerQ)
    if (idx === -1) return null

    const start = Math.max(0, idx - 50)
    const end = Math.min(text.length, idx + q.length + 50)

    const prefix = start > 0 ? '...' : ''
    const suffix = end < text.length ? '...' : ''

    const beforeMatch = text.slice(start, idx)
    const match = text.slice(idx, idx + q.length)
    const afterMatch = text.slice(idx + q.length, end)

    return (
      <span className="dark:text-stone-300">
        {prefix}{beforeMatch}
        <mark className="bg-orange-200 dark:bg-orange-500/40 text-stone-900 dark:text-stone-100 rounded px-1">{match}</mark>
        {afterMatch}{suffix}
      </span>
    )
  }

  return (
    <div className="max-wide px-6 py-12 md:py-20 min-h-screen bg-[#FDFBF7] dark:bg-[#1C1917]">
      <div className="max-w-4xl mx-auto mb-12">
        <header className="mb-10">
          <span className="label-bold text-orange-600 mb-4 block">Universal Search</span>
          <h1 className="text-4xl md:text-5xl font-serif font-black text-stone-900 dark:text-stone-100 mb-6 flex items-center gap-4">
             Explore the Vedic Wikipedia
          </h1>
        </header>
        
        <div className="relative group">
          <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
             <span className="text-2xl grayscale group-focus-within:grayscale-0 transition-all">🔍</span>
          </div>
          <input
            type="text"
            placeholder="Search verses (e.g., 'Dharma', 'Karma', 'कर्तव्य')..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-16 pr-8 py-6 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-[2rem] shadow-xl focus:border-orange-400 focus:ring-8 focus:ring-orange-50 dark:focus:ring-orange-950/30 focus:outline-none transition-all text-xl font-serif text-stone-900 dark:text-stone-100 placeholder:text-stone-300 dark:placeholder:text-stone-600"
            autoFocus
          />
          {isSearching && (
            <div className="absolute right-8 top-1/2 -translate-y-1/2">
               <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-600" />
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-3 mt-8 animate-in fade-in slide-in-from-bottom-2 duration-700">
           <span className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-400 dark:text-stone-500 py-2 mr-2 leading-8">Top Concepts:</span>
           {['Bhakti', 'Karma', 'Jnana', 'Dharma', 'Yoga', 'Atman', 'Brahman'].map(concept => (
             <button
               key={concept}
               onClick={() => setQuery(concept.toLowerCase())}
               className="text-[10px] font-black uppercase tracking-widest text-stone-900 dark:text-stone-200 border border-stone-200 dark:border-stone-700 px-4 py-2 rounded-full hover:bg-orange-600 hover:text-white hover:border-orange-600 transition-all hover:scale-105 shadow-sm bg-white dark:bg-stone-800"
             >
               {concept}
             </button>
           ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="flex gap-2 mb-10 overflow-x-auto pb-4 scrollbar-hide">
          {(() => {
            const categories = ['all', ...Array.from(new Set(VEDIC_LIBRARY.map(l => l.category).filter(Boolean)))]
            return categories.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-6 py-3 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap border ${
                  activeTab === tab
                  ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 border-stone-900 dark:border-stone-100 shadow-xl'
                  : 'bg-white dark:bg-stone-800 text-stone-400 dark:text-stone-500 border-stone-100 dark:border-stone-700 hover:border-orange-200 dark:hover:border-orange-800 hover:text-stone-700 dark:hover:text-stone-300'
                }`}
              >
                {tab === 'all' ? 'All Scriptures' : String(tab).charAt(0).toUpperCase() + String(tab).slice(1)}
              </button>
            ))
          })()}
        </div>

        <div className="grid grid-cols-1 gap-6">
          {filteredResults.length > 0 ? (
            filteredResults.map((result, idx) => {
              const meta = VEDIC_LIBRARY.find(l => l.slug === result.textSlug)
              return (
                <Link 
                  key={idx}
                  href={`/${result.textSlug}/${result.chapter}#verse-${result.verse}`}
                  className="block group"
                >
                  <div className="card-premium p-8 bg-white/60 dark:bg-stone-900/60 dark:border-stone-800">
                    <div className="flex justify-between items-start mb-4">
                      <span className="label-bold !text-[11px] text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/40 px-3 py-1 rounded-lg border border-orange-100 dark:border-orange-900">
                        {meta?.name || result.textSlug} · Chapter {result.chapter} · Verse {result.verse}
                      </span>
                    </div>
                    <p className="text-stone-900 dark:text-stone-100 font-serif text-xl md:text-2xl font-black mb-3 leading-snug group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                      {result.slok}
                    </p>
                    <p className="text-stone-500 dark:text-stone-400 italic text-sm leading-relaxed line-clamp-2 font-serif opacity-70 group-hover:opacity-100 transition-opacity mb-3">
                      {result.transliteration}
                    </p>
                    {(getSnippet(result.slok, query) || getSnippet(result.transliteration, query)) && (
                      <p className="text-sm text-stone-600 dark:text-stone-400 bg-stone-50 dark:bg-stone-800 p-3 rounded border border-stone-100 dark:border-stone-700 italic leading-relaxed">
                        {getSnippet(result.slok, query) || getSnippet(result.transliteration, query)}
                      </p>
                    )}
                  </div>
                </Link>
              )
            })
          ) : query.length > 2 && !isSearching ? (
            <div className="text-center py-32 bg-white dark:bg-stone-900 rounded-[3rem] border border-dashed border-stone-200 dark:border-stone-700 shadow-inner">
               <div className="text-6xl mb-6 opacity-20">🕯️</div>
               <p className="text-stone-900 dark:text-stone-100 font-serif font-black text-2xl mb-2">No fragments found</p>
               <p className="text-stone-400 dark:text-stone-500 font-medium max-w-xs mx-auto mb-8">Matching your intent &apos;{query}&apos; across the shards.</p>

               <div className="flex flex-col items-center gap-4 mb-8">
                 <span className="text-xs font-bold uppercase tracking-widest text-stone-500 dark:text-stone-400">Suggested Topics</span>
                 <div className="flex flex-wrap justify-center gap-2">
                   {['Dharma', 'Brahman', 'Yoga', 'Meditation'].map(topic => (
                     <button
                       key={topic}
                       onClick={() => setQuery(topic.toLowerCase())}
                       className="px-4 py-2 bg-stone-50 dark:bg-stone-800 hover:bg-orange-100 dark:hover:bg-orange-950/40 text-stone-700 dark:text-stone-300 hover:text-orange-800 dark:hover:text-orange-400 text-sm font-semibold rounded-full border border-stone-200 dark:border-stone-700 hover:border-orange-300 dark:hover:border-orange-800 transition-all"
                     >
                       Try: {topic}
                     </button>
                   ))}
                 </div>
               </div>

               <button onClick={() => setQuery('')} className="px-8 py-3 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 font-black uppercase text-[10px] tracking-[0.2em] rounded-xl hover:bg-orange-600 transition-all shadow-lg shadow-stone-200">Clear Search</button>
            </div>
          ) : (
            <div className="text-center py-32">
               <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl opacity-50 animate-pulse">🧭</div>
               <p className="text-stone-400 dark:text-stone-500 font-serif italic text-lg leading-relaxed max-w-sm mx-auto">
                 Begin your journey across the Sanskrit shards by typing a concept or keyword.
               </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
