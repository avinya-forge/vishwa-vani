'use client'

import React, { useEffect, useRef } from 'react'

/**
 * 🎨 shloka-mask: The Visual Data Protector
 * 
 * Renders the Sanskrit shloka on a Canvas to thwart DOM-crawlers 
 * while maintaining the premium, elegant typography for humans.
 */
export default function ShlokaMask({ text, className, fontSize = 28 }: { text: string, className?: string, fontSize?: number }) {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        // Set dimensions based on parent/font
        const currentFontSize = fontSize
        const lineHeight = currentFontSize * 1.5
        const paddingX = 12
        const paddingY = 16
        const lines = text.split('\n')
        
        ctx.font = `700 ${currentFontSize}px "Noto Serif Devanagari", serif`
        const metrics = lines.map(l => ctx.measureText(l))
        const maxWidth = Math.max(...metrics.map(m => m.width)) + paddingX * 2
        
        const dpr = window.devicePixelRatio || 1
        canvas.width = maxWidth * dpr
        canvas.height = (lines.length * lineHeight + paddingY * 2) * dpr
        canvas.style.width = `${maxWidth}px`
        
        ctx.scale(dpr, dpr)
        ctx.font = `700 ${currentFontSize}px "Noto Serif Devanagari", serif`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'alphabetic'
        ctx.fillStyle = '#1c1917' 
        
        lines.forEach((line, i) => {
            // Adjusting Y-coordinate to give more headroom for top-matras
            const y = paddingY + (i * lineHeight) + currentFontSize * 1.1
            ctx.fillText(line, maxWidth / 2, y)
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
