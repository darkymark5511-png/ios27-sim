import { useState } from 'react'
import { motion } from 'framer-motion'
import { AppWindow } from './AppWindow'
import { useHaptic } from '../../hooks/useHaptic'
import { iosSpring } from '../../lib/animations'

const BTNS = [
  ['C', '±', '%', '÷'],
  ['7', '8', '9', '×'],
  ['4', '5', '6', '−'],
  ['1', '2', '3', '+'],
  ['0', '.', '='],
]

export function Calculator() {
  const [display, setDisplay] = useState('0')
  const [prev, setPrev] = useState<number | null>(null)
  const [op, setOp] = useState<string | null>(null)
  const [fresh, setFresh] = useState(true)
  const haptic = useHaptic()

  const compute = (a: number, b: number, operator: string) => {
    switch (operator) {
      case '+': return a + b
      case '−': return a - b
      case '×': return a * b
      case '÷': return b === 0 ? NaN : a / b
      default: return b
    }
  }

  const press = (key: string) => {
    haptic(6)
    if (key === 'C') { setDisplay('0'); setPrev(null); setOp(null); setFresh(true); return }
    if (key === '±') { setDisplay((d) => (d.startsWith('-') ? d.slice(1) : d === '0' ? d : `-${d}`)); return }
    if (key === '%') { setDisplay((d) => String(parseFloat(d) / 100)); return }
    if (['+', '−', '×', '÷'].includes(key)) {
      const n = parseFloat(display)
      if (prev !== null && op && !fresh) {
        const r = compute(prev, n, op)
        setDisplay(String(r)); setPrev(r)
      } else setPrev(n)
      setOp(key); setFresh(true); return
    }
    if (key === '=') {
      if (prev === null || !op) return
      const r = compute(prev, parseFloat(display), op)
      setDisplay(Number.isNaN(r) ? 'Error' : String(r)); setPrev(null); setOp(null); setFresh(true); return
    }
    if (fresh) { setDisplay(key === '.' ? '0.' : key); setFresh(false) }
    else {
      if (key === '.' && display.includes('.')) return
      setDisplay((d) => (d === '0' && key !== '.' ? key : d + key))
    }
  }

  return (
    <AppWindow appId="calculator" title="Calculator" hideHeader>
      <div className="flex h-full flex-col bg-black px-3 pb-10 pt-16">
        <div className="mb-4 flex flex-1 items-end justify-end px-2">
          <div className="text-right text-[64px] font-light leading-none tracking-tight tabular-nums text-white">
            {display.length > 9 ? parseFloat(display).toExponential(4) : display}
          </div>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {BTNS.flat().map((k) => {
            const isOp = ['÷', '×', '−', '+', '='].includes(k)
            const isFn = ['C', '±', '%'].includes(k)
            const span = k === '0' ? 'col-span-2' : ''
            return (
              <motion.button
                key={k}
                type="button"
                whileTap={{ scale: 0.92 }}
                transition={iosSpring}
                onClick={() => press(k)}
                className={`h-[72px] rounded-full text-[28px] font-medium ${span} ${
                  isOp ? 'bg-[#ff9f0a] text-white' : isFn ? 'bg-[#a5a5a5] text-black' : 'bg-[#333] text-white'
                }`}
              >
                {k}
              </motion.button>
            )
          })}
        </div>
      </div>
    </AppWindow>
  )
}
