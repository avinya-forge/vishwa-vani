import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'

import tattvasData from '@/data/ontology/tattvas.json'
import type { Tattva } from '@/types/ontology'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = params;
  const tattva = (tattvasData.tattvas as Record<string, Tattva>)[slug];

  if (!tattva) {
    return { title: 'Tattva Not Found' };
  }

  return {
    title: `${tattva.label} (${tattva.sanskritLabel}) | Tattva Explorer`,
    description: tattva.definition,
  };
}

export async function generateStaticParams() {
  return Object.keys(tattvasData.tattvas).map((slug) => ({
    slug,
  }));
}

export default function TattvaPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const tattva = (tattvasData.tattvas as Record<string, Tattva>)[slug];

  if (!tattva) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 md:py-20 min-h-screen">
      <header className="mb-12">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-sm font-bold uppercase tracking-widest text-orange-600 bg-orange-50 dark:bg-orange-900/30 px-3 py-1 rounded-full">
            Tattva Entity
          </span>
          <span className="text-stone-400 capitalize">{tattva.category}</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-serif font-black text-stone-900 dark:text-stone-100 mb-4">
          {tattva.label} <span className="text-stone-400 opacity-50 ml-4 font-normal">{tattva.sanskritLabel}</span>
        </h1>
        <p className="text-xl md:text-2xl text-stone-600 dark:text-stone-300 font-serif leading-relaxed max-w-3xl">
          {tattva.definition}
        </p>
      </header>

      <section className="mb-12">
        <h2 className="text-xs font-black uppercase tracking-[0.2em] text-stone-400 mb-4">Synonyms & Related Concepts</h2>
        <div className="flex flex-wrap gap-2">
          {tattva.synonyms.map(syn => (
            <span key={syn} className="px-4 py-2 bg-stone-100 dark:bg-stone-800 rounded-lg text-sm text-stone-700 dark:text-stone-300">
              {syn}
            </span>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 mb-6">Primary Scriptural Sources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tattva.primarySources.map((source, idx) => (
            <Link
              key={idx}
              href={`/${source.textSlug}/${source.chapter}#verse-${source.verse}`}
              className="p-6 border border-stone-200 dark:border-stone-800 rounded-2xl hover:border-orange-400 dark:hover:border-orange-800 hover:shadow-lg transition-all group bg-white dark:bg-stone-900"
            >
              <div className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">
                {source.textSlug.replace(/-/g, ' ')}
              </div>
              <div className="text-lg font-serif text-stone-900 dark:text-stone-100 mb-3 group-hover:text-orange-600 transition-colors">
                Ch. {source.chapter}, Verse {source.verse}
              </div>
              {source.preview && (
                <p className="text-sm text-stone-600 dark:text-stone-400 italic line-clamp-2">
                  &quot;{source.preview}&quot;
                </p>
              )}
            </Link>
          ))}
          {tattva.primarySources.length === 0 && (
            <p className="text-stone-500 italic col-span-full">No primary sources mapped yet.</p>
          )}
        </div>
      </section>

      {tattva.crossReferences.length > 0 && (
        <section>
          <h2 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100 mb-6">Cross-Scriptural Linkages</h2>
          <div className="space-y-4">
            {tattva.crossReferences.map((link, idx) => (
              <div key={idx} className="flex gap-6 p-6 bg-stone-50 dark:bg-stone-800/50 rounded-2xl border border-stone-100 dark:border-stone-800">
                <div className="flex-none">
                  <span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded ${
                    link.relationshipType === 'defines' ? 'bg-blue-100 text-blue-800' :
                    link.relationshipType === 'expands' ? 'bg-green-100 text-green-800' :
                    link.relationshipType === 'analogous' ? 'bg-purple-100 text-purple-800' :
                    'bg-stone-200 text-stone-700'
                  }`}>
                    {link.relationshipType}
                  </span>
                </div>
                <div>
                  <Link
                    href={`/${link.target.textSlug}/${link.target.chapter}#verse-${link.target.verse}`}
                    className="text-lg font-serif font-bold text-stone-900 dark:text-stone-100 hover:text-orange-600 dark:hover:text-orange-400 mb-2 inline-block"
                  >
                    {link.target.textSlug.replace(/-/g, ' ')} — {link.target.chapter}:{link.target.verse}
                  </Link>
                  {link.rationale && (
                    <p className="text-sm text-stone-600 dark:text-stone-400">{link.rationale}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
