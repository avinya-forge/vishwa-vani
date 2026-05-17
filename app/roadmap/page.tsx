'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { VEDIC_LIBRARY } from '@/lib/texts'
import type { VedicText } from '@/lib/texts'

// Define completeness scores based on our silver data status
const COMPLETENESS_SCORES: Record<string, number> = {
  'bhagavad-gita': 100,
  'isha-upanishad': 100,
  'mahabharata': 15,
  'bhagavata-purana': 5,
  'kena-upanishad': 5,
  'yoga-sutras': 5,
  'rigveda': 0,
  'yajurveda': 0,
  'samaveda': 0,
  'atharvaveda': 0,
  'garuda-purana': 5,
  'vishnu-purana': 5,
  'samskaras': 5,
  'dasbodh': 0,
  'manusmriti': 0,
  'stotras': 0,
}

// Starting points for community upvote tallies
const MOCK_BASE_VOTES: Record<string, number> = {
  'mahabharata': 1485,
  'rigveda': 1120,
  'bhagavata-purana': 924,
  'yoga-sutras': 765,
  'kena-upanishad': 532,
  'yajurveda': 428,
  'samaveda': 391,
  'vishnu-purana': 342,
  'dasbodh': 298,
  'atharvaveda': 267,
  'garuda-purana': 214,
  'samskaras': 185,
  'manusmriti': -48,
  'stotras': 132,
}

const CATEGORY_LABELS: Record<string, string> = {
  all: 'All Categories',
  itihas: 'Itihasa',
  upanishad: 'Upanishads',
  purana: 'Puranas',
  veda: 'Vedas',
  other: 'Other Wisdom'
}

type UserVote = 'up' | 'down' | null

export default function RoadmapPage() {
  const [activeTab, setActiveTab] = useState<string>('all')
  const [votes, setVotes] = useState<Record<string, number>>(MOCK_BASE_VOTES)
  const [userVotes, setUserVotes] = useState<Record<string, UserVote>>({})
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [mounted, setMounted] = useState<boolean>(false)

  // Load vote preferences from localStorage to prevent multiple votes
  useEffect(() => {
    setMounted(true)
    const storedVotes = localStorage.getItem('vishwa_vani_roadmap_votes')
    if (storedVotes) {
      try {
        const parsed = JSON.parse(storedVotes) as Record<string, UserVote>
        setUserVotes(parsed)

        // Adjust base votes in state based on stored votes
        const updatedVotes = { ...MOCK_BASE_VOTES }
        Object.entries(parsed).forEach(([slug, vote]) => {
          if (vote === 'up') {
            updatedVotes[slug] = (updatedVotes[slug] || 0) + 1
          } else if (vote === 'down') {
            updatedVotes[slug] = (updatedVotes[slug] || 0) - 1
          }
        })
        setVotes(updatedVotes)
      } catch (e) {
        console.error('Failed to parse stored roadmap votes', e)
      }
    }
  }, [])

  const handleVote = (slug: string, direction: 'up' | 'down') => {
    const currentVote = userVotes[slug] || null
    let newVote: UserVote = null
    let voteDiff = 0

    if (currentVote === direction) {
      // Undo current vote
      newVote = null
      voteDiff = direction === 'up' ? -1 : 1
    } else {
      // Toggle or apply new vote
      newVote = direction
      if (currentVote === null) {
        voteDiff = direction === 'up' ? 1 : -1
      } else {
        // Toggle from up to down, or down to up (diff is 2 or -2)
        voteDiff = direction === 'up' ? 2 : -2
      }
    }

    const newUserVotes = { ...userVotes, [slug]: newVote }
    setUserVotes(newUserVotes)
    localStorage.setItem('vishwa_vani_roadmap_votes', JSON.stringify(newUserVotes))

    setVotes(prev => ({
      ...prev,
      [slug]: (prev[slug] || 0) + voteDiff
    }))
  }

  // Filter books dynamically based on tab, availability, search queries
  const filteredBooks = VEDIC_LIBRARY.filter((book: VedicText) => {
    const matchesTab = activeTab === 'all' || book.category === activeTab
    const matchesSearch = book.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (book.description && book.description.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesTab && matchesSearch
  }).sort((a, b) => {
    // Put available (live) books at the very bottom or top? Let's sort unavailable (voting) by votes desc, available at bottom
    if (a.available !== b.available) {
      return a.available ? 1 : -1 // Available books go to the bottom
    }
    if (!a.available) {
      // Sort by votes desc
      return (votes[b.slug] || 0) - (votes[a.slug] || 0)
    }
    return a.name.localeCompare(b.name)
  })

  // Grouped stats for total votes cast
  const liveCount = VEDIC_LIBRARY.filter((b: VedicText) => b.available).length
  const pipelineCount = VEDIC_LIBRARY.filter((b: VedicText) => !b.available).length

  return (
    <div className="min-h-screen bg-[#FDFBF7] dark:bg-[#1C1917] py-12 selection:bg-orange-500/20">
      {/* Ambient background glows */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-orange-100/30 dark:bg-orange-950/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-[40%] right-0 w-[500px] h-[500px] bg-amber-100/20 dark:bg-stone-900/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        
        {/* Header section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-orange-50 dark:bg-orange-950/30 border border-orange-100 dark:border-orange-900/50 text-orange-700 dark:text-orange-400 text-[10px] font-bold uppercase tracking-[0.2em]">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
            Roadmap & Public Prioritization
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-black text-stone-900 dark:text-stone-100 leading-tight mb-4">
            Our Scriptural Ingestion <span className="bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">Pipeline</span>
          </h1>
          <p className="text-stone-600 dark:text-stone-400 font-serif italic text-base sm:text-lg leading-relaxed">
            Vishwa-Vani operates on strict data curation. Below is our catalog roadmap. Upvote the scriptures you want our data pipeline agents to process next!
          </p>
        </div>

        {/* Global Pipeline Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          <div className="bg-white dark:bg-stone-900 border border-stone-200/60 dark:border-stone-800 p-5 rounded-2xl shadow-sm text-center">
            <span className="text-2xl mb-1 block">🟢</span>
            <div className="text-2xl font-black text-stone-950 dark:text-stone-50">{liveCount}</div>
            <div className="text-[10px] font-bold text-stone-400 dark:text-stone-500 uppercase tracking-widest mt-1">Live & Complete</div>
          </div>
          <div className="bg-white dark:bg-stone-900 border border-stone-200/60 dark:border-stone-800 p-5 rounded-2xl shadow-sm text-center">
            <span className="text-2xl mb-1 block">⏳</span>
            <div className="text-2xl font-black text-stone-950 dark:text-stone-50">{pipelineCount}</div>
            <div className="text-[10px] font-bold text-stone-400 dark:text-stone-500 uppercase tracking-widest mt-1">In Ingestion Pool</div>
          </div>
          <div className="bg-white dark:bg-stone-900 border border-stone-200/60 dark:border-stone-800 p-5 rounded-2xl shadow-sm text-center">
            <span className="text-2xl mb-1 block">🗳️</span>
            <div className="text-2xl font-black text-stone-950 dark:text-stone-50">
              {mounted ? Object.values(votes).reduce((a, b) => a + Math.max(0, b), 0).toLocaleString() : '...'}
            </div>
            <div className="text-[10px] font-bold text-stone-400 dark:text-stone-500 uppercase tracking-widest mt-1">Total Upvotes Cast</div>
          </div>
          <div className="bg-white dark:bg-stone-900 border border-stone-200/60 dark:border-stone-800 p-5 rounded-2xl shadow-sm text-center">
            <span className="text-2xl mb-1 block">🛡️</span>
            <div className="text-2xl font-black text-stone-950 dark:text-stone-50">100%</div>
            <div className="text-[10px] font-bold text-stone-400 dark:text-stone-500 uppercase tracking-widest mt-1">Vetted Fair-Use Tiers</div>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 bg-white/50 dark:bg-stone-900/50 backdrop-blur-md border border-stone-200/60 dark:border-stone-800 p-4 rounded-2xl shadow-sm">
          {/* Tabs */}
          <div className="flex flex-wrap gap-1.5">
            {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-4 py-2 text-[11px] uppercase tracking-wider font-black rounded-xl transition-all ${
                  activeTab === key
                    ? 'bg-orange-500 text-white shadow-sm'
                    : 'bg-white hover:bg-stone-100 dark:bg-stone-800 dark:hover:bg-stone-750 text-stone-700 dark:text-stone-300'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Search query field */}
          <div className="relative w-full md:max-w-xs">
            <span className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-stone-400 dark:text-stone-600">🔍</span>
            <input
              type="text"
              placeholder="Filter scriptures..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all placeholder:text-stone-400 dark:placeholder:text-stone-600"
            />
          </div>
        </div>

        {/* Roadmap pipelines list */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredBooks.map((book: VedicText) => {
            const completeness = COMPLETENESS_SCORES[book.slug] ?? 0
            const currentVotes = votes[book.slug] ?? 0
            const userVoteStatus = userVotes[book.slug] || null

            return (
              <div 
                key={book.slug}
                className={`relative flex flex-col justify-between bg-white dark:bg-stone-900 border ${
                  book.available 
                    ? 'border-emerald-500/20 dark:border-emerald-500/10 shadow-emerald-500/5 hover:border-emerald-500/30' 
                    : 'border-stone-200/60 dark:border-stone-800 hover:border-orange-200 dark:hover:border-orange-950/40'
                } rounded-3xl p-6 shadow-md transition-all group`}
              >
                <div>
                  {/* Category badge & Status labels */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 text-[9px] font-black uppercase tracking-widest rounded-lg">
                      {CATEGORY_LABELS[book.category] || book.category}
                    </span>
                    {book.available ? (
                      <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/50 text-emerald-700 dark:text-emerald-400 text-[9px] font-black uppercase tracking-widest rounded-lg">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Live & Ready
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 px-3 py-1 bg-orange-50 dark:bg-orange-950/30 border border-orange-100 dark:border-orange-900/50 text-orange-700 dark:text-orange-400 text-[9px] font-black uppercase tracking-widest rounded-lg">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                        Ingesting
                      </span>
                    )}
                  </div>

                  {/* Title & description */}
                  <h3 className="text-xl sm:text-2xl font-serif font-black text-stone-900 dark:text-stone-100 mb-2">
                    {book.name}
                  </h3>
                  {book.nameDevanagari && (
                    <div className="font-serif text-sm text-stone-400 dark:text-stone-500 mb-3 font-bold">
                      {book.nameDevanagari}
                    </div>
                  )}
                  <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed mb-6 font-serif line-clamp-3">
                    {book.description || 'Eternal sacred text containing timeless principles of Vedic truth.'}
                  </p>
                </div>

                <div>
                  {/* Progress panel */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between text-xs font-black uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-2">
                      <span>Pipeline Completeness</span>
                      <span className={book.available ? 'text-emerald-500' : 'text-orange-500'}>
                        {completeness}%
                      </span>
                    </div>
                    <div className="w-full h-3 bg-stone-100 dark:bg-stone-850 rounded-full overflow-hidden border border-stone-200/50 dark:border-stone-800">
                      <div 
                        className={`h-full rounded-full transition-all duration-1000 ${
                          book.available 
                            ? 'bg-gradient-to-r from-emerald-600 to-emerald-400' 
                            : completeness > 0 
                              ? 'bg-gradient-to-r from-orange-600 to-amber-400' 
                              : 'bg-stone-300 dark:bg-stone-700'
                        }`}
                        style={{ width: `${completeness}%` }}
                      />
                    </div>
                  </div>

                  {/* Action Panel */}
                  <div className="flex items-center justify-between gap-4 pt-4 border-t border-stone-100 dark:border-stone-850">
                    {book.available ? (
                      <Link
                        href={`/${book.slug}/1`}
                        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-black text-[10px] uppercase tracking-widest rounded-2xl shadow-sm hover:shadow transition-all"
                      >
                        📖 Begin Reading
                      </Link>
                    ) : (
                      <>
                        <div className="text-left">
                          <div className="text-[9px] font-black text-stone-400 dark:text-stone-500 uppercase tracking-widest">
                            Estimated Rank
                          </div>
                          <div className={`text-lg font-serif font-black ${currentVotes >= 500 ? 'text-orange-500' : 'text-stone-700 dark:text-stone-350'}`}>
                            {mounted ? currentVotes.toLocaleString() : '...'} <span className="text-[10px] font-sans font-bold text-stone-400 uppercase tracking-wider">votes</span>
                          </div>
                        </div>

                        {/* Interactive Voting Panel */}
                        <div className="flex items-center gap-1 bg-stone-100 dark:bg-stone-800/80 p-1 rounded-2xl border border-stone-200/50 dark:border-stone-700/50">
                          <button
                            onClick={() => handleVote(book.slug, 'up')}
                            className={`flex items-center justify-center w-10 h-10 rounded-xl font-bold transition-all ${
                              userVoteStatus === 'up'
                                ? 'bg-orange-500 text-white shadow-sm'
                                : 'hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-500 dark:text-stone-400'
                            }`}
                            title="Upvote to raise priority"
                          >
                            ▲
                          </button>
                          <button
                            onClick={() => handleVote(book.slug, 'down')}
                            className={`flex items-center justify-center w-10 h-10 rounded-xl font-bold transition-all ${
                              userVoteStatus === 'down'
                                ? 'bg-stone-400 dark:bg-stone-600 text-white shadow-sm'
                                : 'hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-400 dark:text-stone-500'
                            }`}
                            title="Downvote to lower priority"
                          >
                            ▼
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Empty State */}
        {filteredBooks.length === 0 && (
          <div className="text-center py-20 bg-white dark:bg-stone-900 border border-stone-200/60 dark:border-stone-800 rounded-3xl">
            <span className="text-4xl block mb-4">🔍</span>
            <h3 className="text-lg font-black text-stone-800 dark:text-stone-200 mb-2">No scriptures match your filter</h3>
            <p className="text-stone-400 dark:text-stone-500 text-sm">Try tweaking your category tab or search query.</p>
          </div>
        )}

      </div>
    </div>
  )
}
