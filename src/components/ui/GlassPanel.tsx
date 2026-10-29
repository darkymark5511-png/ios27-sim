import { type ReactNode, type HTMLAttributes } from 'react'

type Variant = 'regular' | 'dark' | 'prominent' | 'thin'

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  variant?: Variant
  className?: string
}

export function GlassPanel({ children, variant = 'regular', className = '', ...rest }: Props) {
  const base = variant === 'dark' ? 'glass-dark' : 'glass'
  return (
    <div
      className={`${base} ${className}`}
      style={
        variant === 'prominent'
          ? { background: 'linear-gradient(180deg, color-mix(in srgb, var(--accent) 35%, transparent), color-mix(in srgb, var(--accent) 15%, transparent))' }
          : variant === 'thin'
            ? { backdropFilter: 'blur(20px) saturate(160%)', WebkitBackdropFilter: 'blur(20px) saturate(160%)' }
            : undefined
      }
      {...rest}
    >
      {children}
    </div>
  )
}
