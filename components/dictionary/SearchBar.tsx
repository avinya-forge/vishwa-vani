'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { useDebounce } from '@/utils/hooks/useDebounce'
import { searchWordsAction } from '@/app/actions/dictionary'
import { DictionaryEntry } from '@/utils/services/dictionary'

export default function SearchBar() {
    const router = useRouter()
    const searchParams = useSearchParams()

    const initialQuery = searchParams.get('q') || ''
    const initialLang = searchParams.get('lang') || 'all'

    const [text, setText] = useState(initialQuery)
    const [language, setLanguage] = useState(initialLang)

    const debouncedText = useDebounce(text, 300)

    const [results, setResults] = useState<DictionaryEntry[]>([])
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const dropdownRef = useRef<HTMLDivElement>(null)

    // Handle outside clicks
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    // Fetch fuzzy results
    useEffect(() => {
        async function fetchResults() {
            if (!debouncedText) {
                setResults([])
                setIsOpen(false)
                return
            }

            setIsLoading(true)
            const data = await searchWordsAction(debouncedText, language === 'all' ? undefined : language)
            setResults(data || [])
            setIsOpen(true)
            setIsLoading(false)
        }
        fetchResults()
    }, [debouncedText, language])

    const handleSubmit = (e?: React.FormEvent) => {
        if (e) e.preventDefault()
        setIsOpen(false)

        const params = new URLSearchParams()
        if (text) params.set('q', text)
        if (language !== 'all') params.set('lang', language)

        const qStr = params.toString()
        router.push(qStr ? `/dictionary?${qStr}` : '/dictionary')
    }

    const handleSelectResult = (word: string) => {
        setText(word)
        setIsOpen(false)

        const params = new URLSearchParams()
        params.set('q', word)
        if (language !== 'all') params.set('lang', language)

        router.push(`/dictionary?${params.toString()}`)
    }

    return (
        <div className="relative max-w-xl mx-auto mb-10" ref={dropdownRef}>
            <form onSubmit={handleSubmit} className="relative flex flex-col md:flex-row gap-2">
                <div className="relative flex-grow">
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => {
                            setText(e.target.value)
                            if (!e.target.value) setIsOpen(false)
                        }}
                        onFocus={() => {
                            if (results.length > 0) setIsOpen(true)
                        }}
                        placeholder="Search Sanskrit words (e.g., Ganapati)..."
                        className="w-full px-6 py-4 text-lg bg-white border-2 border-orange-100 rounded-full md:rounded-r-none shadow-sm focus:border-orange-400 focus:outline-none focus:ring-4 focus:ring-orange-100/50 transition-all placeholder:text-gray-400 text-gray-800"
                    />

                    {isLoading && (
                        <div className="absolute right-4 top-1/2 -translate-y-1/2">
                            <div className="w-5 h-5 border-2 border-orange-200 border-t-orange-600 rounded-full animate-spin"></div>
                        </div>
                    )}
                </div>

                <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="px-6 py-4 text-lg bg-white border-2 border-orange-100 rounded-full md:rounded-l-none md:border-l-0 shadow-sm focus:border-orange-400 focus:outline-none focus:ring-4 focus:ring-orange-100/50 text-gray-700 font-medium transition-all"
                >
                    <option value="all">All Languages</option>
                    <option value="en">English</option>
                    <option value="hi">Hindi (हिंदी)</option>
                    <option value="mr">Marathi (मराठी)</option>
                </select>

                <button type="submit" className="hidden" aria-hidden="true"></button>
            </form>

            {/* Auto-complete Dropdown */}
            {isOpen && results.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 z-50 max-h-80 overflow-y-auto">
                    <ul className="py-2">
                        {results.map((result) => (
                            <li key={result.id}>
                                <button
                                    onClick={() => handleSelectResult(result.root_word)}
                                    className="w-full text-left px-6 py-3 hover:bg-orange-50 transition-colors flex items-center justify-between group"
                                >
                                    <div>
                                        <span className="font-bold text-gray-800 text-lg group-hover:text-orange-700">
                                            {result.root_word}
                                        </span>
                                        {language === 'en' && result.meaning_en && (
                                            <p className="text-sm text-gray-500 truncate mt-0.5">{result.meaning_en}</p>
                                        )}
                                        {language === 'hi' && result.meaning_hi && (
                                            <p className="text-sm text-gray-500 truncate mt-0.5">{result.meaning_hi}</p>
                                        )}
                                        {language === 'mr' && result.meaning_mr && (
                                            <p className="text-sm text-gray-500 truncate mt-0.5">{result.meaning_mr}</p>
                                        )}
                                        {(language === 'all' || !language) && (
                                            <p className="text-sm text-gray-500 truncate mt-0.5">
                                                {result.meaning_en || result.meaning_hi || result.meaning_mr}
                                            </p>
                                        )}
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300 group-hover:text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <p className="text-center text-xs text-gray-500 mt-4">
                Try searching for: <span className="text-orange-600 font-medium cursor-pointer" onClick={() => handleSelectResult('Aum')}>Aum</span>, <span className="text-orange-600 font-medium cursor-pointer" onClick={() => handleSelectResult('Namaste')}>Namaste</span>
            </p>
        </div>
    )
}
