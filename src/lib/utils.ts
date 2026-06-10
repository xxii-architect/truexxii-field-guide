export function getSafetyLabel(tier?: number) {
  if (!tier) return 'Unknown'
  return `Tier ${tier}`
}

export function getSafetyColor(tier?: number) {
  switch (tier) {
    case 1:
      return 'text-green-700'
    case 2:
      return 'text-lime-700'
    case 3:
      return 'text-yellow-600'
    case 4:
      return 'text-orange-600'
    case 5:
      return 'text-red-600'
    default:
      return 'text-gray-600'
  }
}

export function formatTimeAgo(iso?: string | number | Date) {
  if (!iso) return ''
  try {
    const d = typeof iso === 'string' || typeof iso === 'number' ? new Date(iso) : iso
    return d.toLocaleString()
  } catch {
    return String(iso)
  }
}

export function getEdibilityLabel(e?: string) {
  return e || 'Unknown'
}

export function getEvidenceLabel(_v?: unknown) {
  void _v
  return 'Evidence'
}

export function getSkillLabel(_v?: unknown) {
  void _v
  return 'Skill'
}
