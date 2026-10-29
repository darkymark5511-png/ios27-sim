import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { nsKey } from '../lib/persistence'

export interface Note {
  id: string
  title: string
  body: string
  updatedAt: number
}

interface NotesState {
  notes: Note[]
  add: (title?: string, body?: string) => string
  update: (id: string, patch: Partial<Pick<Note, 'title' | 'body'>>) => void
  remove: (id: string) => void
  reset: () => void
}

export const useNotesStore = create<NotesState>()(
  persist(
    (set) => ({
      notes: [{ id: 'note1', title: 'Ideas', body: 'Ship the glass layer first.\nThen gestures.', updatedAt: Date.now() - 86400000 }],
      add: (title = 'New Note', body = '') => {
        const id = `note${Date.now()}`
        set((s) => ({ notes: [{ id, title, body, updatedAt: Date.now() }, ...s.notes] }))
        return id
      },
      update: (id, patch) => set((s) => ({ notes: s.notes.map((n) => (n.id === id ? { ...n, ...patch, updatedAt: Date.now() } : n)) })),
      remove: (id) => set((s) => ({ notes: s.notes.filter((n) => n.id !== id) })),
      reset: () => set({ notes: [] }),
    }),
    { name: nsKey('notes') }
  )
)
