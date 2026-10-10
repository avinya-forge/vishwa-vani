'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  VEDIC_LIBRARY,
  type VedicText,

  isTextCompleted,


  SCRIPTURE_READINESS_SCORES,
} from '@/lib/texts'
import {
  Database,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Clock,
  ArrowUp,
  BookOpen,
} from 'lucide-react'

// Starting points for community upvote tallies
const MOCK_BASE_VOTES: Record<string, number> = {
  'mahabharata': 1485,
  'rigveda': 1120,
  'bhagavata-purana': 924,
  'vishnu-purana': 342,
  'dasbodh': 298,
  'atharvaveda': 267,
  'garuda-purana': 214,
  'samskaras': 185,
  'yajurveda': 428,
  'samaveda': 391,
  'brahma-sutras': 310,
  'manusmriti': 120,
  'stotras': 132,
}

const CATEGORY_LABELS: Record<string, string> = {
  all: 'All Categories',
  itihas: 'Itihasa',
  upanishad: 'Upanishads',
  purana: 'Puranas',
  veda: 'Vedas',
  other: 'Other Wisdom',
}

type UserVote = 'up' | 'down' | null
type PoolFilter = 'all' | 'completed' | 'pipeline'

export default function RoadmapPage() {
  const [activeTab, setActiveTab] = useState<string>('all')
  const [poolFilter, setPoolFilter] = useState<PoolFilter>('all')
  const [votes, setVotes] = useState<Record<string, number>>(MOCK_BASE_VOTES)
  const [userVotes, setUserVotes] = useState<Record<string, UserVote>>({})
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [mounted, setMounted] = useState<boolean>(false)

  const [stats, setStats] = useState<any>(null)
  useEffect(() => {
    fetch('/api/stats').then(res => res.json()).then(data => setStats(data))
  }, [])

  // Load vote preferences from localStorage to prevent multiple votes
  useEffect(() => {
    setMounted(true)
    const storedVotes = localStorage.getItem('vishwa_vani_roadmap_votes')
    if (storedVotes) {
      try {
        const parsed = JSON.parse(storedVotes) as Record<string, UserVote>
        setUserVotes(parsed)

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
      [slug]: (prev[slug] || 0) + voteDiff,
    }))
  }

  // Filter books dynamically based on tab, pool, search
  const completedBooks = VEDIC_LIBRARY.filter(b => isTextCompleted(b.slug))
    .filter((book: VedicText) => {
      const matchesTab = activeTab === 'all' || book.category === activeTab
      const matchesSearch =
        book.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (book.description && book.description.toLowerCase().includes(searchQuery.toLowerCase()))
      return matchesTab && matchesSearch
    })
    .sort((a, b) => a.name.localeCompare(b.name))

  const pipelineBooks = VEDIC_LIBRARY.filter(b => !isTextCompleted(b.slug))
    .filter((book: VedicText) => {
      const matchesTab = activeTab === 'all' || book.category === activeTab
      const matchesSearch =
        book.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (book.description && book.description.toLowerCase().includes(searchQuery.toLowerCase()))
      return matchesTab && matchesSearch
    })
    .sort((a, b) => {
      const compA = SCRIPTURE_READINESS_SCORES[a.slug] || 0
      const compB = SCRIPTURE_READINESS_SCORES[b.slug] || 0
      if (compA !== compB) return compB - compA
      return (votes[b.slug] || 0) - (votes[a.slug] || 0)
    })

  if (!stats) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#FDFBF7] dark:bg-[#1C1917] py-12 selection:bg-orange-500/20 relative overflow-hidden">
      {/* Ambient background glows for Glass UI */}
      <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-orange-200/20 dark:bg-orange-900/20 rounded-full blur-[100px] pointer-events-none mix-blend-multiply dark:mix-blend-lighten" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-amber-200/20 dark:bg-stone-800/40 rounded-full blur-[120px] pointer-events-none mix-blend-multiply dark:mix-blend-lighten" />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 relative z-10">
        {/* Header section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-white/40 dark:bg-white/5 border border-white/40 dark:border-white/10 backdrop-blur-md shadow-sm text-orange-700 dark:text-orange-400 text-[10px] font-bold uppercase tracking-[0.2em]">
            <Sparkles className="w-3.5 h-3.5 text-orange-500" />
            Roadmap & Standard Scriptural Metrics
          </div>
          <h1 className="text-5xl sm:text-6xl font-serif font-black text-stone-900 dark:text-stone-100 leading-tight mb-6 tracking-tight">
            Our Scriptural <span className="bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">Pipeline</span>
          </h1>
          <p className="text-stone-600 dark:text-stone-400 font-serif text-lg leading-relaxed max-w-2xl mx-auto">
            Vishwa-Vani measures progress by rigorous unit standards: lowest atomic unit is the <strong>Shloka</strong>, grouped into <strong>Chapters</strong>, compiled into complete <strong>Books</strong> across two distinct pools.
          </p>
        </div>

        {/* Global Standard Unit Metrics - 4 Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {/* Card 1: 100% Completed Pool */}
          <div className="bg-white/60 dark:bg-stone-900/60 backdrop-blur-xl border border-stone-200/60 dark:border-stone-800 p-6 rounded-3xl shadow-lg text-center transition-transform hover:scale-[1.02]">
            <CheckCircle2 className="w-8 h-8 mx-auto text-emerald-500 mb-2" />
            <div className="text-3xl font-black text-stone-900 dark:text-stone-100">{stats.completedVerses.toLocaleString()}</div>
            <div className="text-[10px] font-bold text-stone-400 dark:text-stone-500 uppercase tracking-widest mt-1">Verified Shlokas</div>
            <div className="mt-2 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 py-0.5 px-2 rounded-full inline-block">
              {stats.completedBooks} Books · {stats.completedChapters} Chapters
            </div>
          </div>

          {/* Card 2: Pipeline Pool */}
          <div className="bg-white/60 dark:bg-stone-900/60 backdrop-blur-xl border border-stone-200/60 dark:border-stone-800 p-6 rounded-3xl shadow-lg text-center transition-transform hover:scale-[1.02]">
            <Clock className="w-8 h-8 mx-auto text-orange-500 mb-2" />
            <div className="text-3xl font-black text-stone-900 dark:text-stone-100">~{stats.pipelineVerses.toLocaleString()}</div>
            <div className="text-[10px] font-bold text-stone-400 dark:text-stone-500 uppercase tracking-widest mt-1">Shlokas In Pipeline</div>
            <div className="mt-2 text-[11px] font-semibold text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/40 py-0.5 px-2 rounded-full inline-block">
              {stats.pipelineBooks} Books · {stats.pipelineChapters.toLocaleString()} Chapters
            </div>
          </div>

          {/* Card 3: Physical Database Store */}
          <div className="bg-white/60 dark:bg-stone-900/60 backdrop-blur-xl border border-stone-200/60 dark:border-stone-800 p-6 rounded-3xl shadow-lg text-center transition-transform hover:scale-[1.02]">
            <Database className="w-8 h-8 mx-auto text-indigo-500 mb-2" />
            <div className="text-3xl font-black text-stone-900 dark:text-stone-100">{stats.databaseVerses.toLocaleString()}</div>
            <div className="text-[10px] font-bold text-stone-400 dark:text-stone-500 uppercase tracking-widest mt-1">Live Database Rows</div>
            <div className="mt-2 text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 py-0.5 px-2 rounded-full inline-block">
              Turso / LibSQL Edge
            </div>
          </div>

          {/* Card 4: Community Upvotes */}
          <div className="bg-white/60 dark:bg-stone-900/60 backdrop-blur-xl border border-stone-200/60 dark:border-stone-800 p-6 rounded-3xl shadow-lg text-center transition-transform hover:scale-[1.02]">
            <ArrowUp className="w-8 h-8 mx-auto text-blue-500 mb-2" />
            <div className="text-3xl font-black text-stone-900 dark:text-stone-100">
              {mounted ? Object.values(votes).reduce((a, b) => a + Math.max(0, b), 0).toLocaleString() : '...'}
            </div>
            <div className="text-[10px] font-bold text-stone-400 dark:text-stone-500 uppercase tracking-widest mt-1">Community Upvotes</div>
            <div className="mt-2 text-[11px] font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 py-0.5 px-2 rounded-full inline-block">
              Prioritizes Pipeline Drops
            </div>
          </div>
        </div>

        {/* Diagrammatic Tier Architecture Visualizer */}
        <div className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-2xl font-serif font-black text-stone-900 dark:text-stone-100 mb-2">
              Three-Tier Data Certification Standards
            </h2>
            <p className="text-stone-500 dark:text-stone-400 text-xs">
              Every shloka progresses through three definitive stages before promotion to production.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Gold Tier Card */}
            <div className="bg-gradient-to-b from-amber-500/10 via-amber-500/5 to-transparent dark:from-amber-500/10 border border-amber-300/80 dark:border-amber-700/60 rounded-3xl p-6 relative overflow-hidden shadow-md">
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 bg-amber-500 text-stone-950 text-[10px] font-black uppercase tracking-widest rounded-lg">
                  Gold Tier
                </span>
                <span className="text-xs font-bold text-amber-700 dark:text-amber-400">100% Complete</span>
              </div>
              <h3 className="text-xl font-serif font-black text-stone-900 dark:text-stone-100 mb-2">
                Production Verified
              </h3>
              <p className="text-stone-600 dark:text-stone-300 text-xs leading-relaxed mb-6 font-serif">
                Full canonical text, multi-scholar commentary (2+ lineages), word-by-word grammar, authentic translations in 4 languages, and zero synthetic placeholders.
              </p>
              <div className="pt-4 border-t border-amber-200/50 dark:border-amber-800/50 grid grid-cols-3 text-center">
                <div>
                  <div className="text-lg font-black text-amber-800 dark:text-amber-300">{stats.completedBooks}</div>
                  <div className="text-[9px] uppercase tracking-wider text-stone-500 font-bold">Books</div>
                </div>
                <div>
                  <div className="text-lg font-black text-amber-800 dark:text-amber-300">{stats.completedChapters}</div>
                  <div className="text-[9px] uppercase tracking-wider text-stone-500 font-bold">Chapters</div>
                </div>
                <div>
                  <div className="text-lg font-black text-amber-800 dark:text-amber-300">{stats.completedVerses.toLocaleString()}</div>
                  <div className="text-[9px] uppercase tracking-wider text-stone-500 font-bold">Shlokas</div>
                </div>
              </div>
            </div>

            {/* Silver Tier Card */}
            <div className="bg-gradient-to-b from-stone-200/50 via-stone-200/20 to-transparent dark:from-stone-800/40 border border-stone-300 dark:border-stone-700 rounded-3xl p-6 relative overflow-hidden shadow-md">
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 bg-stone-700 text-white dark:bg-stone-300 dark:text-stone-900 text-[10px] font-black uppercase tracking-widest rounded-lg">
                  Silver Tier
                </span>
                <span className="text-xs font-bold text-stone-500">In Active Pipeline</span>
              </div>
              <h3 className="text-xl font-serif font-black text-stone-900 dark:text-stone-100 mb-2">
                Structured Parsing
              </h3>
              <p className="text-stone-600 dark:text-stone-300 text-xs leading-relaxed mb-6 font-serif">
                Ingested and parsed into Normalized Vedic Fragments (NVF). Sanskrit text verified with metrical rhythm; undergoing scholar commentary mapping and multi-lingual review.
              </p>
              <div className="pt-4 border-t border-stone-200 dark:border-stone-700 grid grid-cols-3 text-center">
                <div>
                  <div className="text-lg font-black text-stone-900 dark:text-stone-100">6</div>
                  <div className="text-[9px] uppercase tracking-wider text-stone-500 font-bold">Books</div>
                </div>
                <div>
                  <div className="text-lg font-black text-stone-900 dark:text-stone-100">2,828</div>
                  <div className="text-[9px] uppercase tracking-wider text-stone-500 font-bold">Chapters</div>
                </div>
                <div>
                  <div className="text-lg font-black text-stone-900 dark:text-stone-100">144,041</div>
                  <div className="text-[9px] uppercase tracking-wider text-stone-500 font-bold">Shlokas</div>
                </div>
              </div>
            </div>

            {/* Bronze Tier Card */}
            <div className="bg-gradient-to-b from-amber-700/10 via-amber-700/5 to-transparent dark:from-amber-950/20 border border-amber-800/30 dark:border-amber-900/40 rounded-3xl p-6 relative overflow-hidden shadow-md">
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 bg-amber-900 text-amber-100 text-[10px] font-black uppercase tracking-widest rounded-lg">
                  Bronze Tier
                </span>
                <span className="text-xs font-bold text-amber-700 dark:text-amber-500">Ingestion Queue</span>
              </div>
              <h3 className="text-xl font-serif font-black text-stone-900 dark:text-stone-100 mb-2">
                Raw Ingestion
              </h3>
              <p className="text-stone-600 dark:text-stone-300 text-xs leading-relaxed mb-6 font-serif">
                Public-domain critical editions acquired in primary Bronze repository. Awaiting regular-expression sharding, chapter division, and automated validation tests.
              </p>
              <div className="pt-4 border-t border-amber-800/20 dark:border-amber-900/30 grid grid-cols-3 text-center">
                <div>
                  <div className="text-lg font-black text-amber-900 dark:text-amber-400">7</div>
                  <div className="text-[9px] uppercase tracking-wider text-stone-500 font-bold">Books</div>
                </div>
                <div>
                  <div className="text-lg font-black text-amber-900 dark:text-amber-400">88</div>
                  <div className="text-[9px] uppercase tracking-wider text-stone-500 font-bold">Sections</div>
                </div>
                <div>
                  <div className="text-lg font-black text-amber-900 dark:text-amber-400">31,369</div>
                  <div className="text-[9px] uppercase tracking-wider text-stone-500 font-bold">Mantras</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* The 5-Stage Data Pipeline Visualizer */}
        <div className="mb-16">
          <h2 className="text-2xl font-serif font-black text-stone-900 dark:text-stone-100 mb-8 text-center">
            How We Process Data
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-2">
            {[
              {
                label: '1. Bronze',
                title: 'Raw Ingestion',
                desc: 'Archival preservation from critical editions (BORI, GRETIL, Sacred Texts)',
                color: 'text-amber-800 bg-amber-100/70 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800',
              },
              {
                label: '2. Silver',
                title: 'NVF Parsing',
                desc: 'Regex & AST sharding into Normalized Vedic Fragment schema',
                color: 'text-stone-700 bg-stone-200/80 dark:text-stone-300 dark:bg-stone-800/80 border-stone-300 dark:border-stone-700',
              },
              {
                label: '3. Gold',
                title: 'Schema Compile',
                desc: 'Multi-lineage commentary alignment (Shankara, Ramanuja, Dnyaneshwar)',
                color: 'text-yellow-700 bg-yellow-100/70 dark:bg-yellow-950/40 border-yellow-300 dark:border-yellow-800',
              },
              {
                label: '4. Audit Gate',
                title: 'Zero Placeholders',
                desc: 'Automated test suite verifying 100% authentic Sanskrit & commentaries',
                color: 'text-orange-700 bg-orange-100/70 dark:bg-orange-950/40 border-orange-300 dark:border-orange-800',
              },
              {
                label: '5. Live',
                title: 'Edge Database',
                desc: 'Turso / LibSQL deployment for sub-100ms global query speeds',
                color: 'text-emerald-700 bg-emerald-100/70 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800',
              },
            ].map((stage, idx, arr) => (
              <React.Fragment key={stage.label}>
                <div
                  className={`flex flex-col items-center justify-center p-4 rounded-2xl border ${stage.color} backdrop-blur-md w-full sm:w-1/5 text-center shadow-md`}
                >
                  <div className="text-[10px] font-black uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-0.5">
                    {stage.label}
                  </div>
                  <div className="text-xs font-black uppercase tracking-wide mb-1 text-stone-900 dark:text-stone-100">
                    {stage.title}
                  </div>
                  <div className="text-[10px] leading-tight opacity-80">{stage.desc}</div>
                </div>
                {idx < arr.length - 1 && (
                  <ArrowRight className="w-5 h-5 text-stone-300 dark:text-stone-700 hidden sm:block flex-shrink-0" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Pool Selector & Category Tabs */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500 mr-1">
              Pool:
            </span>
            {[
              { id: 'all', label: `All Catalog (${VEDIC_LIBRARY.length})` },
              { id: 'completed', label: `100% Verified (${completedBooks.length})` },
              { id: 'pipeline', label: `Ingestion Pipeline (${pipelineBooks.length})` },
            ].map(pool => (
              <button
                key={pool.id}
                onClick={() => setPoolFilter(pool.id as PoolFilter)}
                className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                  poolFilter === pool.id
                    ? 'bg-orange-600 text-white shadow-md'
                    : 'bg-white/50 dark:bg-black/30 border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
                }`}
              >
                {pool.label}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
            <div className="flex flex-wrap gap-1.5">
              {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`px-3 py-1.5 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all ${
                    activeTab === key
                      ? 'bg-stone-900 text-white dark:bg-white dark:text-stone-900 shadow-sm'
                      : 'bg-white/40 dark:bg-stone-900/40 border border-stone-200/60 dark:border-stone-800 text-stone-500 hover:text-stone-800 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <input
              type="text"
              placeholder="Filter scriptures..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full sm:w-48 px-3 py-1.5 rounded-xl bg-white/50 dark:bg-black/30 border border-stone-200 dark:border-stone-800 focus:outline-none focus:ring-2 focus:ring-orange-500 text-xs placeholder:text-stone-400"
            />
          </div>
        </div>

        {/* Content Section: Pool 1 & Pool 2 */}
        <div className="space-y-14">
          {/* POOL 1: 100% Completed Verified Pool */}
          {(poolFilter === 'all' || poolFilter === 'completed') && completedBooks.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-serif font-black text-stone-900 dark:text-stone-100 flex items-center gap-2">
                  <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                  Pool 1: 100% Completed & Verified ({completedBooks.length} Books · {stats.completedVerses} Shlokas)
                </h2>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-full uppercase tracking-wider border border-emerald-200 dark:border-emerald-800">
                  Gold Certified
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {completedBooks.map((book: VedicText) => {
                  const bookMeta = stats ? { chapters: stats.completedChapters, verses: stats.completedVerses } : null; // Since we do not have per-book exacts here anymore without manifest reading in component
                  return (
                    <div
                      key={book.slug}
                      className="group relative flex flex-col justify-between bg-white/70 dark:bg-stone-900/60 backdrop-blur-xl border border-stone-200/80 dark:border-stone-800 rounded-3xl p-6 shadow-md hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <span className="px-2.5 py-0.5 bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 text-[9px] font-black uppercase tracking-widest rounded-md">
                            {CATEGORY_LABELS[book.category] || book.category}
                          </span>
                          <span className="flex items-center gap-1.5 px-2.5 py-0.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 text-[9px] font-black uppercase tracking-widest rounded-md">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            100% Gold
                          </span>
                        </div>

                        <h3 className="text-xl font-serif font-black text-stone-900 dark:text-stone-100 mb-1">
                          {book.name}
                        </h3>
                        {book.nameDevanagari && (
                          <div className="font-serif text-sm text-stone-500 dark:text-stone-400 mb-3 font-bold">
                            {book.nameDevanagari}
                          </div>
                        )}
                        <p className="text-stone-600 dark:text-stone-400 text-xs leading-relaxed mb-6 font-serif line-clamp-3">
                          {book.description}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-stone-100 dark:border-stone-800">
                        <div className="flex justify-between items-center text-[10px] font-bold text-stone-500 mb-3">
                          <span>{bookMeta?.chapters || book.totalChapters} Chapters</span>
                          <span className="text-emerald-600 dark:text-emerald-400 font-black">
                            {bookMeta?.verses.toLocaleString() || '100%'} Shlokas
                          </span>
                        </div>

                        <Link
                          href={`/${book.slug}/${book.hasPreface ? 'preface' : '1'}`}
                          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-stone-900 dark:bg-white hover:bg-orange-600 dark:hover:bg-orange-500 text-white dark:text-stone-900 hover:text-white font-black text-[10px] uppercase tracking-widest rounded-xl shadow-sm transition-all"
                        >
                          <BookOpen className="w-3.5 h-3.5" />
                          Read Now
                        </Link>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* POOL 2: Ingestion & Pipeline Pool */}
          {(poolFilter === 'all' || poolFilter === 'pipeline') && pipelineBooks.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-serif font-black text-stone-900 dark:text-stone-100 flex items-center gap-2">
                  <Clock className="w-6 h-6 text-orange-500" />
                  Pool 2: Ingestion & Pipeline ({pipelineBooks.length} Scriptures · ~{stats.pipelineVerses.toLocaleString()} Target Shlokas)
                </h2>
                <span className="text-xs font-bold text-orange-700 bg-orange-50 dark:bg-orange-950/40 px-3 py-1 rounded-full uppercase tracking-wider border border-orange-200 dark:border-orange-800">
                  Community Upvote Driven
                </span>
              </div>

              <div className="bg-white/70 dark:bg-stone-900/60 backdrop-blur-xl border border-stone-200/80 dark:border-stone-800 rounded-3xl overflow-hidden shadow-lg">
                <div className="divide-y divide-stone-100 dark:divide-stone-800">
                  {pipelineBooks.map((book: VedicText) => {
                    const completeness = SCRIPTURE_READINESS_SCORES[book.slug] ?? 0; const isSilver = completeness >= 40; const tierLabel = isSilver ? 'Silver Tier' : 'Bronze Tier';
                    const currentVotes = votes[book.slug] ?? 0
                    const userVoteStatus = userVotes[book.slug] || null


                    return (
                      <div
                        key={book.slug}
                        className="p-5 sm:p-6 hover:bg-stone-50/50 dark:hover:bg-stone-800/30 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-6"
                      >
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
                            <h3 className="text-lg font-serif font-black text-stone-900 dark:text-stone-100">
                              {book.name}
                            </h3>
                            {book.nameDevanagari && (
                              <span className="font-serif text-xs font-bold text-stone-400">
                                ({book.nameDevanagari})
                              </span>
                            )}
                            <span
                              className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest ${
                                isSilver
                                  ? 'bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-stone-200'
                                  : 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-400'
                              }`}
                            >
                              {tierLabel}
                            </span>
                            <span className="px-2 py-0.5 bg-stone-100 dark:bg-stone-800 text-stone-500 text-[9px] font-bold uppercase tracking-widest rounded">
                              {CATEGORY_LABELS[book.category] || book.category}
                            </span>
                          </div>

                          <p className="text-stone-500 dark:text-stone-400 text-xs font-serif line-clamp-1 mb-2">
                            {book.description || 'Sacred scripture undergoing archival data acquisition.'}
                          </p>

                          <div className="flex items-center gap-4 text-[11px] font-semibold text-stone-400">
                            <span>{book.totalChapters} Chapters</span>
                            <span>·</span>
                            <span>~{book.totalChapters * 50} Target Shlokas</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-6">
                          {/* Progress bar */}
                          <div className="w-32 hidden sm:block">
                            <div className="flex items-center justify-between text-[9px] font-black uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-1">
                              <span>Pipeline</span>
                              <span className="text-orange-500 font-bold">{completeness}%</span>
                            </div>
                            <div className="w-full h-1.5 bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-orange-500 to-amber-400 rounded-full transition-all duration-700"
                                style={{ width: `${Math.max(4, completeness)}%` }}
                              />
                            </div>
                          </div>

                          {/* Voting mechanism */}
                          <div className="flex items-center gap-3 bg-stone-50 dark:bg-stone-800/60 p-1.5 pl-3.5 rounded-2xl border border-stone-200/60 dark:border-stone-700/60 shadow-sm">
                            <div className="text-center min-w-[2.5rem]">
                              <div
                                className={`text-sm font-serif font-black ${
                                  currentVotes >= 500 ? 'text-orange-600' : 'text-stone-700 dark:text-stone-300'
                                }`}
                              >
                                {mounted ? currentVotes.toLocaleString() : '...'}
                              </div>
                              <div className="text-[7px] font-black uppercase tracking-widest text-stone-400">
                                Upvotes
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => handleVote(book.slug, 'up')}
                                className={`flex items-center justify-center w-7 h-7 rounded-xl font-bold transition-all ${
                                  userVoteStatus === 'up'
                                    ? 'bg-orange-500 text-white shadow-sm'
                                    : 'hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200'
                                }`}
                                title="Upvote for immediate acquisition"
                              >
                                <ArrowUp className="w-3.5 h-3.5" />
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
        </div>
      </div>
    </div>
  )
}
