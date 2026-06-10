// Local shape for identification records to avoid missing external type declarations
import Image from 'next/image'
type IdentificationRecord = {
  id?: string | number
  imageUrl?: string | null
  commonName: string
  scientificName?: string
  safetyTier: number
  scannedAt: string | number | Date
  confidenceScore: number
}
import { getSafetyColor, getSafetyLabel, formatTimeAgo } from '../../../lib/utils'

interface Props {
  record: IdentificationRecord
  onClick?: () => void
}

export default function HistoryCard({ record, onClick }: Props) {
  const color = getSafetyColor(record.safetyTier)
  return (
    <button type="button" onClick={onClick}
      className="note-card flex w-full items-center gap-4 p-4 text-left transition-all hover:shadow-[4px_10px_0_rgba(75,58,47,0.18)] active:scale-[0.99]">
      <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-3xl border border-truexxii-charcoal/15 bg-[rgba(75,58,47,0.08)]">
        {record.imageUrl ? (
          <Image src={record.imageUrl} alt={record.commonName} width={64} height={64} className="object-cover" unoptimized />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-2xl">🌿</div>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate font-semibold text-truexxii-cocoa">{record.commonName}</p>
        <p className="truncate text-xs italic text-truexxii-forest/75">{record.scientificName}</p>
        <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
          <span className="rounded-full border border-truexxii-charcoal/20 bg-[rgba(75,58,47,0.08)] px-2 py-0.5 font-bold"
            style={{ color, borderColor: color + '40' }}>
            {getSafetyLabel(record.safetyTier)}
          </span>
          <span className="text-truexxii-forest/70">{formatTimeAgo(record.scannedAt)}</span>
        </div>
      </div>
      <div className="flex-shrink-0 text-right">
        <p className="text-lg font-black text-truexxii-cocoa">{record.confidenceScore}%</p>
        <p className="text-xs text-truexxii-forest/70">confidence</p>
      </div>
    </button>
  )
}
