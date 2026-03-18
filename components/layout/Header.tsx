'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'

export default function Header() {
  const t = useTranslations('nav')
  const ht = useTranslations('home')

  return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16 bg-white/50 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
        <div className="flex gap-5 items-center font-semibold">
          <Link href="/" className="text-2xl font-serif font-bold tracking-tight text-orange-600 hover:text-orange-700 transition-colors">
            Vishwa-Vani
          </Link>
          <div className="flex items-center gap-6 text-stone-600 ml-4 hidden md:flex">
            <Link href="/" className="hover:text-orange-600 transition-colors flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18 18.246 18.523 16.5 18.523s-3.332-.477-4.5-1.253" />
              </svg>
              {t('library')}
            </Link>
            <Link href="/search" className="hover:text-orange-600 transition-colors flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {t('search')}
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
            <Link
              href="/bhagavad-gita/1"
              className="py-2 px-6 rounded-full no-underline bg-orange-600 hover:bg-orange-700 text-white font-semibold text-sm transition-all shadow-sm transform hover:-translate-y-0.5"
            >
              {ht('beginReading')}
            </Link>
        </div>
      </div>
    </nav>
  )
}

