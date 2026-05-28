import type { ReactElement } from 'react'

type IconType = 'building' | 'clipboard' | 'ruler'

interface ServiceCardProps {
  icon: IconType
  title: string
  description: string
}

const ICONS: Record<IconType, ReactElement> = {
  building: (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="8" width="24" height="20" />
      <path d="M4 8 L16 2 L28 8" />
      <rect x="11" y="18" width="4" height="10" />
      <rect x="17" y="18" width="4" height="10" />
      <rect x="8" y="12" width="4" height="3" />
      <rect x="20" y="12" width="4" height="3" />
    </svg>
  ),
  clipboard: (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="8" y="4" width="16" height="24" />
      <path d="M12 4 L12 8 L20 8 L20 4" />
      <line x1="12" y1="14" x2="20" y2="14" />
      <line x1="12" y1="18" x2="20" y2="18" />
      <line x1="12" y1="22" x2="17" y2="22" />
    </svg>
  ),
  ruler: (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="26" height="10" rx="1" />
      <line x1="8" y1="11" x2="8" y2="16" />
      <line x1="13" y1="11" x2="13" y2="14" />
      <line x1="18" y1="11" x2="18" y2="16" />
      <line x1="23" y1="11" x2="23" y2="14" />
    </svg>
  ),
}

export function ServiceCard({ icon, title, description }: ServiceCardProps) {
  return (
    <div className="
      relative p-6 bg-navy-800
      before:absolute before:top-2 before:left-2 before:w-5 before:h-5
      before:border-t-2 before:border-l-2 before:border-blueprint-600
      after:absolute after:top-2 after:right-2 after:w-5 after:h-5
      after:border-t-2 after:border-r-2 after:border-blueprint-600
    ">
      <div className="text-blueprint-300 mb-4">{ICONS[icon]}</div>
      <h3 className="text-white font-body font-semibold text-base mb-2">{title}</h3>
      <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
    </div>
  )
}
