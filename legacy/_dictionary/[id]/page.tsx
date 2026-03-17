import Link from 'next/link'
import { getWordById } from '@/utils/services/dictionary'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

interface WordPageProps {
    params: {
        id: string
    }
}

export default async function WordPage({ params }: WordPageProps) {
    const word = await getWordById(params.id)

    if (!word) {
        notFound()
    }

    return (
        <main className="min-h-screen bg-amber-50/30 py-12 px-4 flex items-center justify-center">
            <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl border border-orange-100 overflow-hidden">
                {/* Header */}
                <div className="bg-orange-50 p-8 border-b border-orange-100 flex justify-between items-start">
                    <div>
                        <Link href="/dictionary" className="text-orange-600 hover:text-orange-800 text-sm font-semibold mb-2 inline-flex items-center">
                            ← Back to Dictionary
                        </Link>
                        <h1 className="text-5xl font-bold text-gray-900 font-serif mt-2">{word.root_word}</h1>
                    </div>
                    {/* Decorative Element */}
                    <div className="text-6xl text-orange-200 opacity-50 font-serif">ॐ</div>
                </div>

                {/* Content */}
                <div className="p-8 space-y-8">

                    {/* Meanings Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <span className="block text-xs uppercase tracking-wider text-gray-400 font-bold mb-1">English</span>
                            <p className="text-lg text-gray-800 font-medium">{word.meaning_en}</p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                            <span className="block text-xs uppercase tracking-wider text-gray-400 font-bold mb-1">Hindi</span>
                            <p className="text-lg text-gray-800 font-medium">{word.meaning_hi || '-'}</p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                            <span className="block text-xs uppercase tracking-wider text-gray-400 font-bold mb-1">Marathi</span>
                            <p className="text-lg text-gray-800 font-medium">{word.meaning_mr || '-'}</p>
                        </div>
                    </div>

                    {/* Metadata Section */}
                    {word.metadata && Object.keys(word.metadata as object).length > 0 && (
                        <div>
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 border-b border-gray-100 pb-2">Grammar & Metadata</h3>
                            <div className="grid grid-cols-2 gap-4">
                                {Object.entries(word.metadata as object).map(([key, value]) => (
                                    <div key={key} className="flex">
                                        <span className="w-24 text-gray-500 text-sm capitalize font-medium">{key}:</span>
                                        <span className="text-gray-800 text-sm">{String(value)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Timestamp */}
                    <div className="pt-6 border-t border-gray-100 text-xs text-gray-400 text-right">
                        Entry ID: <span className="font-mono">{word.id}</span>
                    </div>
                </div>
            </div>
        </main>
    )
}
