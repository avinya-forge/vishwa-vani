interface PrototypeBadgeProps {
  text?: string
  variant?: 'inline' | 'banner'
}

export function PrototypeBadge({ text = 'Prototype', variant = 'inline' }: PrototypeBadgeProps) {
  if (variant === 'banner') {
    return (
      <div className="mb-4 px-3 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center gap-2">
        <span className="text-amber-500 text-xs font-black uppercase tracking-widest">⚗ {text}</span>
        <span className="text-amber-600/70 text-[10px] font-medium">
          Placeholder algorithm — production implementation arriving in Phase 4.
        </span>
      </div>
    )
  }
  return (
    <span className="inline-block px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 text-[9px] font-black uppercase tracking-widest">
      ⚗ {text}
    </span>
  )
}
