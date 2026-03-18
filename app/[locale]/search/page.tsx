import SearchClient from '@/components/search/SearchClient'
import { getTranslations, setRequestLocale } from 'next-intl/server'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('nav')
  return {
    title: `${t('search')} | Vishwa-Vani`,
    description: 'Explore the Vedic Wikipedia: Search across thousands of Shlokas, Sutras, and Mantras with multi-author commentaries.',
  }
}

export default async function SearchPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <main className="min-h-screen bg-[#FDFBF7] selection:bg-orange-100/60 pb-20">
      <SearchClient />
    </main>
  )
}
