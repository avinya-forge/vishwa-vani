'use client'

import { useState } from 'react'
import { getWordDefinitionAction } from '@/app/actions/dictionary'
import { DictionaryEntry } from '@/utils/services/dictionary'

interface WordSpanProps {
    originalWord: string
    wordId?: string
}

export default function WordSpan({ originalWord, wordId }: WordSpanProps) {
    const [definition, setDefinition] = useState<DictionaryEntry | null>(null)
    const [loading, setLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    const handleClick = async () => {
        if (!wordId) return

        if (isOpen) {
            setIsOpen(false)
            return
        }

        setIsOpen(true)

        if (!definition && !loading) {
            setLoading(true)
            const data = await getWordDefinitionAction(wordId)
            setDefinition(data)
            setLoading(false)
        }
    }

    if (!wordId) {
        return <span className="mx-1">{originalWord}</span>
    }

    return (
        <span className="relative inline-block mx-1">
            <span
                onClick={handleClick}
                className={`cursor-pointer border-b-2 border-dotted border-gray-400 hover:border-yellow-500 hover:text-yellow-600 transition-colors ${isOpen ? 'text-yellow-700 border-yellow-700' : ''}`}
            >
                {originalWord}
            </span>

            {isOpen && (
                <div className="absolute z-10 bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-4 bg-white shadow-xl rounded-lg border border-gray-200 text-sm">
                    {loading ? (
                        <p className="text-gray-500">Loading...</p>
                    ) : definition ? (
                        <div>
                            <h4 className="font-bold text-lg text-gray-900 mb-1">{definition.root_word}</h4>
                            <div className="space-y-1">
                                <p><span className="font-semibold text-gray-600">En:</span> {definition.meaning_en}</p>
                                <p><span className="font-semibold text-gray-600">Hi:</span> {definition.meaning_hi}</p>
                                <p><span className="font-semibold text-gray-600">Mr:</span> {definition.meaning_mr}</p>
                            </div>
                            {/* Debug Metadata */}
                            {/* <pre className="text-xs text-gray-400 mt-2">{JSON.stringify(definition.metadata, null, 2)}</pre> */}
                        </div>
                    ) : (
                        <p className="text-red-500">Definition not found.</p>
                    )}

                    <div className="absolute w-3 h-3 bg-white border-r border-b border-gray-200 transform rotate-45 left-1/2 -translate-x-1/2 -bottom-1.5"></div>
                </div>
            )}
        </span>
    )
}
