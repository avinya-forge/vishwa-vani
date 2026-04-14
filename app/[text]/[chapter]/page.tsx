import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import StudyClient from '@/components/shloka/study-client'
import { getTextBySlug, getAllTextChapterPaths } from '@/lib/texts'
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
  } catch {
     // Ignore
  }

  setRequestLocale('en')
  
  const textMetadata = getTextBySlug(textSlug)
  if (!textMetadata || !textMetadata.available) {
    return (
       <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7]">
        <div className="text-center p-12 bg-white rounded-[2.5rem] shadow-2xl border border-stone-100 max-w-md">
          <h2 className="text-3xl font-serif font-black text-stone-900 mb-4">{!textMetadata ? 'Content Not Found' : 'Coming Soon'}</h2>
          <p className="text-stone-500 font-medium mb-8">
            {!textMetadata 
              ? 'The requested scripture could not be found in our library.' 
              : `The ${textMetadata.name} is currently undergoing technical audit and will be available soon.`}
          </p>
          <Link href="/" className="px-8 py-4 bg-stone-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-orange-600 transition-all">
            Return to Library
          </Link>
        </div>
      </div>
    )
  }

  const chapterInt = parseInt(chapterNumber)

  // Build adhyaya list for Mahabharata
  const adhyayaList = textSlug === 'mahabharata'
    ? (() => {
        const manifest = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'data', 'manifest.json'), 'utf8'));
        const book = manifest.books.find((b: Record<string, unknown>) => b.book_id === 'mahabharata' || b.slug === 'mahabharata');
        const chapters = book?.chapters || book?.shards || [];
        return chapters
          .filter((s: unknown) => s && (s as Record<string, unknown>).file && String((s as Record<string, unknown>).file).startsWith(`parva-${chapterNumber}/`))
          .map((s: unknown) => { const sObj = s as Record<string, unknown>;
              // s.file format: "parva-2/adhyaya-5.json"
              const filename = String(sObj.file).split('/')[1]               // "adhyaya-5.json"
              const num = parseInt(filename.replace('adhyaya-', '').replace('.json', ''))
              return { num, id: sObj.id || `parva-${chapterNumber}_adhyaya-${num}` }
          })
          .sort((a: unknown, b: unknown) => (a as Record<string, unknown>).num as number - ((b as Record<string, unknown>).num as number))
          || [];
      })()
    : []

  // Validate adhyaya parameter for Mahabharata
  let validatedAdhyayaParam = adhyayaParam
  if (textSlug === 'mahabharata' && adhyayaList.length > 0) {
    const requestedAdhyaya = adhyayaParam ? parseInt(adhyayaParam) : null
    const isValidAdhyaya = requestedAdhyaya && adhyayaList.some((a: unknown) => (a as Record<string, unknown>).num === requestedAdhyaya)
    if (!isValidAdhyaya) {
      // Fallback to first available adhyaya
      validatedAdhyayaParam = String((adhyayaList[0] as Record<string, unknown>).num)
    }
  }

  // Load data using AI-enhanced service
  const chapterData = await vedicDataService.getChapterData(textSlug, chapterInt, {
    adhyaya: validatedAdhyayaParam ? parseInt(validatedAdhyayaParam) : undefined,
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

  const { verses: _enrichedVerses, navigation: _navigation, aiInsights: _aiInsights } = chapterData;

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
          adhyayaParam={validatedAdhyayaParam}
          adhyayaList={adhyayaList}
        />
      </div>
    </main>
  )
}

function StudyWrapper({ chapterData, textSlug, chapterNumber, adhyayaParam, adhyayaList }: Record<string, unknown>) {
  const { verses, navigation, aiInsights: _aiInsights, metadata } = chapterData as Record<string, unknown>;
  const textSlugStr = String(textSlug);
  const chapterNumberNum = Number(chapterNumber);
  const adhyayaParamStr = adhyayaParam ? String(adhyayaParam) : undefined;
  const textMetadata = getTextBySlug(textSlugStr);

  // Safely access navigation with type guards
  const nav = navigation as Record<string, unknown> | undefined;

  return (
    <>
      <StudyClient
        verses={verses as unknown[]}
        textSlug={(metadata as Record<string, unknown>)?.slug as string}
        chapter={chapterNumberNum}
        adhyayaList={adhyayaList as { num: number; id: string }[]}
        currentAdhyaya={adhyayaParamStr ? parseInt(adhyayaParamStr) : undefined}
      />

      {/* Footer Navigation */}
      <div className="max-w-[1400px] mx-auto px-3 sm:px-4 lg:px-6 mt-8 pb-12 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
        {/* Footer Metadata */}
        <div className="flex flex-col gap-1 text-center sm:text-left">
          <div className="text-[10px] font-black uppercase tracking-widest text-stone-400">
            {String(textMetadata?.name || textSlugStr)}
          </div>
          <div className="text-[9px] text-stone-500 font-medium">
            Chapter {chapterNumberNum}{adhyayaParamStr ? String(` • Adhyaya ${adhyayaParamStr}`) : String('')} • {(verses as unknown[])?.length || 0} Verses
          </div>
        </div>

        <div className="flex gap-2 sm:gap-3 w-full sm:w-auto justify-center sm:justify-end flex-wrap">
          {(nav as Record<string, unknown>)?.prevChapter ? (
            <Link
              href={String(((nav as Record<string, unknown>).prevChapter as Record<string, unknown>).slug)}
              className="flex-1 min-w-0 sm:flex-none inline-flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-3 bg-white border border-stone-200 text-stone-700 rounded-xl hover:bg-stone-50 transition-all font-bold text-[9px] sm:text-[10px] uppercase tracking-widest shadow-sm hover:shadow-md"
            >
              <span className="hidden xs:inline">&larr;</span>
              <span className="truncate">{String(((nav as Record<string, unknown>).prevChapter as Record<string, unknown>).title)}</span>
            </Link>
          ) : null}
          {(nav as Record<string, unknown>)?.nextChapter ? (
            <Link
              href={String(((nav as Record<string, unknown>).nextChapter as Record<string, unknown>).slug)}
              className="flex-1 min-w-0 sm:flex-none inline-flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-6 py-2 sm:py-3 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-all font-bold text-[9px] sm:text-[10px] uppercase tracking-widest shadow-xl shadow-orange-200"
            >
              <span className="truncate">{String(((nav as Record<string, unknown>).nextChapter as Record<string, unknown>).title)}</span>
              <span className="hidden xs:inline">&rarr;</span>
            </Link>
          ) : null}
        </div>

        <Link href="/" className="inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-stone-900 text-white rounded-xl font-black text-[9px] sm:text-[10px] uppercase tracking-widest shadow-2xl active:scale-95 flex-shrink-0">
          Back to Hub
        </Link>
      </div>
    </>
  )
}


import type { Metadata } from 'next'

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const textSlug = params.text
  const chapterNumber = params.chapter

  const textInfo = getTextBySlug(textSlug)
  const title = textInfo ? `${textInfo.name} - Chapter ${chapterNumber}` : `Chapter ${chapterNumber}`
  const description = textInfo ? `Read and explore Chapter ${chapterNumber} of ${textInfo.name} with translations and commentaries.` : 'Read and explore Vedic wisdom.'

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://vishwavani.app/${textSlug}/${chapterNumber}`,
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
