import { LineReveal, TypewriterText, WordSlide } from '../ui/TextReveal'
import { ServiceCard } from '../ui/ServiceCard'
import { SERVICES } from '../../data/content'

export function Services() {
  return (
    <section id="services" className="py-32 px-10 md:px-24">
      <div className="max-w-4xl mx-auto">
        <WordSlide className="text-blueprint-300 font-mono text-xs tracking-widest uppercase mb-2 block">
          What We Do
        </WordSlide>

        <h2 className="text-4xl font-heading text-white uppercase mb-10">
          <TypewriterText delay={0.1}>Our Services</TypewriterText>
          <span className="block w-10 h-0.5 bg-gold-500 mt-2" />
        </h2>

        <div className="grid grid-cols-1 gap-5">
          {SERVICES.map((service, i) => (
            <LineReveal key={service.id} delay={0.2 + i * 0.12}>
              <ServiceCard {...service} />
            </LineReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
