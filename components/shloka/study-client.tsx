'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import ShlokaMask from './shloka-mask'
import VedicTimeline from './vedic-timeline'
import VedicManuscriptCard from './vedic-manuscript-card'
import { VEDIC_LIBRARY } from '@/lib/texts'
import { useTranslations, useLocale } from 'next-intl'

// 🏛️ DYNAMIC PERSPECTIVE METADATA
const DEFAULT_METADATA: Record<string, { name: string, bio: string, label: string, icon: string }> = {
  'none': { 
    name: 'Original Text Only', 
    label: 'Text Only',
    icon: '📜',
    bio: 'Pure scripture — Sanskrit shloka and its meaning, without external commentary.' 
  },
  'all': { 
    name: 'All Commentaries', 
    label: 'All Scholars',
    icon: '🏛️',
    bio: 'Compare all available scholarly perspectives side by side.' 
  }
}

export default function StudyClient({ 
  textSlug, 
  chapter, 
  verses,
  adhyayaList = []
}: { 
  textSlug: string, 
  chapter: number, 
  verses: any[],
  adhyayaList?: { num: number, id: string }[]
}) {
  const t = useTranslations('study')
  const locale = useLocale()
  const router = useRouter()
  
  // Collect all unique scholarly authors across verses
  const availableScholars = React.useMemo(() => {
    const scholars = new Set<string>(['none'])
    verses.forEach((v: any) => v.layers?.forEach((l: any) => {
      if (l.type === 'commentary') scholars.add(l.author)
    }))
    // Only add 'all' if there are multiple commentary authors
    const commentaryAuthors = Array.from(scholars).filter(s => s !== 'none')
    if (commentaryAuthors.length > 1) scholars.add('all')
    return Array.from(scholars)
  }, [verses])

  // Get display metadata for a scholar key
  const getScholarMeta = (authorKey: string) => {
    if (DEFAULT_METADATA[authorKey]) return DEFAULT_METADATA[authorKey]
    for (const v of verses as any[]) {
      const layer = v.layers?.find((l: any) => l.author === authorKey)
      if (layer && layer.author_name) {
        return {
          name: layer.author_name,
          bio: layer.author_bio || '',
          label: layer.author_label || layer.author_name,
          icon: layer.author_icon || '📜'
        }
      }
    }
    // Friendly fallback names
    if (authorKey === 'iskcon') return { name: 'A.C. Bhaktivedanta Swami Prabhupada', label: 'ISKCON / Prabhupada', icon: '🔱', bio: 'Founder-Acharya of ISKCON. Bhagavad-gītā As It Is.' }
    return { name: authorKey, label: authorKey, icon: '📜', bio: '' }
  }

  // Default to first available non-none scholar
  const defaultScholar = availableScholars.find(s => s !== 'none') || 'none'
  const [scholarSelection, setScholarSelection] = useState<string>(defaultScholar)
  const [showChapterMatrix, setShowChapterMatrix] = useState(false)
  const [showAdhyayaMatrix, setShowAdhyayaMatrix] = useState(false)
  const [activeAdhyaya, setActiveAdhyaya] = useState<number>(1)
  
  useEffect(() => {
    const saved = localStorage.getItem('vishwa_scholar_pref')
    if (saved && availableScholars.includes(saved)) {
      setScholarSelection(saved)
    } else {
       const first = availableScholars.find(s => s !== 'none')
       if (first) setScholarSelection(first)
    }
  }, [availableScholars])

  const updateScholar = (s: string) => {
    setScholarSelection(s)
    localStorage.setItem('vishwa_scholar_pref', s)
  }

  const [synthesisMap, setSynthesisMap] = useState<Record<string, { text: string; loading: boolean }>>({})
  const [isChapterSynthesizing, setIsChapterSynthesizing] = useState(false)
  const verseRefs = useRef<Record<number, HTMLElement | null>>({})
  const cleanText = (txt: string) => (txt || '').replace(/\\n/g, '\n')
  
  const synthesizeEntireChapter = async () => {
    setIsChapterSynthesizing(true)
    for (const verse of verses) {
       if (synthesisMap[(verse as any).id]?.text) continue 
       setSynthesisMap(p => ({...p, [(verse as any).id]: { text: '', loading: true }}))
       try {
         const texts = (verse as any).layers.filter((l: any) => l.type === 'commentary').map((l: any) => l.content)
         const res = await fetch('/api/synthesize', { 
           method: 'POST', 
           headers: {'Content-Type': 'application/json'}, 
           body: JSON.stringify({ verseId: (verse as any).id, contextTexts: texts, language: 'en' }) 
         })
         const data = await res.json()
         if (data.success) setSynthesisMap(p => ({...p, [(verse as any).id]: { text: data.synthesis, loading: false }}))
       } catch (e) { 
         setSynthesisMap(p => ({...p, [(verse as any).id]: { text: 'Synthesis failed.', loading: false }})) 
       }
    }
    setIsChapterSynthesizing(false)
  }

  const bookData = VEDIC_LIBRARY.find(b => b.slug === textSlug)
  const totalChapters = bookData?.totalChapters || 1
  const isParva = textSlug === 'mahabharata'

  return (
    <>
      {/* ═══════════════════════════════════════════ HEADER ═══ */}
      <header className="bg-white border-b border-stone-100 pt-8 pb-0 overflow-visible relative">
        {/* Soft warm glow — top right only */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-50 rounded-full blur-[100px] -mr-48 -mt-48 opacity-60 pointer-events-none" />

        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-3 mb-6">
            <Link href="/" className="text-[11px] font-bold uppercase tracking-[0.35em] text-orange-500 hover:text-orange-600 transition-colors flex items-center gap-2">
              ← Library
            </Link>
            <span className="text-stone-200">·</span>
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-stone-300">Scholarly Reading</span>
          </div>

          {/* Title Row */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-6">
            <div className="flex items-center gap-5">
              {/* Saffron accent bar */}
              <div className="w-1 h-14 bg-gradient-to-b from-orange-600 to-orange-200 rounded-full flex-shrink-0" />
              <div>
                <h1 className="text-4xl md:text-5xl font-serif font-black text-stone-900 leading-none tracking-tight">
                  {bookData?.name || textSlug}
                </h1>
                <div className="flex items-center gap-3 mt-2">
                  {/* Chapter / Parva selector */}
                  <button 
                    onClick={() => setShowChapterMatrix(!showChapterMatrix)}
                    className="flex items-center gap-2 text-sm font-bold text-stone-500 hover:text-orange-600 transition-colors"
                  >
                    <span className="text-orange-600 font-black">{isParva ? 'Parva' : 'Chapter'} {chapter}</span>
                    <span className="text-stone-300">·</span>
                    <span className="hidden md:inline">{bookData?.chapterNames[String(chapter)]}</span>
                    <svg className={`w-3.5 h-3.5 transition-transform text-stone-400 ${showChapterMatrix ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path d="M19 9l-7 7-7-7" /></svg>
                  </button>

                  {/* Adhyaya selector — Mahabharata only */}
                  {isParva && adhyayaList.length > 0 && (
                    <>
                      <span className="text-stone-200">·</span>
                      <button 
                        onClick={() => setShowAdhyayaMatrix(!showAdhyayaMatrix)}
                        className="flex items-center gap-1.5 text-sm font-bold text-stone-500 hover:text-orange-600 transition-colors"
                      >
                        <span>Adhyaya {activeAdhyaya}</span>
                        <svg className={`w-3.5 h-3.5 transition-transform text-stone-400 ${showAdhyayaMatrix ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path d="M19 9l-7 7-7-7" /></svg>
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Prev / Next navigation */}
            <div className="flex items-center gap-2">
              <button 
                onClick={() => router.push(`/${textSlug}/${Math.max(1, chapter - 1)}`)} 
                disabled={chapter === 1}
                className="p-2.5 rounded-xl border border-stone-200 hover:border-orange-400 hover:text-orange-600 disabled:opacity-30 transition-all"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M15 19l-7-7 7-7" /></svg>
              </button>
              <span className="text-xs font-bold text-stone-300 px-2">{chapter} / {totalChapters}</span>
              <button 
                onClick={() => router.push(`/${textSlug}/${chapter + 1}`)} 
                disabled={chapter >= totalChapters}
                className="p-2.5 rounded-xl border border-stone-200 hover:border-orange-400 hover:text-orange-600 disabled:opacity-30 transition-all"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>

          {/* Chapter number pill strip */}
          <div className="flex flex-wrap gap-1.5 pb-5 border-t border-stone-50 pt-4">
            {Array.from({ length: totalChapters }, (_, i) => i + 1).map((n) => (
              <Link 
                key={n} 
                href={`/${textSlug}/${n}`}
                title={bookData?.chapterNames[String(n)]}
                className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all text-xs font-black ${
                  n === chapter 
                  ? 'bg-stone-900 text-white shadow-md' 
                  : 'bg-stone-50 text-stone-400 hover:bg-orange-50 hover:text-orange-600'
                }`}
              >
                {n}
              </Link>
            ))}
          </div>
        </div>

        {/* Adhyaya dropdown */}
        {showAdhyayaMatrix && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-stone-100 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="max-w-[1400px] mx-auto px-6 py-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-black uppercase tracking-widest text-stone-400">Adhyaya ({adhyayaList.length})</span>
                <button onClick={() => setShowAdhyayaMatrix(false)} className="text-stone-300 hover:text-stone-700 transition-colors">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              <div className="grid grid-cols-10 md:grid-cols-20 gap-1.5 max-h-52 overflow-y-auto">
                {adhyayaList.map((a) => (
                  <button 
                    key={a.id} 
                    onClick={() => {
                      setActiveAdhyaya(a.num)
                      setShowAdhyayaMatrix(false)
                      router.push(`/${textSlug}/${chapter}?adhyaya=${a.num}`)
                    }}
                    className={`h-9 rounded-lg text-xs font-black transition-all ${
                      activeAdhyaya === a.num 
                      ? 'bg-orange-600 text-white' 
                      : 'bg-stone-50 text-stone-400 hover:bg-orange-50 hover:text-orange-600'
                    }`}
                  >
                    {a.num}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* ═══════════════════════════════════════════ TOOLBAR ═══ */}
      <div className="sticky top-16 z-40 bg-white/90 backdrop-blur-md border-b border-stone-100 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between py-3 gap-4">
          {/* Scholar selector pills */}
          <div className="flex items-center gap-1 overflow-x-auto">
            {availableScholars.map(s => {
              const meta = getScholarMeta(s)
              return (
                <button 
                  key={s}
                  onClick={() => updateScholar(s)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                    scholarSelection === s 
                    ? 'bg-stone-900 text-white shadow-md' 
                    : 'text-stone-500 hover:bg-stone-100'
                  }`}
                >
                  <span className={scholarSelection === s ? '' : 'grayscale opacity-60'}>{meta.icon}</span>
                  {meta.label}
                </button>
              )
            })}
          </div>

          {/* AI Synthesis button */}
          <button 
            onClick={synthesizeEntireChapter}
            disabled={isChapterSynthesizing}
            className="flex-shrink-0 flex items-center gap-2 px-5 py-2 bg-stone-900 hover:bg-orange-600 text-white text-xs font-bold rounded-full transition-all disabled:opacity-60"
          >
            <span>{isChapterSynthesizing ? '✨' : '🧠'}</span>
            <span className="hidden md:inline">{isChapterSynthesizing ? 'Analysing...' : 'AI Analysis'}</span>
          </button>
        </div>
      </div>

      {/* ═══════════════════════════════════════════ VERSES ═══ */}
      <main className="bg-[#FDFBF8] min-h-screen">
        <div className="max-w-[900px] mx-auto px-6 py-12 space-y-10">
          {/* Vedic Timeline — compact version at top */}
          <VedicTimeline slug={textSlug} />

          {/* Verses */}
          {verses.map((verse: any) => {
            // Find the best "translation/meaning" layer — any English layer that's a translation, or fall back to meaning field
            const meaningLayer = verse.layers?.find((l: any) => l.type === 'translation' && l.lang === 'en')
            const meaning = meaningLayer?.content || verse.meaning || verse.translation || ''
            
            // Commentary layers — filter by selected scholar
            const commentaries = verse.layers?.filter((l: any) => {
              if (scholarSelection === 'none') return false
              if (l.type !== 'commentary') return false
              if (l.lang && l.lang !== 'en') return false
              if (scholarSelection === 'all') return true
              return l.author === scholarSelection || l.author.startsWith(scholarSelection)
            }) || []

            const synth = synthesisMap[verse.id]

            return (
              <article 
                key={verse.id} 
                ref={el => { verseRefs.current[verse.verse] = el as HTMLElement | null }}
                className="bg-white rounded-2xl border border-stone-100 shadow-sm hover:shadow-md hover:border-orange-100 transition-all duration-300 overflow-hidden"
              >
                {/* Verse number badge */}
                <div className="flex items-center justify-between px-6 py-3 bg-stone-50 border-b border-stone-100">
                  <span className="text-xs font-black uppercase tracking-widest text-stone-400">
                    {isParva ? 'Śloka' : 'BG'} {verse.chapter}.{verse.verse}
                  </span>
                  <button
                    onClick={() => verseRefs.current[verse.verse]?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                    className="text-[10px] text-stone-300 hover:text-orange-400 font-bold transition-colors"
                  >
                    #
                  </button>
                </div>

                {/* Sanskrit */}
                {verse.original && (
                  <div className="px-8 py-8 text-center border-b border-stone-50">
                    <ShlokaMask text={verse.original} fontSize={22} />
                    {verse.transliteration && (
                      <p className="mt-4 text-stone-400 font-serif italic text-sm leading-relaxed max-w-xl mx-auto">
                        {verse.transliteration}
                      </p>
                    )}
                  </div>
                )}
                
                {/* English meaning / translation */}
                {meaning && (
                  <div className="px-8 py-6 border-b border-stone-50">
                    <p className="text-[11px] font-black uppercase tracking-widest text-stone-300 mb-3">Meaning</p>
                    <p className="text-stone-700 leading-relaxed text-base font-medium">
                      {cleanText(meaning)}
                    </p>
                  </div>
                )}

                {/* Commentary */}
                {commentaries.length > 0 && (
                  <div className="px-8 py-6 bg-orange-50/30">
                    {commentaries.map((c: any, ci: number) => {
                      const meta = getScholarMeta(c.author)
                      return (
                        <div key={ci} className={ci > 0 ? 'mt-6 pt-6 border-t border-orange-100' : ''}>
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-base">{meta.icon}</span>
                            <span className="text-[10px] font-black uppercase tracking-widest text-orange-700">{meta.label}</span>
                          </div>
                          <p className="text-stone-600 leading-relaxed text-sm font-medium whitespace-pre-line">
                            {cleanText(c.content)}
                          </p>
                        </div>
                      )
                    })}
                  </div>
                )}

                {/* AI Synthesis result */}
                {(synth?.text || synth?.loading) && (
                  <VedicManuscriptCard 
                    content={synth.loading ? 'Synthesising wisdom...' : synth.text} 
                    className="m-6 mt-0"
                  />
                )}
              </article>
            )
          })}
        </div>
      </main>
    </>
  )
}
