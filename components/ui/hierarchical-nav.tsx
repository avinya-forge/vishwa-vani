'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

function useOnClickOutside(ref: React.RefObject<HTMLDivElement | null>, handler: (event: MouseEvent | TouchEvent) => void) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return
      }
      handler(event)
    }
    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)
    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [ref, handler])
}

export type LevelData = {
  id: string;
  name: string; // "Parva", "Chapter", "Adhyaya"
  activeValue: number | string;
  activeLabel?: string; 
  options: { value: number | string; label?: string; tooltip?: string; href: string }[];
}

export default function HierarchicalNav({ levels }: { levels: LevelData[] }) {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const navRef = useRef<HTMLDivElement>(null)

  useOnClickOutside(navRef, () => setActiveDropdown(null))

  return (
    <div ref={navRef} className="flex flex-wrap items-center gap-1.5 relative">
      {levels.map((level, i) => (
        <div key={level.id} className="flex items-center gap-1.5">
          {i > 0 && <span className="text-stone-300">·</span>}
          <div className="relative">
            <button 
              onClick={() => setActiveDropdown(activeDropdown === level.id ? null : level.id)}
              className="flex items-center gap-1.5 text-xs font-bold text-stone-600 hover:text-orange-600 transition-colors bg-white hover:bg-orange-50 px-2.5 py-1.5 rounded-lg border border-transparent hover:border-orange-100"
            >
              <span className={i === 0 ? "text-orange-600 font-extrabold" : ""}>
                {level.name} {level.activeValue}
              </span>
              {level.activeLabel && (
                <>
                  <span className="text-stone-300 mx-0.5">·</span>
                  <span className="hidden md:inline text-stone-500 font-semibold truncate max-w-[150px]">{level.activeLabel}</span>
                </>
              )}
              <svg className={`w-3.5 h-3.5 transition-transform text-stone-400 ${activeDropdown === level.id ? 'rotate-180 text-orange-600' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path d="M19 9l-7 7-7-7" /></svg>
            </button>

            {activeDropdown === level.id && (
              <div className="absolute top-full left-0 mt-1.5 w-72 bg-white border border-stone-100 rounded-xl shadow-xl shadow-stone-200/50 overflow-hidden animate-in fade-in slide-in-from-top-1 duration-150 z-[100]">
                <div className="px-4 py-2 bg-stone-50/50 border-b border-stone-100 flex justify-between items-center">
                   <span className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400">{level.name} Selection</span>
                </div>
                <div className="p-3 max-h-64 overflow-y-auto grid grid-cols-5 gap-1.5">
                  {level.options.map(opt => (
                    <Link 
                      key={opt.value}
                      href={opt.href}
                      title={opt.tooltip}
                      onClick={() => setActiveDropdown(null)}
                      className={`h-9 flex items-center justify-center rounded-lg text-xs font-black transition-all border ${
                        level.activeValue === opt.value
                        ? 'bg-orange-600 text-white border-orange-600 shadow-sm' 
                        : 'bg-white text-stone-500 border-stone-100 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200'
                      }`}
                    >
                      {opt.label || opt.value}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
