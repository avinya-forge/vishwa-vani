# 🎨 Vishwa-Vani Master Design System Specification

## 1. Core Visual Taste & Anti-AI-Slop Principles
- **No Generic AI Gradients**: Avoid overused violet-to-pink or cyan-to-purple background gradients. Use warm stone/amber tones reflecting authentic Vedic aesthetics.
- **60-30-10 Color Scheme**:
  - **60% Base Surface**: Deep stone black (`bg-stone-950` / `bg-stone-900`) in dark mode; soft ivory/warm slate in light mode.
  - **30% Structural Tone**: Subdued borders (`border-amber-900/30`, `border-stone-800`), dark elevated cards (`bg-stone-900/60`, `bg-stone-800/40`).
  - **10% Intentional Accent**: Warm gold/amber (`text-amber-400`, `bg-amber-500`, `amber-600`) for call-to-action focus.

## 2. Fluid Typography & Hierarchy
- **Clamp Headline Scaling**: Headline typography uses CSS clamp constructs for zero-CLS fluid scaling:
  `font-size: clamp(1.875rem, 4vw + 1rem, 3.5rem)`
- **Optical Alignment & Balance**: Ensure text wrap balance (`text-wrap: balance`) on headers and optical alignment for badges and icons.

## 3. Spatial Discipline & Layout Structure
- **Tokenized Spacing Scale**: Enforce 4px, 8px, 16px, 24px, 32px, 48px, 64px rhythm.
- **Asymmetrical Bento Grid**: Break repetitive 3-column grids by introducing variable span cards (e.g., 2-col focal feature card with 1-col side widgets).

## 4. Micro-Interactions & Easing
- **Cubic-Bezier Easing**: Use smooth cubic-bezier transitions for all interactive cards and buttons:
  `transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1)`
- **Interactive Feedback**: Hover state elevation shifts (`-translate-y-0.5`, `border-amber-500/40`), subtle glow effects, and explicit `cursor-pointer`.
