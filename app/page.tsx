'use client'

import { useState } from 'react'
import { PhoneFrame } from '@/components/phone-frame'
import { OnboardingScreen } from '@/components/onboarding-screen'
import { OnboardingScreen2 } from '@/components/onboarding-screen-2'
import { HomeScreen } from '@/components/home-screen'
import { ChatScreen } from '@/components/chat-screen'

type Step = 'onboarding' | 'onboarding2' | 'home' | 'chat'

const steps: { key: Step; label: string; sub: string }[] = [
  { key: 'onboarding', label: '온보딩 1', sub: '스타일/느낌 키워드 선택' },
  { key: 'onboarding2', label: '온보딩 2', sub: '관심 제품 키워드 선택' },
  { key: 'home', label: '메인 홈', sub: '픽키 대화 + 추천' },
  { key: 'chat', label: '픽키 채팅', sub: '니즈 파악 · 망설임 대응' },
]

export default function Page() {
  const [step, setStep] = useState<Step>('onboarding')
  const [selectedStyle, setSelectedStyle] = useState<string[]>(['가벼운', '캐주얼', '귀여운'])
  const [selectedCategory, setSelectedCategory] = useState<string[]>(['데일리백', '오피스룩', '스카프'])
  const [chatSeed, setChatSeed] = useState<string | undefined>(undefined)

  const toggleStyleKeyword = (keyword: string) =>
    setSelectedStyle((prev) =>
      prev.includes(keyword) ? prev.filter((k) => k !== keyword) : [...prev, keyword],
    )

  const toggleCategoryKeyword = (keyword: string) =>
    setSelectedCategory((prev) =>
      prev.includes(keyword) ? prev.filter((k) => k !== keyword) : [...prev, keyword],
    )

  const openChat = (seed?: string) => {
    setChatSeed(seed)
    setStep('chat')
  }

  const activeIndex = steps.findIndex((s) => s.key === step)

  const statusTime = step === 'chat' ? '9:42' : step === 'onboarding2' ? '9:41' : '9:41'

  return (
    <main className="min-h-dvh bg-[#fcf7fa] px-5 py-10 text-picki-ink">
      <div className="mx-auto max-w-md">
        <header className="mb-8 text-center">
          <div className="mb-3 inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.14em] text-picki-accent-strong">
            <span className="h-px w-4 bg-picki-accent-strong" />
            withPICKY · AI SALES AGENT
          </div>
          <h1 className="text-balance font-serif text-[26px] leading-snug">
            망설임을 설득으로 바꾸는 픽키
          </h1>
          <p className="mx-auto mt-2 max-w-xs text-pretty text-[13.5px] leading-relaxed text-picki-sub">
            온보딩부터 메인 홈, 채팅까지 이어지는 신규 가입자 화면 흐름을 직접 눌러보세요.
          </p>
          <a
            href="/plan.html"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-picki-line bg-white px-3.5 py-[7px] text-[12px] font-semibold text-picki-accent-strong shadow-[0_4px_14px_-8px_rgba(217,140,168,0.5)] transition-opacity hover:opacity-80"
          >
            📄 서비스 기획서 보기
          </a>
        </header>

        {/* Step indicator / navigation */}
        <nav className="mb-6 flex flex-wrap items-center justify-center gap-1.5">
          {steps.map((s, i) => {
            const isActive = s.key === step
            const isDone = i < activeIndex
            return (
              <button
                key={s.key}
                type="button"
                onClick={() => {
                  if (s.key === 'chat') openChat(undefined)
                  else setStep(s.key)
                }}
                className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-[12px] font-semibold transition-colors ${
                  isActive
                    ? 'border-picki-accent-strong bg-picki-accent text-picki-accent-ink'
                    : isDone
                      ? 'border-picki-line bg-white text-picki-accent-strong'
                      : 'border-picki-line bg-white text-picki-sub'
                }`}
              >
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-full text-[10.5px] ${
                    isActive ? 'bg-picki-accent-strong text-white' : 'bg-picki-line text-picki-sub'
                  }`}
                >
                  {i + 1}
                </span>
                {s.label}
              </button>
            )
          })}
        </nav>

        <div className="flex justify-center">
          <PhoneFrame time={statusTime}>
            {step === 'onboarding' && (
              <OnboardingScreen
                selected={selectedStyle}
                onToggle={toggleStyleKeyword}
                onNext={() => setStep('onboarding2')}
              />
            )}
            {step === 'onboarding2' && (
              <OnboardingScreen2
                selected={selectedCategory}
                onToggle={toggleCategoryKeyword}
                onStart={() => setStep('home')}
              />
            )}
            {step === 'home' && <HomeScreen onOpenChat={openChat} />}
            {step === 'chat' && (
              <ChatScreen key={chatSeed ?? 'chat'} seed={chatSeed} onBack={() => setStep('home')} />
            )}
          </PhoneFrame>
        </div>

        <p className="mx-auto mt-8 max-w-md text-center text-[12.5px] leading-relaxed text-picki-sub">
          {steps[activeIndex].sub} · 키워드 칩을 눌러 선택을 바꾸거나, 홈의 추천 카드·입력창을 눌러
          픽키와 대화를 시작할 수 있어요.
        </p>
      </div>
    </main>
  )
}
