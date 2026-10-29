import { useState } from 'react'
import { motion } from 'framer-motion'
import { AppWindow } from './AppWindow'
import { usePhotosStore } from '../../store/photosStore'
import { useHaptic } from '../../hooks/useHaptic'
import { iosSpring } from '../../lib/animations'

export function Camera() {
  const add = usePhotosStore((s) => s.add)
  const [flash, setFlash] = useState(false)
  const haptic = useHaptic()
  const shutter = () => {
    haptic([10, 30, 10])
    setFlash(true)
    setTimeout(() => setFlash(false), 120)
    const hue = Math.floor(Math.random() * 360)
    add(`linear-gradient(${hue}deg, hsl(${hue} 70% 50%), hsl(${(hue + 60) % 360} 60% 25%))`)
  }
  return (
    <AppWindow appId="camera" title="Camera" hideHeader>
      <div className="relative flex h-full flex-col bg-black">
        <div className="relative flex-1 bg-[#111]">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-16 w-16 border border-white/40" />
          </div>
          {flash && <div className="absolute inset-0 bg-white" />}
        </div>
        <div className="flex items-center justify-around bg-black py-6">
          <div className="text-[13px] text-white/50">Photo</div>
          <motion.button type="button" whileTap={{ scale: 0.9 }} transition={iosSpring} onClick={shutter}
            className="h-[72px] w-[72px] rounded-full border-4 border-white p-1" aria-label="Shutter">
            <div className="h-full w-full rounded-full bg-white" />
          </motion.button>
          <div className="text-[13px] text-white/50">Video</div>
        </div>
      </div>
    </AppWindow>
  )
}
