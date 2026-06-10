'use client'
import { useState } from 'react'
import BiomeCard from '@/components/BiomeCard'
import type { BiomePack } from '@/lib/types'

const BIOMES: BiomePack[] = [
  { id: 'rocky-mountain', name: 'Rocky Mountain', description: 'High-altitude forests, alpine meadows, and river valleys spanning the northern Rockies.', region: 'Idaho, Montana, Wyoming, Colorado', speciesCount: 20, imageUrl: '', downloaded: true },
  { id: 'pacific-northwest', name: 'Pacific Northwest', description: 'Temperate rainforests, coastal wetlands, and volcanic highlands rich in fungi and ferns.', region: 'Oregon, Washington, British Columbia', speciesCount: 18, imageUrl: '', downloaded: false },
  { id: 'great-plains', name: 'Great Plains', description: 'Open grasslands and prairie ecosystems with hardy edible and medicinal plants.', region: 'Kansas, Nebraska, South Dakota', speciesCount: 15, imageUrl: '', downloaded: false },
  { id: 'sonoran-desert', name: 'Sonoran Desert', description: 'Desert scrubland with unique succulent species and drought-adapted forageables.', region: 'Arizona, New Mexico, Northern Mexico', speciesCount: 14, imageUrl: '', downloaded: false },
  { id: 'eastern-woodlands', name: 'Eastern Woodlands', description: 'Deciduous forests bursting with mushrooms, berries, and wild greens across four seasons.', region: 'Appalachians, Great Lakes, New England', speciesCount: 22, imageUrl: '', downloaded: false },
]

export default function BiomePage() { 
  const [active, setActive] = useState('rocky-mountain')
  return (
    <main className="min-h-screen bg-truexxii-parchment px-4 pb-24 pt-6 text-truexxii-forest">
      <div className="guide-shell mx-auto max-w-5xl p-6">
        <h1 className="mb-1 text-2xl font-black text-truexxii-cocoa">Terrain Packs</h1>
        <p className="mb-6 text-sm text-truexxii-forest/80">Choose the terrain that matches your next journey.</p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {BIOMES.map(b => <BiomeCard key={b.id} biome={b} isActive={active === b.id} onSelect={setActive} />)}
        </div>
      </div>
    </main>
  )
}
