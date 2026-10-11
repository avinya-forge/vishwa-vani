'use client'

import React, { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { getActiveDailyShlokas, type DailyVerse } from '@/lib/daily-shloka'
import { getOrCreateVisitorId, trackNewsletterSubscribe } from '@/lib/analytics'

export default function DailyShloka() {
  const allVerses = useMemo(() => getActiveDailyShlokas(), [])

  // State
  const [selectedBookFilter, setSelectedBookFilter] = useState<string>('all')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedScholarIndex, setSelectedScholarIndex] = useState(0)
  const [copied, setCopied] = useState(false)

  // Newsletter Subscription State
  const [subEmail, setSubEmail] = useState('')
  const [subLanguage, setSubLanguage] = useState<'en' | 'hi' | 'mr' | 'sa'>('en')
  const [subStatus, setSubStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [subMessage, setSubMessage] = useState('')

  // Unique completed scriptures present in active corpus
  const uniqueBooks = useMemo(() => {
    const seen = new Set<string>()
    const books: Array<{ slug: string; name: string; devanagari: string }> = []
    for (const v of allVerses) {
      if (!seen.has(v.bookSlug)) {
        seen.add(v.bookSlug)
        books.push({
          slug: v.bookSlug,
          name: v.bookName,
          devanagari: v.bookNameDevanagari,
        })
      }
    }
    return books
  }, [allVerses])

  // Filtered verses based on selected scripture
  const activeVerses = useMemo(() => {
    if (selectedBookFilter === 'all') return allVerses
    return allVerses.filter(v => v.bookSlug === selectedBookFilter)
  }, [allVerses, selectedBookFilter])

  // Deterministic daily rotation on mount
  useEffect(() => {
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000)
    const initialIndex = dayOfYear % allVerses.length
    setCurrentIndex(initialIndex)
  }, [allVerses.length])

  // Ensure index is within range when filter changes
  useEffect(() => {
    setCurrentIndex(0)
    setSelectedScholarIndex(0)
  }, [selectedBookFilter])

  // Reset scholar index on verse change
  useEffect(() => {
    setSelectedScholarIndex(0)
  }, [currentIndex])

  const safeIndex = currentIndex < activeVerses.length ? currentIndex : 0
  const verse: DailyVerse = activeVerses[safeIndex] || allVerses[0]
  const activeCommentary = verse.commentaries[selectedScholarIndex] || verse.commentaries[0]

  const nextVerse = () => {
    setCurrentIndex(prev => (prev + 1) % activeVerses.length)
  }

  const prevVerse = () => {
    setCurrentIndex(prev => (prev - 1 + activeVerses.length) % activeVerses.length)
  }

  const copyToClipboard = async () => {
    const textToCopy = `${verse.bookName} (${verse.bookNameDevanagari}) ${verse.chapter}.${verse.verse}\n\n${verse.sanskrit}\n\n${verse.transliteration}\n\nTranslation: ${verse.translation}\n\nLineage Commentary (${activeCommentary.scholar}): ${activeCommentary.content}\n\nSource: Vishwa-Vani Universal Library`
    try {
      await navigator.clipboard.writeText(textToCopy)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // ignore
    }
  }

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!subEmail || !subEmail.includes('@')) {
      setSubStatus('error')
      setSubMessage('Please provide a valid email address.')
      return
    }

    setSubStatus('loading')
    setSubMessage('')

    try {
      const visitorId = getOrCreateVisitorId()
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: subEmail,
          language: subLanguage,
          visitorId: visitorId,
          scripturePreference: selectedBookFilter
        })
      })

      const data = await res.json()
      if (res.ok && data.success) {
        setSubStatus('success')
        setSubMessage(data.message || 'Subscribed! You will receive Daily Vedic Wisdom.')
        trackNewsletterSubscribe(subLanguage, selectedBookFilter)
        setSubEmail('')
      } else {
        setSubStatus('error')
        setSubMessage(data.error || 'Unable to subscribe. Please try again.')
      }
    } catch {
      setSubStatus('error')
      setSubMessage('Network connection error. Please try again.')
    }
  }

  return (
    <section className="relative w-full max-w-4xl mx-auto px-4 sm:px-6 my-16 sm:my-24">
      {/* Ambient background glow */}
      <div className="absolute -inset-4 bg-gradient-to-r from-amber-400/10 via-orange-500/10 to-amber-500/10 rounded-3xl blur-2xl pointer-events-none -z-10" />

      {/* Main Study Card */}
      <div className="bg-white/95 dark:bg-stone-900/95 backdrop-blur-xl border border-amber-200/80 dark:border-amber-900/60 rounded-3xl shadow-xl overflow-hidden transition-all duration-300">
        
        {/* Card Top Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 sm:px-8 py-4 bg-gradient-to-r from-amber-50/90 via-orange-50/60 to-amber-50/90 dark:from-stone-900 dark:via-orange-950/20 dark:to-stone-900 border-b border-amber-100 dark:border-stone-800">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse" />
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-orange-800 dark:text-orange-400">
                दैनिक श्लोक · Daily Shloka
              </span>
              <span className="hidden sm:inline-block px-2.5 py-0.5 text-[10px] font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 rounded-full border border-amber-200 dark:border-amber-800">
                {verse.theme}
              </span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={prevVerse}
              className="p-1.5 px-2.5 rounded-lg border border-stone-200 dark:border-stone-700 hover:border-orange-400 hover:text-orange-600 bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 transition-colors text-xs font-bold"
              title="Previous Shloka"
              aria-label="Previous Shloka"
            >
              &larr;
            </button>
            <button
              onClick={nextVerse}
              className="px-2.5 py-1.5 rounded-lg border border-stone-200 dark:border-stone-700 hover:border-orange-400 hover:text-orange-600 bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 transition-colors text-xs font-bold flex items-center gap-1"
              title="Cycle to next Shloka"
            >
              <span>✦</span>
              <span className="hidden sm:inline">Next Shloka</span>
            </button>
            <button
              onClick={copyToClipboard}
              className="p-1.5 px-2.5 rounded-lg border border-stone-200 dark:border-stone-700 hover:border-orange-400 hover:text-orange-600 bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 transition-colors text-xs font-bold"
              title="Copy Shloka text"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
            <Link
              href={`/${verse.bookSlug}/${verse.chapter}`}
              className="px-3 py-1.5 rounded-lg bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold transition-colors flex items-center gap-1 shadow-sm"
            >
              <span>Study</span>
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>

        {/* Scripture Switcher Bar (Filter by 100% Gold Canonical Scriptures) */}
        <div className="px-6 py-2.5 bg-stone-50/80 dark:bg-stone-900/60 border-b border-stone-100 dark:border-stone-800 overflow-x-auto scrollbar-none flex items-center gap-1.5 text-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500 whitespace-nowrap mr-1">
            Scripture:
          </span>
          <button
            onClick={() => setSelectedBookFilter('all')}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold whitespace-nowrap transition-colors ${
              selectedBookFilter === 'all'
                ? 'bg-orange-600 text-white shadow-xs'
                : 'bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:border-orange-300'
            }`}
          >
            All 17 Scriptures ({allVerses.length})
          </button>
          {uniqueBooks.map(b => (
            <button
              key={b.slug}
              onClick={() => setSelectedBookFilter(b.slug)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold whitespace-nowrap transition-colors ${
                selectedBookFilter === b.slug
                  ? 'bg-orange-600 text-white shadow-xs'
                  : 'bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:border-orange-300'
              }`}
            >
              {b.devanagari || b.name}
            </button>
          ))}
        </div>

        {/* Shloka Scripture Title Banner */}
        <div className="px-6 sm:px-10 pt-6 pb-2 text-center">
          <p className="text-[11px] font-black uppercase tracking-[0.25em] text-stone-400 dark:text-stone-500">
            {verse.category} · {verse.bookName}
          </p>
          <h3 className="text-xl sm:text-2xl font-serif font-black text-stone-900 dark:text-stone-100 mt-1">
            {verse.bookNameDevanagari} · Chapter {verse.chapter}, Verse {verse.verse}
          </h3>
        </div>

        {/* Devanagari Sanskrit */}
        <div className="px-6 sm:px-12 py-6 text-center">
          <p className="font-serif font-bold text-xl sm:text-2xl md:text-3xl text-stone-900 dark:text-stone-100 leading-[1.8] sm:leading-[1.9] tracking-normal select-text whitespace-pre-line drop-shadow-sm">
            {verse.sanskrit}
          </p>

          {/* IAST Transliteration */}
          <p className="mt-6 text-stone-600 dark:text-stone-300 font-serif italic text-base sm:text-lg leading-[1.8] max-w-2xl mx-auto whitespace-pre-line">
            {verse.transliteration}
          </p>
        </div>

        {/* Universal Translation */}
        <div className="px-6 sm:px-10 py-6 border-t border-amber-100/80 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-800/30">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-600 dark:text-orange-400 mb-2.5 flex items-center gap-2">
            <span className="w-3 h-0.5 bg-orange-500 rounded-full" />
            Universal Translation
          </p>
          <p className="text-stone-800 dark:text-stone-200 text-base sm:text-lg leading-relaxed font-serif">
            &ldquo;{verse.translation}&rdquo;
          </p>
        </div>

        {/* Multi-Scholar Commentary Section */}
        {verse.commentaries && verse.commentaries.length > 0 && (
          <div className="px-6 sm:px-10 py-6 border-t border-amber-100/80 dark:border-stone-800 bg-orange-50/20 dark:bg-orange-950/10">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500">
                Commentary Perspectives ({verse.commentaries.length})
              </p>
              
              {/* Scholar selector tabs */}
              <div className="flex flex-wrap gap-1.5">
                {verse.commentaries.map((c, i) => (
                  <button
                    key={c.scholar}
                    onClick={() => setSelectedScholarIndex(i)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                      selectedScholarIndex === i
                        ? 'bg-orange-600 text-white shadow-sm'
                        : 'bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:border-orange-300'
                    }`}
                  >
                    <span>{c.icon}</span>
                    <span>{c.scholar}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Active Commentary Box */}
            <div className="p-5 rounded-2xl bg-white dark:bg-stone-800/80 border border-amber-100 dark:border-stone-700 shadow-sm transition-all">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-base">{activeCommentary.icon}</span>
                <span className="text-xs font-black uppercase tracking-wider text-orange-900 dark:text-orange-300">
                  {activeCommentary.scholar}
                </span>
                <span className="text-[10px] text-stone-400 dark:text-stone-400 font-serif italic">
                  ({activeCommentary.lineage})
                </span>
              </div>
              <p className="text-stone-700 dark:text-stone-300 text-sm sm:text-[15px] leading-relaxed font-serif">
                {activeCommentary.content}
              </p>
            </div>
          </div>
        )}

        {/* Card Footer with Direct Study Link */}
        <div className="px-6 sm:px-10 py-4 bg-stone-50/80 dark:bg-stone-900/80 border-t border-stone-100 dark:border-stone-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <span className="text-stone-400 dark:text-stone-500 font-serif italic">
            Verse {safeIndex + 1} of {activeVerses.length} ({uniqueBooks.length} 100% Gold Scriptures Active)
          </span>
          <Link
            href={`/${verse.bookSlug}/${verse.chapter}`}
            className="font-bold text-orange-700 dark:text-orange-400 hover:text-orange-800 dark:hover:text-orange-300 transition-colors flex items-center gap-1"
          >
            <span>Read Complete Chapter {verse.chapter} in Study Canvas</span>
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>

        {/* Nitya Svadhyaya: Daily Shloka in Your Inbox Subscription Deck */}
        <div className="px-6 sm:px-10 py-6 bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-amber-500/10 dark:from-amber-950/20 dark:via-orange-950/10 dark:to-stone-900 border-t border-amber-200/70 dark:border-amber-900/40">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-md">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-sm">📬</span>
                <span className="text-xs font-black uppercase tracking-[0.2em] text-orange-800 dark:text-orange-400">
                  नित्य स्वाध्याय · Daily Shloka in Your Inbox
                </span>
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed font-serif">
                Awaken every morning with one sacred verse, authentic transliteration, and classical lineage commentary delivered to your email.
              </p>
            </div>

            <form onSubmit={handleSubscribe} className="flex-1 max-w-lg space-y-3">
              <div className="flex flex-wrap items-center gap-1.5 text-xs">
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500 mr-1">
                  Language:
                </span>
                {(['en', 'hi', 'mr', 'sa'] as const).map(lang => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => setSubLanguage(lang)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all ${
                      subLanguage === lang
                        ? 'bg-orange-600 text-white shadow-xs'
                        : 'bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:border-orange-300'
                    }`}
                  >
                    {lang === 'en' ? 'English' : lang === 'hi' ? 'हिन्दी' : lang === 'mr' ? 'मराठी' : 'संस्कृत'}
                  </button>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="email"
                  value={subEmail}
                  onChange={e => setSubEmail(e.target.value)}
                  placeholder="Enter your email (e.g. seeker@vedic.org)..."
                  disabled={subStatus === 'loading'}
                  className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all"
                  aria-label="Email address for daily shloka"
                />
                <button
                  type="submit"
                  disabled={subStatus === 'loading'}
                  className="px-4 py-2 bg-orange-600 hover:bg-orange-700 disabled:opacity-50 text-white text-xs font-bold rounded-xl transition-all shadow-sm hover:shadow flex items-center gap-1.5 whitespace-nowrap"
                >
                  {subStatus === 'loading' ? (
                    <span>Subscribing...</span>
                  ) : (
                    <>
                      <span>Subscribe</span>
                      <span aria-hidden="true">&rarr;</span>
                    </>
                  )}
                </button>
              </div>

              {subStatus === 'success' && (
                <p className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1 animate-fadeIn">
                  <span>✓</span>
                  <span>{subMessage}</span>
                </p>
              )}
              {subStatus === 'error' && (
                <p className="text-[11px] font-bold text-red-600 dark:text-red-400 flex items-center gap-1 animate-fadeIn">
                  <span>⚠</span>
                  <span>{subMessage}</span>
                </p>
              )}
            </form>
          </div>
        </div>

      </div>
    </section>
  )
}
