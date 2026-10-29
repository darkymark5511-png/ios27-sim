import { useState } from 'react'
import { motion } from 'framer-motion'
import { AppWindow } from './AppWindow'
import { iosSpring } from '../../lib/animations'

const BOOKMARKS = [
  { title: 'Home', body: 'Welcome to Safari Mini.\n\nThis is a local mock page. Type a URL or search above.' },
  { title: 'Docs', body: 'iOS 27 Simulator\n\nBuilt with React, Vite, Tailwind, Framer Motion, Zustand.' },
  { title: 'Blog', body: 'Liquid Glass\n\nDeep translucent layered blur with specular highlights.' },
]

export function Safari() {
  const [url, setUrl] = useState('')
  const [page, setPage] = useState(BOOKMARKS[0])
  const [loading, setLoading] = useState(false)
  const go = () => {
    setLoading(true)
    setTimeout(() => {
      const q = url.trim().toLowerCase()
      if (q.includes('docs')) setPage(BOOKMARKS[1])
      else if (q.includes('blog')) setPage(BOOKMARKS[2])
      else setPage({ title: url || 'Search', body: `Results for “${url || '…'}”\n\n• Safari Mini mock result` })
      setLoading(false)
    }, 400)
  }
  return (
    <AppWindow appId="safari" title="Safari" hideHeader>
      <div className="flex h-full flex-col bg-[#1c1c1e]">
        <div className="flex-1 overflow-y-auto p-5 pt-16">
          {loading ? (
            <div className="h-1 w-full overflow-hidden rounded bg-white/10">
              <motion.div className="h-full bg-[var(--accent)]" initial={{ width: '0%' }} animate={{ width: '70%' }} transition={{ duration: 0.4 }} />
            </div>
          ) : (
            <>
              <h1 className="text-[28px] font-bold">{page.title}</h1>
              <pre className="mt-4 whitespace-pre-wrap font-sans text-[15px] leading-relaxed text-white/80">{page.body}</pre>
            </>
          )}
        </div>
        <div className="border-t border-white/10 bg-[#2c2c2e]/90 px-3 py-2 pb-8 backdrop-blur-xl">
          <div className="mb-2 flex gap-2 text-[13px] text-[var(--accent)]">
            {BOOKMARKS.map((b) => (
              <button key={b.title} type="button" onClick={() => setPage(b)}>{b.title}</button>
            ))}
          </div>
          <form onSubmit={(e) => { e.preventDefault(); go() }} className="flex gap-2">
            <input className="flex-1 rounded-full bg-black/40 px-4 py-2 text-[15px] outline-none" placeholder="Search or enter URL" value={url} onChange={(e) => setUrl(e.target.value)} />
            <motion.button type="submit" whileTap={{ scale: 0.95 }} transition={iosSpring} className="rounded-full bg-[var(--accent)] px-4 text-[15px]">Go</motion.button>
          </form>
        </div>
      </div>
    </AppWindow>
  )
}
