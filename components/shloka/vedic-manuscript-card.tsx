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
        <div className={`p-5 sm:p-6 bg-stone-50/80 dark:bg-stone-800/40 rounded-xl border border-orange-200/50 dark:border-stone-700 relative overflow-hidden group/manuscript flex items-start gap-4 ${className}`}>
            {/* Texture Overlay (Simulated Palm Leaf/Bhojpatra) */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-100/10 via-amber-50/5 to-transparent pointer-events-none" />
            <div className="absolute top-0 right-0 w-48 h-48 bg-orange-600/5 blur-[60px] rounded-full pointer-events-none -mr-24 -mt-24 transition-all group-hover/manuscript:scale-110 duration-[3000ms]" />
            
            <div className="flex-shrink-0 mt-1">
                <span className="text-xl">🪷</span>
            </div>

            <div className="relative z-10 w-full">
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-600 dark:text-orange-400">AI Synthesis</span>
                </div>

                <div className="max-w-none">
                    <p className="text-sm sm:text-[15px] font-medium text-stone-700 dark:text-stone-300 leading-relaxed italic">
                        {content}
                    </p>
                </div>
            </div>
        </div>
    )
}
