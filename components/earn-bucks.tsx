'use client'

import { Coins } from 'lucide-react'
import { useStore } from '@/components/store-provider'
import { formatPrice } from '@/lib/games'

const gigs = [
  { label: 'Check couch cushions', amount: 237, reason: 'found loose change in the couch' },
  { label: 'Sell trading cards', amount: 412, reason: 'sold 47 trading cards for pennies each' },
  { label: 'Mow the lawn', amount: 1500, reason: 'your neighbor’s lawn has never looked better' },
]

export function EarnBucks({ compact = false }: { compact?: boolean }) {
  const { wallet, addFunds } = useStore()

  return (
    <section
      aria-labelledby="earn-heading"
      className="flex flex-col gap-3 rounded-sm bg-gradient-to-r from-[#1f3d57] to-[#2a475e] p-4 sm:flex-row sm:items-center"
    >
      <div className="flex items-center gap-3">
        <span className="flex size-10 items-center justify-center rounded-full bg-sale text-sale-foreground">
          <Coins className="size-5" aria-hidden />
        </span>
        <div>
          <h2 id="earn-heading" className="text-sm font-semibold text-white">
            {compact ? 'Short on funds?' : 'Your Staem Wallet'}
          </h2>
          <p className="text-xs text-muted-foreground">
            Balance: <span className="font-semibold text-white">{formatPrice(wallet)}</span> Staem Bucks
          </p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 sm:ml-auto">
        {gigs.map((gig) => (
          <button
            key={gig.label}
            type="button"
            onClick={() => addFunds(gig.amount, gig.reason)}
            className="rounded-sm bg-white/10 px-3 py-1.5 text-xs text-white transition hover:bg-primary hover:text-header"
          >
            {gig.label} <span className="text-sale-foreground">+{formatPrice(gig.amount)}</span>
          </button>
        ))}
      </div>
    </section>
  )
}
