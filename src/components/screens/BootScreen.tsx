import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { AppleLogo } from '../../lib/icons'
import { useAppStore, shouldShortBoot, markBooted } from '../../store/appStore'

export function BootScreen() {
  const finishBoot = useAppStore((s) => s.finishBoot)
  const short = shouldShortBoot()

  useEffect(() => {
    const total = short ? 400 : 1800
    const t = setTimeout(() => {
      markBooted()
      finishBoot()
    }, total)
    return () => clearTimeout(t)
  }, [finishBoot, short])

  return (
    <div className="absolute inset-0 z-[100] flex items-center justify-center bg-black">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: short ? 0.15 : 0.3 }}
      >
        <AppleLogo size={short ? 48 : 80} className="text-white" />
      </motion.div>
    </div>
  )
}
