import Image from 'next/image'
import Link from 'next/link'
import { PriceTag } from '@/components/price-tag'
import type { Game } from '@/lib/games'

export function GameCapsule({ game }: { game: Game }) {
  return (
    <Link
      href={`/game/${game.slug}`}
      className="group flex flex-col overflow-hidden rounded-sm bg-gradient-to-b from-[#2a475e] to-[#1e3448] shadow-lg transition hover:-translate-y-0.5 hover:shadow-primary/10"
    >
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={game.image}
          alt={`${game.title} cover art`}
          fill
          sizes="(min-width: 1024px) 280px, (min-width: 640px) 45vw, 90vw"
          className="object-cover transition duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-3">
        <h3 className="line-clamp-1 text-sm font-medium text-white">{game.title}</h3>
        <ul className="flex flex-wrap gap-1" aria-label="Tags">
          {game.tags.slice(0, 2).map((tag) => (
            <li key={tag} className="rounded-sm bg-primary/10 px-1.5 py-0.5 text-[11px] text-primary/90">
              {tag}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex justify-end">
          <PriceTag game={game} />
        </div>
      </div>
    </Link>
  )
}
