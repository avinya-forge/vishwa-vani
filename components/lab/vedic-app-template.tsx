import React from 'react';
import { PrototypeBadge } from '@/components/ui/prototype-badge'

interface VedicAppTemplateProps {
  title: string;
  subtitle: string;
  icon: string;
  footerNote?: string;
  /** Mark this app as a Proof-of-Concept with a visible prototype banner */
  pocMode?: boolean;
  children: React.ReactNode;
}

export default function VedicAppTemplate({
  title,
  subtitle,
  icon,
  footerNote,
  pocMode = false,
  children,
}: VedicAppTemplateProps) {
  // We use the site-wide dark mode classes from globals.css
  return (
    <div className="relative group rounded-[2.5rem] p-5 sm:p-8 border border-stone-200 dark:border-stone-800 bg-white/70 dark:bg-stone-900/40 backdrop-blur-xl shadow-sm dark:shadow-none hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-700 flex flex-col h-full overflow-hidden">
      {/* 🌌 AMBIENT GLOW */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-orange-500/10 dark:bg-orange-500/5 blur-[80px] rounded-full group-hover:scale-150 transition-transform duration-[2000ms]" />
      
      {pocMode && <PrototypeBadge variant="banner" />}
      
      <div className="relative z-10 flex items-center gap-5 mb-8">
        <div className="w-14 h-14 bg-stone-100 dark:bg-stone-800 rounded-2xl flex items-center justify-center text-3xl shadow-inner group-hover:scale-110 transition-transform duration-500">
          {icon}
        </div>
        <div className="space-y-1">
          <h3 className="font-serif font-black text-2xl text-stone-900 dark:text-white leading-tight line-clamp-2">
            {title}
          </h3>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-600 dark:text-orange-500">
            {subtitle}
          </p>
        </div>
      </div>

      <div className="relative z-10 flex-grow">
        {children}
      </div>

      {footerNote && (
        <div className="relative z-10 mt-8 pt-6 border-t border-stone-100 dark:border-stone-800">
          <p className="text-[10px] leading-relaxed font-medium text-stone-400 dark:text-stone-500 italic">
            {footerNote}
          </p>
        </div>
      )}
    </div>
  );
}
