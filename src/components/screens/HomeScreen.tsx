import { motion } from 'framer-motion'
import { useAppStore, type OpenApp } from '../../store/appStore'
import { ClockIcon, GearIcon, NotesIcon, CalcIcon, SafariIcon, MusicIcon, PhotosIcon, WeatherIcon, CameraIcon } from '../../lib/icons'
import { GlassPanel } from '../ui/GlassPanel'
import { useMusicStore } from '../../store/musicStore'

const APPS: { id: OpenApp; name: string; icon: React.ReactNode; bg: string }[] = [
  { id: 'clock', name: 'Clock', icon: <ClockIcon size={28} className="text-white" />, bg: 'linear-gradient(135deg,#1c1c1e,#3a3a3c)' },
  { id: 'settings', name: 'Settings', icon: <GearIcon size={28} className="text-white" />, bg: 'linear-gradient(135deg,#8e8e93,#636366)' },
  { id: 'notes', name: 'Notes', icon: <NotesIcon size={28} className="text-[#1c1c1e]" />, bg: 'linear-gradient(135deg,#ffd60a,#ff9f0a)' },
  { id: 'calculator', name: 'Calculator', icon: <CalcIcon size={28} className="text-white" />, bg: 'linear-gradient(135deg,#1c1c1e,#3a3a3c)' },
  { id: 'safari', name: 'Safari', icon: <SafariIcon size={28} className="text-white" />, bg: 'linear-gradient(135deg,#0a84ff,#5ac8fa)' },
  { id: 'music', name: 'Music', icon: <MusicIcon size={28} className="text-white" />, bg: 'linear-gradient(135deg,#ff2d55,#ff375f)' },
  { id: 'photos', name: 'Photos', icon: <PhotosIcon size={28} className="text-white" />, bg: 'linear-gradient(135deg,#ff6482,#ff2d55)' },
  { id: 'weather', name: 'Weather', icon: <WeatherIcon size={28} className="text-white" />, bg: 'linear-gradient(135deg,#64d2ff,#0a84ff)' },
  { id: 'camera', name: 'Camera', icon: <CameraIcon size={28} className="text-white" />, bg: 'linear-gradient(135deg,#8e8e93,#636366)' },
]

function AppIcon({ id, name, icon, bg }: (typeof APPS)[0]) {
  const open = useAppStore((s) => s.open)
  return (
    <button type="button" className="flex flex-col items-center gap-1" onClick={() => open(id)}>
      <motion.div layoutId={`app-${id}`} className="squircle flex h-[60px] w-[60px] items-center justify-center shadow-lg" style={{ background: bg }} whileTap={{ scale: 0.92 }}>
        {icon}
      </motion.div>
      <span className="text-[11px] font-medium text-white drop-shadow">{name}</span>
    </button>
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
    <div className="absolute inset-0 z-20 flex flex-col pt-[62px] pb-[110px]">
      <div className="grid flex-1 grid-cols-4 content-start gap-x-2 gap-y-5 px-5">
        {APPS.map((a) => (
          <AppIcon key={a.id!} {...a} />
        ))}
      </div>
      {current && (
        <button type="button" onClick={() => open('music')} className="mx-4 mb-3">
          <GlassPanel className="flex items-center gap-3 rounded-2xl px-3 py-2">
            <div className="h-10 w-10 rounded-lg" style={{ background: current.gradient }} />
            <div className="min-w-0 flex-1 text-left">
              <div className="truncate text-[13px] font-semibold text-white">{current.title}</div>
              <div className="truncate text-[11px] text-white/60">{current.artist}</div>
            </div>
            <span className="text-white/80 text-sm">{playing ? '❚❚' : '▶'}</span>
          </GlassPanel>
        </button>
      )}
      <div className="absolute bottom-10 left-3 right-3">
        <GlassPanel className="flex items-center justify-around rounded-[28px] px-2 py-3">
          {APPS.slice(0, 4).map((app) => (
            <button key={app.id} type="button" onClick={() => open(app.id)} className="squircle flex h-[54px] w-[54px] items-center justify-center" style={{ background: app.bg }}>
              {app.icon}
            </button>
          ))}
        </GlassPanel>
      </div>
    </div>
  )
}
