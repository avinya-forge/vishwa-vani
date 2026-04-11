'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center bg-red-50 rounded-lg">
      <h2 className="text-xl font-bold text-red-900 mb-2">Something went wrong!</h2>
      <p className="text-red-700 mb-4">
        {error.message?.includes('404') && "The requested verse or chapter could not be found."}
        {error.message?.includes('429') && "Rate limit exceeded. Please try again later."}
        {!error.message?.includes('404') && !error.message?.includes('429') && (error.message || "An unexpected error occurred.")}
      </p>
      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
      >
        Try again
      </button>
    </div>
  )
}
