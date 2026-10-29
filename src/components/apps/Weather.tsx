import { AppWindow } from './AppWindow'

const HOURLY = [
  { t: 'Now', temp: 72, icon: '☀️' }, { t: '1PM', temp: 74, icon: '☀️' },
  { t: '2PM', temp: 75, icon: '🌤' }, { t: '3PM', temp: 73, icon: '⛅' },
  { t: '4PM', temp: 71, icon: '⛅' }, { t: '5PM', temp: 68, icon: '🌥' },
]
const DAILY = [
  { d: 'Today', hi: 75, lo: 62, icon: '☀️' }, { d: 'Thu', hi: 73, lo: 60, icon: '⛅' },
  { d: 'Fri', hi: 70, lo: 58, icon: '🌧' }, { d: 'Sat', hi: 68, lo: 57, icon: '🌧' },
  { d: 'Sun', hi: 72, lo: 59, icon: '☀️' },
]

export function Weather() {
  return (
    <AppWindow appId="weather" title="Weather" hideHeader>
      <div className="flex h-full flex-col px-5 pt-16 text-white"
        style={{ background: 'linear-gradient(180deg, #1a4a8a 0%, #0c1f3d 100%)' }}>
        <div className="text-center">
          <div className="text-[18px] font-medium">San Francisco</div>
          <div className="text-[84px] font-thin leading-none tracking-tighter">72°</div>
          <div className="text-[17px]">Sunny</div>
          <div className="text-[15px] text-white/70">H:75° L:62°</div>
        </div>
        <div className="mt-8 overflow-x-auto no-scrollbar">
          <div className="flex gap-5 px-1">
            {HOURLY.map((h) => (
              <div key={h.t} className="flex w-12 flex-col items-center gap-1 text-[13px]">
                <span className="text-white/70">{h.t}</span>
                <span className="text-lg">{h.icon}</span>
                <span className="font-medium">{h.temp}°</span>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-6 space-y-1 rounded-2xl bg-white/10 p-3 backdrop-blur-md">
          {DAILY.map((d) => (
            <div key={d.d} className="flex items-center gap-3 py-1.5 text-[15px]">
              <span className="w-14 text-white/80">{d.d}</span>
              <span className="text-lg">{d.icon}</span>
              <span className="ml-auto text-white/50">{d.lo}°</span>
              <div className="mx-2 h-1 w-16 rounded-full bg-gradient-to-r from-[#5ac8fa] to-[#ff9f0a]" />
              <span>{d.hi}°</span>
            </div>
          ))}
        </div>
      </div>
    </AppWindow>
  )
}
