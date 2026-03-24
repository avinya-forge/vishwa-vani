'use client'

import React from 'react'

/**
 * 🖋️ vedic-manuscript-card: Specialized UI for AI Logic
 * 
 * Renders AI-synthesized 'Breakthroughs' in an elegant, 
 * handwritten-manuscript style for enhanced scholarly immersion.
 */
export default function VedicManuscriptCard({ content, className = "" }: { content: string, className?: string }) {
    if (!content) return null

    return (
        <div className={`p-12 md:p-20 bg-stone-50/50 rounded-[4rem] border border-orange-100/50 relative overflow-hidden group/manuscript ${className}`}>
            {/* Texture Overlay (Simulated Palm Leaf/Bhojpatra) */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-100/10 via-amber-50/5 to-transparent pointer-events-none" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-orange-600/5 blur-[120px] rounded-full pointer-events-none -mr-48 -mt-48 transition-all group-hover/manuscript:scale-110 duration-[5000ms]" />
            
            <div className="relative z-10 space-y-8">
                <div className="flex items-center gap-6">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-600" />
                    <span className="text-[11px] font-black uppercase tracking-[0.4em] text-stone-300">Cognitive Manuscript Synthesis</span>
                </div>

                <div className="max-w-4xl">
                    <p className="text-3xl md:text-5xl font-serif font-black text-stone-800 leading-[1.3] antialiased italic">
                        &ldquo;{content}&rdquo;
                    </p>
                </div>

                <div className="flex flex-wrap gap-3 pt-6">
                   {['Atman', 'Brahman', 'Dharma'].map(tag => (
                      <span key={tag} className="text-[10px] font-black uppercase tracking-widest text-stone-300 border border-stone-200 px-3 py-1 rounded-full group-hover/manuscript:border-orange-300 group-hover/manuscript:text-orange-600 transition-colors">
                         {tag}
                      </span>
                   ))}
                </div>
            </div>
        </div>
    )
}
