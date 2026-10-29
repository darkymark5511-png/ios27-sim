import { AppleLogo } from '../../lib/icons'
import { useAppStore } from '../../store/appStore'

export function WelcomeScreen() {
  const completeWelcome = useAppStore((s) => s.completeWelcome)

  return (
    <div
      className="absolute inset-0 z-40 flex flex-col items-center bg-black px-8 pt-24"
      onClick={completeWelcome}
    >
      <AppleLogo size={40} className="text-white/90" />
      <h1 className="mt-16 text-[48px] font-semibold tracking-tight text-white">Hello</h1>
      <p className="mt-3 text-[15px] text-white/45">English (United States)</p>
      <div className="mt-auto mb-16 w-full">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            completeWelcome()
          }}
          className="w-full rounded-2xl bg-white/10 py-3.5 text-center text-[17px] font-medium text-white active:bg-white/20"
        >
          Continue
        </button>
      </div>
    </div>
  )
}
