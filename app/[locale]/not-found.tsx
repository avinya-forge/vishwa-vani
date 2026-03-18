import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-amber-50 text-center px-4">
            <h1 className="text-9xl font-bold text-orange-200 font-serif mb-4">404</h1>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Page Not Found</h2>
            <p className="text-gray-600 mb-8 max-w-md">
                The wisdom you seek is not here. Perhaps it is hidden in another verse.
            </p>
            <Link
                href="/"
                className="px-6 py-3 bg-orange-600 text-white rounded-full font-semibold hover:bg-orange-700 transition-colors shadow-md"
            >
                Return Home
            </Link>
        </div>
    )
}
