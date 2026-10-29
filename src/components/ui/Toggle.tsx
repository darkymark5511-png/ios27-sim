import { motion } from 'framer-motion'
import { useHaptic } from '../../hooks/useHaptic'
import { iosSpringSnappy } from '../../lib/animations'

interface Props {
  checked: boolean
  onChange: (v: boolean) => void
  disabled?: boolean
}

export function Toggle({ checked, onChange, disabled }: Props) {
  const haptic = useHaptic()
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => { haptic(8); onChange(!checked) }}
      className={`relative h-[31px] w-[51px] shrink-0 rounded-full transition-colors ${checked ? 'bg-[var(--accent)]' : 'bg-[#39393d]'} ${disabled ? 'opacity-40' : ''}`}
    >
      <motion.span
        className="absolute top-[2px] left-[2px] h-[27px] w-[27px] rounded-full bg-white shadow"
        animate={{ x: checked ? 20 : 0 }}
        transition={iosSpringSnappy}
      />
    </button>
  )
}
