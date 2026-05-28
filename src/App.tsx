import { SmoothScroll } from './components/SmoothScroll'
import { SkylineCanvas } from './components/SkylineCanvas'
import { Nav } from './components/ui/Nav'
import { Hero } from './components/sections/Hero'
import { Services } from './components/sections/Services'
import { Projects } from './components/sections/Projects'
import { About } from './components/sections/About'
import { Contact } from './components/sections/Contact'

export default function App() {
  return (
    <SmoothScroll>
      <div className="bg-navy-950 min-h-screen">
        <Nav />

        {/* Mobile: buildings as fixed background layer */}
        <div className="md:hidden fixed inset-0 opacity-[0.65] z-0 pointer-events-none overflow-hidden">
          <SkylineCanvas />
        </div>

        <div className="flex">
          {/* Left: scrollable content (full width on mobile, half on desktop) */}
          <main className="w-full md:w-1/2 relative z-10">
            <Hero />
            <Services />
            <Projects />
            <About />
            <Contact />
          </main>

          {/* Desktop right panel: sticky skyline */}
          <div className="hidden md:block md:w-1/2">
            <SkylineCanvas />
          </div>
        </div>
      </div>
    </SmoothScroll>
  )
}
