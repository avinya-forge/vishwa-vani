'use client'

import React, { useEffect, useRef } from 'react'

export default function CosmicCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = canvas.width = window.innerWidth
    let height = canvas.height = window.innerHeight

    const particles: { x: number, y: number, r: number, dx: number, dy: number, opacity: number }[] = []
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 2 + 0.5,
        dx: (Math.random() - 0.5) * 0.5,
        dy: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.1
      })
    }

    let mouse = { x: -1000, y: -1000 }
    
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    window.addEventListener('mousemove', handleMouseMove)

    const handleResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    let animationFrameId: number

    const render = () => {
      ctx.clearRect(0, 0, width, height)
      
      particles.forEach(p => {
        p.x += p.dx
        p.y += p.dy

        if (p.x < 0 || p.x > width) p.dx *= -1
        if (p.y < 0 || p.y > height) p.dy *= -1

        // Mouse interaction
        const dx = mouse.x - p.x
        const dy = mouse.y - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        
        let extraR = 0
        let targetOpacity = p.opacity
        
        if (dist < 150) {
          extraR = (150 - dist) / 50
          targetOpacity = 0.8
          p.x -= dx * 0.02
          p.y -= dy * 0.02
        }

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r + extraR, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(234, 88, 12, ${targetOpacity})` // orange-600
        ctx.fill()
      })

      animationFrameId = requestAnimationFrame(render)
    }
    render()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-0 opacity-40 dark:opacity-60"
    />
  )
}
