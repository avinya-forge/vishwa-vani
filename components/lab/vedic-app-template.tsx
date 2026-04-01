import React from 'react';

interface VedicAppTemplateProps {
  title: string;
  subtitle: string;
  icon: string;
  footerNote?: string;
  children: React.ReactNode;
}

export default function VedicAppTemplate({
  title,
  subtitle,
  icon,
  footerNote,
  children,
}: VedicAppTemplateProps) {
  return (
    <div className="bg-white rounded-3xl p-8 border border-stone-200 shadow-sm flex flex-col h-full">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center text-2xl">
          {icon}
        </div>
        <div>
          <h3 className="font-serif font-black text-xl text-stone-900">{title}</h3>
          <p className="text-xs font-bold text-stone-500 uppercase tracking-widest">{subtitle}</p>
        </div>
      </div>

      <div className="flex-grow">
        {children}
      </div>

      {footerNote && (
        <div className="mt-8 pt-6 border-t border-stone-100">
          <p className="text-[10px] text-stone-400 leading-relaxed font-medium">
            {footerNote}
          </p>
        </div>
      )}
    </div>
  );
}
