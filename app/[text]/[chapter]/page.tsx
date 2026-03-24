import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import StudyClient from '@/components/shloka/study-client'
import { getTextBySlug, getAllTextChapterPaths, VEDIC_LIBRARY } from '@/lib/texts'
import { getVersesFromLakeServer } from '@/lib/server-lake'
import { setRequestLocale } from 'next-intl/server'
import { migrateToNVF } from '@/lib/nvf'

export async function generateStaticParams() {
  const paths = getAllTextChapterPaths()
  return paths.map((p) => ({
    text: p.text,
    chapter: p.chapter,
  }))
}

export default async function StudyChapterPage({ params }: { params: Promise<{ text: string, chapter: string }> }) {
  const { text: textSlug, chapter: chapterNumber } = await params
  setRequestLocale('en')
  
  const textMetadata = getTextBySlug(textSlug)
  if (!textMetadata) {
    return (
       <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7]">
        <div className="text-center p-12 bg-white rounded-[2.5rem] shadow-2xl border border-stone-100 max-w-md">
          <h2 className="text-3xl font-serif font-black text-stone-900 mb-4">Content Not Found</h2>
          <p className="text-stone-500 font-medium mb-8">The requested scripture could not be found in our library.</p>
          <Link href="/" className="px-8 py-4 bg-stone-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-orange-600 transition-all">
            Return to Library
          </Link>
        </div>
      </div>
    )
  }

  // Load data server-side
  let verses = []
  const chapterInt = parseInt(chapterNumber)

  if (textMetadata.storage === 'lake') {
    verses = await getVersesFromLakeServer(textSlug, chapterInt, textMetadata.lakeFile || undefined)
  } else {
    try {
      const dataPath = path.join(process.cwd(), 'data', '3-gold', textMetadata.dataPrefix, `${textMetadata.dataPrefix}-chapter-${chapterNumber}.json`)
      const rawData = fs.readFileSync(dataPath, 'utf8')
      verses = JSON.parse(rawData)
    } catch (e) {
      console.error(`Failed to load text ${textSlug} chapter ${chapterNumber} data`, e)
    }
  }

  // Ensure ALL data is in NVF format before passing to Client components
  const nvfVerses = verses.map((v: any) => migrateToNVF(v, textSlug, chapterInt))

  // Build chapter list for navigation
  const chapterList: { num: number; name: string }[] = []
  for (let i = 1; i <= textMetadata.totalChapters; i++) {
    chapterList.push({
      num: i,
      name: textMetadata.chapterNames?.[String(i)] || `Chapter ${i}`,
    })
  }

  return (
    <main className="min-h-screen bg-[#FDFBF7]">
      <div className="max-w-none">
        <StudyWrapper 
          verses={nvfVerses} 
          textMetadata={textMetadata} 
          chapterNumber={chapterNumber}
          chapterList={chapterList}
        />
      </div>
    </main>
  )
}

/** 
 * Intermediate wrapper to determine localized titles server-side (for SEO)
 * while still letting the client handle the main interactive state.
 */
function StudyWrapper({ verses, textMetadata, chapterNumber, chapterList }: any) {
  const title = textMetadata.chapterNames[chapterNumber] || `${textMetadata.name} - Chapter ${chapterNumber}`
  const scriptureName = textMetadata.name
  const tagline = textMetadata.description

  const prevChapter = parseInt(chapterNumber) > 1 ? parseInt(chapterNumber) - 1 : null
  const nextChapter = parseInt(chapterNumber) < textMetadata.totalChapters ? parseInt(chapterNumber) + 1 : null

  return (
    <>
      <StudyClient 
        verses={verses} 
        textSlug={textMetadata.slug}
        chapter={parseInt(chapterNumber)}
      />
      
      {/* Footer Navigation */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 mt-8 pb-12 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
        <div className="flex gap-3 w-full sm:w-auto">
          {prevChapter && (
            <Link 
              href={`/${textMetadata.slug}/${prevChapter}`}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border border-stone-200 text-stone-700 rounded-xl hover:bg-stone-50 transition-all font-bold text-[10px] uppercase tracking-widest shadow-sm hover:shadow-md"
            >
              &larr; Previous
            </Link>
          )}
          {nextChapter && (
            <Link 
              href={`/${textMetadata.slug}/${nextChapter}`}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-all font-bold text-[10px] uppercase tracking-widest shadow-xl shadow-orange-200"
            >
              Next &rarr;
            </Link>
          )}
        </div>
        
        <Link href="/" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-stone-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-2xl active:scale-95">
          Back to Hub
        </Link>
      </div>
    </>
  )
}
