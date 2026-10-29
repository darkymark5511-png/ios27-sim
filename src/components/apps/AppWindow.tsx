import { motion } from 'framer-motion'
import { type ReactNode } from 'react'
import { useAppStore, type OpenApp } from '../../store/appStore'
import { ChevronLeft } from '../../lib/icons'
import { iosSpring } from '../../lib/animations'

interface Props {
  appId: OpenApp
  title: string
  children: ReactNode
  onBack?: () => void
  hideHeader?: boolean
}

export function AppWindow({ appId, title, children, onBack, hideHeader }: Props) {
  const closeApp = useAppStore((s) => s.closeApp)
  const openApp = useAppStore((s) => s.openApp)

  if (openApp !== appId) return null

  return (
    <motion.div
      layoutId={`app-${appId}`}
      className="absolute inset-0 z-40 flex flex-col bg-[#000] text-white"
      initial={{ borderRadius: 22 }}
      animate={{ borderRadius: 0 }}
      transition={iosSpring}
      style={{ overflow: 'hidden' }}
    >
      {!hideHeader && (
        <div className="relative flex h-[54px] items-end justify-between px-4 pb-2 pt-[54px]">
          <motion.button
            type="button"
            whileTap={{ scale: 0.92 }}
            onClick={onBack ?? closeApp}
            className="flex items-center gap-0.5 text-[var(--accent)]"
            aria-label="Back"
          >
            <ChevronLeft size={22} />
            <span className="text-[17px]">Back</span>
          </motion.button>
          <div className="absolute left-1/2 -translate-x-1/2 text-[17px] font-semibold">{title}</div>
          <div className="w-16" />
        </div>
      )}
      <div className={`flex-1 overflow-y-auto no-scrollbar ${hideHeader ? 'pt-[54px]' : ''}`}>
        {children}
      </div>
    </motion.div>
  )
}
