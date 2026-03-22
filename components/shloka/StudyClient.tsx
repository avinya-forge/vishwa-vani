'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import AstroExplorer from '@/components/lab/AstroExplorer'
import ChhandaAnalyzer from '@/components/lab/ChhandaAnalyzer'
import GrammarTokenizer from '@/components/lab/GrammarTokenizer'
import { getDailyWisdom } from '@/lib/wisdom'
import ShlokaMask from './ShlokaMask'
import PhilosophicalCorrelation from './PhilosophicalCorrelation'
import VedicExplainShell from './VedicExplainShell'
import SuggestEditModal from './SuggestEditModal'

import { NVFFragment, FragmentLayer } from '@/lib/nvf'

export const AUTHOR_METADATA: Record<string, { name: string, langs: ('en' | 'hi' | 'mr' | 'sa')[] }> = {
  siva: { name: 'Swami Sivananda', langs: ['en', 'hi'] },
  rams: { name: 'Swami Ramsukhdas', langs: ['hi'] },
  chinmay: { name: 'Chinmaya Mission', langs: ['en'] },
  sankar: { name: 'Adi Shankaracharya', langs: ['hi', 'en'] },
  prabhu: { name: 'Srila Prabhupada', langs: ['en', 'hi', 'mr'] },
  tej: { name: 'Swami Tejomayananda', langs: ['hi'] },
  gambir: { name: 'Swami Gambhirananda', langs: ['en'] },
  raman: { name: 'Ramanuja', langs: ['hi', 'en'] },
  abhyankar: { name: 'Dr. Shankar Abhyankar', langs: ['mr', 'hi'] },
  vinoba: { name: 'Vinoba Bhave (Gitai)', langs: ['mr', 'en'] },
  tilak: { name: 'Lokmanya Tilak (Gita Rahasya)', langs: ['mr', 'en', 'hi'] },
  kmg: { name: 'Kisari Mohan Ganguli', langs: ['en'] },
}

interface StudyClientProps {
  verses: NVFFragment[]
  chapterTitle: string
  scriptureName: string
  tagline: string
}

export default function StudyClient({ verses, chapterTitle, scriptureName, tagline }: StudyClientProps) {
  const t = useTranslations('study')
  const pt = useTranslations('prefs')
  const locale = useLocale() as 'en' | 'hi' | 'mr'
  
  const [mounted, setMounted] = useState(false)
  const [targetLang, setTargetLang] = useState<'hi' | 'en' | 'mr'>(locale)
  
  // By default enable some well-known authors globally so it's not empty initially.
  const defaultAuthors = ['siva', 'rams'] // Strictly limited to 2 as per new constraints
  const [enabledAuthors, setEnabledAuthors] = useState<string[]>(defaultAuthors)
  const [showSettings, setShowSettings] = useState(false)
  const [suggestionTarget, setSuggestionTarget] = useState<{ id: string, content: string, lang: string } | null>(null)

  // AI Synthesis states
  const [synthesisMap, setSynthesisMap] = useState<Record<string, {text: string, loading: boolean}>>({})

  const cleanText = (str: string) => {
    if (!str) return ''
    return str
      .replace(/<[^>]*>?/gm, '')
      .replace(/&amp;/g, '&')
      .replace(/&#39;/g, "'")
      .replace(/&quot;/g, '"')
      .replace(/&nbsp;/g, ' ')
      .replace(/\s\s+/g, ' ')
  }

  // Task: Lang-Aware Dynamic Defaults
  const getLanguageDefaults = (lang: string) => {
    if (lang === 'mr') return ['tilak', 'vinoba', 'prabhu', 'abhyankar']
    if (lang === 'hi') return ['rams', 'siva', 'sankar', 'prabhu']
    return ['siva', 'chinmay', 'prabhu', 'gambir']
  }

  useEffect(() => {
    setMounted(true)
    setTargetLang(locale)
  }, [locale])

  // Pruning and auto-filling enabled authors per current context
  useEffect(() => {
    if (!mounted) return

    const storedStr = localStorage.getItem(`vishwa_authors_${targetLang}`)
    let currentAuths: string[] = []
    
    if (storedStr) {
      try { currentAuths = JSON.parse(storedStr) } catch(e) {}
    }

    // Filter to ensure all currently enabled authors actually have data in the target lang
    let valid = currentAuths.filter(a => AUTHOR_METADATA[a]?.langs.includes(targetLang))
    
    // If we have fewer than 2 valid authors, auto-fill from the lang defaults
    if (valid.length < 2) {
      const defaults = getLanguageDefaults(targetLang)
      for (const d of defaults) {
        if (!valid.includes(d) && AUTHOR_METADATA[d]?.langs.includes(targetLang)) {
           valid.push(d)
        }
        if (valid.length >= 2) break
      }
    }

    setEnabledAuthors(valid.slice(0, 2))
  }, [targetLang, mounted, scriptureName]) 
  
  const toggleAuthor = (authorKey: string) => {
    let next = [...enabledAuthors]
    if (next.includes(authorKey)) {
      next = next.filter(a => a !== authorKey)
    } else {
      if (next.length >= 2) next.shift() // Rotate slot 1 out
      next.push(authorKey)
    }
    setEnabledAuthors(next)
    localStorage.setItem(`vishwa_authors_${targetLang}`, JSON.stringify(next))
  }

  const analyzeSentiment = (text: string) => {
    const lower = text.toLowerCase()
    if (lower.match(/devotion|love|surrender|bhakti|grace|krishna|bhagavan|surrendered/)) return { label: 'Bhakti (Devotion)', style: 'bg-rose-100/50 text-rose-800 border-rose-200/50' }
    if (lower.match(/knowledge|intellect|wisdom|truth|jnana|self|brahman|illusion/)) return { label: 'Jnana (Knowledge)', style: 'bg-sky-100/50 text-sky-800 border-sky-200/50' }
    if (lower.match(/action|duty|work|karma|sacrifice|fruit|attachment/)) return { label: 'Karma (Action)', style: 'bg-emerald-100/50 text-emerald-800 border-emerald-200/50' }
    return { label: 'General', style: 'bg-stone-50/50 text-stone-600 border-stone-100/50' }
  }

  const renderAggregatedCommentaries = (verse: NVFFragment) => {
    const rawCommentaries = verse.layers.filter(l => 
        l.type === 'commentary' && 
        l.lang === targetLang && 
        enabledAuthors.includes(l.author || '')
    ) 
    
    if (rawCommentaries.length === 0) return null

    // Group by text to avoid redundancy
    const uniqueMap = new Map<string, string[]>()
    rawCommentaries.forEach(c => {
      const key = `[${c.lang}] ${c.content}`
      if (!uniqueMap.has(key)) {
        uniqueMap.set(key, [])
      }
      uniqueMap.get(key)!.push(AUTHOR_METADATA[c.author || '']?.name || c.author || 'Anonymous')
    })

    return (
      <div className="mt-2 border-t border-stone-100/50 pt-2">
        <details className="group/details" open>
          <summary className="list-none cursor-pointer flex items-center justify-between text-[11px] font-black text-stone-200 hover:text-orange-600 transition-colors uppercase tracking-widest">
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-lg bg-stone-50 flex items-center justify-center text-[7px] group-open/details:rotate-180 transition-transform">▼</span>
              {t('commentaries')} ({rawCommentaries.length})
            </span>
          </summary>
          
          <div className="mt-4 space-y-4">

            
            {Array.from(uniqueMap.entries()).map(([keyText, authors], idx) => {
              const actualText = cleanText(keyText.substring(5))
              const sentiment = analyzeSentiment(actualText)
              
              return (
                <div key={idx} className="bg-white p-3 rounded-xl border border-stone-200/60 shadow-sm relative overflow-hidden group">
                  <div className={`absolute top-0 right-0 px-1.5 py-0.5 rounded-bl-lg text-[7px] font-bold uppercase tracking-widest border-b border-l ${sentiment.style}`}>
                    {sentiment.label}
                  </div>
                  <h4 className="text-[9px] font-bold text-stone-400 mb-1 uppercase tracking-wide flex items-center gap-1.5">
                    {authors.join(' • ')}
                  </h4>
                  <p className="text-stone-700 leading-relaxed text-[12px] whitespace-pre-wrap">{actualText}</p>
                </div>
              )
            })}
          </div>
        </details>
      </div>
    )
  }

  if (!mounted) return <div className="min-h-screen bg-[#FDFBF7] animate-pulse" />

  const scriptureAuthors = Array.from(new Set(
    verses.flatMap(v => v.layers.map(l => l.author).filter(a => AUTHOR_METADATA[a]))
  ))

  return (
    <>
      {showSettings && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-md transition-opacity">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl p-6 animate-in zoom-in-95 duration-300 border border-white/20">
            <div className="flex justify-between items-center mb-5 border-b border-stone-100 pb-4">
              <h2 className="text-xl font-serif font-black text-stone-800">{pt('title')}</h2>
              <button onClick={() => setShowSettings(false)} className="text-stone-400 hover:text-stone-600 bg-stone-50 p-2.5 rounded-full transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            
            <div className="space-y-5">
              <div>
                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500 mb-4 flex items-center gap-3">
                  <span className="w-5 h-px bg-stone-100" /> 
                  Selected Commentators (Slot 1 & 2)
                </h3>
                <div className="space-y-2 max-h-[45vh] overflow-y-auto pr-2 custom-scrollbar">
                  {scriptureAuthors
                    .filter(key => AUTHOR_METADATA[key]?.langs.includes(targetLang))
                    .map((key) => {
                      const name = AUTHOR_METADATA[key]?.name || key
                      const isEnabled = enabledAuthors.includes(key)
                      const slotPos = enabledAuthors.indexOf(key) + 1
                      return (
                        <label key={key} className={`flex items-center justify-between p-2.5 rounded-xl border transition-all cursor-pointer group hover:scale-[1.01] active:scale-[0.99] ${isEnabled ? 'bg-orange-50/70 border-orange-200 ring-1 ring-orange-100 shadow-sm' : 'bg-white border-stone-100 hover:border-orange-200'}`}>
                          <div className="flex items-center gap-3">
                            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${isEnabled ? 'bg-orange-600 border-orange-600' : 'border-stone-200'}`}>
                               {isEnabled && <div className="w-1 h-1 bg-white rounded-full shadow-inner" />}
                            </div>
                            <input 
                              type="checkbox" 
                              checked={isEnabled}
                              onChange={() => toggleAuthor(key)}
                              className="hidden"
                            />
                            <span className={`text-[12px] font-bold tracking-tight ${isEnabled ? 'text-orange-950' : 'text-stone-400 group-hover:text-stone-600'}`}>{name}</span>
                          </div>
                          {isEnabled && (
                            <span className="text-[7px] font-black uppercase tracking-widest text-white bg-orange-600 px-1.5 py-0.5 rounded shadow-sm">Slot {slotPos}</span>
                          )}
                        </label>
                      )
                    })
                  }
                </div>
              </div>
            </div>

            <div className="mt-8">
              <button 
                onClick={() => setShowSettings(false)}
                className="w-full py-3 bg-stone-900 text-white rounded-xl font-bold text-[10px] uppercase tracking-widest shadow-lg hover:bg-orange-600 transition-all active:scale-95"
              >
                {pt('saveApply')}
              </button>
            </div>
          </div>
        </div>
      )}

      {suggestionTarget && (
        <SuggestEditModal 
            isOpen={!!suggestionTarget}
            onClose={() => setSuggestionTarget(null)}
            verseId={suggestionTarget.id}
            lang={suggestionTarget.lang}
            originalContent={suggestionTarget.content}
        />
      )}

      {/* Modern Floating Action Button */}
      <button 
        onClick={() => setShowSettings(true)}
        className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-[55] bg-stone-900 p-4 sm:p-4.5 rounded-full shadow-lg text-white hover:bg-orange-600 hover:scale-105 active:scale-90 transition-all duration-300 group"
      >
        <svg className="w-5.5 h-5.5 group-hover:rotate-90 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>

      <div className="relative overflow-hidden bg-gradient-to-b from-orange-50/20 to-[#FDFBF7] pt-4 pb-3 px-4 sm:px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_70%)] from-orange-100/5 pointer-events-none" />
        <div className="max-w-6xl mx-auto relative z-10 flex flex-col lg:flex-row items-center justify-between gap-3">
          <div className="max-w-3xl text-center lg:text-left">
            <span className="inline-block py-0.5 px-2 rounded bg-orange-600/5 text-orange-700 text-[9px] font-bold tracking-widest uppercase mb-1 border border-orange-100/50">
              {scriptureName}
            </span>
            <h1 className="text-lg sm:text-xl font-serif font-black text-stone-900 mb-1 leading-tight tracking-tight">
              {chapterTitle}
            </h1>
            <p className="text-[12px] text-stone-500 max-w-xl leading-relaxed">
              {tagline}
            </p>
          </div>
          
          <div className="hidden lg:flex items-center gap-8 bg-white/50 backdrop-blur-sm p-8 rounded-[2rem] border border-white shadow-sm ring-1 ring-stone-100">
            <div className="text-center px-4 border-r border-stone-200/50">
              <p className="text-[10px] font-black text-stone-300 uppercase tracking-widest mb-2">{t('verses')}</p>
              <p className="text-3xl font-serif font-black text-orange-950">{verses.length}</p>
            </div>
            <div className="text-center px-4">
              <p className="text-[10px] font-black text-stone-300 uppercase tracking-widest mb-2">{t('interactive')}</p>
              <div className="flex -space-x-3">
                <div className="w-10 h-10 rounded-full bg-orange-100 border-4 border-white flex items-center justify-center text-sm shadow-sm">✨</div>
                <div className="w-10 h-10 rounded-full bg-orange-200 border-4 border-white flex items-center justify-center text-sm shadow-sm scale-110 z-10">🕉️</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area - Reduced Canvas */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-3 relative z-10 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">
          <div className="space-y-3">
            {verses.map((verse) => (
              <article 
                key={verse.id} 
                className="group relative bg-[#FBFBF8] rounded-3xl p-4 sm:p-5 shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-stone-200/60 hover:border-orange-200/40 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-700 overflow-hidden"
              >
                {/* Visual Header / Verse Metatag */}
                <div className="absolute top-2.5 right-4 flex items-center gap-1.5 opacity-40 group-hover:opacity-100 transition-opacity">
                   <div className="w-1.5 h-1.5 rounded-full bg-orange-200 group-hover:bg-orange-600 animate-pulse" />
                   <span className="text-[9px] font-black tracking-widest text-stone-300 uppercase">Verse {verse.verse}</span>
                </div>

                <div className="mb-1 text-center">
                  <div className="bg-stone-50/30 rounded-xl p-2.5 sm:p-3.5 mb-1 border border-stone-100/50 transition-colors group-hover:bg-white">
                    <ShlokaMask 
                        text={verse.original} 
                        className="shloka-glow brightness-[1.01]"
                    />
                  </div>
                  <div className="max-w-xl mx-auto px-4">
                    <p className="text-stone-400 font-serif italic text-[11px] whitespace-pre-wrap leading-tight opacity-75 antialiased tracking-wide">
                      {verse.transliteration}
                    </p>
                  </div>
                </div>

                <div className="space-y-2 pt-0">
                  {/* Primary Language (Native Focus) */}
                  {targetLang !== 'en' && (
                    <div className="relative group/native">
                      <div className="text-[7px] font-bold text-orange-600/50 uppercase tracking-[0.2em] mb-1 flex items-center gap-2">
                        <span className="w-4 h-px bg-orange-100" />
                        {targetLang === 'hi' ? 'हिंदी अर्थ' : 'मराठी अर्थ'}
                      </div>
                      {(() => {
                        const localTrans = verse.layers.find(l => l.lang === targetLang && l.type === 'translation')
                        return localTrans ? (
                          <div className="relative">
                            <p className="text-stone-900 leading-[1.6] text-[14px] sm:text-[15px] font-bold tracking-tight selection:bg-orange-100">
                              {cleanText(localTrans.content)}
                            </p>
                            <button 
                              onClick={() => setSuggestionTarget({ id: verse.id, lang: targetLang, content: localTrans.content })}
                              className="absolute -right-1 top-0 opacity-0 group-hover/native:opacity-100 transition-opacity text-orange-200 hover:text-orange-600"
                            >
                              <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                            </button>
                          </div>
                        ) : (
                          <p className="text-[9px] text-orange-950/40 italic font-bold">Compiling Translation...</p>
                        )
                      })()}
                    </div>
                  )}

                  {/* Secondary Reference (English) */}
                  <div className={`relative group/en ${targetLang !== 'en' ? 'pt-2 border-t border-stone-100/60' : ''}`}>
                    <div className="text-[7px] font-bold text-stone-300 uppercase tracking-[0.2em] mb-1 flex items-center gap-2">
                      <span className="w-4 h-px bg-stone-100" /> English Summary
                    </div>
                    {(() => {
                      const enTrans = verse.layers.find(l => l.lang === 'en' && l.type === 'translation')
                      return enTrans ? (
                        <p className={`text-stone-500 leading-normal font-serif hover:text-stone-800 transition-colors ${targetLang !== 'en' ? 'text-[12px]' : 'text-[14px] font-medium'}`}>
                          {cleanText(enTrans.content)}
                        </p>
                      ) : (
                        <p className="text-stone-200 italic text-[9px]">No English translation yet.</p>
                      )
                    })()}
                  </div>
                </div>

                {/* AI & Meta Row */}
                <div className="mt-1.5 pt-1.5 border-t border-stone-100/30 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    {/* Synthesis Hook */}
                    {(() => {
                      const vId = verse.id;
                      const synthState = synthesisMap[vId];
                      if (synthState?.text) return null;
                      return (
                        <button 
                          onClick={async () => {
                            setSynthesisMap(prev => ({...prev, [vId]: { text: '', loading: true }}));
                            try {
                                const texts = verse.layers.filter(l => l.type === 'commentary' && enabledAuthors.includes(l.author||'')).map((l) => l.content);
                                const res = await fetch('/api/synthesize', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({ verseId: vId, contextTexts: texts, language: targetLang })
                                });
                                const data = await res.json();
                                if (data.success) {
                                    setSynthesisMap(prev => ({...prev, [vId]: { text: data.synthesis, loading: false }}));
                                }
                            } catch (e) {
                                setSynthesisMap(prev => ({...prev, [vId]: { text: 'Synthesis failed.', loading: false }}));
                            }
                          }}
                          disabled={synthState?.loading}
                          className="flex items-center gap-1 bg-stone-900 hover:bg-orange-600 text-white text-[8px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg transition-all active:scale-95 disabled:opacity-50"
                        >
                          <span>{synthState?.loading ? ' ' : '✨'}</span>
                          {synthState?.loading ? 'Generating...' : 'Synthesize'}
                        </button>
                      )
                    })()}
                  </div>
                  
                  <div className="text-[8px] font-black text-stone-200 flex items-center gap-3">
                    {enabledAuthors.map(a => (
                      <span key={a} className="uppercase tracking-[0.2em]">{AUTHOR_METADATA[a]?.name}</span>
                    ))}
                  </div>
                </div>

                {/* Synthesis Expansion */}
                {(() => {
                  const synthState = synthesisMap[verse.id];
                  if (!synthState?.text) return null;
                  return (
                    <div className="mt-1.5 bg-stone-900 p-4 rounded-xl relative overflow-hidden group/synth animate-in fade-in zoom-in-95 duration-300">
                      <div className="text-[8px] font-black text-stone-500 uppercase tracking-[0.3em] mb-2 flex items-center gap-2">
                         <div className="w-1 h-1 bg-orange-500 rounded-full" /> Unified Professor
                      </div>
                      <p className="text-stone-50 leading-relaxed text-[12px] font-serif italic antialiased">
                        &quot;{cleanText(synthState.text)}&quot;
                      </p>
                    </div>
                  )
                })()}

                {renderAggregatedCommentaries(verse)}
              </article>
            ))}
          </div>
          
          <aside className="space-y-6 lg:sticky lg:top-20 lg:self-start mt-8 lg:mt-0">
            {/* Contextual App Engine */}
            {(() => {
                const combinedContext = verses.map(v => v.original + ' ' + (v.transliteration||'') + ' ' + (v.layers.map(l=>l.content).join(' ')))
                                              .join(' ').toLowerCase()
                
                if (combinedContext.includes('chhanda') || combinedContext.includes('meter') || combinedContext.includes('syllables')) {
                    return <ChhandaAnalyzer />
                } else if (combinedContext.includes(' grammar ') || combinedContext.includes(' vyakarana ') || combinedContext.includes('noun')) {
                    return <GrammarTokenizer />
                } else {
                    // Default baseline
                    return <AstroExplorer />
                }
            })()}

            <section className="bg-white rounded-3xl p-5 border border-stone-100 shadow-sm transition-all hover:shadow-xl hover:border-orange-100/50 group">
                <h3 className="text-[10px] font-black text-stone-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-3">
                  <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                  {t('didYouKnow')}
                </h3>
                <div className="space-y-4">
                  <p className="text-stone-600 font-serif leading-relaxed italic text-[14px] group-hover:text-stone-900 transition-colors">
                    {getDailyWisdom().text}
                  </p>
                  <p className="text-[8px] text-orange-600/60 font-black uppercase tracking-widest text-right">
                    — {getDailyWisdom().source}
                  </p>
                </div>
            </section>

            <section className="bg-stone-50/50 rounded-2xl p-4 border border-stone-100 shadow-sm transition-all hover:bg-white group">
                <p className="text-[8px] text-stone-300 font-bold uppercase tracking-widest mb-2">Library Transparency</p>
                <p className="text-[10px] text-stone-400 leading-relaxed mb-3">This digital edition was compiled using public domain and academic archives.</p>
                <Link href="/acknowledgments" className="text-[9px] font-black uppercase tracking-widest text-orange-600 hover:text-orange-700 transition-colors flex items-center gap-1 group/link">
                    Credits & Sources 
                    <span className="group-hover/link:translate-x-0.5 transition-transform">→</span>
                </Link>
            </section>
          </aside>
        </div>
      </div>
    </>
  )
}
