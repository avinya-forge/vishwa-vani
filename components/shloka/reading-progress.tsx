'use client'

import React, { useState, useEffect } from 'react'

const STORAGE_KEY = 'vishwa_reading_progress'
const BOOKMARK_KEY = 'vishwa_bookmarks'

interface Progress {
  [textSlug: string]: number[] // completed chapter numbers
}

interface Bookmark {
  id: string
  textSlug: string
  chapter: number
  adhyaya?: number
  label: string
  savedAt: string
}

interface ReadingProgressProps {
  textSlug: string
  chapter: number
  adhyaya?: number
  totalChapters: number
  chapterName?: string
}

export function useReadingProgress(textSlug: string) {
  const [progress, setProgress] = useState<Progress>({})
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setProgress(JSON.parse(raw))
      const bRaw = localStorage.getItem(BOOKMARK_KEY)
      if (bRaw) setBookmarks(JSON.parse(bRaw))
    } catch { /* ignore */ }
  }, [])

  const markChapterRead = (chapter: number) => {
    setProgress(prev => {
      const existing = prev[textSlug] ?? []
      if (existing.includes(chapter)) return prev
      const updated = { ...prev, [textSlug]: [...existing, chapter].sort((a, b) => a - b) }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      return updated
    })
  }

  const isChapterRead = (chapter: number) => (progress[textSlug] ?? []).includes(chapter)
  const completedChapters = progress[textSlug]?.length ?? 0

  const addBookmark = (chapter: number, adhyaya: number | undefined, label: string) => {
    const bookmark: Bookmark = {
      id: `${textSlug}-${chapter}-${adhyaya ?? 0}-${Date.now()}`,
      textSlug, chapter, adhyaya, label,
      savedAt: new Date().toLocaleDateString(),
    }
    setBookmarks(prev => {
      const updated = [bookmark, ...prev].slice(0, 20)
      localStorage.setItem(BOOKMARK_KEY, JSON.stringify(updated))
      return updated
    })
  }

  const removeBookmark = (id: string) => {
    setBookmarks(prev => {
      const updated = prev.filter(b => b.id !== id)
      localStorage.setItem(BOOKMARK_KEY, JSON.stringify(updated))
      return updated
    })
  }

  const bookmarksForText = bookmarks.filter(b => b.textSlug === textSlug)

  return { markChapterRead, isChapterRead, completedChapters, addBookmark, removeBookmark, bookmarksForText }
}

export default function ReadingProgress({ textSlug, chapter, adhyaya, totalChapters, chapterName }: ReadingProgressProps) {
  const { markChapterRead, isChapterRead, completedChapters, addBookmark, removeBookmark, bookmarksForText } = useReadingProgress(textSlug)
  const [bookmarked, setBookmarked] = useState(false)
  const [showBookmarks, setShowBookmarks] = useState(false)

  const read = isChapterRead(chapter)
  const pct = Math.round((completedChapters / totalChapters) * 100)

  const handleBookmark = () => {
    const label = chapterName ?? `Chapter ${chapter}${adhyaya ? ` · Adhyaya ${adhyaya}` : ''}`
    addBookmark(chapter, adhyaya, label)
    setBookmarked(true)
    setTimeout(() => setBookmarked(false), 2000)
  }

  return (
    <div className="space-y-3">
      {/* Progress bar */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-1.5 bg-stone-800 rounded-full overflow-hidden">
          <div className="h-full bg-orange-500 rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
        </div>
        <span className="text-stone-500 text-xs whitespace-nowrap">{completedChapters}/{totalChapters} ch</span>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={() => markChapterRead(chapter)}
          className={`flex-1 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${read ? 'bg-green-800/40 border border-green-700 text-green-400' : 'bg-stone-800 hover:bg-stone-700 text-stone-300 border border-stone-700'}`}
        >
          {read ? '✓ Read' : 'Mark Read'}
        </button>
        <button
          onClick={handleBookmark}
          className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border ${bookmarked ? 'bg-orange-600 border-orange-500 text-white' : 'bg-stone-800 hover:bg-stone-700 text-stone-300 border-stone-700'}`}
        >
          {bookmarked ? '✓' : '🔖'}
        </button>
        {bookmarksForText.length > 0 && (
          <button
            onClick={() => setShowBookmarks(v => !v)}
            className="px-3 py-2 rounded-xl text-xs font-bold text-stone-400 hover:text-white bg-stone-800 border border-stone-700 transition-all"
          >
            {bookmarksForText.length}
          </button>
        )}
      </div>

      {/* Bookmarks dropdown */}
      {showBookmarks && bookmarksForText.length > 0 && (
        <div className="bg-stone-900 border border-stone-700 rounded-xl p-3 space-y-2">
          <p className="text-stone-500 text-[10px] uppercase tracking-widest font-bold">Bookmarks</p>
          {bookmarksForText.map(b => (
            <div key={b.id} className="flex items-center justify-between gap-2">
              <a href={`/${b.textSlug}/${b.chapter}${b.adhyaya ? `?adhyaya=${b.adhyaya}` : ''}`}
                className="text-stone-300 hover:text-orange-400 text-xs flex-1 transition-all truncate">
                {b.label}
              </a>
              <span className="text-stone-600 text-[10px]">{b.savedAt}</span>
              <button onClick={() => removeBookmark(b.id)} className="text-stone-600 hover:text-red-400 text-xs transition-all">✕</button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
