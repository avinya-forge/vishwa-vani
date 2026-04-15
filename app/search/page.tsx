import SearchClient from '@/components/search/search-client'
import { setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Universal Search | Vishwa-Vani',
    description: 'Search across the Bhagavad Gita, Upanishads, and Mahabharata with high-speed local search.',
    openGraph: {
      title: 'Universal Search | Vishwa-Vani',
      description: 'Explore the Vedic Wikipedia with high-performance local search.',
      images: [
        {
          url: 'https://vishwavani.app/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'Universal Search - Vishwa-Vani'
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Universal Search | Vishwa-Vani',
      description: 'Explore the Vedic Wikipedia with high-performance local search.',
      images: ['https://vishwavani.app/og-image.jpg']
    }
  }
}

export default function SearchPage() {
  setRequestLocale('en')

  return <SearchClient />
}
