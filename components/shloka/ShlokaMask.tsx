'use client'

import React, { useEffect, useRef } from 'react'

/**
 * 🎨 ShlokaMask: The Visual Data Protector
 * 
 * Renders the Sanskrit shloka on a Canvas to thwart DOM-crawlers 
 * while maintaining the premium, elegant typography for humans.
 */
export default function ShlokaMask({ text, className }: { text: string, className?: string }) {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        // Set dimensions based on parent/font
        const fontSize = 56
        const padding = 20
        const lines = text.split('\n')
        
        // Measure text for auto-sizing
        ctx.font = `black ${fontSize}px serif`
        const maxWidth = Math.max(...lines.map(l => ctx.measureText(l).width)) + padding * 2
        
        const dpr = window.devicePixelRatio || 1
        canvas.width = maxWidth * dpr
        canvas.height = (lines.length * fontSize * 1.8 + padding * 2) * dpr
        canvas.style.width = `${maxWidth}px`
        // canvas.style.height set by flex/aspect-ratio
        
        ctx.scale(dpr, dpr)
        ctx.font = `black ${fontSize}px "Noto Serif Devanagari", serif`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillStyle = '#1c1917' // charcoal-900

        lines.forEach((line, i) => {
            ctx.fillText(line, maxWidth / 2, padding + i * fontSize * 1.6 + fontSize / 2)
        })
    }, [text])

    return (
        <div className={`overflow-hidden flex justify-center ${className}`}>
            <canvas 
                ref={canvasRef} 
                className="max-w-full h-auto cursor-default pointer-events-none select-none"
                style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.05))' }}
            />
            {/* SEO-only invisible text */}
            <span className="sr-only select-none">{text}</span>
        </div>
    )
}
