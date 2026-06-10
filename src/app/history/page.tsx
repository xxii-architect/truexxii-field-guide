'use client'
import { useEffect, useState } from 'react'
import { supabase, getIdentificationHistory } from '@/lib/supabase'
import { AUTH_ENABLED, DEMO_USER_ID } from '@/shared/constants/featureFlags'
import HistoryCard from '@/components/HistoryCard'
import type { IdentificationRecord } from '@/lib/types'

export default function HistoryPage() {
  const [records, setRecords] = useState<IdentificationRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'safe' | 'danger'>('all')

  useEffect(() => {
    async function load() {
      const { data: { session } } = AUTH_ENABLED
        ? await supabase.auth.getSession()
        : { data: { session: { user: { id: DEMO_USER_ID } } } }

      if (!session) return
      const data = await getIdentificationHistory(session.user.id)
      setRecords(data)
      setLoading(false)
    }
    load()
  }, [])

  const filtered = records.filter(r => {
    if (filter === 'safe') return r.safetyTier <= 2
    if (filter === 'danger') return r.safetyTier >= 4
    return true
  })

  return (
    <main className="min-h-screen bg-truexxii-parchment px-4 pb-24 pt-6 text-truexxii-forest">
      <div className="journal-shell mx-auto max-w-5xl p-6">
        <span className="leather-tab">Field Journal</span>
        <header className="mb-6 mt-8 border-b border-truexxii-charcoal/20 pb-5">
          <p className="text-sm uppercase tracking-[0.32em] journal-label">Field Journal</p>
          <h1 className="mt-3 text-4xl font-black journal-heading">Field Journal</h1>
          <p className="mt-2 max-w-2xl text-sm text-truexxii-forest/80">{records.length} field records logged in the expedition ledger.</p>
        </header>

        <div className="mb-6 flex flex-wrap gap-2">
          {(['all', 'safe', 'danger'] as const).map(f => (
            <button key={f} type="button" onClick={() => setFilter(f)}
              className={`rounded-full border border-truexxii-charcoal/20 px-4 py-1.5 text-xs font-semibold capitalize transition-all ${filter === f ? 'bg-truexxii-olive text-truexxii-parchment shadow-sketch' : 'bg-[rgba(75,58,47,0.08)] text-truexxii-forest/80 hover:bg-[rgba(75,58,47,0.16)]'}`}>
              {f === 'all' ? 'All' : f === 'safe' ? 'Scout' : 'Hazard'}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-truexxii-forest border-t-transparent" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-4xl">🌿</p>
            <p className="mt-2 text-sm text-truexxii-forest/70">No records logged yet — hit the trail and bring back evidence.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map(r => <HistoryCard key={r.id} record={r} />)}
          </div>
        )}
      </div>
    </main>
  )
}
