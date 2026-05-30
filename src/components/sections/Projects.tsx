import { LineReveal, TypewriterText, WordSlide } from '../ui/TextReveal'
import { ProjectCard } from '../ui/ProjectCard'
import { Button } from '../ui/Button'
import { PROJECTS } from '../../data/content'

export function Projects() {
  return (
    <section id="projects" className="py-32 px-10 md:px-24">
      <div className="max-w-4xl mx-auto">
        <WordSlide className="text-blueprint-300 font-mono text-xs tracking-widest uppercase mb-2 block">
          Featured Projects
        </WordSlide>

        <h2 className="text-4xl font-heading text-white uppercase mb-10">
          <TypewriterText delay={0.1}>Building the Future</TypewriterText>
          <span className="block w-10 h-0.5 bg-gold-500 mt-2" />
        </h2>

        <div className="grid grid-cols-2 gap-4 mb-8">
          {PROJECTS.map((project, i) => (
            <LineReveal key={project.id} delay={0.15 + i * 0.1}>
              <ProjectCard {...project} />
            </LineReveal>
          ))}
        </div>

        <LineReveal delay={0.55}>
          <Button href="#contact" variant="outline">View All Projects</Button>
        </LineReveal>
      </div>
    </section>
  )
}
