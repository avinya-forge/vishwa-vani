'use client'

import React, { useState, useEffect } from 'react'
import { useTranslations, useLocale } from 'next-intl'

interface VerseAuthor {
  author: string
  ht?: string // Hindi Translation
  hc?: string // Hindi Commentary
  et?: string // English Translation
  ec?: string // English Commentary
  sc?: string // Sanskrit Commentary
}

interface GitaVerse {
  _id: string
  chapter: number
  verse: number
  slok: string
  transliteration: string
  [key: string]: any // To pick dynamic authors
}

const AUTHOR_MAP: Record<string, string> = {
  siva: 'Swami Sivananda',
  rams: 'Swami Ramsukhdas',
  chinmay: 'Chinmaya Mission',
  sankar: 'Shankaracharya',
  prabhu: 'A.C. Bhaktivedanta Swami Prabhupada',
  tej: 'Swami Tejomayananda',
  adi: 'Adi Shankaracharya',
  gambir: 'Swami Gambhirananda',
  san: 'Sanjaya',
  raman: 'Ramanuja',
}

interface StudyClientProps {
  verses: GitaVerse[]
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
  const defaultAuthors = ['siva', 'rams', 'prabhu', 'chinmay', 'sankar']
  const [enabledAuthors, setEnabledAuthors] = useState<string[]>(defaultAuthors)
  const [showSettings, setShowSettings] = useState(false)

  useEffect(() => {
    // Priority 1: Current URL Locale (ensures /hi route shows Hindi)
    setTargetLang(locale)
    
    // Priority 2: Stored Authors
    const storedAuthors = localStorage.getItem('vishwa_authors')
    if (storedAuthors) {
      try {
        setEnabledAuthors(JSON.parse(storedAuthors))
      } catch (e) {}
    }

    setMounted(true)
  }, [locale])

  // Persist Changes
  const updateLang = (lang: 'hi' | 'en' | 'mr') => {
    setTargetLang(lang)
    localStorage.setItem('vishwa_lang', lang)
    // Optional: We could also navigate to the localized URL here if we want deep linking
    // For now keeping it as a content-level toggle
  }

  const toggleAuthor = (authorKey: string) => {
    const nextArr = enabledAuthors.includes(authorKey)
      ? enabledAuthors.filter(a => a !== authorKey)
      : [...enabledAuthors, authorKey]
    
    setEnabledAuthors(nextArr)
    localStorage.setItem('vishwa_authors', JSON.stringify(nextArr))
  }

  const renderAggregatedCommentaries = (verse: GitaVerse) => {
    const chunks: { authorName: string, text: string, lang: 'en' | 'hi' }[] = []
    
    enabledAuthors.forEach(key => {
      if (verse[key]) {
        const item = verse[key] as VerseAuthor
        if (item.ec) chunks.push({ authorName: AUTHOR_MAP[key] || key, text: item.ec.trim(), lang: 'en' })
        if (item.hc) chunks.push({ authorName: AUTHOR_MAP[key] || key, text: item.hc.trim(), lang: 'hi' })
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
      <div className="mt-3 pt-3 border-t border-stone-200">
        <details className="group/details">
          <summary className="cursor-pointer font-medium text-orange-600 hover:text-orange-700 flex items-center justify-center gap-2 list-none transition-colors text-xs">
            {t('readDeepCommentary')}
            <svg className="w-3 h-3 transition-transform duration-300 group-open/details:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          
          <div className="mt-2 space-y-2 sm:space-y-3 animate-in slide-in-from-top-4 fade-in duration-500">
            {Array.from(uniqueMap.entries()).map(([keyText, authors], idx) => {
              const langFlag = keyText.startsWith('[en]') ? pt('en') : pt('hi')
              const actualText = keyText.substring(5)
              
              return (
                <div key={idx} className="bg-stone-50 p-3 sm:p-4 rounded-xl shadow-sm border border-stone-100/50">
                  <h4 className="text-[9px] sm:text-[10px] font-bold text-stone-500 mb-1.5 uppercase tracking-wider">
                    {t('commentary')} ({langFlag}) <span className="text-stone-300 mx-1">|</span> 
                    <span className="text-orange-800/80">{authors.join(', ')}</span>
                  </h4>
                  <p className="text-stone-600 leading-[1.4] text-[12px] sm:text-[13px] whitespace-pre-wrap">{actualText}</p>
                </div>
              )
            })}
          </div>
        </details>
      </div>
    )
  }

  if (!mounted) return <div className="min-h-screen bg-[#FDFBF7] animate-pulse" />

  // Dynamic authors found in the current scripture data
  const scriptureAuthors = Array.from(new Set(
    verses.flatMap(v => Object.keys(v).filter(k => AUTHOR_MAP[k]))
  ))

  return (
    <>
      {showSettings && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl p-6 md:p-8 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6 border-b border-stone-100 pb-4">
              <h2 className="text-xl font-bold text-stone-800 font-serif">{pt('title')}</h2>
              <button onClick={() => setShowSettings(false)} className="text-stone-400 hover:text-stone-600 bg-stone-100 p-2 rounded-full">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-stone-500 mb-3">{pt('language')}</h3>
                <div className="flex gap-2">
                  {(['en', 'hi', 'mr'] as const).map(l => (
                    <button 
                      key={l}
                      onClick={() => updateLang(l)}
                      className={`flex-1 py-2 px-4 rounded-xl font-semibold transition-all border ${targetLang === l ? 'bg-orange-600 text-white border-orange-600' : 'bg-white text-stone-600 border-stone-200 hover:border-orange-300'}`}
                    >
                      {pt(l)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-stone-500 mb-3">{pt('commentarySets')}</h3>
                <div className="space-y-2 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                  {scriptureAuthors.map((key) => {
                    const name = AUTHOR_MAP[key]
                    const isEnabled = enabledAuthors.includes(key)
                    return (
                      <label key={key} className="flex items-center p-3 sm:p-4 rounded-xl border border-stone-100 hover:bg-stone-50 cursor-pointer transition-colors group">
                        <input 
                          type="checkbox" 
                          checked={isEnabled}
                          onChange={() => toggleAuthor(key)}
                          className="w-5 h-5 text-orange-600 rounded border-stone-300 focus:ring-orange-500"
                        />
                        <span className={`ml-3 text-[15px] sm:text-[16px] font-medium transition-colors ${isEnabled ? 'text-stone-800' : 'text-stone-400'}`}>{name}</span>
                      </label>
                    )
                  })}
                </div>
              </div>
            </div>

            <div className="mt-8">
              <button 
                onClick={() => setShowSettings(false)}
                className="w-full py-3 bg-stone-900 text-white rounded-xl font-bold shadow-md hover:bg-stone-800 transition-colors"
              >
                {pt('saveApply')}
              </button>
            </div>
          </div>
        </div>
      )}

      <button 
        onClick={() => setShowSettings(true)}
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-40 bg-white p-4 rounded-full shadow-2xl border border-stone-200 text-orange-600 hover:scale-105 active:scale-95 transition-transform"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>

      <div className="relative overflow-hidden bg-gradient-to-b from-orange-100/50 to-[#FDFBF7] pt-12 pb-10 px-4">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] sm:w-[800px] sm:h-[400px] bg-orange-200/30 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-orange-100 text-orange-800 text-[10px] sm:text-xs font-semibold tracking-widest uppercase mb-3 sm:mb-4 shadow-sm border border-orange-200/50">
            {scriptureName}
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-serif font-bold text-stone-900 mb-2 sm:mb-4 leading-tight">
            {chapterTitle}
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
            {tagline}
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6 sm:space-y-8 mt-2 relative z-10">
        {verses.map((verse) => (
          <article 
            key={verse._id} 
            className="group relative bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-6 md:p-8 shadow-[0_4px_20px_rgb(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.05)] transition-all duration-500 border border-stone-100"
          >
            <div className="absolute -top-3 sm:-top-4 left-6 bg-gradient-to-tr from-orange-600 to-orange-400 text-white w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold shadow-md shadow-orange-500/20 ring-2 ring-white text-[11px] sm:text-xs">
              {verse.verse}
            </div>

            <div className="text-center mt-2 sm:mt-3 mb-3 sm:mb-4">
              <h2 className="text-base sm:text-lg md:text-xl font-semibold text-stone-800 leading-[1.6] whitespace-pre-wrap font-serif">
                {verse.slok}
              </h2>
              <p className="mt-1 sm:mt-2 text-stone-400 italic text-[10px] sm:text-[11px] whitespace-pre-wrap leading-relaxed tracking-tight">
                {verse.transliteration}
              </p>
            </div>

            <div className="h-px w-full bg-gradient-to-r from-transparent via-stone-100 to-transparent my-3 sm:my-4" />

            <div className={`grid gap-4 sm:gap-6 ${targetLang !== 'en' ? 'md:grid-cols-2' : ''}`}>
              <div className="space-y-1 sm:space-y-2">
                <div className="flex items-center gap-2 mb-1 opacity-80">
                  <span className="w-5 h-[1px] bg-stone-300" />
                  <h3 className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-stone-400">{t('translationEn')}</h3>
                </div>
                {verse.siva?.et ? (
                  <p className="text-stone-700 leading-[1.6] text-[13px] sm:text-[14px] font-serif">{verse.siva.et}</p>
                ) : verse.prabhu?.et ? (
                   <p className="text-stone-700 leading-[1.6] text-[13px] sm:text-[14px] font-serif">{verse.prabhu.et}</p>
                ) : (
                  <p className="text-stone-400 italic text-[11px] sm:text-xs">{t('noTranslation')}</p>
                )}
              </div>

              {targetLang !== 'en' && (
                <div className="space-y-1 sm:space-y-2">
                  <div className="flex items-center gap-2 mb-1 opacity-80">
                    <span className="w-5 h-[1px] bg-stone-300" />
                    <h3 className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-stone-400">
                      {targetLang === 'hi' ? t('meaningHi') : t('meaningMr')}
                    </h3>
                  </div>
                  
                  {targetLang === 'hi' && (verse.rams?.ht || verse.tej?.ht) ? (
                    <p className="text-stone-700 leading-[1.6] text-[14px] sm:text-[15px]" style={{ fontFamily: 'sans-serif' }}>
                      {verse.rams?.ht || verse.tej?.ht}
                    </p>
                  ) : targetLang === 'mr' ? (
                     <p className="text-stone-400 italic text-[11px] sm:text-xs">{t('compilingDB')}</p>
                  ) : (
                    <p className="text-stone-400 italic text-[11px] sm:text-xs">{t('noTranslation')}</p>
                  )}
                </div>
              )}
            </div>

            {renderAggregatedCommentaries(verse)}
          </article>
        ))}
      </div>
    </>
  )
}


