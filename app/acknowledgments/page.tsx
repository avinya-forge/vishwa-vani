import React from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { setRequestLocale } from 'next-intl/server'

export default function AcknowledgmentsPage() {
  setRequestLocale('en')

  const sections = [
    {
      title: '📜 Scholarly Sources',
      items: [
        { name: 'BORI Critical Edition', role: 'Mahabharata Sanskrit Source', link: 'https://bori.ac.in/' },
        { name: 'Swami Sivananda', role: 'Commentary & Translation (Gita)', link: '#' },
        { name: 'Adi Shankaracharya', role: 'Bhasya (Gita & Upanishads)', link: '#' },
        { name: 'Swami Chinmayananda', role: 'Holy Geeta Commentary', link: '#' },
        { name: 'Gita Press Gorakhpur', role: 'Hindi Translations & References', link: 'https://www.gitapress.org/' }
      ]
    },
    {
      title: '🛠️ Open Source & Libraries',
      items: [
        { name: 'Next.js', role: 'The React Framework for the Web', link: 'https://nextjs.org/' },
        { name: 'Tailwind CSS', role: 'Utility-first CSS framework', link: 'https://tailwindcss.com/' },
        { name: 'sql.js', role: 'SQLite compiled to JavaScript/WebAssembly', link: 'https://sql.js.org/' },
        { name: 'next-intl', role: 'Internationalization for Next.js', link: 'https://next-intl-docs.vercel.app/' },
        { name: 'React Markdown', role: 'Markdown component for React', link: 'https://github.com/remarkjs/react-markdown' }
      ]
    },
    {
      title: '🏛️ Contributors & Community',
      items: [
        { name: 'Avinya Forge', role: 'Project Architecture & Engineering', link: '#' },
        { name: 'Vedic Wisdom Community', role: 'Content Validation & Proofreading', link: '#' }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col">
      <Header />
      <main className="flex-grow max-w-4xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-serif font-black text-stone-900 mb-6">Acknowledgments</h1>
          <p className="text-stone-500 text-lg max-w-2xl mx-auto leading-relaxed">
            Vishwa-Vani is a collaborative effort built upon centuries of scholarly wisdom and decades of open-source engineering. We extend our deepest gratitude to those who preserved this knowledge.
          </p>
        </div>

        <div className="space-y-16">
          {sections.map((section, idx) => (
            <section key={idx} className="space-y-8">
              <h2 className="text-2xl font-serif font-black text-stone-800 border-b border-stone-200 pb-4">
                {section.title}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {section.items.map((item, i) => (
                  <div key={i} className="p-6 bg-white rounded-2xl border border-stone-100 shadow-sm hover:border-orange-200 transition-all group">
                    <h3 className="font-bold text-stone-900 group-hover:text-orange-600 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-xs text-stone-400 uppercase tracking-widest mt-1">
                      {item.role}
                    </p>
                    {item.link !== '#' && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] text-orange-500 font-black uppercase tracking-tighter mt-4 inline-block hover:underline"
                      >
                        Visit Website &rarr;
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-20 p-12 bg-stone-900 rounded-[3rem] text-center text-white">
          <h3 className="text-2xl font-serif font-bold mb-4">Support the Preservation</h3>
          <p className="text-stone-400 text-sm max-w-lg mx-auto mb-8">
            This project is open-source and non-profit. If you wish to contribute to the preservation and digitization of Vedic texts, please join our community.
          </p>
          <a
            href="https://github.com/avinya-forge/vishwa-vani"
            className="inline-block px-8 py-4 bg-orange-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-orange-500 transition-all shadow-xl shadow-orange-900/20"
          >
            Contribute on GitHub
          </a>
        </div>
      </main>
      <Footer />
    </div>
  )
}
