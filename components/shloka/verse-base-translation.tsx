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
    <div className="px-4 sm:px-6 py-5 sm:py-8 border-b border-stone-50 dark:border-stone-800/30 bg-stone-50/50 dark:bg-stone-900/20">
      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-600/80 dark:text-orange-500/80 mb-4 flex items-center gap-2">
        <span className="w-3 h-px bg-orange-500/50 inline-block"></span>
        Universal Translation
      </p>
      <p className="text-stone-900 dark:text-stone-50 leading-[1.85] text-base sm:text-lg lg:text-xl font-serif font-medium break-words overflow-wrap-anywhere tracking-[-0.01em] text-pretty">
        {cleanText(text)}
      </p>
    </div>
  );
}
