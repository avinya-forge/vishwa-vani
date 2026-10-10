import SearchClient from '@/components/search/search-client'
import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Universal Search | Vishwa-Vani',
    description: 'Search across the Bhagavad Gita, Upanishads, and Mahabharata with high-speed local search.',
    openGraph: {
      title: 'Universal Search | Vishwa-Vani',
      description: 'Explore the Vedic Wikipedia with high-performance local search.'
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Universal Search | Vishwa-Vani',
      description: 'Explore the Vedic Wikipedia with high-performance local search.'
    }
  }
}

export default function SearchPage() {
  setRequestLocale('en')

  return <SearchClient />
}
