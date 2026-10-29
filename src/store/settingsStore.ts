import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { nsKey } from '../lib/persistence'

export type Appearance = 'light' | 'dark' | 'auto'
export type FocusMode = 'none' | 'dnd' | 'sleep' | 'work'

interface SettingsState {
  airplane: boolean
  wifi: boolean
  bluetooth: boolean
  cellular: boolean
  wifiNetwork: string
  brightness: number
  volume: number
  appearance: Appearance
  accent: string
  reduceMotion: boolean
  reduceTransparency: boolean
  increaseContrast: boolean
  boldText: boolean
  haptics: boolean
  lowPower: boolean
  orientationLock: boolean
  focus: FocusMode
  textSize: number
  batteryLevel: number
  carrier: string
  model: string
  iosVersion: string
  set: <K extends keyof SettingsState>(key: K, value: SettingsState[K]) => void
  toggle: (key: 'airplane' | 'wifi' | 'bluetooth' | 'cellular' | 'haptics' | 'lowPower' | 'orientationLock' | 'reduceMotion' | 'reduceTransparency' | 'increaseContrast' | 'boldText') => void
  reset: () => void
}

const defaults: Omit<SettingsState, 'set' | 'toggle' | 'reset'> = {
  airplane: false,
  wifi: true,
  bluetooth: true,
  cellular: true,
  wifiNetwork: 'Home',
  brightness: 0.85,
  volume: 0.6,
  appearance: 'dark',
  accent: '#0a84ff',
  reduceMotion: false,
  reduceTransparency: false,
  increaseContrast: false,
  boldText: false,
  haptics: true,
  lowPower: false,
  orientationLock: false,
  focus: 'none',
  textSize: 1,
  batteryLevel: 78,
  carrier: 'Carrier',
  model: 'iPhone 27 Pro',
  iosVersion: '27.0',
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      ...defaults,
      set: (key, value) => set({ [key]: value } as Partial<SettingsState>),
      toggle: (key) => set((s) => ({ [key]: !s[key] })),
      reset: () => set({ ...defaults }),
    }),
    { name: nsKey('settings') }
  )
)
