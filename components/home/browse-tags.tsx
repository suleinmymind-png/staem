import Link from 'next/link'

const featuredTags = [
  { tag: 'Souls-like', gradient: 'from-[#5b1d1d] to-[#1b0c0c]' },
  { tag: 'Cozy', gradient: 'from-[#4f7a2c] to-[#1c3112]' },
  { tag: 'Open World', gradient: 'from-[#2c5a7a] to-[#0f2233]' },
  { tag: 'Co-op', gradient: 'from-[#7a4b2c] to-[#2e1a0d]' },
  { tag: 'Strategy', gradient: 'from-[#5a2c7a] to-[#1f0f33]' },
  { tag: 'Simulation', gradient: 'from-[#2c7a6d] to-[#0f332d]' },
]

export function BrowseTags() {
  return (
    <section aria-labelledby="tags-heading">
      <h2 id="tags-heading" className="mb-2 text-sm font-medium uppercase tracking-wide text-white">
        Browse by Category
      </h2>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {featuredTags.map(({ tag, gradient }) => (
          <li key={tag}>
            <Link
              href={`/search?tags=${encodeURIComponent(tag)}`}
              className={`flex h-24 items-end rounded-sm bg-gradient-to-br ${gradient} p-3 text-sm font-bold uppercase tracking-wider text-white shadow-lg ring-1 ring-white/5 transition hover:ring-primary`}
            >
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
