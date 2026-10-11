'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Play } from 'lucide-react'
import { useStore } from '@/components/store-provider'
import { formatPrice, getGameBySlug } from '@/lib/games'

function shopperRank(count: number) {
  if (count === 0) return 'Window Shopper'
  if (count < 3) return 'Casual Collector'
  if (count < 6) return 'Sale Victim'
  if (count < 10) return 'Backlog Builder'
  return 'Never Plays, Always Buys'
}

export function LibraryView() {
  const { library, addFunds } = useStore()
  const spent = library.reduce((s, g) => s + g.paid, 0)
  const saved = library.reduce((s, g) => s + g.saved, 0)

  const stats = [
    { label: 'Games owned', value: String(library.length) },
    { label: 'Total spent', value: formatPrice(spent) },
    { label: 'Total "saved"', value: formatPrice(saved) },
    { label: 'Shopper rank', value: shopperRank(library.length) },
  ]

  return (
    <div className="flex flex-col gap-6">
      <dl className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-sm bg-card p-4">
            <dt className="text-xs uppercase text-muted-foreground">{s.label}</dt>
            <dd className="mt-1 text-lg font-medium text-white">{s.value}</dd>
          </div>
        ))}
      </dl>

      {library.length === 0 ? (
        <div className="rounded-sm bg-card p-10 text-center">
          <p className="text-lg text-white">Your library is empty.</p>
          <p className="mt-1 text-sm text-muted-foreground">A tragedy. The store is right over there.</p>
          <Link
            href="/search?specials=1"
            className="mt-4 inline-block rounded-sm bg-gradient-to-r from-buy to-[#588a1b] px-4 py-2 text-sm text-white hover:brightness-110"
          >
            Browse Special Offers
          </Link>
        </div>
      ) : (
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {library.map((owned) => {
            const game = getGameBySlug(owned.slug)
            if (!game) return null
            return (
              <li key={owned.slug} className="group overflow-hidden rounded-sm bg-card">
                <Link href={`/game/${game.slug}`} className="relative block aspect-video">
                  <Image src={game.image} alt={`${game.title} cover art`} fill sizes="280px" className="object-cover" />
                </Link>
                <div className="flex items-center justify-between gap-2 p-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm text-white">{game.title}</p>
                    <p className="text-xs text-muted-foreground">0.0 hrs on record</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => addFunds(1, `${game.title} launched for 3 seconds. You earned a trading card.`)}
                    className="flex shrink-0 items-center gap-1 rounded-sm bg-gradient-to-r from-buy to-[#588a1b] px-2.5 py-1 text-xs font-semibold uppercase text-white hover:brightness-110"
                  >
                    <Play className="size-3 fill-current" aria-hidden />
                    Play
                  </button>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
