'use client'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { identifyPlantScan, type PlantIdentificationResponse } from '@/domains/plant-id/services/scanService'
import { supabase, getIdentificationHistory } from '@/lib/supabase'
import { AUTH_ENABLED, DEMO_USER_ID } from '@/shared/constants/featureFlags'
import HistoryCard from '@/components/HistoryCard'
import type { IdentificationRecord } from '@/lib/types'

const trustStats = [
  { label: 'Wilderness tested', value: '392+' },
  { label: 'Built for the wild', value: 'Field-ready reliability' },
  { label: 'Legacy in the field', value: 'Crafted for rugged use' },
]

const featureTiles = [
  {
    title: 'Rugged reliability',
    description: 'Engineered for explorers who thrive beyond the beaten path.',
  },
  {
    title: 'Nature-first guidance',
    description: 'Respect every specimen with safety and survival in mind.',
  },
  {
    title: 'Field mastery',
    description: 'Quick scans and decisive insights for life in the wild.',
  },
]

export default function HomePage() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [recent, setRecent] = useState<IdentificationRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [quickScanLoading, setQuickScanLoading] = useState(false)
  const [quickScanError, setQuickScanError] = useState<string | null>(null)
  const [quickScanResult, setQuickScanResult] = useState<PlantIdentificationResponse | null>(null)

  useEffect(() => {
    async function load() {
      if (!AUTH_ENABLED) {
        const data = await getIdentificationHistory(DEMO_USER_ID, 3)
        setRecent(data)
        setLoading(false)
        return
      }

      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push('/login')
        return
      }
      const data = await getIdentificationHistory(session.user.id, 3)
      setRecent(data)
      setLoading(false)
    }
    load()
  }, [router])

  function handleScan() {
    router.push('/scan')
  }

  function handleQuickDraw() {
    setQuickScanError(null)
    fileInputRef.current?.click()
  }

  async function handleQuickDrawImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setQuickScanLoading(true)
    setQuickScanError(null)
    setQuickScanResult(null)

    try {
      const result = await identifyPlantScan(file)
      setQuickScanResult(result)
    } catch (err) {
      setQuickScanError(err instanceof Error ? err.message : 'Unable to identify specimen.')
    } finally {
      setQuickScanLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-truexxii-parchment px-4 pb-24 pt-8 text-truexxii-forest">
      <section className="mx-auto max-w-6xl note-card p-6 sm:p-10">
        <div className="grid gap-8 lg:grid-cols-[1.3fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            {!AUTH_ENABLED && (
              <div className="rounded-3xl border border-[#8b7355]/20 bg-[#24381f]/90 p-4 text-sm text-[#d6c4ab]">
                Login is temporarily hidden while rollout mode is active. Explore the app and return to auth when the feature is ready.
              </div>
            )}
            <div className="inline-flex items-center gap-2 rounded-full bg-[#5a7c3e]/15 px-4 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-[#8b7355]">
              Wildcraft plant ID
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl font-black tracking-tight text-truexxii-cocoa sm:text-5xl">
                True XXII: rugged plant and mushroom ID for the wild.
              </h1>
              <p className="max-w-xl text-sm leading-7 text-truexxii-forest/80 sm:text-base">
                Rooted in rugged reliability and outdoor mastery, this is the app for people who thrive beyond the beaten path. Identify with confidence, respect the wild, and keep your legacy outdoors.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <button onClick={handleScan}
                className="inline-flex items-center justify-center rounded-2xl bg-[#5a7c3e] px-6 py-4 text-sm font-semibold text-[#f4ecd9] transition hover:bg-[#4b6a33] active:scale-[0.99]">
                Open full scanner
              </button>
              <button onClick={handleQuickDraw}
                className="inline-flex items-center justify-center rounded-2xl border border-[#8b7355]/40 bg-[#f4ecd9]/5 px-6 py-4 text-sm font-semibold text---truexxii-parchment: #E8DCC2; transition hover:border-[#5a7c3e] hover:bg-[#f4ecd9]/10">
                Quick draw
              </button>
              <button onClick={() => router.push('/field-guide')}
                className="inline-flex items-center justify-center rounded-2xl border border-[#8b7355]/40 bg-[#f4ecd9]/5 px-6 py-4 text-sm font-semibold text---truexxii-parchment: #E8DCC2; transition hover:border-[#5a7c3e] hover:bg-[#f4ecd9]/10">
                Explore field guide
              </button>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {trustStats.map(stat => (
                <div key={stat.label} className="note-card p-4">
                  <p className="text-2xl font-black text-truexxii-cocoa">{stat.value}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.22em] text-truexxii-forest/70">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="note-card relative overflow-hidden rounded-[2rem] p-6 shadow-[0_30px_120px_-40px_rgba(89,124,62,0.12)]">
            <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-[#5a7c3e]/15 via-transparent to-transparent" />
            <div className="relative space-y-5">
              <div className="note-card rounded-[1.75rem] border border-truexxii-charcoal/15 p-6">
                <p className="text-sm uppercase tracking-[0.28em] text-truexxii-forest/70">Field ready</p>
                <h2 className="mt-3 text-3xl font-black  text---truexxii-cocoa: #4B3A2F;">Engineered for outdoor mastery</h2>
                <p className="mt-4 text-sm leading-6 text-truexxii-forest/80">
                  Point your camera at a specimen and get fast, grounded guidance—designed to support your judgment, not replace your instincts.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {featureTiles.map(tile => (
                  <div key={tile.title} className="note-card p-5">
                    <h3 className="text-lg font-semibold text-truexxii-cocoa">{tile.title}</h3>
                    <p className="mt-2 text-sm text-truexxii-forest/80">{tile.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleQuickDrawImage}
        className="hidden"
      />

      {quickScanResult || quickScanError ? (
        <section className="mx-auto mt-6 max-w-6xl note-card p-6 sm:p-8">
          <h2 className="text-xl font-black">Quick draw result</h2>
          {quickScanLoading ? (
            <div className="mt-6 flex items-center gap-3 text-sm text-[#d6c4ab]">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#5a7c3e]/30 border-t-[#5a7c3e]" />
              <span>Identifying specimen…</span>
            </div>
          ) : quickScanError ? (
            <p className="mt-4 text-sm text-red-300">{quickScanError}</p>
          ) : quickScanResult ? (
            <div className="mt-4 space-y-3 note-card p-5">
              <p className="text-sm uppercase tracking-[0.24em] text-truexxii-earth">Specimen identified</p>
              <p className="text-2xl font-black text-truexxii-cocoa">{quickScanResult.plant_name}</p>
              <p className="text-sm text-truexxii-forest/80">{quickScanResult.description}</p>
              <p className="text-xs uppercase tracking-[0.2em] text-truexxii-earth">Confidence note</p>
            </div>
          ) : null}
        </section>
      ) : null}

      <section className="mx-auto mt-10 max-w-6xl note-card shadow-[0_20px_80px_-40px_rgba(89,124,62,0.12)] p-6 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-truexxii-forest/70">Your field ledger</p>
            <h2 className="mt-2 text-2xl font-black text-truexxii-cocoa">Recent trail findings</h2>
          </div>
          <button onClick={() => router.push('/history')}
            className="rounded-2xl border border-truexxii-charcoal/20 bg-[rgba(75,58,47,0.08)] px-4 py-3 text-sm font-semibold text-truexxii-forest transition hover:border-truexxii-olive hover:bg-[rgba(90,124,62,0.12)]">
            View history
          </button>
        </div>

        {loading ? (
          <div className="mt-10 flex justify-center py-12">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#5a7c3e]/30 border-t-[#5a7c3e]" />
          </div>
        ) : recent.length === 0 ? (
          <div className="mt-10 rounded-[2rem] bg-[#11220f]/90 p-10 text-center text-sm text-[#d6c4ab]">
            <p className="text-xl font-semibold text-truexxii-parchment">No scans recorded yet</p>
            <p className="mt-2">Make your first scan and let True XXII become part of your wilderness routine.</p>
          </div>
        ) : (
          <div className="mt-6 space-y-4">
            {recent.map(r => <HistoryCard key={r.id} record={r} />)}
          </div>
        )}
      </section>

      <section className="mx-auto mt-10 max-w-6xl note-card p-6 text-sm text-truexxii-forest/80 sm:p-8">
        <p className="font-semibold text-truexxii-cocoa">True XXII trust note</p>
        <p className="mt-3 leading-7">
          Rooted in rugged reliability and outdoor mastery, True XXII embodies the spirit of survival and respect for nature. This companion is built to support your judgment in the field, not replace expert identification.
        </p>
        <p className="mt-4 text-xs uppercase tracking-[0.24em] text-truexxii-forest/70">
          Privacy note: image data is used for identification flow only and is not stored unless you choose to save results.
        </p>
      </section>

    </main>
  )
}
