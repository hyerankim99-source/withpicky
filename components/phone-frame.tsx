import type { ReactNode } from 'react'

function StatusBar({ time = '9:41' }: { time?: string }) {
  return (
    <div className="flex flex-shrink-0 items-center justify-between px-6 pb-1 pt-4 text-[12px] font-bold tracking-wide text-picki-ink">
      <span>{time}</span>
      <div className="flex items-center gap-1.5">
        <div className="flex items-end gap-[2px]">
          <span className="h-1 w-[3px] rounded-[1px] bg-picki-ink" />
          <span className="h-1.5 w-[3px] rounded-[1px] bg-picki-ink" />
          <span className="h-2 w-[3px] rounded-[1px] bg-picki-ink" />
        </div>
        <div className="relative h-[10px] w-5 rounded-[3px] border-[1.3px] border-picki-ink">
          <span className="absolute inset-[1.5px] block w-[70%] rounded-[1px] bg-picki-ink" />
          <span className="absolute -right-1 top-[3px] h-1 w-[2px] rounded-r-[1px] bg-picki-ink" />
        </div>
      </div>
    </div>
  )
}

export function PhoneFrame({
  children,
  time,
}: {
  children: ReactNode
  time?: string
}) {
  return (
    <div className="w-[340px] rounded-[46px] bg-[#231b22] p-3 shadow-[0_30px_70px_-24px_rgba(46,37,48,0.45)]">
      <div className="relative flex h-[720px] flex-col overflow-hidden rounded-[36px] bg-picki-ground font-sans text-picki-ink">
        <StatusBar time={time} />
        {children}
      </div>
    </div>
  )
}
