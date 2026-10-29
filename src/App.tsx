import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import { PhoneShell } from './components/shell/PhoneShell'
import { BootScreen } from './components/screens/BootScreen'
import { WelcomeScreen } from './components/screens/WelcomeScreen'
import { LockScreen } from './components/screens/LockScreen'
import { HomeScreen } from './components/screens/HomeScreen'
import { RecoveryScreen } from './components/screens/RecoveryScreen'
import { EraseScreen } from './components/screens/EraseScreen'
import { ControlCenter } from './components/overlays/ControlCenter'
import { NotificationShade } from './components/overlays/NotificationShade'
import { Calculator } from './components/apps/Calculator'
import { Clock } from './components/apps/Clock'
import { Settings } from './components/apps/Settings'
import { Notes } from './components/apps/Notes'
import { Music } from './components/apps/Music'
import { Photos } from './components/apps/Photos'
import { Weather } from './components/apps/Weather'
import { Camera } from './components/apps/Camera'
import { Safari } from './components/apps/Safari'
import { useAppStore } from './store/appStore'

export default function App() {
  const state = useAppStore((s) => s.state)
  const showDev = useAppStore((s) => s.showDev)
  const setState = useAppStore((s) => s.setState)
  const [cc, setCc] = useState(false)
  const [shade, setShade] = useState(false)

  const onShellPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (state !== 'unlocked' && state !== 'locked') return
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
      const y = e.clientY - rect.top
      const x = e.clientX - rect.left
      if (y > 50) return
      if (x > rect.width * 0.55) setCc(true)
      else setShade(true)
    },
    [state]
  )

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setCc(false)
        setShade(false)
        const st = useAppStore.getState()
        if (st.openApp) st.closeApp()
        else if (st.state === 'unlocked' || st.state === 'switcher') st.setState('locked')
        else if (st.recoverySheet) st.showRecoverySheet(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  if (state === 'booting') {
    return (
      <PhoneShell>
        <BootScreen />
      </PhoneShell>
    )
  }

  return (
    <PhoneShell>
      <div className="absolute inset-0" onPointerDown={onShellPointerDown}>
        <AnimatePresence mode="wait">
          {state === 'welcome' && <WelcomeScreen key="welcome" />}
          {state === 'locked' && <LockScreen key="lock" />}
          {(state === 'unlocked' || state === 'switcher') && <HomeScreen key="home" />}
          {state === 'recovery' && <RecoveryScreen key="recovery" />}
          {state === 'erasing' && <EraseScreen key="erase" />}
        </AnimatePresence>

        <Calculator />
        <Clock />
        <Settings />
        <Notes />
        <Music />
        <Photos />
        <Weather />
        <Camera />
        <Safari />

        <ControlCenter open={cc} onClose={() => setCc(false)} />
        <NotificationShade open={shade} onClose={() => setShade(false)} />
      </div>

      {showDev && (
        <div className="absolute bottom-20 left-2 z-[200] rounded-lg bg-black/80 p-2 text-[10px] text-white">
          <div>state: {state}</div>
          <div className="mt-1 flex flex-wrap gap-1">
            {(['booting', 'welcome', 'locked', 'unlocked', 'recovery', 'erasing'] as const).map((s) => (
              <button key={s} type="button" className="rounded bg-white/20 px-1" onClick={() => setState(s)}>
                {s}
              </button>
            ))}
          </div>
        </div>
      )}
    </PhoneShell>
  )
}
