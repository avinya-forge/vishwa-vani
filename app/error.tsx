'use client'

import { useEffect } from 'react'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 text-center px-4">
            <h2 className="text-2xl font-bold text-red-800 mb-4">Something went wrong!</h2>
            <p className="text-red-600 mb-8 max-w-md">
                An unexpected error occurred. Please try again.
            </p>
            <button
                onClick={() => reset()}
                className="px-6 py-3 bg-red-600 text-white rounded-full font-semibold hover:bg-red-700 transition-colors shadow-md"
            >
                Try again
            </button>
        </div>
    )
}
