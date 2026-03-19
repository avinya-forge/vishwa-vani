import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import StudyClient from '@/components/shloka/StudyClient'

export async function generateStaticParams() {
  // Pre-render pages for chapters 1 through 18 of bhagavad-gita initially
  return Array.from({ length: 18 }, (_, i) => ({
    text: 'bhagavad-gita',
    chapter: `chapter-${i + 1}`,
  }))
}

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

export default async function StudyChapterPage({ params }: { params: Promise<{ text: string, chapter: string }> }) {
  const { text, chapter: chapterSlug } = await params

  const chapterNumber = chapterSlug.replace('chapter-', '')
  
  // Later we can implement logic to fetch the specific text (e.g., upanishads vs bhagavad-gita)
  // For now, mapping directly to bhagavad-gita JSON files
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

  if (verses.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="text-center p-8 bg-white rounded-2xl shadow-sm border border-orange-100">
          <h2 className="text-2xl text-orange-900 mb-2">Chapter {chapterNumber} Not Found</h2>
          <p className="text-stone-500">We don't have the data for this chapter yet.</p>
          <Link href="/" className="mt-6 inline-block text-orange-600 hover:text-orange-800 font-medium">
            &larr; Return Home
          </Link>
        </div>
      </div>
    )
  }

  // Find the exact chapter name / theme (Optional)
  const chapterTitles: Record<string, string> = {
    '1': 'Arjuna Visada Yoga - The Despondency of Arjuna'
  }
  const title = chapterTitles[chapterNumber] || `Chapter ${chapterNumber}`

  return (
    <main className="min-h-screen bg-[#FDFBF7] selection:bg-orange-100/60 pb-20">
      <StudyClient verses={verses} chapterTitle={title} />
      
      {/* Footer Navigation */}
      <div className="max-w-4xl mx-auto px-4 mt-16 text-center relative z-10">
        <Link href="/" className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-stone-900 text-white rounded-full hover:bg-stone-800 transition-all font-medium sm:font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-sm sm:text-base">
          &larr; Back to Dashboard
        </Link>
      </div>
    </main>
  )
}
