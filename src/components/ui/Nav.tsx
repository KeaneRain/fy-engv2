import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from './Button'
import { NAV_LINKS } from '../../data/content'

export function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Top header */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-navy-950/80 border-b border-navy-800">
        <nav className="px-6 h-16 flex items-center justify-between">
          {/* Logo */}
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

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Button href="#contact">Get a Quote</Button>
          </div>

          {/* Mobile hamburger button */}
          <button
            className="md:hidden flex flex-col justify-center items-center gap-[5px] w-10 h-10"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <span className="block w-6 h-0.5 bg-white" />
            <span className="block w-6 h-0.5 bg-white" />
            <span className="block w-4 h-0.5 bg-white" />
          </button>
        </nav>
      </header>

      {/* Mobile full-screen menu overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-0 z-[60] bg-navy-950 flex flex-col"
          >
            {/* Header row inside overlay */}
            <div className="flex items-center justify-between px-6 h-16 border-b border-navy-800 flex-shrink-0">
              <a href="#home" className="flex items-center gap-3" onClick={() => setOpen(false)}>
                <div className="w-9 h-9 border-2 border-blueprint-600 flex items-center justify-center">
                  <span className="text-white font-heading text-sm font-bold">Fy</span>
                </div>
              </a>
              {/* Close button */}
              <button
                onClick={() => setOpen(false)}
                className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                aria-label="Close menu"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <line x1="3" y1="3" x2="17" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="17" y1="3" x2="3" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            {/* Nav links — centered vertically */}
            <div className="flex-1 flex flex-col justify-center px-8 gap-2">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.07, duration: 0.3 }}
                  className="text-4xl font-heading text-white uppercase tracking-widest py-3 border-b border-navy-800 hover:text-blueprint-300 transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>

            {/* CTA at bottom of overlay */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.3 }}
              className="px-8 py-8"
            >
              <Button href="#contact" className="w-full py-4 text-sm" onClick={() => setOpen(false)}>
                Get a Quote
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile fixed bottom CTA */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 px-4 py-3 bg-navy-950/95 backdrop-blur-sm border-t border-navy-800">
        <Button href="#contact" className="w-full">Get a Quote</Button>
      </div>
    </>
  )
}
