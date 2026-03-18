import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import StudyClient from '@/components/shloka/StudyClient'
import { getTextBySlug, getAllTextChapterPaths } from '@/lib/texts'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { getVersesFromLakeServer } from '@/lib/serverLake'

export async function generateStaticParams() {
  const paths = getAllTextChapterPaths()
  const locales = ['en', 'hi', 'mr']
  
  return locales.flatMap((locale) => 
    paths.map((p) => ({
      locale,
      text: p.text,
      chapter: p.chapter,
    }))
  )
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
  siva?: VerseAuthor
  rams?: VerseAuthor
  chinmay?: VerseAuthor
  sankar?: VerseAuthor
  [key: string]: any
}

export default async function StudyChapterPage({ params }: { params: Promise<{ locale: string, text: string, chapter: string }> }) {
  const { locale, text: textSlug, chapter: chapterNumber } = await params
  setRequestLocale(locale)
  const t = await getTranslations('study')
  
  const textMetadata = getTextBySlug(textSlug)
  if (!textMetadata) {
    return (
       <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="text-center p-8 bg-white rounded-2xl shadow-sm border border-orange-100">
          <h2 className="text-2xl text-orange-900 mb-2">Content Not Found</h2>
          <p className="text-stone-500">The requested scripture could not be found in our library.</p>
          <Link href="/" className="mt-6 inline-block text-orange-600 hover:text-orange-800 font-medium">
            &larr; {t('backToDashboard')}
          </Link>
        </div>
      </div>
    )
  }

  // Load data server-side (Hybrid Strategy: Lake or JSON)
  let verses: GitaVerse[] = []
  const chapterInt = parseInt(chapterNumber)

  if (textMetadata.storage === 'lake') {
    verses = await getVersesFromLakeServer(textSlug, chapterInt, textMetadata.lakeFile || undefined)
  } else {
    try {
      const dataPath = path.join(process.cwd(), 'data', `${textMetadata.dataPrefix}_chapter_${chapterNumber}.json`)
      const rawData = fs.readFileSync(dataPath, 'utf8')
      verses = JSON.parse(rawData)
    } catch (e) {
      console.error(`Failed to load text ${textSlug} chapter ${chapterNumber} data (JSON path)`, e)
    }
  }

  if (verses.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="text-center p-8 bg-white rounded-2xl shadow-sm border border-orange-100">
          <h2 className="text-2xl text-orange-900 mb-2">{textMetadata.name} - {chapterNumber} {t('noTranslation')}</h2>
          <p className="text-stone-500">{t('compilingDB')}</p>
          <Link href="/" className="mt-6 inline-block text-orange-600 hover:text-orange-800 font-medium">
            &larr; {t('backToDashboard')}
          </Link>
        </div>
      </div>
    )
  }

  const title = locale === 'hi' ? (textMetadata.chapterNamesHi[chapterNumber] || textMetadata.chapterNames[chapterNumber]) :
                locale === 'mr' ? (textMetadata.chapterNamesMr[chapterNumber] || textMetadata.chapterNames[chapterNumber]) :
                (textMetadata.chapterNames[chapterNumber] || `${textMetadata.name} - Chapter ${chapterNumber}`)

  const scriptureName = locale === 'hi' ? textMetadata.nameHi : locale === 'mr' ? textMetadata.nameMr : textMetadata.name
  const tagline = textMetadata.description

  const prevChapter = parseInt(chapterNumber) > 1 ? parseInt(chapterNumber) - 1 : null
  const nextChapter = parseInt(chapterNumber) < textMetadata.totalChapters ? parseInt(chapterNumber) + 1 : null
  const localePrefix = locale === 'en' ? '' : `/${locale}`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ScholarlyArticle',
    name: title,
    headline: `${scriptureName} - ${title}`,
    description: tagline,
    author: {
        '@type': 'Organization',
        name: 'Vishwa-Vani Open Wisdom Project'
    },
    about: {
        '@type': 'Thing',
        name: scriptureName
    },
    inLanguage: locale
  }

  return (
    <main className="min-h-screen bg-[#FDFBF7] selection:bg-orange-100/60 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <StudyClient 
        verses={verses} 
        chapterTitle={title} 
        scriptureName={scriptureName}
        tagline={tagline}
      />
      
      {/* Footer Navigation */}
      <div className="max-w-4xl mx-auto px-4 mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
        <div className="flex gap-4 w-full sm:w-auto">
          {prevChapter && (
            <Link 
              href={`${localePrefix}/${textSlug}/${prevChapter}`}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border border-stone-200 text-stone-700 rounded-full hover:bg-stone-50 transition-all font-medium shadow-sm hover:shadow-md"
            >
              &larr; {t('prevChapter')}
            </Link>
          )}
          {nextChapter && (
            <Link 
              href={`${localePrefix}/${textSlug}/${nextChapter}`}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-full hover:bg-orange-700 transition-all font-medium shadow-sm hover:shadow-md"
            >
              {t('nextChapter')} &rarr;
            </Link>
          )}
        </div>
        
        <Link href="/" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-stone-900 text-white rounded-full hover:bg-stone-800 transition-all font-medium shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-sm">
          {t('backToDashboard')}
        </Link>
      </div>
    </main>
  )
}


