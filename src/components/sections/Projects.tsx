import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ProjectCard } from '../ui/ProjectCard'
import { Button } from '../ui/Button'
import { PROJECTS } from '../../data/content'

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
