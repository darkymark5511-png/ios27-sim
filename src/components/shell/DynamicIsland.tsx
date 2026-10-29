import { motion } from 'framer-motion'
import { useAppStore } from '../../store/appStore'
import { useMusicStore } from '../../store/musicStore'
import { useEffect, useRef } from 'react'
import { iosSpring } from '../../lib/animations'

export function DynamicIsland() {
  const { state, showRecoverySheet } = useAppStore()
  const playing = useMusicStore((s) => s.playing)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current) }, [])

  if (state === 'booting' || state === 'recovery' || state === 'erasing') return null

  const expanded = playing && state === 'unlocked'

  return (
    <motion.div
      layout
      className="absolute left-1/2 top-[11px] z-[60] -translate-x-1/2 cursor-default rounded-full bg-black"
      style={{
        boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.08), 0 2px 8px rgba(0,0,0,0.5)',
      }}
      animate={{
        width: expanded ? 160 : 120,
        height: expanded ? 36 : 34,
      }}
      transition={iosSpring}
      onPointerDown={() => {
        if (state !== 'locked') return
        timer.current = setTimeout(() => showRecoverySheet(true), 2000)
      }}
      onPointerUp={() => {
        if (timer.current) { clearTimeout(timer.current); timer.current = null }
      }}
      onPointerLeave={() => {
        if (timer.current) { clearTimeout(timer.current); timer.current = null }
      }}
    />
  )
}
