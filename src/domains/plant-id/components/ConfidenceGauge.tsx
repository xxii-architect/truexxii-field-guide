interface Props {
  score: number
  size?: number
  showLabel?: boolean
}

export default function ConfidenceGauge({ score, size = 96, showLabel = true }: Props) {
  const r = (size - 16) / 2
  const circ = 2 * Math.PI * r
  const dash = (score / 100) * circ
  const color = score >= 85 ? '#22c55e' : score >= 65 ? '#eab308' : score >= 45 ? '#f97316' : '#ef4444'
  const label = score >= 85 ? 'Very High' : score >= 65 ? 'High' : score >= 45 ? 'Moderate' : 'Low'

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#ffffff15" strokeWidth={8} />
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={8}
            strokeDasharray={`${dash} ${circ - dash}`} strokeLinecap="round"
            style={{ transition: 'stroke-dasharray 0.5s ease' }} />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-black text-white">{score}%</span>
        </div>
      </div>
      {showLabel && <span className="text-xs font-semibold" style={{ color }}>{label}</span>}
    </div>
  )
}
