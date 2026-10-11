'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useId, useState } from 'react'
import { Search } from 'lucide-react'
import { finalPrice, formatPrice, games } from '@/lib/games'

export function HeaderSearch() {
  const router = useRouter()
  const listId = useId()
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)

  const trimmed = query.trim().toLowerCase()
  const suggestions = trimmed
    ? games
        .filter((g) => g.title.toLowerCase().includes(trimmed) || g.tags.some((t) => t.toLowerCase().includes(trimmed)))
        .slice(0, 5)
    : []

  function submit(e: React.FormEvent) {
    e.preventDefault()
    setOpen(false)
    router.push(trimmed ? `/search?q=${encodeURIComponent(query.trim())}` : '/search')
  }

  return (
    <form role="search" onSubmit={submit} className="relative ml-auto w-full max-w-xs">
      <label htmlFor="header-search" className="sr-only">
        Search the store
      </label>
      <input
        id="header-search"
        type="search"
        autoComplete="off"
        placeholder="search"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value)
          setOpen(true)
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        aria-controls={listId}
        aria-expanded={open && suggestions.length > 0}
        className="h-8 w-full rounded-sm border border-black/30 bg-[#316282]/60 pl-3 pr-9 text-sm text-white placeholder:italic placeholder:text-white/60 focus:bg-[#316282] focus:outline-none focus:ring-1 focus:ring-primary"
      />
      <button
        type="submit"
        aria-label="Search"
        className="absolute right-1 top-1 flex size-6 items-center justify-center rounded-sm bg-primary/30 text-white hover:bg-primary hover:text-header"
      >
        <Search className="size-3.5" aria-hidden />
      </button>

      {open && suggestions.length > 0 && (
        <ul
          id={listId}
          className="absolute right-0 top-full z-50 mt-1 w-full min-w-72 overflow-hidden rounded-sm bg-popover shadow-xl"
        >
          {suggestions.map((g) => (
            <li key={g.slug}>
              <Link
                href={`/game/${g.slug}`}
                onClick={() => {
                  setOpen(false)
                  setQuery('')
                }}
                className="flex items-center gap-3 p-2 hover:bg-[#4d5868]"
              >
                <Image src={g.image} alt="" width={96} height={54} className="h-[36px] w-16 rounded-sm object-cover" />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm text-white">{g.title}</span>
                  <span className="text-xs text-muted-foreground">
                    {g.comingSoon ? 'Coming soon' : g.price === 0 ? 'Free to Play' : formatPrice(finalPrice(g))}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </form>
  )
}
