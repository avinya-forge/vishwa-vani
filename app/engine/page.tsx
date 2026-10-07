import React from 'react';

export default function EnginePage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] dark:bg-[#1C1917] pt-24 pb-20 selection:bg-orange-500/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <h1 className="text-4xl md:text-5xl font-black font-serif text-stone-900 dark:text-stone-100 mb-6">
          The Vishwa-Vani <span className="text-amber-600">Engine</span>
        </h1>
        <p className="text-lg text-stone-600 dark:text-stone-400 mb-12">
          Discover the autonomous architecture powering our digital sanctuary. 
          To protect data integrity, absolute technical details are abstracted, but the philosophy remains open.
        </p>

        <div className="space-y-12">
          {/* Section 1 */}
          <section className="bg-white/50 dark:bg-stone-800/50 backdrop-blur-sm border border-stone-200 dark:border-stone-800 rounded-3xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-4 flex items-center gap-3">
              <span>🧠</span> The Cognitive Brain
            </h2>
            <p className="text-stone-600 dark:text-stone-400 leading-relaxed mb-4">
              Our central intelligence layer acts as a Just-in-Time Virtual Mind. It fields natural language queries 
              and intelligently categorizes scriptures into Learning Paths (e.g., Philosophy, Jyotish, Daily Pooja). 
              It guarantees that all answers are synthesized strictly from our verified texts rather than hallucinated 
              from open-internet noise.
            </p>
            <div className="inline-block px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400 text-xs font-bold uppercase rounded-full tracking-wider">
              Status: Active & Auditing
            </div>
          </section>

          {/* Section 2 */}
          <section className="bg-white/50 dark:bg-stone-800/50 backdrop-blur-sm border border-stone-200 dark:border-stone-800 rounded-3xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-4 flex items-center gap-3">
              <span>⚙️</span> The Data Pipeline
            </h2>
            <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
              This is our relentless, automated assembly line. It handles raw textual acquisition and rigorously parses it 
              through three tiers of cleaning (Bronze → Silver → Gold). Once the data reaches the Gold tier, it is layered 
              with multi-lingual translations and regional commentaries, before being synchronized into our semantic vector-lake.
            </p>
          </section>

          {/* Section 3 */}
          <section className="bg-white/50 dark:bg-stone-800/50 backdrop-blur-sm border border-stone-200 dark:border-stone-800 rounded-3xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-4 flex items-center gap-3">
              <span>🌐</span> The Edge Representation Layer
            </h2>
            <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
              Wrapped in an intuitive Glassmorphism design system, the UI is optimized for global distribution via Edge networks. 
              Real-time data, dynamic counting metrics, and interactive Vedic Labs are served with sub-second latency, providing 
              a premium user experience without exposing backend vulnerabilities.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
