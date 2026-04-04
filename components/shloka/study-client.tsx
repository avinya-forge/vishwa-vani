'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import ShlokaMask from './shloka-mask'
import VedicTimeline from './vedic-timeline'
import VedicManuscriptCard from './vedic-manuscript-card'
import { VEDIC_LIBRARY } from '@/lib/texts'
import { useTranslations, useLocale } from 'next-intl'
import HierarchicalNav, { LevelData } from '@/components/ui/hierarchical-nav'

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
  adhyayaList = [],
  currentAdhyaya
}: { 
  textSlug: string, 
  chapter: number, 
  verses: any[],
  adhyayaList?: { num: number, id: string }[],
  currentAdhyaya?: number
}) {
  const t = useTranslations('study')
  const locale = useLocale()
  const router = useRouter()
  
  // Normalize the author key to a stable group (e.g., dnyaneshwari-en -> dnyaneshwari)
  const normalizeScholarKey = (author: string) => (author || '').split('-')[0].toLowerCase()
  const PREFERRED_SCHOLARS = ['dnyaneshwari', 'iskcon']

  // Persist reading position for "Continue Reading" feature
  useEffect(() => {
    const readingPosition = {
      text: textSlug,
      chapter: chapter,
      verse: verses.length > 0 ? verses[0].verse : 1,
      timestamp: Date.now()
    }
    localStorage.setItem('vishwa_continue_reading', JSON.stringify(readingPosition))
    localStorage.setItem('vishwa_last_text', textSlug)
  }, [textSlug, chapter, verses])

  // Collect all unique scholarly authors across verses, normalized to preferred top-2 authors
  const availableScholars = React.useMemo(() => {
    const baseAuthors = new Set<string>()
    verses.forEach((v: any) => v.layers?.forEach((l: any) => {
      if (l.type === 'commentary' && l.author) baseAuthors.add(normalizeScholarKey(l.author))
    }))

    const chosenAuthors = PREFERRED_SCHOLARS.filter(a => baseAuthors.has(a))
    if (chosenAuthors.length === 0) {
      chosenAuthors.push(...Array.from(baseAuthors).slice(0, 2))
    }

    // Enforce exactly 2 authors max in the Lean UI (plus 'none')
    const scholars = new Set<string>(['none', ...chosenAuthors.slice(0, 2)])
    return Array.from(scholars)
  }, [verses])

  // Collect all languages available in commentary layers
  const availableLanguages = React.useMemo(() => {
    const langs = new Set<string>(['all'])
    verses.forEach((v: any) => v.layers?.forEach((l: any) => {
      if (l.type === 'commentary' && l.lang) langs.add(l.lang)
    }))
    return Array.from(langs)
  }, [verses])

  const getLanguageLabel = (lang: string) => {
    switch (lang) {
      case 'en': return 'English'
      case 'hi': return 'Hindi'
      case 'mr': return 'Marathi'
      case 'sa': return 'Sanskrit'
      case 'all': return 'All Languages'
      default: return lang.toUpperCase()
    }
  }

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
    // Friendly fallbacks / known authors
    if (authorKey === 'dnyaneshwari') return { name: 'Sant Dnyaneshwar', label: 'Dnyaneshwari', icon: '🌼', bio: 'Sant Dnyaneshwar commentary (language-specific variants).' }
    if (authorKey === 'iskcon') return { name: 'A.C. Bhaktivedanta Swami Prabhupada', label: 'ISKCON / Prabhupada', icon: '🔱', bio: 'Founder-Acharya of ISKCON. Bhagavad-gītā As It Is.' }
    return { name: authorKey, label: authorKey, icon: '📜', bio: '' }
  }

  // Score commentary for relevance to the meaning text, to avoid random or low-alignment commentary showing on first shloka
  const calculateTextOverlapScore = (base: string, commentary: string) => {
    if (!base || !commentary) return 0
    const normalize = (text: string) =>
      text
        .toLowerCase()
        .replace(/[^a-z0-9\s]/gi, ' ')
        .split(/\s+/)
        .filter(Boolean)
    const baseWords = new Set(normalize(base))
    const commentaryWords = new Set(normalize(commentary))
    if (baseWords.size === 0 || commentaryWords.size === 0) return 0

    let overlapCount = 0
    baseWords.forEach(word => {
      if (commentaryWords.has(word)) overlapCount += 1
    })
    const unionSize = new Set([...baseWords, ...commentaryWords]).size
    return unionSize > 0 ? overlapCount / unionSize : 0
  }

  const isValidCommentaryContent = (content: string) => {
    if (!content || typeof content !== 'string') return false
    const trimmed = content.trim()
    if (trimmed.length < 80) return false
    const placeholderPatterns = ['PLACEHOLDER', 'TBD', 'DNYAN', 'TODO', 'TODO', 'lorem ipsum']
    if (placeholderPatterns.some(p => trimmed.toUpperCase().includes(p.toUpperCase()))) {
      return false
    }
    return true
  }

  // Default to first available non-none scholar
  const defaultScholar = availableScholars.find(s => s !== 'none') || 'none'
  const defaultLanguage = 'all'

  const [scholarSelection, setScholarSelection] = useState<string[]>([])
  const [languageSelection, setLanguageSelection] = useState<string>(defaultLanguage)
  const [activeAdhyaya, setActiveAdhyaya] = useState<number>(1)
  
  useEffect(() => {
    const savedScholars = localStorage.getItem('vishwa_scholar_pref')
    const savedLanguage = localStorage.getItem('vishwa_language_pref')

    // Lean template: start with no commentaries selected (empty array)
    if (savedScholars && savedScholars !== 'none') {
      try {
        const parsed = JSON.parse(savedScholars)
        if (Array.isArray(parsed)) {
          setScholarSelection(parsed.slice(0, 2)) // Limit to 2
        } else {
          setScholarSelection([])
        }
      } catch {
        setScholarSelection([])
      }
    } else {
      setScholarSelection([])
    }

    if (savedLanguage && availableLanguages.includes(savedLanguage)) {
      setLanguageSelection(savedLanguage)
    } else {
      setLanguageSelection(defaultLanguage)
    }
  }, [availableScholars, availableLanguages])

  const updateScholar = (s: string[]) => {
    setScholarSelection(s)
    localStorage.setItem('vishwa_scholar_pref', JSON.stringify(s))
  }

  const toggleScholar = (author: string) => {
    let newSelection = [...scholarSelection]
    if (newSelection.includes(author)) {
      newSelection = newSelection.filter(a => a !== author)
    } else {
      // Lean template: max 2 authors
      if (newSelection.length < 2) {
        newSelection.push(author)
      } else {
        // Replace the first one with the new author
        newSelection[0] = author
      }
    }
    setScholarSelection(newSelection)
    localStorage.setItem('vishwa_scholar_pref', JSON.stringify(newSelection))
  }

  const updateLanguage = (lang: string) => {
    setLanguageSelection(lang)
    localStorage.setItem('vishwa_language_pref', lang)
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
         // Lean template: always include meaning + up to 2 commentaries (regardless of UI selection)
         const meaningLayer = (verse as any).layers?.find((l: any) => l.type === 'translation' && l.lang === 'en')
         const meaning = meaningLayer?.content || (verse as any).meaning || (verse as any).translation || ''
         
         // Get commentaries from selected authors (or first candidates if none selected)
         const candidateCommentaries = (verse as any).layers?.filter((l: any) => {
           if (l.type !== 'commentary') return false
           if (!l.author) return false
           if (languageSelection !== 'all' && l.lang && l.lang !== languageSelection) return false
           if (scholarSelection.length > 0) {
             return scholarSelection.includes(normalizeScholarKey(l.author))
           }
           return true
         }) || []

         // Score by overlap with meaning to avoid random misaligned entries
         const scoredCommentaries = candidateCommentaries.map((c: any) => ({
           ...c,
           _relevanceScore: calculateTextOverlapScore(meaning, c.content)
         }))
         .sort((a: any, b: any) => b._relevanceScore - a._relevanceScore)

         let commentaries = scoredCommentaries

         // If user-selected scholars exist, limit to top 2 among them
         if (scholarSelection.length > 0) {
           commentaries = scoredCommentaries.slice(0, 2)
         } else {
           // No selection means fallback to top 2 in any language/author
           commentaries = scoredCommentaries.slice(0, 2)
         }

         
         const contextTexts = [meaning, ...commentaries.map((c: any) => c.content)].filter(t => t)
         const res = await fetch('/api/synthesize', { 
           method: 'POST', 
           headers: {'Content-Type': 'application/json'}, 
           body: JSON.stringify({ verseId: (verse as any).id, contextTexts, language: languageSelection || 'en' }) 
         })
         if (!res.ok) throw new Error('Synthesis API responded with status ' + res.status)
         const data = await res.json()
         if (data.success) {
           setSynthesisMap(p => ({...p, [(verse as any).id]: { text: data.synthesis, loading: false }}))
         } else {
           setSynthesisMap(p => ({...p, [(verse as any).id]: { text: 'Synthesis unavailable, try again later.', loading: false }}))
         }
       } catch (e) { 
         setSynthesisMap(p => ({...p, [(verse as any).id]: { text: 'Synthesis failed.', loading: false }})) 
       }
    }
    setIsChapterSynthesizing(false)
  }

  const bookData = VEDIC_LIBRARY.find(b => b.slug === textSlug)
  const totalChapters = bookData?.totalChapters || 1
  const isParva = textSlug === 'mahabharata'
  const isGita = textSlug === 'bhagavad-gita'

  // Build the generic HierarchicalNav levels
  const navLevels: LevelData[] = [
    {
      id: 'chapter',
      name: isParva ? 'Parva' : 'Chapter',
      activeValue: chapter,
      activeLabel: bookData?.chapterNames[String(chapter)] || '',
      options: Array.from({ length: totalChapters }, (_, i) => ({
        value: i + 1,
        tooltip: bookData?.chapterNames[String(i + 1)],
        href: `/${textSlug}/${i + 1}`,
      }))
    }
  ]

  // If we have adhyaya sub-levels, push them into the generic nav
  if (isParva && adhyayaList.length > 0) {
    navLevels.push({
      id: 'adhyaya',
      name: 'Adhyaya',
      activeValue: activeAdhyaya,
      options: adhyayaList.map(a => ({
        value: a.num,
        href: `/${textSlug}/${chapter}?adhyaya=${a.num}`
      }))
    })
  }

  // Sync state when URL adhyaya changes
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const adh = urlParams.get('adhyaya');
    if (adh) setActiveAdhyaya(parseInt(adh));
  }, []);

  return (
    <>
      {/* ═══════════════════════════════════════════ HEADER ═══ */}
      <header className="bg-white border-b border-stone-100 pt-6 pb-4 overflow-visible relative">
        {/* Soft warm glow — top right only */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-orange-50 rounded-full blur-[90px] -mr-40 -mt-20 opacity-60 pointer-events-none" />

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-4">
            <Link href="/" className="text-[10px] font-bold uppercase tracking-[0.3em] text-orange-500 hover:text-orange-600 transition-colors flex items-center gap-1.5">
              &larr; Library
            </Link>
            <span className="text-stone-200">·</span>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-300">Scholarly Reading</span>
          </div>

          {/* Title Row */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-4">
              {/* Saffron accent bar */}
              <div className="w-1 h-10 bg-gradient-to-b from-orange-600 to-orange-200 rounded-full flex-shrink-0" />
              <div>
                <h1 className="text-3xl md:text-4xl font-serif font-black text-stone-900 leading-none tracking-tight">
                  {bookData?.name || textSlug}
                  {isParva && currentAdhyaya && (
                    <span className="block text-sm font-normal text-stone-500 mt-1">
                      Parva {chapter} / Adhyaya {currentAdhyaya} of {adhyayaList.length}
                    </span>
                  )}
                </h1>
                <div className="mt-2.5">
                  <HierarchicalNav levels={navLevels} />
                </div>
              </div>
            </div>

            {/* Prev / Next navigation */}
            <div className="flex items-center gap-1.5 hidden md:flex">
              <button 
                onClick={() => router.push(`/${textSlug}/${Math.max(1, chapter - 1)}`)} 
                disabled={chapter === 1}
                className="p-2 rounded-lg border border-stone-200 hover:border-orange-400 hover:text-orange-600 disabled:opacity-30 transition-all bg-white"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M15 19l-7-7 7-7" /></svg>
              </button>
              <span className="text-[10px] font-black tracking-widest text-stone-300 px-2">{chapter} / {totalChapters}</span>
              <button 
                onClick={() => router.push(`/${textSlug}/${chapter + 1}`)} 
                disabled={chapter >= totalChapters}
                className="p-2 rounded-lg border border-stone-200 hover:border-orange-400 hover:text-orange-600 disabled:opacity-30 transition-all bg-white"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ═══════════════════════════════════════════ TOOLBAR ═══ */}
      <div className="sticky top-16 z-40 bg-white/90 backdrop-blur-md border-b border-stone-100 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between py-3 gap-4 flex-wrap">
          <div className="flex flex-wrap items-center gap-3">
            {/* Author selector - Lean template: checkboxes for up to 2 authors */}
            <div className="flex items-center gap-2 text-xs font-semibold text-stone-600">
              <span>Scholars ({scholarSelection.length}/{2})</span>
              <div className="flex gap-1.5 max-w-xs overflow-x-auto">
                {availableScholars.filter(s => s !== 'none').slice(0, 5).map((author) => {
                  const meta = getScholarMeta(author)
                  const isSelected = scholarSelection.includes(author)
                  const isDisabled = !isSelected && scholarSelection.length >= 2
                  return (
                    <button
                      key={author}
                      onClick={() => toggleScholar(author)}
                      disabled={isDisabled}
                      className={`px-2.5 py-1.5 rounded border text-[11px] font-medium transition-all ${
                        isSelected
                          ? 'bg-orange-100 border-orange-300 text-orange-700'
                          : isDisabled
                          ? 'bg-stone-50 border-stone-200 text-stone-300 cursor-not-allowed opacity-50'
                          : 'bg-white border-stone-200 text-stone-600 hover:border-orange-300 hover:bg-orange-50'
                      }`}
                      title={meta.bio}
                    >
                      <span>{meta.icon}</span>
                      <span className="hidden sm:inline ml-1">{meta.label}</span>
                    </button>
                  )
                })}
              </div>
              {availableScholars.filter(s => s !== 'none').length > 5 && (
                <span className="text-[10px] text-stone-400">+{availableScholars.filter(s => s !== 'none').length - 5}</span>
              )}
            </div>

            <label className="flex items-center gap-2 text-xs font-semibold text-stone-600">
              <span>Language</span>
              <select
                value={languageSelection}
                onChange={(e) => updateLanguage(e.target.value)}
                className="px-3 py-2 border border-stone-200 rounded-lg text-sm bg-white"
              >
                {availableLanguages.map((lang) => (
                  <option key={lang} value={lang}>
                    {getLanguageLabel(lang)}
                  </option>
                ))}
              </select>
            </label>
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
        <div className="max-w-[900px] mx-auto px-4 sm:px-6 py-8 space-y-6">
          {/* Vedic Timeline — compact version at top */}
          <VedicTimeline slug={textSlug} />

          {/* Verses */}
          {verses.map((verse: any) => {
            // Find the best "translation/meaning" layer — any English layer that's a translation, or fall back to meaning field
            const meaningLayer = verse.layers?.find((l: any) => l.type === 'translation' && l.lang === 'en')
            const meaning = meaningLayer?.content || verse.meaning || verse.translation || ''
            
            // Commentary layers — filter by selected scholar base key and language (Lean template: only show if explicitly selected)
            const candidateCommentaries = verse.layers?.filter((l: any) => {
              if (scholarSelection.length === 0) return false // Lean template: hide commentaries if none selected
              if (l.type !== 'commentary') return false
              if (!l.author || !l.content) return false
              if (languageSelection !== 'all') {
                if (!l.lang) return false
                if (l.lang !== languageSelection) return false
              }
              return scholarSelection.includes(normalizeScholarKey(l.author))
            }) || []

            const commentaries = candidateCommentaries
              .filter((c: any) => isValidCommentaryContent(c.content))
              .map((c: any) => ({
                ...c,
                _relevanceScore: calculateTextOverlapScore(meaning, c.content),
              }))
              .sort((a: any, b: any) => (b._relevanceScore || 0) - (a._relevanceScore || 0))
              .slice(0, 2)

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
                    {isParva ? 'Śloka' : isGita ? 'BG' : 'Śloka'} {verse.chapter}.{verse.verse}
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
                  <div className="px-5 sm:px-6 py-6 text-center border-b border-stone-50">
                    <ShlokaMask text={verse.original} fontSize={22} className="min-w-full" />
                    {verse.transliteration && (
                      <p className="mt-3 text-stone-400 font-serif italic text-sm leading-relaxed max-w-xl mx-auto">
                        {verse.transliteration}
                      </p>
                    )}
                  </div>
                )}
                
                {/* English meaning / translation */}
                {meaning && (
                  <div className="px-5 sm:px-6 py-5 border-b border-stone-50">
                    <p className="text-[10px] font-black uppercase tracking-widest text-stone-300 mb-2">Meaning</p>
                    <p className="text-stone-700 leading-relaxed text-[15px] font-medium">
                      {cleanText(meaning)}
                    </p>
                  </div>
                )}

                {/* Commentary */}
                {commentaries.length > 0 && (
                  <div className="px-5 sm:px-6 py-5 bg-orange-50/30">
                    {commentaries[0]._relevanceScore !== undefined && commentaries[0]._relevanceScore < 0.12 && (
                      <p className="text-xs text-orange-800 bg-orange-100 rounded-md p-2 mb-3">Warning: The selected commentary may not fully align with the verse meaning. We prioritize closest available match in current language.</p>
                    )}
                    {commentaries.map((c: any, ci: number) => {
                      const meta = getScholarMeta(c.author)
                      return (
                        <div key={ci} className={ci > 0 ? 'mt-5 pt-5 border-t border-orange-100' : ''}>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-sm">{meta.icon}</span>
                            <span className="text-[9px] font-black uppercase tracking-widest text-orange-700">{meta.label}</span>
                          </div>
                          <p className="text-stone-600 leading-relaxed text-[13px] font-medium whitespace-pre-line break-words overflow-wrap-anywhere">
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
