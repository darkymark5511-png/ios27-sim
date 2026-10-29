import { useEffect, useState } from 'react'

export function EraseScreen() {
  const [pct, setPct] = useState(0)

  useEffect(() => {
    const start = Date.now()
    const id = setInterval(() => {
      const p = Math.min(100, ((Date.now() - start) / 2000) * 100)
      setPct(p)
    }, 50)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="absolute inset-0 z-[95] flex flex-col items-center justify-center bg-black">
      <div className="text-[17px] text-white/70">Erasing…</div>
      <div className="mt-6 h-1 w-48 overflow-hidden rounded-full bg-white/15">
        <div className="h-full bg-white transition-all" style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}
