import type { Metadata } from 'next'
import { LibraryView } from '@/components/library/library-view'

export const metadata: Metadata = { title: 'Library — STAEM' }

export default function LibraryPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-6 text-3xl font-light uppercase tracking-wide text-white">Your Library</h1>
      <LibraryView />
    </main>
  )
}
