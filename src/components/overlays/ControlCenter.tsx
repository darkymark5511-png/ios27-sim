import { AnimatePresence, motion } from 'framer-motion'

export function ControlCenter({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="absolute inset-0 z-[70] bg-black/40" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
          <motion.div className="mx-3 mt-14 rounded-3xl bg-white/10 p-4 backdrop-blur-xl" initial={{ y: -20 }} animate={{ y: 0 }} onClick={(e) => e.stopPropagation()}>
            <div className="text-center text-white/70 text-sm">Control Center</div>
            <button type="button" className="mt-4 w-full rounded-xl bg-white/10 py-3 text-white" onClick={onClose}>Close</button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
