'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import ShlokaMask from './shloka-mask'
import VedicTimeline from './vedic-timeline'
import VedicManuscriptCard from './vedic-manuscript-card'
import { VEDIC_LIBRARY } from '@/lib/texts'
import type { LevelData } from '@/components/ui/hierarchical-nav';
import HierarchicalNav from '@/components/ui/hierarchical-nav'
import VerseAppLinks from './verse-app-links'
import AdhyayaShareLink from './adhyaya-share-link'
import RatingTelemetry from './rating-telemetry'


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
  },
  // normalizeScholarKey splits on '-': 'sant-dnyaneshwar' → 'sant', 'dnyaneshwari-en' → 'dnyaneshwari'
  'sant': {
    name: 'Sant Dnyaneshwar',
    label: 'Dnyaneshwari',
    icon: '🪷',
    bio: 'Maharashtrian saint-philosopher (1275–1296 CE). Composed the Dnyaneshwari — a Marathi verse commentary on the Gita — at age 16. Founding text of the Warkari tradition.'
  },
  'dnyaneshwari': {
    name: 'Sant Dnyaneshwar',
    label: 'Dnyaneshwari',
    icon: '🪷',
    bio: 'Maharashtrian saint-philosopher (1275–1296 CE). Composed the Dnyaneshwari — a Marathi verse commentary on the Gita — at age 16. Founding text of the Warkari tradition.'
  },
  'iskcon': {
    name: 'A.C. Bhaktivedanta Swami Prabhupada',
    label: 'Prabhupada',
    icon: '🔱',
    bio: 'Founder-Acharya of ISKCON. Translator and commentator of Bhagavad-gītā As It Is. One of the most widely read Gita commentaries in the world.'
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
  const router = useRouter()

  // Normalize the author key to a stable group (e.g., dnyaneshwari-en -> dnyaneshwari)
  const normalizeScholarKey = (author: string) => (author || '').split('-')[0].toLowerCase()


  // Track reading position using Intersection Observer
  useEffect(() => {
    if (!verses || verses.length === 0) return;

    const options = {
      root: null,
      rootMargin: '-10% 0px -10% 0px',
      threshold: [0.1, 0.5, 0.9]
    };

    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          if (id && id.startsWith('verse-')) {
            const verseNum = parseInt(id.replace('verse-', ''), 10);
            if (!isNaN(verseNum)) {
              const verseIndex = verses.findIndex(v => Number((v as Record<string, unknown>).verse) === verseNum);
              setActiveVerse(verseIndex >= 0 ? verseIndex + 1 : 1);
              const readingPosition = {
                text: textSlug,
                chapter: chapter,
                verse: verseNum,
                timestamp: Date.now()
              }
              localStorage.setItem('vishwa_continue_reading', JSON.stringify(readingPosition))
              localStorage.setItem('vishwa_last_text', textSlug)
            }
          }
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);
    const currentRefs = { ...verseRefs.current };

    Object.values(currentRefs).forEach(el => {
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    }
  }, [textSlug, chapter, verses]);



  // Scroll to last read position on mount
  useEffect(() => {
    const saved = localStorage.getItem('vishwa_continue_reading')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (parsed.text === textSlug && parsed.chapter === chapter) {
          const targetVerse = parsed.verse
          // Add a small delay to ensure DOM is ready
          setTimeout(() => {
            if (verseRefs.current[targetVerse]) {
              verseRefs.current[targetVerse].scrollIntoView({ behavior: 'smooth', block: 'start' })
            }
          }, 300)
        }
      } catch {
        // ignore
      }
    }
  }, [textSlug, chapter])

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

    const scholars = new Set<string>(['none', ...Array.from(baseAuthors)])
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

  // Get display metadata for a scholar key (normalized key e.g. 'sant', 'iskcon')
  const getScholarMeta = (authorKey: string): { name: string; bio: string; label: string; icon: string } => {
    if (DEFAULT_METADATA[authorKey]) return DEFAULT_METADATA[authorKey]
    // Search layers: match exact author OR authors that start with normalizedKey + '-'
    for (const v of verses) {
      const verse = v as Record<string, unknown>
      const layers = verse.layers as unknown[]
      const layer = layers?.find((l: unknown) => {
        const a = String((l as Record<string, unknown>).author || '')
        return a === authorKey || a.startsWith(authorKey + '-')
      }) as Record<string, unknown> | undefined
      if (layer && layer.author_name) {
        return {
          name: String(layer.author_name),
          bio: String(layer.author_bio || ''),
          label: String(layer.author_label || layer.author_name),
          icon: String(layer.author_icon || '📜')
        }
      }
    }
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
    if (trimmed.length < 20) return false // Lowered threshold to catch short but valid verses
    // Reject any unresolved template marker (e.g. [PLACEHOLDER_X], [ADVAITA_PERSPECTIVE:...], [SUTRA_TEXT])
    if (trimmed.startsWith('[')) return false
    const placeholderPatterns = ['[PLACEHOLDER_', 'TBD_CONTENT', 'TODO_LAYER', 'LOREM IPSUM', 'THIS IS A GENERIC PLACEHOLDER', 'INSERTED TO SATISFY THE MINIMUM LENGTH']
    if (placeholderPatterns.some(p => trimmed.toUpperCase().includes(p.toUpperCase()))) {
      return false
    }
    return true
  }


  const defaultLanguage = 'all'

  const [scholarSelection, setScholarSelection] = useState<string[]>([])
  const [languageSelection, setLanguageSelection] = useState<string>('all')
  const [activeAdhyaya, setActiveAdhyaya] = useState<number>(currentAdhyaya || 1)
  const [bookmarks, setBookmarks] = useState<string[]>([])
  const [visitedChapters, setVisitedChapters] = useState<Set<number>>(new Set())
  const [copiedVerse, setCopiedVerse] = useState<string | null>(null)
  const [copiedLink, setCopiedLink] = useState<string | null>(null)
  const [activeVerse, setActiveVerse] = useState<number>(1)
  const [touchStartX, setTouchStartX] = useState<number | null>(null)

  const copyVerse = (v: Record<string, unknown>) => {
    const text = `${v.original}\n\n${v.transliteration}`
    navigator.clipboard.writeText(text)
    setCopiedVerse(v.id as string)
    setTimeout(() => setCopiedVerse(null), 2000)
  }

  const copyPermalink = (v: Record<string, unknown>) => {
    const url = `${window.location.origin}/${textSlug}/${chapter}/${v.verse}`
    navigator.clipboard.writeText(url)
    setCopiedLink(v.id as string)
    setTimeout(() => setCopiedLink(null), 2000)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return
    const touchEndX = e.changedTouches[0].clientX
    const diff = touchStartX - touchEndX

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        // Swipe left -> Next chapter
        const nextLink = adhyayaList.length > 0 && typeof currentAdhyaya === 'number'
          ? (currentAdhyaya < adhyayaList[adhyayaList.length - 1].num ? `/${textSlug}/${chapter}?adhyaya=${currentAdhyaya + 1}` : null)
          : (chapter < totalChapters ? `/${textSlug}/${chapter + 1}` : null);

        if (nextLink) router.push(nextLink);
      } else {
        // Swipe right -> Prev chapter
        const prevLink = adhyayaList.length > 0 && typeof currentAdhyaya === 'number'
          ? (currentAdhyaya > adhyayaList[0].num ? `/${textSlug}/${chapter}?adhyaya=${currentAdhyaya - 1}` : null)
          : (chapter > 1 ? `/${textSlug}/${chapter - 1}` : null);

        if (prevLink) router.push(prevLink);
      }
    }
    setTouchStartX(null)
  }

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
    let newSelection = [...scholarSelection].filter(s => s !== 'none')
    if (newSelection.includes(author)) {
      newSelection = newSelection.filter(a => a !== author)
    } else {
      // Max 2 authors (irrespective of language)
      if (newSelection.length < 2) {
        newSelection.push(author)
      } else {
        // Replace oldest valid selection
        newSelection = [newSelection[1], author]
      }
    }
    // Final check for 'none' fallback
    if (newSelection.length === 0) newSelection = ['none']

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
  const [_isChapterSynthesizing, _setIsChapterSynthesizing] = useState(false)
  const verseRefs = useRef<Record<number, HTMLElement | null>>({})
  const cleanText = (txt: string) => (txt || '').replace(/\\n/g, '\n')
  
  const _synthesizeEntireChapter = async () => {
    _setIsChapterSynthesizing(true)
    for (const verse of verses) {
       const v = verse as Record<string, unknown>
       if (synthesisMap[v.id as string]?.text) continue
       setSynthesisMap(p => ({...p, [v.id as string]: { text: '', loading: true }}))
       try {
         // Lean template: always include meaning + up to 2 commentaries (regardless of UI selection)
         const layers = v.layers as unknown[]
         const meaningLayer = layers?.find((l: unknown) => {
           const layer = l as Record<string, unknown>
           return (layer.type === 'translation' || layer.type === 'meaning') && layer.lang === 'en'
         }) as Record<string, unknown> | undefined
         // Fallback chain: translation-type layer → verse-level meaning → verse-level translation
         // All three checked so future data format changes don't silently produce empty synthesis context
         const meaningCandidate = String(meaningLayer?.content ?? v.meaning ?? v.translation ?? '')
         const meaning = isValidCommentaryContent(meaningCandidate) ? meaningCandidate : ''

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
         const controller = new AbortController()
         const timeoutId = setTimeout(() => controller.abort(), 15_000)
         let res: Response | null = null
         try {
           res = await fetch('/api/synthesize', {
             method: 'POST',
             headers: {'Content-Type': 'application/json'},
             body: JSON.stringify({ verseId: v.id, contextTexts, language: languageSelection || 'en' }),
             signal: controller.signal
           })
         } finally {
           clearTimeout(timeoutId)
         }
         if (!res || !res.ok) throw new Error('Synthesis API responded with status ' + (res?.status ?? 'unknown'))
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
    _setIsChapterSynthesizing(false)
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
      <header className="bg-white dark:bg-[#1c1917] border-b border-stone-100 dark:border-stone-800 pt-3 pb-3 overflow-visible relative">
        {/* Soft warm glow — top right only */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-orange-50 dark:bg-orange-950/20 rounded-full blur-[90px] -mr-40 -mt-20 opacity-60 pointer-events-none" />

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 relative z-10">

          {/* 3-column header row: back | title | nav — Optimized for mobile with flex-shifting */}
          <div className="flex flex-col lg:grid lg:grid-cols-[200px_1fr_200px] items-center gap-4 lg:gap-3 py-1">

            <div className="flex w-full justify-between items-center lg:justify-start">
              <Link
                href="/"
                className="text-[10px] font-bold uppercase tracking-[0.3em] text-orange-500 hover:text-orange-600 transition-colors flex items-center gap-1 whitespace-nowrap"
              >
                &larr; Library
              </Link>
              {/* Mobile next/prev shorthand */}
              <div className="flex lg:hidden items-center gap-2">
                <HierarchicalNav levels={navLevels} />
              </div>
            </div>

            {/* CENTER — book title */}
            <div className="flex flex-col items-center justify-center text-center min-w-0 px-2">
              <h1 className="text-sm sm:text-base md:text-lg font-serif font-black text-stone-800 dark:text-stone-100 tracking-wide uppercase leading-tight line-clamp-1 sm:truncate max-w-full">
                {bookData?.name || textSlug}
              </h1>
              {bookData?.chapterNames?.[String(chapter)] && (
                <p className="text-[9px] sm:text-[10px] font-bold text-stone-400 dark:text-stone-500 mt-0.5 tracking-[0.1em] uppercase line-clamp-1 sm:truncate max-w-full">
                  {bookData.chapterNames[String(chapter)]}
                </p>
              )}
              {isParva && currentAdhyaya && adhyayaList && adhyayaList.length > 0 && (
                <span className="flex items-center justify-center gap-2 text-[10px] font-normal text-stone-400 dark:text-stone-500 mt-0.5">
                  <span>Parva {chapter} · Adhyaya {currentAdhyaya} of {adhyayaList.length}</span>
                  <AdhyayaShareLink textSlug={textSlug} chapter={chapter} adhyaya={activeAdhyaya} />
                </span>
              )}
            </div>

            {/* RIGHT — chapter nav + prev/next (hidden on mobile header top row, handled by HierarchicalNav middle column instead or right column) */}
            <div className="hidden lg:flex items-center gap-1.5 flex-shrink-0 justify-end">
              <button
                onClick={() => router.push(`/${textSlug}/${Math.max(1, chapter - 1)}`)}
                disabled={chapter === 1}
                className="p-1.5 rounded-lg border border-stone-200 dark:border-stone-700 hover:border-orange-400 hover:text-orange-600 dark:hover:border-orange-500 disabled:opacity-30 transition-all bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300"
                aria-label="Previous chapter"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M15 19l-7-7 7-7" /></svg>
              </button>
              <HierarchicalNav levels={navLevels} />
              <button
                onClick={() => router.push(`/${textSlug}/${chapter + 1}`)}
                disabled={chapter >= totalChapters}
                className="p-1.5 rounded-lg border border-stone-200 dark:border-stone-700 hover:border-orange-400 hover:text-orange-600 dark:hover:border-orange-500 disabled:opacity-30 transition-all bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300"
                aria-label="Next chapter"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ═══════════════════════════════════════════ TOOLBAR ═══ */}
      <div className="sticky top-[3.5rem] z-40 bg-white/90 dark:bg-stone-900/90 backdrop-blur-md border-b border-stone-100 dark:border-stone-800 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-3 sm:px-6 flex flex-col md:flex-row items-center justify-between py-2.5 gap-3 md:gap-2">

          {/* Left group — progress + scholars + language */}
          <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-1.5 md:pb-0 scrollbar-none">

            {/* Progress indicator */}
            <div className="flex items-center px-2 py-0.5 bg-stone-100 dark:bg-stone-800 rounded-full text-[10px] sm:text-[11px] font-medium text-stone-500 dark:text-stone-400 flex-shrink-0">
              <span className="whitespace-nowrap" data-testid="chapter-progress">
                {activeVerse} / {verses.length}
              </span>
            </div>

            {/* Divider */}
            <div className="hidden sm:block w-px h-4 bg-stone-200 dark:bg-stone-700 flex-shrink-0" />

            {/* Scholar selector prominence */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <span data-testid="scholars-counter" className="text-[10px] font-black uppercase tracking-widest text-orange-500/60 dark:text-orange-400/40 hidden xs:inline">Scholars {scholarSelection.length}/2</span>
              <div className="flex gap-1" role="group" aria-label="Scholar Selection">
                {availableScholars.filter(s => s !== 'none').map((author, _idx, _arr) => {
                  const meta = getScholarMeta(author)
                  const isSelected = scholarSelection.includes(author)
                  return (
                    <button
                      key={author}
                      id={`scholar-btn-${author}`}
                      role="switch"
                      aria-checked={isSelected}
                      aria-label={`Toggle commentary by ${meta.label}`}
                      onClick={() => toggleScholar(author)}
                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleScholar(author) } }}
                      className={`px-3 py-1.5 rounded-xl border text-[11px] font-bold transition-all flex-shrink-0 flex items-center gap-2 ${
                        isSelected
                           ? 'bg-orange-600 border-orange-600 text-white shadow-lg shadow-orange-200 dark:shadow-none'
                           : 'bg-white dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 font-black'
                      }`}
                    >
                      <span className="text-xs">{meta.icon}</span>
                      <span className="hidden xs:inline text-[9px] uppercase tracking-tighter">{meta.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Divider */}
            <div className="w-px h-4 bg-stone-200 dark:bg-stone-700 flex-shrink-0" />

            {/* Language selector */}
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500 hidden sm:inline">Lang</span>
              <div className="flex gap-0.5 bg-stone-100 dark:bg-stone-800 p-0.5 rounded-lg border border-stone-200 dark:border-stone-700" role="group" aria-label="Language selection">
                {availableLanguages.map((lang) => {
                  const isSelected = languageSelection === lang
                  return (
                    <button
                      key={lang}
                      onClick={() => updateLanguage(lang)}
                      className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-tight transition-all ${
                        isSelected
                          ? 'bg-white dark:bg-stone-700 text-orange-600 dark:text-orange-400 shadow-sm'
                          : 'text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-300'
                      }`}
                    >
                      {lang === 'all' ? 'All' : lang.toUpperCase()}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Right group — actions */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-end flex-wrap">
            <div className="flex items-center gap-1.5">
              {/* Share link button */}
              <button
                onClick={copyShareLink}
                title="Copy chapter link to clipboard"
                className="p-1.5 rounded-lg border border-stone-200 dark:border-stone-700 hover:border-orange-400 hover:text-orange-600 dark:hover:border-orange-500 transition-all bg-white dark:bg-stone-800 text-stone-500 dark:text-stone-400"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.658 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </button>

              {/* Jump to bookmark button */}
              {bookmarks.length > 0 && (
                <button
                  onClick={jumpToFirstBookmark}
                  title={`Jump to first bookmark (${bookmarks.length})`}
                  className="p-1.5 rounded-lg border border-stone-200 dark:border-stone-700 hover:border-orange-400 hover:text-orange-600 dark:hover:border-orange-500 transition-all bg-white dark:bg-stone-800 text-stone-500 dark:text-stone-400 relative"
                >
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M5 5a2 2 0 012-2h6a2 2 0 012 2v12H5V5zm8 12V5m0 12a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                  <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {bookmarks.length}
                  </span>
                </button>
              )}
            </div>

            {/* AI Synthesis button */}
            <button
              onClick={_synthesizeEntireChapter}
              disabled={_isChapterSynthesizing}
              aria-label={_isChapterSynthesizing ? 'Analysing' : 'Generate AI Synthesis for entire chapter'}
              title="Generate AI Synthesis for entire chapter"
              className="px-3 py-1.5 rounded-xl border text-[11px] font-bold transition-all flex-shrink-0 flex items-center gap-1.5 bg-white dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:border-orange-400 hover:text-orange-600 disabled:opacity-50"
            >
              {_isChapterSynthesizing ? 'Analysing…' : 'Generate AI Synthesis for entire chapter'}
            </button>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════ VERSES ═══ */}
      <main className="bg-[#FDFBF8] dark:bg-[#121212] min-h-screen" data-testid="study-container" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
        <div className="max-w-[1400px] mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-8 flex lg:gap-8 justify-center items-start">
          <div className="w-full max-w-[900px] space-y-4 sm:space-y-6">
          {/* Vedic Timeline — compact version at top */}
          <VedicTimeline slug={textSlug} />

          {/* Single relevance warning banner — shown once if any commentary has low alignment */}
          {scholarSelection.length > 0 && (() => {
            const hasLowRelevance = verses.some((verse: unknown) => {
              const v = verse as Record<string, unknown>
              const layers = (v.layers as unknown[]) || []
              const meaning = String(v.translation || v.meaning || '')
              return layers.some((l: unknown) => {
                const layer = l as Record<string, unknown>
                if (layer.type !== 'commentary' || !isValidCommentaryContent(layer.content as string)) return false
                if (!scholarSelection.includes(normalizeScholarKey(layer.author as string))) return false
                return calculateTextOverlapScore(meaning, layer.content as string) < 0.12
              })
            })
            return hasLowRelevance ? (
              <p className="text-xs text-orange-800 bg-orange-100 dark:text-orange-200 dark:bg-orange-900/40 rounded-lg px-4 py-2">
                Note: Some commentaries in this chapter may not closely align with the verse translation — we display the closest available match in the selected language.
              </p>
            ) : null
          })()}

          {/* Verses */}
          {[...verses].sort((a: unknown, b: unknown) => {
            const av = parseInt(String((a as Record<string, unknown>).verse ?? 0), 10)
            const bv = parseInt(String((b as Record<string, unknown>).verse ?? 0), 10)
            return av - bv
          }).map((verse: unknown) => {
            const v = verse as Record<string, unknown>
            const layers = (v.layers || []) as Record<string, unknown>[]
            const meaning = String(v.translation || '')

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

            const LANG_ORDER = ['en', 'hi', 'mr']
            const commentaries = candidateCommentaries
              .filter((c: unknown) => isValidCommentaryContent((c as Record<string, unknown>).content as string))
              .map((c: unknown) => {
                const commentary = c as Record<string, unknown>
                return {
                  ...commentary,
                  _relevanceScore: calculateTextOverlapScore(meaning as string, commentary.content as string),
                }
              })
              .sort((a: unknown, b: unknown) => {
                const al = a as Record<string, unknown>
                const bl = b as Record<string, unknown>
                if (languageSelection === 'all') {
                  // Group by lang first (en → hi → mr), then by relevance within group
                  const langDiff = LANG_ORDER.indexOf(al.lang as string) - LANG_ORDER.indexOf(bl.lang as string)
                  if (langDiff !== 0) return langDiff
                }
                return ((bl._relevanceScore as number) || 0) - ((al._relevanceScore as number) || 0)
              })
              .slice(0, languageSelection === 'all' ? 6 : 2)

            const synth = synthesisMap[v.id as string]

            return (
              <article
                id={`verse-${v.verse}`}
                key={v.id as string}
                ref={el => { verseRefs.current[v.verse as number] = el as HTMLElement | null }}
                className="bg-white dark:bg-[#121212] rounded-2xl border border-stone-100 dark:border-stone-800/80 shadow-sm hover:shadow-md dark:shadow-none hover:border-orange-100 dark:hover:border-orange-900/50 transition-all duration-300 overflow-hidden"
              >
                {/* Verse number badge */}
                <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-stone-50 dark:bg-stone-900/40 border-b border-stone-100 dark:border-stone-800/50">
                  <span className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-stone-400 dark:text-stone-500 truncate">
                    {String(isParva ? 'Śloka' : isGita ? 'BG' : 'Śloka')} {String(v.chapter || (v.id as string).split('_')[1] || '?')}.{String(v.verse ?? (v.id as string).split('_')[2] ?? '?')}
                    {(v.verse as number) === 0 && (
                      <span className="text-[10px] font-black uppercase tracking-widest text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/50 px-2 py-0.5 rounded-full">
                        Śānti Pāṭha
                      </span>
                    )}
                  </span>
                  <div className="flex items-center gap-2 ml-2">
                    <button
                      onClick={() => copyPermalink(v as Record<string, unknown>)}
                      title="Copy permalink"
                      className="text-stone-300 hover:text-orange-400 text-xs font-bold transition-colors uppercase tracking-widest mr-2 focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:outline-none"
                    >
                      {copiedLink === v.id ? 'Link Copied!' : 'Link'}
                    </button>
                    <button
                      onClick={() => copyVerse(v as Record<string, unknown>)}
                      title="Copy verse"
                      className="text-stone-300 hover:text-orange-400 text-xs font-bold transition-colors uppercase tracking-widest mr-2 focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:outline-none"
                    >
                      {copiedVerse === v.id ? 'Copied!' : 'Copy'}
                    </button>
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

                {/* Contextual intro — collapsed by default; shown when verse has a context/intro field */}
                {(v.context || v.intro) ? (
                  <details className="px-4 sm:px-6 py-2 border-b border-stone-50 dark:border-stone-800/30 group">
                    <summary className="cursor-pointer list-none flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-stone-400 dark:text-stone-500 hover:text-orange-500 dark:hover:text-orange-400 transition-colors select-none">
                      <span className="group-open:rotate-90 transition-transform inline-block">▶</span>
                      Context
                    </summary>
                    <p className="mt-2 mb-1 text-stone-500 dark:text-stone-400 text-xs sm:text-[13px] leading-relaxed">
                      {String(v.context || v.intro)}
                    </p>
                  </details>
                ) : null}

                {/* Sanskrit */}
                {v.original ? (
                  <div className="px-4 sm:px-6 py-4 sm:py-6 text-center border-b border-stone-50 dark:border-stone-800/30 overflow-x-auto">
                    <div className="min-w-full flex justify-center">
                      <ShlokaMask text={String(v.original)} className="sm:w-full" />
                    </div>
                    {v.transliteration ? (
                      <p className="mt-3 text-stone-400 font-serif italic text-xs sm:text-sm leading-relaxed max-w-xl mx-auto break-words">
                        {String(v.transliteration)}
                      </p>
                    ) : null}
                  </div>
                ) : null}

                {/* English translation — always shown as default base layer */}
                {(() => {
                  const baseTranslation = String(v.translation || v.meaning || '').trim()
                  // Reject empty strings and known placeholder patterns; length check skipped
                  // (base translations can legitimately be short, e.g. sutras or mantras)
                  const knownBadPatterns = ['[PLACEHOLDER_', 'TBD_CONTENT', 'TODO_LAYER', 'LOREM IPSUM', 'THIS IS A GENERIC PLACEHOLDER', 'INSERTED TO SATISFY THE MINIMUM LENGTH']
                  const isPlaceholder = !baseTranslation || baseTranslation.startsWith('[') || knownBadPatterns.some(p => baseTranslation.toUpperCase().includes(p.toUpperCase()))
                  if (isPlaceholder) return null
                  return (
                    <div className="px-4 sm:px-6 py-4 sm:py-8 border-b border-stone-50 dark:border-stone-800/30 bg-white dark:bg-stone-900/10">
                      <p className="text-[10px] font-black uppercase tracking-widest text-orange-500 dark:text-orange-600 mb-3 ml-0.5">Universal Translation</p>
                      <p className="text-stone-800 dark:text-stone-100 leading-relaxed text-[15px] sm:text-[17px] font-serif font-medium break-words overflow-wrap-anywhere">
                        {cleanText(baseTranslation)}
                      </p>
                    </div>
                  )
                })()}

                {/* Commentary */}
                {commentaries.length > 0 ? (
                  <div className="px-4 sm:px-6 py-4 sm:py-5 bg-orange-50/30 dark:bg-orange-950/20">
                    {(() => {
                      const LANG_LABELS: Record<string, string> = { en: 'English', hi: 'हिन्दी', mr: 'मराठी' }
                      if (languageSelection !== 'all') {
                        return commentaries.map((c: unknown, ci: number) => {
                          const comment = c as Record<string, unknown>
                          const meta = getScholarMeta(normalizeScholarKey(comment.author as string))
                          return (
                            <div key={ci} className={ci > 0 ? 'mt-4 sm:mt-5 pt-4 sm:pt-5 border-t border-orange-100 dark:border-orange-500/10' : ''}>
                              <div className="flex items-center gap-2 mb-2 flex-wrap">
                                <span className="text-sm">{meta.icon}</span>
                                <span className="text-[9px] font-black uppercase tracking-widest text-orange-700 dark:text-orange-500 break-words">{meta.label}</span>
                              </div>
                              <p className="text-stone-600 dark:text-stone-400 leading-relaxed text-xs sm:text-[13px] font-medium whitespace-pre-line break-words overflow-wrap-anywhere">
                                {cleanText(comment.content as string)}
                              </p>
                              <div className="mt-3">
                                <RatingTelemetry verseId={v.id as string} scholarId={comment.author as string} language={(comment.lang as string) || 'en'} />
                              </div>
                            </div>
                          )
                        })
                      }
                      // All-languages: group by lang with subheadings
                      const groups: Record<string, Record<string, unknown>[]> = {}
                      commentaries.forEach((c: unknown) => {
                        const comment = c as Record<string, unknown>
                        const lang = (comment.lang as string) || 'en'
                        if (!groups[lang]) groups[lang] = []
                        groups[lang].push(comment)
                      })
                      return Object.entries(groups).map(([lang, items], gi) => (
                        <div key={lang} className={gi > 0 ? 'mt-5 pt-5 border-t border-orange-100 dark:border-orange-500/10' : ''}>
                          <p className="text-[9px] font-black uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-3">
                            {LANG_LABELS[lang] || lang.toUpperCase()}
                          </p>
                          {items.map((comment, ci) => {
                            const meta = getScholarMeta(normalizeScholarKey(comment.author as string))
                            return (
                              <div key={ci} className={ci > 0 ? 'mt-3 pt-3 border-t border-orange-50 dark:border-orange-500/5' : ''}>
                                <div className="flex items-center gap-2 mb-2 flex-wrap">
                                  <span className="text-sm">{meta.icon}</span>
                                  <span className="text-[9px] font-black uppercase tracking-widest text-orange-700 dark:text-orange-500 break-words">{meta.label}</span>
                                </div>
                                <p className="text-stone-600 dark:text-stone-400 leading-relaxed text-xs sm:text-[13px] font-medium whitespace-pre-line break-words overflow-wrap-anywhere">
                                  {cleanText(comment.content as string)}
                                </p>
                                <div className="mt-3">
                                  <RatingTelemetry verseId={v.id as string} scholarId={comment.author as string} language={lang} />
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      ))
                    })()}
                  </div>
                ) : (scholarSelection.length > 0 && !scholarSelection.includes('none') && (
                  <div className="px-4 sm:px-6 py-4 bg-stone-50/50 dark:bg-stone-800/20">
                    <p className="text-[10px] text-stone-400 dark:text-stone-500 font-bold italic tracking-wide">
                      Commentary unavailable for selected scholar(s) in {getLanguageLabel(languageSelection).toLowerCase()}. 
                      Try switching to 'All' languages or selecting a different scholar.
                    </p>
                  </div>
                ))}

                {/* AI Synthesis result */}
                {synth && ((synth as Record<string, unknown>)?.text || (synth as Record<string, unknown>)?.loading) ? (
                  <VedicManuscriptCard
                    content={(synth as Record<string, unknown>).loading ? 'Synthesising wisdom...' : String((synth as Record<string, unknown>).text)}
                    className="m-6 mt-0"
                  />
                ) : null}

              </article>
            )
          })}
          </div>
          
          {/* Desktop Sidebar (UI-715) */}
          <aside className="hidden xl:block w-[320px] flex-shrink-0 sticky top-24 space-y-4 pt-12">
            
            {/* Contextual interactive tools (Dynamic Tags) */}
            <div className="bg-white dark:bg-[#121212] rounded-2xl border border-stone-200 dark:border-stone-800 p-6 shadow-sm">
               <h3 className="text-[10px] font-black uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-4">Interactive Tools</h3>
               <VerseAppLinks bookSlug={textSlug} chapter={chapter} />
            </div>
            <div className="bg-orange-50/50 dark:bg-orange-950/10 rounded-2xl border border-orange-100 dark:border-orange-900/30 p-5 text-center">
              <span className="text-2xl mb-2 block">🧠</span>
              <p className="text-[11px] font-bold text-orange-800 dark:text-orange-400 mb-1 tracking-wide">Vishwa-Vani Cognitive UI</p>
              <p className="text-[10px] text-orange-600/70 dark:text-orange-500/70">Secure AI Synthesis is coming soon. Authenticated users will be able to synthesize all verses into unified philosophical summaries.</p>
            </div>
          </aside>
        </div>
      </main>
    </>
  )
}
