import { useClock, formatTime } from '../../hooks/useClock'
import { useSettingsStore } from '../../store/settingsStore'
import { useWallpaperStore } from '../../store/wallpaperStore'
import { CellularIcon, WifiIcon, BatteryIcon } from '../../lib/icons'

interface Props {
  light?: boolean
  showCarrier?: boolean
}

export function StatusBar({ light, showCarrier }: Props) {
  const now = useClock()
  const { airplane, wifi, cellular, batteryLevel, carrier } = useSettingsStore()
  const wall = useWallpaperStore((s) => s.current())
  const isLight = light ?? wall.luminance === 'light'
  const color = isLight ? '#000' : '#fff'

  return (
    <div
      className="pointer-events-none absolute left-0 right-0 top-0 z-50 flex h-[54px] items-end justify-between px-6 pb-1.5"
      style={{ color }}
    >
      <div className="flex items-center gap-1 text-[15px] font-semibold tracking-tight tabular-nums">
        {formatTime(now)}
        {showCarrier && !airplane && (
          <span className="ml-1 text-[12px] font-medium opacity-80">{carrier}</span>
        )}
      </div>
      <div className="flex items-center gap-1.5">
        {!airplane && cellular && <CellularIcon size={15} />}
        {!airplane && wifi && <WifiIcon size={14} />}
        {airplane && <span className="text-[12px] opacity-70">✈</span>}
        <BatteryIcon size={22} level={batteryLevel} />
      </div>
    </div>
  )
}
