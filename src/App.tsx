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
        {/* Fixed skyline canvas — faint on mobile, full on desktop */}
        <div
          ref={canvasWrapperRef}
          className="fixed inset-0 z-0 pointer-events-none opacity-20 md:opacity-100"
          style={{ transformOrigin: 'center bottom' }}
        >
          <SkylineCanvas />
        </div>

        {/* Radial vignette */}
        <div className="vignette fixed inset-0 z-[1] pointer-events-none" />

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
