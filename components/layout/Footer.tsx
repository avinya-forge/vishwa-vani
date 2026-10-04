'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

export default function Footer() {
  const t = useTranslations('footer')

  return (
    <footer className="w-full bg-stone-900 border-t border-stone-800 pt-16 pb-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-600 via-stone-800 to-orange-600 opacity-20" />
      
      <div className="max-wide px-6 mx-auto flex flex-col md:flex-row justify-between gap-12">
        {/* BRAND */}
        <div className="flex-1 max-w-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-white text-orange-600 rounded-xl flex items-center justify-center text-xl font-black rotate-12">ॐ</div>
            <span className="text-2xl font-serif font-black text-white tracking-tighter">Vishwa-Vani</span>
          </div>
          <p className="text-stone-300 text-sm leading-relaxed mb-6 font-serif italic">
             &ldquo;{t('tagline') || 'Restoring the Universal Voice of Vedic Wisdom through AI-integrated scholarship and open-access intelligence.'}&rdquo;
          </p>
          <div className="flex items-center gap-2">
             <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
             <span className="text-stone-300 text-xs font-bold tracking-widest uppercase">Verse Archive Active</span>
          </div>
        </div>

        {/* ECOSYSTEM */}
        <div className="flex-1">
          <span className="text-stone-200 text-sm font-black uppercase tracking-widest block mb-4">Ecosystem</span>
          <div className="flex flex-col gap-3">
             <Link href="/lab" className="text-stone-400 hover:text-white transition-colors text-sm font-bold">Vedic Lab</Link>
             <Link href="/bhagavad-gita/1" className="text-stone-400 hover:text-white transition-colors text-sm font-bold">Gita Research</Link>
             <Link href="/roadmap" className="text-stone-400 hover:text-white transition-colors text-sm font-bold">Roadmap</Link>
             <Link href="/search" className="text-stone-400 hover:text-white transition-colors text-sm font-bold">Shastra Search</Link>
          </div>
        </div>

        {/* CONNECT & LEGAL */}
        <div className="flex-1">
          <span className="text-stone-200 text-sm font-black uppercase tracking-widest block mb-4">Connect</span>
          <div className="flex flex-col gap-3">
             <a href="https://github.com/vishwa-vani" target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-white transition-colors text-sm font-bold">GitHub (Open Source)</a>
             <Link href="/developer" className="text-stone-400 hover:text-white transition-colors text-sm font-bold">Developer API</Link>
             <Link href="/privacy" className="text-stone-400 hover:text-white transition-colors text-sm font-bold">Privacy & Cookies</Link>
          </div>
        </div>
      </div>
      
      <div className="max-wide px-6 mx-auto mt-12 pt-8 border-t border-stone-800">
         <p className="text-stone-500 text-xs font-bold text-center">
            &copy; {new Date().getFullYear()} Vishwa-Vani Organization. Licensed under MIT. Distributed by Shastra Foundation.
         </p>
      </div>
    </footer>
  )
}
