'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import ShlokaMask from './shloka-mask'
import VedicTimeline from './vedic-timeline'
import VedicManuscriptCard from './vedic-manuscript-card'
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
  original?: string
  transliteration?: string
  layers: FragmentLayer[]
}

const AUTHOR_METADATA: Record<string, { name: string, bio: string, label: string, icon: string }> = {
  'none': { 
    name: 'Primal Perspective', 
    label: 'Refined Scripture',
    icon: '🧘',
    bio: 'Pure scripture without external commentary, focusing on the original Sanskrit shloka and its meaning.' 
  },
  'iskcon-en': { 
    name: 'A.C. Bhaktivedanta Swami Prabhupada', 
    label: 'Bhaktivedanta Vedapurusa',
    icon: '🔱',
    bio: 'Founder-Acharya of the International Society for Krishna Consciousness (ISKCON).' 
  },
  'dnyaneshwari-en': { 
    name: 'Sant Dnyaneshwar Maharaj (Trans. D.A. Ghaisas)', 
    label: 'The Dnyaneshwari',
    icon: '📜',
    bio: 'The definitive 13th-century Marathi commentary translated by Diwakar Anant Ghaisas.' 
  },
  'all': { 
    name: 'Comparative Scholarship Synthesis', 
    label: 'All Commentaries',
    icon: '🏛️',
    bio: 'A side-by-side comparative view of multiple scriptural realizations.' 
  }
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
  
  // 🔱 PERSISTENT SCHOLAR SELECTION: Remembering user preference across pages
  const [scholarSelection, setScholarSelection] = useState<string>('iskcon-en')
  const [showChapterMatrix, setShowChapterMatrix] = useState(false)
  
  useEffect(() => {
    const saved = localStorage.getItem('vishwa_scholar_pref')
    if (saved && AUTHOR_METADATA[saved]) setScholarSelection(saved)
  }, [])

  const updateScholar = (s: string) => {
    setScholarSelection(s)
    localStorage.setItem('vishwa_scholar_pref', s)
  }

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

        <div className="max-wide mx-auto mt-10 space-y-8 relative z-10">
           {/* ⏳ GENEALOGICAL ANCHOR (Redesigned Stream) */}
           <VedicTimeline slug={textSlug} />
           
           {/* 🗺️ SHARD STREAM (Grid-based Navigator) */}
           <div className="space-y-6">
              <div className="flex items-center justify-between px-2">
                 <h4 className="text-[10px] font-black uppercase tracking-[0.4rem] text-stone-300">Epic Shards ({totalChapters})</h4>
                 <div className="hidden md:flex items-center gap-4 bg-orange-50/50 px-5 py-2 rounded-full border border-orange-100/50">
                    <span className="text-[10px] font-black text-orange-600 uppercase tracking-widest leading-none">Currently Exploring: Shard {chapter}</span>
                 </div>
              </div>
              
              <div className="flex flex-wrap gap-3 px-2">
                 {Array.from({ length: totalChapters }, (_, i) => i + 1).map((n) => (
                    <Link 
                      key={n} 
                      href={`/${textSlug}/${n}`}
                      title={bookData?.chapterNames[String(n)]}
                      className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center transition-all duration-300 font-serif font-black text-lg ${
                        n === chapter 
                        ? 'bg-stone-900 border-stone-800 text-white shadow-lg scale-110 z-10' 
                        : 'bg-white border-stone-100 text-stone-300 hover:border-orange-300 hover:text-stone-900 hover:scale-105'
                      }`}
                    >
                       {n}
                    </Link>
                 ))}
              </div>
           </div>
        </div>
      </header>

      {/* 🛠️ NAVIGATION & CONTROL TOOLBAR (Simplified: Lang toggles removed) */}
      <div className="sticky top-16 z-40 glass border-b border-stone-200 backdrop-blur-xl">
        <div className="max-wide flex flex-col md:flex-row justify-between items-center py-4 gap-6">
           
           {/* Perspective Selection (Scholarly Custom Selection) */}
           <div className="flex items-center gap-2 bg-stone-100/50 p-1.5 rounded-[2rem] border border-stone-200 shadow-inner">
             {(['none', 'iskcon-en', 'dnyaneshwari-en', 'all'] as const).map(s => (
                <button 
                  key={s}
                  onClick={() => updateScholar(s)}
                  className={`flex items-center gap-3 px-6 py-3 rounded-full text-sm font-black transition-all duration-500 whitespace-nowrap ${
                    scholarSelection === s 
                    ? 'bg-white text-stone-900 shadow-xl shadow-orange-100/50 scale-105 border border-orange-200' 
                    : 'text-stone-400 hover:text-stone-600 hover:bg-white/50'
                  }`}
                >
                   <span className={scholarSelection === s ? 'opacity-100' : 'opacity-40 grayscale'}>{AUTHOR_METADATA[s].icon}</span>
                   {AUTHOR_METADATA[s].label}
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

      <main className="bg-[#FAF9F6] relative overflow-hidden">
        {/* 🎭 VEDIC BACKGROUND ORNAMENTATION (Subtle fixed patterns) */}
        <div className="fixed inset-0 pointer-events-none opacity-[0.03] grayscale" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M30 0l15 30-15 30-15-30z\' fill=\'%23a16207\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")' }} />
        
        <div className="max-wide py-16 flex gap-12 relative z-10">
           
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
            {/* 📊 CHAPTER INTELLIGENCE (Archival Metrics & AI Specialty) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24 animate-in fade-in slide-in-from-bottom-4 duration-1000 relative">
               <div className="card-premium p-8 bg-white/40 backdrop-blur-md border-white/50 shadow-2xl hover:translate-y-[-4px] transition-all relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-50/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="flex items-center gap-3 mb-4 relative z-10">
                     <span className="text-xl">📊</span>
                     <span className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-400">Archival Scope</span>
                  </div>
                  <div className="flex items-baseline gap-2 relative z-10">
                     <span className="text-5xl font-serif font-black text-stone-900">{verses.length}</span>
                     <span className="text-sm font-black text-stone-300 uppercase tracking-widest leading-none">Shlokas</span>
                  </div>
                  <div className="mt-6 h-1.5 w-full bg-stone-100/50 rounded-full overflow-hidden relative z-10">
                     <div className="h-full bg-orange-400 animate-[vedic-shimmer_3s_infinite]" style={{ width: '100%' }} />
                  </div>
               </div>

               <div className="card-premium p-8 bg-white/40 backdrop-blur-md border-white/50 shadow-2xl hover:translate-y-[-4px] transition-all relative overflow-hidden">
                  <div className="flex items-center gap-3 mb-5">
                     <span className="text-xl">🧠</span>
                     <span className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-600/40">AI Scriptural Focus</span>
                  </div>
                  <div className="space-y-4">
                     <div className="flex flex-wrap gap-2">
                        {((verses[0] as any)?.ai_metadata?.specialty?.focus || ['Dharma', 'Philosophy']).map((t: string) => (
                           <span key={t} className="px-3 py-1 bg-white/80 text-[9px] font-black text-orange-700 uppercase tracking-[0.2em] rounded-full border border-orange-100/30 shadow-sm">{t}</span>
                        ))}
                     </div>
                     <p className="text-sm font-serif italic text-stone-500 leading-relaxed antialiased">
                        { (verses[0] as any)?.ai_metadata?.specialty?.description || 'Deep scholarly exploration of the foundational scriptural narrative and philosophical discourse.' }
                     </p>
                  </div>
               </div>

               <div className="card-premium p-8 bg-white/40 backdrop-blur-md border-white/50 shadow-2xl hover:translate-y-[-4px] transition-all relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-orange-100/10 rounded-full blur-3xl -mr-16 -mt-16" />
                  <div className="flex items-center gap-3 mb-4">
                     <span className="text-xl">⏳</span>
                     <span className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-400">Historical Window</span>
                  </div>
                  <div className="relative z-10 space-y-1">
                     <div className="text-2xl font-serif font-black text-stone-900">~3102 BCE</div>
                     <div className="text-[10px] font-black text-stone-300 uppercase tracking-[0.3em]">Era: Dvapara Yuga</div>
                  </div>
                  <div className="mt-8 flex items-center justify-between text-[10px] font-black text-orange-600/60 uppercase tracking-widest pt-4 border-t border-stone-100/50">
                     <span>Archival Status</span>
                     <span className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        Verified Gold
                     </span>
                  </div>
               </div>
            </div>

            {verses.map((verse) => {
               const enTrans = verse.layers.find(l => l.type === 'translation' && l.lang === 'en')
               
               // 🔱 TARGETED SCHOLAR FILTERING (ISKCON vs DNYANESHWARI)
               const commentaries = verse.layers.filter(l => {
                  if (scholarSelection === 'none') return false
                  if (l.lang !== 'en') return false // Filter out HI/MR placeholders
                  if (scholarSelection === 'all') return true 
                  if (scholarSelection === 'iskcon-en') return l.author.includes('iskcon') || l.author.includes('prabhu')
                  if (scholarSelection === 'dnyaneshwari-en') return l.author.includes('dnyan')
                  return false
               })
               
               const synth = synthesisMap[verse.id]
               const duoMode = scholarSelection === 'all' || (scholarSelection !== 'all' && commentaries.length > 1)

               return (
                 <article 
                   key={verse.id} 
                   ref={el => { verseRefs.current[verse.verse] = el }}
                   className="bg-white rounded-[4rem] p-0 shadow-2xl border border-stone-100 group transition-all duration-700 hover:shadow-orange-100/50 relative"
                 >
                    {/* 🎨 MANUSCRIPT HANDLE (Visual ornamentation) */}
                    <div className="absolute left-6 top-1/2 -translate-y-1/2 w-px h-32 bg-stone-100 group-hover:bg-orange-200 transition-colors" />
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 w-px h-32 bg-stone-100 group-hover:bg-orange-200 transition-colors" />

                    {/* 📜 SACRED RAIL (Conditionally rendered for fragments vs prose) */}
                    {verse.original && (
                       <div className="bg-[#FCFBF9] border-b border-stone-100 px-12 py-12 md:py-20 text-center relative overflow-hidden">
                          <div className="absolute top-8 right-12 text-[9px] font-black text-stone-300 uppercase tracking-[0.4rem] opacity-50">
                             {bookData?.name.split(' ')[0]} Fragment {verse.chapter}.{verse.verse}
                          </div>
                          <ShlokaMask text={verse?.original || ''} fontSize={28} />
                          {verse.transliteration && (
                            <p className="mt-8 max-w-2xl mx-auto text-stone-400 font-serif italic text-sm md:text-lg leading-relaxed opacity-60">
                               {verse.transliteration}
                            </p>
                          )}
                       </div>
                    )}
                    
                    {!verse.original && (
                       <div className="bg-[#FAF9F7]/50 px-12 py-16 md:py-24 text-center border-b border-stone-100 flex flex-col items-center">
                          <div className="max-w-xl mx-auto space-y-4">
                             <div className="text-[9px] font-black text-orange-600/40 uppercase tracking-[0.6em] mb-4">Chronicle Transition</div>
                             <h2 className="text-xl md:text-2xl font-serif italic text-stone-600 leading-relaxed font-light">
                                Entering the historical annals of {bookData?.name.split(' ')[0]}
                             </h2>
                          </div>
                          <div className="mt-8 h-12 w-px bg-gradient-to-b from-orange-200 to-transparent opacity-50" />
                       </div>
                    )}

                    {/* 📚 MEANING LAYER (Scholarly Literary Form) */}
                    <div className="px-12 py-10 md:py-14 border-b border-stone-50 bg-[#FDFCFA]">
                        <div className="max-w-4xl mx-auto space-y-6 text-center">
                           <div className="flex items-center justify-center gap-4 mb-2">
                              <div className="h-px w-6 bg-orange-100" />
                              <span className="text-[9px] font-black uppercase tracking-[0.4em] text-orange-600/40">
                                 {enTrans?.content?.length && enTrans.content.length > 500 ? 'Historical Narrative' : 'Manuscript Meaning'}
                              </span>
                              <div className="h-px w-6 bg-orange-100" />
                           </div>
                           
                           <p className="text-xl md:text-2xl font-serif font-black text-stone-800 leading-relaxed italic antialiased selection:bg-orange-50 tracking-tight">
                               &ldquo;{cleanText(enTrans?.content || (verse as any).meaning || '')}&rdquo;
                           </p>
                        </div>
                    </div>

                    {/* 🎨 SCHOLARSHIP DECK (At Bottom - Centered Scholarly Deliberation) */}
                    {commentaries.length > 0 && (
                       <div className={`bg-[#fdfbf7] px-12 py-20 flex flex-col items-center ${duoMode ? 'space-y-24' : 'space-y-16'}`}>
                          {commentaries.map((c, ci) => (
                             <div key={ci} className={`max-w-5xl w-full space-y-8 text-center animate-in fade-in zoom-in-95 duration-700`}>
                                <div className="flex flex-col items-center gap-4">
                                   <div className="w-1.5 h-12 bg-gradient-to-b from-orange-400 to-transparent rounded-full shadow-sm" />
                                   <span className="text-[10px] font-black uppercase tracking-[0.4em] text-stone-400">
                                      {AUTHOR_METADATA[c.author]?.name || AUTHOR_METADATA[`${c.author}-en`]?.name || 'Sant Dnyaneshwar Maharaj'}
                                   </span>
                                </div>
                                <div className="text-stone-700 leading-relaxed text-lg md:text-xl font-medium whitespace-pre-line selection:bg-orange-50 transition-colors group-hover:text-black font-serif italic max-w-4xl mx-auto">
                                   &ldquo;{cleanText(c.content)}&rdquo;
                                </div>
                                <div className="pt-8 flex justify-center">
                                   <div className="w-8 h-px bg-stone-100" />
                                </div>
                             </div>
                          ))}
                       </div>
                    )}

                    {/* 🧠 COGNITIVE TATTVA (ADF-SYNTHESIS Manuscript) */}
                    {(synth?.text || synth?.loading) && (
                       <VedicManuscriptCard 
                         content={synth.loading ? 'Extracting the essence of traditional scholarship...' : synth.text} 
                         className="mx-12 mb-20 shadow-orange-100" 
                       />
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
