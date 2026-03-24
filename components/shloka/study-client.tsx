'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import ShlokaMask from './shloka-mask'
import { VEDIC_LIBRARY } from '@/lib/texts'
import { useTranslations, useLocale } from 'next-intl'

interface FragmentLayer {
  author: string
  lang: string
  type: string
  content: string
}

interface Verse {
  id: string
  text_slug: string
  chapter: number
  verse: number
  original: string
  transliteration: string
  layers: FragmentLayer[]
}

const AUTHOR_METADATA: Record<string, { name: string, bio: string }> = {
  'iskcon-en': { name: 'A.C. Bhaktivedanta Swami Prabhupada', bio: 'Founder-Acharya of the International Society for Krishna Consciousness (ISKCON).' },
  'dnyaneshwari-en': { name: 'Sant Dnyaneshwar (Dnyaneshwari)', bio: 'The definitive 13th-century Marathi commentary and interpretation.' },
  // 📚 Archival Logic: Other authors are kept in data but excluded from the current UI context
  'all': { name: 'Comparative Scholarship', bio: '' }
}

export default function StudyClient({ 
  textSlug, 
  chapter, 
  verses 
}: { 
  textSlug: string, 
  chapter: number, 
  verses: Verse[] 
}) {
  const t = useTranslations('study')
  const locale = useLocale()
  const router = useRouter()
  
  // 🔱 FIXED COMMENTARY PERSPECTIVES: Focus on 2 Primary Scholars per User Request
  const [scholarSelection, setScholarSelection] = useState<string>('iskcon-en')
  const [showChapterMatrix, setShowChapterMatrix] = useState(false)
  
  const [synthesisMap, setSynthesisMap] = useState<Record<string, { text: string; loading: boolean }>>({})
  const [isChapterSynthesizing, setIsChapterSynthesizing] = useState(false)

  const verseRefs = useRef<Record<number, HTMLElement | null>>({})

  const cleanText = (txt: string) => (txt || '').replace(/\\n/g, '\n')
  
  /** 🧠 One-Click Chapter Synthesis */
  const synthesizeEntireChapter = async () => {
    setIsChapterSynthesizing(true)
    for (const verse of verses) {
       if (synthesisMap[verse.id]?.text) continue 
       setSynthesisMap(p => ({...p, [verse.id]: { text: '', loading: true }}))
       try {
         const texts = verse.layers.filter(l => l.type === 'commentary' && (l.author.includes('iskcon') || l.author.includes('dnyan'))).map(l => l.content)
         const res = await fetch('/api/synthesize', { 
           method: 'POST', 
           headers: {'Content-Type': 'application/json'}, 
           body: JSON.stringify({ verseId: verse.id, contextTexts: texts, language: 'en' }) 
         })
         const data = await res.json()
         if (data.success) setSynthesisMap(p => ({...p, [verse.id]: { text: data.synthesis, loading: false }}))
       } catch (e) { 
         setSynthesisMap(p => ({...p, [verse.id]: { text: 'Synthesis failed.', loading: false }})) 
       }
    }
    setIsChapterSynthesizing(false)
  }

  const bookData = VEDIC_LIBRARY.find(b => b.slug === textSlug)
  const totalChapters = bookData?.totalChapters || 1

  return (
    <>
      <header className="bg-white border-b border-stone-100 pt-10 pb-12 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-100/10 rounded-full blur-[120px] -mr-[300px] -mt-[300px] -z-10" />
        <div className="max-wide mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-10 relative z-10">
          <div className="space-y-6 flex-1">
             <div className="flex items-center gap-4">
                <Link href="/" className="text-[11px] font-black uppercase tracking-[0.4em] text-orange-600 hover:text-orange-700 transition-all flex items-center gap-3">
                   ← {t('backToDashboard')}
                </Link>
                <div className="w-[1px] h-3 bg-stone-200" />
                <span className="text-[11px] font-black uppercase tracking-[0.3em] text-stone-300">Scholarly Workspace</span>
             </div>
             <div className="flex items-center gap-8">
                <div className="w-2 h-20 bg-gradient-to-b from-orange-600 to-transparent rounded-full glow-orange" />
                <div>
                   <h1 className="text-5xl md:text-6xl font-serif font-black text-stone-900 leading-tight mb-4">
                      {bookData?.name || textSlug}
                   </h1>
                   <div className="flex items-center gap-4">
                      <button 
                        onClick={() => setShowChapterMatrix(!showChapterMatrix)}
                        className="bg-white border-2 border-stone-100 hover:border-orange-600 rounded-xl px-5 py-2.5 text-sm font-black text-stone-700 transition-all flex items-center gap-3 shadow-sm"
                      >
                        <span className="text-orange-600">Chapter {chapter}</span>
                        <svg className={`w-4 h-4 transition-transform ${showChapterMatrix ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path d="M19 9l-7 7-7-7" /></svg>
                      </button>
                      <h4 className="text-sm font-bold text-stone-400 uppercase tracking-widest hidden md:block">
                         {bookData?.chapterNames[String(chapter)]}
                      </h4>
                   </div>
                </div>
             </div>
          </div>

          <div className="flex items-center gap-3 bg-stone-50 p-2.5 rounded-2xl border border-stone-100">
             <button onClick={() => router.push(`/${textSlug}/${Math.max(1, chapter - 1)}`)} className="p-4 hover:bg-white hover:text-orange-600 rounded-xl transition-all disabled:opacity-20 active:scale-90" disabled={chapter === 1}>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path d="M15 19l-7-7 7-7" /></svg>
             </button>
             <button onClick={() => router.push(`/${textSlug}/${chapter + 1}`)} className="p-4 hover:bg-white hover:text-orange-600 rounded-xl transition-all disabled:opacity-20 active:scale-90" disabled={chapter >= totalChapters}>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path d="M9 5l7 7-7 7" /></svg>
             </button>
          </div>
        </div>

        {showChapterMatrix && (
          <div className="max-wide mx-auto mt-12 grid grid-cols-3 md:grid-cols-6 lg:grid-cols-9 gap-4 animate-in fade-in slide-in-from-top-4 duration-500">
             {Array.from({ length: totalChapters }).map((_, i) => (
                <Link 
                  key={i+1} 
                  href={`/${textSlug}/${i+1}`}
                  onClick={() => setShowChapterMatrix(false)}
                  className={`p-6 rounded-2xl text-center border-2 transition-all ${chapter === i+1 ? 'bg-stone-900 border-stone-900 text-white shadow-xl' : 'bg-white border-stone-100 hover:border-orange-300 hover:text-orange-600 shadow-sm'}`}
                >
                   <div className="text-xs font-black uppercase mb-1 opacity-50">Shard</div>
                   <div className="text-2xl font-serif font-black">{i+1}</div>
                </Link>
             ))}
          </div>
        )}
      </header>

      {/* 🛠️ NAVIGATION & CONTROL TOOLBAR (Simplified: Lang toggles removed) */}
      <div className="sticky top-16 z-40 glass border-b border-stone-200 backdrop-blur-xl">
        <div className="max-wide flex flex-col md:flex-row justify-between items-center py-4 gap-6">
           
           {/* Perspective Selection (2 Author Focus) */}
           <div className="flex items-center gap-1.5 bg-stone-50 border-2 border-stone-200 p-1.5 rounded-2xl">
             {(['iskcon-en', 'dnyaneshwari-en', 'all'] as const).map(s => (
                <button 
                  key={s}
                  onClick={() => setScholarSelection(s)}
                  className={`px-6 py-2 rounded-xl text-[11px] font-black uppercase tracking-[0.2em] transition-all ${scholarSelection === s ? 'bg-stone-900 text-white shadow-xl translate-y-[-1px]' : 'text-stone-400 hover:text-stone-600 hover:bg-white'}`}
                >
                  {s === 'all' ? 'Comparative Scholarship' : AUTHOR_METADATA[s]?.name.split(' ')[0] || s.toUpperCase()}
                </button>
             ))}
           </div>

           <button 
             onClick={synthesizeEntireChapter}
             disabled={isChapterSynthesizing}
             className="btn-primary !px-8 !py-3 !text-[11px] tracking-widest flex items-center gap-3 active:scale-95"
           >
              <span>{isChapterSynthesizing ? '✨' : '🧠'}</span>
              <span>{isChapterSynthesizing ? 'Synthesizing Wisdom...' : 'Analyze Chapter Intelligence'}</span>
           </button>
        </div>
      </div>

      <main className="bg-[#FAF9F6]">
        <div className="max-wide py-16 flex gap-12 relative">
          
          <aside className="hidden xl:block sticky top-44 self-start w-16 space-y-2">
             <div className="text-[10px] font-black text-stone-200 uppercase tracking-widest mb-6 border-b border-stone-100 pb-2">Shloka Index</div>
             {verses.map(v => (
                <button 
                  key={v.id} 
                  onClick={() => verseRefs.current[v.verse]?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
                  className="w-12 h-10 flex items-center justify-center rounded-xl bg-white border-2 border-stone-100 text-[11px] font-serif font-black text-stone-300 hover:border-orange-500 hover:text-orange-600 hover:shadow-lg transition-all"
                >
                   {v.verse}
                </button>
             ))}
          </aside>

          <section className="flex-1 space-y-20">
            {verses.map((verse) => {
               const enTrans = verse.layers.find(l => l.type === 'translation' && l.lang === 'en')
               
               // 🔱 TARGETED SCHOLAR FILTERING (ISKCON vs DNYANESHWARI)
               const commentaries = verse.layers.filter(l => {
                  if (scholarSelection === 'all') return l.author.includes('iskcon') || l.author.includes('dnyan')
                  if (scholarSelection === 'iskcon-en') return l.author === 'iskcon-en' || l.author === 'iskcon' || l.author === 'prabhu'
                  if (scholarSelection === 'dnyaneshwari-en') return l.author === 'dnyaneshwari-en' || l.author.includes('dnyan')
                  return false
               })
               
               const synth = synthesisMap[verse.id]
               const duoMode = scholarSelection === 'all' || (scholarSelection !== 'all' && commentaries.length > 1)

               return (
                 <article 
                   key={verse.id} 
                   ref={el => { verseRefs.current[verse.verse] = el }}
                   className="bg-white rounded-[4rem] p-0 shadow-2xl border border-stone-100 group transition-all duration-700 hover:shadow-orange-100/50"
                 >
                    {/* 📜 SACRED RAIL */}
                    <div className="bg-[#FCFBF9] border-b border-stone-100 px-12 py-20 text-center relative overflow-hidden">
                       <div className="absolute top-12 right-12 text-[12px] font-black text-stone-200 uppercase tracking-[0.4em]">
                          Fragment {verse.chapter}.{verse.verse}
                       </div>
                       <ShlokaMask text={verse.original} fontSize={32} />
                       <p className="mt-12 max-w-4xl mx-auto text-stone-500 font-serif italic text-xl md:text-2xl leading-relaxed opacity-60 px-6">
                          {verse.transliteration}
                       </p>
                    </div>

                    {/* 📚 MEANING LAYER (Utilizing full width) */}
                    <div className="px-12 py-20 border-b border-stone-50">
                        <div className="max-w-7xl mx-auto space-y-8 text-center">
                           <span className="label-bold !text-[12px] !text-orange-600 flex justify-center items-center gap-3">
                              <div className="w-2 h-[1px] bg-orange-600" /> English Verse Invariable
                           </span>
                           <p className="text-4xl md:text-6xl font-serif font-black text-stone-900 leading-[1.1] tracking-tight antialiased">
                              {cleanText(enTrans?.content || (verse as any).meaning || '')}
                           </p>
                        </div>
                    </div>

                    {/* 🎨 SCHOLARSHIP DECK (At Bottom - Fluid Parallel Comparison) */}
                    {commentaries.length > 0 && (
                       <div className={`bg-[#fdfbf7] px-12 py-20 grid gap-16 ${duoMode ? 'lg:grid-cols-2 lg:divide-x-2 lg:divide-stone-100' : 'grid-cols-1'}`}>
                          {commentaries.map((c, ci) => (
                             <div key={ci} className={`space-y-10 ${duoMode && ci > 0 ? 'lg:pl-16' : ''}`}>
                                <div className="flex items-center gap-4">
                                   <div className="w-2 h-2 rounded-full bg-orange-600" />
                                   <span className="text-xs font-black uppercase tracking-[0.2em] text-stone-400">
                                      {AUTHOR_METADATA[c.author]?.name || (c.author.includes('iskcon') ? 'A.C. Bhaktivedanta Swami Prabhupada' : 'Sant Dnyaneshwar')}
                                   </span>
                                </div>
                                <div className="text-stone-800 leading-relaxed text-lg md:text-2xl font-medium whitespace-pre-line selection:bg-orange-50 transition-colors group-hover:text-black">
                                   {cleanText(c.content)}
                                </div>
                             </div>
                          ))}
                       </div>
                    )}

                    {/* 🧠 COGNITIVE TATTVA (AI Synthesis) */}
                    {(synth?.text || synth?.loading) && (
                      <div className="bg-stone-950 p-16 border-t border-white/5 relative overflow-hidden group/synth">
                         <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-orange-600/10 blur-[180px] rounded-full group-hover/synth:translate-x-20 transition-all duration-[4000ms]" />
                         <div className="max-w-6xl mx-auto flex items-start gap-12 relative z-10">
                            <div className="w-20 h-20 rounded-[2.5rem] bg-orange-600 flex items-center justify-center text-4xl shadow-2xl shadow-orange-900/40">
                               {synth.loading ? '⏳' : '✨'}
                            </div>
                            <div className="flex-1 space-y-4">
                               <span className="label-bold !text-stone-600 !text-[12px] tracking-[0.4em] uppercase">Universal Tattva Synthesis</span>
                               <p className="text-stone-100 text-2xl md:text-4xl font-serif italic leading-relaxed antialiased opacity-95">
                                  &ldquo;{synth.loading ? 'Extracting the essence of traditional scholarship...' : cleanText(synth.text)}&rdquo;
                                </p>
                            </div>
                         </div>
                      </div>
                    )}
                 </article>
               )
            })}
          </section>
        </div>
      </main>
    </>
  )
}
