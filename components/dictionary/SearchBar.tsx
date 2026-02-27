'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useDebounce } from 'use-debounce'

export default function SearchBar() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const initialQuery = searchParams.get('q') || ''

    const [text, setText] = useState(initialQuery)
    const [query] = useDebounce(text, 500)

    useEffect(() => {
        if (query === initialQuery) return

        if (!query) {
            router.push('/dictionary')
        } else {
            router.push(`/dictionary?q=${encodeURIComponent(query)}`)
        }
    }, [query, router, initialQuery])

    return (
        <div className="relative max-w-xl mx-auto mb-10">
            <div className="relative">
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Search Sanskrit words (e.g., Ganapati)..."
                    className="w-full px-6 py-4 text-lg bg-white border-2 border-orange-100 rounded-full shadow-sm focus:border-orange-400 focus:outline-none focus:ring-4 focus:ring-orange-100/50 transition-all placeholder:text-gray-400 text-gray-800"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
            </div>
            <p className="text-center text-xs text-gray-500 mt-2">
                Try searching for: <span className="text-orange-600 font-medium">Aum</span>, <span className="text-orange-600 font-medium">Namaste</span>
            </p>
        </div>
    )
}
