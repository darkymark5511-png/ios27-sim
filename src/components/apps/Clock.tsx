import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { AppWindow } from './AppWindow'
import { useClock, formatTime } from '../../hooks/useClock'
import { iosSpring } from '../../lib/animations'

type Tab = 'world' | 'alarm' | 'stopwatch' | 'timer'
const CITIES = [
  { name: 'San Francisco', offset: -7 },
  { name: 'New York', offset: -4 },
  { name: 'London', offset: 1 },
  { name: 'Tokyo', offset: 9 },
]

export function Clock() {
  const [tab, setTab] = useState<Tab>('world')
  const now = useClock()
  return (
    <AppWindow appId="clock" title="Clock">
      <div className="flex h-full flex-col">
        <div className="flex border-b border-white/10">
          {(['world', 'alarm', 'stopwatch', 'timer'] as Tab[]).map((t) => (
            <button key={t} type="button" onClick={() => setTab(t)}
              className={`flex-1 py-2.5 text-[13px] capitalize ${tab === t ? 'text-[var(--accent)]' : 'text-white/50'}`}>
              {t}
            </button>
          ))}
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          {tab === 'world' && (
            <div className="space-y-4">
              {CITIES.map((c) => {
                const local = new Date(now.getTime() + (c.offset * 60 + now.getTimezoneOffset()) * 60000)
                return (
                  <div key={c.name} className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div>
                      <div className="text-[17px] font-medium">{c.name}</div>
                      <div className="text-[13px] text-white/45">Today</div>
                    </div>
                    <div className="text-[34px] font-light tabular-nums">{formatTime(local)}</div>
                  </div>
                )
              })}
            </div>
          )}
          {tab === 'alarm' && <AlarmTab />}
          {tab === 'stopwatch' && <StopwatchTab />}
          {tab === 'timer' && <TimerTab />}
        </div>
      </div>
    </AppWindow>
  )
}

function AlarmTab() {
  const [alarms, setAlarms] = useState([
    { id: 1, time: '07:00', on: true, label: 'Weekdays' },
    { id: 2, time: '09:30', on: false, label: 'Weekend' },
  ])
  return (
    <div className="space-y-3">
      {alarms.map((a) => (
        <div key={a.id} className="flex items-center justify-between rounded-xl bg-white/5 px-4 py-3">
          <div>
            <div className="text-[34px] font-light tabular-nums">{a.time}</div>
            <div className="text-[13px] text-white/50">{a.label}</div>
          </div>
          <motion.button type="button" whileTap={{ scale: 0.9 }} transition={iosSpring}
            onClick={() => setAlarms((list) => list.map((x) => (x.id === a.id ? { ...x, on: !x.on } : x)))}
            className={`h-[31px] w-[51px] rounded-full ${a.on ? 'bg-[var(--accent)]' : 'bg-[#39393d]'}`}>
            <span className={`block h-[27px] w-[27px] translate-y-[2px] rounded-full bg-white shadow transition-transform ${a.on ? 'translate-x-[22px]' : 'translate-x-[2px]'}`} />
          </motion.button>
        </div>
      ))}
    </div>
  )
}

function StopwatchTab() {
  const [ms, setMs] = useState(0)
  const [running, setRunning] = useState(false)
  const [laps, setLaps] = useState<number[]>([])
  const ref = useRef<ReturnType<typeof setInterval> | null>(null)
  useEffect(() => {
    if (running) {
      const start = Date.now() - ms
      ref.current = setInterval(() => setMs(Date.now() - start), 10)
    }
    return () => { if (ref.current) clearInterval(ref.current) }
  }, [running])
  const fmt = (n: number) => {
    const m = Math.floor(n / 60000), s = Math.floor((n % 60000) / 1000), c = Math.floor((n % 1000) / 10)
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}.${c.toString().padStart(2, '0')}`
  }
  return (
    <div className="flex flex-col items-center pt-8">
      <div className="text-[52px] font-light tabular-nums tracking-tight">{fmt(ms)}</div>
      <div className="mt-8 flex gap-6">
        <motion.button type="button" whileTap={{ scale: 0.92 }} className="h-16 w-16 rounded-full bg-white/10 text-[15px]"
          onClick={() => { if (running) setLaps((l) => [ms, ...l]); else { setMs(0); setLaps([]) } }}>
          {running ? 'Lap' : 'Reset'}
        </motion.button>
        <motion.button type="button" whileTap={{ scale: 0.92 }}
          className={`h-16 w-16 rounded-full text-[15px] ${running ? 'bg-[#ff453a]/30 text-[#ff453a]' : 'bg-[#30d158]/30 text-[#30d158]'}`}
          onClick={() => setRunning((r) => !r)}>
          {running ? 'Stop' : 'Start'}
        </motion.button>
      </div>
      <div className="mt-6 w-full space-y-1">
        {laps.map((l, i) => (
          <div key={i} className="flex justify-between border-b border-white/10 py-2 text-[15px]">
            <span className="text-white/50">Lap {laps.length - i}</span>
            <span className="tabular-nums">{fmt(l)}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function TimerTab() {
  const [secs, setSecs] = useState(60)
  const [left, setLeft] = useState(60)
  const [running, setRunning] = useState(false)
  useEffect(() => {
    if (!running || left <= 0) { if (left <= 0) setRunning(false); return }
    const id = setTimeout(() => setLeft((l) => l - 1), 1000)
    return () => clearTimeout(id)
  }, [running, left])
  return (
    <div className="flex flex-col items-center pt-6">
      <div className="text-[52px] font-light tabular-nums">
        {Math.floor(left / 60).toString().padStart(2, '0')}:{(left % 60).toString().padStart(2, '0')}
      </div>
      <input type="range" min={15} max={3600} step={15} value={secs}
        onChange={(e) => { const v = Number(e.target.value); setSecs(v); if (!running) setLeft(v) }}
        className="mt-6 w-full" />
      <div className="mt-6 flex gap-6">
        <motion.button type="button" whileTap={{ scale: 0.92 }} className="h-16 w-16 rounded-full bg-white/10 text-[15px]"
          onClick={() => { setRunning(false); setLeft(secs) }}>Cancel</motion.button>
        <motion.button type="button" whileTap={{ scale: 0.92 }}
          className={`h-16 w-16 rounded-full text-[15px] ${running ? 'bg-[#ff9f0a]/30 text-[#ff9f0a]' : 'bg-[#30d158]/30 text-[#30d158]'}`}
          onClick={() => setRunning((r) => !r)}>{running ? 'Pause' : 'Start'}</motion.button>
      </div>
    </div>
  )
}
