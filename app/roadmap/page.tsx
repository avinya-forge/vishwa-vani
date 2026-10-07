'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { VEDIC_LIBRARY, type VedicText } from '@/lib/texts'
import { Book, Database, CheckCircle2, ArrowRight, Library, Sparkles, AlertCircle, Clock, ArrowUp, ArrowDown } from "lucide-react"

// Hardcoded completeness values 
const COMPLETENESS_SCORES: Record<string, number> = {
  'isha-upanishad': 100,
  'kena-upanishad': 100,
  'bhagavad-gita': 100,
  'mahabharata': 100,
  'bhagavata-purana': 100,
  'yoga-sutras': 100,
  'vishnu-purana': 100,
  'samskaras': 100,
  'stotras': 100,
  'rigveda': 100,
  'brahma-sutras': 100,
  'yajurveda': 100,
  'samaveda': 100,
  'atharvaveda': 100,
  'garuda-purana': 100,
  'dasbodh': 0,
  'manusmriti': 100,
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
  'manusmriti': 12,
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
      newVote = null
      voteDiff = direction === 'up' ? -1 : 1
    } else {
      newVote = direction
      if (currentVote === null) {
        voteDiff = direction === 'up' ? 1 : -1
      } else {
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
  const liveBooks = VEDIC_LIBRARY.filter(b => b.available).filter((book: VedicText) => {
    const matchesTab = activeTab === 'all' || book.category === activeTab
    const matchesSearch = book.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (book.description && book.description.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesTab && matchesSearch
  }).sort((a, b) => a.name.localeCompare(b.name))

  const upcomingBooks = VEDIC_LIBRARY.filter(b => !b.available).filter((book: VedicText) => {
    const matchesTab = activeTab === 'all' || book.category === activeTab
    const matchesSearch = book.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (book.description && book.description.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesTab && matchesSearch
  }).sort((a, b) => {
    const compA = COMPLETENESS_SCORES[a.slug] || 0
    const compB = COMPLETENESS_SCORES[b.slug] || 0
    if (compA !== compB) return compB - compA
    return (votes[b.slug] || 0) - (votes[a.slug] || 0)
  })

  // Grouped stats for total votes cast
  
  const liveCount = VEDIC_LIBRARY.filter((b: VedicText) => b.available).length
  const pipelineCount = VEDIC_LIBRARY.filter((b: VedicText) => !b.available).length
  
  // Calculate shlokas in queue based on remaining chapters (Assume ~30 verses per chapter)
  const shlokasInQueue = VEDIC_LIBRARY.filter(b => !b.available).reduce((acc, b) => acc + (b.totalChapters * 30), 0)

  return (
    <div className="min-h-screen bg-[#FDFBF7] dark:bg-[#121212] py-12 selection:bg-orange-500/20 relative overflow-hidden">
      {/* Ambient background glows for Glass UI */}
      <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-orange-200/20 dark:bg-orange-900/20 rounded-full blur-[100px] pointer-events-none mix-blend-multiply dark:mix-blend-lighten" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-amber-200/20 dark:bg-stone-800/40 rounded-full blur-[120px] pointer-events-none mix-blend-multiply dark:mix-blend-lighten" />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-white/40 dark:bg-white/5 border border-white/40 dark:border-white/10 backdrop-blur-md shadow-sm text-orange-700 dark:text-orange-400 text-[10px] font-bold uppercase tracking-[0.2em]">
            <Sparkles className="w-3.5 h-3.5 text-orange-500" />
            Roadmap & Public Prioritization
          </div>
          <h1 className="text-5xl sm:text-6xl font-serif font-black text-stone-900 dark:text-stone-100 leading-tight mb-6 tracking-tight">
            Our Scriptural <span className="bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">Pipeline</span>
          </h1>
          <p className="text-stone-600 dark:text-stone-400 font-serif text-lg leading-relaxed max-w-2xl mx-auto">
            Vishwa-Vani operates on strict data curation. Below is our catalog roadmap. Upvote the scriptures you want our data pipeline agents to process next!
          </p>
        </div>

        {/* Global Pipeline Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16">
          <div className="bg-white/50 dark:bg-black/30 backdrop-blur-xl border border-white/40 dark:border-white/10 p-6 rounded-3xl shadow-xl shadow-stone-200/20 dark:shadow-black/20 text-center transition-transform hover:scale-[1.02]">
            <Library className="w-8 h-8 mx-auto text-emerald-500 mb-3" />
            <div className="text-3xl font-black text-stone-950 dark:text-stone-50">{liveCount}</div>
            <div className="text-[10px] font-bold text-stone-400 dark:text-stone-500 uppercase tracking-widest mt-2">Live Books</div>
          </div>
          <div className="bg-white/50 dark:bg-black/30 backdrop-blur-xl border border-white/40 dark:border-white/10 p-6 rounded-3xl shadow-xl shadow-stone-200/20 dark:shadow-black/20 text-center transition-transform hover:scale-[1.02]">
            <Clock className="w-8 h-8 mx-auto text-orange-500 mb-3" />
            <div className="text-3xl font-black text-stone-950 dark:text-stone-50">{pipelineCount}</div>
            <div className="text-[10px] font-bold text-stone-400 dark:text-stone-500 uppercase tracking-widest mt-2">In Ingestion Pool</div>
          </div>
          <div className="bg-white/50 dark:bg-black/30 backdrop-blur-xl border border-white/40 dark:border-white/10 p-6 rounded-3xl shadow-xl shadow-stone-200/20 dark:shadow-black/20 text-center transition-transform hover:scale-[1.02]">
            <ArrowUp className="w-8 h-8 mx-auto text-blue-500 mb-3" />
            <div className="text-3xl font-black text-stone-950 dark:text-stone-50">
              {mounted ? Object.values(votes).reduce((a, b) => a + Math.max(0, b), 0).toLocaleString() : '...'}
            </div>
            <div className="text-[10px] font-bold text-stone-400 dark:text-stone-500 uppercase tracking-widest mt-2">Total Upvotes</div>
          </div>
          <div className="bg-white/50 dark:bg-black/30 backdrop-blur-xl border border-white/40 dark:border-white/10 p-6 rounded-3xl shadow-xl shadow-stone-200/20 dark:shadow-black/20 text-center transition-transform hover:scale-[1.02]">
            <Database className="w-8 h-8 mx-auto text-indigo-500 mb-3" />
            <div className="text-3xl font-black text-stone-950 dark:text-stone-50">~{shlokasInQueue.toLocaleString()}</div>
            <div className="text-[10px] font-bold text-stone-400 dark:text-stone-500 uppercase tracking-widest mt-2">Shlokas In Queue</div>
          </div>
        </div>

        {/* The 5-Stage Data Pipeline Visualizer */}
        <div className="mb-16">
          <h2 className="text-2xl font-serif font-black text-stone-900 dark:text-stone-100 mb-8 text-center">How We Process Data</h2>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-2">
            {[
              { label: 'Bronze', desc: 'Raw text ingestion', color: 'text-amber-700 bg-amber-100 dark:bg-amber-900/30 border-amber-200' },
              { label: 'Silver', desc: 'Regex structural parse', color: 'text-stone-600 bg-stone-200 dark:text-stone-300 dark:bg-stone-800 border-stone-300' },
              { label: 'Gold', desc: 'Vedic Schema compile', color: 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 border-yellow-200' },
              { label: 'MLG AI', desc: 'Agentic translation pass', color: 'text-orange-600 bg-orange-100 dark:bg-orange-900/30 border-orange-200' },
              { label: 'Live', desc: 'Zero placeholders', color: 'text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30 border-emerald-200' },
            ].map((stage, idx, arr) => (
              <React.Fragment key={stage.label}>
                <div className={`flex flex-col items-center justify-center p-4 rounded-2xl border ${stage.color} backdrop-blur-md w-full sm:w-1/5 text-center shadow-lg shadow-black/5`}>
                  <div className="text-xs font-black uppercase tracking-widest mb-1">{stage.label}</div>
                  <div className="text-[10px] opacity-80">{stage.desc}</div>
                </div>
                {idx < arr.length - 1 && (
                  <ArrowRight className="w-5 h-5 text-stone-300 dark:text-stone-700 hidden sm:block flex-shrink-0" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                  activeTab === key
                    ? 'bg-stone-900 text-white dark:bg-white dark:text-stone-900 shadow-md'
                    : 'bg-white/50 dark:bg-black/30 backdrop-blur-md border border-white/40 dark:border-white/10 text-stone-500 hover:text-stone-800 dark:text-stone-400 dark:hover:text-stone-200 hover:bg-white dark:hover:bg-stone-800'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          
          <input
            type="text"
            placeholder="Search books..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-64 px-4 py-2.5 rounded-xl bg-white/50 dark:bg-black/30 backdrop-blur-md border border-white/40 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-orange-500/50 text-sm placeholder:text-stone-400"
          />
        </div>

        {/* Main Content Area */}
        <div className="space-y-12">
          
          {/* Live & Complete Grid */}
          {liveBooks.length > 0 && (
            <div>
              <h2 className="text-2xl font-serif font-black text-stone-900 dark:text-stone-100 mb-6 flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                Live & Complete ({liveBooks.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {liveBooks.map((book: VedicText) => (
                  <div 
                    key={book.slug}
                    className="group relative flex flex-col justify-between bg-white/40 dark:bg-black/20 backdrop-blur-2xl border border-white/50 dark:border-white/10 rounded-3xl p-6 shadow-xl shadow-stone-200/30 dark:shadow-black/20 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="px-3 py-1 bg-white/50 dark:bg-white/5 backdrop-blur-md text-stone-600 dark:text-stone-300 text-[9px] font-black uppercase tracking-widest rounded-lg border border-stone-200/50 dark:border-white/10">
                          {CATEGORY_LABELS[book.category] || book.category}
                        </span>
                        <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200/50 dark:border-emerald-900/50 text-emerald-700 dark:text-emerald-400 text-[9px] font-black uppercase tracking-widest rounded-lg">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          Live
                        </span>
                      </div>
                      <h3 className="text-xl font-serif font-black text-stone-900 dark:text-stone-100 mb-2">
                        {book.name}
                      </h3>
                      {book.nameDevanagari && (
                        <div className="font-serif text-sm text-stone-500 dark:text-stone-400 mb-3 font-bold">
                          {book.nameDevanagari}
                        </div>
                      )}
                      <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed mb-6 font-serif line-clamp-3">
                        {book.description}
                      </p>
                    </div>

                    <Link
                      href={`/${book.slug}/1`}
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-stone-900 dark:bg-white hover:bg-stone-800 dark:hover:bg-stone-200 text-white dark:text-stone-900 font-black text-[10px] uppercase tracking-widest rounded-2xl shadow-md transition-all"
                    >
                      <Book className="w-4 h-4" />
                      Read Now
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Upcoming Items List */}
          {upcomingBooks.length > 0 && (
            <div>
              <h2 className="text-2xl font-serif font-black text-stone-900 dark:text-stone-100 mb-6 flex items-center gap-2">
                <Clock className="w-6 h-6 text-orange-500" />
                Upcoming Scriptures In Queue ({upcomingBooks.length})
              </h2>
              
              <div className="bg-white/40 dark:bg-black/20 backdrop-blur-2xl border border-white/50 dark:border-white/10 rounded-3xl overflow-hidden shadow-xl shadow-stone-200/30 dark:shadow-black/20">
                <div className="divide-y divide-stone-200/50 dark:divide-stone-800/50">
                  {upcomingBooks.map((book: VedicText) => {
                    const completeness = COMPLETENESS_SCORES[book.slug] ?? 0
                    const currentVotes = votes[book.slug] ?? 0
                    const userVoteStatus = userVotes[book.slug] || null

                    return (
                      <div key={book.slug} className="p-4 sm:p-6 hover:bg-white/50 dark:hover:bg-white/5 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="text-lg font-serif font-black text-stone-900 dark:text-stone-100">
                              {book.name}
                            </h3>
                            <span className="px-2.5 py-0.5 bg-white/50 dark:bg-white/5 backdrop-blur-md text-stone-500 dark:text-stone-400 text-[9px] font-black uppercase tracking-widest rounded-md border border-stone-200/50 dark:border-white/10">
                              {CATEGORY_LABELS[book.category] || book.category}
                            </span>
                          </div>
                          <p className="text-stone-500 dark:text-stone-400 text-sm font-serif line-clamp-1">
                            {book.description || 'Sacred text awaiting pipeline integration.'}
                          </p>
                        </div>

                        <div className="flex items-center gap-6">
                          {/* Progress bar (compact) */}
                          <div className="w-32 hidden md:block">
                            <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-1.5">
                              <span>Pipeline</span>
                              <span className="text-orange-500">{completeness}%</span>
                            </div>
                            <div className="w-full h-1.5 bg-stone-200/50 dark:bg-stone-800 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-orange-500 to-amber-400 rounded-full transition-all duration-1000"
                                style={{ width: `${Math.max(2, completeness)}%` }}
                              />
                            </div>
                          </div>

                          {/* Voting mechanism */}
                          <div className="flex items-center gap-4 bg-white/50 dark:bg-black/30 backdrop-blur-md p-1.5 pl-4 rounded-2xl border border-white/50 dark:border-white/10 shadow-sm">
                            <div className="text-center min-w-[3rem]">
                              <div className={`text-base font-serif font-black ${currentVotes >= 500 ? 'text-orange-500' : 'text-stone-700 dark:text-stone-300'}`}>
                                {mounted ? currentVotes.toLocaleString() : '...'}
                              </div>
                              <div className="text-[8px] font-black uppercase tracking-widest text-stone-400 mt-0.5">Votes</div>
                            </div>
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => handleVote(book.slug, 'up')}
                                className={`flex items-center justify-center w-8 h-8 rounded-xl font-bold transition-all ${
                                  userVoteStatus === 'up'
                                    ? 'bg-orange-500 text-white shadow-sm'
                                    : 'hover:bg-stone-200 dark:hover:bg-stone-800 text-stone-400 hover:text-stone-600 dark:hover:text-stone-300'
                                }`}
                                title="Upvote"
                              >
                                <ArrowUp className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleVote(book.slug, 'down')}
                                className={`flex items-center justify-center w-8 h-8 rounded-xl font-bold transition-all ${
                                  userVoteStatus === 'down'
                                    ? 'bg-stone-500 text-white shadow-sm'
                                    : 'hover:bg-stone-200 dark:hover:bg-stone-800 text-stone-400 hover:text-stone-600 dark:hover:text-stone-300'
                                }`}
                                title="Downvote"
                              >
                                <ArrowDown className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>

                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Empty State */}
          {liveBooks.length === 0 && upcomingBooks.length === 0 && (
            <div className="text-center py-20 bg-white/40 dark:bg-black/20 backdrop-blur-xl border border-white/50 dark:border-white/10 rounded-3xl">
              <AlertCircle className="w-12 h-12 text-stone-400 dark:text-stone-600 mx-auto mb-4" />
              <h3 className="text-lg font-black text-stone-800 dark:text-stone-200 mb-2">No scriptures match your filter</h3>
              <p className="text-stone-500 dark:text-stone-400 text-sm">Try modifying your search or category selection.</p>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}




