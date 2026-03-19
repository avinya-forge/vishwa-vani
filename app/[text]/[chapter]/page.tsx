import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import StudyClient from '@/components/shloka/StudyClient'
import { getTextBySlug, getAllTextChapterPaths, VEDIC_LIBRARY } from '@/lib/texts'
import { getVersesFromLakeServer } from '@/lib/serverLake'
import { setRequestLocale } from 'next-intl/server'

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
      const dataPath = path.join(process.cwd(), 'data', `${textMetadata.dataPrefix}_chapter_${chapterNumber}.json`)
      const rawData = fs.readFileSync(dataPath, 'utf8')
      verses = JSON.parse(rawData)
    } catch (e) {
      console.error(`Failed to load text ${textSlug} chapter ${chapterNumber} data`, e)
    }
  }

  // Pass raw data to Client. Client will handle language switching.
  return (
    <main className="min-h-screen bg-[#FDFBF7]">
      <div className="max-w-none">
        <StudyWrapper 
          verses={verses} 
          textMetadata={textMetadata} 
          chapterNumber={chapterNumber} 
        />
      </div>
    </main>
  )
}

/** 
 * Intermediate wrapper to determine localized titles server-side (for SEO)
 * while still letting the client handle the main interactive state.
 */
function StudyWrapper({ verses, textMetadata, chapterNumber }: any) {
  // We'll use English as the default server-side title for SEO
  const title = textMetadata.chapterNames[chapterNumber] || `${textMetadata.name} - Chapter ${chapterNumber}`
  const scriptureName = textMetadata.name
  const tagline = textMetadata.description

  const prevChapter = parseInt(chapterNumber) > 1 ? parseInt(chapterNumber) - 1 : null
  const nextChapter = parseInt(chapterNumber) < textMetadata.totalChapters ? parseInt(chapterNumber) + 1 : null

  return (
    <>
      <StudyClient 
        verses={verses} 
        chapterTitle={title} 
        scriptureName={scriptureName}
        tagline={tagline}
      />
      
      {/* Footer Navigation */}
      <div className="max-wide px-4 sm:px-8 mt-12 pb-24 flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
        <div className="flex gap-4 w-full sm:w-auto">
          {prevChapter && (
            <Link 
              href={`/${textMetadata.slug}/${prevChapter}`}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-3 px-8 py-4 bg-white border border-stone-200 text-stone-700 rounded-2xl hover:bg-stone-50 transition-all font-bold text-xs uppercase tracking-widest shadow-sm hover:shadow-md"
            >
              &larr; Previous
            </Link>
          )}
          {nextChapter && (
            <Link 
              href={`/${textMetadata.slug}/${nextChapter}`}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-3 px-8 py-4 bg-orange-600 text-white rounded-2xl hover:bg-orange-700 transition-all font-bold text-xs uppercase tracking-widest shadow-xl shadow-orange-200"
            >
              Next &rarr;
            </Link>
          )}
        </div>
        
        <Link href="/" className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-stone-900 text-white rounded-2xl hover:bg-orange-600 transition-all font-black text-xs uppercase tracking-widest shadow-2xl active:scale-95">
          Back to Hub
        </Link>
      </div>
    </>
  )
}
