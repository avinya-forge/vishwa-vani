import Link from 'next/link'
import { DictionaryEntry } from '@/utils/services/dictionary'

interface WordCardProps {
    word: DictionaryEntry
}

export default function WordCard({ word }: WordCardProps) {
    return (
        <Link href={`/dictionary/${word.id}`} className="block group">
            <div className="bg-white rounded-xl border border-orange-100 p-6 shadow-sm hover:shadow-md hover:border-orange-300 transition-all cursor-pointer h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-orange-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>

                <h3 className="text-2xl font-bold text-gray-900 mb-2 font-serif relative z-10">{word.root_word}</h3>

                <div className="space-y-1 relative z-10">
                    <p className="text-gray-700"><span className="text-xs uppercase tracking-wide text-gray-400 font-semibold w-8 inline-block">En</span> {word.meaning_en}</p>
                    {word.meaning_hi && <p className="text-gray-600"><span className="text-xs uppercase tracking-wide text-gray-400 font-semibold w-8 inline-block">Hi</span> {word.meaning_hi}</p>}
                    {word.meaning_mr && <p className="text-gray-600"><span className="text-xs uppercase tracking-wide text-gray-400 font-semibold w-8 inline-block">Mr</span> {word.meaning_mr}</p>}
                </div>

                <div className="mt-4 pt-4 border-t border-gray-50 flex gap-2">
                    {word.metadata && typeof word.metadata === 'object' && Object.keys(word.metadata).map((key) => (
                        <span key={key} className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded-md capitalize">
                            {key}: {(word.metadata as any)[key]}
                        </span>
                    ))}
                </div>
            </div>
        </Link>
    )
}
