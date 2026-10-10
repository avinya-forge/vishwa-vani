import React from 'react'
import { VEDIC_LIBRARY, SCRIPTURE_READINESS_SCORES, isTextCompleted } from '@/lib/texts'

export default function PipelineTracker() {
  const live = VEDIC_LIBRARY.filter(t => isTextCompleted(t.slug))
  const inProgress = VEDIC_LIBRARY.filter(t => !isTextCompleted(t.slug) && SCRIPTURE_READINESS_SCORES[t.slug] >= 40)
    .sort((a, b) => (SCRIPTURE_READINESS_SCORES[b.slug] || 0) - (SCRIPTURE_READINESS_SCORES[a.slug] || 0))
  const backlog = VEDIC_LIBRARY.filter(t => !isTextCompleted(t.slug) && (SCRIPTURE_READINESS_SCORES[t.slug] || 0) < 40)

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 my-24 relative z-10">
      <div className="bg-white/70 dark:bg-stone-900/50 backdrop-blur-md rounded-3xl border border-stone-200/80 dark:border-stone-800 p-8 shadow-sm">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <h2 className="text-2xl font-serif font-black text-stone-900 dark:text-stone-100 flex items-center gap-3">
              <span className="text-orange-500">⚡</span> Data Acquisition Pipeline
            </h2>
            <p className="text-stone-500 dark:text-stone-400 text-sm mt-1">
              Tracking our progress toward ingesting 100,000+ canonical Vedic verses.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-xs font-bold uppercase tracking-widest text-green-700 dark:text-green-500 bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded-full">
              System Live
            </span>
          </div>
        </div>

        <div className="space-y-8">
          {/* Live (Gold) */}
          <div>
            <div className="flex items-center gap-3 mb-4 border-b border-stone-100 dark:border-stone-800 pb-2">
              <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 flex items-center justify-center text-xs font-black">✓</div>
              <h3 className="text-sm font-black uppercase tracking-widest text-stone-700 dark:text-stone-300">Live & 100% Verified (Gold)</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {live.map(t => (
                <div key={t.slug} className="px-3 py-1.5 bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 rounded-lg text-sm font-bold text-stone-800 dark:text-stone-200 flex items-center gap-2">
                  <span>{t.name}</span>
                  <span className="text-[10px] text-green-600 dark:text-green-500 bg-green-100 dark:bg-green-900/40 px-1.5 py-0.5 rounded-sm">100%</span>
                </div>
              ))}
            </div>
          </div>

          {/* In Progress (Silver) */}
          <div>
            <div className="flex items-center gap-3 mb-4 border-b border-stone-100 dark:border-stone-800 pb-2">
              <div className="w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-500 flex items-center justify-center text-xs font-black">↻</div>
              <h3 className="text-sm font-black uppercase tracking-widest text-stone-700 dark:text-stone-300">In Pipeline (Silver Tier)</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {inProgress.map(t => {
                const score = SCRIPTURE_READINESS_SCORES[t.slug] || 0
                return (
                  <div key={t.slug} className="p-3 bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700/50 rounded-xl">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-bold text-stone-700 dark:text-stone-300">{t.name}</span>
                      <span className="text-xs font-black text-amber-600 dark:text-amber-500">{score.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-stone-200 dark:bg-stone-700 rounded-full h-1.5">
                      <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: `${score}%` }}></div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Coming Soon (Bronze) */}
          <div>
            <div className="flex items-center gap-3 mb-4 border-b border-stone-100 dark:border-stone-800 pb-2">
              <div className="w-6 h-6 rounded-full bg-stone-200 dark:bg-stone-800 text-stone-500 flex items-center justify-center text-xs font-black">⋯</div>
              <h3 className="text-sm font-black uppercase tracking-widest text-stone-500">Upcoming (Bronze Tier)</h3>
            </div>
            <div className="flex flex-wrap gap-2 opacity-60">
              {backlog.map(t => (
                <div key={t.slug} className="px-3 py-1.5 bg-transparent border border-dashed border-stone-300 dark:border-stone-700 rounded-lg text-xs font-bold text-stone-500">
                  {t.name}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
