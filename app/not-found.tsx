import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#FDFBF7] text-center px-4">
            <h1 className="text-[12rem] font-serif font-black text-stone-200 leading-none">404</h1>
            <h2 className="text-3xl font-serif font-black text-stone-900 mb-6">Verse Not Found</h2>
            <Link
                href="/"
                className="px-10 py-4 bg-stone-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-orange-600 transition-all"
            >
                Return to Library
            </Link>
        </div>
    )
}
