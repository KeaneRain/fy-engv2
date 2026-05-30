import { LineReveal, TypewriterText, WordSlide } from '../ui/TextReveal'
import { STATS } from '../../data/content'

export function About() {
  return (
    <section id="about" className="py-32 px-10 md:px-24">
      <div className="max-w-4xl mx-auto">
        <WordSlide className="text-blueprint-300 font-mono text-xs tracking-widest uppercase mb-2 block">
          About Us
        </WordSlide>

        <h2 className="text-4xl font-heading text-white uppercase mb-6 leading-tight">
          <TypewriterText delay={0.1} className="block">Precision.</TypewriterText>
          <TypewriterText delay={0.50} className="block">Passion.</TypewriterText>
          <TypewriterText delay={0.82} className="block">Progress.</TypewriterText>
          <span className="block w-10 h-0.5 bg-gold-500 mt-2" />
        </h2>

        <LineReveal delay={1.3}>
          <p className="text-slate-400 text-sm leading-relaxed mb-10 max-w-sm font-body">
            Fy Engineering Consultancy is committed to providing exceptional engineering,
            construction, and design solutions. We combine innovation, expertise, and
            dedication to deliver projects that stand the test of time.
          </p>
        </LineReveal>

        <div className="flex gap-8 flex-wrap">
          {STATS.map((stat, i) => (
            <LineReveal key={stat.value} delay={1.5 + i * 0.12}>
              <p className="text-5xl font-heading text-blueprint-600 leading-none">{stat.value}</p>
              <p className="text-slate-400 text-xs font-body mt-1 tracking-wide">{stat.label}</p>
            </LineReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
