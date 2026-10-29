import { useSettingsStore } from '../store/settingsStore'

export function useHaptic() {
  const enabled = useSettingsStore((s) => s.haptics)
  return (ms: number | number[] = 10) => {
    if (!enabled || typeof navigator === 'undefined' || !navigator.vibrate) return
    try {
      navigator.vibrate(ms)
    } catch {
      /* desktop / blocked */
    }
  }
}
