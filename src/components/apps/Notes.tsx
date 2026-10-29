import { useState } from 'react'
import { motion } from 'framer-motion'
import { AppWindow } from './AppWindow'
import { useNotesStore } from '../../store/notesStore'
import { PlusIcon, XIcon } from '../../lib/icons'
import { iosSpring } from '../../lib/animations'

export function Notes() {
  const { notes, add, update, remove } = useNotesStore()
  const [editing, setEditing] = useState<string | null>(null)
  const [query, setQuery] = useState('')
  const note = notes.find((n) => n.id === editing)
  const filtered = notes.filter((n) => n.title.toLowerCase().includes(query.toLowerCase()) || n.body.toLowerCase().includes(query.toLowerCase()))

  if (editing && note) {
    return (
      <AppWindow appId="notes" title="Note" onBack={() => setEditing(null)}>
        <div className="flex h-full flex-col px-4 pt-2">
          <input className="bg-transparent text-[22px] font-semibold outline-none placeholder:text-white/30" value={note.title} placeholder="Title"
            onChange={(e) => update(note.id, { title: e.target.value })} />
          <textarea className="mt-2 flex-1 resize-none bg-transparent text-[17px] leading-relaxed outline-none placeholder:text-white/30" value={note.body} placeholder="Note"
            onChange={(e) => update(note.id, { body: e.target.value })} />
        </div>
      </AppWindow>
    )
  }

  return (
    <AppWindow appId="notes" title="Notes">
      <div className="px-3 pt-2">
        <input className="mb-3 w-full rounded-xl bg-white/10 px-3 py-2 text-[15px] outline-none placeholder:text-white/40" placeholder="Search" value={query} onChange={(e) => setQuery(e.target.value)} />
        <div className="mb-2 flex justify-end">
          <motion.button type="button" whileTap={{ scale: 0.9 }} transition={iosSpring}
            onClick={() => { const id = add(); setEditing(id) }}
            className="rounded-full bg-[var(--accent)] p-2" aria-label="New note">
            <PlusIcon size={18} className="text-white" />
          </motion.button>
        </div>
        {filtered.length === 0 && <div className="py-16 text-center text-white/40">No Notes</div>}
        <div className="space-y-2">
          {filtered.map((n) => (
            <div key={n.id} className="relative flex items-start gap-2 rounded-xl bg-white/5 px-4 py-3 active:bg-white/10">
              <button type="button" className="min-w-0 flex-1 text-left" onClick={() => setEditing(n.id)}>
                <div className="truncate text-[17px] font-medium">{n.title || 'New Note'}</div>
                <div className="truncate text-[13px] text-white/50">{n.body || 'No additional text'}</div>
              </button>
              <button type="button" className="shrink-0 rounded-full p-1 text-white/40" onClick={() => remove(n.id)} aria-label="Delete">
                <XIcon size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </AppWindow>
  )
}
