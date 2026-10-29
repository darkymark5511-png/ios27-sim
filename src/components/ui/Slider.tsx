import { useRef, useCallback } from 'react'

interface Props {
  value: number
  onChange: (v: number) => void
  min?: number
  max?: number
  className?: string
  icon?: React.ReactNode
}

export function Slider({ value, onChange, min = 0, max = 1, className = '', icon }: Props) {
  const track = useRef<HTMLDivElement>(null)
  const setFromEvent = useCallback(
    (clientX: number) => {
      const el = track.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const pct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
      onChange(min + pct * (max - min))
    },
    [min, max, onChange]
  )
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {icon}
      <div
        ref={track}
        className="relative h-8 flex-1 cursor-pointer touch-none"
        onPointerDown={(e) => { e.currentTarget.setPointerCapture(e.pointerId); setFromEvent(e.clientX) }}
        onPointerMove={(e) => { if (e.buttons) setFromEvent(e.clientX) }}
      >
        <div className="absolute inset-y-[11px] left-0 right-0 rounded-full bg-white/20" />
        <div className="absolute inset-y-[11px] left-0 rounded-full bg-white" style={{ width: `${((value - min) / (max - min)) * 100}%` }} />
        <div
          className="absolute top-1/2 h-7 w-7 -translate-y-1/2 rounded-full bg-white shadow-md"
          style={{ left: `calc(${((value - min) / (max - min)) * 100}% - 14px)` }}
        />
      </div>
    </div>
  )
}
