'use client'

import React from 'react'

/**
 * ⏳ vedic-timeline: Genealogical & Historical Stream
 * 
 * Re-designed for high-fidelity immersion. Uses a linear 'Stream'
 * approach to show the chronological flow of Vedic history.
 */
import { VEDIC_LIBRARY } from '@/lib/texts'

/**
 * ⏳ vedic-timeline: Genealogical & Subjective Anchor
 * 
 * Re-designed to be fully context-aware, showing specific historical
 * and archaeological details for the active scripture.
 */
export default function VedicTimeline({ slug }: { slug: string }) {
    const book = VEDIC_LIBRARY.find(b => b.slug === slug)
    const meta = book?.contextualInfo

    const milestones = [
        { label: 'Ancient Era', val: meta?.historicalEra || 'Approx. 3102 BCE', active: true },
        { label: 'Scientific Evidence', val: meta?.archaeologicalEvidence || 'Literary Traditions', active: !!meta?.archaeologicalEvidence },
        { label: 'Scriptural Tradition', val: meta?.documentationEra || 'Classical Compilation', active: true },
        { label: 'Sacred Location', val: meta?.geographicalContext || 'Kurukshetra Basin', active: !!meta?.geographicalContext }
    ]

    return (
        <div className="bg-white rounded-3xl p-8 border border-stone-100 relative group overflow-hidden shadow-sm">
            {/* Visual Timeline Bar */}
            <div className="absolute top-[3.25rem] left-8 right-8 h-px bg-stone-100 hidden md:block" />
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
                {milestones.map((m, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center md:items-start group/node">
                         {/* The Node Dot */}
                         <div className={`hidden md:block w-3 h-3 rounded-full border-2 mb-4 transition-all duration-500 ${m.active ? 'bg-orange-600 border-orange-200 scale-125 shadow-lg shadow-orange-100' : 'bg-stone-200 border-white'}`} />
                         
                         <span className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-300 mb-2">{m.label}</span>
                         <div className={`text-sm md:text-base font-serif font-bold leading-tight ${m.active ? 'text-stone-900 border-b-2 border-orange-600/10' : 'text-stone-400 opacity-60'}`}>
                            {m.val}
                         </div>
                    </div>
                ))}
            </div>
            
            {/* Background Texture & Shimmer */}
            <div className="absolute top-0 right-0 w-64 h-full bg-orange-600/5 blur-3xl rounded-full -mr-32 pointer-events-none group-hover:bg-orange-600/10 transition-colors" />
        </div>
    )
}
