'use client'

import Link from 'next/link'
import { getLibraryStats, getVedicHierarchy, VedicText } from '@/lib/texts'
import { useTranslations, useLocale } from 'next-intl'
import { useState, useEffect } from 'react'

export default function Home() {
  const t = useTranslations('home')
  const locale = useLocale()
  const [mounted, setMounted] = useState(false)
  const stats = getLibraryStats()
  const hierarchy = getVedicHierarchy()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <div className="min-h-screen bg-background" />

  return (
    <main className="min-h-screen bg-background selection:bg-orange-100 py-12 md:py-24 px-6">
      <div className="max-wide mx-auto">
        
        {/* 🏛️ VEDIC PORTAL HERO */}
        <header className="mb-32 text-center relative max-w-5xl mx-auto py-16">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-orange-100/10 blur-[150px] rounded-full pointer-events-none vedic-bg-shimmer" />
          <div className="relative z-10 space-y-10">
            <div className="flex justify-center mb-6">
               <span className="inline-flex items-center gap-3 py-2 px-8 rounded-full glass border border-orange-100/50 text-orange-600 text-[10px] font-black tracking-[0.4em] uppercase shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-600 animate-pulse" />
                  Exploring Eternal Truths
               </span>
            </div>
            <h1 className="text-6xl md:text-8xl font-serif font-black text-stone-900 leading-[1.05] tracking-tight whitespace-pre-line">
              {locale === 'en' ? 'The Universal Repository\nof Vedic Wisdom' : t('title')}
            </h1>
            <p className="text-xl md:text-3xl text-stone-400 max-w-3xl mx-auto leading-relaxed font-serif italic font-light">
              &ldquo;{t('description')}&rdquo;
            </p>
            <div className="flex justify-center gap-6 pt-8">
              <Link 
                href="/bhagavad-gita/1" 
                className="btn-primary flex items-center gap-4 px-12 py-5 text-lg shadow-2xl shadow-orange-100/40 transform hover:scale-105 transition-all"
              >
                <span>📜</span> {t('beginReading')}
              </Link>
              <Link 
                href="/lab" 
                className="glass border border-stone-200 px-12 py-5 rounded-3xl font-black text-stone-600 uppercase tracking-widest text-xs hover:bg-stone-50 transition-all flex items-center gap-3"
              >
                <span>🧪</span> Explore Labs
              </Link>
            </div>
          </div>
        </header>

        {/* 📚 THE UNIVERSAL COLLECTION (HIERARCHICAL & CATEGORIZED) */}
        {stats.categories.map((cat: string) => (
          <section key={cat} className="mb-24">
            <div className="flex flex-col md:flex-row md:items-center gap-6 mb-12">
               <h2 className="text-4xl font-serif font-black text-stone-900 capitalize tracking-tight">{cat}</h2>
               <div className="h-[1px] flex-1 bg-stone-100 hidden md:block" />
               <div className="flex items-center gap-4 bg-orange-50/50 px-6 py-2 rounded-full border border-orange-100/50">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-600/60">Category Heartbeat:</span>
                  <span className="text-[10px] font-black text-orange-700">{hierarchy.statsByCat[cat]?.books} Books</span>
                  <span className="text-[10px] font-black text-orange-300">/</span>
                  <span className="text-[10px] font-black text-orange-700">{hierarchy.statsByCat[cat]?.fragments}+ Fragments</span>
               </div>
            </div>
            
            <div className="card-grid-sync">
              {hierarchy.tree.filter((t: any) => t.category === cat).map((text: any) => (
                <div 
                  key={text.slug} 
                  className={`group card-premium p-8 flex flex-col h-full min-h-[420px] bg-white/60 relative overflow-hidden ${!text.available && 'opacity-40 grayscale pointer-events-none'}`}
                >
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-orange-100 transition-colors duration-700" />
              
              <div className="flex justify-between items-center mb-6 relative z-10">
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border transition-colors ${text.available ? 'bg-orange-50 text-orange-700 border-orange-200' : 'bg-stone-100 text-stone-400 border-stone-200'}`}>
                   {text.category}
                </span>
                {text.children?.length > 0 && (
                  <span className="text-[10px] font-black text-orange-600 bg-orange-100/50 px-2 py-0.5 rounded-full border border-orange-200 animate-pulse">
                     {text.children.length} Nested Shards
                  </span>
                )}
              </div>
              
              <Link href={`/${text.slug}/1`} className="block group/title">
                <h3 className="text-2xl md:text-3xl font-serif font-black text-stone-900 mb-4 leading-[1.1] group-hover/title:text-orange-600 transition-colors relative z-10">
                  {locale === 'hi' ? text.nameHi : locale === 'mr' ? text.nameMr : text.name}
                </h3>
              </Link>
              
              <p className="text-stone-500 text-sm mb-8 leading-relaxed font-medium line-clamp-4 font-serif relative z-10">
                {text.description}
              </p>

              {/* 🧩 NESTED CHILDREN (Smart Grouping) */}
              {text.children?.length > 0 && (
                <div className="space-y-3 mb-10 relative z-10">
                   <div className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-400 mb-4 border-b border-stone-100 pb-2">Part of this Epic:</div>
                   {text.children.map((child: any) => (
                      <Link 
                        key={child.slug} 
                        href={`/${child.slug}/1`}
                        className="flex items-center justify-between p-4 bg-white/80 rounded-2xl border border-stone-100 hover:border-orange-300 hover:shadow-lg transition-all group/child"
                      >
                         <span className="text-sm font-serif font-black text-stone-700 group-hover:text-orange-600">{child.name}</span>
                         <span className="text-[10px] font-black uppercase tracking-widest text-stone-300 group-hover/child:text-orange-400">Read Now</span>
                      </Link>
                   ))}
                </div>
              )}

              <div className="mt-auto pt-6 border-t border-stone-100 flex items-center justify-between relative z-10">
                <div>
                   <span className="label-bold !text-stone-300 block mb-0.5">Chapters</span>
                   <span className="text-2xl font-serif font-black text-stone-900 group-hover:text-orange-600 transition-colors">{text.totalChapters}</span>
                </div>
                <Link 
                   href={`/${text.slug}/1`}
                   className="w-12 h-12 bg-stone-900 text-white rounded-2xl flex items-center justify-center transition-all group-hover:bg-orange-600 group-hover:scale-110 shadow-lg"
                >
                   <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    ))}
  </div>
</main>
  )
}
