'use client'

import React, { ReactNode } from 'react'
import Link from 'next/link'

interface vedic-app-templateProps {
  title: string
  subtitle: string
  icon: string
  children: ReactNode
  footerNote?: string
}

export default function vedic-app-template({ title, subtitle, icon, children, footerNote }: vedic-app-templateProps) {
  return (
    <div className="bg-white rounded-2xl p-4 md:p-5 text-stone-900 border border-stone-100 shadow-sm transition-all hover:shadow-xl hover:border-orange-100/50 relative overflow-hidden group w-full">
      <div className="absolute top-0 right-0 w-48 h-48 bg-orange-100/40 rounded-full -mr-24 -mt-24 blur-[80px] group-hover:bg-orange-200/50 transition-colors pointer-events-none" />
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl md:text-2xl font-serif font-bold text-stone-800 mb-1 flex items-center gap-3">
              <span className="text-2xl md:text-3xl drop-shadow-sm">{icon}</span> {title}
            </h3>
            <p className="text-[10px] md:text-xs text-stone-400 font-bold uppercase tracking-[0.2em]">
              {subtitle}
            </p>
          </div>
          <Link href="/lab" className="text-[10px] uppercase tracking-widest text-stone-400 hover:text-orange-500 transition-colors font-bold px-3 py-1.5 rounded-full hover:bg-orange-50">
            ← Registry
          </Link>
        </div>

        <div className="my-4">
          {children}
        </div>
      </div>

      {footerNote && (
        <div className="mt-4 pt-4 border-t border-stone-100 relative z-10">
          <p className="text-[10px] text-stone-400 leading-relaxed font-medium">
            * {footerNote}
          </p>
        </div>
      )}
    </div>
  )
}
