'use client'

import { useEffect } from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Global Error Boundary caught:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-[#FDFBF7] dark:bg-[#1C1917] flex flex-col items-center justify-center p-6 text-center">
      <div className="bg-white dark:bg-stone-900 p-8 rounded-2xl shadow-xl max-w-md w-full border border-stone-100 dark:border-stone-800">
        <div className="text-4xl mb-4">⚠️</div>
        <h2 className="text-2xl font-devanagari font-bold text-orange-900 dark:text-orange-400 mb-2">Something went wrong</h2>
        <p className="text-stone-600 dark:text-stone-400 mb-6">
          We apologize for the inconvenience. An unexpected error occurred while loading this page.
        </p>

        <div className="flex flex-col space-y-3">
          <button
            onClick={() => reset()}
            className="bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
          >
            Try again
          </button>

          <button
            onClick={() => {
              // A simple way to trigger the feedback widget is to dispatch a custom event
              // We'll update the feedback widget to listen for this if needed,
              // or the user can just use the floating button that remains on screen.
              document.querySelector<HTMLButtonElement>('button[aria-label="Report an issue or give feedback"]')?.click()
            }}
            className="bg-stone-200 hover:bg-stone-300 text-stone-800 font-medium py-3 px-4 rounded-lg transition-colors"
          >
            Report this bug
          </button>
        </div>
      </div>
    </div>
  )
}
