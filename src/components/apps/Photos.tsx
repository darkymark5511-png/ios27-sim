import { useState } from 'react'
import { motion } from 'framer-motion'
import { AppWindow } from './AppWindow'
import { usePhotosStore } from '../../store/photosStore'
import { iosSpring } from '../../lib/animations'

export function Photos() {
  const photos = usePhotosStore((s) => s.photos)
  const [view, setView] = useState<string | null>(null)
  const idx = photos.findIndex((p) => p.id === view)
  if (view && idx >= 0) {
    return (
      <AppWindow appId="photos" title="Photo" onBack={() => setView(null)} hideHeader>
        <motion.div className="absolute inset-0" style={{ background: photos[idx].gradient }} onClick={() => setView(null)}
          initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={iosSpring} />
      </AppWindow>
    )
  }
  return (
    <AppWindow appId="photos" title="Photos">
      <div className="grid grid-cols-3 gap-0.5 p-0.5">
        {photos.map((p) => (
          <motion.button key={p.id} type="button" className="aspect-square" style={{ background: p.gradient }}
            whileTap={{ scale: 0.96 }} transition={iosSpring} onClick={() => setView(p.id)} />
        ))}
      </div>
    </AppWindow>
  )
}
