'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Library, ShoppingCart, Wallet } from 'lucide-react'
import { useStore } from '@/components/store-provider'
import { HeaderSearch } from '@/components/header-search'
import { formatPrice } from '@/lib/games'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/', label: 'Store' },
  { href: '/search', label: 'Browse' },
  { href: '/library', label: 'Library' },
]

export function SiteHeader() {
  const pathname = usePathname()
  const { wallet, cart } = useStore()

  return (
    <header className="sticky top-0 z-40 bg-header/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-6 px-4 py-3">
        <Link href="/" className="flex items-center gap-2" aria-label="VAPOR Store home">
          <span className="flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-[#1a44c2] text-sm font-black text-header">
            V
          </span>
          <span className="text-xl font-black tracking-[0.2em] text-white">VAPOR</span>
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-5">
            {navLinks.map((link) => {
              const active = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href)
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      'text-sm font-semibold uppercase tracking-wide transition-colors hover:text-white',
                      active ? 'text-primary underline decoration-2 underline-offset-8' : 'text-foreground/80',
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Link
            href="/cart"
            className="hidden items-center gap-1.5 rounded-sm bg-secondary px-3 py-1.5 text-xs text-white hover:bg-accent sm:flex"
            title="Your Vapor Bucks balance"
          >
            <Wallet className="size-4" aria-hidden />
            <span className="sr-only">Wallet balance:</span>
            {formatPrice(wallet)}
          </Link>
          <Link
            href="/library"
            className="flex items-center rounded-sm p-2 text-foreground hover:bg-secondary md:hidden"
            aria-label="Library"
          >
            <Library className="size-4" aria-hidden />
          </Link>
          <Link
            href="/cart"
            className="flex items-center gap-1.5 rounded-sm bg-buy px-3 py-1.5 text-xs font-semibold text-buy-foreground hover:brightness-110"
          >
            <ShoppingCart className="size-4" aria-hidden />
            Cart ({cart.length})
          </Link>
        </div>
      </div>

      <div className="bg-gradient-to-r from-[#3e6a8a] via-[#2b5170] to-[#1f3d57] shadow-md">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-1.5">
          <div className="hidden gap-4 text-xs text-white/90 sm:flex">
            <Link href="/search?specials=1" className="hover:text-white">
              Special Offers
            </Link>
            <Link href="/search?sort=release" className="hover:text-white">
              New &amp; Noteworthy
            </Link>
            <Link href="/search?maxPrice=1000" className="hover:text-white">
              Under $10
            </Link>
          </div>
          <HeaderSearch />
        </div>
      </div>
    </header>
  )
}
