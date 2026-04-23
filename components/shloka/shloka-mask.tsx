'use client'

import React, { useEffect, useRef, useState } from 'react'

import { useTheme } from 'next-themes'

/**
 * 🎨 shloka-mask: The Visual Data Protector
 * 
 * Renders the Sanskrit shloka on a Canvas to thwart DOM-crawlers 
 * while maintaining the premium, elegant typography for humans.
 * Now includes a secure 'Copy' feature for authorized analysis tools.
 */
export default function ShlokaMask({ text, className, fontSize }: { text: string, className?: string, fontSize?: number }) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const textRef = useRef<HTMLDivElement>(null)
    const [copied, setCopied] = useState(false)
    const { resolvedTheme } = useTheme()

    useEffect(() => {
        const canvas = canvasRef.current
        const textElement = textRef.current
        if (!canvas || !textElement) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const drawCanvas = () => {
            // Get actual dimensions and font size from the DOM text element
            const style = window.getComputedStyle(textElement)
            const currentFontSize = parseFloat(style.fontSize) || fontSize || 22

            const lineHeight = currentFontSize * 1.5
            const paddingX = 16
            const paddingY = 24

            ctx.font = `700 ${currentFontSize}px "Noto Serif Devanagari", serif`
            
            // Dynamic Word Wrapping logic for extremely long Shlokas
            const containerWidth = textElement.clientWidth || (typeof window !== 'undefined' ? Math.min(800, window.innerWidth - 64) : 800)
            const maxAllowedWidth = containerWidth - (paddingX * 2); // Exact match with CSS padding

            const rawLines = text.replace(/\\n/g, '\n').split('\n')
            const wrappedLines: string[] = [];

            rawLines.forEach(line => {
                const words = line.split(' ');
                let currentLine = '';

                for (let n = 0; n < words.length; n++) {
                    const testLine = currentLine + words[n] + ' ';
                    const metrics = ctx.measureText(testLine);
                    if (metrics.width > maxAllowedWidth && n > 0) {
                        wrappedLines.push(currentLine);
                        currentLine = words[n] + ' ';
                    } else {
                        currentLine = testLine;
                    }
                }
                wrappedLines.push(currentLine);
            });

            const finalLines = wrappedLines.map(l => l.trim()).filter(l => l.length > 0)

            const metricsList = finalLines.map(l => ctx.measureText(l))
            const maxWidth = Math.max(...metricsList.map(m => m.width), 100) + paddingX * 2

            const dpr = window.devicePixelRatio || 1
            canvas.width = maxWidth * dpr
            canvas.height = (finalLines.length * lineHeight + paddingY * 2) * dpr
            canvas.style.width = `${maxWidth}px`
            // Remove explicit height pixel constraint so `h-auto` can maintain aspect ratio without squishing

            ctx.scale(dpr, dpr)
            ctx.font = `700 ${currentFontSize}px "Noto Serif Devanagari", serif`
            ctx.textAlign = 'center'
            ctx.textBaseline = 'alphabetic'
            ctx.fillStyle = resolvedTheme === 'dark' ? '#f5f5f4' : '#1c1917'

            // Make sure the canvas clears before redrawing
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            finalLines.forEach((line, i) => {
                const y = paddingY + (i * lineHeight) + currentFontSize * 1.1
                ctx.fillText(line, maxWidth / 2, y)
            })
        }

        drawCanvas()

        // Handle resize to re-draw canvas when font size or width changes
        window.addEventListener('resize', drawCanvas)
        return () => window.removeEventListener('resize', drawCanvas)
    }, [text, resolvedTheme, fontSize])

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
        <div className={`group relative flex justify-center w-full ${className || ''}`}>
            {/* The invisible text element defines the dimensions to prevent layout shifts. */}
            <div
                ref={textRef}
                aria-hidden="true"
                className="w-full text-center whitespace-pre-wrap font-bold text-[16px] sm:text-[22px]"
                style={{
                    fontFamily: '"Noto Serif Devanagari", serif',
                    lineHeight: '1.5',
                    padding: '24px 16px', // Matches paddingY and paddingX
                    opacity: 0, // Make it invisible but take space
                    pointerEvents: 'none',
                    userSelect: 'none',
                    fontSize: fontSize ? `${fontSize}px` : undefined, // Override if explicit fontSize passed
                }}
            >
                {text.replace(/\\n/g, '\n')}
            </div>

            <canvas
                ref={canvasRef}
                className="absolute top-0 max-w-full h-auto cursor-default pointer-events-none select-none left-1/2 -translate-x-1/2"
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