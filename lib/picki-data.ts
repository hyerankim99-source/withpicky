export type Product = {
  id: string
  name: string
  price: number
  image: string
  reason: string
}

export const products: Product[] = [
  {
    id: 'light-cross-tote',
    name: '라이트 크로스 토트백',
    price: 58000,
    image: '/products/light-cross-tote.png',
    reason: '가벼운 소재를 3번이나 검색한 널 위한 가방이야!',
  },
  {
    id: 'mini-cross',
    name: '미니 크로스백',
    price: 42000,
    image: '/products/mini-cross.png',
    reason: '토트랑 크로스 둘 다 찾던 너, 이거 하나면 다 돼!',
  },
  {
    id: 'daily-shoulder',
    name: '데일리 숄더백',
    price: 65000,
    image: '/products/daily-shoulder.png',
    reason: '수납 많은 걸 원했잖아, 리뷰 4.8점이라 믿어도 돼!',
  },
  {
    id: 'canvas-eco',
    name: '캔버스 에코백',
    price: 29000,
    image: '/products/canvas-eco.png',
    reason: "'가성비' 고른 너한테 딱인 착한 가격이야!",
  },
]

export const onboardingKeywords = [
  '가벼운',
  '미니멀',
  '데일리백',
  '오피스룩',
  '러블리',
  '수납 많은',
  '스트릿',
  '빈티지',
  '하이엔드',
  '가성비',
  '노트북 수납',
  '캐주얼',
]

export const formatPrice = (n: number) => `${n.toLocaleString('ko-KR')}원`
