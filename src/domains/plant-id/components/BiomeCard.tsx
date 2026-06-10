import Image from 'next/image'
import type { BiomePack } from '../../../lib/types'

interface Props {
  biome: BiomePack
  isActive?: boolean
  onSelect: (id: string) => void
}

export default function BiomeCard({ biome, isActive, onSelect }: Props) {
  return (
    <button onClick={() => onSelect(biome.id)}
      className={`w-full overflow-hidden rounded-3xl border-2 text-left transition-all active:scale-95 ${isActive ? 'border-truexxii-olive shadow-lg shadow-truexxii-olive/20' : 'border-truexxii-charcoal/20 hover:border-truexxii-olive/60'} bg-[rgba(232,220,194,0.94)] note-card`}>
      <div className="relative h-28 bg-[rgba(75,58,47,0.08)]">
        {biome.imageUrl ? (
          <Image src={biome.imageUrl} alt={biome.name} fill className="object-cover" unoptimized />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-4xl">🏔️</div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        {isActive && (
          <div className="absolute right-2 top-2 rounded-full bg-truexxii-green px-2 py-0.5 text-xs font-bold text-white">
            Current pack
          </div>
        )}
      </div>
      <div className="p-3">
        <p className="font-bold text-white">{biome.name}</p>
        <p className="text-xs text-white/50">{biome.region}</p>
        <p className="mt-1 text-xs text-white/40">{biome.speciesCount} plant references</p>
        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-white/60">{biome.description}</p>
      </div>
    </button>
  )
}
