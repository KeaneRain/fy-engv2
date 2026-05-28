import { useEffect, useState } from 'react'

const MILESTONES = [
  { label: 'TOP', sublabel: 'Minimal Skyline', progress: 0 },
  { label: 'SCROLLING', sublabel: 'Buildings Growing', progress: 0.33 },
  { label: 'MORE PROGRESS', sublabel: 'More Buildings Appear', progress: 0.66 },
  { label: 'BOTTOM', sublabel: 'Full City Skyline Completed', progress: 1 },
]

export function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      setProgress(maxScroll > 0 ? scrollTop / maxScroll : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const activeIndex = MILESTONES.reduce(
    (acc, m, i) => (progress >= m.progress - 0.01 ? i : acc),
    0,
  )

  return (
    <div className="fixed right-5 top-0 h-screen hidden md:flex flex-col justify-center z-50 pointer-events-none">
      <p className="writing-vertical text-[9px] font-mono text-blueprint-300 tracking-widest uppercase mb-4 opacity-60">
        Scroll Progress
      </p>
      <div className="relative">
        <div className="absolute left-[5px] top-3 bottom-3 w-px bg-navy-700" />
        <div
          className="absolute left-[5px] top-3 w-px bg-blueprint-600 transition-all duration-100 origin-top"
          style={{ height: `calc(${progress * 100}% - 24px)` }}
        />
        {MILESTONES.map((m, i) => (
          <div key={m.label} className="relative flex items-start gap-3 mb-10 last:mb-0">
            <div
              className={`mt-0.5 w-[11px] h-[11px] rounded-full border-2 flex-shrink-0 z-10 transition-all duration-300 ${
                i <= activeIndex
                  ? 'bg-gold-500 border-gold-500'
                  : 'bg-navy-950 border-blueprint-600'
              }`}
            />
            <div className={`transition-opacity duration-300 ${i <= activeIndex ? 'opacity-100' : 'opacity-40'}`}>
              <p className="text-[9px] font-mono text-blueprint-300 leading-tight font-bold tracking-wide">
                {m.label}
              </p>
              <p className="text-[8px] text-slate-400 leading-tight mt-0.5 w-[72px]">
                {m.sublabel}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
