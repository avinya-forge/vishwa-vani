import Link from 'next/link'
import { getAvailableTexts, VEDIC_LIBRARY } from '@/lib/texts'
import { getTranslations, setRequestLocale } from 'next-intl/server'

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('home')
  const availableTexts = getAvailableTexts()

  return (
    <main className="min-h-screen bg-[#FDFBF7] selection:bg-orange-100 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Hero Section */}
        <header className="mb-20 text-center relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-orange-200/30 blur-[100px] rounded-full pointer-events-none" />
          <div className="relative z-10">
            <h1 className="text-5xl md:text-7xl font-bold font-serif text-stone-900 mb-6 tracking-tight">
              {t('title')}
            </h1>
            <p className="text-xl text-stone-600 max-w-2xl mx-auto mb-8 leading-relaxed">
              {t('description')}
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/bhagavad-gita/1" className="px-8 py-3 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-full hover:from-orange-700 hover:to-amber-700 transition-all font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                {t('beginReading')}
              </Link>
            </div>
          </div>
        </header>

        {/* Scripture Categories */}
        {['itihas', 'upanishad', 'veda', 'purana', 'other'].map((cat) => {
          const textsInCat = VEDIC_LIBRARY.filter(t => t.category === cat)
          if (textsInCat.length === 0) return null
          
          return (
            <section key={cat} className="mb-20">
              <div className="flex items-center justify-between mb-10">
                <h2 className="text-3xl font-serif font-bold text-stone-800 uppercase tracking-widest text-sm">
                  {cat === 'itihas' ? 'Itihas & Epics' : cat.charAt(0).toUpperCase() + cat.slice(1) + 's'}
                </h2>
                <div className="h-px bg-stone-200 flex-1 ml-8" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {textsInCat.map((text) => (
                  <div key={text.slug} className={`relative p-8 rounded-3xl border transition-all duration-500 ${text.available ? 'bg-white border-stone-100 shadow-sm hover:shadow-2xl hover:-translate-y-1' : 'bg-stone-50 border-stone-200 opacity-80'}`}>
                    <div className="flex justify-between items-start mb-6">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter ${text.available ? 'bg-orange-100 text-orange-700' : 'bg-stone-200 text-stone-500'}`}>
                        {text.available ? 'Available' : 'Coming Soon'}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl font-serif font-bold text-stone-900 mb-3">
                      {locale === 'hi' ? text.nameHi : locale === 'mr' ? text.nameMr : text.name}
                    </h3>
                    <p className="text-stone-500 text-sm mb-8 leading-relaxed line-clamp-3">
                      {text.description}
                    </p>

                    {text.available && (
                      <div className="flex flex-wrap gap-2">
                        {Array.from({ length: Math.min(text.totalChapters, 6) }).map((_, i) => (
                          <Link 
                            key={i} 
                            href={`/${text.slug}/${i + 1}`}
                            className="px-3 py-1.5 bg-stone-50 hover:bg-orange-600 hover:text-white rounded-lg text-xs font-medium text-stone-600 transition-all border border-stone-100"
                          >
                            {i + 1}
                          </Link>
                        ))}
                        {text.totalChapters > 6 && (
                          <span className="text-[10px] text-stone-400 self-center ml-1">+{text.totalChapters - 6} more</span>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )
        })}
      </div>
    </main>
  )
}

