import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronRight } from 'lucide-react'
import { GameCapsule } from '@/components/game-capsule'
import { ReviewSummary } from '@/components/price-tag'
import { PurchaseBox } from '@/components/game/purchase-box'
import { formatReleaseDate, games, getGameBySlug } from '@/lib/games'

export function generateStaticParams() {
  return games.map((g) => ({ slug: g.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const game = getGameBySlug(slug)
  if (!game) return { title: 'Game not found — STAEM Store' }
  return { title: `${game.title} on STAEM`, description: game.shortDescription }
}

export default async function GamePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const game = getGameBySlug(slug)
  if (!game) notFound()

  const related = games
    .filter((g) => g.slug !== game.slug && g.tags.some((t) => game.tags.includes(t)))
    .slice(0, 4)

  return (
    <main className="relative">
      <div className="absolute inset-x-0 top-0 -z-10 h-[600px] overflow-hidden">
        <Image src={game.image} alt="" fill sizes="100vw" className="object-cover opacity-15 blur-2xl" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
      </div>

      <div className="mx-auto max-w-[940px] px-4 py-6">
        <nav aria-label="Breadcrumb" className="mb-1 flex items-center gap-1 text-xs text-muted-foreground">
          <Link href="/search" className="hover:text-white">
            All Games
          </Link>
          <ChevronRight className="size-3" aria-hidden />
          <Link href={`/search?tags=${encodeURIComponent(game.tags[0])}`} className="hover:text-white">
            {game.tags[0]} Games
          </Link>
          <ChevronRight className="size-3" aria-hidden />
          <span className="text-foreground">{game.title}</span>
        </nav>
        <h1 className="mb-4 text-balance text-3xl font-medium text-white">{game.title}</h1>

        <div className="grid gap-4 bg-black/20 p-0 md:grid-cols-[1.7fr_1fr]">
          <div className="relative aspect-video">
            <Image
              src={game.image}
              alt={`${game.title} key art`}
              fill
              priority
              sizes="(min-width: 768px) 600px, 100vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col gap-3 p-3 md:pl-0">
            <p className="text-sm leading-relaxed text-foreground/90">{game.shortDescription}</p>
            <dl className="grid grid-cols-[110px_1fr] gap-y-1.5 text-xs">
              <dt className="uppercase text-muted-foreground">All reviews:</dt>
              <dd>
                <ReviewSummary game={game} showCount />
              </dd>
              <dt className="uppercase text-muted-foreground">Release date:</dt>
              <dd className="text-foreground">{formatReleaseDate(game)}</dd>
              <dt className="uppercase text-muted-foreground">Developer:</dt>
              <dd>
                <Link href={`/search?q=${encodeURIComponent(game.developer)}`} className="text-primary hover:text-white">
                  {game.developer}
                </Link>
              </dd>
              <dt className="uppercase text-muted-foreground">Publisher:</dt>
              <dd className="text-primary">{game.publisher}</dd>
            </dl>
            <div>
              <p className="mb-1 text-xs text-muted-foreground">Popular user-defined tags for this product:</p>
              <ul className="flex flex-wrap gap-1">
                {game.tags.map((tag) => (
                  <li key={tag}>
                    <Link
                      href={`/search?tags=${encodeURIComponent(tag)}`}
                      className="block rounded-sm bg-primary/15 px-2 py-0.5 text-xs text-primary hover:bg-primary hover:text-header"
                    >
                      {tag}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-8 md:grid-cols-[1fr_300px]">
          <div className="flex flex-col gap-8">
            <PurchaseBox game={game} />

            <section aria-labelledby="about-heading">
              <h2
                id="about-heading"
                className="mb-3 border-b border-primary/30 pb-1 text-sm uppercase tracking-wide text-white"
              >
                About this game
              </h2>
              <div className="flex flex-col gap-3 text-sm leading-relaxed text-foreground/80">
                {game.description.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </section>

            <section aria-labelledby="req-heading">
              <h2
                id="req-heading"
                className="mb-3 border-b border-primary/30 pb-1 text-sm uppercase tracking-wide text-white"
              >
                System requirements
              </h2>
              <dl className="grid grid-cols-[100px_1fr] gap-y-1.5 text-xs">
                {Object.entries(game.requirements).map(([key, value]) => (
                  <div key={key} className="contents">
                    <dt className="capitalize text-muted-foreground">{key}:</dt>
                    <dd className="text-foreground/90">{value}</dd>
                  </div>
                ))}
              </dl>
            </section>
          </div>

          <aside aria-labelledby="related-heading">
            <h2 id="related-heading" className="mb-3 text-sm uppercase tracking-wide text-white">
              More like this
            </h2>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-1">
              {related.map((g) => (
                <GameCapsule key={g.slug} game={g} />
              ))}
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}
