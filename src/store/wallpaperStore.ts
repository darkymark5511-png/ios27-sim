import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { nsKey } from '../lib/persistence'

export const WALLPAPERS = [
  { id: 'aurora', name: 'Aurora', gradient: 'linear-gradient(160deg, #0f0c29 0%, #302b63 50%, #24243e 100%)', luminance: 'dark' },
  { id: 'sunset', name: 'Sunset', gradient: 'linear-gradient(160deg, #ff6b6b 0%, #feca57 45%, #48dbfb 100%)', luminance: 'light' },
  { id: 'ocean', name: 'Ocean', gradient: 'linear-gradient(160deg, #0c1445 0%, #1a3a6b 40%, #2d6a9f 100%)', luminance: 'dark' },
  { id: 'mint', name: 'Mint', gradient: 'linear-gradient(160deg, #134e4a 0%, #14b8a6 50%, #99f6e4 100%)', luminance: 'dark' },
  { id: 'violet', name: 'Violet', gradient: 'linear-gradient(160deg, #2e1065 0%, #7c3aed 50%, #c4b5fd 100%)', luminance: 'dark' },
  { id: 'noir', name: 'Noir', gradient: 'linear-gradient(160deg, #0a0a0a 0%, #1a1a1a 50%, #2a2a2a 100%)', luminance: 'dark' },
  { id: 'dawn', name: 'Dawn', gradient: 'linear-gradient(160deg, #fdf2f8 0%, #fce7f3 40%, #e0e7ff 100%)', luminance: 'light' },
  { id: 'ember', name: 'Ember', gradient: 'linear-gradient(160deg, #451a03 0%, #c2410c 40%, #fbbf24 100%)', luminance: 'dark' },
] as const

export type WallpaperId = (typeof WALLPAPERS)[number]['id']

interface WallpaperState {
  id: WallpaperId
  customUrl: string | null
  setId: (id: WallpaperId) => void
  setCustom: (url: string | null) => void
  current: () => (typeof WALLPAPERS)[number]
  reset: () => void
}

export const useWallpaperStore = create<WallpaperState>()(
  persist(
    (set, get) => ({
      id: 'aurora',
      customUrl: null,
      setId: (id) => set({ id, customUrl: null }),
      setCustom: (url) => set({ customUrl: url }),
      current: () => WALLPAPERS.find((w) => w.id === get().id) ?? WALLPAPERS[0],
      reset: () => set({ id: 'aurora', customUrl: null }),
    }),
    { name: nsKey('wallpaper') }
  )
)
