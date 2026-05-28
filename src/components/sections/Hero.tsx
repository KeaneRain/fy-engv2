import { motion } from 'framer-motion'
import { Button } from '../ui/Button'

export function Hero() {
  return (
    <section id="home" className="min-h-screen flex flex-col md:flex-row md:items-center pt-20 pb-12 px-8 md:px-12">
      {/* Mobile-only static skyline banner */}
      <div className="md:hidden w-full h-40 mb-6 overflow-hidden flex-shrink-0">
        <svg
          viewBox="0 0 800 200"
          className="w-full h-full"
          aria-hidden="true"
          preserveAspectRatio="xMidYMax meet"
          style={{ filter: 'drop-shadow(0 0 6px rgba(37,99,235,0.4))' }}
        >
          <line x1="0" y1="195" x2="800" y2="195" stroke="#2563eb" strokeWidth="1.5" />
          <path
            d="M 20,195 L 20,155 L 78,155 L 78,195 M 92,195 L 92,135 L 154,135 L 154,195 M 168,195 L 168,100 L 240,100 L 240,195 M 254,195 L 254,80 L 322,80 L 322,195 M 336,195 L 336,50 L 418,50 L 418,195 M 534,195 L 534,20 L 608,20 L 608,195 M 622,195 L 622,5 L 724,5 L 724,195"
            stroke="#2563eb"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <div className="max-w-lg">
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
          className="flex gap-4 flex-wrap"
        >
          <Button href="#contact">Get a Quote</Button>
          <Button href="#projects" variant="outline">View Projects</Button>
        </motion.div>
      </div>
    </section>
  )
}
