import { SmoothScroll } from './components/SmoothScroll'
import { SkylineCanvas } from './components/SkylineCanvas'
import { ScrollProgress } from './components/ScrollProgress'
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
        <ScrollProgress />

        <div className="flex">
          {/* Left: scrollable content (full width on mobile, half on desktop) */}
          <main className="w-full md:w-1/2 relative z-10">
            <Hero />
            <Services />
            <Projects />
            <About />
            <Contact />
          </main>

          {/* Right: sticky skyline (hidden on mobile) */}
          <div className="hidden md:block md:w-1/2 relative">
            <SkylineCanvas />
          </div>
        </div>
      </div>
    </SmoothScroll>
  )
}
