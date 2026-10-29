import { motion, AnimatePresence } from 'framer-motion'
import { useClock, formatTime, formatDate } from '../../hooks/useClock'
import { useAppStore } from '../../store/appStore'
import { useNotificationsStore } from '../../store/notificationsStore'
import { FlashlightIcon, CameraIcon } from '../../lib/icons'
import { GlassPanel } from '../ui/GlassPanel'
import { iosSpring } from '../../lib/animations'

export function LockScreen() {
  const now = useClock()
  const { toggleFlashlight, flashlight, recoverySheet, showRecoverySheet, enterRecovery, setState } =
    useAppStore()
  const items = useNotificationsStore((s) => s.items)

  return (
    <motion.div
      className="absolute inset-0 z-30 flex flex-col"
      initial={{ y: 0, opacity: 1 }}
      exit={{ y: '-110%', opacity: 0.6 }}
      transition={iosSpring}
    >
      <div className="flex flex-1 flex-col items-center pt-[100px]">
        <div className="clock-shadow text-[15px] font-medium tracking-wide text-white/90">
          {formatDate(now)}
        </div>
        <div className="clock-shadow mt-1 text-[88px] font-semibold leading-none tracking-tighter text-white tabular-nums">
          {formatTime(now)}
        </div>
        <div className="mt-3 text-[15px] text-white/75 drop-shadow">🌤 72° · San Francisco</div>

        <div className="mt-10 w-full max-w-[360px] space-y-2.5 px-4">
          {items.slice(0, 3).map((n, i) => (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...iosSpring, delay: 0.08 * i }}
            >
              <GlassPanel className="rounded-2xl px-4 py-3">
                <div className="text-[13px] font-semibold text-white/90">{n.app}</div>
                <div className="text-[15px] font-medium text-white">{n.title}</div>
                <div className="line-clamp-1 text-[13px] text-white/60">{n.body}</div>
              </GlassPanel>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mb-16 flex justify-between px-10">
        <motion.button
          type="button"
          whileTap={{ scale: 0.9 }}
          onClick={toggleFlashlight}
          className={`flex h-12 w-12 items-center justify-center rounded-full ${
            flashlight ? 'bg-white text-black' : 'bg-white/15 text-white backdrop-blur-md'
          }`}
          aria-label="Flashlight"
        >
          <FlashlightIcon size={20} />
        </motion.button>
        <motion.button
          type="button"
          whileTap={{ scale: 0.9 }}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md"
          aria-label="Camera"
          onClick={() => useAppStore.getState().open('camera')}
        >
          <CameraIcon size={20} />
        </motion.button>
      </div>

      <AnimatePresence>
        {recoverySheet && (
          <motion.div
            className="absolute inset-0 z-50 flex items-end bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => showRecoverySheet(false)}
          >
            <motion.div
              initial={{ y: 280 }}
              animate={{ y: 0 }}
              exit={{ y: 280 }}
              transition={iosSpring}
              className="w-full px-3 pb-8"
              onClick={(e) => e.stopPropagation()}
            >
              <GlassPanel className="overflow-hidden rounded-2xl">
                <button
                  type="button"
                  className="w-full py-3.5 text-center text-[17px] text-white active:bg-white/10"
                  onClick={() => {
                    showRecoverySheet(false)
                    setState('booting')
                  }}
                >
                  Restart
                </button>
                <div className="h-px bg-white/10" />
                <button
                  type="button"
                  className="w-full py-3.5 text-center text-[17px] text-white active:bg-white/10"
                  onClick={() => {
                    showRecoverySheet(false)
                    enterRecovery()
                  }}
                >
                  Enter Recovery Mode
                </button>
                <div className="h-px bg-white/10" />
                <button
                  type="button"
                  className="w-full py-3.5 text-center text-[17px] font-semibold text-[var(--accent)] active:bg-white/10"
                  onClick={() => showRecoverySheet(false)}
                >
                  Cancel
                </button>
              </GlassPanel>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
