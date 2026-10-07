import React from 'react';
import RatingTelemetry from './rating-telemetry';

interface VerseCommentarySectionProps {
  commentaries: unknown[];
  languageSelection: string;
  scholarSelection: string[];
  getScholarMeta: (authorKey: string) => { name: string; bio: string; label: string; icon: string };
  normalizeScholarKey: (author: string) => string;
  getLanguageLabel: (lang: string) => string;
  cleanText: (txt: string) => string;
  verseId: string;
}

export default function VerseCommentarySection({
  commentaries,
  languageSelection,
  scholarSelection,
  getScholarMeta,
  normalizeScholarKey,
  getLanguageLabel,
  cleanText,
  verseId
}: VerseCommentarySectionProps) {

  if (!commentaries || !Array.isArray(commentaries) || commentaries.length === 0) {
    if (scholarSelection.length > 0 && !scholarSelection.includes('none')) {
      return (
        <div className="px-4 sm:px-6 py-4 bg-stone-50/50 dark:bg-stone-800/20">
          <p className="text-[10px] text-stone-400 dark:text-stone-500 font-bold italic tracking-wide">
            Commentary unavailable for selected scholar(s) in {getLanguageLabel(languageSelection).toLowerCase()}.
            Try switching to 'All' languages or selecting a different scholar.
          </p>
        </div>
      );
    }
    return null;
  }

  return (
    <div className="px-4 sm:px-6 py-4 sm:py-5 bg-orange-50/30 dark:bg-orange-950/20">
      {commentaries.map((c: unknown, ci: number) => {
        const comment = c as Record<string, unknown>
        const meta = getScholarMeta(normalizeScholarKey(comment.author as string))
        return (
          <div key={ci} className={ci > 0 ? 'mt-4 sm:mt-5 pt-4 sm:pt-5 border-t border-orange-100 dark:border-orange-500/10' : ''}>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="text-sm">{meta.icon}</span>
              <span className="text-[9px] font-black uppercase tracking-widest text-orange-700 dark:text-orange-500 break-words">{meta.label}</span>
            </div>
            <p className="text-stone-700 dark:text-stone-300 leading-[1.8] text-[14px] sm:text-[16px] font-serif whitespace-pre-line break-words overflow-wrap-anywhere text-pretty">
              {cleanText(comment.content as string)}
            </p>
            <div className="mt-3">
              <RatingTelemetry verseId={verseId} scholarId={comment.author as string} language={(comment.lang as string) || 'en'} />
            </div>
          </div>
        )
      })}
    </div>
  );
}
