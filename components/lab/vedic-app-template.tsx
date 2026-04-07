import React from 'react';

interface VedicAppTemplateProps {
  title: string;
  subtitle: string;
  icon: string;
  footerNote?: string;
  darkMode?: boolean;
  /** Mark this app as a Proof-of-Concept with a visible prototype banner */
  pocMode?: boolean;
  children: React.ReactNode;
}

export default function VedicAppTemplate({
  title,
  subtitle,
  icon,
  footerNote,
  darkMode = false,
  pocMode = false,
  children,
}: VedicAppTemplateProps) {
  const bgClass = darkMode ? 'bg-stone-900/40 border-stone-800' : 'bg-white border-stone-200';
  const textClass = darkMode ? 'text-white' : 'text-stone-900';
  const subtitleClass = darkMode ? 'text-stone-400' : 'text-stone-500';
  const footerClass = darkMode ? 'text-stone-500 border-stone-800' : 'text-stone-400 border-stone-100';

  return (
    <div className={`rounded-3xl p-8 border shadow-sm flex flex-col h-full ${bgClass}`}>
      {pocMode && (
        <div className="mb-4 px-3 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center gap-2">
          <span className="text-amber-500 text-xs font-black uppercase tracking-widest">⚗ Prototype</span>
          <span className="text-amber-600/70 text-[10px] font-medium">Algorithm is a placeholder — production version coming in Phase 4.</span>
        </div>
      )}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center text-2xl">
          {icon}
        </div>
        <div>
          <h3 className={`font-serif font-black text-xl ${textClass}`}>{title}</h3>
          <p className={`text-xs font-bold uppercase tracking-widest ${subtitleClass}`}>{subtitle}</p>
        </div>
      </div>

      <div className="flex-grow">
        {children}
      </div>

      {footerNote && (
        <div className={`mt-8 pt-6 border-t ${footerClass}`}>
          <p className="text-[10px] leading-relaxed font-medium">
            {footerNote}
          </p>
        </div>
      )}
    </div>
  );
}
