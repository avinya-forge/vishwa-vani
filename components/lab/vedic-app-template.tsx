'use client'
import React, { useState } from 'react';
import { PrototypeBadge } from '@/components/ui/prototype-badge'

interface VedicAppTemplateProps {
  title: string;
  subtitle: string;
  icon: string;
  footerNote?: string;
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
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={`relative group rounded-[2.5rem] p-5 sm:p-8 border border-stone-200/50 dark:border-stone-800/50 bg-white/40 dark:bg-stone-950/40 backdrop-blur-3xl shadow-sm dark:shadow-none hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-700 flex flex-col overflow-hidden ${expanded ? 'h-auto z-50' : 'h-full'}`}>
      {/* COSMIC GLOW */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-orange-500/10 dark:bg-orange-500/5 blur-[80px] rounded-full group-hover:scale-150 transition-transform duration-[2000ms] pointer-events-none" />
      
      {pocMode && <PrototypeBadge variant="banner" />}
      
      <div 
        className="relative z-10 flex items-center gap-5 mb-6 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="w-14 h-14 bg-stone-100 dark:bg-stone-800 rounded-2xl flex items-center justify-center text-3xl shadow-inner group-hover:scale-110 transition-transform duration-500 shrink-0">
          {icon}
        </div>
        <div className="space-y-1 flex-1">
          <h3 className="font-serif font-black text-[clamp(1.25rem,2.5vw,1.75rem)] text-stone-900 dark:text-white leading-tight line-clamp-2">
            {title}
          </h3>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-600 dark:text-orange-500">
            {subtitle}
          </p>
        </div>
        <div className="w-8 h-8 rounded-full bg-stone-200/50 dark:bg-stone-800/50 flex items-center justify-center transition-transform duration-500 shrink-0 group-hover:bg-orange-500 group-hover:text-white" style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
        </div>
      </div>

      <div className={`relative z-10 flex-grow transition-all duration-700 origin-top ${expanded ? 'opacity-100 max-h-[2000px] pointer-events-auto mt-4' : 'opacity-40 max-h-[120px] pointer-events-none overflow-hidden blur-[1px]'}`}>
        <div className={!expanded ? "pointer-events-none select-none" : ""}>
          {children}
        </div>
        
        {!expanded && (
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white/90 dark:from-stone-950/90 to-transparent flex items-end justify-center pb-2">
             <span className="text-[10px] font-black uppercase tracking-widest text-stone-500 dark:text-stone-400">Click to Initialize Lab</span>
          </div>
        )}
      </div>

      {footerNote && expanded && (
        <div className="relative z-10 mt-8 pt-6 border-t border-stone-100 dark:border-stone-800 animate-in fade-in duration-500">
          <p className="text-[10px] leading-relaxed font-medium text-stone-400 dark:text-stone-500 italic">
            {footerNote}
          </p>
        </div>
      )}
    </div>
  );
}
