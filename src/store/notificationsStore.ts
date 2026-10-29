import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { nsKey } from '../lib/persistence'

export interface Notification {
  id: string
  app: string
  title: string
  body: string
  time: number
  read: boolean
}

interface NotifState {
  items: Notification[]
  add: (n: Omit<Notification, 'id' | 'time' | 'read'>) => void
  dismiss: (id: string) => void
  clearAll: () => void
  reset: () => void
}

export const useNotificationsStore = create<NotifState>()(
  persist(
    (set) => ({
      items: [
        { id: 'n1', app: 'Messages', title: 'Alex', body: 'You free later?', time: Date.now() - 1000 * 60 * 12, read: false },
        { id: 'n2', app: 'Calendar', title: 'Team sync', body: 'In 45 minutes', time: Date.now() - 1000 * 60 * 30, read: false },
      ],
      add: (n) => set((s) => ({ items: [{ ...n, id: `n${Date.now()}`, time: Date.now(), read: false }, ...s.items].slice(0, 20) })),
      dismiss: (id) => set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
      clearAll: () => set({ items: [] }),
      reset: () => set({ items: [] }),
    }),
    { name: nsKey('notifications') }
  )
)
