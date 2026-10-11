'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { PriceTag, ReviewSummary } from '@/components/price-tag'
import { formatReleaseDate, type Game } from '@/lib/games'
import { cn } from '@/lib/utils'

type Tab = { id: string; label: string; games: Game[] }

export function GameTabs({ tabs }: { tabs: Tab[] }) {
  const [activeId, setActiveId] = useState(tabs[0].id)
  const active = tabs.find((t) => t.id === activeId) ?? tabs[0]
  const [hovered, setHovered] = useState<Game>(active.games[0])
  const preview = active.games.includes(hovered) ? hovered : active.games[0]

  return (
    <section aria-label="Browse by list">
      <div role="tablist" className="flex gap-1 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            id={`tab-${tab.id}`}
            aria-selected={tab.id === activeId}
            aria-controls={`panel-${tab.id}`}
            onClick={() => setActiveId(tab.id)}
            className={cn(
              'whitespace-nowrap rounded-t-sm px-4 py-2 text-sm transition',
              tab.id === activeId ? 'bg-[#2a475e] text-white' : 'text-foreground/70 hover:text-white',
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        id={`panel-${active.id}`}
        aria-labelledby={`tab-${active.id}`}
        className="grid gap-3 bg-[#2a475e]/40 p-2 lg:grid-cols-[1fr_300px]"
      >
        <ol className="flex flex-col gap-1">
          {active.games.map((game) => (
            <li key={game.slug}>
              <Link
                href={`/game/${game.slug}`}
                onMouseEnter={() => setHovered(game)}
                onFocus={() => setHovered(game)}
                className={cn(
                  'flex items-center gap-3 rounded-sm bg-card/80 pr-3 transition',
                  preview.slug === game.slug ? 'bg-[#95bcd3]/20' : 'hover:bg-[#95bcd3]/10',
                )}
              >
                <Image
                  src={game.image}
                  alt=""
                  width={184}
                  height={69}
                  className="h-[60px] w-[120px] shrink-0 object-cover sm:w-[160px]"
                />
                <div className="min-w-0 flex-1 py-1">
                  <p className="truncate text-sm text-white">{game.title}</p>
                  <p className="truncate text-xs text-muted-foreground">{game.tags.slice(0, 3).join(', ')}</p>
                </div>
                <PriceTag game={game} className="shrink-0" />
              </Link>
            </li>
          ))}
        </ol>

        <aside aria-label="Preview" className="hidden flex-col gap-2 rounded-sm bg-[#3d5a73]/60 p-3 lg:flex">
          <p className="text-lg font-medium text-white">{preview.title}</p>
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Overall user reviews:</span>
            <ReviewSummary game={preview} />
          </div>
          <p className="text-xs text-muted-foreground">Released: {formatReleaseDate(preview)}</p>
          <ul className="flex flex-wrap gap-1" aria-label="Tags">
            {preview.tags.map((tag) => (
              <li key={tag} className="rounded-sm bg-white/10 px-1.5 py-0.5 text-[11px] text-white/80">
                {tag}
              </li>
            ))}
          </ul>
          <div className="relative mt-1 aspect-video overflow-hidden rounded-sm">
            <Image src={preview.image} alt={`${preview.title} screenshot`} fill sizes="300px" className="object-cover" />
          </div>
          <p className="text-xs leading-relaxed text-foreground/80">{preview.shortDescription}</p>
        </aside>
      </div>
    </section>
  )
}
