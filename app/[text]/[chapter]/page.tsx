import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import StudyClient from '@/components/shloka/study-client'
import { getTextBySlug, getAllTextChapterPaths, VEDIC_LIBRARY } from '@/lib/texts'
import { vedicDataService } from '@/lib/data-service'
import { setRequestLocale } from 'next-intl/server'

export async function generateStaticParams() {
  const paths = getAllTextChapterPaths()
  return paths.map((p) => ({
    text: p.text,
    chapter: p.chapter,
  }))
}

type Props = {
  params: Promise<{ text: string; chapter: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function StudyChapterPage(props: Props) {
  const params = await props.params
  const textSlug = params.text
  const chapterNumber = params.chapter

  // Workaround for Next.js 15 static export issues with searchParams
  // Read adhyaya directly without awaiting (or default it)
  // For static generation, we assume adhyaya isn't set
  let adhyayaParam: string | undefined = undefined;
  try {
     const sp = await props.searchParams;
     if (typeof sp?.adhyaya === 'string') {
        adhyayaParam = sp.adhyaya;
     }
  } catch (e) {
     // Ignore
  }

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

  const chapterInt = parseInt(chapterNumber)

  // Load data using AI-enhanced service
  const chapterData = await vedicDataService.getChapterData(textSlug, chapterInt, {
    adhyaya: adhyayaParam ? parseInt(adhyayaParam) : undefined,
    includeAI: true, // Enable AI enrichment
    language: 'en'
  });

  if (!chapterData) {
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

  const { verses: enrichedVerses, navigation, aiInsights } = chapterData;

  // Build adhyaya list for Mahabharata
  const adhyayaList = textSlug === 'mahabharata' 
    ? (JSON.parse(fs.readFileSync(path.join(process.cwd(), 'data', 'manifest.json'), 'utf8'))
        .books.find((b: any) => b.slug === 'mahabharata')?.shards
        .filter((s: any) => s.file.startsWith(`parva-${chapterNumber}/`))
        .map((s: any) => {
            // s.file format: "parva-2/adhyaya-5.json"
            const filename = s.file.split('/')[1]               // "adhyaya-5.json"
            const num = parseInt(filename.replace('adhyaya-', '').replace('.json', ''))
            return { num, id: s.id }
        })
        .sort((a: any, b: any) => a.num - b.num)
        || [])
    : []

  // Build chapter list for navigation
  const chapterList: { num: number; name: string }[] = []
  for (let i = 1; i <= (textMetadata.totalChapters || 1); i++) {
    chapterList.push({
      num: i,
      name: textMetadata.chapterNames?.[String(i)] || `Chapter ${i}`,
    })
  }

  return (
    <main className="min-h-screen bg-[#FDFBF7]">
      <div className="max-w-none">
        <StudyWrapper
          chapterData={chapterData}
          textSlug={textSlug}
          chapterNumber={chapterInt}
          adhyayaParam={adhyayaParam}
        />
      </div>
    </main>
  )
}

function StudyWrapper({ chapterData, textSlug, chapterNumber, adhyayaParam }: any) {
  const { verses, navigation, aiInsights, metadata } = chapterData;

  return (
    <>
      <StudyClient
        verses={verses}
        textSlug={metadata.slug}
        chapter={chapterNumber}
        adhyayaList={[]} // TODO: Build from navigation data
        currentAdhyaya={adhyayaParam ? parseInt(adhyayaParam) : undefined}
      />
      
      {/* Footer Navigation */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 mt-8 pb-12 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
        <div className="flex gap-3 w-full sm:w-auto">
          {navigation.prevChapter && (
            <Link
              href={navigation.prevChapter.slug}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border border-stone-200 text-stone-700 rounded-xl hover:bg-stone-50 transition-all font-bold text-[10px] uppercase tracking-widest shadow-sm hover:shadow-md"
            >
              &larr; {navigation.prevChapter.title}
            </Link>
          )}
          {navigation.nextChapter && (
            <Link
              href={navigation.nextChapter.slug}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-all font-bold text-[10px] uppercase tracking-widest shadow-xl shadow-orange-200"
            >
              {navigation.nextChapter.title} &rarr;
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
