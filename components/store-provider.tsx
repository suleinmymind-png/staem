'use client'

import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'
import { STARTING_WALLET, finalPrice, getGameBySlug, type Game } from '@/lib/games'

type OwnedGame = { slug: string; paid: number; saved: number; purchasedAt: number }

type Toast = { id: number; message: string; tone: 'success' | 'error' | 'info' }

type StoreContextValue = {
  wallet: number
  cart: Game[]
  cartTotal: number
  library: OwnedGame[]
  wishlist: string[]
  toast: Toast | null
  isInCart: (slug: string) => boolean
  isOwned: (slug: string) => boolean
  isWishlisted: (slug: string) => boolean
  addToCart: (slug: string) => void
  removeFromCart: (slug: string) => void
  clearCart: () => void
  toggleWishlist: (slug: string) => void
  checkout: () => boolean
  addFunds: (cents: number, reason: string) => void
}

const StoreContext = createContext<StoreContextValue | null>(null)

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [wallet, setWallet] = useState(STARTING_WALLET)
  const [cartSlugs, setCartSlugs] = useState<string[]>([])
  const [library, setLibrary] = useState<OwnedGame[]>([])
  const [wishlist, setWishlist] = useState<string[]>([])
  const [toast, setToast] = useState<Toast | null>(null)
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const notify = useCallback((message: string, tone: Toast['tone'] = 'success') => {
    if (toastTimer.current) clearTimeout(toastTimer.current)
    setToast({ id: Date.now(), message, tone })
    toastTimer.current = setTimeout(() => setToast(null), 3200)
  }, [])

  const cart = useMemo(
    () => cartSlugs.map((s) => getGameBySlug(s)).filter((g): g is Game => Boolean(g)),
    [cartSlugs],
  )
  const cartTotal = useMemo(() => cart.reduce((sum, g) => sum + finalPrice(g), 0), [cart])

  const isInCart = useCallback((slug: string) => cartSlugs.includes(slug), [cartSlugs])
  const isOwned = useCallback((slug: string) => library.some((g) => g.slug === slug), [library])
  const isWishlisted = useCallback((slug: string) => wishlist.includes(slug), [wishlist])

  const addToCart = useCallback(
    (slug: string) => {
      const game = getGameBySlug(slug)
      if (!game) return
      if (game.comingSoon) return notify(`${game.title} isn’t out yet. It may never be.`, 'error')
      if (library.some((g) => g.slug === slug)) return notify('You already own this game.', 'info')
      if (cartSlugs.includes(slug)) return notify('Already in your cart.', 'info')
      setCartSlugs((prev) => [...prev, slug])
      notify(`Added ${game.title} to your cart`)
    },
    [cartSlugs, library, notify],
  )

  const removeFromCart = useCallback((slug: string) => {
    setCartSlugs((prev) => prev.filter((s) => s !== slug))
  }, [])

  const clearCart = useCallback(() => setCartSlugs([]), [])

  const toggleWishlist = useCallback(
    (slug: string) => {
      const game = getGameBySlug(slug)
      const has = wishlist.includes(slug)
      setWishlist((prev) => (has ? prev.filter((s) => s !== slug) : [...prev, slug]))
      notify(has ? `Removed ${game?.title} from wishlist` : `Wishlisted ${game?.title}`, 'info')
    },
    [wishlist, notify],
  )

  const checkout = useCallback(() => {
    if (cart.length === 0) return false
    if (cartTotal > wallet) {
      notify(`Insufficient funds. You need ${((cartTotal - wallet) / 100).toFixed(2)} more Vapor Bucks.`, 'error')
      return false
    }
    const now = Date.now()
    setWallet((w) => w - cartTotal)
    setLibrary((prev) => [
      ...cart.map((g) => ({ slug: g.slug, paid: finalPrice(g), saved: g.price - finalPrice(g), purchasedAt: now })),
      ...prev,
    ])
    setCartSlugs([])
    notify(`Purchase complete! ${cart.length} game${cart.length > 1 ? 's' : ''} added to your library.`)
    return true
  }, [cart, cartTotal, wallet, notify])

  const addFunds = useCallback(
    (cents: number, reason: string) => {
      setWallet((w) => w + cents)
      notify(`+$${(cents / 100).toFixed(2)} — ${reason}`)
    },
    [notify],
  )

  const value = useMemo<StoreContextValue>(
    () => ({
      wallet,
      cart,
      cartTotal,
      library,
      wishlist,
      toast,
      isInCart,
      isOwned,
      isWishlisted,
      addToCart,
      removeFromCart,
      clearCart,
      toggleWishlist,
      checkout,
      addFunds,
    }),
    [wallet, cart, cartTotal, library, wishlist, toast, isInCart, isOwned, isWishlisted, addToCart, removeFromCart, clearCart, toggleWishlist, checkout, addFunds],
  )

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used within StoreProvider')
  return ctx
}
