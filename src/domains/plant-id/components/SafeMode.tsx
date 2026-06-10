'use client'
import { useState } from 'react'
import type { Species } from '@/lib/types'

interface Props {
  species: Species
  onAcknowledge: () => void
  onDismiss: () => void
}

export default function SafeMode({ species, onAcknowledge, onDismiss }: Props) {
  const [confirmed, setConfirmed] = useState(false)
  const lethal = species.safetyTier === 5

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
      <div className={`w-full max-w-md rounded-2xl border-2 p-6 ${lethal ? 'border-red-500 bg-red-950' : 'border-orange-500 bg-orange-950'}`}>
        <p className="mb-3 text-center text-6xl animate-pulse">{lethal ? '☠️' : '⚠️'}</p>
        <h2 className={`mb-1 text-center text-2xl font-black ${lethal ? 'text-red-300' : 'text-orange-300'}`}>
          {lethal ? 'LETHAL SPECIES' : 'DANGEROUS SPECIES'}
        </h2>
        <p className="mb-1 text-center text-sm font-semibold text-white">{species.commonName}</p>
        <p className="mb-4 text-center text-xs italic text-white/50">{species.scientificName}</p>
        <div className={`mb-5 rounded-xl p-3 ${lethal ? 'bg-red-900/50' : 'bg-orange-900/50'}`}>
          <p className="text-sm leading-relaxed text-white/90">{species.safetyWarning}</p>
        </div>
        {lethal && (
          <label className="mb-4 flex cursor-pointer items-start gap-3">
            <input type="checkbox" checked={confirmed} onChange={e => setConfirmed(e.target.checked)}
              className="mt-0.5 h-4 w-4 accent-red-500" />
            <span className="text-xs text-white/70">
              I am an experienced forager and understand this requires expert verification before any use.
            </span>
          </label>
        )}
        <div className="flex gap-3">
          <button onClick={onDismiss}
            className="flex-1 rounded-xl border border-white/20 py-3 text-sm font-semibold text-white/60 hover:bg-white/10">
            Go Back
          </button>
          <button onClick={onAcknowledge} disabled={lethal && !confirmed}
            className={`flex-1 rounded-xl py-3 text-sm font-bold transition-all
              ${lethal ? 'bg-red-600 text-white hover:bg-red-500 disabled:opacity-30' : 'bg-orange-600 text-white hover:bg-orange-500'}`}>
            I Understand
          </button>
        </div>
      </div>
    </div>
  )
}
