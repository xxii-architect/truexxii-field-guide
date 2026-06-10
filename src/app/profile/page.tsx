'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase, getUserProfile, signOut } from '@/lib/supabase'
import { AUTH_ENABLED, DEMO_USER_PROFILE } from '@/shared/constants/featureFlags'
import { getSkillLabel } from '@/lib/utils'
import type { UserProfile } from '@/lib/types'

const STATS = [
  { key: 'totalScans',        label: 'Trail Scans',     emoji: '📷' },
  { key: 'speciesIdentified', label: 'Species Logged',   emoji: '🌿' },
  { key: 'rareFinds',         label: 'Rare Finds',       emoji: '⭐' },
  { key: 'dangerEncounters',  label: 'Hazard Encounters', emoji: '⚠️' },
] as const

export default function ProfilePage() {
  const router = useRouter()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      if (!AUTH_ENABLED) {
        setProfile(DEMO_USER_PROFILE)
        setLoading(false)
        return
      }

      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { router.push('/login'); return }
      const p = await getUserProfile(session.user.id)
      setProfile(p)
      setLoading(false)
    }
    load()
  }, [router])

  if (loading) return (
    <div className="flex min-h-screen items-center justify-center bg-truexxii-parchment text-truexxii-forest">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-truexxii-olive border-t-transparent" />
    </div>
  )
  if (!profile) return null

  return (
    <main className="min-h-screen bg-truexxii-parchment px-4 pb-24 pt-6 text-truexxii-forest">
      <div className="note-card mb-6 flex items-center gap-4 p-6">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-truexxii-olive text-2xl font-black text-truexxii-parchment">
          {profile.username[0]?.toUpperCase()}
        </div>
        <div>
          <p className="text-xl font-black text-truexxii-cocoa">{profile.username}</p>
          <p className="text-sm text-truexxii-forest/80">{getSkillLabel(profile.skillLevel)}</p>
          <p className="text-xs text-truexxii-forest/70 capitalize">Current terrain: {profile.activeBiome.replace(/-/g, ' ')}</p>
        </div>
      </div>
      <div className="mb-4 grid grid-cols-2 gap-3">
        {STATS.map(s => {
          const val = profile[s.key] ?? 0
          return (
            <div key={s.key} className="note-card p-4 text-center">
              <p className="text-2xl">{s.emoji}</p>
              <p className="mt-1 text-2xl font-black text-truexxii-cocoa">{val}</p>
              <p className="text-xs text-truexxii-forest/70">{s.label}</p>
            </div>
          )
        })}
      </div>
      <button onClick={async () => {
          if (AUTH_ENABLED) {
            await signOut()
            router.push('/login')
            return
          }
          router.push('/')
        }}
        className="w-full rounded-2xl border border-truexxii-charcoal/20 bg-[rgba(75,58,47,0.08)] py-3 text-sm font-semibold text-truexxii-forest hover:bg-[rgba(90,124,62,0.12)]">
        Return to base
      </button>
    </main>
  )
}
