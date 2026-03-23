'use client'

import React, { useState } from 'react'
import { AnvayaToken } from '@/lib/nvf'
import { useTranslations } from 'next-intl'

export default function vedic-explain-shell({ tokens, lang = 'en' }: { tokens: AnvayaToken[], lang?: 'en'|'hi'|'mr' }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  
  // As a fallback for translation keys if needed.
  // const t = useTranslations('study')

  if (!tokens || tokens.length === 0) return null

  return (
    <div className="my-8 p-6 bg-[#FDFBF7] rounded-[2rem] border border-orange-100/50 shadow-sm relative overflow-hidden group/shell">
      <div className="absolute top-0 right-0 w-32 h-32 bg-orange-100 blur-[80px] opacity-20 pointer-events-none" />
      <h4 className="text-[10px] font-black uppercase tracking-widest text-orange-600/80 mb-6 text-center select-none">
        Word-by-Word Analysis (Anvaya)
      </h4>
      
      <div className="flex flex-wrap justify-center gap-x-6 gap-y-8 relative z-10">
        {tokens.map((token, i) => {
          const meaning = lang === 'hi' || lang === 'mr' ? token.hi : token.en
          const isHovered = hoveredIndex === i
          
          return (
            <div 
              key={i} 
              className={`flex flex-col items-center p-3 rounded-2xl cursor-default transition-all duration-300 ${isHovered ? 'bg-white scale-110 shadow-xl ring-1 ring-orange-200 z-20' : 'hover:bg-orange-50/50'}`}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="text-sm font-bold text-stone-900 mb-1">{token.san}</div>
              <div className="text-[10px] font-semibold tracking-wider italic text-stone-500 mb-2">{token.trn}</div>
              
              {/* Connector graphics mimicking ExplainShell diagram style */}
              <div className={`w-0.5 transition-all duration-300 flex-shrink-0 ${isHovered ? 'bg-orange-400 h-6 mb-2' : 'bg-stone-200 h-4 mb-2'}`} />
              
              <div className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all line-clamp-2 text-center max-w-[150px]
                ${isHovered 
                  ? 'bg-orange-50 text-orange-900 border border-orange-200 shadow-sm' 
                  : 'bg-white text-stone-500 border border-stone-100'}`}
              >
                {meaning || '-'}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
