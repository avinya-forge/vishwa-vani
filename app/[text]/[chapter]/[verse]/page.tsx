import Link from 'next/link'
import { notFound } from 'next/navigation'
import { absoluteUrl } from '@/lib/site'
import StudyClient from '@/components/shloka/study-client'
import { getTextBySlug, } from '@/lib/texts'
import { vedicDataService, } from '@/lib/data-service'
import { setRequestLocale } from 'next-intl/server'

export async function generateStaticParams() {
  // To prevent "Maximum call stack size exceeded" during Vercel deployment
  // due to 30,000+ statically generated verse paths, we return an empty array here.
  // Next.js will generate these pages on-demand at runtime and cache them (ISR).
  return []
}

// Allow on-demand rendering for verse numbers not pre-generated (e.g. combined shlokas)
export const dynamicParams = true;

interface VerseAuthor {
  author: string
  ht?: string // Hindi Translation
  hc?: string // Hindi Commentary
  et?: string // English Translation
  ec?: string // English Commentary
  sc?: string // Sanskrit Commentary
}

interface _GitaVerse {
  _id: string
  chapter: number
  verse: number
  slok: string
  transliteration: string
  // Selected Key Commentaries
  siva?: VerseAuthor
  rams?: VerseAuthor
  chinmay?: VerseAuthor
  sankar?: VerseAuthor
}

export default async function StudyVersePage({ params }: { params: Promise<{ text: string, chapter: string, verse: string }> }) {
  const { text: textSlug, chapter: chapterNumber, verse: verseNumber } = await params
  setRequestLocale('en')
  
  const textMetadata = getTextBySlug(textSlug)
  if (!textMetadata) {
    notFound()
  }

  if (!/^\d+$/.test(chapterNumber) || !/^\d+$/.test(verseNumber)) { notFound() }
  const chapterInt = parseInt(chapterNumber, 10)

  let enrichedVerses: unknown[] = []

  // Use central data service for consistency and Gold-tier support
  const chapterData = await vedicDataService.getChapterData(textSlug, chapterInt, {
    includeAI: false,
    language: 'en'
  })

  if (chapterData) {
    enrichedVerses = chapterData.verses
  }

  const rawVerseData = enrichedVerses.find((v: unknown) => String((v as Record<string, unknown>).verse) === verseNumber)

  if (!rawVerseData) {
    notFound()
  }

  const _title = textMetadata.chapterNames?.[chapterNumber] || `${textMetadata.name} - Chapter ${chapterNumber}`
  
  // The DataService already returns enriched, schema-compliant verses
  const verseData = rawVerseData as Record<string, unknown>

  return (
    <main className="min-h-screen bg-[#FDFBF7] selection:bg-orange-100/60 pb-20">
      <StudyClient 
        verses={[verseData]} 
        textSlug={textSlug}
        chapter={parseInt(chapterNumber)}
      />

      {/* Footer Navigation */}
      <div className="max-w-4xl mx-auto px-4 mt-16 text-center relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link href={`/${textSlug}/${chapterNumber}`} className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-stone-900 text-white rounded-full hover:bg-stone-800 transition-all font-medium sm:font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-sm sm:text-base">
          &uarr; Back to Chapter
        </Link>
        <Link href="/" className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white text-stone-900 border border-stone-200 rounded-full hover:bg-stone-50 transition-all font-medium sm:font-bold shadow-sm hover:shadow-md hover:-translate-y-0.5 text-sm sm:text-base">
          &larr; Back to Dashboard
        </Link>
      </div>
    </main>
  )
}

import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ text: string, chapter: string, verse: string }> }): Promise<Metadata> {
  const { text: textSlug, chapter: chapterNumber, verse: verseNumber } = await params
  const textMetadata = getTextBySlug(textSlug)

  const title = textMetadata ? `${textMetadata.name} ${chapterNumber}.${verseNumber}` : `Verse ${chapterNumber}.${verseNumber}`
  const description = textMetadata ? `Explore ${textMetadata.name} Chapter ${chapterNumber}, Verse ${verseNumber} with deep scholarly commentaries and translations.` : 'Read Vedic wisdom.'

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: absoluteUrl(`/${textSlug}/${chapterNumber}/${verseNumber}`),
      images: [
        {
          url: absoluteUrl('/og-image.jpg'),
          width: 1200,
          height: 630,
          alt: title
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [absoluteUrl('/twitter-image.jpg')]
    }
  }
}

