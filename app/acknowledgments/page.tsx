import React from 'react'
import Link from 'next/link'

export default function AcknowledgmentsPage() {
  return (
    <main className="min-h-screen bg-[#FDFBF7] py-16 px-6 sm:px-12">
      <div className="max-w-4xl mx-auto">
        <header className="mb-16 border-b border-stone-200 pb-12">
            <Link href="/" className="text-orange-600 font-bold text-xs uppercase tracking-widest hover:text-orange-700 transition-colors mb-8 inline-block">
                ← Return to Library
            </Link>
            <h1 className="text-4xl sm:text-6xl font-serif font-black text-stone-900 leading-tight">
                Vishwa-Vani <br/><span className="text-orange-600">Acknowledgments</span>
            </h1>
            <p className="mt-8 text-stone-500 text-lg leading-relaxed max-w-2xl">
                Honoring the spiritual luminaries, digital archives, and open-source contributors who made this platform possible.
            </p>
        </header>

        <div className="grid gap-16">
            <section>
                <h2 className="text-xs font-black uppercase tracking-[0.2em] text-stone-400 mb-8 flex items-center gap-3">
                    <span className="w-8 h-px bg-stone-200" />
                    Scriptural Sources
                </h2>
                <div className="grid sm:grid-cols-2 gap-8">
                    <div className="bg-white p-8 rounded-3xl border border-stone-100 shadow-sm">
                        <h3 className="font-serif font-bold text-xl mb-4">Gita Supersite</h3>
                        <p className="text-stone-500 text-sm leading-relaxed mb-6">
                            IIT Kanpur's seminal digital archive of the Bhagavad Gita and major commentaries. Primary source for multi-author comparisons.
                        </p>
                        <a href="https://www.gitasupersite.iitk.ac.in/" target="_blank" className="text-orange-600 text-[10px] font-black uppercase tracking-widest hover:underline">Visit Repository</a>
                    </div>
                    <div className="bg-white p-8 rounded-3xl border border-stone-100 shadow-sm">
                        <h3 className="font-serif font-bold text-xl mb-4">Vedabase</h3>
                        <p className="text-stone-500 text-sm leading-relaxed mb-6">
                            Srila Prabhupada's monumental translations and purports. Essential for Bhakti-focused scholarship.
                        </p>
                        <a href="https://vedabase.io/" target="_blank" className="text-orange-600 text-[10px] font-black uppercase tracking-widest hover:underline">Visit Repository</a>
                    </div>
                    <div className="bg-white p-8 rounded-3xl border border-stone-100 shadow-sm">
                        <h3 className="font-serif font-bold text-xl mb-4">Chat-with-author (Anish Nemali)</h3>
                        <p className="text-stone-500 text-sm leading-relaxed mb-6">
                            Kisari Mohan Ganguli's (KMG) unabridged English translation of the 18 Parvas of the Mahabharata.
                        </p>
                        <a href="https://github.com/Anishnemali/Chat-with-author" target="_blank" className="text-orange-600 text-[10px] font-black uppercase tracking-widest hover:underline">Visit Repository</a>
                    </div>
                </div>
            </section>

            <section>
                <h2 className="text-xs font-black uppercase tracking-[0.2em] text-stone-400 mb-8 flex items-center gap-3">
                    <span className="w-8 h-px bg-stone-200" />
                    Cultural Guardians
                </h2>
                <div className="space-y-4">
                    <div className="p-6 bg-stone-50 rounded-2xl border border-stone-100 flex items-center justify-between">
                        <span className="font-bold text-stone-800">Vedanta Spiritual Library</span>
                        <a href="http://www.celextel.org/" className="text-stone-400 hover:text-orange-600 italic text-xs">celextel.org</a>
                    </div>
                    <div className="p-6 bg-stone-50 rounded-2xl border border-stone-100 flex items-center justify-between">
                        <span className="font-bold text-stone-800">Sanskrit Documents (ITRANS)</span>
                        <a href="https://sanskritdocuments.org/" className="text-stone-400 hover:text-orange-600 italic text-xs">sanskritdocuments.org</a>
                    </div>
                </div>
            </section>

            <section className="bg-stone-900 text-white p-12 rounded-[3rem] shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600 blur-[100px] opacity-20" />
                <h3 className="font-serif text-3xl mb-4 italic">"Wisdom is like the ocean; <br/>all streams lead back to the source."</h3>
                <p className="text-stone-400 text-sm leading-relaxed max-w-lg mb-8">
                    Vishwa-Vani is a non-commercial, educational platform dedicated to the preservation and accessibility of Vedic knowledge. All content is shared under fair use principles or respective open-source licenses.
                </p>
                <footer className="text-[10px] font-bold text-orange-200 uppercase tracking-widest">
                    Digital Dharma Project © 2026
                </footer>
            </section>
        </div>
      </div>
    </main>
  )
}
