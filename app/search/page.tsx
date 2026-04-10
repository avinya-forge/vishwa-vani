import SearchClient from '@/components/search/search-client'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Universal Search | Vishwa-Vani',
  description: 'Search across the Bhagavad Gita, Upanishads, and Mahabharata with high-speed local search.',
  openGraph: {
    title: 'Universal Search | Vishwa-Vani',
    description: 'Explore the Vedic Wikipedia with high-performance local search.',
    images: ['https://vishwavani.app/og-image.jpg']
  }
}

export default function SearchPage() {
  setRequestLocale('en')

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col">
      <Header />
      <main className="flex-grow">
        <SearchClient />
      </main>
      <Footer />
    </div>
  )
}
