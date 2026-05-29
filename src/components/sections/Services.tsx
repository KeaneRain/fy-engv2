import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ServiceCard } from '../ui/ServiceCard'
import { SERVICES } from '../../data/content'

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
