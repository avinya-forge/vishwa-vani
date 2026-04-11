'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import ShlokaMask from './shloka-mask'
import VedicTimeline from './vedic-timeline'
import VedicManuscriptCard from './vedic-manuscript-card'
import { VEDIC_LIBRARY } from '@/lib/texts'
import { useTranslations, useLocale } from 'next-intl'
import type { LevelData } from '@/components/ui/hierarchical-nav';
import HierarchicalNav from '@/components/ui/hierarchical-nav'
import VerseAppLinks from './verse-app-links'
import AdhyayaShareLink from './adhyaya-share-link'

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
  verses: unknown[],
  adhyayaList?: { num: number, id: string }[],
  currentAdhyaya?: number
}) {
  const _t = useTranslations('study')
  const _locale = useLocale()
  const router = useRouter()
  
  // Normalize the author key to a stable group (e.g., dnyaneshwari-en -> dnyaneshwari)
  const normalizeScholarKey = (author: string) => (author || '').split('-')[0].toLowerCase()
  const PREFERRED_SCHOLARS = ['dnyaneshwari', 'iskcon']

  // Persist reading position for "Continue Reading" feature
  useEffect(() => {
    const readingPosition = {
      text: textSlug,
      chapter: chapter,
      verse: verses.length > 0 ? (verses[0] as Record<string, unknown>).verse : 1,
      timestamp: Date.now()
    }
    localStorage.setItem('vishwa_continue_reading', JSON.stringify(readingPosition))
    localStorage.setItem('vishwa_last_text', textSlug)
  }, [textSlug, chapter, verses])

  // Collect all unique scholarly authors across verses, normalized to preferred top-2 authors
  const availableScholars = React.useMemo(() => {
    const baseAuthors = new Set<string>()
    verses.forEach((v: unknown) => {
      const verse = v as Record<string, unknown>
      const layers = verse.layers as unknown[]
      layers?.forEach((l: unknown) => {
        const layer = l as Record<string, unknown>
        if (layer.type === 'commentary' && layer.author) baseAuthors.add(normalizeScholarKey(layer.author as string))
      })
    })

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
    verses.forEach((v: unknown) => {
      const verse = v as Record<string, unknown>
      const layers = verse.layers as unknown[]
      layers?.forEach((l: unknown) => {
        const layer = l as Record<string, unknown>
        if (layer.type === 'commentary' && layer.lang) langs.add(layer.lang as string)
      })
    })
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
  const getScholarMeta = (authorKey: string): { name: string; bio: string; label: string; icon: string } => {
    if (DEFAULT_METADATA[authorKey]) return DEFAULT_METADATA[authorKey]
    for (const v of verses) {
      const verse = v as Record<string, unknown>
      const layers = verse.layers as unknown[]
      const layer = layers?.find((l: unknown) => (l as Record<string, unknown>).author === authorKey) as Record<string, unknown> | undefined
      if (layer && layer.author_name) {
        return {
          name: String(layer.author_name),
          bio: String(layer.author_bio || ''),
          label: String(layer.author_label || layer.author_name),
          icon: String(layer.author_icon || '📜')
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


  const defaultLanguage = 'all'

  const [scholarSelection, setScholarSelection] = useState<string[]>([])
  const [languageSelection, setLanguageSelection] = useState<string>(defaultLanguage)
  const [activeAdhyaya, setActiveAdhyaya] = useState<number>(currentAdhyaya || 1)
  const [bookmarks, setBookmarks] = useState<string[]>([])
  const [visitedChapters, setVisitedChapters] = useState<Set<number>>(new Set())

  useEffect(() => {
    if (typeof currentAdhyaya === 'number' && currentAdhyaya > 0) {
      setActiveAdhyaya(currentAdhyaya)
    } else if (adhyayaList.length > 0) {
      setActiveAdhyaya(adhyayaList[0].num)
    }
  }, [currentAdhyaya, adhyayaList])

  // Load bookmarks from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('vishwa_bookmarks')
    if (saved) {
      try {
        setBookmarks(JSON.parse(saved))
      } catch {
        setBookmarks([])
      }
    }
  }, [])

  // Load visited chapters from localStorage and mark current as visited
  useEffect(() => {
    const saved = localStorage.getItem('vishwa_visited_chapters')
    let chapters = new Set<number>()
    if (saved) {
      try {
        const arr = JSON.parse(saved) as number[]
        chapters = new Set(arr)
      } catch {
        chapters = new Set()
      }
    }
    // Mark current chapter as visited and persist
    chapters.add(chapter)
    setVisitedChapters(chapters)
    localStorage.setItem('vishwa_visited_chapters', JSON.stringify(Array.from(chapters)))
  }, [chapter])

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

  const _updateScholar = (s: string[]) => {
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

  const toggleBookmark = (verseId: string) => {
    const newBookmarks = bookmarks.includes(verseId)
      ? bookmarks.filter(id => id !== verseId)
      : [...bookmarks, verseId]
    setBookmarks(newBookmarks)
    localStorage.setItem('vishwa_bookmarks', JSON.stringify(newBookmarks))
  }

  const jumpToFirstBookmark = () => {
    if (bookmarks.length === 0) return
    const firstBookmarkedVerseId = bookmarks[0]
    const firstBookmarkedVerse = verses.find((v: unknown) => {
      const verse = v as Record<string, unknown>
      return verse.id === firstBookmarkedVerseId
    })
    if (firstBookmarkedVerse) {
      const verseNum = (firstBookmarkedVerse as Record<string, unknown>).verse as number
      verseRefs.current[verseNum]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const copyShareLink = () => {
    const url = typeof window !== 'undefined' ? window.location.href : ''
    if (url && navigator.clipboard) {
      navigator.clipboard.writeText(url)
    }
  }

  const [synthesisMap, setSynthesisMap] = useState<Record<string, { text: string; loading: boolean }>>({})
  const [isChapterSynthesizing, setIsChapterSynthesizing] = useState(false)
  const verseRefs = useRef<Record<number, HTMLElement | null>>({})
  const cleanText = (txt: string) => (txt || '').replace(/\\n/g, '\n')
  
  const synthesizeEntireChapter = async () => {
    setIsChapterSynthesizing(true)
    for (const verse of verses) {
       const v = verse as Record<string, unknown>
       if (synthesisMap[v.id as string]?.text) continue
       setSynthesisMap(p => ({...p, [v.id as string]: { text: '', loading: true }}))
       try {
         // Lean template: always include meaning + up to 2 commentaries (regardless of UI selection)
         const layers = v.layers as unknown[]
         const meaningLayer = layers?.find((l: unknown) => {
           const layer = l as Record<string, unknown>
           return layer.type === 'translation' && layer.lang === 'en'
         }) as Record<string, unknown> | undefined
         const meaning = String(meaningLayer?.content || v.meaning || v.translation || '')

         // Get commentaries from selected authors (or first candidates if none selected)
         const candidateCommentaries = layers?.filter((l: unknown) => {
           const layer = l as Record<string, unknown>
           if (layer.type !== 'commentary') return false
           if (!layer.author) return false
           if (languageSelection !== 'all' && layer.lang && layer.lang !== languageSelection) return false
           if (scholarSelection.length > 0) {
             return scholarSelection.includes(normalizeScholarKey(layer.author as string))
           }
           return true
         }) || []

         // Score by overlap with meaning to avoid random misaligned entries
         const scoredCommentaries = candidateCommentaries.map((c: unknown) => {
           const commentary = c as Record<string, unknown>
           return {
             ...commentary,
             _relevanceScore: calculateTextOverlapScore(meaning, commentary.content as string)
           }
         })
         .sort((a: unknown, b: unknown) => (((b as Record<string, unknown>)._relevanceScore as number) || 0) - (((a as Record<string, unknown>)._relevanceScore as number) || 0))

         let commentaries = scoredCommentaries

         // If user-selected scholars exist, limit to top 2 among them
         if (scholarSelection.length > 0) {
           commentaries = scoredCommentaries.slice(0, 2)
         } else {
           // No selection means fallback to top 2 in any language/author
           commentaries = scoredCommentaries.slice(0, 2)
         }


         const contextTexts = [meaning, ...commentaries.map((c: unknown) => (c as Record<string, unknown>).content)].filter((t: unknown) => t)
         const res = await fetch('/api/synthesize', {
           method: 'POST',
           headers: {'Content-Type': 'application/json'},
           body: JSON.stringify({ verseId: v.id, contextTexts, language: languageSelection || 'en' })
         })
         if (!res.ok) throw new Error('Synthesis API responded with status ' + res.status)
         const data = await res.json() as Record<string, unknown>
         if (data.success) {
           setSynthesisMap(p => ({...p, [v.id as string]: { text: data.synthesis as string, loading: false }}))
         } else {
           setSynthesisMap(p => ({...p, [v.id as string]: { text: 'Synthesis unavailable, try again later.', loading: false }}))
         }
       } catch {
         setSynthesisMap(p => ({...p, [v.id as string]: { text: 'Synthesis failed.', loading: false }}))
       }
    }
    setIsChapterSynthesizing(false)
  }

  const bookData = VEDIC_LIBRARY.find(b => b.slug === textSlug)
  const totalChapters = bookData?.totalChapters || 1
  const isParva = textSlug === 'mahabharata'
  const isGita = textSlug === 'bhagavad-gita'

  // Build the generic HierarchicalNav levels with visited chapter tracking
  const navLevels: LevelData[] = [
    {
      id: 'chapter',
      name: isParva ? 'Parva' : 'Chapter',
      activeValue: chapter,
      activeLabel: bookData?.chapterNames[String(chapter)] || '',
      options: Array.from({ length: totalChapters }, (_, i) => {
        const chapterNum = i + 1
        const isVisited = visitedChapters.has(chapterNum)
        return {
          value: chapterNum,
          tooltip: bookData?.chapterNames[String(chapterNum)] + (isVisited ? ' (visited)' : ''),
          href: `/${textSlug}/${chapterNum}`,
        }
      })
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
                    <span className="flex items-center gap-3 text-sm font-normal text-stone-500 mt-1">
                      <span>Parva {chapter} / Adhyaya {currentAdhyaya} of {adhyayaList.length}</span>
                      <AdhyayaShareLink textSlug={textSlug} chapter={chapter} adhyaya={activeAdhyaya} />
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
              <button
                onClick={() => {
                  const event = new CustomEvent('open-feedback', { detail: { textSlug, chapter } });
                  window.dispatchEvent(event);
                }}
                className="p-2 rounded-lg border border-stone-200 hover:border-orange-400 hover:text-orange-600 transition-all bg-white ml-2"
                title="Report an issue or give feedback"
              >
                💬
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ═══════════════════════════════════════════ TOOLBAR ═══ */}
      <div className="sticky top-16 z-40 bg-white/90 backdrop-blur-md border-b border-stone-100 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 flex items-center justify-between py-3 gap-2 sm:gap-4 flex-wrap">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 min-w-0">
            {/* Author selector - Lean template: checkboxes for up to 2 authors */}
            <div className="flex items-center gap-2 text-xs font-semibold text-stone-600">
              <span className="hidden xs:inline" data-testid="scholars-counter">Scholars ({scholarSelection.length}/{2})</span>
              <span className="inline xs:hidden text-[10px]">S</span>
              <div className="flex gap-1.5 max-w-xs overflow-x-auto">
                {availableScholars.filter(s => s !== 'none').slice(0, 5).map((author) => {
                  const meta = getScholarMeta(author)
                  const isSelected = scholarSelection.includes(author)
                  return (
                    <button
                      key={author}
                      onClick={() => toggleScholar(author)}
                      className={`px-2.5 py-1.5 rounded border text-[11px] font-medium transition-all flex-shrink-0 ${
                        isSelected
                          ? 'bg-orange-100 border-orange-300 text-orange-700'
                          : 'bg-white border-stone-200 text-stone-600 hover:border-orange-300 hover:bg-orange-50'
                      }`}
                      title={isSelected ? `Deselect ${meta.label}` : scholarSelection.length >= 2 ? `Replace oldest with ${meta.label}` : meta.bio}
                    >
                      <span>{meta.icon}</span>
                      <span className="hidden sm:inline ml-1">{meta.label}</span>
                    </button>
                  )
                })}
              </div>
              {availableScholars.filter(s => s !== 'none').length > 5 && (
                <span className="text-[10px] text-stone-400 hidden xs:inline">+{availableScholars.filter(s => s !== 'none').length - 5}</span>
              )}
            </div>

            <label className="flex items-center gap-2 text-xs font-semibold text-stone-600 flex-shrink-0">
              <span className="hidden xs:inline">Lang</span>
              <span className="inline xs:hidden text-[10px]">L</span>
              <select
                value={languageSelection}
                onChange={(e) => updateLanguage(e.target.value)}
                className="px-2 sm:px-3 py-2 border border-stone-200 rounded-lg text-xs sm:text-sm bg-white"
              >
                {availableLanguages.map((lang) => (
                  <option key={lang} value={lang}>
                    {getLanguageLabel(lang)}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            {/* Share link button */}
            <button
              onClick={copyShareLink}
              title="Copy chapter link to clipboard"
              className="p-2 rounded-lg border border-stone-200 hover:border-orange-400 hover:text-orange-600 transition-all bg-white text-stone-600"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.658 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </button>

            {/* Jump to bookmark button */}
            {bookmarks.length > 0 && (
              <button
                onClick={jumpToFirstBookmark}
                title={`Jump to first bookmark (${bookmarks.length})`}
                className="p-2 rounded-lg border border-stone-200 hover:border-orange-400 hover:text-orange-600 transition-all bg-white text-stone-600 relative"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M5 5a2 2 0 012-2h6a2 2 0 012 2v12H5V5zm8 12V5m0 12a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                {bookmarks.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {bookmarks.length}
                  </span>
                )}
              </button>
            )}

            {/* AI Synthesis button */}
            <button
              onClick={synthesizeEntireChapter}
              disabled={isChapterSynthesizing}
              className="flex-shrink-0 flex items-center gap-2 px-3 sm:px-5 py-2 bg-stone-900 hover:bg-orange-600 text-white text-xs font-bold rounded-full transition-all disabled:opacity-60"
            >
              <span>{isChapterSynthesizing ? '✨' : '🧠'}</span>
              <span className="hidden md:inline">{isChapterSynthesizing ? 'Analysing...' : 'AI Analysis'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════ VERSES ═══ */}
      <main className="bg-[#FDFBF8] min-h-screen">
        <div className="max-w-[900px] mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-8 space-y-4 sm:space-y-6">
          {/* Vedic Timeline — compact version at top */}
          <VedicTimeline slug={textSlug} />

          {/* Verses */}
          {verses.map((verse: unknown) => {
            const v = verse as Record<string, unknown>
            // Find the best "translation/meaning" layer — any English layer that's a translation, or fall back to meaning field
            const layers = v.layers as unknown[]
            const meaningLayer = layers?.find((l: unknown) => {
              const layer = l as Record<string, unknown>
              return layer.type === 'translation' && layer.lang === 'en'
            }) as Record<string, unknown> | undefined
            const meaning = String(meaningLayer?.content || v.meaning || v.translation || '')

            // Commentary layers — filter by selected scholar base key and language (Lean template: only show if explicitly selected)
            const candidateCommentaries = layers?.filter((l: unknown) => {
              const layer = l as Record<string, unknown>
              if (scholarSelection.length === 0) return false // Lean template: hide commentaries if none selected
              if (layer.type !== 'commentary') return false
              if (!layer.author || !layer.content) return false
              if (languageSelection !== 'all') {
                if (!layer.lang) return false
                if (layer.lang !== languageSelection) return false
              }
              return scholarSelection.includes(normalizeScholarKey(layer.author as string))
            }) || []

            const commentaries = candidateCommentaries
              .filter((c: unknown) => isValidCommentaryContent((c as Record<string, unknown>).content as string))
              .map((c: unknown) => {
                const commentary = c as Record<string, unknown>
                return {
                  ...commentary,
                  _relevanceScore: calculateTextOverlapScore(meaning as string, commentary.content as string),
                }
              })
              .sort((a: unknown, b: unknown) => (((b as Record<string, unknown>)._relevanceScore as number) || 0) - (((a as Record<string, unknown>)._relevanceScore as number) || 0))
              .slice(0, 2)

            const synth = synthesisMap[v.id as string]

            return (
              <article
                key={v.id as string}
                ref={el => { verseRefs.current[v.verse as number] = el as HTMLElement | null }}
                className="bg-white rounded-2xl border border-stone-100 shadow-sm hover:shadow-md hover:border-orange-100 transition-all duration-300 overflow-hidden"
              >
                {/* Verse number badge */}
                <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-stone-50 border-b border-stone-100">
                  <span className="text-xs font-black uppercase tracking-widest text-stone-400 truncate">
                    {String(isParva ? 'Śloka' : isGita ? 'BG' : 'Śloka')} {String(v.chapter)}.{String(v.verse)}
                  </span>
                  <div className="flex items-center gap-2 ml-2">
                    <button
                      onClick={() => toggleBookmark(v.id as string)}
                      title={bookmarks.includes(v.id as string) ? 'Remove bookmark' : 'Add bookmark'}
                      className={`text-lg transition-colors ${
                        bookmarks.includes(v.id as string)
                          ? 'text-orange-500 hover:text-orange-600'
                          : 'text-stone-300 hover:text-orange-400'
                      }`}
                    >
                      {bookmarks.includes(v.id as string) ? '★' : '☆'}
                    </button>
                    <button
                      onClick={() => verseRefs.current[v.verse as number]?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                      className="text-[10px] text-stone-300 hover:text-orange-400 font-bold transition-colors"
                    >
                      #
                    </button>
                  </div>
                </div>

                {/* Sanskrit */}
                {v.original ? (
                  <div className="px-4 sm:px-6 py-4 sm:py-6 text-center border-b border-stone-50 overflow-x-auto">
                    <div className="min-w-full flex justify-center">
                      <ShlokaMask text={String(v.original)} fontSize={typeof window !== "undefined" && window.innerWidth < 640 ? 16 : 22} className="sm:w-full" />
                    </div>
                    {v.transliteration ? (
                      <p className="mt-3 text-stone-400 font-serif italic text-xs sm:text-sm leading-relaxed max-w-xl mx-auto break-words">
                        {String(v.transliteration)}
                      </p>
                    ) : null}
                  </div>
                ) : null}

                {/* English meaning / translation */}
                {meaning ? (
                  <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-stone-50">
                    <p className="text-[10px] font-black uppercase tracking-widest text-stone-300 mb-2">Meaning</p>
                    <p className="text-stone-700 leading-relaxed text-sm sm:text-[15px] font-medium break-words overflow-wrap-anywhere">
                      {cleanText(meaning)}
                    </p>
                  </div>
                ) : null}

                {/* Commentary */}
                {commentaries.length > 0 ? (
                  <div className="px-4 sm:px-6 py-4 sm:py-5 bg-orange-50/30">
                    {commentaries[0]._relevanceScore !== undefined && commentaries[0]._relevanceScore < 0.12 ? (
                      <p className="text-xs text-orange-800 bg-orange-100 rounded-md p-2 mb-3">Warning: The selected commentary may not fully align with the verse meaning. We prioritize closest available match in current language.</p>
                    ) : null}
                    {commentaries.map((c: unknown, ci: number) => {
                      const comment = c as Record<string, unknown>
                      const meta = getScholarMeta(comment.author as string)
                      return (
                        <div key={ci} className={ci > 0 ? 'mt-4 sm:mt-5 pt-4 sm:pt-5 border-t border-orange-100' : ''}>
                          <div className="flex items-center gap-2 mb-2 flex-wrap">
                            <span className="text-sm">{meta.icon}</span>
                            <span className="text-[9px] font-black uppercase tracking-widest text-orange-700 break-words">{meta.label}</span>
                          </div>
                          <p className="text-stone-600 leading-relaxed text-xs sm:text-[13px] font-medium whitespace-pre-line break-words overflow-wrap-anywhere">
                            {cleanText(comment.content as string)}
                          </p>
                        </div>
                      )
                    })}
                  </div>
                ) : null}

                {/* AI Synthesis result */}
                {synth && ((synth as Record<string, unknown>)?.text || (synth as Record<string, unknown>)?.loading) ? (
                  <VedicManuscriptCard
                    content={(synth as Record<string, unknown>).loading ? 'Synthesising wisdom...' : String((synth as Record<string, unknown>).text)}
                    className="m-6 mt-0"
                  />
                ) : null}

                {/* Contextual micro-app suggestions (APP-703) */}
                <div className="px-5 sm:px-6 pb-4">
                  <VerseAppLinks bookSlug={textSlug} chapter={chapter} />
                </div>
              </article>
            )
          })}
        </div>
      </main>
    </>
  )
}
