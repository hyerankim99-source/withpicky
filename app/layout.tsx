import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Noto_Sans_KR, Gowun_Batang } from 'next/font/google'
import './globals.css'

const notoSansKr = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '900'],
  variable: '--font-noto-sans-kr',
})

const gowunBatang = Gowun_Batang({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-gowun-batang',
})

export const metadata: Metadata = {
  title: '픽키 · AI 세일즈 에이전트 프로토타입',
  description:
    '망설임을 설득으로 바꾸는 AI 세일즈 에이전트 픽키 — 온보딩부터 메인 홈, 채팅까지 이어지는 인터랙티브 프로토타입.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  themeColor: '#fcf7fa',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" className={`${notoSansKr.variable} ${gowunBatang.variable}`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
