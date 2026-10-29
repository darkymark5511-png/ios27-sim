import { useState } from 'react'
import { motion } from 'framer-motion'
import { AppWindow } from './AppWindow'
import { ListRow } from '../ui/ListRow'
import { Toggle } from '../ui/Toggle'
import { Slider } from '../ui/Slider'
import { useSettingsStore } from '../../store/settingsStore'
import { useWallpaperStore, WALLPAPERS } from '../../store/wallpaperStore'
import { useNotificationsStore } from '../../store/notificationsStore'
import { useAppStore } from '../../store/appStore'
import { SunIcon, VolumeIcon } from '../../lib/icons'
import { GlassPanel } from '../ui/GlassPanel'
import { iosSpring } from '../../lib/animations'

type Page = 'root' | 'wifi' | 'bluetooth' | 'display' | 'wallpaper' | 'general' | 'about' | 'reset' | 'notifications' | 'sounds' | 'battery' | 'accessibility'

export function Settings() {
  const [page, setPage] = useState<Page>('root')
  const s = useSettingsStore()
  const wall = useWallpaperStore()
  const addNotif = useNotificationsStore((x) => x.add)
  const { enterRecovery } = useAppStore()
  const title = page === 'root' ? 'Settings' : page.charAt(0).toUpperCase() + page.slice(1)

  return (
    <AppWindow appId="settings" title={title} onBack={page === 'root' ? undefined : () => setPage('root')}>
      <div className="px-3 pb-10 pt-2">
        {page === 'root' && (
          <div className="space-y-5">
            <GlassPanel className="overflow-hidden rounded-xl">
              <ListRow
                left={<div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#5ac8fa] to-[#0a84ff] text-xl font-semibold">O</div>}
                title="Olivia"
                subtitle="Apple ID, iCloud, Media & Purchases"
                chevron
              />
            </GlassPanel>
            <Section>
              <ListRow title="Airplane Mode" right={<Toggle checked={s.airplane} onChange={() => s.toggle('airplane')} />} />
              <ListRow title="Wi-Fi" subtitle={s.wifi ? s.wifiNetwork : 'Off'} chevron onClick={() => setPage('wifi')} />
              <ListRow title="Bluetooth" subtitle={s.bluetooth ? 'On' : 'Off'} chevron onClick={() => setPage('bluetooth')} />
              <ListRow title="Cellular" right={<Toggle checked={s.cellular} onChange={() => s.toggle('cellular')} />} />
            </Section>
            <Section>
              <ListRow title="Notifications" chevron onClick={() => setPage('notifications')} />
              <ListRow title="Sounds & Haptics" chevron onClick={() => setPage('sounds')} />
            </Section>
            <Section>
              <ListRow title="Display & Brightness" chevron onClick={() => setPage('display')} />
              <ListRow title="Wallpaper" chevron onClick={() => setPage('wallpaper')} />
              <ListRow title="Accessibility" chevron onClick={() => setPage('accessibility')} />
            </Section>
            <Section>
              <ListRow title="General" chevron onClick={() => setPage('general')} />
              <ListRow title="Battery" chevron onClick={() => setPage('battery')} />
            </Section>
          </div>
        )}
        {page === 'wifi' && (
          <Section>
            <ListRow title="Wi-Fi" right={<Toggle checked={s.wifi} onChange={() => s.toggle('wifi')} />} />
            {s.wifi && ['Home', 'Cafe', 'Office'].map((n) => (
              <ListRow key={n} title={n} right={s.wifiNetwork === n ? <span className="text-[var(--accent)]">✓</span> : undefined} onClick={() => s.set('wifiNetwork', n)} />
            ))}
          </Section>
        )}
        {page === 'bluetooth' && (
          <Section>
            <ListRow title="Bluetooth" right={<Toggle checked={s.bluetooth} onChange={() => s.toggle('bluetooth')} />} />
            {s.bluetooth && <><ListRow title="AirPods Pro" subtitle="Connected" /><ListRow title="Magic Keyboard" subtitle="Not Connected" /></>}
          </Section>
        )}
        {page === 'display' && (
          <div className="space-y-5">
            <Section>
              <div className="px-4 py-3 text-[13px] text-white/45">Appearance</div>
              <div className="flex gap-3 px-4 pb-3">
                {(['light', 'dark', 'auto'] as const).map((a) => (
                  <motion.button key={a} type="button" whileTap={{ scale: 0.95 }} transition={iosSpring}
                    onClick={() => s.set('appearance', a)}
                    className={`flex-1 rounded-xl py-3 text-[15px] capitalize ${s.appearance === a ? 'bg-[var(--accent)] text-white' : 'bg-white/10'}`}>
                    {a}
                  </motion.button>
                ))}
              </div>
            </Section>
            <Section>
              <div className="px-4 pt-3">
                <Slider value={s.brightness} onChange={(v) => s.set('brightness', v)} icon={<SunIcon size={18} className="text-white/60" />} />
              </div>
            </Section>
          </div>
        )}
        {page === 'wallpaper' && (
          <div className="grid grid-cols-2 gap-3 p-1">
            {WALLPAPERS.map((w) => (
              <motion.button key={w.id} type="button" whileTap={{ scale: 0.96 }} transition={iosSpring}
                onClick={() => wall.setId(w.id)}
                className={`aspect-[9/16] overflow-hidden rounded-2xl border-2 ${wall.id === w.id && !wall.customUrl ? 'border-[var(--accent)]' : 'border-transparent'}`}
                style={{ background: w.gradient }}>
                <span className="mt-2 block text-center text-[12px] text-white/80 drop-shadow">{w.name}</span>
              </motion.button>
            ))}
          </div>
        )}
        {page === 'notifications' && (
          <Section>
            <ListRow title="Send Test Notification" onClick={() => addNotif({ app: 'Settings', title: 'Test', body: 'Notification from Settings' })} />
            <ListRow title="Messages" right={<Toggle checked onChange={() => {}} />} />
            <ListRow title="Calendar" right={<Toggle checked onChange={() => {}} />} />
          </Section>
        )}
        {page === 'sounds' && (
          <Section>
            <div className="px-4 pt-3">
              <Slider value={s.volume} onChange={(v) => s.set('volume', v)} icon={<VolumeIcon size={18} className="text-white/60" />} />
            </div>
            <ListRow title="Haptics" right={<Toggle checked={s.haptics} onChange={() => s.toggle('haptics')} />} />
          </Section>
        )}
        {page === 'battery' && (
          <Section>
            <ListRow title="Battery Level" right={<span className="text-white/60">{s.batteryLevel}%</span>} />
            <ListRow title="Low Power Mode" right={<Toggle checked={s.lowPower} onChange={() => s.toggle('lowPower')} />} />
          </Section>
        )}
        {page === 'accessibility' && (
          <Section>
            <ListRow title="Reduce Motion" right={<Toggle checked={s.reduceMotion} onChange={() => s.toggle('reduceMotion')} />} />
            <ListRow title="Reduce Transparency" right={<Toggle checked={s.reduceTransparency} onChange={() => s.toggle('reduceTransparency')} />} />
          </Section>
        )}
        {page === 'general' && (
          <Section>
            <ListRow title="About" chevron onClick={() => setPage('about')} />
            <ListRow title="Software Update" subtitle="Up to date" />
            <ListRow title="Reset" chevron onClick={() => setPage('reset')} />
          </Section>
        )}
        {page === 'about' && (
          <Section>
            <ListRow title="Name" right={<span className="text-white/50">Olivia's iPhone</span>} />
            <ListRow title="Model Name" right={<span className="text-white/50">{s.model}</span>} />
            <ListRow title="iOS Version" right={<span className="text-white/50">{s.iosVersion}</span>} />
          </Section>
        )}
        {page === 'reset' && (
          <Section>
            <ListRow title="Reset All Settings" destructive onClick={() => s.reset()} />
            <ListRow title="Erase All Content and Settings" destructive onClick={() => enterRecovery()} />
          </Section>
        )}
      </div>
    </AppWindow>
  )
}

function Section({ children }: { children: React.ReactNode }) {
  return <GlassPanel className="overflow-hidden rounded-xl divide-y divide-white/[0.08]">{children}</GlassPanel>
}
