import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { nsKey, getLocalFlag, setLocalFlag, getSessionFlag, setSessionFlag, clearNamespacedStorage } from '../lib/persistence'

export type AppState =
  | 'booting'
  | 'welcome'
  | 'locked'
  | 'unlocked'
  | 'switcher'
  | 'recovery'
  | 'erasing'

export type OpenApp =
  | null
  | 'clock'
  | 'settings'
  | 'notes'
  | 'calculator'
  | 'safari'
  | 'music'
  | 'photos'
  | 'weather'
  | 'camera'

interface AppStore {
  state: AppState
  openApp: OpenApp
  appStack: OpenApp[]
  recoverySheet: boolean
  wipeIntent: boolean
  showDev: boolean
  flashlight: boolean
  setState: (s: AppState) => void
  open: (app: OpenApp) => void
  closeApp: () => void
  showRecoverySheet: (v: boolean) => void
  setWipeIntent: (v: boolean) => void
  toggleFlashlight: () => void
  reset: () => void
  finishBoot: () => void
  completeWelcome: () => void
  enterRecovery: () => void
  exitRecovery: () => void
  startErase: () => void
  finishErase: () => void
}

const initial: Pick<AppStore, 'state' | 'openApp' | 'appStack' | 'recoverySheet' | 'wipeIntent' | 'flashlight'> = {
  state: 'booting',
  openApp: null,
  appStack: [],
  recoverySheet: false,
  wipeIntent: false,
  flashlight: false,
}

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      ...initial,
      showDev: typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('dev') === '1',
      setState: (s) => set({ state: s }),
      open: (app) =>
        set((st) => ({
          openApp: app,
          appStack: app ? [...st.appStack.filter((a) => a !== app), app] : st.appStack,
          state: st.state === 'locked' ? 'unlocked' : st.state,
        })),
      closeApp: () => set({ openApp: null }),
      showRecoverySheet: (v) => set({ recoverySheet: v }),
      setWipeIntent: (v) => set({ wipeIntent: v }),
      toggleFlashlight: () => set((s) => ({ flashlight: !s.flashlight })),
      reset: () => set({ ...initial, showDev: get().showDev }),
      finishBoot: () => {
        const welcomed = getLocalFlag('welcomed')
        const mode = new URLSearchParams(window.location.search).get('mode')
        if (mode === 'recovery') {
          set({ state: 'recovery' })
          return
        }
        if (!welcomed) set({ state: 'welcome' })
        else set({ state: 'locked' })
      },
      completeWelcome: () => {
        setLocalFlag('welcomed', true)
        set({ state: 'locked' })
      },
      enterRecovery: () => set({ state: 'recovery', recoverySheet: false, openApp: null }),
      exitRecovery: () => set({ state: 'booting' }),
      startErase: () => set({ state: 'erasing', wipeIntent: true }),
      finishErase: () => {
        clearNamespacedStorage()
        setLocalFlag('welcomed', false)
        set({ ...initial, state: 'booting', showDev: get().showDev })
      },
    }),
    {
      name: nsKey('app'),
      partialize: (s) => ({ flashlight: s.flashlight }),
    }
  )
)

export function shouldShortBoot() {
  return getSessionFlag('booted')
}

export function markBooted() {
  setSessionFlag('booted', true)
}
