'use client'
import Image from 'next/image'
import { useState } from 'react'
import type { ScanResult } from '@/lib/types'
import { getSafetyColor, getSafetyLabel } from '@/lib/utils'
import ConfidenceGauge from './ConfidenceGauge'
import KnowledgeTabs from './KnowledgeTabs'
import SafeMode from './SafeMode'

export default function SpeciesCard({ result }: { result: ScanResult }) {
  const { species, confidenceScore } = result
  const [ack, setAck] = useState(false)
  const color = getSafetyColor(species.safetyTier)

  return (
    <>
      {species.safetyTier >= 4 && !ack && (
        <SafeMode species={species} onAcknowledge={() => setAck(true)} onDismiss={() => window.history.back()} />
      )}
      <div className="space-y-4">
        {result.imageUrl && (
          <div className="relative overflow-hidden rounded-2xl">
            <Image src={result.imageUrl} alt={species.commonName} fill className="object-cover h-56" unoptimized />
          </div>
        )}
        <div className="rounded-2xl p-4" style={{ backgroundColor: color + '18', border: `1px solid ${color}44` }}>
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <span className="mb-2 inline-block rounded-full px-3 py-1 text-xs font-black tracking-wider"
                style={{ backgroundColor: color + '30', color }}>
                {getSafetyLabel(species.safetyTier).toUpperCase()}
              </span>
              <h2 className="text-2xl font-black leading-tight text-white">{species.commonName}</h2>
              <p className="text-sm italic text-white/50">{species.scientificName}</p>
              <p className="mt-1 text-xs text-white/30">{species.family}</p>
            </div>
            <ConfidenceGauge score={confidenceScore} />
          </div>
        </div>

        <div className="rounded-2xl bg-white/5 p-4">
          <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-white/40">Identifying Features</h3>
          <ul className="space-y-1">
            {species.identifyingFeatures.map((f, i) => (
              <li key={i} className="flex gap-2 text-sm text-white/80">
                <span className="mt-0.5 text-green-400">•</span>{f}
              </li>
            ))}
          </ul>
        </div>

        {species.lookalikes.length > 0 && (
          <div className="rounded-2xl bg-white/5 p-4">
            <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-orange-400">Dangerous Lookalikes</h3>
            {species.lookalikes.map((l, i) => (
              <div key={i} className="mb-2 rounded-xl border border-orange-500/20 bg-orange-950/40 p-3">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-semibold text-white">{l.name}</p>
                    <p className="text-xs italic text-white/40">{l.scientificName}</p>
                  </div>
                  <span className="text-xs font-bold text-orange-400">Tier {l.safetyTier}</span>
                </div>
                <p className="mt-1 text-xs text-white/60">{l.differentiator}</p>
              </div>
            ))}
          </div>
        )}

        <KnowledgeTabs species={species} />

        {result.alternativeMatches.length > 0 && (
          <div className="rounded-2xl bg-white/5 p-4">
            <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-white/40">Alternative Matches</h3>
            {result.alternativeMatches.slice(0, 3).map((a, i) => (
              <div key={i} className="flex items-center justify-between py-1">
                <div>
                  <p className="text-sm text-white">{a.species.commonName}</p>
                  <p className="text-xs italic text-white/40">{a.species.scientificName}</p>
                </div>
                <span className="text-sm font-bold text-white/50">{a.confidenceScore}%</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

