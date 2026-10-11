'use client'

import { Heart } from 'lucide-react'
import { AddToCartButton } from '@/components/add-to-cart-button'
import { PriceTag } from '@/components/price-tag'
import { useStore } from '@/components/store-provider'
import type { Game } from '@/lib/games'
import { cn } from '@/lib/utils'

export function PurchaseBox({ game }: { game: Game }) {
  const { isWishlisted, toggleWishlist, isOwned } = useStore()
  const wished = isWishlisted(game.slug)
  const owned = isOwned(game.slug)

  return (
    <div className="flex flex-col gap-3">
      {owned && (
        <div className="rounded-sm bg-gradient-to-r from-[#4c6b22] to-[#2f4413] px-4 py-3 text-sm text-white">
          {game.title} is already in your STAEM library. Time to not play it.
        </div>
      )}
      <section
        aria-label={`Buy ${game.title}`}
        className="relative rounded-sm bg-gradient-to-r from-[#3d5a73]/60 to-[#2a475e]/60 px-4 pb-8 pt-4"
      >
        <h2 className="text-lg text-white">
          {game.comingSoon ? `Pre-purchase ${game.title}` : game.price === 0 ? `Play ${game.title}` : `Buy ${game.title}`}
        </h2>
        {game.comingSoon && (
          <p className="mt-1 text-xs text-muted-foreground">
            The developers could not count to three. Pre-purchase is not available.
          </p>
        )}
        <div className="absolute -bottom-4 right-4 flex items-center gap-1 rounded-sm bg-black p-1">
          <PriceTag game={game} size="lg" className="px-2" />
          <AddToCartButton game={game} />
        </div>
      </section>

      <button
        type="button"
        onClick={() => toggleWishlist(game.slug)}
        aria-pressed={wished}
        className={cn(
          'mt-4 inline-flex w-fit items-center gap-2 rounded-sm px-3 py-1.5 text-xs transition',
          wished ? 'bg-primary text-header' : 'bg-secondary text-white hover:bg-accent',
        )}
      >
        <Heart className={cn('size-3.5', wished && 'fill-current')} aria-hidden />
        {wished ? 'On Wishlist' : 'Add to your wishlist'}
      </button>
    </div>
  )
}
