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
 * Surfaces relevant Vedic Labs micro-apps contextually on verse pages.
 * Only shows available, non-prototype apps unless explicitly opted in.
 */
export default function VerseAppLinks({ bookSlug, chapter }: VerseAppLinksProps) {
  const apps = getAppsForContext(bookSlug, chapter)
  if (apps.length === 0) return null

  return (
    <div className="mt-4 pt-4 border-t border-stone-100">
      <p className="text-[9px] font-black uppercase tracking-widest text-stone-300 mb-2">
        Interactive Tools
      </p>
      <div className="flex flex-wrap gap-2">
        {apps.map(app => (
          <Link
            key={app.id}
            href={app.path}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-orange-50 border border-orange-100 text-orange-700 text-[10px] font-semibold hover:bg-orange-100 hover:border-orange-200 transition-all"
            title={app.description}
          >
            <span>✦</span>
            <span>{app.name}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
