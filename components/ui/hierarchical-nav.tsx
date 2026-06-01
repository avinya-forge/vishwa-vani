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
  const [searchQuery, setSearchQuery] = useState('')
  const navRef = useRef<HTMLDivElement>(null)

  useOnClickOutside(navRef, () => {
    setActiveDropdown(null)
    setSearchQuery('')
  })


  return (
    <div ref={navRef} className="flex flex-wrap items-center gap-1.5 relative">
      {levels.map((level, i) => (
        <div key={level.id} className="flex items-center gap-1.5">
          {i > 0 && <span className="text-stone-300">·</span>}
          <div className="relative">
            <button 
              onClick={() => setActiveDropdown(activeDropdown === level.id ? null : level.id)}
              className="flex items-center gap-1.5 text-xs font-bold text-stone-600 dark:text-stone-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors bg-white dark:bg-stone-800 hover:bg-orange-50 dark:hover:bg-orange-950/30 px-2.5 py-1.5 rounded-lg border border-transparent hover:border-orange-100 dark:hover:border-orange-900/30"
            >
              <span className={i === 0 ? "text-orange-600 dark:text-orange-500 font-extrabold" : ""}>
                {level.name} {level.activeValue}
              </span>
              {level.activeLabel && (
                <>
                  <span className="text-stone-300 dark:text-stone-600 mx-0.5">·</span>
                  <span className="hidden md:inline text-stone-500 dark:text-stone-400 font-semibold">{level.activeLabel}</span>
                </>
              )}
              <svg className={`w-3.5 h-3.5 transition-transform text-stone-400 dark:text-stone-500 ${activeDropdown === level.id ? 'rotate-180 text-orange-600 dark:text-orange-500' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path d="M19 9l-7 7-7-7" /></svg>
            </button>

            {activeDropdown === level.id && (
              <div className={`absolute top-full mt-1.5 w-[280px] xs:w-72 max-w-[calc(100vw-2rem)] bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800 rounded-xl shadow-xl shadow-stone-200/50 dark:shadow-none overflow-hidden animate-in fade-in slide-in-from-top-1 duration-150 z-[100] ${i === levels.length - 1 ? 'right-0' : 'left-0 sm:left-auto'}`}>
                <div className="px-4 py-2 bg-stone-50/50 dark:bg-stone-950/30 border-b border-stone-100 dark:border-stone-800 flex justify-between items-center">
                   <span className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 dark:text-stone-500">{level.name} Selection</span>
                </div>
                {level.options.length > 50 && (
                  <div className="px-3 pt-3">
                    <input
                      type="text"
                      placeholder={`Search ${level.name.toLowerCase()}...`}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-stone-100 dark:bg-stone-800/50 border border-transparent focus:border-orange-300 dark:focus:border-orange-700/50 rounded-lg px-3 py-1.5 text-xs outline-none transition-colors"
                      autoFocus
                    />
                  </div>
                )}
                <div className="p-3 max-h-64 overflow-y-auto grid grid-cols-5 gap-1.5">
                  {level.options
                    .filter(opt => !searchQuery || String(opt.value).toLowerCase().includes(searchQuery.toLowerCase()) || opt.label?.toLowerCase().includes(searchQuery.toLowerCase()) || opt.tooltip?.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map(opt => (
                    <Link 
                      key={opt.value}
                      href={opt.href}
                      title={opt.tooltip}
                      onClick={() => {
                        setActiveDropdown(null)
                        setSearchQuery('')
                      }}
                      className={`h-9 flex items-center justify-center rounded-lg text-xs font-black transition-all border ${
                        level.activeValue === opt.value
                        ? 'bg-orange-600 text-white border-orange-600 shadow-sm' 
                        : 'bg-white dark:bg-stone-800 text-stone-500 dark:text-stone-400 border-stone-100 dark:border-stone-700 hover:bg-orange-50 dark:hover:bg-orange-950/30 hover:text-orange-600 dark:hover:text-orange-400 hover:border-orange-200 dark:hover:border-orange-600'
                      }`}
                    >
                      {opt.label || opt.value}
                    </Link>
                  ))}
                  {level.options.length > 0 && level.options.filter(opt => !searchQuery || String(opt.value).toLowerCase().includes(searchQuery.toLowerCase()) || opt.label?.toLowerCase().includes(searchQuery.toLowerCase()) || opt.tooltip?.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
                     <div className="col-span-5 text-center py-4 text-xs text-stone-400">No results found</div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
