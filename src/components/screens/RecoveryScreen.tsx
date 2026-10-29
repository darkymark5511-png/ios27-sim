import { useState } from 'react'
import { motion } from 'framer-motion'
import { AppleLogo, WrenchIcon } from '../../lib/icons'
import { useAppStore } from '../../store/appStore'
import { useSettingsStore } from '../../store/settingsStore'
import { GlassPanel } from '../ui/GlassPanel'

export function RecoveryScreen() {
  const { exitRecovery, startErase, setState } = useAppStore()
  const model = useSettingsStore((s) => s.model)
  const [updating, setUpdating] = useState(false)
  const [updated, setUpdated] = useState(false)
  const [more, setMore] = useState(false)
  const [confirmErase, setConfirmErase] = useState(false)
  const [slide, setSlide] = useState(0)

  return (
    <div className="absolute inset-0 z-[90] flex flex-col items-center bg-black px-6 pt-16 text-white">
      <AppleLogo size={28} className="text-white/50" />
      <WrenchIcon size={48} className="mt-10 text-white/80" />
      <h1 className="mt-6 text-[22px] font-semibold">{model}</h1>
      <p className="mt-2 text-center text-[15px] text-white/50">There is a problem with your iPhone.</p>
      <div className="mt-12 w-full max-w-[360px] space-y-1">
        {!updating && !updated && (
          <button type="button" onClick={() => { setUpdating(true); setTimeout(() => { setUpdating(false); setUpdated(true) }, 3000) }} className="w-full rounded-xl bg-white/10 py-3.5 text-[17px]">Update</button>
        )}
        {updating && <div className="py-6 text-center text-white/60">Updating…</div>}
        {updated && (
          <>
            <p className="py-2 text-center text-[14px] text-white/70">Your iPhone has been updated.</p>
            <button type="button" onClick={() => setState('booting')} className="w-full rounded-xl bg-white/10 py-3.5 text-[17px]">Restart</button>
          </>
        )}
        <button type="button" onClick={() => setConfirmErase(true)} className="w-full rounded-xl bg-white/10 py-3.5 text-[17px]">Restore</button>
        <button type="button" onClick={() => setMore((v) => !v)} className="w-full py-3 text-center text-[15px] text-white/50">More Options</button>
        {more && (
          <div className="space-y-1 pt-2">
            <button type="button" onClick={() => setConfirmErase(true)} className="w-full rounded-xl bg-white/10 py-3.5 text-[17px] text-[#ff453a]">Erase All Content and Settings</button>
            <button type="button" onClick={() => exitRecovery()} className="w-full rounded-xl bg-white/10 py-3.5 text-[17px]">Exit Recovery</button>
          </div>
        )}
      </div>
      {confirmErase && (
        <div className="absolute inset-0 z-20 flex items-end bg-black/70" onClick={() => setConfirmErase(false)}>
          <motion.div initial={{ y: 300 }} animate={{ y: 0 }} className="w-full px-3 pb-10" onClick={(e) => e.stopPropagation()}>
            <GlassPanel className="rounded-2xl p-5">
              <div className="text-center text-[17px] font-semibold text-white">Erase All Content and Settings?</div>
              <p className="mt-2 text-center text-[13px] text-white/55">This cannot be undone.</p>
              <button type="button" className="mt-4 w-full rounded-xl bg-[#ff453a] py-3.5 text-[17px]" onClick={() => { setConfirmErase(false); startErase(); setTimeout(() => useAppStore.getState().finishErase(), 2000) }}>Erase iPhone</button>
              <button type="button" className="mt-2 w-full py-3 text-[17px] text-[var(--accent)]" onClick={() => setConfirmErase(false)}>Cancel</button>
            </GlassPanel>
          </motion.div>
        </div>
      )}
    </div>
  )
}
