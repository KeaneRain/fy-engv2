# Text Transitions Design

**Date:** 2026-05-30

## Overview

Add three distinct text reveal animations across all sections of the site. Headings use a typewriter effect, section labels use a word slide-up reveal, and body text uses a dramatic line stagger. All animations trigger on scroll into view using Framer Motion's `useInView`.

## Animation Types

### TypewriterText — for all headings (h1, h2, h3)

Characters appear one by one left-to-right using Framer Motion staggered `opacity: 0 → 1` with `duration: 0` per character (instant snap, not fade). Multi-line headings delay the second line until the first is mostly complete. Each character has a 40ms stagger delay. Triggers once when the element enters the viewport.

### WordSlide — for section labels (small mono uppercase text)

Each word is wrapped in an `overflow: hidden` span. The inner word element animates `translateY(110%) → translateY(0)` with a spring-like easing (`cubic-bezier(0.16, 1, 0.3, 1)`). Words stagger 80ms apart. Triggers once on scroll into view.

### LineReveal — for body text, subtitles, stats, buttons

Existing fade+slide pattern but more dramatic: `opacity: 0, y: 32 → opacity: 1, y: 0` with 0.6s duration, `easeOut` easing. Container uses `staggerChildren: 0.14s`. Replaces the current `initial/animate` props on existing `motion.div` elements.

## New File

**`src/components/ui/TextReveal.tsx`**

Three named exports:
- `TypewriterText` — props: `children: string`, `className?: string`, `delay?: number`
- `WordSlide` — props: `children: string`, `className?: string`, `delay?: number`
- `LineReveal` — props: `children: ReactNode`, `className?: string`, `delay?: number`

All three accept an optional `inView` prop override; if not provided, they use their own internal `useInView` ref.

## Section Changes

| Section | Element | Transition |
|---|---|---|
| `Hero` | "Engineering Consultancy" label | `WordSlide` |
| `Hero` | h1 (Engineering Solutions / Built on / Precision.) | `TypewriterText` per line |
| `Hero` | "Precision · Passion · Progress" | `LineReveal` |
| `Hero` | Buttons | `LineReveal` |
| `Services` | "What We Do" label | `WordSlide` |
| `Services` | "Our Services" h2 | `TypewriterText` |
| `Services` | Service cards | `LineReveal` (existing stagger kept, timing updated) |
| `Projects` | "Featured Projects" label | `WordSlide` |
| `Projects` | "Building the Future" h2 | `TypewriterText` |
| `Projects` | Project cards | `LineReveal` |
| `About` | "About Us" label | `WordSlide` |
| `About` | "Precision. Passion. Progress." h2 | `TypewriterText` per line |
| `About` | Body paragraph | `LineReveal` |
| `About` | Stats | `LineReveal` (existing stagger kept, timing updated) |
| `Contact` | "Let's Build Something Great Together." h3 | `TypewriterText` |
| `Contact` | Contact info lines | `LineReveal` |
| `Contact` | Form | `LineReveal` (existing) |

## Out of Scope

- Nav links (fixed header, always visible — no scroll trigger needed)
- Footer copyright line
- Form input placeholders
- Any animation on the canvas/SVG layer
