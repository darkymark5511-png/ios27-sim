import { motion, AnimatePresence } from 'framer-motion'
import { useSettingsStore } from '../../store/settingsStore'
import { useMusicStore } from '../../store/musicStore'
import { useAppStore } from '../../store/appStore'
import { AirplaneIcon, CellularIcon, WifiIcon, BluetoothIcon, SunIcon, VolumeIcon, FlashlightIcon, CalcIcon, ClockIcon } from '../../lib/icons'
import { Slider } from '../ui/Slider'
import { iosSpring } from '../../lib/animations'

interface Props {
  open: boolean
  onClose: () => void
}

export function ControlCenter({ open, onClose }: Props) {
  const s = useSettingsStore()
  const music = useMusicStore()
  const { toggleFlashlight, open: openApp, flashlight } = useAppStore()

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="absolute inset-0 z-[70]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/35 backdrop-blur-[2px]" onClick={onClose} />
          <motion.div
            className="relative mx-3 mt-14 space-y-3"
            initial={{ y: -48, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -48, opacity: 0 }}
            transition={iosSpring}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.15}
            onDragEnd={(_, info) => { if (info.offset.y > 80 || info.velocity.y > 400) onClose() }}
          >
            <div className="grid grid-cols-2 gap-3">
              <div className="glass grid grid-cols-2 gap-3 rounded-3xl p-3">
                <CCToggle active={s.airplane} onClick={() => s.toggle('airplane')} icon={<AirplaneIcon size={20} />} label="Airplane" />
                <CCToggle active={s.cellular && !s.airplane} onClick={() => s.toggle('cellular')} icon={<CellularIcon size={18} />} label="Cellular" />
                <CCToggle active={s.wifi && !s.airplane} onClick={() => s.toggle('wifi')} icon={<WifiIcon size={18} />} label="Wi-Fi" />
                <CCToggle active={s.bluetooth} onClick={() => s.toggle('bluetooth')} icon={<BluetoothIcon size={18} />} label="Bluetooth" />
              </div>
              <div className="glass flex flex-col justify-between rounded-3xl p-3">
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-lg" style={{ background: music.current?.gradient }} />
                  <div className="min-w-0">
                    <div className="truncate text-[13px] font-semibold text-white">{music.current?.title}</div>
                    <div className="truncate text-[11px] text-white/50">{music.current?.artist}</div>
                  </div>
                </div>
                <div className="mt-2 flex justify-around text-white">
                  <button type="button" onClick={music.prev}>⏮</button>
                  <button type="button" onClick={music.togglePlay}>{music.playing ? '❚❚' : '▶'}</button>
                  <button type="button" onClick={music.next}>⏭</button>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="glass rounded-3xl p-4">
                <Slider value={s.brightness} onChange={(v) => s.set('brightness', v)} icon={<SunIcon size={16} className="text-white/70" />} />
              </div>
              <div className="glass rounded-3xl p-4">
                <Slider value={s.volume} onChange={(v) => s.set('volume', v)} icon={<VolumeIcon size={16} className="text-white/70" />} />
              </div>
            </div>
            <div className="flex justify-around">
              <CCRound active={flashlight} onClick={toggleFlashlight} icon={<FlashlightIcon size={22} />} />
              <CCRound active={false} onClick={() => { openApp('clock'); onClose() }} icon={<ClockIcon size={22} />} />
              <CCRound active={false} onClick={() => { openApp('calculator'); onClose() }} icon={<CalcIcon size={22} />} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function CCToggle({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) {
  return (
    <motion.button type="button" whileTap={{ scale: 0.92 }} onClick={onClick}
      className={`flex flex-col items-center gap-1 rounded-2xl py-3 ${active ? 'bg-[var(--accent)] text-white' : 'bg-white/10 text-white'}`}>
      {icon}
      <span className="text-[10px]">{label}</span>
    </motion.button>
  )
}

function CCRound({ active, onClick, icon }: { active: boolean; onClick: () => void; icon: React.ReactNode }) {
  return (
    <motion.button type="button" whileTap={{ scale: 0.9 }} onClick={onClick}
      className={`flex h-12 w-12 items-center justify-center rounded-full ${active ? 'bg-white text-black' : 'bg-white/15 text-white'}`}>
      {icon}
    </motion.button>
  )
}
