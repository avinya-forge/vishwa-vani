'use client'

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
      case 'Kaurava': return 'fill-red-500 stroke-red-700'
      case 'Pandava': return 'fill-blue-500 stroke-blue-700'
      case 'Kuru': return 'fill-orange-500 stroke-orange-700'
      case 'Divine': return 'fill-yellow-400 stroke-yellow-600'
      case 'Sage': return 'fill-purple-500 stroke-purple-700'
      default: return 'fill-stone-500 stroke-stone-700'
    }
  }

  return (
    <VedicAppTemplate
      title="Character Map"
      subtitle="Mahabharata Lineage"
      icon="🔗"
      darkMode={true}
      footerNote="Interactive family tree and relationship network of the Kuru dynasty."
    >
      <div className="relative w-full h-[500px] bg-stone-900 rounded-2xl border border-stone-800 overflow-hidden shadow-inner custom-scrollbar overflow-x-auto">
        <svg width="1000" height="500" className="min-w-[1000px]">
          {/* Draw Links */}
          {LINKS.map((link, i) => {
            const source = CHARACTERS.find(c => c.id === link.source)
            const target = CHARACTERS.find(c => c.id === link.target)
            if (!source || !target) return null

            const isHighlighted = selectedNode === source.id || selectedNode === target.id

            return (
              <g key={i} className={`transition-opacity duration-300 ${selectedNode && !isHighlighted ? 'opacity-20' : 'opacity-100'}`}>
                <line
                  x1={source.x} y1={source.y}
                  x2={target.x} y2={target.y}
                  stroke={isHighlighted ? '#f97316' : '#57534e'}
                  strokeWidth={isHighlighted ? 2 : 1}
                />
                <text
                  x={(source.x + target.x) / 2}
                  y={(source.y + target.y) / 2 - 5}
                  fill={isHighlighted ? '#f97316' : '#78716c'}
                  fontSize="10"
                  textAnchor="middle"
                  className="font-medium"
                >
                  {link.label}
                </text>
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
                className={`cursor-pointer transition-all duration-300 ${isFaded ? 'opacity-20' : 'opacity-100'}`}
                data-testid={`node-${char.id}`}
              >
                <circle
                  r={isSelected ? 20 : 15}
                  className={`${getFactionColor(char.faction)} transition-all duration-300 ${isSelected ? 'stroke-[3px]' : 'stroke-2'}`}
                />
                <text
                  y={30}
                  fill={isSelected ? '#fff' : '#d6d3d1'}
                  fontSize={isSelected ? '14' : '12'}
                  textAnchor="middle"
                  className="font-bold drop-shadow-md"
                >
                  {char.name}
                </text>
              </g>
            )
          })}
        </svg>
      </div>

      <div className="mt-4 flex flex-wrap justify-center gap-4 text-xs font-medium">
        <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-orange-500"></span> Kuru</div>
        <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-red-500"></span> Kaurava</div>
        <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-blue-500"></span> Pandava</div>
        <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-yellow-400"></span> Divine</div>
        <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-purple-500"></span> Sage</div>
      </div>
    </VedicAppTemplate>
  )
}
