import { motion } from 'framer-motion'
import { useClock, formatTime, formatDate } from '../../hooks/useClock'
import { useAppStore } from '../../store/appStore'
import { useNotificationsStore } from '../../store/notificationsStore'
import { FlashlightIcon, CameraIcon } from '../../lib/icons'
import { GlassPanel } from '../ui/GlassPanel'

export function LockScreen() {
  const now = useClock()
  const { setState, toggleFlashlight, flashlight, recoverySheet, showRecoverySheet, enterRecovery } = useAppStore()
  const items = useNotificationsStore((s) => s.items)

  return (
    <motion.div className="absolute inset-0 z-30 flex flex-col" initial={{ y: 0 }} exit={{ y: '-100%' }} transition={{ type: 'spring', stiffness: 300, damping: 32 }}>
      <div className="flex flex-1 flex-col items-center pt-[100px]">
        <div className="text-[15px] font-medium tracking-wide text-white/80">{formatDate(now)}</div>
        <div className="mt-1 text-[84px] font-semibold leading-none tracking-tighter text-white tabular-nums">{formatTime(now)}</div>
        <div className="mt-4 text-[15px] text-white/70">🌤 72° · San Francisco</div>
        <div className="mt-10 w-full max-w-[360px] space-y-2 px-4">
          {items.slice(0, 3).map((n) => (
            <GlassPanel key={n.id} className="rounded-2xl px-4 py-3">
              <div className="text-[13px] font-semibold text-white/90">{n.app}</div>
              <div className="text-[15px] font-medium text-white">{n.title}</div>
              <div className="text-[13px] text-white/60 line-clamp-1">{n.body}</div>
            </GlassPanel>
          ))}
        </div>
      </div>
      <div className="mb-16 flex justify-between px-10">
        <button type="button" onClick={toggleFlashlight} className={`flex h-12 w-12 items-center justify-center rounded-full ${flashlight ? 'bg-white text-black' : 'bg-white/15 text-white'}`} aria-label="Flashlight">
          <FlashlightIcon size={20} />
        </button>
        <button type="button" className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-white" aria-label="Camera" onClick={() => useAppStore.getState().open('camera')}>
          <CameraIcon size={20} />
        </button>
      </div>
      {recoverySheet && (
        <div className="absolute inset-0 z-50 flex items-end bg-black/40" onClick={() => showRecoverySheet(false)}>
          <motion.div initial={{ y: 200 }} animate={{ y: 0 }} className="w-full px-3 pb-8" onClick={(e) => e.stopPropagation()}>
            <GlassPanel className="overflow-hidden rounded-2xl">
              <button type="button" className="w-full py-3.5 text-center text-[17px] text-white active:bg-white/10" onClick={() => { showRecoverySheet(false); useAppStore.getState().setState('booting') }}>Restart</button>
              <div className="h-px bg-white/10" />
              <button type="button" className="w-full py-3.5 text-center text-[17px] text-white active:bg-white/10" onClick={() => { showRecoverySheet(false); enterRecovery() }}>Enter Recovery Mode</button>
              <div className="h-px bg-white/10" />
              <button type="button" className="w-full py-3.5 text-center text-[17px] font-semibold text-[var(--accent)] active:bg-white/10" onClick={() => showRecoverySheet(false)}>Cancel</button>
            </GlassPanel>
          </motion.div>
        </div>
      )}
    </motion.div>
  )
}
