'use client'

import Image from 'next/image'
import { Search, ShoppingBag, Home, Heart, User, Info, ArrowUp } from 'lucide-react'
import { products, formatPrice } from '@/lib/picki-data'

function TabBar() {
  const tabs = [
    { icon: Home, label: '홈', active: true },
    { icon: Search, label: '검색', active: false },
    { icon: Heart, label: '찜', active: false },
    { icon: User, label: '마이', active: false },
  ]
  return (
    <div className="flex flex-shrink-0 items-center justify-around border-t border-picki-line px-1.5 pb-3.5 pt-2.5">
      {tabs.map(({ icon: Icon, label, active }) => (
        <div key={label} className="flex flex-col items-center gap-[3px]">
          <Icon
            className={`h-[19px] w-[19px] ${active ? 'text-picki-accent-strong' : 'text-picki-sub'}`}
            strokeWidth={1.8}
          />
          <span
            className={`text-[9.5px] font-semibold ${active ? 'text-picki-accent-strong' : 'text-picki-sub'}`}
          >
            {label}
          </span>
        </div>
      ))}
    </div>
  )
}

export function HomeScreen({ onOpenChat }: { onOpenChat: (seed?: string) => void }) {
  return (
    <>
      <div className="flex-1 overflow-y-auto px-[18px] pb-2 pt-1.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex items-center justify-between px-0.5 pb-3.5 pt-2">
          <div className="font-serif text-[19px] font-bold tracking-tight">
            <span className="text-picki-sub">with</span>PICKY
          </div>
          <div className="flex gap-3.5 text-picki-ink">
            <Search className="h-[19px] w-[19px]" strokeWidth={1.7} />
            <ShoppingBag className="h-[19px] w-[19px]" strokeWidth={1.7} />
          </div>
        </div>

        <div className="relative mb-[22px] overflow-hidden rounded-[20px] border border-picki-accent bg-gradient-to-br from-[#fbd9e7] via-picki-accent-soft to-[#e7ddf6] px-4 pb-3.5 pt-4 shadow-[0_8px_24px_-12px_rgba(217,140,168,0.5)]">
          <div className="mb-2.5 flex items-center gap-2.5">
            <div className="relative h-[34px] w-[34px] flex-shrink-0 overflow-hidden rounded-full border border-white bg-picki-accent-soft">
              <Image src="/picky/picky-profile.png" alt="픽키" fill sizes="34px" className="object-cover" />
            </div>
            <div>
              <div className="text-[12.5px] font-bold">픽키</div>
              <div className="flex items-center gap-1 text-[10.5px] text-picki-sub">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-picki-green" />
                지금 대화할 수 있어
              </div>
            </div>
          </div>
          <p className="mb-3 font-serif text-[15.5px] leading-[1.55]">
            오늘은 어떤 제품을 찾고 있어? 😊
          </p>
          <button
            type="button"
            onClick={() => onOpenChat()}
            className="relative z-10 flex w-full items-center justify-between gap-2 rounded-full border border-picki-line bg-white py-2.5 pl-4 pr-2 text-left"
          >
            <span className="text-[12.5px] text-picki-sub">예: 가벼운 크로스백 추천해줘</span>
            <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-picki-accent">
              <ArrowUp className="h-3.5 w-3.5 text-picki-accent-ink" strokeWidth={2.2} />
            </span>
          </button>
        </div>

        <div className="mb-0.5 font-serif text-[16.5px] font-bold">너를 위한 픽</div>
        <p className="mb-3.5 text-[11.5px] text-picki-sub">
          최근 본 상품과 고른 키워드를 참고했어
        </p>

        <div className="grid grid-cols-2 gap-3 pb-2">
          {products.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => onOpenChat(`${p.name} 어때?`)}
              className="overflow-hidden rounded-2xl border border-picki-line bg-white text-left"
            >
              <div className="relative h-[108px] w-full bg-picki-accent-soft">
                <Image
                  src={p.image || '/placeholder.svg'}
                  alt={p.name}
                  fill
                  sizes="150px"
                  className="object-cover"
                />
              </div>
              <div className="px-2.5 pb-3 pt-2.5">
                <p className="mb-0.5 text-[12.5px] font-semibold leading-tight">{p.name}</p>
                <p className="mb-2 text-[13px] font-extrabold tabular-nums">
                  {formatPrice(p.price)}
                </p>
                <div className="flex items-start gap-1.5 rounded-lg bg-picki-green-soft px-2 py-1.5 text-[10.5px] font-semibold leading-snug text-picki-green">
                  <Info className="mt-px h-2.5 w-2.5 flex-shrink-0" strokeWidth={2.4} />
                  {p.reason}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <TabBar />
    </>
  )
}
