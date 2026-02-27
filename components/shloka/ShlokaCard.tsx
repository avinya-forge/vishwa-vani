'use client'

import { Shloka } from '@/utils/services/shloka'
import WordSpan from './WordSpan'

interface ShlokaCardProps {
    shloka: Shloka
}

interface WordMapping {
    original_word: string
    word_id_ref?: string
}

export default function ShlokaCard({ shloka }: ShlokaCardProps) {
    // Parse the JSONB safely
    const words = (shloka.word_mapping as unknown as WordMapping[]) || []

    return (
        <div className="max-w-3xl mx-auto my-8 p-8 bg-orange-50 rounded-xl shadow-sm border border-orange-100">
            <div className="flex justify-between items-center mb-6 text-orange-800/60 text-sm uppercase tracking-wider font-semibold">
                <span>{shloka.deity}</span>
                <span>{shloka.source_text} • Verse {shloka.verse_index}</span>
            </div>

            <div className="text-2xl md:text-3xl font-serif text-gray-800 leading-relaxed text-center mb-8">
                {/* If mapping exists, render interactive words. Else render raw text. */}
                {words.length > 0 ? (
                    <div className="flex flex-wrap justify-center">
                        {words.map((w, i) => (
                            <WordSpan
                                key={i}
                                originalWord={w.original_word}
                                wordId={w.word_id_ref}
                            />
                        ))}
                    </div>
                ) : (
                    <p>{shloka.sanskrit_text}</p>
                )}
            </div>

            <div className="text-center">
                {/* Placeholder for English Translation of the whole verse if we add that column later */}
            </div>
        </div>
    )
}
