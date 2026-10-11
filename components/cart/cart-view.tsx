'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { EarnBucks } from '@/components/earn-bucks'
import { PriceTag } from '@/components/price-tag'
import { useStore } from '@/components/store-provider'
import { formatPrice } from '@/lib/games'

export function CartView() {
  const router = useRouter()
  const { cart, cartTotal, wallet, removeFromCart, clearCart, checkout } = useStore()
  const savings = cart.reduce((sum, g) => sum + (g.price - Math.round(g.price * (1 - g.discount / 100))), 0)
  const shortfall = cartTotal - wallet

  if (cart.length === 0) {
    return (
      <div className="flex flex-col gap-6">
        <div className="rounded-sm bg-card p-10 text-center">
          <p className="text-lg text-white">Your cart is empty.</p>
          <p className="mt-1 text-sm text-muted-foreground">Your backlog, however, is not. Buy more anyway.</p>
          <Link
            href="/"
            className="mt-4 inline-block rounded-sm bg-gradient-to-r from-primary to-[#417a9b] px-4 py-2 text-sm text-white hover:brightness-110"
          >
            Continue Shopping
          </Link>
        </div>
        <EarnBucks compact />
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-[1fr_300px]">
      <div className="flex flex-col gap-3">
        <ul className="flex flex-col gap-2">
          {cart.map((game) => (
            <li key={game.slug} className="flex gap-3 rounded-sm bg-card p-3">
              <Link href={`/game/${game.slug}`} className="shrink-0">
                <Image src={game.image} alt="" width={184} height={69} className="h-[69px] w-[123px] object-cover sm:w-[184px]" />
              </Link>
              <div className="flex min-w-0 flex-1 flex-col justify-between gap-2 sm:flex-row sm:items-start">
                <Link href={`/game/${game.slug}`} className="truncate text-white hover:text-primary">
                  {game.title}
                </Link>
                <div className="flex flex-col items-start gap-1 sm:items-end">
                  <PriceTag game={game} />
                  <button
                    type="button"
                    onClick={() => removeFromCart(game.slug)}
                    className="text-xs text-muted-foreground underline-offset-2 hover:text-white hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="flex justify-between">
          <Link href="/" className="rounded-sm bg-secondary px-4 py-2 text-sm text-white hover:bg-accent">
            Continue Shopping
          </Link>
          <button type="button" onClick={clearCart} className="text-xs text-muted-foreground hover:text-white hover:underline">
            Remove all items
          </button>
        </div>
        <EarnBucks compact />
      </div>

      <aside aria-label="Order summary" className="flex h-fit flex-col gap-3 rounded-sm bg-[#2a475e]/60 p-4">
        <dl className="flex flex-col gap-2 text-sm">
          {savings > 0 && (
            <div className="flex justify-between text-sale-foreground">
              <dt>You save</dt>
              <dd>{formatPrice(savings)}</dd>
            </div>
          )}
          <div className="flex justify-between text-lg text-white">
            <dt>Estimated total</dt>
            <dd>{formatPrice(cartTotal)}</dd>
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <dt>Staem Wallet</dt>
            <dd>{formatPrice(wallet)}</dd>
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <dt>Balance after purchase</dt>
            <dd className={shortfall > 0 ? 'text-destructive' : 'text-white'}>{formatPrice(wallet - cartTotal)}</dd>
          </div>
        </dl>
        {shortfall > 0 && (
          <p className="rounded-sm bg-destructive/15 p-2 text-xs text-[#ff9b9b]">
            You need {formatPrice(shortfall)} more. Maybe do some chores?
          </p>
        )}
        <button
          type="button"
          onClick={() => {
            if (checkout()) router.push('/library')
          }}
          disabled={shortfall > 0}
          className="rounded-sm bg-gradient-to-r from-buy to-[#588a1b] py-2.5 text-sm font-medium text-white hover:from-[#8ed629] hover:to-[#6aa621] disabled:cursor-not-allowed disabled:opacity-40"
        >
          Purchase with Staem Wallet
        </button>
        <p className="text-[11px] leading-relaxed text-muted-foreground">
          All sales are final. Refunds are available if you played less than 2 hours and cry convincingly.
        </p>
      </aside>
    </div>
  )
}
