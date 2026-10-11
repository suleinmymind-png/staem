import { finalPrice, formatPrice, type Game, type ReviewRating } from '@/lib/games'
import { cn } from '@/lib/utils'

export function PriceTag({ game, size = 'sm', className }: { game: Game; size?: 'sm' | 'lg'; className?: string }) {
  if (game.comingSoon) {
    return <span className={cn('text-xs text-muted-foreground', className)}>Coming Soon™</span>
  }
  if (game.price === 0) {
    return <span className={cn('text-sm text-white', className)}>Free to Play</span>
  }
  if (game.discount === 0) {
    return (
      <span className={cn('text-white', size === 'lg' ? 'text-base' : 'text-sm', className)}>
        {formatPrice(game.price)}
      </span>
    )
  }
  return (
    <span className={cn('inline-flex items-stretch', className)}>
      <span
        className={cn(
          'flex items-center bg-sale px-1.5 font-bold text-sale-foreground',
          size === 'lg' ? 'text-2xl' : 'text-base',
        )}
      >
        -{game.discount}%
      </span>
      <span className="flex flex-col justify-center bg-[#344654] px-1.5 text-right leading-tight">
        <span className="text-[11px] text-[#738895] line-through">
          <span className="sr-only">Original price </span>
          {formatPrice(game.price)}
        </span>
        <span className={cn('text-sale-foreground', size === 'lg' ? 'text-sm' : 'text-[13px]')}>
          <span className="sr-only">Sale price </span>
          {formatPrice(finalPrice(game))}
        </span>
      </span>
    </span>
  )
}

const ratingColor: Record<ReviewRating, string> = {
  'Overwhelmingly Positive': 'text-primary',
  'Very Positive': 'text-primary',
  'Mostly Positive': 'text-primary',
  Mixed: 'text-[#b9a074]',
  'Mostly Negative': 'text-[#a34c25]',
}

export function ReviewSummary({ game, showCount = false }: { game: Game; showCount?: boolean }) {
  return (
    <span className="text-xs">
      <span className={ratingColor[game.rating]}>{game.rating}</span>
      {showCount && (
        <span className="text-muted-foreground"> ({game.reviewCount.toLocaleString('en-US')})</span>
      )}
    </span>
  )
}
