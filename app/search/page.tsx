import type { Metadata } from 'next'
import { Suspense } from 'react'
import { SearchResults } from '@/components/search/search-results'

export const metadata: Metadata = {
  title: 'Search — VAPOR Store',
  description: 'Search and filter the VAPOR catalog of definitely-real games.',
}

export default function SearchPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <Suspense fallback={<p className="text-sm text-muted-foreground">Loading search…</p>}>
        <SearchResults />
      </Suspense>
    </main>
  )
}
