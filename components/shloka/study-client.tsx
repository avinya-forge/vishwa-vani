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
import SemanticExplorerDrawer from './semantic-explorer-drawer'
import VerseBaseTranslation from './verse-base-translation'
import VerseCommentarySection from './verse-commentary-section'


// 🏛️ DYNAMIC PERSPECTIVE METADATA
const DEFAULT_METADATA: Record<string, { name: string, bio: string, label: string, icon: string }> = {
  'none': {
    name: 'Original Text Only',
    label: 'Text Only',
    icon: '',
    bio: 'Pure scripture — Sanskrit shloka and its meaning, without external commentary.'
  },
  'all': {
    name: 'All Commentaries',
    label: 'All Scholars',
    icon: '',
    bio: 'Compare all available scholarly perspectives side by side.'
  },
  // normalizeScholarKey splits on '-': 'sant-dnyaneshwar' → 'sant', 'dnyaneshwari-en' → 'dnyaneshwari'
  'sant': {
    name: 'Sant Dnyaneshwar',
    label: 'Dnyaneshwari',
    icon: '',
    bio: 'Maharashtrian saint-philosopher (1275–1296 CE). Composed the Dnyaneshwari — a Marathi verse commentary on the Gita — at age 16. Founding text of the Warkari tradition.'
  },
  'dnyaneshwari': {
    name: 'Sant Dnyaneshwar',
    label: 'Dnyaneshwari',
    icon: '',
    bio: 'Maharashtrian saint-philosopher (1275–1296 CE). Composed the Dnyaneshwari — a Marathi verse commentary on the Gita — at age 16. Founding text of the Warkari tradition.'
  },
  'iskcon': {
    name: 'A.C. Bhaktivedanta Swami Prabhupada',
    label: 'Prabhupada',
    icon: '',
    bio: 'Founder-Acharya of ISKCON. Translator and commentator of Bhagavad-Gītā As It Is. One of the most widely read Gita commentaries in the world.'
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

    let timeoutId: NodeJS.Timeout;

    const options = {
      root: null,
      rootMargin: '-20% 0px -40% 0px',
      threshold: 0.5 // Fire only when 50% visible, not 21 times!
    };

    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          if (id && id.startsWith('verse-')) {
            const verseNum = parseInt(id.replace('verse-', ''), 10);
            if (!isNaN(verseNum)) {
              const verseIndex = verses.findIndex(v => Number((v as Record<string, unknown>).verse) === verseNum);
              
              // Debounce the state update and localstorage write
              clearTimeout(timeoutId);
              timeoutId = setTimeout(() => {
                setActiveVerse(verseIndex >= 0 ? verseIndex + 1 : 1);
                const readingPosition = {
                  text: textSlug,
                  chapter: chapter,
                  verse: verseNum,
                  timestamp: Date.now()
                }
                localStorage.setItem('vishwa_continue_reading', JSON.stringify(readingPosition))
                localStorage.setItem('vishwa_last_text', textSlug)
              }, 150);
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
      clearTimeout(timeoutId);
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
    const langs = new Set<string>(['en'])
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
    return { name: authorKey, label: authorKey, icon: '', bio: '' }
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


  const defaultLanguage = 'en'

  const [isStudyDrawerOpen, setIsStudyDrawerOpen] = useState(false)
  const [studyDrawerTab, setStudyDrawerTab] = useState<'labs' | 'tools'>('labs')
  const [scholarSelection, setScholarSelection] = useState<string[]>([])
  const [languageSelection, setLanguageSelection] = useState<string>('en')
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

  const _toggleScholar = (author: string) => {
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
  const [drawerOpenForVerse, setDrawerOpenForVerse] = useState<string | null>(null)
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
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ HEADER ━━━━━━━━━━━━━━━━ */}
            <header className="glass border-b border-stone-100/50 dark:border-stone-800/50 pt-3 pb-3 overflow-visible relative z-30">
        <div className="absolute top-0 right-0 w-80 h-80 bg-orange-50 dark:bg-orange-950/20 rounded-full blur-[90px] -mr-40 -mt-20 opacity-60 pointer-events-none" />
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex items-center justify-between gap-4 py-1">
            <div className="flex items-center gap-2 lg:w-1/3">
              <Link
                href="/"
                className="hidden lg:flex text-[10px] font-bold uppercase tracking-[0.3em] text-orange-500 hover:text-orange-600 transition-colors items-center gap-1 whitespace-nowrap mr-4"
              >
                &larr; Library
              </Link>
              <button
                onClick={() => router.push(`/${textSlug}/${Math.max(1, chapter - 1)}`)}
                disabled={chapter === 1}
                className="px-3 py-1.5 rounded-lg border border-stone-200/50 dark:border-stone-700/50 hover:border-orange-400 hover:text-orange-600 dark:hover:border-orange-500 disabled:opacity-30 transition-all bg-white/50 dark:bg-stone-800/50 text-stone-600 dark:text-stone-300 flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider"
                aria-label="Previous chapter"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M15 19l-7-7 7-7" /></svg>
                <span className="hidden sm:inline">Back</span>
              </button>
            </div>
            <div className="flex flex-col items-center justify-center text-center min-w-0 lg:w-1/3">
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
                  <span>Parva {chapter} • Adhyaya {currentAdhyaya} of {adhyayaList.length}</span>
                  <AdhyayaShareLink textSlug={textSlug} chapter={chapter} adhyaya={activeAdhyaya} />
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 justify-end lg:w-1/3">
              <HierarchicalNav levels={navLevels} />
              <button
                onClick={() => router.push(`/${textSlug}/${chapter + 1}`)}
                disabled={chapter >= totalChapters}
                className="px-3 py-1.5 rounded-lg border border-stone-200/50 dark:border-stone-700/50 hover:border-orange-400 hover:text-orange-600 dark:hover:border-orange-500 disabled:opacity-30 transition-all bg-white/50 dark:bg-stone-800/50 text-stone-600 dark:text-stone-300 flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider"
                aria-label="Next chapter"
              >
                <span className="hidden sm:inline">Next</span>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ TOOLBAR ━━━━━━━━━━━━━━━ */}
      <div className="sticky top-[3.5rem] z-40 glass border-b border-stone-100/50 dark:border-stone-800/50 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-3 sm:px-6 flex flex-col md:flex-row items-center justify-between py-2.5 gap-3 md:gap-2">

          {/* Left group — progress + commentary toggles */}
          <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-1.5 md:pb-0 scrollbar-none">

            {/* Progress indicator */}
            <div className="flex items-center px-2 py-0.5 bg-stone-100 dark:bg-stone-800 rounded-full text-[10px] sm:text-[11px] font-medium text-stone-500 dark:text-stone-400 flex-shrink-0">
              <span className="whitespace-nowrap" data-testid="chapter-progress">
                {activeVerse} / {verses.length}
              </span>
            </div>

            {/* Divider */}
            <div className="hidden sm:block w-px h-4 bg-stone-200 dark:bg-stone-700 flex-shrink-0" />

            {/* Commentary Toggle & Filters */}
            <div className="flex items-center gap-2 flex-shrink-0 bg-stone-50 dark:bg-stone-800/50 p-1 rounded-xl border border-stone-200 dark:border-stone-700">
              
              <button
                onClick={() => setScholarSelection(scholarSelection.length > 0 ? [] : [availableScholars.filter(s => s !== 'none')[0] || 'none'])}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wide flex items-center gap-2 transition-all ${
                  scholarSelection.length > 0 
                  ? 'bg-orange-600 text-white shadow-sm' 
                  : 'bg-white dark:bg-stone-800 text-stone-500 hover:text-stone-700 dark:hover:text-stone-300'
                }`}
              >
                <div className={`w-1.5 h-1.5 rounded-full ${scholarSelection.length > 0 ? 'bg-white' : 'bg-stone-400'}`} />
                Commentary
              </button>

              {scholarSelection.length > 0 && (
                <>
                  <div className="w-px h-4 bg-stone-300 dark:bg-stone-600 mx-1" />
                  
                  {/* Language Selector */}
                  <div className="flex gap-0.5 bg-stone-100 dark:bg-stone-800 p-0.5 rounded-lg">
                    {availableLanguages.filter(l => l !== 'all').map((lang) => (
                      <button
                        key={lang}
                        onClick={() => updateLanguage(lang)}
                        className={`px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-tight transition-all ${
                          languageSelection === lang
                            ? 'bg-white dark:bg-stone-700 text-orange-600 dark:text-orange-400 shadow-sm'
                            : 'text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-300'
                        }`}
                      >
                        {lang.toUpperCase()}
                      </button>
                    ))}
                  </div>

                  <div className="w-px h-4 bg-stone-300 dark:bg-stone-600 mx-1" />

                  {/* Scholar Selector */}
                                    <div className="flex gap-2 items-center" role="group" aria-label="Scholar Selection">
                    <select
                      value={scholarSelection[0] || 'none'}
                      onChange={(e) => _updateScholar(e.target.value === "none" ? [] : [e.target.value])}
                      className="bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 rounded-lg px-2 py-1 text-xs outline-none focus:border-orange-400"
                    >
                      <option value="none">Select Commentary</option>
                      {availableScholars.filter(s => s !== 'none').map(author => {
                        const meta = getScholarMeta(author)
                        return (
                          <option key={author} value={author}>
                            {meta.label}
                          </option>
                        )
                      })}
                    </select>
                  </div>
                </>
              )}
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

            {/* Vedic Labs & Tools Drawer triggers */}
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <button
                onClick={() => { setStudyDrawerTab('labs'); setIsStudyDrawerOpen(true); }}
                title="Open Vedic Labs"
                className="px-2.5 py-1.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:text-orange-600 hover:border-orange-400 dark:hover:border-orange-500 text-[11px] font-bold flex items-center gap-1.5 transition-all shadow-sm"
              >
                <span>🧪</span>
                <span className="hidden sm:inline">Vedic Labs</span>
              </button>
              <button
                onClick={() => { setStudyDrawerTab('tools'); setIsStudyDrawerOpen(true); }}
                title="Open Chapter Tools"
                className="px-2.5 py-1.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:text-orange-600 hover:border-orange-400 dark:hover:border-orange-500 text-[11px] font-bold flex items-center gap-1.5 transition-all shadow-sm"
              >
                <span>🛠️</span>
                <span className="hidden sm:inline">Tools</span>
              </button>
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

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ VERSES ━━━━━━━━━━━━━━━━ */}
      <main className="bg-[#FDFBF8] dark:bg-[#121212] min-h-screen vedic-bg-shimmer" data-testid="study-container" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
        <div className="max-w-4xl lg:max-w-4xl xl:max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
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
              <p className="text-xs text-orange-800 bg-orange-100 dark:text-orange-200 dark:bg-orange-900/40 rounded-lg px-4 py-2 mt-4 mb-2">
                Note: Some commentaries in this chapter may not closely align with the verse translation — we display the closest available match in the selected language.
              </p>
            ) : null
          })()}

          {/* Verses Grid */}
          <div className="space-y-8 sm:space-y-12 mt-8 sm:mt-10">
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
                className="card-premium overflow-hidden"
              >
                {/* Verse number badge */}
                <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-stone-50 dark:bg-stone-900/40 border-b border-stone-100 dark:border-stone-800/50">
                  <span className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-stone-400 dark:text-stone-500 truncate">
                    {String(isParva ? 'Śloka' : isGita ? 'BG' : 'Śloka')} {String(v.chapter || (v.id as string).split('_')[1] || '?')}.{String(v.verse ?? (v.id as string).split('_')[2] ?? '?')}
                    {(v.verse as number) === 0 && (
                      <span className="text-[10px] font-black uppercase tracking-widest text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/50 px-2 py-0.5 rounded-full">
                        ÅšÄnti PÄá¹­ha
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
                      className="text-[10px] text-stone-300 hover:text-orange-400 font-bold transition-colors mr-2"
                    >
                      #
                    </button>
                    <button
                      onClick={() => setDrawerOpenForVerse(v.id as string)}
                      title="Explore Semantic Links"
                      className="text-stone-300 hover:text-orange-400 text-xs font-bold transition-colors uppercase tracking-widest focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:outline-none"
                    >
                      🔗 Links
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
                  <div className="px-5 sm:px-8 py-8 sm:py-12 text-center border-b border-stone-100/50 dark:border-stone-800/50 overflow-x-auto bg-transparent">
                    <div className="min-w-full flex justify-center mb-8">
                      <ShlokaMask text={String(v.original)} className="sm:w-full scale-[1.08] transform origin-center transition-transform drop-shadow-sm" />
                    </div>
                    {v.transliteration ? (
                      <p className="mt-8 text-stone-600/90 dark:text-stone-300/90 font-serif italic text-[16px] sm:text-[20px] leading-[2] max-w-2xl mx-auto break-words tracking-wider text-pretty">
                        {String(v.transliteration)}
                      </p>
                    ) : null}
                  </div>
                ) : null}

                {/* Universal Translation (Always in English) */}
                <VerseBaseTranslation
                  baseTranslation={String(v.translation || v.meaning || '')}
                  cleanText={cleanText}
                />

                {/* Regional Direct Meaning (if selected language is not EN) */}
                {languageSelection !== 'en' && (
                  <div className="px-4 sm:px-6 pb-2">
                    <p className="text-[10px] font-black uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-2">
                      {getLanguageLabel(languageSelection)} Meaning
                    </p>
                    <VerseBaseTranslation
                      baseTranslation={String(
                        languageSelection === 'hi' ? v.translation_hi || v.meaning_hi : 
                        languageSelection === 'mr' ? v.translation_mr || v.meaning_mr : ''
                      )}
                      cleanText={cleanText}
                    />
                  </div>
                )}

                {/* Commentary */}
                <VerseCommentarySection
                  commentaries={commentaries}
                  languageSelection={languageSelection}
                  scholarSelection={scholarSelection}
                  getScholarMeta={getScholarMeta}
                  normalizeScholarKey={normalizeScholarKey}
                  getLanguageLabel={getLanguageLabel}
                  cleanText={cleanText}
                  verseId={v.id as string}
                />

                {/* AI Synthesis result */}
                {synth && ((synth as Record<string, unknown>)?.text || (synth as Record<string, unknown>)?.loading) ? (
                  <VedicManuscriptCard
                    content={(synth as Record<string, unknown>).loading ? 'Synthesising wisdom...' : String((synth as Record<string, unknown>).text)}
                    className="m-6 mt-0"
                  />
                ) : null}

                {drawerOpenForVerse === v.id && (
                  <SemanticExplorerDrawer
                    textSlug={textSlug}
                    chapter={chapter}
                    verse={v.verse as number}
                    isOpen={true}
                    onClose={() => setDrawerOpenForVerse(null)}
                  />
                )}              </article>
            )
          })}
          </div>

          {/* CHAPTER COMPANION & VEDIC LABS SECTION */}
          <div className="mt-16 sm:mt-24 pt-10 border-t border-stone-200 dark:border-stone-800 space-y-8">
            <div className="text-center max-w-xl mx-auto">
              <h2 className="text-2xl font-serif font-black text-stone-900 dark:text-stone-100">
                Chapter Study &amp; Explorations
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
                Deepen your contemplation with experimental tools, Sanskrit linguistics, and lineage cross-references.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Card 1: Vedic Labs */}
              <div className="bg-white/80 dark:bg-stone-900/60 rounded-3xl p-6 sm:p-8 border border-stone-200/80 dark:border-stone-800 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2.5 mb-5">
                    <span className="text-xl">🧪</span>
                    <h3 className="text-xs font-black uppercase tracking-widest text-stone-400 dark:text-stone-500">
                      Vedic Labs Explorations
                    </h3>
                  </div>
                  <div className="space-y-3">
                    <Link href="/lab" className="block p-3.5 bg-stone-50/70 dark:bg-stone-800/40 hover:bg-orange-50/50 dark:hover:bg-orange-950/20 rounded-2xl border border-stone-100 dark:border-stone-800/60 hover:border-orange-200 dark:hover:border-orange-900/40 transition-all">
                      <div className="text-sm font-bold text-stone-800 dark:text-stone-200 mb-0.5">Semantic Explorer</div>
                      <div className="text-xs text-stone-500 dark:text-stone-400">Map conceptual connections and philosophical threads across verses.</div>
                    </Link>
                    <Link href="/lab" className="block p-3.5 bg-stone-50/70 dark:bg-stone-800/40 hover:bg-amber-50/50 dark:hover:bg-amber-950/20 rounded-2xl border border-stone-100 dark:border-stone-800/60 hover:border-amber-200 dark:hover:border-amber-900/40 transition-all">
                      <div className="text-sm font-bold text-stone-800 dark:text-stone-200 mb-0.5">Etymology Lab</div>
                      <div className="text-xs text-stone-500 dark:text-stone-400">Explore Sanskrit roots (dhātu), compound breakdown, and grammatical derivations.</div>
                    </Link>
                    <Link href="/lab" className="block p-3.5 bg-stone-50/70 dark:bg-stone-800/40 hover:bg-rose-50/50 dark:hover:bg-rose-950/20 rounded-2xl border border-stone-100 dark:border-stone-800/60 hover:border-rose-200 dark:hover:border-rose-900/40 transition-all">
                      <div className="text-sm font-bold text-stone-800 dark:text-stone-200 mb-0.5">Recitation Analysis</div>
                      <div className="text-xs text-stone-500 dark:text-stone-400">Audio meter visualization, Vedic accents (svara), and phonetics.</div>
                    </Link>
                  </div>
                </div>
                <div className="mt-5 pt-4 border-t border-stone-100 dark:border-stone-800 text-center">
                  <Link href="/lab" className="text-xs font-bold text-orange-600 hover:text-orange-700 transition-colors">
                    Explore All 20+ Vedic Labs &rarr;
                  </Link>
                </div>
              </div>

              {/* Card 2: Interactive Tools & Navigation */}
              <div className="bg-white/80 dark:bg-stone-900/60 rounded-3xl p-6 sm:p-8 border border-stone-200/80 dark:border-stone-800 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2.5 mb-4">
                    <span className="text-xl">🛠️</span>
                    <h3 className="text-xs font-black uppercase tracking-widest text-stone-400 dark:text-stone-500">
                      Interactive Chapter Tools
                    </h3>
                  </div>
                  <VerseAppLinks bookSlug={textSlug} chapter={chapter} />
                  
                  <div className="mt-6 p-4 rounded-2xl bg-orange-50/60 dark:bg-orange-950/20 border border-orange-100 dark:border-orange-900/30">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-base">🧠</span>
                      <span className="text-xs font-bold text-orange-900 dark:text-orange-300">Vishwa-Vani Cognitive UI</span>
                    </div>
                    <p className="text-[11px] text-orange-700/80 dark:text-orange-400/80 leading-relaxed">
                      Unlock deep philosophical connections with AI Synthesis. Distill verses and commentaries into unified insights while preserving their original essence.
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
                  <button
                    onClick={() => router.push(`/${textSlug}/${Math.max(1, chapter - 1)}`)}
                    disabled={chapter === 1}
                    className="px-3.5 py-2 rounded-xl border border-stone-200 dark:border-stone-700 text-xs font-bold text-stone-600 dark:text-stone-300 hover:text-orange-600 disabled:opacity-30 transition-all flex items-center gap-1.5"
                  >
                    &larr; Prev Chapter
                  </button>
                  <span className="text-xs font-bold text-stone-400">Chapter {chapter} of {totalChapters}</span>
                  <button
                    onClick={() => router.push(`/${textSlug}/${chapter + 1}`)}
                    disabled={chapter >= totalChapters}
                    className="px-3.5 py-2 rounded-xl bg-stone-900 hover:bg-orange-600 text-white text-xs font-bold disabled:opacity-30 transition-all flex items-center gap-1.5"
                  >
                    Next Chapter &rarr;
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* SLIDE-OVER STUDY DRAWER */}
      {isStudyDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
            onClick={() => setIsStudyDrawerOpen(false)}
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-white dark:bg-stone-900 shadow-2xl border-l border-stone-200 dark:border-stone-800 flex flex-col animate-in slide-in-from-right duration-200">
              
              {/* Drawer Header */}
              <div className="p-4 sm:p-6 border-b border-stone-100 dark:border-stone-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setStudyDrawerTab('labs')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                      studyDrawerTab === 'labs'
                        ? 'bg-orange-600 text-white shadow-sm'
                        : 'text-stone-500 hover:text-stone-900 dark:hover:text-stone-200'
                    }`}
                  >
                    🧪 Vedic Labs
                  </button>
                  <button
                    onClick={() => setStudyDrawerTab('tools')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                      studyDrawerTab === 'tools'
                        ? 'bg-orange-600 text-white shadow-sm'
                        : 'text-stone-500 hover:text-stone-900 dark:hover:text-stone-200'
                    }`}
                  >
                    🛠️ Chapter Tools
                  </button>
                </div>

                <button
                  onClick={() => setIsStudyDrawerOpen(false)}
                  className="p-2 rounded-lg text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                  aria-label="Close panel"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>

              {/* Drawer Body */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
                {studyDrawerTab === 'labs' ? (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xs font-black uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-1">
                        Vedic Labs for {bookData?.name || textSlug}
                      </h3>
                      <p className="text-xs text-stone-500">Explore interactive modules for deep scriptural comprehension.</p>
                    </div>

                    <div className="space-y-3">
                      <Link href="/lab" onClick={() => setIsStudyDrawerOpen(false)} className="block p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/50 hover:bg-orange-50/50 dark:hover:bg-orange-950/20 border border-stone-200/60 dark:border-stone-800 transition-all">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-xl">🧬</span>
                          <span className="text-sm font-bold text-stone-800 dark:text-stone-200">Semantic Explorer</span>
                        </div>
                        <p className="text-xs text-stone-500 pl-8">Visualize conceptual connections across verses and philosophical schools.</p>
                      </Link>

                      <Link href="/lab" onClick={() => setIsStudyDrawerOpen(false)} className="block p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/50 hover:bg-amber-50/50 dark:hover:bg-amber-950/20 border border-stone-200/60 dark:border-stone-800 transition-all">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-xl">📜</span>
                          <span className="text-sm font-bold text-stone-800 dark:text-stone-200">Etymology Lab</span>
                        </div>
                        <p className="text-xs text-stone-500 pl-8">Dive deep into Sanskrit roots (dhātu) and traditional grammar.</p>
                      </Link>

                      <Link href="/lab" onClick={() => setIsStudyDrawerOpen(false)} className="block p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/50 hover:bg-rose-50/50 dark:hover:bg-rose-950/20 border border-stone-200/60 dark:border-stone-800 transition-all">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-xl">🎵</span>
                          <span className="text-sm font-bold text-stone-800 dark:text-stone-200">Recitation Analysis</span>
                        </div>
                        <p className="text-xs text-stone-500 pl-8">Audio meter visualization, syllable weight, and Vedic chanting rules.</p>
                      </Link>
                    </div>

                    <div className="pt-4 border-t border-stone-100 dark:border-stone-800 text-center">
                      <Link
                        href="/lab"
                        onClick={() => setIsStudyDrawerOpen(false)}
                        className="w-full inline-block py-2.5 px-4 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-sm"
                      >
                        Visit All Vedic Labs &rarr;
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xs font-black uppercase tracking-widest text-stone-400 dark:text-stone-500 mb-1">
                        Chapter {chapter} Tools
                      </h3>
                      <p className="text-xs text-stone-500">Contextual tools tailored to this chapter.</p>
                    </div>

                    <VerseAppLinks bookSlug={textSlug} chapter={chapter} />

                    <div className="p-4 rounded-2xl bg-orange-50/60 dark:bg-orange-950/20 border border-orange-100 dark:border-orange-900/30">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg">🧠</span>
                        <span className="text-xs font-bold text-orange-900 dark:text-orange-300">Cognitive Synthesis</span>
                      </div>
                      <p className="text-xs text-orange-700/80 dark:text-orange-400/80 leading-relaxed mb-3">
                        Generate cross-scholar commentary summaries for this entire chapter to distill key insights.
                      </p>
                      <button
                        onClick={() => {
                          _synthesizeEntireChapter();
                          setIsStudyDrawerOpen(false);
                        }}
                        disabled={_isChapterSynthesizing}
                        className="w-full py-2 px-3 rounded-lg bg-orange-600 hover:bg-orange-700 disabled:opacity-50 text-white text-xs font-bold transition-all"
                      >
                        {_isChapterSynthesizing ? 'Synthesizing...' : 'Run Chapter AI Synthesis'}
                      </button>
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  )
}







