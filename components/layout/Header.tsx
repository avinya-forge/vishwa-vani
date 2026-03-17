import Link from 'next/link'

export default function Header() {
  return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16 bg-white/50 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
        <div className="flex gap-5 items-center font-semibold">
          <Link href="/" className="text-xl font-bold tracking-tight text-orange-900 hover:text-orange-700 transition-colors">
            Vishwa-Vani
          </Link>
          <div className="flex items-center gap-4 text-orange-800 ml-4 hidden md:flex">
            <Link href="/" className="hover:text-orange-600 transition-colors">Knowledge Base</Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
            <Link
              href="/"
              className="py-2 px-6 rounded-full no-underline bg-orange-600 hover:bg-orange-700 text-white font-semibold text-sm transition-all shadow-sm transform hover:-translate-y-0.5"
            >
              Start Reading
            </Link>
        </div>
      </div>
    </nav>
  )
}
