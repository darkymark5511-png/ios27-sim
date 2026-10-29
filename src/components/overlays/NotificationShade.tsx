import { AnimatePresence, motion } from 'framer-motion'
import { useNotificationsStore } from '../../store/notificationsStore'
import { GlassPanel } from '../ui/GlassPanel'

export function NotificationShade({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { items, clearAll } = useNotificationsStore()
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="absolute inset-0 z-[70] bg-black/40" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
          <motion.div className="mx-3 mt-14 space-y-2" initial={{ y: -20 }} animate={{ y: 0 }} onClick={(e) => e.stopPropagation()}>
            {items.map((n) => (
              <GlassPanel key={n.id} className="rounded-2xl px-4 py-3">
                <div className="text-[13px] font-semibold text-white/70">{n.app}</div>
                <div className="text-[15px] font-medium text-white">{n.title}</div>
                <div className="text-[13px] text-white/55">{n.body}</div>
              </GlassPanel>
            ))}
            {items.length > 0 && <button type="button" className="w-full py-3 text-[var(--accent)]" onClick={clearAll}>Clear All</button>}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
