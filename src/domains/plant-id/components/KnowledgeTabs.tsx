'use client'
import { useState } from 'react'
import type { Species } from '../../../lib/types'
import { getEdibilityLabel, getEvidenceLabel, getSkillLabel } from '../../../lib/utils'

type Tab = 'edibility' | 'medicinal' | 'survival'
const TAB_LABELS: Record<Tab, string> = {
  edibility: 'Forage',
  medicinal: 'Remedy',
  survival: 'Survival',
}

export default function KnowledgeTabs({ species }: { species: Species }) {
  const [tab, setTab] = useState<Tab>('edibility')

  return (
    <div className="rounded-2xl bg-white/5 p-4">
      <div className="mb-4 flex rounded-xl bg-black/30 p-1">
        {(['edibility', 'medicinal', 'survival'] as Tab[]).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`flex-1 rounded-lg py-2 text-xs font-semibold capitalize transition-all
              ${tab === t ? 'bg-truexxii-green text-white shadow' : 'text-white/50 hover:text-white/80'}`}>
            {TAB_LABELS[t]}
          </button>
        ))}
      </div>

      {tab === 'edibility' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-white/40">Forage rating</span>
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-white">
              {species.edibility} — {getEdibilityLabel(species.edibility)}
            </span>
          </div>
          <p className="text-sm leading-relaxed text-white/80">{species.edibilityNotes}</p>
        </div>
      )}

      {tab === 'medicinal' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-white/40">Remedy score</span>
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-white">
              Tier {species.evidenceTier} — {getEvidenceLabel(species.evidenceTier)}
            </span>
          </div>
          {species.medicinalUses.length > 0
            ? <ul className="space-y-1">{species.medicinalUses.map((u, i) => (
                <li key={i} className="flex gap-2 text-sm text-white/80">
                  <span className="text-green-400 mt-0.5">+</span>{u}
                </li>
              ))}</ul>
            : <p className="text-sm text-white/40">No documented field remedies.</p>}
        </div>
      )}

      {tab === 'survival' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-white/40">Survival level</span>
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-white">
              {species.skillRequired} — {getSkillLabel(species.skillRequired)}
            </span>
          </div>
          <p className="text-sm leading-relaxed text-white/80">
            {species.survivalNotes || 'No survival notes available.'}
          </p>
        </div>
      )}
    </div>
  )
}
