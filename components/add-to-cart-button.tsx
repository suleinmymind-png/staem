'use client'

import Link from 'next/link'
import { useStore } from '@/components/store-provider'
import type { Game } from '@/lib/games'
import { cn } from '@/lib/utils'

export function AddToCartButton({ game, className }: { game: Game; className?: string }) {
  const { addToCart, isInCart, isOwned } = useStore()

  const base = 'inline-flex items-center justify-center rounded-sm px-4 py-1.5 text-sm font-medium transition'

  if (isOwned(game.slug)) {
    return (
      <Link href="/library" className={cn(base, 'bg-secondary text-white hover:bg-accent', className)}>
        In Library
      </Link>
    )
  }
  if (isInCart(game.slug)) {
    return (
      <Link href="/cart" className={cn(base, 'bg-secondary text-white hover:bg-accent', className)}>
        In Cart
      </Link>
    )
  }
  if (game.comingSoon) {
    return (
      <button type="button" disabled className={cn(base, 'cursor-not-allowed bg-muted text-muted-foreground', className)}>
        Not Available
      </button>
    )
  }
  return (
    <button
      type="button"
      onClick={() => addToCart(game.slug)}
      className={cn(
        base,
        'bg-gradient-to-r from-buy to-[#588a1b] text-buy-foreground hover:from-[#8ed629] hover:to-[#6aa621]',
        className,
      )}
    >
      {game.price === 0 ? 'Play Game' : 'Add to Cart'}
    </button>
  )
}
