import { type ReactNode, useEffect } from 'react'
import { useSettingsStore } from '../../store/settingsStore'
import { useWallpaperStore } from '../../store/wallpaperStore'
import { StatusBar } from './StatusBar'
import { DynamicIsland } from './DynamicIsland'
import { HomeIndicator } from './HomeIndicator'
import { useAppStore } from '../../store/appStore'

interface Props {
  children: ReactNode
}

export function PhoneShell({ children }: Props) {
  const { brightness, appearance, reduceTransparency, increaseContrast, accent, textSize } =
    useSettingsStore()
  const wall = useWallpaperStore((s) => s.current())
  const customUrl = useWallpaperStore((s) => s.customUrl)
  const state = useAppStore((s) => s.state)
  const flashlight = useAppStore((s) => s.flashlight)

  useEffect(() => {
    document.documentElement.style.setProperty('--brightness', String(brightness))
    document.documentElement.style.setProperty('--accent', accent)
    document.documentElement.style.setProperty('--font-scale', String(textSize))
    document.documentElement.setAttribute('data-theme', appearance === 'auto' ? 'dark' : appearance)
    document.documentElement.classList.toggle('reduce-transparency', reduceTransparency)
    document.documentElement.classList.toggle('increase-contrast', increaseContrast)
  }, [brightness, appearance, reduceTransparency, increaseContrast, accent, textSize])

  const showChrome = !['booting', 'recovery', 'erasing'].includes(state)
  const wallpaperStyle = customUrl
    ? { backgroundImage: `url(${customUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : { background: wall.gradient }

  return (
    <div className="flex h-full w-full items-center justify-center bg-[#0a0a0a] p-0 sm:p-6">
      <div
        className="phone-shell relative h-full max-h-[100dvh] w-full max-w-[430px] overflow-hidden bg-black shadow-phone sm:max-h-[900px] sm:rounded-[54px] sm:border-[10px] sm:border-[#1a1a1a]"
        style={{ aspectRatio: '9 / 19.5' }}
      >
        <div className="absolute inset-0" style={wallpaperStyle} />
        {flashlight && state === 'locked' && (
          <div className="absolute inset-0 z-[5] bg-white/40 pointer-events-none" />
        )}
        <div className="absolute inset-0 overflow-hidden sm:rounded-[44px]">{children}</div>
        {showChrome && (
          <>
            <StatusBar showCarrier={state === 'locked'} />
            <DynamicIsland />
            <HomeIndicator />
          </>
        )}
      </div>
    </div>
  )
}
