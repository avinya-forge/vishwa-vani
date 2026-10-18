import React from 'react'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const metadata = {
  title: 'Privacy & Data Governance | Vishwa-Vani',
  description: 'Vishwa-Vani privacy policy, open-access commitment, zero invasive tracking, local SQLite offline storage, and data governance practices.',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] dark:bg-stone-950 text-stone-900 dark:text-stone-100 transition-colors">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        {/* Breadcrumb / Top tag */}
        <div className="mb-6">
          <Link
            href="/"
            className="text-xs font-bold uppercase tracking-widest text-orange-600 hover:text-orange-700 transition-colors"
          >
            &larr; Back to Sanctum
          </Link>
        </div>

        {/* Hero Header */}
        <div className="mb-12 border-b border-stone-200 dark:border-stone-800 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800/60 text-xs font-bold text-orange-700 dark:text-orange-400 uppercase tracking-wider mb-4">
            <span>🛡️</span>
            <span>Ethical Open Source Data Governance</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black tracking-tight mb-4">
            Privacy &amp; Data Ethics
          </h1>
          <p className="text-base sm:text-lg text-stone-600 dark:text-stone-400 font-serif leading-relaxed">
            Vishwa-Vani is built as an open-access, local-first preservation engine for Vedic wisdom. We believe sacred texts should remain free, unencumbered by surveillance, and fully respectful of your intellectual sovereignty.
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-10 text-stone-700 dark:text-stone-300">
          {/* Section 1 */}
          <section className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 md:p-8 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 mb-3 flex items-center gap-2">
              <span>🔒</span>
              <span>Zero Invasive Profiling &amp; Local Storage</span>
            </h2>
            <p className="leading-relaxed text-sm sm:text-base mb-4">
              Your reading history, bookmarks, font preferences, audio recitation state, and active chapter positions are saved <strong>locally on your own device</strong> via standard browser <code className="px-1.5 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-xs font-mono text-orange-600">localStorage</code> and client-side memory.
            </p>
            <p className="leading-relaxed text-sm sm:text-base">
              We do not sell, rent, or monetize your search queries, theological interests, or reading velocity. You can wipe your local reading progress at any time by clearing your browser cache.
            </p>
          </section>

          {/* Section 2 */}
          <section className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 md:p-8 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 mb-3 flex items-center gap-2">
              <span>🌐</span>
              <span>Analytics &amp; Regional Aggregation</span>
            </h2>
            <p className="leading-relaxed text-sm sm:text-base mb-4">
              To understand general global readership, popular scriptures, and technical performance across mobile and desktop devices, we use anonymized telemetry:
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm sm:text-base pl-2">
              <li><strong>Anonymized Pageviews:</strong> Aggregate statistics on which sacred books and chapters receive the highest readership.</li>
              <li><strong>Zero PII Collection:</strong> We do not track IP addresses directly to identifiable individuals or fingerprint user devices.</li>
              <li><strong>Free-tier Cloud Infrastructure:</strong> Telemetry is processed without cross-site tracking or third-party advertising cookies.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 md:p-8 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 mb-3 flex items-center gap-2">
              <span>📧</span>
              <span>Voluntary Subscriptions &amp; Communication</span>
            </h2>
            <p className="leading-relaxed text-sm sm:text-base mb-4">
              When you voluntarily subscribe to scripture releases, daily shlokas, or developer updates, your email address is encrypted and stored solely in our project database to deliver the requested dispatches.
            </p>
            <p className="leading-relaxed text-sm sm:text-base">
              Every dispatched email contains a one-click unsubscribe mechanism. We strictly honor all opt-out requests immediately.
            </p>
          </section>

          {/* Section 4 */}
          <section className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 md:p-8 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 mb-3 flex items-center gap-2">
              <span>📜</span>
              <span>Open Source &amp; Public Domain Heritage</span>
            </h2>
            <p className="leading-relaxed text-sm sm:text-base">
              All scripture data in the Vishwa-Vani lake is curated from verified public domain manuscripts, ancient commentaries, and open educational commons. For questions or data governance requests, reach out via our open GitHub repository or the developer API endpoints.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
