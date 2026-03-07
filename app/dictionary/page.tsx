import { searchWords } from '@/utils/services/dictionary'
import SearchBar from '@/components/dictionary/SearchBar'
import WordCard from '@/components/dictionary/WordCard'

export const dynamic = 'force-dynamic'

interface DictionaryPageProps {
    searchParams: {
        q?: string
    }
}

export default async function DictionaryPage({ searchParams }: DictionaryPageProps) {
    const query = searchParams?.q || ''
    const words = await searchWords(query)

    return (
        <main className="min-h-screen bg-amber-50/30 py-12 px-4">
            <div className="max-w-5xl mx-auto">
                <header className="mb-12 text-center">
                    <h1 className="text-4xl font-bold text-orange-900 mb-4 tracking-tight">
                        Vedic Dictionary
                    </h1>
                    <p className="text-lg text-orange-800/70 mb-8">
                        Search for meanings across English, Hindi, and Marathi.
                    </p>

                    <SearchBar />
                </header>

                <div>
                    {query && (
                        <p className="mb-6 text-gray-500 text-sm">
                            Found {words.length} result(s) for <span className="font-bold text-gray-800">&quot;{query}&quot;</span>
                        </p>
                    )}

                    {words.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {words.map((word) => (
                                <WordCard key={word.id} word={word} />
                            ))}
                        </div>
                    ) : query ? (
                        <div className="text-center py-20 bg-white rounded-lg border border-dashed border-gray-300">
                            <p className="text-gray-500">No definitions found for &quot;{query}&quot;.</p>
                            <p className="text-sm text-gray-400 mt-1">Try using the Sanskrit root word.</p>
                        </div>
                    ) : (
                        <div className="text-center py-10 text-gray-400 italic">
                            Start typing to search...
                        </div>
                    )}
                </div>
            </div>
        </main>
    )
}
