import { motion, AnimatePresence } from 'framer-motion'
import { useNotificationsStore } from '../../store/notificationsStore'
import { GlassPanel } from '../ui/GlassPanel'
import { iosSpring } from '../../lib/animations'

export function NotificationShade({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { items, dismiss, clearAll } = useNotificationsStore()
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="absolute inset-0 z-[70]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" onClick={onClose} />
          <motion.div
            className="relative mx-3 mt-14 max-h-[70%] space-y-2 overflow-y-auto"
            initial={{ y: -40 }}
            animate={{ y: 0 }}
            exit={{ y: -40 }}
            transition={iosSpring}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.15}
            onDragEnd={(_, info) => { if (info.offset.y > 80) onClose() }}
          >
            {items.length === 0 && <div className="py-10 text-center text-white/40">No Notifications</div>}
            {items.map((n) => (
              <GlassPanel key={n.id} className="rounded-2xl px-4 py-3">
                <div className="flex justify-between">
                  <span className="text-[13px] font-semibold text-white/70">{n.app}</span>
                  <button type="button" className="text-[12px] text-white/40" onClick={() => dismiss(n.id)}>Clear</button>
                </div>
                <div className="text-[15px] font-medium text-white">{n.title}</div>
                <div className="text-[13px] text-white/55">{n.body}</div>
              </GlassPanel>
            ))}
            {items.length > 0 && (
              <button type="button" className="w-full py-3 text-center text-[15px] text-[var(--accent)]" onClick={clearAll}>Clear All</button>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
