import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { SmoothScroll } from './components/SmoothScroll'
import { SkylineCanvas } from './components/SkylineCanvas'
import { Nav } from './components/ui/Nav'
import { Hero } from './components/sections/Hero'
import { Services } from './components/sections/Services'
import { Projects } from './components/sections/Projects'
import { About } from './components/sections/About'
import { Contact } from './components/sections/Contact'

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
