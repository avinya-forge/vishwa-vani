import { getTextBySlug } from '@/lib/texts'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { setRequestLocale } from 'next-intl/server'

type Props = {
  params: Promise<{ text: string }>
}

export default async function PostfacePage(props: Props) {
  const params = await props.params
  setRequestLocale('en')
  
  const textSlug = params.text
  const textMetadata = getTextBySlug(textSlug)
  
  if (!textMetadata || !textMetadata.hasPostface) {
    notFound()
  }

  // Right now we only hardcode Bhagavad Gita, as requested by the task
  let postfaceContent = null;
  if (textSlug === 'bhagavad-gita') {
    postfaceContent = (
      <div className="prose prose-stone dark:prose-invert max-w-none">
        <h2 className="text-2xl font-serif font-black mb-4">Post-Context & Impact</h2>
        <p>
          The Bhagavad Gita concludes with Arjuna's doubts resolved, ready to fight the Kurukshetra war with a clear understanding of his duty (Dharma) and the eternal nature of the soul.
        </p>
        <h3 className="text-xl font-bold mt-6 mb-2">What It Led To</h3>
        <p>
          The immediate aftermath of the dialogue was the 18-day Mahabharata war, culminating in the victory of the Pandavas. However, the true legacy of the Gita extends far beyond the epic narrative. It established a philosophical framework that reconciled diverse spiritual paths—action (Karma), knowledge (Jnana), and devotion (Bhakti).
        </p>
        <h3 className="text-xl font-bold mt-6 mb-2">Historical Impact</h3>
        <p>
          Over centuries, the Gita became a cornerstone of Hindu philosophical thought, known as one of the Prasthanatrayi (the three foundational texts of Vedanta, alongside the Upanishads and Brahma Sutras). Numerous scholars, from Adi Shankara to Ramanuja and Madhvacharya, wrote extensive commentaries on it, using it to substantiate their respective schools of Vedanta.
        </p>
        <h3 className="text-xl font-bold mt-6 mb-2">Modern Influence</h3>
        <p>
          In modern times, the Gita influenced prominent leaders and thinkers globally. Mahatma Gandhi referred to it as his "spiritual dictionary" and drew his concept of selfless action (Nishkama Karma) from it. It also profoundly impacted Western figures like J. Robert Oppenheimer, Henry David Thoreau, and Ralph Waldo Emerson, making it one of the most widely read and translated spiritual texts in the world.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] dark:bg-[#1C1917] px-4 py-12 md:py-24">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Link href={`/${textSlug}/${textMetadata.totalChapters}`} className="text-sm font-bold text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 transition-colors">
            &larr; Back to Last Chapter
          </Link>
        </div>
        
        <div className="bg-white dark:bg-stone-900 rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-stone-100 dark:border-stone-800">
          <div className="mb-8 border-b border-stone-100 dark:border-stone-800 pb-8">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-600 dark:text-orange-500 bg-orange-50 dark:bg-orange-950/30 px-3 py-1 rounded-full">
              Postface
            </span>
            <h1 className="text-3xl md:text-5xl font-serif font-black text-stone-900 dark:text-stone-100 mt-4 leading-tight">
              {textMetadata.name}
            </h1>
          </div>
          
          <div className="mb-12">
            {postfaceContent}
          </div>
          
          <div className="flex justify-end pt-8 border-t border-stone-100 dark:border-stone-800">
            <Link 
              href="/"
              className="inline-flex items-center gap-2 px-8 py-4 bg-stone-900 hover:bg-orange-600 text-white rounded-2xl font-black text-[12px] uppercase tracking-widest transition-all shadow-md group"
            >
              Return to Library
              <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
