import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { nsKey } from '../lib/persistence'

export interface Track {
  id: string
  title: string
  artist: string
  duration: number
  gradient: string
}

export const LIBRARY: Track[] = [
  { id: 't1', title: 'Midnight Drive', artist: 'Neon Coast', duration: 214, gradient: 'linear-gradient(135deg,#1e3a8a,#7c3aed)' },
  { id: 't2', title: 'Glass Waves', artist: 'Aurora Lab', duration: 198, gradient: 'linear-gradient(135deg,#0f766e,#22d3ee)' },
  { id: 't3', title: 'Soft Static', artist: 'Lumen', duration: 241, gradient: 'linear-gradient(135deg,#9d174d,#f472b6)' },
  { id: 't4', title: 'Orbit', artist: 'Vanta', duration: 187, gradient: 'linear-gradient(135deg,#1e293b,#64748b)' },
  { id: 't5', title: 'Afterglow', artist: 'Solstice', duration: 226, gradient: 'linear-gradient(135deg,#b45309,#fbbf24)' },
]

interface MusicState {
  current: Track | null
  playing: boolean
  position: number
  volume: number
  setTrack: (t: Track) => void
  togglePlay: () => void
  setPosition: (p: number) => void
  setVolume: (v: number) => void
  next: () => void
  prev: () => void
  reset: () => void
}

export const useMusicStore = create<MusicState>()(
  persist(
    (set, get) => ({
      current: LIBRARY[0],
      playing: false,
      position: 0,
      volume: 0.6,
      setTrack: (t) => set({ current: t, position: 0, playing: true }),
      togglePlay: () => set((s) => ({ playing: !s.playing })),
      setPosition: (p) => set({ position: p }),
      setVolume: (v) => set({ volume: v }),
      next: () => {
        const { current } = get()
        const idx = LIBRARY.findIndex((t) => t.id === current?.id)
        set({ current: LIBRARY[(idx + 1) % LIBRARY.length], position: 0, playing: true })
      },
      prev: () => {
        const { current } = get()
        const idx = LIBRARY.findIndex((t) => t.id === current?.id)
        set({ current: LIBRARY[(idx - 1 + LIBRARY.length) % LIBRARY.length], position: 0, playing: true })
      },
      reset: () => set({ current: LIBRARY[0], playing: false, position: 0, volume: 0.6 }),
    }),
    { name: nsKey('music'), partialize: (s) => ({ current: s.current, volume: s.volume }) }
  )
)
