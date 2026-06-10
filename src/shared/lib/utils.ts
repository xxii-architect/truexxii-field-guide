import type { SafetyTier, SkillLevel, EvidenceTier, EdibilityTier } from './types'

export function getSafetyColor(tier: SafetyTier): string {
  const map: Record<SafetyTier, string> = {
    1: '#22c55e',
    2: '#84cc16',
    3: '#eab308',
    4: '#f97316',
    5: '#ef4444',
  }
  return map[tier]
}

export function getSafetyLabel(tier: SafetyTier): string {
  const map: Record<SafetyTier, string> = {
    1: 'Safe',
    2: 'Caution',
    3: 'Warning',
    4: 'Dangerous',
    5: 'Lethal',
  }
  return map[tier]
}

export function getSafetyEmoji(tier: SafetyTier): string {
  const map: Record<SafetyTier, string> = {
    1: '✅',
    2: '⚠️',
    3: '🔶',
    4: '🚫',
    5: '☠️',
  }
  return map[tier]
}

export function getEdibilityLabel(tier: EdibilityTier): string {
  const map: Record<EdibilityTier, string> = {
    A: 'Prime Edible',
    B: 'Edible',
    C: 'Edible with Preparation',
    X: 'Not Edible',
  }
  return map[tier]
}

export function getEvidenceLabel(tier: EvidenceTier): string {
  const map: Record<EvidenceTier, string> = {
    1: 'Traditional',
    2: 'Anecdotal',
    3: 'Preliminary',
    4: 'Clinical',
    5: 'Established',
  }
  return map[tier]
}

export function getSkillLabel(level: SkillLevel): string {
  const map: Record<SkillLevel, string> = {
    B: 'Beginner',
    I: 'Intermediate',
    E: 'Expert',
    SE: 'Survival Emergency',
  }
  return map[level]
}

export function getConfidenceColor(score: number): string {
  if (score >= 85) return '#22c55e'
  if (score >= 65) return '#eab308'
  if (score >= 45) return '#f97316'
  return '#ef4444'
}

export function getConfidenceLabel(score: number): string {
  if (score >= 85) return 'Very High'
  if (score >= 65) return 'High'
  if (score >= 45) return 'Moderate'
  return 'Low'
}

export function formatTimeAgo(iso: string): string {
  const secs = Math.floor((Date.now() - new Date(iso).getTime()) / 1000)
  if (secs < 60) return 'just now'
  if (secs < 3600) return `${Math.floor(secs / 60)}m ago`
  if (secs < 86400) return `${Math.floor(secs / 3600)}h ago`
  if (secs < 604800) return `${Math.floor(secs / 86400)}d ago`
  return new Date(iso).toLocaleDateString()
}

export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(' ')
}
