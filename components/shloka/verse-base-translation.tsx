import React from 'react';

interface VerseBaseTranslationProps {
  baseTranslation: string;
  cleanText: (txt: string) => string;
}

export default function VerseBaseTranslation({ baseTranslation, cleanText }: VerseBaseTranslationProps) {
  if (!baseTranslation || typeof baseTranslation !== 'string') return null;
  const text = baseTranslation.trim();

  // Reject empty strings and known placeholder patterns; length check skipped
  // (base translations can legitimately be short, e.g. sutras or mantras)
  const knownBadPatterns = ['[PLACEHOLDER_', 'TBD_CONTENT', 'TODO_LAYER', 'LOREM IPSUM', 'THIS IS A GENERIC PLACEHOLDER', 'INSERTED TO SATISFY THE MINIMUM LENGTH']
  const isPlaceholder = !text || text.startsWith('[') || knownBadPatterns.some(p => text.toUpperCase().includes(p.toUpperCase()))

  if (isPlaceholder) return null;

  return (
    <div className="px-5 sm:px-8 py-6 sm:py-10 border-b border-stone-100/50 dark:border-stone-800/50 bg-white/40 dark:bg-black/20 backdrop-blur-sm">
      <p className="text-[9px] font-black uppercase tracking-[0.25em] text-orange-600/90 dark:text-orange-500/90 mb-5 flex items-center gap-2.5">
        <span className="w-4 h-[2px] bg-orange-500/50 rounded-full inline-block"></span>
        Universal Translation
      </p>
      <p className="text-stone-900 dark:text-stone-100 leading-[1.9] text-[17px] sm:text-lg lg:text-[22px] font-serif font-medium tracking-tight text-pretty">
        {cleanText(text)}
      </p>
    </div>
  );
}
