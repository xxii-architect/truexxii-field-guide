export type SafetyTier = 1 | 2 | 3 | 4 | 5
export type EdibilityTier = 'A' | 'B' | 'C' | 'X'

export interface Lookalike {
  name: string
  scientificName: string
  safetyTier: SafetyTier
  differentiator: string
}

export interface Species {
  id: string
  commonName: string
  scientificName?: string
  family?: string
  safetyTier: SafetyTier
  safetyLabel?: string
  safetyWarning?: string
  edibility?: EdibilityTier
  edibilityNotes?: string
  medicinalUses: string[]
  survivalNotes?: string
  identifyingFeatures: string[]
  lookalikes: Lookalike[]
  tags?: string[]
  evidenceTier?: 1 | 2 | 3 | 4 | 5
  skillRequired?: string
}

export interface AlternativeMatch {
  species: Species
  confidenceScore: number
}

export interface ScanResult {
  species: Species
  confidenceScore: number
  confidence: number
  imageUrl?: string
  alternativeMatches: AlternativeMatch[]
}

export interface IdentificationRecord {
  id: string
  userId?: string
  speciesId?: string
  created_at?: string
  safetyTier: number
  scannedAt: string | number | Date
  imageUrl?: string | null
  commonName: string
  scientificName?: string
  confidenceScore: number
}

export interface BiomePack {
  id: string
  name: string
  description?: string
  region?: string
  speciesCount?: number
  imageUrl?: string
  downloaded?: boolean
}

export interface UserProfile {
  id: string
  displayName?: string
  email?: string
  username: string
  skillLevel?: string
  activeBiome: string
  totalScans?: number
  speciesIdentified?: number
  rareFinds?: number
  dangerEncounters?: number
}
