import { getShlokas } from '@/utils/services/shloka'
import ShlokaCard from '@/components/shloka/ShlokaCard'

// Force dynamic rendering so we always get fresh data on refresh (for now)
export const dynamic = 'force-dynamic'

export default async function Home() {
  const shlokas = await getShlokas()

  return (
    <main className="min-h-screen bg-amber-50/30 py-12 px-4 selection:bg-orange-100">
      <div className="max-w-5xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-orange-900 mb-4 tracking-tight">
            Vishwa-Vani
          </h1>
          <p className="text-lg text-orange-800/70 max-w-2xl mx-auto mb-6">
            Explore the depths of Vedic wisdom, word by word.
          </p>
          <div className="flex justify-center gap-4">
            <a href="/dictionary" className="px-6 py-2 bg-orange-600 text-white rounded-full hover:bg-orange-700 transition-colors font-semibold shadow-sm">
              Open Dictionary
            </a>
          </div>
        </header>

        {shlokas && shlokas.length > 0 ? (
          <div className="space-y-8">
            {shlokas.map((shloka) => (
              <ShlokaCard key={shloka.id} shloka={shloka} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-lg border border-dashed border-gray-300">
            <p className="text-gray-500 mb-2">No Shlokas found.</p>
            <p className="text-sm text-gray-400">Run the seed script in your database to add content.</p>
          </div>
        )}
      </div>
    </main>
  )
}
