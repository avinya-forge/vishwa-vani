'use client'

import Link from 'next/link'
import { getAppsForContext } from '@/lib/vedic-labs-registry'

interface VerseAppLinksProps {
  bookSlug: string
  chapter: number
  topics?: string[]
}

/**
 * APP-703: Verse-to-App Linking
 * Surfaces relevant Vedic Labs micro-apps contextually on verse pages using a compact tag-based system.
 */
export default function VerseAppLinks({ bookSlug, chapter }: VerseAppLinksProps) {
  const apps = getAppsForContext(bookSlug, chapter)
  if (apps.length === 0) return (
    <p className="text-[10px] text-stone-400 dark:text-stone-500 italic">
      No specific tools available for this chapter yet.
    </p>
  )

  return (
    <div className="flex flex-wrap gap-2">
      {apps.map(app => (
        <Link
          key={app.id}
          href={app.path}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-50 dark:bg-stone-800/50 border border-stone-100 dark:border-stone-800 text-stone-600 dark:text-stone-400 text-[10px] font-bold hover:bg-orange-50 dark:hover:bg-orange-950/20 hover:border-orange-200 dark:hover:border-orange-900/40 hover:text-orange-700 dark:hover:text-orange-400 transition-all group"
          title={app.description}
        >
          <span className="text-xs group-hover:scale-110 transition-transform">✦</span>
          <span>{app.name}</span>
        </Link>
      ))}
    </div>
  )
}
