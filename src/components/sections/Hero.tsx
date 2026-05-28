import { motion } from 'framer-motion'
import { Button } from '../ui/Button'

export function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center pt-20 pb-12 px-8 md:px-12">
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
