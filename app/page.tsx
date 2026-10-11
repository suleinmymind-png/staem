import { FeaturedCarousel } from '@/components/home/featured-carousel'
import { SpecialOffers } from '@/components/home/special-offers'
import { GameTabs } from '@/components/home/game-tabs'
import { BrowseTags } from '@/components/home/browse-tags'
import { EarnBucks } from '@/components/earn-bucks'
import { games } from '@/lib/games'

export default function HomePage() {
  const released = games.filter((g) => !g.comingSoon)
  const featured = [...released].sort((a, b) => a.topSellerRank - b.topSellerRank).slice(0, 6)
  const specials = released
    .filter((g) => g.discount > 0)
    .sort((a, b) => b.discount - a.discount)
    .slice(0, 4)

  const tabs = [
    {
      id: 'new',
      label: 'New & Trending',
      games: [...released].sort((a, b) => b.releaseDate.localeCompare(a.releaseDate)).slice(0, 8),
    },
    {
      id: 'top',
      label: 'Top Sellers',
      games: [...released].sort((a, b) => a.topSellerRank - b.topSellerRank).slice(0, 8),
    },
    {
      id: 'cheap',
      label: 'Under $10',
      games: released.filter((g) => Math.round(g.price * (1 - g.discount / 100)) < 1000).slice(0, 8),
    },
    {
      id: 'upcoming',
      label: 'Upcoming',
      games: games.filter((g) => g.comingSoon),
    },
  ]

  return (
    <main className="relative">
      <div className="absolute inset-x-0 top-0 -z-10 h-[520px] bg-gradient-to-b from-[#0e3a5c]/60 to-transparent" />
      <div className="mx-auto flex max-w-[940px] flex-col gap-10 px-4 py-8">
        <h1 className="sr-only">STAEM Store</h1>
        <FeaturedCarousel games={featured} />
        <EarnBucks />
        <SpecialOffers games={specials} />
        <BrowseTags />
        <GameTabs tabs={tabs} />
      </div>
    </main>
  )
}
