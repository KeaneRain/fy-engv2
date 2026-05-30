import { Button } from '../ui/Button'
import { TypewriterText, WordSlide, LineReveal } from '../ui/TextReveal'

export function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center pt-24 pb-16 px-10 md:px-24">
      <div className="max-w-3xl mx-auto w-full text-center">
        <WordSlide
          delay={0.2}
          className="text-blueprint-300 font-mono text-xs tracking-widest uppercase mb-5 block"
        >
          Engineering Consultancy
        </WordSlide>

        <h1 className="text-6xl md:text-7xl font-heading text-white leading-none uppercase mb-5">
          <TypewriterText delay={0.5} className="block">Engineering</TypewriterText>
          <TypewriterText delay={0.94} className="block">Solutions</TypewriterText>
          <TypewriterText delay={1.30} className="block text-blueprint-600">Built on</TypewriterText>
          <TypewriterText delay={1.62} className="block">Precision.</TypewriterText>
        </h1>

        <LineReveal delay={2.1}>
          <p className="text-slate-400 font-body text-sm mb-8 tracking-wide">
            Precision &bull; Passion &bull; Progress
          </p>
        </LineReveal>

        <LineReveal delay={2.3} className="flex gap-4 flex-wrap justify-center">
          <Button href="#contact">Get a Quote</Button>
          <Button href="#projects" variant="outline">View Projects</Button>
        </LineReveal>
      </div>
    </section>
  )
}
