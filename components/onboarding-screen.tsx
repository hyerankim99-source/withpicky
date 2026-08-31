'use client'

import Image from 'next/image'
import { Check } from 'lucide-react'
import { onboardingStyleKeywords } from '@/lib/picki-data'

const MIN_SELECT = 3

export function OnboardingScreen({
  selected,
  onToggle,
  onNext,
}: {
  selected: string[]
  onToggle: (keyword: string) => void
  onNext: () => void
}) {
  const count = selected.length
  const canGoNext = count >= MIN_SELECT

  return (
    <>
      <div className="flex-1 overflow-y-auto px-[18px] pb-4 pt-1.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex items-center justify-between px-0.5 pb-1.5 pt-2.5">
          <div className="flex gap-1.5">
            <span className="h-1 w-[22px] rounded-full bg-picki-accent-strong" />
            <span className="h-1 w-4 rounded-full bg-picki-line" />
          </div>
          <button className="text-[12.5px] font-semibold text-picki-sub" type="button">
            건너뛰기
          </button>
        </div>

        <div className="relative mt-[18px]">
          <Image
            src="/picky/picky-main-cutout.png"
            alt="쇼핑하는 픽키 캐릭터"
            width={200}
            height={266}
            priority
            className="pointer-events-none absolute -right-2 -top-1 h-[132px] w-auto drop-shadow-[0_10px_18px_rgba(217,140,168,0.28)]"
          />
          <h2 className="mb-1.5 max-w-[72%] break-keep text-balance font-serif text-[23px] leading-[1.5]">
            안녕, 나는 픽키야.
            <br />
            어떤 스타일을 좋아해?
          </h2>
          <p className="mb-[22px] max-w-[70%] text-[13px] leading-relaxed text-picki-sub">
            골라준 키워드로 너에게 맞는 걸 먼저 찾아볼게. 3개 이상 골라줘.
          </p>
        </div>

        <div className="mb-2.5 text-[12px] font-bold text-picki-accent-strong">
          {count}개 선택됨 · 최소 {MIN_SELECT}개
        </div>
        <div className="flex flex-wrap gap-2">
          {onboardingStyleKeywords.map((keyword) => {
            const isOn = selected.includes(keyword)
            return (
              <button
                key={keyword}
                type="button"
                onClick={() => onToggle(keyword)}
                aria-pressed={isOn}
                className={`inline-flex select-none items-center gap-1.5 rounded-full border-[1.4px] px-[15px] py-[9px] text-[13px] font-semibold transition-all ${
                  isOn
                    ? 'border-picki-accent-strong bg-picki-accent text-picki-accent-ink'
                    : 'border-picki-line bg-white text-picki-ink'
                }`}
              >
                {keyword}
                {isOn && <Check className="h-3 w-3" strokeWidth={2.6} />}
              </button>
            )
          })}
        </div>
      </div>

      <div className="flex-shrink-0 px-[18px] pb-[22px] pt-3.5">
        <button
          type="button"
          onClick={onNext}
          disabled={!canGoNext}
          className="w-full rounded-2xl border-2 border-picki-accent-strong bg-white py-[15px] text-[14.5px] font-bold tracking-tight text-picki-accent-strong transition-opacity disabled:opacity-40"
        >
          다음
        </button>
      </div>
    </>
  )
}
