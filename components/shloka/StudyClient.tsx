'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import AstroExplorer from '@/components/lab/AstroExplorer'
import { getDailyWisdom } from '@/lib/wisdom'
import ShlokaMask from './ShlokaMask'

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
  const defaultAuthors = ['siva', 'rams', 'sankar']
  const [enabledAuthors, setEnabledAuthors] = useState<string[]>(defaultAuthors)
  const [showSettings, setShowSettings] = useState(false)

  useEffect(() => {
    // Sync with global locale from provider
    setTargetLang(locale)
    
    const storedAuthors = localStorage.getItem('vishwa_authors')
    if (storedAuthors) {
      try {
        setEnabledAuthors(JSON.parse(storedAuthors))
      } catch (e) {}
    }

    setMounted(true)
  }, [locale])

  const toggleAuthor = (authorKey: string) => {
    let nextArr = [...enabledAuthors]
    
    if (nextArr.includes(authorKey)) {
      nextArr = nextArr.filter(a => a !== authorKey)
    } else {
      if (nextArr.length >= 3) {
        // Enforce practical limit to prevent UI clutter
        alert('Universal Study Mode: Please limit to 3 authors to maintain reading Clarity.')
        return
      }
      nextArr.push(authorKey)
    }
    
    setEnabledAuthors(nextArr)
    localStorage.setItem('vishwa_authors', JSON.stringify(nextArr))
  }

  const renderAggregatedCommentaries = (verse: NVFFragment) => {
    const chunks: { authorName: string, text: string, lang: 'en' | 'hi' | 'mr' | 'sa' }[] = []
    
    verse.layers.forEach(layer => {
      if (enabledAuthors.includes(layer.author) && layer.type === 'commentary') {
        const authorName = AUTHOR_METADATA[layer.author]?.name || layer.author
        chunks.push({ authorName, text: layer.content.trim(), lang: layer.lang })
      }
    })

    if (chunks.length === 0) return null

    const uniqueMap = new Map<string, string[]>()
    chunks.forEach(c => {
      const keyText = `[${c.lang}] ${c.text}`
      if (!uniqueMap.has(keyText)) uniqueMap.set(keyText, [])
      uniqueMap.get(keyText)!.push(c.authorName)
    })

    return (
      <div className="mt-4 pt-4 border-t border-stone-100">
        <details className="group/details">
          <summary className="cursor-pointer font-bold text-orange-600 hover:text-orange-700 flex items-center justify-center gap-2 list-none transition-colors text-[10px] uppercase tracking-widest">
            {t('readDeepCommentary')}
            <svg className="w-3 h-3 transition-transform duration-300 group-open/details:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          
          <div className="mt-4 space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
            {Array.from(uniqueMap.entries()).map(([keyText, authors], idx) => {
              const langCode = keyText.substring(1, 3) as 'en' | 'hi' | 'mr'
              const langFlag = pt(langCode)
              const actualText = keyText.substring(5)
              
              return (
                <div key={idx} className="bg-stone-50/50 p-4 rounded-2xl border border-stone-100/50">
                  <h4 className="text-[10px] font-bold text-stone-400 mb-2 uppercase tracking-widest flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-orange-200 rounded-full" />
                    {t('commentary')} ({langFlag}) <span className="text-stone-300 mx-1">|</span> 
                    <span className="text-orange-800/70">{authors.join(', ')}</span>
                  </h4>
                  <p className="text-stone-600 leading-relaxed text-[13px] sm:text-[14px] whitespace-pre-wrap">{actualText}</p>
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
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-md transition-opacity">
          <div className="bg-white rounded-[2.5rem] w-full max-w-md shadow-2xl p-8 animate-in zoom-in-95 duration-300 border border-white/20">
            <div className="flex justify-between items-center mb-8 border-b border-stone-100 pb-5">
              <h2 className="text-xl font-serif font-black text-stone-800">{pt('title')}</h2>
              <button onClick={() => setShowSettings(false)} className="text-stone-400 hover:text-stone-600 bg-stone-50 p-2.5 rounded-full transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 mb-4">{pt('commentarySets')}</h3>
                <div className="space-y-2 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                  {scriptureAuthors
                    .filter(key => AUTHOR_METADATA[key]?.langs.includes(targetLang))
                    .map((key) => {
                      const name = AUTHOR_METADATA[key]?.name || key
                      const isEnabled = enabledAuthors.includes(key)
                      return (
                        <label key={key} className={`flex items-center p-4 rounded-2xl border transition-all cursor-pointer group ${isEnabled ? 'bg-orange-50/50 border-orange-100' : 'bg-white border-stone-100 hover:border-orange-200'}`}>
                          <input 
                            type="checkbox" 
                            checked={isEnabled}
                            onChange={() => toggleAuthor(key)}
                            className="w-5 h-5 text-orange-600 rounded-lg border-stone-300 focus:ring-orange-500"
                          />
                          <span className={`ml-4 text-[14px] font-semibold tracking-tight transition-colors ${isEnabled ? 'text-orange-900' : 'text-stone-400'}`}>{name}</span>
                        </label>
                      )
                    })
                  }
                </div>
              </div>
            </div>

            <div className="mt-10">
              <button 
                onClick={() => setShowSettings(false)}
                className="w-full py-4 bg-stone-900 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-orange-600 transition-all active:scale-95"
              >
                {pt('saveApply')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modern Floating Action Button */}
      <button 
        onClick={() => setShowSettings(true)}
        className="fixed bottom-8 right-8 z-[55] bg-stone-900 p-5 rounded-full shadow-2xl text-white hover:bg-orange-600 hover:scale-110 active:scale-90 transition-all duration-300 group"
      >
        <svg className="w-6 h-6 group-hover:rotate-90 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>

      {/* Hero Section with Reduced Header Sizes */}
      <div className="relative overflow-hidden bg-gradient-to-b from-orange-50/50 to-[#FDFBF7] pt-12 pb-10 px-4 sm:px-8">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_70%)] from-orange-100/20 pointer-events-none" />
        <div className="max-wide relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 lg:px-4">
          <div className="max-w-4xl text-center lg:text-left">
            <span className="inline-block py-1 px-4 rounded-full bg-orange-600/5 text-orange-700 text-[10px] font-black tracking-[0.2em] uppercase mb-4 border border-orange-100/50">
              {scriptureName}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-stone-900 mb-4 leading-[1.1] tracking-tight">
              {chapterTitle}
            </h1>
            <p className="text-base sm:text-lg text-stone-500 max-w-2xl leading-relaxed font-medium">
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

      {/* Main Content Area - Wide Canvas */}
      <div className="max-wide px-4 sm:px-8 mt-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10">
          <div className="space-y-8 sm:space-y-12">
            {verses.map((verse) => (
              <article 
                key={verse.id} 
                className="group relative bg-white rounded-[2rem] p-6 sm:p-10 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_60px_-20px_rgba(0,0,0,0.08)] transition-all duration-500 border border-stone-100 hover:border-orange-100/50"
              >
                <div className="absolute -top-4 left-10 flex items-center gap-3">
                  <div className="bg-stone-900 text-white w-9 h-9 rounded-2xl flex items-center justify-center font-black shadow-xl ring-4 ring-white text-[11px] group-hover:bg-orange-600 transition-colors">
                    {verse.verse}
                  </div>
                  <Link 
                    href="/docs/compliance/legal_audit"
                    className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 px-3 py-1 bg-stone-50 text-[9px] font-bold text-stone-400 rounded-full border border-stone-100 uppercase tracking-tighter"
                    title="Source Credit: SRC-001 (MIT)"
                  >
                    <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse" />
                    Library Source
                  </Link>
                </div>

                <div className="text-center mb-8">
                  <ShlokaMask 
                    text={verse.original} 
                    className="mb-8"
                  />
                  <p className="mt-4 text-stone-400 font-medium italic text-[11px] sm:text-xs whitespace-pre-wrap leading-relaxed tracking-wide opacity-80">
                    {verse.transliteration}
                  </p>
                </div>

                <div className="h-px w-full bg-stone-100 my-8" />

                <div className={`grid gap-8 ${targetLang !== 'en' ? 'md:grid-cols-2' : ''}`}>
                  <div className="space-y-3">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-300 flex items-center gap-2">
                      <span className="w-4 h-px bg-stone-200" />
                      {t('translationEn')}
                    </h3>
                    {(() => {
                      const enTrans = verse.layers.find(l => l.lang === 'en' && l.type === 'translation')
                      return enTrans ? (
                        <p className="text-stone-700 leading-relaxed text-[15px] font-medium">{enTrans.content}</p>
                      ) : (
                        <p className="text-stone-400 italic text-xs">{t('noTranslation')}</p>
                      )
                    })()}
                  </div>

                  {targetLang !== 'en' && (
                    <div className="space-y-3">
                      <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-300 flex items-center gap-2">
                        <span className="w-4 h-px bg-stone-200" />
                        {targetLang === 'hi' ? t('meaningHi') : t('meaningMr')}
                      </h3>
                      
                      {(() => {
                        const localTrans = verse.layers.find(l => l.lang === targetLang && l.type === 'translation')
                        return localTrans ? (
                          <p className="text-stone-800 leading-relaxed text-[16px] font-bold">
                            {localTrans.content}
                          </p>
                        ) : (
                          <div className="p-4 bg-orange-50/30 rounded-2xl border border-orange-100/20">
                            <p className="text-orange-900/60 italic text-xs font-semibold">{t('compilingDB')}</p>
                          </div>
                        )
                      })()}
                    </div>
                  )}
                </div>

                {renderAggregatedCommentaries(verse)}
              </article>
            ))}
          </div>
          
          <aside className="hidden lg:block space-y-8 sticky top-24 self-start">
            <AstroExplorer />

            <section className="bg-white rounded-[2.5rem] p-8 border border-stone-100 shadow-sm transition-all hover:shadow-xl hover:border-orange-100/50 group">
                <h3 className="text-[10px] font-black text-stone-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
                  <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                  {t('didYouKnow')}
                </h3>
                <div className="space-y-6">
                  <p className="text-stone-600 font-serif leading-relaxed italic text-[15px] group-hover:text-stone-900 transition-colors">
                    {getDailyWisdom().text}
                  </p>
                  <p className="text-[9px] text-orange-600/60 font-black uppercase tracking-widest text-right">
                    — {getDailyWisdom().source}
                  </p>
                </div>
            </section>

            <section className="bg-stone-900 rounded-[2.5rem] p-8 text-white shadow-2xl overflow-hidden relative group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600 blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity" />
              <h3 className="font-black text-[10px] uppercase tracking-widest mb-4 opacity-50">{t('contribution')}</h3>
              <p className="text-xs text-stone-400 leading-relaxed mb-8 font-medium">
                Vishwa-Vani is a globally sourced digital sanctuary. Help us transcribe, translate, and verify the wisdom of ages.
              </p>
              <button className="w-full py-3.5 bg-white text-stone-900 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-orange-600 hover:text-white transition-all shadow-lg active:scale-95">
                {t('reachOut')}
              </button>
            </section>
          </aside>
        </div>
      </div>
    </>
  )
}



