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
    : {
        background: `
          radial-gradient(ellipse 120% 80% at 20% 10%, rgba(120,80,220,0.55) 0%, transparent 50%),
          radial-gradient(ellipse 90% 70% at 85% 25%, rgba(40,120,255,0.4) 0%, transparent 45%),
          radial-gradient(ellipse 70% 50% at 50% 90%, rgba(180,40,120,0.35) 0%, transparent 50%),
          ${wall.gradient}
        `,
      }

  return (
    <div className="flex h-full w-full items-center justify-center bg-[#050505] p-0 sm:p-6">
      <div
        className="phone-shell relative h-full max-h-[100dvh] w-full max-w-[430px] overflow-hidden bg-black shadow-phone sm:max-h-[900px] sm:rounded-[54px] sm:border-[10px] sm:border-[#1a1a1a]"
        style={{ aspectRatio: '9 / 19.5' }}
      >
        <div className="absolute inset-0 transition-opacity duration-700" style={wallpaperStyle} />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.35) 100%)',
          }}
        />
        {flashlight && state === 'locked' && (
          <div className="pointer-events-none absolute inset-0 z-[5] bg-white/45" />
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
