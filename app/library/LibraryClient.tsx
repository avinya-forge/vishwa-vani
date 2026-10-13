'use client'

import React, { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { 
  BookOpen, 
  Search, 
  Sparkles, 
  Filter, 
  ArrowRight, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  Layers, 
  Clock, 
  BookMarked,
  ScrollText
} from 'lucide-react'
import { VEDIC_LIBRARY, isTextCompleted, BOOK_EFFORT_ESTIMATES, PIPELINE_BOOK_STATS } from '@/lib/texts'
import type { getVedicHierarchy } from '@/lib/texts'
import { AnimatedStat } from '@/components/ui/animated-stat'

interface LibraryClientProps {
  stats: {
    totalBooks: number
    completedBooks: number
    pipelineBooks: number
    completedVerses: number
    databaseVerses: number
    categories: string[]
  }
  hierarchy?: ReturnType<typeof getVedicHierarchy>
}

const CATEGORY_MAP: Record<string, { label: string; icon: string; subtitle: string }> = {
  all: { label: 'All Scriptures', icon: '📜', subtitle: 'The complete Vedic canon' },
  itihas: { label: 'Itihāsa & Gītā', icon: '🏹', subtitle: 'Epic Histories & Battlefield Dialogue' },
  upanishad: { label: 'Principal Upaniṣads', icon: '✨', subtitle: 'Supreme Non-Dual Vedānta Wisdom' },
  purana: { label: 'Purāṇas', icon: '📜', subtitle: 'Cosmic Chronicles & Sacred Lore' },
  veda: { label: 'Veda Saṁhitās', icon: '🕉️', subtitle: 'The Four Foundational Mantra Collections' },
  other: { label: 'Darśana & Heritage', icon: '🌿', subtitle: 'Sūtras, Yoga, Rituals & Devotional Classics' },
}

export default function LibraryClient({ stats, hierarchy: _hierarchy }: LibraryClientProps) {
  const totalCatalogCount = stats?.totalBooks || VEDIC_LIBRARY.length
  const goldCount = stats?.completedBooks || VEDIC_LIBRARY.filter(b => isTextCompleted(b.slug)).length
  const pipelineCount = totalCatalogCount - goldCount

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [tierFilter, setTierFilter] = useState<'all' | 'gold' | 'pipeline'>('all')
  const [expandedChapterSlug, setExpandedChapterSlug] = useState<string | null>(null)
  const [continueReading, setContinueReading] = useState<{ text: string; chapter: number; verse?: number; bookName: string } | null>(null)

  // Load user reading progress from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('vishwa_continue_reading')
      if (saved) {
        const parsed = JSON.parse(saved)
        if (parsed.text && parsed.chapter) {
          const bookMeta = VEDIC_LIBRARY.find(b => b.slug === parsed.text)
          if (bookMeta) {
            setContinueReading({
              text: parsed.text,
              chapter: parsed.chapter,
              verse: parsed.verse,
              bookName: bookMeta.name
            })
          }
        }
      }
    } catch {
      // Ignore invalid localStorage data
    }
  }, [])

  // Filter books based on search, category, and tier
  const filteredBooks = useMemo(() => {
    return VEDIC_LIBRARY.filter(book => {
      // Category filter
      if (selectedCategory !== 'all' && book.category !== selectedCategory) {
        return false
      }

      const isCompleted = isTextCompleted(book.slug)
      // Tier filter
      if (tierFilter === 'gold' && !isCompleted) return false
      if (tierFilter === 'pipeline' && isCompleted) return false

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim()
        const matchName = book.name.toLowerCase().includes(query)
        const matchDev = book.nameDevanagari?.toLowerCase().includes(query) || false
        const matchDesc = book.description.toLowerCase().includes(query)
        const matchCat = book.category.toLowerCase().includes(query)
        const effort = BOOK_EFFORT_ESTIMATES[book.slug]
        const matchScholar = effort?.scholars.some(s => s.toLowerCase().includes(query)) || false

        if (!matchName && !matchDev && !matchDesc && !matchCat && !matchScholar) {
          return false
        }
      }

      return true
    })
  }, [searchQuery, selectedCategory, tierFilter])

  return (
    <div className="min-h-screen bg-[#FDFBF7] selection:bg-orange-500/20 text-stone-900 pb-28">
      {/* 🌌 AMBIENT GLOWS & SACRED SANSKRIT WATERMARK */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] sm:w-[800px] sm:h-[800px] bg-gradient-to-bl from-amber-200/40 via-orange-100/30 to-transparent rounded-full blur-[140px] -mr-48 -mt-48 pointer-events-none" />
      <div className="absolute top-[35%] left-0 w-[450px] h-[450px] sm:w-[650px] sm:h-[650px] bg-gradient-to-tr from-orange-200/25 via-amber-100/20 to-transparent rounded-full blur-[120px] -ml-48 pointer-events-none" />

      {/* Floating Sacred Devanagari Background Mantra Watermark */}
      <div className="absolute top-16 inset-x-0 flex justify-center pointer-events-none opacity-[0.03] select-none overflow-hidden -z-0">
        <span className="font-serif text-[120px] sm:text-[180px] md:text-[220px] font-black tracking-widest text-stone-900 whitespace-nowrap">
          विद्यां चाविद्यां च यस्तद्वेदोभयं सह
        </span>
      </div>

      <div className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-16">
        
        {/* ━━━━━ HERO HEADER ━━━━━ */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-white/90 border border-amber-200/90 shadow-sm text-orange-800 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.25em] backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            <span>Universal Sacred Sanctuary · सम्पूर्ण वैदिक ग्रन्थागार</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-black text-stone-900 tracking-tight leading-[1.12] mb-4">
            The Living Library of{' '}
            <span className="bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 bg-clip-text text-transparent">
              Vedic Scriptures
            </span>
          </h1>

          <p className="text-stone-600 text-sm sm:text-base leading-relaxed font-serif max-w-2xl mx-auto italic">
            Preserving 17 canonical scriptures across Sanskrit, English, Hindi, and Marathi. 
            Choose any sacred book below to begin your journey or jump directly to any chapter.
          </p>
        </div>

        {/* ━━━━━ CONTINUE READING BANNER (IF ACTIVE) ━━━━━ */}
        {continueReading && (
          <div className="max-w-4xl mx-auto mb-10">
            <div className="bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-yellow-500/10 border border-orange-200/80 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 backdrop-blur-sm shadow-sm">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-orange-600 text-white flex items-center justify-center text-xl shadow-md">
                  📖
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-orange-700">
                    Welcome Back · Active Reading Session
                  </div>
                  <h3 className="text-base sm:text-lg font-serif font-black text-stone-900">
                    {continueReading.bookName} · Chapter {continueReading.chapter}
                    {continueReading.verse ? `, Shloka ${continueReading.verse}` : ''}
                  </h3>
                </div>
              </div>

              <Link
                href={`/${continueReading.text}/${continueReading.chapter}${continueReading.verse ? `#verse-${continueReading.verse}` : ''}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-stone-900 hover:bg-orange-600 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md group"
              >
                <span>Resume Reading</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        )}

        {/* ━━━━━ STATS OVERVIEW CARDS ━━━━━ */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto mb-12">
          <div className="bg-white/80 backdrop-blur-md border border-amber-200/60 rounded-2xl p-4 text-center shadow-sm">
            <div className="text-xl mb-1">📜</div>
            <div className="text-2xl font-serif font-black text-stone-900">
              <AnimatedStat targetCount={stats.totalBooks} />
            </div>
            <div className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">
              Sacred Scriptures
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-md border border-amber-200/60 rounded-2xl p-4 text-center shadow-sm">
            <div className="text-xl mb-1">✨</div>
            <div className="text-2xl font-serif font-black text-orange-600">
              <AnimatedStat targetCount={stats.completedVerses} />
            </div>
            <div className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">
              Gold Shlokas Live
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-md border border-amber-200/60 rounded-2xl p-4 text-center shadow-sm">
            <div className="text-xl mb-1">🏛️</div>
            <div className="text-2xl font-serif font-black text-stone-900">
              <AnimatedStat targetCount={stats.databaseVerses} />
            </div>
            <div className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">
              Shlokas &amp; Verses
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-md border border-amber-200/60 rounded-2xl p-4 text-center shadow-sm">
            <div className="text-xl mb-1">🌐</div>
            <div className="text-2xl font-serif font-black text-stone-900">4</div>
            <div className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">
              Classical Languages
            </div>
          </div>
        </div>

        {/* ━━━━━ SEARCH & FILTER CONTROLS ━━━━━ */}
        <div className="bg-white/90 backdrop-blur-md border border-stone-200/80 rounded-3xl p-5 sm:p-6 mb-10 shadow-sm">
          <div className="flex flex-col lg:flex-row items-center gap-4 justify-between">
            {/* Search input */}
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search scripture, Devanagari, scholar, or keyword..."
                className="w-full pl-11 pr-4 py-3 bg-stone-50 border border-stone-200/80 rounded-2xl text-xs font-serif text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 text-xs font-bold"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Tier Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 w-full lg:w-auto">
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 mr-1 flex items-center gap-1">
                <Filter className="w-3 h-3" /> Status:
              </span>
              <button
                onClick={() => setTierFilter('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  tierFilter === 'all'
                    ? 'bg-stone-900 text-white shadow-sm'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                All ({totalCatalogCount})
              </button>
              <button
                onClick={() => setTierFilter('gold')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  tierFilter === 'gold'
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100'
                }`}
              >
                <Sparkles className="w-3 h-3" />
                <span>100% Gold Editions ({goldCount})</span>
              </button>
              <button
                onClick={() => setTierFilter('pipeline')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  tierFilter === 'pipeline'
                    ? 'bg-stone-700 text-white shadow-sm'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                <Layers className="w-3 h-3" />
                <span>In Ingestion ({pipelineCount})</span>
              </button>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 mt-5 pt-5 border-t border-stone-100">
            {Object.entries(CATEGORY_MAP).map(([catKey, catMeta]) => {
              const count = catKey === 'all' 
                ? VEDIC_LIBRARY.length 
                : VEDIC_LIBRARY.filter(b => b.category === catKey).length

              return (
                <button
                  key={catKey}
                  onClick={() => setSelectedCategory(catKey)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    selectedCategory === catKey
                      ? 'bg-orange-600 text-white shadow-sm'
                      : 'bg-stone-50 border border-stone-200/60 text-stone-600 hover:bg-stone-100'
                  }`}
                >
                  <span>{catMeta.icon}</span>
                  <span>{catMeta.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    selectedCategory === catKey ? 'bg-white/20 text-white' : 'bg-stone-200 text-stone-600'
                  }`}>
                    {count}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* ━━━━━ SCRIPTURE RESULTS COUNT ━━━━━ */}
        <div className="flex items-center justify-between mb-6 px-1">
          <p className="text-xs font-serif text-stone-500">
            Showing <strong className="text-stone-900">{filteredBooks.length}</strong> of {totalCatalogCount} sacred scriptures
            {selectedCategory !== 'all' ? ` in ${CATEGORY_MAP[selectedCategory]?.label}` : ''}
            {tierFilter !== 'all' ? ` (${tierFilter === 'gold' ? '100% Gold Editions' : 'In Ingestion Pipeline'})` : ''}
          </p>

          <Link
            href="/roadmap"
            className="text-[11px] font-bold text-orange-700 hover:text-orange-800 flex items-center gap-1"
          >
            <span>View 5-Phase Roadmap</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* ━━━━━ SCRIPTURE CARDS GRID ━━━━━ */}
        {filteredBooks.length === 0 ? (
          <div className="text-center py-20 bg-white/60 rounded-3xl border border-dashed border-stone-300">
            <span className="text-4xl block mb-2">🔍</span>
            <h3 className="text-lg font-serif font-bold text-stone-800 mb-1">No scriptures match your filter</h3>
            <p className="text-xs text-stone-500 mb-4">Try clearing your search query or switching categories.</p>
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('all')
                setTierFilter('all')
              }}
              className="px-4 py-2 bg-stone-900 text-white text-xs font-bold rounded-xl"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBooks.map(book => {
              const isCompleted = isTextCompleted(book.slug)
              const effort = BOOK_EFFORT_ESTIMATES[book.slug]
              const pStats = PIPELINE_BOOK_STATS[book.slug]
              const isExpanded = expandedChapterSlug === book.slug
              const chapterKeys = Object.keys(book.chapterNames || {}).sort((a, b) => Number(a) - Number(b))
              const hasChapters = chapterKeys.length > 0

              return (
                <div
                  key={book.slug}
                  className={`bg-white rounded-3xl border transition-all duration-300 flex flex-col overflow-hidden hover:shadow-xl hover:-translate-y-1 ${
                    isCompleted 
                      ? 'border-amber-200/80 hover:border-amber-400' 
                      : 'border-stone-200/80 hover:border-stone-300'
                  }`}
                >
                  {/* Top Header Accent */}
                  <div className={`h-1.5 w-full bg-gradient-to-r ${
                    isCompleted 
                      ? 'from-amber-500 via-orange-500 to-yellow-500' 
                      : 'from-stone-300 via-stone-400 to-stone-300'
                  }`} />

                  <div className="p-6 flex flex-col flex-1">
                    {/* Top Row: Category + Status Badge */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[9px] font-bold uppercase tracking-widest text-stone-500 bg-stone-100 px-2.5 py-1 rounded-md">
                        {CATEGORY_MAP[book.category]?.label.split(' ')[0] || book.category}
                      </span>

                      {isCompleted ? (
                        <span className="text-[9px] font-black text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-md flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>100% GOLD EDITION</span>
                        </span>
                      ) : (
                        <span className="text-[9px] font-bold text-stone-500 bg-stone-100 px-2.5 py-1 rounded-md flex items-center gap-1">
                          <Clock className="w-3 h-3 text-stone-400" />
                          <span>{effort?.size || 'M'} · {effort?.storyPoints || 20} PTS</span>
                        </span>
                      )}
                    </div>

                    {/* Titles */}
                    <div className="mb-3">
                      <p className="text-sm font-serif font-black text-amber-800 mb-0.5">
                        {book.nameDevanagari || book.nameHi || book.name}
                      </p>
                      <h2 className="text-xl font-serif font-black text-stone-900 leading-tight">
                        {book.name}
                      </h2>
                    </div>

                    {/* Description */}
                    <p className="text-stone-600 text-xs font-serif leading-relaxed line-clamp-3 mb-4 flex-1">
                      {book.description}
                    </p>

                    {/* Scholars & Traditions */}
                    {effort && effort.scholars.length > 0 && (
                      <div className="mb-4 pt-3 border-t border-stone-100">
                        <div className="text-[9px] font-bold uppercase tracking-widest text-stone-400 mb-1.5">
                          Scholarly Lineages &amp; Traditions
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {effort.scholars.slice(0, 3).map(sch => (
                            <span
                              key={sch}
                              className="text-[10px] font-medium bg-stone-50 text-stone-700 px-2 py-0.5 rounded-md border border-stone-200/60"
                            >
                              {sch}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Chapter & Shloka Stats */}
                    <div className="flex items-center justify-between text-xs font-semibold text-stone-500 py-3 border-t border-stone-100 mt-auto">
                      <div className="flex items-center gap-1.5">
                        <BookMarked className="w-3.5 h-3.5 text-stone-400" />
                        <span>{book.totalChapters} Chapters</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <ScrollText className="w-3.5 h-3.5 text-stone-400" />
                        <span>~{(pStats?.verses || effort?.verses || 0).toLocaleString()} Shlokas</span>
                      </div>
                    </div>

                    {/* Primary Actions */}
                    <div className="pt-4 border-t border-stone-100 flex items-center gap-2">
                      <Link
                        href={`/${book.slug}/${book.hasPreface ? 'preface' : '1'}`}
                        className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-sm ${
                          isCompleted
                            ? 'bg-stone-900 hover:bg-orange-600 text-white'
                            : 'bg-stone-800 hover:bg-stone-900 text-white'
                        }`}
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>{isCompleted ? 'Start Reading' : 'Explore Archive'}</span>
                      </Link>

                      {hasChapters && (
                        <button
                          onClick={() => setExpandedChapterSlug(isExpanded ? null : book.slug)}
                          className="px-3 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-bold transition-colors flex items-center gap-1"
                          title="Select Chapter"
                          aria-label={`Select chapter from ${book.name}`}
                          aria-expanded={isExpanded}
                        >
                          <span className="hidden sm:inline">Chapters</span>
                          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        </button>
                      )}
                    </div>

                    {/* Expandable Chapter Drawer */}
                    {isExpanded && hasChapters && (
                      <div className="mt-4 pt-4 border-t border-stone-100 animate-in fade-in duration-200">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400">
                            Jump Directly to Chapter
                          </span>
                          <span className="text-[10px] text-stone-400">
                            {chapterKeys.length} available
                          </span>
                        </div>

                        <div className="max-h-48 overflow-y-auto pr-1 space-y-1 scrollbar-thin">
                          {chapterKeys.map(chNum => {
                            const chTitle = book.chapterNames[chNum] || `Chapter ${chNum}`
                            return (
                              <Link
                                key={chNum}
                                href={`/${book.slug}/${chNum}`}
                                className="flex items-center justify-between p-2 rounded-lg hover:bg-amber-50 text-stone-700 hover:text-orange-800 text-xs transition-colors group"
                              >
                                <span className="font-serif truncate pr-2">
                                  <strong className="text-stone-900 mr-1.5">Ch {chNum}:</strong>
                                  {chTitle}
                                </span>
                                <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                              </Link>
                            )
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}

      </div>
    </div>
  )
}
