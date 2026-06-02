import { Button } from './Button'
import { NAV_LINKS } from '../../data/content'

export function Nav() {
  return (
    <>
      {/* Top header */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-navy-950/80 border-b border-navy-800">
        <nav className="px-6 h-16 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-3 flex-shrink-0">
            <div className="w-9 h-9 border-2 border-blueprint-600 flex items-center justify-center">
              <span className="text-white font-heading text-sm font-bold">Fy</span>
            </div>
            <div>
              <p className="text-white font-body font-semibold text-sm leading-tight">Fy Engineering Consultancy</p>
              <p className="text-blueprint-300 font-mono text-[9px] tracking-widest uppercase">Precision · Passion · Progress</p>
            </div>
          </a>

          {/* Desktop nav links */}
          <ul className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(link => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-slate-400 hover:text-white text-xs font-body font-semibold uppercase tracking-widest transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop CTA only */}
          <div className="hidden md:block">
            <Button href="#contact">Get a Quote</Button>
          </div>
        </nav>
      </header>

      {/* Mobile bottom navigation bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-navy-950/95 backdrop-blur-sm border-t border-navy-800">
        {/* Nav links row */}
        <div className="flex items-center justify-around h-14 border-b border-navy-800/60">
          {NAV_LINKS.map(link => (
            <a
              key={link.label}
              href={link.href}
              className="flex-1 text-center text-slate-400 hover:text-white text-[10px] font-body font-semibold uppercase tracking-wider transition-colors py-4"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA row */}
        <div className="px-4 py-3">
          <Button href="#contact" className="w-full">Get a Quote</Button>
        </div>
      </nav>
    </>
  )
}
