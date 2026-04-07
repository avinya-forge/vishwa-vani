'use client'

import { useState } from 'react'

interface AdhyayaShareLinkProps {
  textSlug: string
  chapter: number
  adhyaya: number
}

/**
 * MBH-203: Adhyaya Deep Linking
 * Generates a shareable URL for a specific parva/adhyaya combination
 * and provides a one-click copy to clipboard.
 */
export default function AdhyayaShareLink({ textSlug, chapter, adhyaya }: AdhyayaShareLinkProps) {
  const [copied, setCopied] = useState(false)

  const deepLink = `/${textSlug}/${chapter}?adhyaya=${adhyaya}`

  const handleCopy = async () => {
    try {
      const absolute = typeof window !== 'undefined'
        ? `${window.location.origin}${deepLink}`
        : deepLink
      await navigator.clipboard.writeText(absolute)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback for environments without clipboard API
      setCopied(false)
    }
  }

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1 text-[9px] font-black uppercase tracking-widest text-stone-300 hover:text-orange-500 transition-colors"
      title={`Copy link to Adhyaya ${adhyaya}`}
      aria-label={`Copy deep link for Adhyaya ${adhyaya}`}
    >
      {copied ? (
        <span className="text-green-500">✓ Copied</span>
      ) : (
        <>
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
          <span>Share Adhyaya</span>
        </>
      )}
    </button>
  )
}

/**
 * Build the deep-link URL for a given adhyaya (pure function, testable).
 */
export function buildAdhyayaLink(textSlug: string, chapter: number, adhyaya: number): string {
  return `/${textSlug}/${chapter}?adhyaya=${adhyaya}`
}
