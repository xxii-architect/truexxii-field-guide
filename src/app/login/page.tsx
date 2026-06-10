'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { AUTH_ENABLED } from '@/shared/constants/featureFlags'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)
  const [mode, setMode]         = useState<'login' | 'signup'>('login')

  useEffect(() => {
    if (!AUTH_ENABLED) {
      router.push('/')
    }
  }, [router])

  if (!AUTH_ENABLED) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-truexxii-parchment px-6 text-truexxii-forest">
        <div className="w-full max-w-sm rounded-3xl border border-truexxii-charcoal/20 bg-[rgba(232,220,194,0.95)] p-6 text-center note-card">
          <h1 className="text-2xl font-black text-truexxii-cocoa">Login paused</h1>
          <p className="mt-3 text-sm text-truexxii-forest/75">
            Authentication is hidden until the True XXII rollout is ready. Explore the app from the home screen.
          </p>
          <button onClick={() => router.push('/')}
            className="mt-6 rounded-xl bg-truexxii-green py-3 px-4 text-sm font-semibold text-white hover:bg-[#4b6a33]">
            Return to home
          </button>
        </div>
      </main>
    )
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error: authError } = mode === 'login'
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password })

    if (authError) {
      setError(authError.message)
      setLoading(false)
      return
    }
    router.push('/')
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 px-6">
      <div className="mb-8 text-center">
        <p className="text-6xl">�</p>
        <h1 className="mt-3 text-3xl font-black text-white">True XXII</h1>
        <p className="mt-1 text-sm text-white/40">Rooted in rugged reliability for wild plant and mushroom scouting.</p>
      </div>

      <div className="w-full max-w-sm rounded-2xl bg-white/5 p-6">
        <div className="mb-6 flex rounded-xl bg-[rgba(58,58,58,0.18)] p-1">
          <button onClick={() => setMode('login')}
            className={`flex-1 rounded-lg py-2 text-sm font-semibold transition-all
              ${mode === 'login' ? 'bg-truexxii-green text-white' : 'text-white/50'}`}>
            Enter Base
          </button>
          <button onClick={() => setMode('signup')}
            className={`flex-1 rounded-lg py-2 text-sm font-semibold transition-all
              ${mode === 'signup' ? 'bg-truexxii-green text-white' : 'text-white/50'}`}>
            Forge Account
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input type="email" value={email} onChange={e => setEmail(e.target.value)}
            placeholder="Email" required
            className="w-full rounded-xl bg-[rgba(75,58,47,0.08)] px-4 py-3 text-sm text-truexxii-forest placeholder:text-truexxii-forest/40 outline-none focus:ring-2 focus:ring-truexxii-olive" />
          <input type="password" value={password} onChange={e => setPassword(e.target.value)}
            placeholder="Password" required
            className="w-full rounded-xl bg-[rgba(75,58,47,0.08)] px-4 py-3 text-sm text-truexxii-forest placeholder:text-truexxii-forest/40 outline-none focus:ring-2 focus:ring-truexxii-olive" />
          {error && <p className="text-xs text-red-400">{error}</p>}
          <button type="submit" disabled={loading}
            className="w-full rounded-xl bg-truexxii-green py-3 text-sm font-bold text-white hover:bg-[#4b6a33] disabled:opacity-50">
            {loading ? 'Loading...' : mode === 'login' ? 'Enter Base' : 'Forge Account'}
          </button>
        </form>
      </div>
    </main>
  )
}
