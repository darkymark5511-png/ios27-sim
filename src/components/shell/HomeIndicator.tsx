import { useAppStore } from '../../store/appStore'
import { useRef } from 'react'

export function HomeIndicator() {
  const { state, closeApp, setState, openApp, showRecoverySheet } = useAppStore()
  const hold = useRef<ReturnType<typeof setTimeout> | null>(null)
  const startY = useRef(0)

  if (state === 'booting' || state === 'recovery' || state === 'erasing' || state === 'welcome') return null

  const onDown = (e: React.PointerEvent) => {
    startY.current = e.clientY
    if (state === 'locked') {
      hold.current = setTimeout(() => {
        showRecoverySheet(true)
      }, 300)
    } else if (state === 'unlocked' && !openApp) {
      hold.current = setTimeout(() => {
        setState('switcher')
      }, 300)
    }
  }

  const onUp = (e: React.PointerEvent) => {
    if (hold.current) {
      clearTimeout(hold.current)
      hold.current = null
    }
    const dy = startY.current - e.clientY
    if (dy < 40) return
    if (state === 'locked') {
      setState('unlocked')
    } else if (openApp) {
      closeApp()
    } else if (state === 'switcher') {
      setState('unlocked')
    }
  }

  return (
    <div
      className="absolute bottom-0 left-0 right-0 z-[55] flex h-8 items-center justify-center pb-2"
      onPointerDown={onDown}
      onPointerUp={onUp}
      style={{ touchAction: 'none' }}
    >
      <div className="h-[5px] w-[134px] rounded-full bg-white/90" />
    </div>
  )
}
