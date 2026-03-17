import Link from 'next/link'

const chapterTitles: Record<string, string> = {
  '1': 'Arjuna Visada Yoga - The Despondency of Arjuna',
  '2': 'Sankhya Yoga - The Way of Knowledge',
  '3': 'Karma Yoga - The Way of Action',
  '4': 'Jnana Karma Sanyasa Yoga - The Way of Knowledge & Renunciation',
  '5': 'Karma Sanyasa Yoga - The Way of Renunciation',
  '6': 'Dhyana Yoga - The Way of Meditation',
  '7': 'Jnana Vijnana Yoga - Knowledge & Realization',
  '8': 'Akshara Brahma Yoga - The Imperishable Brahman',
  '9': 'Raja Vidya Raja Guhya Yoga - Sovereign Science & Secret',
  '10': 'Vibhuti Yoga - Divine Manifestations',
  '11': 'Visvarupa Darsana Yoga - Vision of the Universal Form',
  '12': 'Bhakti Yoga - The Way of Devotion',
  '13': 'Kshetra Kshetrajna Vibhaga Yoga - The Field & The Knower',
  '14': 'Gunatraya Vibhaga Yoga - Division of the Three Gunas',
  '15': 'Purushottama Yoga - The Supreme Person',
  '16': 'Daivasura Sampad Vibhaga Yoga - Divine & Demoniac Endowments',
  '17': 'Sraddhatraya Vibhaga Yoga - The Threefold Faith',
  '18': 'Moksha Sanyasa Yoga - Liberation & Renunciation'
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FDFBF7] selection:bg-orange-100 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Hero Section */}
        <header className="mb-20 text-center relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-orange-200/30 blur-[100px] rounded-full pointer-events-none" />
          <div className="relative z-10">
            <h1 className="text-5xl md:text-7xl font-bold font-serif text-stone-900 mb-6 tracking-tight">
              Vishwa-Vani
            </h1>
            <p className="text-xl text-stone-600 max-w-2xl mx-auto mb-8 leading-relaxed">
              Explore the depths of Vedic wisdom, word by word. The profound knowledge of the Shrimad Bhagavad Gita, accessible to all.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/bhagavad-gita/1" className="px-8 py-3 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-full hover:from-orange-700 hover:to-amber-700 transition-all font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                Begin Reading
              </Link>
            </div>
          </div>
        </header>

        {/* Chapters Grid */}
        <section>
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-serif font-bold text-stone-800">The 18 Chapters</h2>
            <div className="h-px bg-stone-200 flex-1 ml-8" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 18 }).map((_, i) => {
              const chapterNum = String(i + 1);
              return (
                <Link 
                  href={`/bhagavad-gita/${chapterNum}`} 
                  key={chapterNum}
                  className="group block p-6 bg-white rounded-2xl shadow-sm hover:shadow-xl hover:shadow-orange-900/5 border border-stone-100/80 transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-bold tracking-widest text-orange-500 uppercase">
                      Chapter {chapterNum}
                    </span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-orange-400">
                      &rarr;
                    </span>
                  </div>
                  <h3 className="text-xl font-serif font-semibold text-stone-800 group-hover:text-amber-700 transition-colors leading-snug">
                    {chapterTitles[chapterNum]}
                  </h3>
                </Link>
              )
            })}
          </div>
        </section>

      </div>
    </main>
  )
}
