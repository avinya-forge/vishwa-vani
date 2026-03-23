'use client'

import { useTranslations } from 'next-intl'

export default function footer() {
  const footerT = useTranslations('footer')
  const homeT = useTranslations('home')

  return (
    <footer className="bg-white border-t border-stone-200 mt-auto relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#EA580C 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
      <div className="max-wide mx-auto py-8 px-4 sm:px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <span className="text-2xl font-bold text-orange-600 font-serif tracking-tight">Vedic Wikipedia</span>
            <p className="text-sm text-stone-500 mt-2 max-w-xs">{homeT('subtitle')}</p>
          </div>
          <div className="flex space-x-6">
            <a href="https://github.com/vishwa-vani" target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-orange-600 transition-colors group flex flex-col items-center">
              <svg className="h-6 w-6 mb-1 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              <span className="text-[9px] font-bold uppercase tracking-widest text-stone-400 group-hover:text-orange-600">Open Source</span>
            </a>
          </div>
        </div>
        <div className="mt-8 border-t border-stone-100 pt-6 text-center flex flex-col items-center gap-4">
          <div className="max-w-2xl text-stone-600 bg-orange-50/50 p-4 rounded-xl border border-orange-100 shadow-sm relative group overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-orange-200/20 blur-3xl rounded-full" />
            <p className="text-[13px] leading-relaxed translate-z-0">
              {footerT('donate')}
            </p>
            <a href="https://github.com/vishwa-vani" target="_blank" rel="noopener noreferrer" className="inline-block mt-3 px-5 py-2 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-700 transition-all shadow-md hover:shadow-orange-200 text-[12px] uppercase tracking-widest">
              {footerT('donateLink')}
            </a>
          </div>
          <p className="text-[12px] text-stone-400 font-medium">
            &copy; {new Date().getFullYear()} {footerT('copyright')}
          </p>
        </div>
      </div>
    </footer>
  )
}

