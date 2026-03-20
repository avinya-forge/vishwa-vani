import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import StudyClient from '@/components/shloka/StudyClient'
import { migrateToNVF } from '@/lib/nvf'

export async function generateStaticParams() {
  // Pre-render pages for chapters 1 through 18 of bhagavad-gita initially
  // Realistically we would read all JSONs, but for build time we can just pre-generate known
  const params: { text: string, chapter: string, verse: string }[] = []

  for (let c = 1; c <= 18; c++) {
    const dataPath = path.join(process.cwd(), 'data', `bhagavad_gita_chapter_${c}.json`)
    if (fs.existsSync(dataPath)) {
      try {
        const rawData = fs.readFileSync(dataPath, 'utf8')
        const verses = JSON.parse(rawData)
        verses.forEach((v: any) => {
          params.push({
            text: 'bhagavad-gita',
            chapter: `chapter-${c}`,
            verse: `verse-${v.verse}`
          })
        })
      } catch (e) {
        console.error(`Failed to parse chapter ${c} for static params`)
      }
    }
  }

  return params
}

export const dynamicParams = true;

interface VerseAuthor {
  author: string
  ht?: string // Hindi Translation
  hc?: string // Hindi Commentary
  et?: string // English Translation
  ec?: string // English Commentary
  sc?: string // Sanskrit Commentary
}

interface GitaVerse {
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
  const { text, chapter: chapterSlug, verse: verseSlug } = await params

  const chapterNumber = chapterSlug.replace('chapter-', '')
  const verseNumber = verseSlug.replace('verse-', '')

  let safeTextName = 'bhagavad_gita'
  if (text !== 'bhagavad-gita') { safeTextName = text }

  const dataPath = path.join(process.cwd(), 'data', `${safeTextName}_chapter_${chapterNumber}.json`)
  let verses: GitaVerse[] = []

  try {
    const rawData = fs.readFileSync(dataPath, 'utf8')
    verses = JSON.parse(rawData)
  } catch (e) {
    console.error(`Failed to load text ${text} chapter ${chapterNumber} data`, e)
  }

  const rawVerseData = verses.find(v => String(v.verse) === verseNumber)

  if (!rawVerseData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="text-center p-8 bg-white rounded-2xl shadow-sm border border-orange-100">
          <h2 className="text-2xl text-orange-900 mb-2">Verse Not Found</h2>
          <p className="text-stone-500">We don't have the data for this verse yet.</p>
          <Link href={`/${text}/${chapterSlug}`} className="mt-6 inline-block text-orange-600 hover:text-orange-800 font-medium">
            &larr; Return to Chapter
          </Link>
        </div>
      </div>
    )
  }

  const chapterTitles: Record<string, string> = {
    '1': 'Arjuna Visada Yoga - The Despondency of Arjuna'
  }
  const title = chapterTitles[chapterNumber] || `Chapter ${chapterNumber}`

  const verseData = migrateToNVF(rawVerseData, text)

  return (
    <main className="min-h-screen bg-[#FDFBF7] selection:bg-orange-100/60 pb-20">
      <StudyClient verses={[verseData]} chapterTitle={`${title} - Verse ${verseNumber}`} scriptureName={safeTextName} tagline="" />

      {/* Footer Navigation */}
      <div className="max-w-4xl mx-auto px-4 mt-16 text-center relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link href={`/${text}/${chapterSlug}`} className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-stone-900 text-white rounded-full hover:bg-stone-800 transition-all font-medium sm:font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-sm sm:text-base">
          &uarr; Back to Chapter
        </Link>
        <Link href="/" className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white text-stone-900 border border-stone-200 rounded-full hover:bg-stone-50 transition-all font-medium sm:font-bold shadow-sm hover:shadow-md hover:-translate-y-0.5 text-sm sm:text-base">
          &larr; Back to Dashboard
        </Link>
      </div>
    </main>
  )
}
