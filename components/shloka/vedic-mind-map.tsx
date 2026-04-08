'use client'

import React from 'react'

interface MindMapProps {
    context: {
        speaker?: string
        listener?: string
        lineage?: string
        historicalContext?: string
        keyThemes?: string[]
        availableEditions?: string[]
    }
    scriptureName: string
}

export default function VedicMindMap({ context, scriptureName: _scriptureName }: MindMapProps) {
    if (!context) return null

    return (
        <section className="mt-12 mb-16 px-4">
            <div className="max-wide mx-auto">
                <div className="flex flex-col md:flex-row items-center gap-2 mb-8 text-center md:text-left">
                    <span className="w-12 h-px bg-orange-200 hidden md:block" />
                    <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-700/60">
                         High Level Context Map
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Origin Square */}
                    <div className="relative group bg-white p-8 rounded-[2.5rem] border border-stone-100 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-100/50 blur-[60px] -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
                        <div className="relative z-10">
                            <h3 className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse" />
                                Divine Exchange
                            </h3>
                            <div className="space-y-6">
                                <div>
                                    <p className="text-[9px] font-bold text-stone-300 uppercase tracking-widest mb-1">Speaker</p>
                                    <p className="text-xl font-serif font-black text-stone-800">{context.speaker || 'Unknown'}</p>
                                </div>
                                <div className="flex justify-center -my-2 opacity-20">
                                    <svg className="w-6 h-6 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 13l-7 7-7-7m14-8l-7 7-7-7" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-[9px] font-bold text-stone-300 uppercase tracking-widest mb-1">Listener</p>
                                    <p className="text-xl font-serif font-black text-stone-800">{context.listener || 'Universal Disciples'}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Lineage & Timeline */}
                    <div className="bg-stone-900 text-white p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(251,146,60,0.1),_transparent_70%)]" />
                        <div className="relative z-10 flex flex-col h-full justify-between">
                            <div>
                                <h3 className="text-[10px] font-bold text-orange-400/60 uppercase tracking-widest mb-6">Historical Context</h3>
                                <p className="text-lg font-medium leading-relaxed italic text-stone-300">
                                    "{context.historicalContext || 'Timeless Vedic Wisdom'}"
                                </p>
                            </div>
                            <div className="mt-8 pt-6 border-t border-white/10">
                                <p className="text-[9px] font-bold text-white/30 uppercase tracking-widest mb-2">Guru-Parampara (Lineage)</p>
                                <p className="text-sm font-bold tracking-tight text-white/90">{context.lineage || 'Original Samhita'}</p>
                            </div>
                        </div>
                    </div>

                    {/* Core Philosophy Map */}
                    <div className="lg:col-span-1 md:col-span-2 bg-[#FDFBF7] border border-orange-100 p-8 rounded-[2.5rem] relative overflow-hidden">
                        <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-orange-100/40 rounded-full blur-[100px]" />
                        <h3 className="text-[10px] font-black text-stone-300 uppercase tracking-widest mb-6">Philosophical Pillars</h3>
                        <div className="flex flex-wrap gap-2 relative z-10">
                            {(context.keyThemes || ['Philosophy', 'Wisdom']).map((theme, i) => (
                                <span 
                                    key={i} 
                                    className="px-4 py-2 bg-white border border-orange-100 text-orange-950 text-[11px] font-black rounded-xl shadow-sm hover:scale-105 transition-transform cursor-default"
                                >
                                    {theme}
                                </span>
                            ))}
                        </div>
                        <div className="mt-10">
                             <p className="text-[9px] font-bold text-stone-400 uppercase tracking-widest mb-4">Ingested Library Versions</p>
                             <div className="flex -space-x-2">
                                {(context.availableEditions || ['Vishwa Standard']).slice(0, 4).map((ed, i) => (
                                    <div 
                                        key={i} 
                                        title={ed}
                                        className="w-8 h-8 rounded-full bg-white border-2 border-[#FDFBF7] flex items-center justify-center text-[10px] font-black shadow-sm ring-1 ring-orange-100"
                                    >
                                        {ed.substring(0, 1).toUpperCase()}
                                    </div>
                                ))}
                                {context.availableEditions && context.availableEditions.length > 4 && (
                                    <div className="w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center text-[8px] font-bold border-2 border-white">
                                        +{context.availableEditions.length - 4}
                                    </div>
                                )}
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
