import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { AppWindow } from './AppWindow'
import { useMusicStore, LIBRARY } from '../../store/musicStore'
import { iosSpring } from '../../lib/animations'

export function Music() {
  const { current, playing, position, togglePlay, setTrack, setPosition, next, prev } = useMusicStore()
  useEffect(() => {
    if (!playing || !current) return
    const id = setInterval(() => {
      setPosition(Math.min(current.duration, position + 1))
      if (position + 1 >= current.duration) next()
    }, 1000)
    return () => clearInterval(id)
  }, [playing, position, current, setPosition, next])
  const fmt = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`
  return (
    <AppWindow appId="music" title="Music">
      <div className="flex flex-col items-center px-6 pt-6">
        <motion.div className="h-56 w-56 rounded-2xl shadow-2xl" style={{ background: current?.gradient ?? '#333' }} layoutId="album-art" transition={iosSpring} />
        <div className="mt-6 text-center">
          <div className="text-[22px] font-semibold">{current?.title ?? '—'}</div>
          <div className="text-[15px] text-white/50">{current?.artist}</div>
        </div>
        <div className="mt-6 w-full">
          <input type="range" min={0} max={current?.duration ?? 1} value={position} onChange={(e) => setPosition(Number(e.target.value))} className="w-full" />
          <div className="mt-1 flex justify-between text-[12px] text-white/40 tabular-nums">
            <span>{fmt(position)}</span><span>{fmt(current?.duration ?? 0)}</span>
          </div>
        </div>
        <div className="mt-6 flex items-center gap-10">
          <motion.button type="button" whileTap={{ scale: 0.9 }} onClick={prev} className="text-2xl">⏮</motion.button>
          <motion.button type="button" whileTap={{ scale: 0.9 }} onClick={togglePlay}
            className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-2xl text-black">
            {playing ? '❚❚' : '▶'}
          </motion.button>
          <motion.button type="button" whileTap={{ scale: 0.9 }} onClick={next} className="text-2xl">⏭</motion.button>
        </div>
        <div className="mt-10 w-full">
          <div className="mb-2 text-[13px] font-semibold text-white/50">Library</div>
          {LIBRARY.map((t) => (
            <button key={t.id} type="button" onClick={() => setTrack(t)} className="flex w-full items-center gap-3 border-b border-white/10 py-3 text-left">
              <div className="h-10 w-10 rounded-lg" style={{ background: t.gradient }} />
              <div>
                <div className="text-[15px] font-medium">{t.title}</div>
                <div className="text-[12px] text-white/45">{t.artist}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </AppWindow>
  )
}
