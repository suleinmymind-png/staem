import Link from 'next/link'
import { GameCapsule } from '@/components/game-capsule'
import type { Game } from '@/lib/games'

export function SpecialOffers({ games }: { games: Game[] }) {
  return (
    <section aria-labelledby="specials-heading">
      <div className="mb-2 flex items-end justify-between">
        <h2 id="specials-heading" className="text-sm font-medium uppercase tracking-wide text-white">
          Special Offers
        </h2>
        <Link
          href="/search?specials=1"
          className="rounded-sm border border-white/20 px-3 py-1 text-xs text-white hover:border-primary hover:text-primary"
        >
          Browse more
        </Link>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {games.map((game) => (
          <GameCapsule key={game.slug} game={game} />
        ))}
      </div>
    </section>
  )
}
