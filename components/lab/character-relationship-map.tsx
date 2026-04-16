import React, { useState } from 'react'
import VedicAppTemplate from './vedic-app-template'

const CHARACTERS = [
  { id: 'shantanu', name: 'Shantanu', faction: 'Kuru', x: 400, y: 50 },
  { id: 'bhishma', name: 'Bhishma', faction: 'Kuru', x: 250, y: 150 },
  { id: 'vyasa', name: 'Vyasa', faction: 'Sage', x: 550, y: 150 },
  { id: 'dhritarashtra', name: 'Dhritarashtra', faction: 'Kaurava', x: 300, y: 250 },
  { id: 'pandu', name: 'Pandu', faction: 'Pandava', x: 500, y: 250 },
  { id: 'vidura', name: 'Vidura', faction: 'Kuru', x: 700, y: 250 },
  { id: 'duryodhana', name: 'Duryodhana', faction: 'Kaurava', x: 200, y: 350 },
  { id: 'dushasana', name: 'Dushasana', faction: 'Kaurava', x: 350, y: 350 },
  { id: 'yudhisthira', name: 'Yudhisthira', faction: 'Pandava', x: 450, y: 350 },
  { id: 'bhima', name: 'Bhima', faction: 'Pandava', x: 550, y: 350 },
  { id: 'arjuna', name: 'Arjuna', faction: 'Pandava', x: 650, y: 350 },
  { id: 'nakula', name: 'Nakula', faction: 'Pandava', x: 750, y: 350 },
  { id: 'sahadeva', name: 'Sahadeva', faction: 'Pandava', x: 850, y: 350 },
  { id: 'krishna', name: 'Krishna', faction: 'Divine', x: 650, y: 450 }
]

const LINKS = [
  { source: 'shantanu', target: 'bhishma', label: 'Son' },
  { source: 'shantanu', target: 'vyasa', label: 'Step-Grandfather' },
  { source: 'vyasa', target: 'dhritarashtra', label: 'Father (Niyoga)' },
  { source: 'vyasa', target: 'pandu', label: 'Father (Niyoga)' },
  { source: 'vyasa', target: 'vidura', label: 'Father (Niyoga)' },
  { source: 'dhritarashtra', target: 'duryodhana', label: 'Son' },
  { source: 'dhritarashtra', target: 'dushasana', label: 'Son' },
  { source: 'pandu', target: 'yudhisthira', label: 'Son (via Dharma)' },
  { source: 'pandu', target: 'bhima', label: 'Son (via Vayu)' },
  { source: 'pandu', target: 'arjuna', label: 'Son (via Indra)' },
  { source: 'pandu', target: 'nakula', label: 'Son (via Ashvins)' },
  { source: 'pandu', target: 'sahadeva', label: 'Son (via Ashvins)' },
  { source: 'krishna', target: 'arjuna', label: 'Friend / Guide' }
]

export default function CharacterRelationshipMap() {
  const [selectedNode, setSelectedNode] = useState<string | null>(null)

  const getFactionColor = (faction: string) => {
    switch (faction) {
      case 'Kaurava': return 'fill-red-500/80 stroke-red-500'
      case 'Pandava': return 'fill-blue-500/80 stroke-blue-500'
      case 'Kuru': return 'fill-orange-500/80 stroke-orange-500'
      case 'Divine': return 'fill-yellow-400/80 stroke-yellow-400'
      case 'Sage': return 'fill-purple-500/80 stroke-purple-500'
      default: return 'fill-stone-500/80 stroke-stone-500'
    }
  }

  const footerNote = "Interactive family tree and relationship network of the Kuru dynasty. Tap circles to isolate bloodlines."

  return (
    <VedicAppTemplate
      title="Lineage Map"
      subtitle="Mahabharata • Kuru Dynasty"
      icon="🔗"
      footerNote={footerNote}
    >
      <div className="relative w-full h-[400px] bg-stone-50/50 dark:bg-stone-900/40 rounded-[2rem] border border-stone-200 dark:border-stone-800 overflow-hidden shadow-inner custom-scrollbar overflow-x-auto">
        <svg width="1000" height="500" className="min-w-[1000px] select-none">
          {/* Draw Links */}
          {LINKS.map((link, i) => {
            const source = CHARACTERS.find(c => c.id === link.source)
            const target = CHARACTERS.find(c => c.id === link.target)
            if (!source || !target) return null

            const isHighlighted = selectedNode === source.id || selectedNode === target.id

            return (
              <g key={i} className={`transition-all duration-500 ${selectedNode && !isHighlighted ? 'opacity-5' : 'opacity-100'}`}>
                <line
                  x1={source.x} y1={source.y}
                  x2={target.x} y2={target.y}
                  stroke={isHighlighted ? '#f97316' : '#d6d3d1'}
                  strokeWidth={isHighlighted ? 2 : 1}
                  strokeDasharray={isHighlighted ? '0' : '4 4'}
                  className="transition-all duration-500"
                />
                {isHighlighted && (
                  <text
                    x={(source.x + target.x) / 2}
                    y={(source.y + target.y) / 2 - 8}
                    fill="#f97316"
                    fontSize="9"
                    textAnchor="middle"
                    className="font-black uppercase tracking-widest text-[8px]"
                  >
                    {link.label}
                  </text>
                )}
              </g>
            )
          })}

          {/* Draw Nodes */}
          {CHARACTERS.map((char) => {
            const isSelected = selectedNode === char.id
            const isFaded = selectedNode && !isSelected && !LINKS.some(l =>
              (l.source === selectedNode && l.target === char.id) ||
              (l.target === selectedNode && l.source === char.id)
            )

            return (
              <g
                key={char.id}
                transform={`translate(${char.x}, ${char.y})`}
                onClick={() => setSelectedNode(isSelected ? null : char.id)}
                className={`cursor-pointer transition-all duration-500 ${isFaded ? 'opacity-10 scale-90' : 'opacity-100'}`}
                data-testid={`node-${char.id}`}
              >
                <circle
                  r={isSelected ? 14 : 10}
                  className={`${getFactionColor(char.faction)} transition-all duration-500 ${isSelected ? 'stroke-[4px]' : 'stroke-2'} stroke-white dark:stroke-stone-900 shadow-xl`}
                />
                <text
                  y={isSelected ? 32 : 28}
                  fill="currentColor"
                  fontSize={isSelected ? '11' : '9'}
                  textAnchor="middle"
                  className={`font-black uppercase tracking-tight transition-all duration-500 ${isSelected ? 'text-orange-600 dark:text-orange-400' : 'text-stone-500 dark:text-stone-400'}`}
                >
                  {char.name}
                </text>
              </g>
            )
          })}
        </svg>
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-3">
        {[
          { color: 'bg-orange-500', name: 'Kuru' },
          { color: 'bg-red-500', name: 'Kaurava' },
          { color: 'bg-blue-500', name: 'Pandava' },
          { color: 'bg-yellow-400', name: 'Divine' },
          { color: 'bg-purple-500', name: 'Sage' }
        ].map(f => (
          <div key={f.name} className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-stone-900/40 rounded-full border border-stone-100 dark:border-stone-800 shadow-sm">
            <span className={`w-1.5 h-1.5 rounded-full ${f.color} shadow-sm shadow-${f.color}/50`}></span>
            <span className="text-[9px] font-black uppercase tracking-widest text-stone-500">{f.name}</span>
          </div>
        ))}
      </div>
    </VedicAppTemplate>
  )
}
