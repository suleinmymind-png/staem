'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useMemo, useState } from 'react'
import { Search, X } from 'lucide-react'
import { PriceTag, ReviewSummary } from '@/components/price-tag'
import { useStore } from '@/components/store-provider'
import { allTags, finalPrice, formatPrice, formatReleaseDate, games, ratingScore } from '@/lib/games'
import { cn } from '@/lib/utils'

const sortOptions = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'release', label: 'Release Date' },
  { value: 'name', label: 'Name' },
  { value: 'price-asc', label: 'Lowest Price' },
  { value: 'price-desc', label: 'Highest Price' },
  { value: 'reviews', label: 'User Reviews' },
]

const MAX_PRICE = 6000

export function SearchResults() {
  const router = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()
  const { isOwned } = useStore()

  const q = params.get('q') ?? ''
  const sort = params.get('sort') ?? 'relevance'
  const tags = params.get('tags')?.split(',').filter(Boolean) ?? []
  const maxPrice = Number(params.get('maxPrice') ?? MAX_PRICE)
  const specials = params.get('specials') === '1'
  const hideOwned = params.get('hideOwned') === '1'

  const [draft, setDraft] = useState(q)

  function update(next: Record<string, string | null>) {
    const sp = new URLSearchParams(params.toString())
    for (const [key, value] of Object.entries(next)) {
      if (value === null || value === '') sp.delete(key)
      else sp.set(key, value)
    }
    const qs = sp.toString()
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false })
  }

  function toggleTag(tag: string) {
    const next = tags.includes(tag) ? tags.filter((t) => t !== tag) : [...tags, tag]
    update({ tags: next.join(',') || null })
  }

  const results = useMemo(() => {
    const term = q.trim().toLowerCase()
    const filtered = games.filter((g) => {
      if (term) {
        const haystack = `${g.title} ${g.developer} ${g.publisher} ${g.tags.join(' ')}`.toLowerCase()
        if (!haystack.includes(term)) return false
      }
      if (tags.length && !tags.every((t) => g.tags.includes(t))) return false
      if (maxPrice < MAX_PRICE && finalPrice(g) > maxPrice) return false
      if (specials && g.discount === 0) return false
      if (hideOwned && isOwned(g.slug)) return false
      return true
    })

    return filtered.sort((a, b) => {
      switch (sort) {
        case 'release':
          return b.releaseDate.localeCompare(a.releaseDate)
        case 'name':
          return a.title.localeCompare(b.title)
        case 'price-asc':
          return finalPrice(a) - finalPrice(b)
        case 'price-desc':
          return finalPrice(b) - finalPrice(a)
        case 'reviews':
          return ratingScore[b.rating] - ratingScore[a.rating] || b.reviewCount - a.reviewCount
        default: {
          if (!term) return a.topSellerRank - b.topSellerRank
          const aStarts = a.title.toLowerCase().startsWith(term) ? 0 : 1
          const bStarts = b.title.toLowerCase().startsWith(term) ? 0 : 1
          return aStarts - bStarts || a.topSellerRank - b.topSellerRank
        }
      }
    })
  }, [q, tags, maxPrice, specials, hideOwned, sort, isOwned])

  const hasFilters = q || tags.length || maxPrice < MAX_PRICE || specials || hideOwned

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-light text-white">
        {q ? (
          <>
            {'Search results for '}
            <span className="font-medium text-primary">&ldquo;{q}&rdquo;</span>
          </>
        ) : (
          'Browse all games'
        )}
      </h1>

      <div className="grid gap-6 lg:grid-cols-[1fr_260px]">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-2 rounded-sm bg-[#2a475e]/60 p-3 sm:flex-row sm:items-center">
            <form
              role="search"
              className="relative flex-1"
              onSubmit={(e) => {
                e.preventDefault()
                update({ q: draft.trim() || null })
              }}
            >
              <label htmlFor="search-term" className="sr-only">
                Search term
              </label>
              <input
                id="search-term"
                type="search"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Enter search term or tag"
                className="h-9 w-full rounded-sm bg-[#1b2838] pl-3 pr-24 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button
                type="submit"
                className="absolute right-1 top-1 flex h-7 items-center gap-1 rounded-sm bg-gradient-to-r from-primary to-[#417a9b] px-3 text-xs font-medium text-white hover:brightness-110"
              >
                <Search className="size-3.5" aria-hidden />
                Search
              </button>
            </form>
            <div className="flex items-center gap-2">
              <label htmlFor="sort" className="text-xs text-muted-foreground">
                Sort by
              </label>
              <select
                id="sort"
                value={sort}
                onChange={(e) => update({ sort: e.target.value === 'relevance' ? null : e.target.value })}
                className="h-9 rounded-sm bg-[#1b2838] px-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-primary"
              >
                {sortOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <span>
              {results.length} result{results.length === 1 ? '' : 's'} match your search.
            </span>
            {tags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                className="flex items-center gap-1 rounded-sm bg-primary/15 px-2 py-0.5 text-primary hover:bg-primary/25"
              >
                {tag}
                <X className="size-3" aria-hidden />
                <span className="sr-only">Remove tag filter</span>
              </button>
            ))}
            {hasFilters ? (
              <button
                type="button"
                onClick={() => {
                  setDraft('')
                  router.replace(pathname, { scroll: false })
                }}
                className="text-primary underline-offset-2 hover:underline"
              >
                Clear all
              </button>
            ) : null}
          </div>

          {results.length === 0 ? (
            <div className="rounded-sm bg-card p-8 text-center">
              <p className="text-white">0 results match your search.</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Even Half-Wife 3 shows up more often than this. Try fewer filters.
              </p>
            </div>
          ) : (
            <ul className="flex flex-col gap-1">
              {results.map((game) => (
                <li key={game.slug}>
                  <Link
                    href={`/game/${game.slug}`}
                    className="grid grid-cols-[120px_1fr] items-center gap-3 rounded-sm bg-card/90 pr-3 transition hover:bg-[#2a475e] sm:grid-cols-[184px_1fr_auto_auto]"
                  >
                    <Image
                      src={game.image}
                      alt=""
                      width={184}
                      height={69}
                      className="h-[69px] w-full object-cover"
                    />
                    <div className="min-w-0 py-2">
                      <p className="truncate text-sm text-white">{game.title}</p>
                      <p className="truncate text-xs text-muted-foreground">
                        {game.developer} · {formatReleaseDate(game)}
                      </p>
                      <div className="mt-1 flex items-center gap-2 sm:hidden">
                        <PriceTag game={game} />
                      </div>
                    </div>
                    <div className="hidden w-40 sm:block">
                      <ReviewSummary game={game} />
                      {isOwned(game.slug) && (
                        <p className="mt-1 text-[11px] font-semibold uppercase text-buy">In Library</p>
                      )}
                    </div>
                    <div className="hidden w-32 justify-end sm:flex">
                      <PriceTag game={game} />
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <aside aria-label="Filters" className="flex flex-col gap-3">
          <FilterBox title="Narrow by Price">
            <label htmlFor="max-price" className="sr-only">
              Maximum price
            </label>
            <input
              id="max-price"
              type="range"
              min={0}
              max={MAX_PRICE}
              step={500}
              value={maxPrice}
              onChange={(e) => {
                const value = Number(e.target.value)
                update({ maxPrice: value >= MAX_PRICE ? null : String(value) })
              }}
              className="w-full accent-primary"
            />
            <p className="text-xs text-white">
              {maxPrice >= MAX_PRICE ? 'Any Price' : maxPrice === 0 ? 'Free' : `Under ${formatPrice(maxPrice)}`}
            </p>
            <Checkbox
              label="Special Offers only"
              checked={specials}
              onChange={(v) => update({ specials: v ? '1' : null })}
            />
            <Checkbox
              label="Hide games I own"
              checked={hideOwned}
              onChange={(v) => update({ hideOwned: v ? '1' : null })}
            />
          </FilterBox>

          <FilterBox title="Narrow by Tag">
            <ul className="flex flex-col">
              {allTags.map((tag) => {
                const count = games.filter((g) => g.tags.includes(tag)).length
                return (
                  <li key={tag}>
                    <Checkbox
                      label={tag}
                      suffix={String(count)}
                      checked={tags.includes(tag)}
                      onChange={() => toggleTag(tag)}
                    />
                  </li>
                )
              })}
            </ul>
          </FilterBox>
        </aside>
      </div>
    </div>
  )
}

function FilterBox({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-sm bg-[#2a475e]/50">
      <h2 className="border-b border-black/20 px-3 py-2 text-xs font-medium uppercase tracking-wide text-white/90">
        {title}
      </h2>
      <div className="flex max-h-96 flex-col gap-2 overflow-y-auto p-3">{children}</div>
    </section>
  )
}

function Checkbox({
  label,
  checked,
  onChange,
  suffix,
}: {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
  suffix?: string
}) {
  return (
    <label
      className={cn(
        'flex cursor-pointer items-center gap-2 rounded-sm px-1 py-1 text-xs transition hover:bg-white/5',
        checked ? 'text-primary' : 'text-foreground/80',
      )}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="size-3.5 accent-primary"
      />
      <span className="flex-1">{label}</span>
      {suffix && <span className="text-muted-foreground">{suffix}</span>}
    </label>
  )
}
