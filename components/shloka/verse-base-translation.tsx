import React from 'react';

interface VerseBaseTranslationProps {
  baseTranslation: string;
  cleanText: (txt: string) => string;
}

export default function VerseBaseTranslation({ baseTranslation, cleanText }: VerseBaseTranslationProps) {
  const text = baseTranslation.trim();

  // Reject empty strings and known placeholder patterns; length check skipped
  // (base translations can legitimately be short, e.g. sutras or mantras)
  const knownBadPatterns = ['[PLACEHOLDER_', 'TBD_CONTENT', 'TODO_LAYER', 'LOREM IPSUM', 'THIS IS A GENERIC PLACEHOLDER', 'INSERTED TO SATISFY THE MINIMUM LENGTH']
  const isPlaceholder = !text || text.startsWith('[') || knownBadPatterns.some(p => text.toUpperCase().includes(p.toUpperCase()))

  if (isPlaceholder) return null;

  return (
    <div className="px-4 sm:px-6 py-4 sm:py-8 border-b border-stone-50 dark:border-stone-800/30 bg-white dark:bg-stone-900/10">
      <p className="text-[10px] font-black uppercase tracking-widest text-orange-500 dark:text-orange-600 mb-3 ml-0.5">Universal Translation</p>
      <p className="text-stone-800 dark:text-stone-100 leading-relaxed text-[15px] sm:text-[17px] font-serif font-medium break-words overflow-wrap-anywhere">
        {cleanText(text)}
      </p>
    </div>
  );
}
