import Link from 'next/link'
import StudyClient from '@/components/shloka/study-client'
import { migrateToNVF } from '@/lib/nvf'
import { getVersesFromLakeServer } from '@/lib/server-lake'
import { getTextBySlug, getAllTextChapterPaths } from '@/lib/texts'
import { setRequestLocale } from 'next-intl/server'
import fs from 'fs'
import path from 'path'

export async function generateStaticParams() {
  const paths = getAllTextChapterPaths()
  const params: { text: string, chapter: string, verse: string }[] = []

  // Pre-generate a conservative number of pages to keep build fast
  for (const p of paths) {
    // Generate first 3 verses for each chapter of all texts
    for (let v = 1; v <= 3; v++) {
      params.push({ text: p.text, chapter: p.chapter, verse: String(v) })
    }
  }

  return params
}

export const dynamicParams = false;

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
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="text-center p-8 bg-white rounded-2xl shadow-sm border border-orange-100">
          <h2 className="text-2xl text-orange-900 mb-2">Text Not Found</h2>
          <Link href={`/`} className="mt-6 inline-block text-orange-600 hover:text-orange-800 font-medium">
            &larr; Return Hub
          </Link>
        </div>
      </div>
    )
  }

  let verses: Record<string, unknown>[] = []
  const chapterInt = parseInt(chapterNumber)

  if (textMetadata.storage === 'lake') {
    const lakeVerses = await getVersesFromLakeServer(textSlug, chapterInt, textMetadata.lakeFile || undefined)
    verses = (lakeVerses as unknown as Record<string, unknown>[]) || []
  } else {
    try {
      const dataPath = path.join(process.cwd(), 'data', `${textMetadata.dataPrefix}_chapter_${chapterNumber}.json`)
      const rawData = fs.readFileSync(dataPath, 'utf8')
      verses = (JSON.parse(rawData) as unknown as Record<string, unknown>[]) || []
    } catch (e) {
      console.error(`Failed to load text ${textSlug} chapter ${chapterNumber} data`, e)
    }
  }

  const rawVerseData = verses.find(v => String((v as Record<string, unknown>).verse) === verseNumber)

  if (!rawVerseData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="text-center p-8 bg-white rounded-2xl shadow-sm border border-orange-100">
          <h2 className="text-2xl text-orange-900 mb-2">Verse Not Found</h2>
          <p className="text-stone-500">We don't have the data for this verse yet.</p>
          <Link href={`/${textSlug}/${chapterNumber}`} className="mt-6 inline-block text-orange-600 hover:text-orange-800 font-medium">
            &larr; Return to Chapter
          </Link>
        </div>
      </div>
    )
  }

  const _title = textMetadata.chapterNames[chapterNumber] || `${textMetadata.name} - Chapter ${chapterNumber}`
  const scriptureName = textMetadata.name
  const _tagline = textMetadata.description

  const verseData = migrateToNVF(rawVerseData, scriptureName)

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
      url: `https://vishwavani.app/${textSlug}/${chapterNumber}/${verseNumber}`,
      images: [
        {
          url: 'https://vishwavani.app/og-image.jpg',
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
      images: ['https://vishwavani.app/twitter-image.jpg']
    }
  }
}
