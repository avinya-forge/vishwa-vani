import { getTextBySlug } from '@/lib/texts'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { setRequestLocale } from 'next-intl/server'

type Props = {
  params: Promise<{ text: string }>
}

export default async function PrefacePage(props: Props) {
  const params = await props.params
  setRequestLocale('en')
  
  const textSlug = params.text
  const textMetadata = getTextBySlug(textSlug)
  
  if (!textMetadata || !textMetadata.hasPreface) {
    notFound()
  }

  // Right now we only hardcode Bhagavad Gita, as requested by the task
  let prefaceContent = null;
  if (textSlug === 'bhagavad-gita') {
    prefaceContent = (
      <div className="prose prose-stone dark:prose-invert max-w-none">
        <h2 className="text-2xl font-serif font-black mb-4">Historical Context</h2>
        <p>
          The Bhagavad Gita is a 700-verse Hindu scripture that is part of the Indian epic Mahabharata (chapters 23–40 of book 6 of the Mahabharata called the Bhishma Parva).
        </p>
        <h3 className="text-xl font-bold mt-6 mb-2">Timeline</h3>
        <p>
          Scholarly consensus dates the composition of the Gita to approximately the 2nd century BCE to 2nd century CE, with the epic setting itself dating back much further (around 900 BCE according to some astronomical and archaeological findings like the Painted Gray Ware culture at Hastinapur).
        </p>
        <h3 className="text-xl font-bold mt-6 mb-2">Real-world Evidence</h3>
        <p>
          The text was synthesized during a period of philosophical consolidation in ancient India, integrating various streams of thought (Sankhya, Yoga, Vedanta). The earliest surviving manuscripts and commentaries (like those by Adi Shankara in the 8th century) point to a long-established oral tradition before being documented in the classical era.
        </p>
        <h3 className="text-xl font-bold mt-6 mb-2">What led to it</h3>
        <p>
          Set in a narrative framework of a dialogue between Pandava prince Arjuna and his guide and charioteer Krishna, the Gita responds to a moral crisis. Facing a fratricidal war, Arjuna is overwhelmed by moral dilemma and despair. The discourse provides a philosophical resolution on dharma, selfless action, and spiritual liberation.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] dark:bg-[#1C1917] px-4 py-12 md:py-24">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Link href="/" className="text-sm font-bold text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 transition-colors">
            &larr; Back to Library
          </Link>
        </div>
        
        <div className="bg-white dark:bg-stone-900 rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-stone-100 dark:border-stone-800">
          <div className="mb-8 border-b border-stone-100 dark:border-stone-800 pb-8">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-600 dark:text-orange-500 bg-orange-50 dark:bg-orange-950/30 px-3 py-1 rounded-full">
              Preface
            </span>
            <h1 className="text-3xl md:text-5xl font-serif font-black text-stone-900 dark:text-stone-100 mt-4 leading-tight">
              {textMetadata.name}
            </h1>
          </div>
          
          <div className="mb-12">
            {prefaceContent}
          </div>
          
          <div className="flex justify-end pt-8 border-t border-stone-100 dark:border-stone-800">
            <Link 
              href={`/${textSlug}/1`}
              className="inline-flex items-center gap-2 px-8 py-4 bg-stone-900 hover:bg-orange-600 text-white rounded-2xl font-black text-[12px] uppercase tracking-widest transition-all shadow-md group"
            >
              Begin Chapter 1
              <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
