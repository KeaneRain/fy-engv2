import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { STATS } from '../../data/content'

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
