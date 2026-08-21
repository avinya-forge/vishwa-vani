import React, { useMemo } from 'react';
import Link from 'next/link';
import tattvasData from '@/data/ontology/tattvas.json';
import type { Tattva } from '@/types/ontology';

interface SemanticExplorerDrawerProps {
  textSlug: string;
  chapter: number;
  verse: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function SemanticExplorerDrawer({
  textSlug,
  chapter,
  verse,
  isOpen,
  onClose
}: SemanticExplorerDrawerProps) {
  // Find associated tattvas
  const associatedTattvas = useMemo(() => {
    // We define a more explicit link type avoiding `any`
    type DisplayLink = {
        textSlug: string;
        chapter: number;
        verse: number;
        preview?: string;
        type: 'primary' | 'cross';
        relationship?: string;
        rationale?: string;
    };

    const matchedTattvas: Array<{ tattva: Tattva; isPrimary: boolean; links: DisplayLink[] }> = [];

    const tattvas = tattvasData.tattvas as Record<string, Tattva>;

    for (const [, tattva] of Object.entries(tattvas)) {
      const isPrimary = tattva.primarySources.some(
        (source) => source.textSlug === textSlug && source.chapter === chapter && source.verse === verse
      );

      const crossLinks = tattva.crossReferences.filter(
        (ref) => ref.target.textSlug === textSlug && ref.target.chapter === chapter && ref.target.verse === verse
      );

      // We'll gather other links from this tattva to show in the drawer, excluding the current verse itself
      const otherPrimarySources = tattva.primarySources.filter(
        (source) => !(source.textSlug === textSlug && source.chapter === chapter && source.verse === verse)
      );

      const otherCrossReferences = tattva.crossReferences.filter(
        (ref) => !(ref.target.textSlug === textSlug && ref.target.chapter === chapter && ref.target.verse === verse)
      );

      const allLinks: DisplayLink[] = [
        ...otherPrimarySources.map(s => ({ ...s, type: 'primary' as const })),
        ...otherCrossReferences.map(c => ({ ...c.target, type: 'cross' as const, relationship: c.relationshipType, rationale: c.rationale }))
      ];

      if (isPrimary || crossLinks.length > 0) {
        if (allLinks.length > 0) {
          matchedTattvas.push({
             tattva,
             isPrimary,
             links: allLinks
          });
        }
      }
    }

    return matchedTattvas;
  }, [textSlug, chapter, verse]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className={`fixed inset-y-0 right-0 w-full md:w-96 bg-white dark:bg-[#121212] z-50 shadow-2xl transform transition-transform duration-300 ease-in-out border-l border-stone-200 dark:border-stone-800 ${isOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col h-full overflow-hidden`}>

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-stone-100 dark:border-stone-800 bg-stone-50 dark:bg-stone-900">
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-widest text-orange-600 dark:text-orange-500 mb-1">
              Semantic Explorer
            </span>
            <h2 className="text-xl font-serif font-bold text-stone-900 dark:text-stone-100">
              Cross-Scriptural Links
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 hover:bg-stone-200 dark:hover:bg-stone-800 rounded-full transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-stone-200 dark:scrollbar-thumb-stone-800">

          <div className="mb-6 p-4 bg-orange-50/50 dark:bg-orange-950/20 rounded-xl border border-orange-100 dark:border-orange-900/30">
            <p className="text-sm text-stone-600 dark:text-stone-400">
              Explore interconnected verses based on shared philosophical concepts (Tattvas).
            </p>
          </div>

          {associatedTattvas.length === 0 ? (
            <div className="text-center py-10">
              <span className="text-4xl block mb-4 opacity-50">🔗</span>
              <p className="text-stone-500 dark:text-stone-400 font-medium">No semantic links found for this verse yet.</p>
              <p className="text-xs text-stone-400 dark:text-stone-500 mt-2">The ontological knowledge graph is continuously expanding.</p>
            </div>
          ) : (
            <div className="space-y-8">
              {associatedTattvas.map(({ tattva, links }) => (
                <div key={tattva.id} className="space-y-4">

                  {/* Tattva Header */}
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 rounded text-xs font-bold tracking-wider uppercase">
                      {tattva.category}
                    </span>
                  </div>
                  <h3 className="text-2xl font-serif font-black text-stone-900 dark:text-stone-100">
                    <Link href={`/tattvas/${tattva.id}`} className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
                      {tattva.label} <span className="opacity-50 text-stone-400 ml-2">{tattva.sanskritLabel}</span>
                    </Link>
                  </h3>
                  <p className="text-sm text-stone-600 dark:text-stone-400 line-clamp-2 italic">
                    {tattva.definition}
                  </p>

                  {/* Links List */}
                  <div className="space-y-3 mt-4">
                    {links.map((link, idx) => (
                      <Link
                        key={idx}
                        href={`/${link.textSlug}/${link.chapter}#verse-${link.verse}`}
                        onClick={onClose}
                        className="block p-4 border border-stone-200 dark:border-stone-800 rounded-xl hover:border-orange-300 dark:hover:border-orange-700 hover:bg-stone-50 dark:hover:bg-stone-900/50 transition-all group"
                      >
                         <div className="flex items-start justify-between mb-2">
                            <span className="text-xs font-bold uppercase tracking-wider text-orange-600 dark:text-orange-500">
                              {link.textSlug.replace(/-/g, ' ')}
                            </span>
                            {link.type === 'cross' && (
                              <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                                link.relationship === 'defines' ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400' :
                                link.relationship === 'expands' ? 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400' :
                                'bg-stone-100 text-stone-500 dark:bg-stone-800 dark:text-stone-400'
                              }`}>
                                {link.relationship}
                              </span>
                            )}
                         </div>
                         <div className="text-sm font-serif font-bold text-stone-900 dark:text-stone-100 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                           Ch. {link.chapter}, Verse {link.verse}
                         </div>
                         {link.preview && (
                           <p className="text-xs text-stone-500 dark:text-stone-400 mt-2 line-clamp-2">
                             &quot;{link.preview}&quot;
                           </p>
                         )}
                         {link.rationale && (
                            <p className="text-xs text-stone-400 dark:text-stone-500 mt-2 italic">
                              {link.rationale}
                            </p>
                         )}
                      </Link>
                    ))}
                  </div>

                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </>
  );
}
