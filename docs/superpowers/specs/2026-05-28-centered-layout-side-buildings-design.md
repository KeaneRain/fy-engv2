# Centered Layout with Side Buildings Design

**Date:** 2026-05-28

## Overview

Redesign the page layout so content is centered in the middle of the viewport and the skyline buildings are visible on both left and right edges. As the user scrolls, the buildings zoom in (scale up) and each building sketches itself in a different direction.

## Layout

- `SkylineCanvas` becomes a **fixed full-viewport background layer** (position fixed, inset 0, z-index 0).
- A **radial gradient overlay** (dark center, transparent edges) is placed over the canvas so buildings are only visible at the left and right edges — the center is cleared for content.
- The content column (`<main>`) sits above the canvas (z-index 10), centered with `max-w-3xl mx-auto`, full page height.
- The current desktop split layout (content left half / canvas right half) is removed.
- The mobile fixed-background layer (existing) is removed since the new layout already treats the canvas as background on all screen sizes.
- Nav stays at the top, z-index above both canvas and content.

## Scroll-Driven Zoom

- A `useRef` is attached to the canvas wrapper div in `App.tsx`.
- A new GSAP `ScrollTrigger` scrubs a `scale` tween on that wrapper from `1.0` at the top of the page to `1.2` at the bottom.
- `transform-origin` is set to `center bottom` so buildings grow upward from the ground.
- This is entirely in `App.tsx` — `SkylineCanvas.tsx` is not changed.

## Directional Sketch Animation

Each building traces itself as the user scrolls (existing `strokeDashoffset` animation). The direction each building draws is now varied:

- Add a `drawDirection: 'forward' | 'reverse'` field to each `Building` entry in `src/lib/buildings.ts`.
- Alternate directions across buildings (e.g. odd-indexed forward, even-indexed reverse, or manually assigned for visual variety).
- In `SkylineCanvas.tsx`, read `building.drawDirection` when setting the initial `strokeDashoffset`: `forward` → `+length`, `reverse` → `-length`. Both animate to `0`.
- The result: some buildings sketch from one end of their path, others from the opposite end, so they appear to draw in from different directions.

## Content Centering

- `Hero.tsx`: replace `max-w-lg` with `max-w-2xl mx-auto`, center-align text (`text-center`), center the button group.
- All other section components (`Services`, `Projects`, `About`, `Contact`): ensure inner content wrappers use `mx-auto` with an appropriate max-width.
- Section padding stays as-is (already uses `px-8 md:px-12`).

## Files Changed

| File | Change |
|---|---|
| `src/App.tsx` | Remove split flex layout. Add fixed canvas background + radial overlay. Add GSAP scroll-scale on canvas wrapper. Simplify to single centered `<main>`. |
| `src/lib/buildings.ts` | Add `drawDirection: 'forward' \| 'reverse'` to each `Building` entry. |
| `src/components/SkylineCanvas.tsx` | Read `building.drawDirection` to set initial `strokeDashoffset` sign. |
| `src/components/sections/Hero.tsx` | Center text and buttons, widen max-width. |
| `src/components/sections/Services.tsx` | Ensure `mx-auto` centering on inner wrapper. |
| `src/components/sections/Projects.tsx` | Ensure `mx-auto` centering on inner wrapper. |
| `src/components/sections/About.tsx` | Ensure `mx-auto` centering on inner wrapper. |
| `src/components/sections/Contact.tsx` | Ensure `mx-auto` centering on inner wrapper. |

## Out of Scope

- Changing the annotation draw animation (stays forward-only).
- Changing building path data in `buildings.ts` (only adding a field).
- Any changes to scroll behavior, smooth scroll, or Nav.
