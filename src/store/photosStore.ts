import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { nsKey } from '../lib/persistence'

export interface Photo {
  id: string
  gradient: string
  createdAt: number
}

const SEED: Photo[] = Array.from({ length: 12 }, (_, i) => ({
  id: `p${i}`,
  gradient: `linear-gradient(${45 + i * 25}deg, hsl(${(i * 37) % 360} 70% 45%), hsl(${(i * 37 + 80) % 360} 60% 25%))`,
  createdAt: Date.now() - i * 3600000,
}))

interface PhotosState {
  photos: Photo[]
  add: (gradient: string) => void
  reset: () => void
}

export const usePhotosStore = create<PhotosState>()(
  persist(
    (set) => ({
      photos: SEED,
      add: (gradient) => set((s) => ({ photos: [{ id: `p${Date.now()}`, gradient, createdAt: Date.now() }, ...s.photos] })),
      reset: () => set({ photos: SEED }),
    }),
    { name: nsKey('photos') }
  )
)
