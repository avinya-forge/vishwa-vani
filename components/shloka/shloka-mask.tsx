'use client'

import React, { useEffect, useRef, useState } from 'react'

/**
 * 🎨 shloka-mask: The Visual Data Protector
 * 
 * Renders the Sanskrit shloka on a Canvas to thwart DOM-crawlers 
 * while maintaining the premium, elegant typography for humans.
 * Now includes a secure 'Copy' feature for authorized analysis tools.
 */
export default function ShlokaMask({ text, className, fontSize = 28 }: { text: string, className?: string, fontSize?: number }) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [copied, setCopied] = useState(false)

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
            const y = paddingY + (i * lineHeight) + currentFontSize * 1.1
            ctx.fillText(line, maxWidth / 2, y)
        })
    }, [text, fontSize])

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(text)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error('Failed to copy shloka:', err)
        }
    }

    return (
        <div className={`group relative overflow-hidden flex justify-center ${className}`}>
            <canvas 
                ref={canvasRef} 
                className="max-w-full h-auto cursor-default pointer-events-none select-none"
                style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.05))' }}
            />
            
            {/* 📋 Secure Copy Button - Only for humans, visible on hover */}
            <button 
                onClick={handleCopy}
                title="Copy Shloka for analysis"
                className="absolute right-4 top-4 p-2 bg-stone-100/50 hover:bg-orange-500 hover:text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm border border-stone-200/50 hover:border-orange-600 shadow-sm"
            >
                {copied ? (
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                ) : (
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                        <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                    </svg>
                )}
            </button>

            {/* SEO-only invisible text */}
            <span className="sr-only select-none">{text}</span>
        </div>
    )
}
