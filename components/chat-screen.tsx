'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ArrowUp } from 'lucide-react'
import { products, formatPrice, type Product } from '@/lib/picki-data'

type Message =
  | { id: number; role: 'bot' | 'user'; kind: 'text'; text: string }
  | { id: number; role: 'bot'; kind: 'cards'; items: Product[] }

let idSeq = 0
const nextId = () => ++idSeq

const recommended = products.slice(0, 2)

/** Picki's reply logic — mirrors the "니즈 파악 + 망설임 대응" flow from the brief. */
function buildReplies(input: string): Message[] {
  const text = input.toLowerCase()
  const hesitation = /비싸|비쌈|비싼|가격|둘러|고민|망설|글쎄|음|나중|할인/.test(input)
  const wantsBag = /가방|백|크로스|토트|숄더|에코|추천|찾|어때/.test(input) || text.includes('bag')

  if (hesitation) {
    return [
      {
        id: nextId(),
        role: 'bot',
        kind: 'text',
        text: '그럴 수 있지! 근데 이 가격대에 이만큼 가벼운 소재는 드물어서, 리뷰에서도 "가성비 좋다"는 말이 제일 많더라. 무이자 3개월도 되니까 부담은 덜할 거야. 비슷한 가격대 다른 옵션도 같이 볼까?',
      },
    ]
  }

  if (wantsBag) {
    return [
      {
        id: nextId(),
        role: 'bot',
        kind: 'text',
        text: '조건에 딱 맞는 가방 3개 찾았어! 리뷰에서 "가볍다"는 언급이 많은 순서로 보여줄게 →',
      },
      { id: nextId(), role: 'bot', kind: 'cards', items: recommended },
    ]
  }

  return [
    {
      id: nextId(),
      role: 'bot',
      kind: 'text',
      text: '좋아, 조금 더 구체적으로 말해줄래? 용도나 원하는 느낌을 알려주면 딱 맞는 걸 골라줄게. 😊',
    },
  ]
}

const quickReplies = ['수납 많고 가벼운 가방 추천해줘', '음… 좀 비싼 것 같아', '데일리로 들기 좋은 걸로']

function ChatBubble({ message }: { message: Extract<Message, { kind: 'text' }> }) {
  const isUser = message.role === 'user'
  return (
    <div className={`mb-3 flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[78%] rounded-2xl px-3 py-2.5 text-[12.8px] leading-[1.55] ${
          isUser
            ? 'rounded-br-[4px] bg-picki-accent text-picki-accent-ink'
            : 'rounded-bl-[4px] border border-picki-line bg-white'
        }`}
      >
        {message.text}
      </div>
    </div>
  )
}

function ProductCards({ items }: { items: Product[] }) {
  return (
    <div className="mb-3 max-w-[82%] overflow-hidden rounded-[14px] border border-picki-line bg-white">
      {items.map((p, i) => (
        <div
          key={p.id}
          className={`flex items-center gap-2.5 p-2.5 ${i > 0 ? 'border-t border-picki-line' : ''}`}
        >
          <div className="relative h-[42px] w-[42px] flex-shrink-0 overflow-hidden rounded-[9px] bg-picki-accent-soft">
            <Image src={p.image || '/placeholder.svg'} alt={p.name} fill sizes="42px" className="object-cover" />
          </div>
          <div>
            <p className="mb-0.5 text-[11.5px] font-bold">{p.name}</p>
            <p className="text-[11.5px] font-extrabold tabular-nums">{formatPrice(p.price)}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

function TypingBubble() {
  return (
    <div className="mb-3 flex justify-start">
      <div className="flex w-fit gap-1 rounded-2xl rounded-bl-[4px] border border-picki-line bg-white px-4 py-3">
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-picki-sub [animation-delay:0ms]" />
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-picki-sub [animation-delay:150ms]" />
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-picki-sub [animation-delay:300ms]" />
      </div>
    </div>
  )
}

export function ChatScreen({ onBack, seed }: { onBack: () => void; seed?: string }) {
  const [messages, setMessages] = useState<Message[]>([
    { id: nextId(), role: 'bot', kind: 'text', text: '오늘은 어떤 제품을 찾고 있어? 😊' },
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const seededRef = useRef(false)

  const send = (raw: string) => {
    const value = raw.trim()
    if (!value || typing) return
    setInput('')
    setMessages((prev) => [...prev, { id: nextId(), role: 'user', kind: 'text', text: value }])
    setTyping(true)

    const replies = buildReplies(value)
    window.setTimeout(() => {
      setTyping(false)
      setMessages((prev) => [...prev, ...replies])
    }, 1100)
  }

  // Auto-send a seeded message coming from the home screen.
  useEffect(() => {
    if (seed && !seededRef.current) {
      seededRef.current = true
      send(seed)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seed])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, typing])

  return (
    <>
      <div className="mb-1 flex items-center gap-2.5 border-b border-picki-line px-0.5 pb-3.5 pt-2">
        <button type="button" onClick={onBack} aria-label="뒤로 가기" className="pl-2">
          <ChevronLeft className="h-5 w-5 text-picki-ink" strokeWidth={1.8} />
        </button>
        <div className="relative h-9 w-9 overflow-hidden rounded-full border border-picki-line bg-picki-accent-soft">
          <Image src="/picky/picky-profile.png" alt="픽키" fill sizes="36px" className="object-cover" />
        </div>
        <div>
          <div className="text-[14px] font-bold leading-tight">픽키</div>
          <div className="flex items-center gap-1 text-[10.5px] text-picki-green">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-picki-green" />
            온라인
          </div>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-[18px] pb-3 pt-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {messages.map((m) =>
          m.kind === 'cards' ? (
            <ProductCards key={m.id} items={m.items} />
          ) : (
            <ChatBubble key={m.id} message={m} />
          ),
        )}
        {typing && <TypingBubble />}

        {messages.length <= 1 && !typing && (
          <div className="mt-1 flex flex-wrap gap-1.5">
            {quickReplies.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => send(q)}
                className="rounded-full border border-picki-line bg-white px-3 py-1.5 text-[11px] font-semibold text-picki-accent-strong"
              >
                {q}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex-shrink-0 border-t border-picki-line px-4 pb-4 pt-2.5">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            send(input)
          }}
          className="flex items-center gap-2 rounded-full border border-picki-line bg-picki-line py-2 pl-4 pr-2"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && (e.nativeEvent.isComposing || e.keyCode === 229)) {
                e.preventDefault()
              }
            }}
            placeholder="픽키에게 물어보기…"
            className="flex-1 bg-transparent text-[12.5px] text-picki-ink outline-none placeholder:text-picki-sub"
          />
          <button
            type="submit"
            aria-label="보내기"
            className="flex h-[30px] w-[30px] flex-shrink-0 items-center justify-center rounded-full bg-picki-accent"
          >
            <ArrowUp className="h-3.5 w-3.5 text-picki-accent-ink" strokeWidth={2.2} />
          </button>
        </form>
      </div>
    </>
  )
}
