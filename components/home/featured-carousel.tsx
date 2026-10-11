'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { AddToCartButton } from '@/components/add-to-cart-button'
import { PriceTag, ReviewSummary } from '@/components/price-tag'
import type { Game } from '@/lib/games'
import { cn } from '@/lib/utils'

export function FeaturedCarousel({ games }: { games: Game[] }) {
  const [index, setIndex] = useState(0)
  const game = games[index]
  const go = (delta: number) => setIndex((i) => (i + delta + games.length) % games.length)

  return (
    <section aria-labelledby="featured-heading" aria-roledescription="carousel">
      <h2 id="featured-heading" className="mb-2 text-sm font-medium uppercase tracking-wide text-white">
        Featured &amp; Recommended
      </h2>

      <div className="relative">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous featured game"
          className="absolute -left-12 top-1/2 hidden h-24 w-9 -translate-y-1/2 items-center justify-center rounded-sm bg-gradient-to-r from-black/30 to-transparent text-white hover:from-primary/30 lg:flex"
        >
          <ChevronLeft className="size-8" aria-hidden />
        </button>

        <div
          key={game.slug}
          className="grid overflow-hidden rounded-sm bg-card shadow-2xl animate-in fade-in md:grid-cols-[1.7fr_1fr]"
          aria-roledescription="slide"
          aria-label={`${index + 1} of ${games.length}`}
        >
          <Link href={`/game/${game.slug}`} className="relative block aspect-video">
            <Image
              src={game.image}
              alt={`${game.title} cover art`}
              fill
              priority
              sizes="(min-width: 768px) 640px, 100vw"
              className="object-cover"
            />
          </Link>
          <div className="flex flex-col gap-3 bg-gradient-to-br from-[#0f1e2c] to-[#1d3a52] p-4">
            <Link href={`/game/${game.slug}`} className="text-balance text-2xl font-semibold text-white hover:text-primary">
              {game.title}
            </Link>
            <p className="line-clamp-4 text-sm leading-relaxed text-foreground/80">{game.shortDescription}</p>
            <div className="flex flex-col gap-1">
              <span className="text-[11px] uppercase text-muted-foreground">All reviews</span>
              <ReviewSummary game={game} showCount />
            </div>
            <ul className="flex flex-wrap gap-1" aria-label="Tags">
              {game.tags.map((tag) => (
                <li key={tag}>
                  <Link
                    href={`/search?tags=${encodeURIComponent(tag)}`}
                    className="block rounded-sm bg-white/10 px-2 py-0.5 text-[11px] text-white/80 hover:bg-primary hover:text-header"
                  >
                    {tag}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-auto flex items-center justify-between gap-3 pt-2">
              <PriceTag game={game} />
              <AddToCartButton game={game} />
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next featured game"
          className="absolute -right-12 top-1/2 hidden h-24 w-9 -translate-y-1/2 items-center justify-center rounded-sm bg-gradient-to-l from-black/30 to-transparent text-white hover:from-primary/30 lg:flex"
        >
          <ChevronRight className="size-8" aria-hidden />
        </button>
      </div>

      <div className="mt-3 flex justify-center gap-1.5">
        {games.map((g, i) => (
          <button
            key={g.slug}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Show ${g.title}`}
            aria-current={i === index}
            className={cn(
              'h-2.5 w-4 rounded-sm transition',
              i === index ? 'bg-white/70' : 'bg-white/20 hover:bg-white/40',
            )}
          />
        ))}
      </div>
    </section>
  )
}
