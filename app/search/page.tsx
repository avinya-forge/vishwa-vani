import SearchClient from '@/components/search/SearchClient'

export async function generateMetadata() {
  return {
    title: `Search | Vishwa-Vani`,
    description: 'Explore the Vedic Wikipedia: Search across thousands of Shlokas, Sutras, and Mantras with multi-author commentaries.',
  }
}

export default async function SearchPage() {
  return (
    <main className="min-h-screen bg-[#FDFBF7] selection:bg-orange-100/60 pb-20">
      <SearchClient />
    </main>
  )
}
