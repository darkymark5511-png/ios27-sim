import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { AppleLogo } from '../../lib/icons'
import { useAppStore, shouldShortBoot, markBooted } from '../../store/appStore'

export function BootScreen() {
  const finishBoot = useAppStore((s) => s.finishBoot)
  const short = shouldShortBoot()
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const hold = short ? 200 : 1400
    const fade = short ? 200 : 500
    const t1 = setTimeout(() => setVisible(false), hold)
    const t2 = setTimeout(() => {
      markBooted()
      finishBoot()
    }, hold + fade)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [finishBoot, short])

  return (
    <div className="absolute inset-0 z-[200] flex items-center justify-center bg-black">
      <AnimatePresence>
        {visible && (
          <motion.div
            key="logo"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <AppleLogo size={short ? 52 : 80} className="text-white" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
