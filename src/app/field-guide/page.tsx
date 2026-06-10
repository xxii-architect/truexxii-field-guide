'use client'
import { useMemo, useState } from 'react'
import type { FC } from 'react'
import { SPECIES_DATA } from '@/lib/species-data'
import type { SafetyTier } from '@/lib/types'
import { getSafetyColor, getSafetyLabel } from '@/lib/utils'

const Page: FC = () => {
  const [search, setSearch] = useState('')
  const [tier, setTier] = useState<SafetyTier | 0>(0)

  const searchLower = search.toLowerCase()
  const results = useMemo(
    () => SPECIES_DATA.filter(s => {
      const scientific = s.scientificName?.toLowerCase() ?? ''
      const matchSearch = !search ||
        s.commonName.toLowerCase().includes(searchLower) ||
        scientific.includes(searchLower)
      return matchSearch && (tier === 0 || s.safetyTier === tier)
    }),
    [searchLower, tier],
  )

  return (
    <main className="min-h-screen bg-truexxii-parchment px-4 pb-24 pt-6 text-truexxii-forest">
      <div className="guide-shell mx-auto max-w-5xl p-6">
        <span className="leather-tab">Field Guide</span>
        <header className="mb-6 mt-8 border-b border-truexxii-charcoal/20 pb-5">
          <p className="text-sm uppercase tracking-[0.32em] journal-label">Field Guide</p>
          <h1 className="mt-3 text-4xl font-black journal-heading">Field Guide</h1>
          <p className="mt-2 max-w-2xl text-sm text-truexxii-forest/80">{SPECIES_DATA.length} trusted specimens in the wildcraft ledger.</p>
        </header>

        <input type="search" value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search the wildcraft ledger..."
          className="mb-3 w-full rounded-3xl border border-truexxii-charcoal/20 bg-[rgba(75,58,47,0.06)] px-4 py-4 text-sm text-truexxii-forest placeholder:text-truexxii-forest/35 outline-none focus:border-truexxii-olive focus:ring-2 focus:ring-truexxii-olive/20" />

        <div className="mb-4 flex flex-wrap gap-2">
          <button type="button" onClick={() => setTier(0)}
            className={`rounded-full border border-truexxii-charcoal/20 px-3 py-1 text-xs font-semibold ${tier === 0 ? 'bg-truexxii-olive text-truexxii-parchment shadow-sketch' : 'bg-[rgba(75,58,47,0.08)] text-truexxii-forest/80 hover:bg-[rgba(75,58,47,0.16)]'}`}>
            All
          </button>
          {([1, 2, 3, 4, 5] as SafetyTier[]).map(t => (
            <button key={t} type="button" onClick={() => setTier(t)}
              className={`rounded-full border border-truexxii-charcoal/20 px-3 py-1 text-xs font-semibold ${tier === t ? 'shadow-sketch' : 'bg-[rgba(75,58,47,0.08)]'}`}
              style={tier === t
                ? { backgroundColor: getSafetyColor(t), color: '#fff' }
                : { backgroundColor: getSafetyColor(t) + '20', color: getSafetyColor(t) }}>
              {getSafetyLabel(t)}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {results.map(s => {
            const tags = s.tags ?? []
            return (
              <div key={s.id} className="note-card p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-bold text-truexxii-cocoa">{s.commonName}</p>
                    <p className="truncate text-xs italic text-truexxii-forest/70">{s.scientificName}</p>
                    <p className="mt-1 text-xs text-truexxii-forest/70">{s.family}</p>
                  </div>
                  <span className="flex-shrink-0 rounded-full border border-truexxii-charcoal/20 px-2 py-0.5 text-xs font-bold"
                    style={{ backgroundColor: getSafetyColor(s.safetyTier) + '25', color: getSafetyColor(s.safetyTier) }}>
                    {getSafetyLabel(s.safetyTier)}
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap gap-1">
                  {tags.slice(0, 4).map(tag => (
                    <span key={tag} className="rounded-full border border-truexxii-charcoal/20 bg-[rgba(75,58,47,0.08)] px-2 py-0.5 text-xs text-truexxii-forest/80">{tag}</span>
                  ))}
                </div>
              </div>
            )
          })}
          {results.length === 0 && <p className="py-10 text-center text-sm text-truexxii-forest/70">No species found. Broaden your search or scan a new specimen.</p>}
        </div>
      </div>
    </main>
  )
}

export default Page
