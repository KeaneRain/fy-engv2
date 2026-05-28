import type { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'outline'
  onClick?: () => void
  href?: string
  className?: string
  type?: 'button' | 'submit'
}

export function Button({ children, variant = 'primary', onClick, href, className = '', type = 'button' }: ButtonProps) {
  const base = 'inline-flex items-center justify-center px-6 py-3 text-xs font-semibold tracking-widest uppercase transition-all duration-200 font-body'
  const variants: Record<string, string> = {
    primary: 'bg-blueprint-600 text-white hover:bg-blueprint-700 border border-blueprint-600',
    outline: 'bg-transparent text-white border border-white hover:bg-white hover:text-navy-950',
  }
  const cls = `${base} ${variants[variant]} ${className}`

  if (href) return <a href={href} className={cls}>{children}</a>
  return <button type={type} onClick={onClick} className={cls}>{children}</button>
}
