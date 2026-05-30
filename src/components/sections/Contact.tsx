import { type FormEvent } from 'react'
import { LineReveal, TypewriterText } from '../ui/TextReveal'
import { Button } from '../ui/Button'
import { CONTACT } from '../../data/content'

const inputClass = 'w-full bg-navy-800 border border-navy-700 text-white text-sm px-4 py-3 focus:outline-none focus:border-blueprint-600 placeholder:text-slate-600 font-body transition-colors'

export function Contact() {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    // Static form — no backend
  }

  return (
    <section id="contact">
      <div className="bg-navy-950/40 border-t border-navy-800 py-24 px-10 md:px-24">
        <div className="max-w-4xl mx-auto grid grid-cols-1 gap-10">
          <div>
            <h3 className="text-3xl font-heading text-white uppercase mb-6 leading-tight">
              <TypewriterText delay={0} className="block">Let's Build Something</TypewriterText>
              <TypewriterText delay={0.9} className="block">Great Together.</TypewriterText>
            </h3>

            <LineReveal delay={0.2} className="space-y-3 text-sm font-body">
              <p>
                <span className="text-blueprint-300 font-mono text-xs">[TEL]</span>{' '}
                <span className="text-slate-300">{CONTACT.phone}</span>
              </p>
              <p>
                <span className="text-blueprint-300 font-mono text-xs">[EMAIL]</span>{' '}
                <span className="text-slate-300">{CONTACT.email}</span>
              </p>
              <p>
                <span className="text-blueprint-300 font-mono text-xs">[ADDR]</span>{' '}
                <span className="text-slate-300">{CONTACT.address}</span>
              </p>
            </LineReveal>
          </div>

          <LineReveal delay={0.4}>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <input type="text" placeholder="Name" aria-label="Name" className={inputClass} />
                <input type="email" placeholder="Email" aria-label="Email" className={inputClass} />
              </div>
              <input type="tel" placeholder="Phone" aria-label="Phone" className={inputClass} />
              <textarea placeholder="Message" aria-label="Message" rows={4} className={`${inputClass} resize-none`} />
              <Button type="submit" className="w-full">Send Message</Button>
            </form>
          </LineReveal>
        </div>
      </div>

      <footer className="bg-navy-950/40 border-t border-navy-800 py-5 px-10 md:px-24">
        <div className="max-w-4xl mx-auto flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 border border-blueprint-600 flex items-center justify-center">
              <span className="text-white font-heading text-xs font-bold">Fy</span>
            </div>
            <span className="text-slate-400 text-xs font-body">Fy Engineering Consultancy</span>
          </div>
          <p className="text-slate-600 text-xs font-body">© 2024 Fy Engineering Consultancy. All Rights Reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="text-slate-400 hover:text-white text-xs font-body transition-colors">Facebook</a>
            <a href="#" className="text-slate-400 hover:text-white text-xs font-body transition-colors">Instagram</a>
          </div>
        </div>
      </footer>
    </section>
  )
}
