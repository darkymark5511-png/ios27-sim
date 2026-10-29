import { motion } from 'framer-motion'
import { useAppStore } from '../../store/appStore'
import { useEffect, useRef } from 'react'

export function DynamicIsland() {
  const { state, showRecoverySheet } = useAppStore()
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current)
    }
  }, [])

  if (state === 'booting' || state === 'recovery' || state === 'erasing') return null

  const onPointerDown = () => {
    if (state !== 'locked') return
    timer.current = setTimeout(() => {
      showRecoverySheet(true)
    }, 2000)
  }

  const onPointerUp = () => {
    if (timer.current) {
      clearTimeout(timer.current)
      timer.current = null
    }
  }

  return (
    <motion.div
      layout
      className="absolute left-1/2 top-[11px] z-[60] h-[34px] w-[120px] -translate-x-1/2 cursor-default rounded-full bg-black"
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
      style={{ touchAction: 'none' }}
    />
  )
}
