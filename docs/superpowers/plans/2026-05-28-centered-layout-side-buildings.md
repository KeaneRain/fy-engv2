# Centered Layout with Side Buildings Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restructure the page so content is centered, buildings are visible on both sides via a radial vignette, buildings zoom in as you scroll, and each building traces in a different direction.

**Architecture:** SkylineCanvas becomes a fixed full-viewport background. A radial gradient overlay clears the center so buildings show only at the edges. A GSAP scroll-scrub scale tween (1.0 → 1.2) on the canvas wrapper creates the zoom-in. Per-building `drawDirection` in the data controls which end of the path the stroke traces from.

**Tech Stack:** React, TypeScript, Tailwind CSS, GSAP + ScrollTrigger, Framer Motion (existing), Vitest

---

## File Map

| File | Change |
|---|---|
| `src/lib/buildings.ts` | Add `drawDirection: 'forward' \| 'reverse'` to `BuildingData` interface and all 9 BUILDINGS entries |
| `src/lib/__tests__/buildings.test.ts` | Add tests verifying `drawDirection` field on all entries |
| `src/components/SkylineCanvas.tsx` | Use `building.drawDirection` to sign initial `strokeDashoffset` |
| `src/App.tsx` | Remove split layout; add fixed canvas wrapper with scroll-scale; add radial overlay; center `<main>` |
| `src/components/sections/Hero.tsx` | Center text + buttons, widen inner div |
| `src/components/sections/Services.tsx` | Add `max-w-3xl mx-auto` wrapper |
| `src/components/sections/Projects.tsx` | Add `max-w-3xl mx-auto` wrapper |
| `src/components/sections/About.tsx` | Add `max-w-3xl mx-auto` wrapper |
| `src/components/sections/Contact.tsx` | Add `max-w-3xl mx-auto` wrapper |

---

## Task 1: Add `drawDirection` to buildings data

**Files:**
- Modify: `src/lib/buildings.ts`
- Modify: `src/lib/__tests__/buildings.test.ts`

- [ ] **Step 1: Write failing tests**

Open `src/lib/__tests__/buildings.test.ts` and add inside the existing `describe('BUILDINGS', ...)` block:

```ts
it('all entries have a drawDirection of forward or reverse', () => {
  BUILDINGS.forEach(b => {
    expect(['forward', 'reverse']).toContain(b.drawDirection)
  })
})
it('directions alternate across buildings for visual variety', () => {
  // Skip ground line (index 0), check buildings alternate
  const dirs = BUILDINGS.slice(1).map(b => b.drawDirection)
  const hasForward = dirs.includes('forward')
  const hasReverse = dirs.includes('reverse')
  expect(hasForward).toBe(true)
  expect(hasReverse).toBe(true)
})
```

- [ ] **Step 2: Run tests to confirm they fail**

```bash
npx vitest run src/lib/__tests__/buildings.test.ts
```

Expected: FAIL — `TypeError: Cannot read properties` or `expected [...] to contain 'forward'`

- [ ] **Step 3: Add `drawDirection` to the `BuildingData` interface**

In `src/lib/buildings.ts`, change the `BuildingData` interface:

```ts
export interface BuildingData {
  id: string
  path: string
  drawRange: [number, number]
  strokeColor: string
  strokeWidth: number
  drawDirection: 'forward' | 'reverse'
}
```

- [ ] **Step 4: Add `drawDirection` to each BUILDINGS entry**

Replace the `BUILDINGS` array in `src/lib/buildings.ts` with the following (all other fields unchanged — only `drawDirection` is added):

```ts
export const BUILDINGS: BuildingData[] = [
  {
    id: 'ground',
    path: 'M 0,580 L 800,580',
    drawRange: [0, 0.07],
    strokeColor: '#2563eb',
    strokeWidth: 1.5,
    drawDirection: 'forward',
  },
  {
    id: 'b1',
    path: generateBuildingPath({ x: 20, width: 58, groundY: 580, height: 88, floors: 3, windowCols: 2, variant: 'simple' }),
    drawRange: [0.07, 0.22],
    strokeColor: '#2563eb',
    strokeWidth: 1.5,
    drawDirection: 'forward',
  },
  {
    id: 'b2',
    path: generateBuildingPath({ x: 92, width: 62, groundY: 580, height: 122, floors: 4, windowCols: 2, variant: 'parapet' }),
    drawRange: [0.14, 0.30],
    strokeColor: '#93c5fd',
    strokeWidth: 1.5,
    drawDirection: 'reverse',
  },
  {
    id: 'b3',
    path: generateBuildingPath({ x: 168, width: 72, groundY: 580, height: 178, floors: 6, windowCols: 3, variant: 'simple' }),
    drawRange: [0.27, 0.43],
    strokeColor: '#2563eb',
    strokeWidth: 1.5,
    drawDirection: 'forward',
  },
  {
    id: 'b4',
    path: generateBuildingPath({ x: 254, width: 68, groundY: 580, height: 218, floors: 7, windowCols: 2, variant: 'parapet' }),
    drawRange: [0.36, 0.52],
    strokeColor: '#93c5fd',
    strokeWidth: 1.5,
    drawDirection: 'reverse',
  },
  {
    id: 'b5',
    path: generateBuildingPath({ x: 336, width: 82, groundY: 580, height: 292, floors: 10, windowCols: 3, variant: 'simple' }),
    drawRange: [0.48, 0.63],
    strokeColor: '#2563eb',
    strokeWidth: 1.5,
    drawDirection: 'forward',
  },
  {
    id: 'b6',
    path: generateBuildingPath({ x: 432, width: 86, groundY: 580, height: 318, floors: 11, windowCols: 3, variant: 'parapet' })
      + ` M ${432 + 43},${580 - 318} L ${432 + 43},${580 - 318 - 58}`
      + ` M ${432 + 43},${580 - 318 - 58} L ${432 + 43 + 43},${580 - 318 - 58}`
      + ` M ${432 + 43 + 43},${580 - 318 - 58} L ${432 + 43 + 43},${580 - 318 - 44}`
      + ` M ${432 + 43},${580 - 318 - 50} L ${432 + 43 - 16},${580 - 318 - 40}`,
    drawRange: [0.55, 0.71],
    strokeColor: '#93c5fd',
    strokeWidth: 1.5,
    drawDirection: 'reverse',
  },
  {
    id: 'b7',
    path: generateBuildingPath({ x: 534, width: 74, groundY: 580, height: 392, floors: 14, windowCols: 3, variant: 'tapered' }),
    drawRange: [0.68, 0.83],
    strokeColor: '#2563eb',
    strokeWidth: 1.5,
    drawDirection: 'forward',
  },
  {
    id: 'b8',
    path: generateBuildingPath({ x: 622, width: 102, groundY: 580, height: 458, floors: 16, windowCols: 4, variant: 'tapered' })
      + ` M ${622 + 51},${580 - 458} L ${622 + 51},${580 - 458 - 46}`,
    drawRange: [0.75, 0.92],
    strokeColor: '#93c5fd',
    strokeWidth: 1.5,
    drawDirection: 'reverse',
  },
]
```

- [ ] **Step 5: Run all tests and confirm they pass**

```bash
npx vitest run src/lib/__tests__/buildings.test.ts
```

Expected: all tests PASS (including existing ones — the interface change is additive)

- [ ] **Step 6: Commit**

```bash
git add src/lib/buildings.ts src/lib/__tests__/buildings.test.ts
git commit -m "feat: add drawDirection field to BuildingData for directional sketch animation"
```

---

## Task 2: Use `drawDirection` in SkylineCanvas

**Files:**
- Modify: `src/components/SkylineCanvas.tsx:38-44`

There are no unit tests for the canvas component (it requires a browser DOM + GSAP). Verify visually after Task 3 is complete.

- [ ] **Step 1: Update the initial strokeDashoffset setup**

In `src/components/SkylineCanvas.tsx`, find the `BUILDINGS.forEach` block inside `useEffect` (lines 35–45) and change the `gsap.set` call:

Current:
```ts
BUILDINGS.forEach(building => {
  const path = buildingRefs.current.get(building.id)
  if (!path) return
  const length = path.getTotalLength()
  gsap.set(path, { strokeDasharray: length, strokeDashoffset: length })
  tl.to(
    path,
    { strokeDashoffset: 0, ease: 'none', duration: building.drawRange[1] - building.drawRange[0] },
    building.drawRange[0],
  )
})
```

New:
```ts
BUILDINGS.forEach(building => {
  const path = buildingRefs.current.get(building.id)
  if (!path) return
  const length = path.getTotalLength()
  const initialOffset = building.drawDirection === 'reverse' ? -length : length
  gsap.set(path, { strokeDasharray: length, strokeDashoffset: initialOffset })
  tl.to(
    path,
    { strokeDashoffset: 0, ease: 'none', duration: building.drawRange[1] - building.drawRange[0] },
    building.drawRange[0],
  )
})
```

- [ ] **Step 2: Commit**

```bash
git add src/components/SkylineCanvas.tsx
git commit -m "feat: use drawDirection to vary sketch trace direction per building"
```

---

## Task 3: Restructure App.tsx — fixed canvas + scroll zoom + centered layout

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Replace App.tsx with the new layout**

Replace the entire contents of `src/App.tsx` with:

```tsx
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SmoothScroll } from './components/SmoothScroll'
import { SkylineCanvas } from './components/SkylineCanvas'
import { Nav } from './components/ui/Nav'
import { Hero } from './components/sections/Hero'
import { Services } from './components/sections/Services'
import { Projects } from './components/sections/Projects'
import { About } from './components/sections/About'
import { Contact } from './components/sections/Contact'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const canvasWrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = canvasWrapperRef.current
    if (!el) return

    const tween = gsap.to(el, {
      scale: 1.2,
      ease: 'none',
      scrollTrigger: {
        start: 0,
        end: 'max',
        scrub: 0.8,
      },
    })

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [])

  return (
    <SmoothScroll>
      <div className="bg-navy-950 min-h-screen">
        {/* Fixed skyline canvas — full viewport background */}
        <div
          ref={canvasWrapperRef}
          className="fixed inset-0 z-0 pointer-events-none"
          style={{ transformOrigin: 'center bottom' }}
        >
          <SkylineCanvas />
        </div>

        {/* Radial vignette — clears center, reveals buildings at edges */}
        <div
          className="fixed inset-0 z-[1] pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 55% 100% at 50% 80%, #0a1628 35%, transparent 100%)',
          }}
        />

        {/* Nav sits above canvas and content */}
        <Nav />

        {/* Centered content column */}
        <main className="relative z-10 w-full">
          <Hero />
          <Services />
          <Projects />
          <About />
          <Contact />
        </main>
      </div>
    </SmoothScroll>
  )
}
```

- [ ] **Step 2: Run the dev server and check the page loads without errors**

```bash
npm run dev
```

Open `http://localhost:5173` in a browser. Confirm:
- No console errors
- Buildings visible on left and right edges, dark center
- Content visible (may not be centered yet — that's Tasks 4–5)
- Scrolling causes buildings to gradually scale up

- [ ] **Step 3: Commit**

```bash
git add src/App.tsx
git commit -m "feat: fixed canvas background with radial vignette and scroll-zoom"
```

---

## Task 4: Center Hero section content

**Files:**
- Modify: `src/components/sections/Hero.tsx`

- [ ] **Step 1: Update Hero inner layout**

Replace the entire contents of `src/components/sections/Hero.tsx` with:

```tsx
import { motion } from 'framer-motion'
import { Button } from '../ui/Button'

export function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center pt-20 pb-12 px-8 md:px-12">
      <div className="max-w-2xl mx-auto w-full text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-blueprint-300 font-mono text-xs tracking-widest uppercase mb-5"
        >
          Engineering Consultancy
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-6xl md:text-7xl font-heading text-white leading-none uppercase mb-5"
        >
          Engineering<br />
          Solutions<br />
          <span className="text-blueprint-600">Built on</span><br />
          Precision.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="text-slate-400 font-body text-sm mb-8 tracking-wide"
        >
          Precision &bull; Passion &bull; Progress
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.1 }}
          className="flex gap-4 flex-wrap justify-center"
        >
          <Button href="#contact">Get a Quote</Button>
          <Button href="#projects" variant="outline">View Projects</Button>
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Check in browser**

With the dev server still running at `http://localhost:5173`, confirm:
- Hero text is centered horizontally
- Buttons are centered
- Text is readable over the dark vignette

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/Hero.tsx
git commit -m "feat: center Hero section content"
```

---

## Task 5: Center Services, Projects, and About sections

**Files:**
- Modify: `src/components/sections/Services.tsx`
- Modify: `src/components/sections/Projects.tsx`
- Modify: `src/components/sections/About.tsx`

- [ ] **Step 1: Wrap Services inner content**

In `src/components/sections/Services.tsx`, wrap the section body in a centering div. Replace the `<section>` tag and its direct children:

```tsx
export function Services() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="services" className="py-20 px-8 md:px-12" ref={ref}>
      <div className="max-w-3xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4 }}
          className="text-blueprint-300 font-mono text-xs tracking-widest uppercase mb-2"
        >
          What We Do
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl font-heading text-white uppercase mb-10"
        >
          Our Services
          <span className="block w-10 h-0.5 bg-gold-500 mt-2" />
        </motion.h2>

        <div className="grid grid-cols-1 gap-5">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.12 }}
            >
              <ServiceCard {...service} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Wrap Projects inner content**

In `src/components/sections/Projects.tsx`, wrap the section body:

```tsx
export function Projects() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="projects" className="py-20 px-8 md:px-12" ref={ref}>
      <div className="max-w-3xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          className="text-blueprint-300 font-mono text-xs tracking-widest uppercase mb-2"
        >
          Featured Projects
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="text-4xl font-heading text-white uppercase mb-10"
        >
          Building the Future
          <span className="block w-10 h-0.5 bg-gold-500 mt-2" />
        </motion.h2>

        <div className="grid grid-cols-2 gap-4 mb-8">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 + i * 0.1 }}
            >
              <ProjectCard {...project} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.55 }}
        >
          <Button href="#contact" variant="outline">View All Projects</Button>
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Wrap About inner content**

In `src/components/sections/About.tsx`, wrap the section body:

```tsx
export function About() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" className="py-20 px-8 md:px-12" ref={ref}>
      <div className="max-w-3xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          className="text-blueprint-300 font-mono text-xs tracking-widest uppercase mb-2"
        >
          About Us
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="text-4xl font-heading text-white uppercase mb-6 leading-tight"
        >
          Precision.<br />Passion.<br />Progress.
          <span className="block w-10 h-0.5 bg-gold-500 mt-2" />
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="text-slate-400 text-sm leading-relaxed mb-10 max-w-sm font-body"
        >
          Fy Engineering Consultancy is committed to providing exceptional engineering,
          construction, and design solutions. We combine innovation, expertise, and
          dedication to deliver projects that stand the test of time.
        </motion.p>

        <div className="flex gap-8 flex-wrap">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.value}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + i * 0.1 }}
            >
              <p className="text-5xl font-heading text-blueprint-600 leading-none">{stat.value}</p>
              <p className="text-slate-400 text-xs font-body mt-1 tracking-wide">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Check in browser**

At `http://localhost:5173`, scroll through Services, Projects, and About. Confirm all sections are centered.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/Services.tsx src/components/sections/Projects.tsx src/components/sections/About.tsx
git commit -m "feat: center Services, Projects, and About sections"
```

---

## Task 6: Center Contact section

**Files:**
- Modify: `src/components/sections/Contact.tsx`

- [ ] **Step 1: Wrap Contact inner content**

In `src/components/sections/Contact.tsx`, add `max-w-3xl mx-auto` to the inner div inside the section's bg wrapper:

```tsx
export function Contact() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    // Static form — no backend
  }

  return (
    <section id="contact" ref={ref}>
      <div className="bg-navy-950/40 border-t border-navy-800 py-16 px-8 md:px-12">
        <div className="max-w-3xl mx-auto grid grid-cols-1 gap-10">
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              className="text-3xl font-heading text-white uppercase mb-6 leading-tight"
            >
              Let's Build Something<br />Great Together.
            </motion.h3>
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 }}
              className="space-y-3 text-sm font-body"
            >
              <p>
                <span className="text-blueprint-300 font-mono text-xs">[TEL]</span>{' '}
                <span className="text-slate-300">{CONTACT.phone}</span>
              </p>
              <p>
                <span className="text-blueprint-300 font-mono text-xs">[EMAIL]</span>{' '}
                <span className="text-slate-300">{CONTACT.email}</span>
              </p>
              <p>
                <span className="text-blueprint-300 font-mono text-xs">[ADDR]</span>{' '}
                <span className="text-slate-300">{CONTACT.address}</span>
              </p>
            </motion.div>
          </div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="space-y-3"
          >
            <div className="grid grid-cols-2 gap-3">
              <input type="text" placeholder="Name" aria-label="Name" className={inputClass} />
              <input type="email" placeholder="Email" aria-label="Email" className={inputClass} />
            </div>
            <input type="tel" placeholder="Phone" aria-label="Phone" className={inputClass} />
            <textarea placeholder="Message" aria-label="Message" rows={4} className={`${inputClass} resize-none`} />
            <Button type="submit" className="w-full">Send Message</Button>
          </motion.form>
        </div>
      </div>

      <footer className="bg-navy-950/40 border-t border-navy-800 py-5 px-8 md:px-12">
        <div className="max-w-3xl mx-auto flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 border border-blueprint-600 flex items-center justify-center">
              <span className="text-white font-heading text-xs font-bold">Fy</span>
            </div>
            <span className="text-slate-400 text-xs font-body">Fy Engineering Consultancy</span>
          </div>
          <p className="text-slate-600 text-xs font-body">© 2024 Fy Engineering Consultancy. All Rights Reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="text-slate-400 hover:text-white text-xs font-body transition-colors">Facebook</a>
            <a href="#" className="text-slate-400 hover:text-white text-xs font-body transition-colors">Instagram</a>
          </div>
        </div>
      </footer>
    </section>
  )
}
```

- [ ] **Step 2: Run all tests to confirm nothing broke**

```bash
npx vitest run
```

Expected: all tests PASS

- [ ] **Step 3: Final visual check in browser**

At `http://localhost:5173`:
- Scroll from top to bottom — buildings should zoom in (get larger) the further you scroll
- Each building traces itself in: odd buildings (b1, b3, b5, b7) draw forward, even buildings (b2, b4, b6, b8) draw in reverse — different sketch directions visible as you scroll
- All sections (Hero, Services, Projects, About, Contact, Footer) are centered in the middle column
- Buildings are visible on left and right edges, fading toward the center
- No buildings visible in the middle behind the text

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/Contact.tsx
git commit -m "feat: center Contact section and footer"
```
