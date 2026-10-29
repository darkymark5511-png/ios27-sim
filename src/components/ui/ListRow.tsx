import { type ReactNode } from 'react'
import { ChevronRight } from '../../lib/icons'

interface Props {
  title: string
  subtitle?: string
  left?: ReactNode
  right?: ReactNode
  onClick?: () => void
  destructive?: boolean
  chevron?: boolean
}

export function ListRow({ title, subtitle, left, right, onClick, destructive, chevron }: Props) {
  const Comp = onClick ? 'button' : 'div'
  return (
    <Comp
      type={onClick ? 'button' : undefined}
      onClick={onClick}
      className={`flex w-full items-center gap-3 px-4 py-[11px] text-left ${onClick ? 'active:bg-white/10' : ''}`}
    >
      {left && <div className="shrink-0">{left}</div>}
      <div className="min-w-0 flex-1">
        <div className={`text-[17px] leading-tight ${destructive ? 'text-[#ff453a]' : 'text-white'}`}>{title}</div>
        {subtitle && <div className="mt-0.5 text-[13px] text-white/50">{subtitle}</div>}
      </div>
      {right}
      {chevron && <ChevronRight className="shrink-0 text-white/30" />}
    </Comp>
  )
}
