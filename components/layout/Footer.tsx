'use client'

import React from 'react'
import { useTranslations } from 'next-intl'

export default function Footer() {
  const t = useTranslations('footer')

  return (
    <footer className="w-full bg-stone-900 border-t border-stone-800 pt-20 pb-12 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-600 via-stone-800 to-orange-600 opacity-20" />
      
      <div className="max-wide px-6 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
        
        {/* BRAND & LOGO */}
        <div className="col-span-1 lg:col-span-1">
          <div className="flex items-center gap-3 mb-6 transition-transform hover:scale-105 active:scale-95 duration-500 cursor-default">
            <div className="w-12 h-12 bg-white text-orange-600 rounded-2xl flex items-center justify-center text-2xl font-black shadow-xl ring-8 ring-stone-800 rotate-12">ॐ</div>
            <span className="text-3xl font-serif font-black text-white tracking-tighter">Vishwa-Vani</span>
          </div>
          <p className="text-stone-400 text-sm leading-relaxed mb-8 max-w-xs font-serif italic italic text-[16px]">
             &ldquo;{t('tagline') || 'Restoring the Universal Voice of Vedic Wisdom through AI-integrated scholarship and open-access intelligence.'}&rdquo;
          </p>
        </div>

        {/* ECOSYSTEM */}
        <div className="space-y-6">
          <span className="label-bold !text-stone-500 block underline underline-offset-8 decoration-orange-600/30">Ecosystem</span>
          <div className="grid grid-cols-1 gap-4">
             {['Vedic Lab', 'Gita Research', 'Tattva Map', 'Shastra Search'].map(item => (
                <button key={item} className="text-stone-400 hover:text-white transition-colors text-left text-base font-bold flex items-center gap-2 group cursor-not-allowed">
                   <div className="w-2 h-2 bg-stone-700 rounded-full group-hover:bg-orange-600 group-hover:scale-125 transition-all" />
                   {item}
                </button>
             ))}
          </div>
        </div>

        {/* CONTRIBUTION */}
        <div className="space-y-6">
          <span className="label-bold !text-stone-500 block underline underline-offset-8 decoration-orange-600/30">Open Access</span>
          <div className="space-y-4">
             <p className="text-stone-400 text-sm leading-relaxed">
                Vishwa-Vani is a non-profit, open-source project. Contribute to the preservation of cultural heritage.
             </p>
             <a href="https://github.com/vishwa-vani" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-orange-600 text-white font-black text-xs uppercase tracking-widest px-6 py-3 rounded-2xl transition-all hover:bg-orange-500 shadow-xl active:scale-95">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                Contribute
             </a>
          </div>
        </div>

        {/* LEGAL */}
        <div className="space-y-6">
           <span className="label-bold !text-stone-500 block underline underline-offset-8 decoration-orange-600/30">Archives</span>
           <div className="space-y-1">
              <span className="block text-stone-500 text-xs font-black uppercase tracking-widest mb-1 opacity-40">Status</span>
              <div className="flex items-center gap-2">
                 <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                 <span className="text-white text-sm font-bold tracking-widest">NVF 1.1 Ready</span>
              </div>
           </div>
           <p className="text-stone-500 text-xs font-bold leading-relaxed pt-10">
              &copy; {new Date().getFullYear()} Vishwa-Vani Organization. Licensed under MIT. Distributed by Shastra Foundation.
           </p>
        </div>

      </div>
    </footer>
  )
}
