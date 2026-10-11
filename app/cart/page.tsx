import type { Metadata } from 'next'
import { CartView } from '@/components/cart/cart-view'

export const metadata: Metadata = { title: 'Your Shopping Cart — VAPOR Store' }

export default function CartPage() {
  return (
    <main className="mx-auto max-w-[940px] px-4 py-8">
      <h1 className="mb-6 text-3xl font-light uppercase tracking-wide text-white">Your Shopping Cart</h1>
      <CartView />
    </main>
  )
}
