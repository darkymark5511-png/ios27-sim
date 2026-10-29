import { motion } from 'framer-motion'
import { useAppStore, type OpenApp } from '../../store/appStore'
import {
  ClockIcon, GearIcon, NotesIcon, CalcIcon, SafariIcon,
  MusicIcon, PhotosIcon, WeatherIcon, CameraIcon,
} from '../../lib/icons'
import { useMusicStore } from '../../store/musicStore'
import { iosSpring } from '../../lib/animations'

const APPS: { id: OpenApp; name: string; icon: React.ReactNode; bg: string }[] = [
  { id: 'clock', name: 'Clock', icon: <ClockIcon size={28} className="text-white" />, bg: 'linear-gradient(145deg,#2c2c2e 0%,#1c1c1e 100%)' },
  { id: 'settings', name: 'Settings', icon: <GearIcon size={28} className="text-white" />, bg: 'linear-gradient(145deg,#8e8e93 0%,#636366 100%)' },
  { id: 'notes', name: 'Notes', icon: <NotesIcon size={28} className="text-[#1c1c1e]" />, bg: 'linear-gradient(145deg,#ffd60a 0%,#ff9f0a 100%)' },
  { id: 'calculator', name: 'Calculator', icon: <CalcIcon size={28} className="text-white" />, bg: 'linear-gradient(145deg,#3a3a3c 0%,#1c1c1e 100%)' },
  { id: 'safari', name: 'Safari', icon: <SafariIcon size={28} className="text-white" />, bg: 'linear-gradient(145deg,#5ac8fa 0%,#0a84ff 100%)' },
  { id: 'music', name: 'Music', icon: <MusicIcon size={28} className="text-white" />, bg: 'linear-gradient(145deg,#ff375f 0%,#ff2d55 100%)' },
  { id: 'photos', name: 'Photos', icon: <PhotosIcon size={28} className="text-white" />, bg: 'linear-gradient(145deg,#ff6482 0%,#ff2d55 100%)' },
  { id: 'weather', name: 'Weather', icon: <WeatherIcon size={28} className="text-white" />, bg: 'linear-gradient(145deg,#64d2ff 0%,#0a84ff 100%)' },
  { id: 'camera', name: 'Camera', icon: <CameraIcon size={28} className="text-white" />, bg: 'linear-gradient(145deg,#8e8e93 0%,#48484a 100%)' },
]

function AppIcon({ id, name, icon, bg }: (typeof APPS)[0]) {
  const open = useAppStore((s) => s.open)
  return (
    <motion.button
      type="button"
      className="flex flex-col items-center gap-1.5"
      onClick={() => open(id)}
      whileTap={{ scale: 0.88 }}
      transition={iosSpring}
    >
      <motion.div
        layoutId={`app-${id}`}
        className="app-icon flex h-[62px] w-[62px] items-center justify-center"
        style={{ background: bg }}
        transition={iosSpring}
      >
        {icon}
      </motion.div>
      <span className="text-[11px] font-medium text-white drop-shadow-md">{name}</span>
    </motion.button>
  )
}

export function HomeScreen() {
  const openApp = useAppStore((s) => s.openApp)
  const state = useAppStore((s) => s.state)
  const current = useMusicStore((s) => s.current)
  const playing = useMusicStore((s) => s.playing)
  const open = useAppStore((s) => s.open)

  if (state !== 'unlocked' && state !== 'switcher') return null
  if (openApp) return null

  return (
    <motion.div
      className="absolute inset-0 z-20 flex flex-col pt-[62px] pb-[110px]"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={iosSpring}
    >
      <div className="grid flex-1 grid-cols-4 content-start gap-x-1 gap-y-6 px-5">
        {APPS.map((a) => (
          <AppIcon key={a.id!} {...a} />
        ))}
      </div>

      {current && (
        <motion.button
          type="button"
          onClick={() => open('music')}
          className="mx-4 mb-3"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={iosSpring}
          whileTap={{ scale: 0.98 }}
        >
          <div className="dock-glass flex items-center gap-3 px-3 py-2.5">
            <div className="h-11 w-11 rounded-[10px] shadow-md" style={{ background: current.gradient }} />
            <div className="min-w-0 flex-1 text-left">
              <div className="truncate text-[13px] font-semibold text-white">{current.title}</div>
              <div className="truncate text-[11px] text-white/60">{current.artist}</div>
            </div>
            <span className="pr-1 text-base text-white/90">{playing ? '❚❚' : '▶'}</span>
          </div>
        </motion.button>
      )}

      <div className="absolute bottom-10 left-3 right-3">
        <div className="dock-glass flex items-center justify-around px-2 py-3.5">
          {APPS.slice(0, 4).map((app) => (
            <motion.button
              key={app.id}
              type="button"
              onClick={() => open(app.id)}
              className="app-icon flex h-[56px] w-[56px] items-center justify-center"
              style={{ background: app.bg }}
              whileTap={{ scale: 0.88 }}
              transition={iosSpring}
            >
              {app.icon}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
