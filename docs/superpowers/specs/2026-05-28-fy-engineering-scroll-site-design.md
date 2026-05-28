# Fy Engineering Consultancy — Cinematic Scroll Website Design

**Date:** 2026-05-28  
**Status:** Approved  
**Company:** Fy Engineering Consultancy — Davao City, Philippines

---

## Overview

Single-page marketing website for Fy Engineering Consultancy. Core mechanic: blueprint-style city skyline drawn in real time as user scrolls. Buildings self-sketch via SVG `stroke-dashoffset` animation driven by GSAP ScrollTrigger. Right panel shows scroll progress tracker with 4 milestone nodes. Full city completes at bottom of page.

---

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | React + Vite |
| Scroll normalization | Lenis |
| Scroll animation | GSAP + ScrollTrigger |
| UI transitions | Framer Motion |
| Styling | Tailwind CSS |
| Language | TypeScript |
| Deploy target | Netlify / GitHub Pages |

---

## Page Sections

1. **Hero** — "Engineering Solutions Built on Precision" headline, "Precision · Passion · Progress" tagline, GET A QUOTE + VIEW PROJECTS CTAs
2. **Services** — "Our Services" / "What We Do" — 3 cards: Engineering Construction, Project Management, Design Services
3. **Projects** — "Building the Future" — 4 project cards: Modern Residence, Commercial Building, Industrial Facility, High-Rise Development + VIEW ALL PROJECTS button
4. **About** — "Precision. Passion. Progress." — stats: 10+ Years Experience, 100+ Projects Completed, 99% Client Satisfaction
5. **Contact / Footer** — "Let's Build Something Great Together" — static contact form (Name, Email, Phone, Message, SEND MESSAGE) + contact info (phone, email, address) + social links

---

## Component Architecture

```
/src
  main.tsx              ← React entry point
  App.tsx               ← section composition + Lenis init

/src/components
  SkylineCanvas.tsx     ← sticky SVG panel, owns all 8 building paths + scroll orchestration
  BuildingPath.tsx      ← single building SVG path, receives scroll progress + draw range
  ScrollProgress.tsx    ← right-panel vertical tracker: 5 nodes, active state, mini thumbnails
  SmoothScroll.tsx      ← Lenis context provider

  sections/
    Hero.tsx
    Services.tsx
    Projects.tsx
    About.tsx
    Contact.tsx

  ui/
    Nav.tsx             ← fixed top nav: logo, links, GET A QUOTE button
    Button.tsx
    ServiceCard.tsx     ← blueprint corner-bracket aesthetic
    ProjectCard.tsx     ← photo + label + category
```

---

## Scroll Animation System

### Mechanism

1. Lenis smooths native scroll, emits normalized `scrollY`
2. GSAP ScrollTrigger scrubs on Lenis tick (via `ScrollTrigger.update()` in Lenis RAF)
3. Each `BuildingPath` registers its own ScrollTrigger with `scrub: true`
4. On scrub: `strokeDashoffset` interpolates `totalLength → 0` (path draws itself)
5. `ScrollProgress` listens to global scroll progress `0–1`, activates nodes at intervals

### Building Draw Sequence

| Scroll % | Buildings | Style |
|----------|-----------|-------|
| 0–10% | Ground plane + horizon line | Single horizontal path |
| 10–30% | Buildings 1–2 | Low-rise, 3–5 floors, simple rectangular |
| 30–50% | Buildings 3–4 | Mid-rise, 8–12 floors, recessed windows |
| 50–70% | Buildings 5–6 | High-rise, 20+ floors + construction crane |
| 70–90% | Buildings 7–8 | Skyscrapers, tapered tops, antenna detail |
| 90–100% | Dimension annotations + grid fade | Dashed measurement lines appear, full city revealed |

### SVG Architecture

- All buildings in single `<svg viewBox="0 0 800 600">` inside `SkylineCanvas`
- Each building = `<g>` containing multiple `<path>` elements (outlines + window grids)
- On mount: measure each path `getTotalLength()`, set `strokeDasharray = strokeDashoffset = length`
- GSAP `gsap.to(path, { strokeDashoffset: 0, scrollTrigger: { ... scrub: true } })`
- Buildings are pure code-generated SVG paths (no external image assets)

---

## Visual Design System

### Color Palette

| Token | Value | Use |
|-------|-------|-----|
| `navy-950` | `#0a1628` | Page background |
| `blueprint-600` | `#2563eb` | Primary SVG strokes, links |
| `blueprint-300` | `#93c5fd` | Highlight strokes, active states |
| `gold-500` | `#f0a500` | Logo accent, CTA hover, progress nodes active |
| `white` | `#ffffff` | Primary text |
| `slate-400` | `#94a3b8` | Secondary text |
| `navy-800` | `#1e3a5f` | Card backgrounds |

### Typography

| Role | Font | Weight |
|------|------|--------|
| Impact headings | `Barlow Condensed` | 700 |
| Body / UI | `Inter` | 400 / 600 |
| Blueprint annotations | `JetBrains Mono` | 400 |

### Blueprint Aesthetic Details

- Faint crosshatch grid: CSS `background-image` linear-gradient pattern on `navy-950` bg
- SVG stroke style: `stroke-linecap="round"` `stroke-linejoin="round"` `fill="none"`
- Construction crane SVG on Building 6 (high-rise stage)
- Dimension annotation lines: thin dashed `<line>` elements with `<text>` measurements, appear at 90%+ scroll
- Service/Project cards: CSS corner brackets (`::before`/`::after` pseudo-elements, blueprint blue)
- Nav: semi-transparent `backdrop-blur` over dark navy

### Mobile Behavior

- `SkylineCanvas` de-stickies → full-width hero banner, height `40vh`, at top of page
- `ScrollProgress` right panel hidden on `< md`
- Buildings still animate on scroll, compressed to single column layout
- Breakpoint: `768px`

---

## Data / Content

All content is static (no CMS, no API).

### Services
```
Engineering Construction — "We deliver high-quality construction solutions tailored to your project needs."
Project Management — "Expert management, scheduling, and supervision to ensure project success."
Design Services — "Innovative and functional designs that bring your vision to life."
```

### Projects
```
Modern Residence — Residential
Commercial Building — Commercial
Industrial Facility — Industrial
High-Rise Development — Mixed Use
```

### Contact Info
```
Phone: +63 962 894 8608
Email: fyenggcons@gmail.com
Address: Davao City, Philippines
```

### Stats
```
10+ Years Experience
100+ Projects Completed
99% Client Satisfaction
```

---

## SEO

- `<title>` + `<meta description>` in `index.html`
- Semantic HTML: `<header>`, `<main>`, `<section>` with `aria-label`, `<footer>`
- `alt` text on all images
- Blueprint SVG has `aria-hidden="true"` (decorative)

---

## Performance Constraints

- GSAP `ScrollTrigger.refresh()` called after Lenis init + on window resize
- `will-change: transform` on sticky skyline container
- SVG `BuildingPath` components use `React.memo` — no re-render on parent scroll state
- Lenis + GSAP RAF unified: `lenis.on('scroll', ScrollTrigger.update)`
- No external image assets (all SVG code-generated) → zero image load overhead

---

## Out of Scope

- CMS / editable content
- Real contact form backend (email delivery)
- Authentication
- Blog / news section
- Multi-language support
