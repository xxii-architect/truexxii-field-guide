export type SafetyTier = 1 | 2 | 3 | 4 | 5
export type SkillLevel = 'B' | 'I' | 'E' | 'SE'
export type EvidenceTier = 1 | 2 | 3 | 4 | 5
export type EdibilityTier = 'A' | 'B' | 'C' | 'X'
export type BiomeId =
  | 'rocky-mountain'
  | 'pacific-northwest'
  | 'great-plains'
  | 'sonoran-desert'
  | 'eastern-woodlands'

export interface Lookalike {
  name: string
  scientificName: string
  safetyTier: SafetyTier
  differentiator: string
}

export interface Species {
  id: string
  commonName: string
  scientificName: string
  family: string
  safetyTier: SafetyTier
  safetyLabel: string
  safetyWarning: string
  edibility: EdibilityTier
  edibilityNotes: string
  medicinalUses: string[]
  survivalNotes: string
  identifyingFeatures: string[]
  lookalikes: Lookalike[]
  habitat: string[]
  season: string[]
  biomes: BiomeId[]
  skillRequired: SkillLevel
  evidenceTier: EvidenceTier
  imageUrl?: string
  rarity: 'common' | 'uncommon' | 'rare' | 'very-rare'
  tags: string[]
}

export interface AlternativeMatch {
  species: Species
  confidenceScore: number
}

export interface ScanResult {
  id: string
  species: Species
  confidenceScore: number
  alternativeMatches: AlternativeMatch[]
  locationBiome?: BiomeId
  scannedAt: string
  imageUrl?: string
  safeModeTriggered: boolean
  userId: string
}

export interface UserProfile {
  id: string
  userId: string
  username: string
  skillLevel: SkillLevel
  activeBiome: BiomeId
  totalScans: number
  speciesIdentified: number
  rareFinds: number
  dangerEncounters: number
  createdAt: string
}

export interface IdentificationRecord {
  id: string
  userId: string
  commonName: string
  scientificName: string
  confidenceScore: number
  safetyTier: SafetyTier
  safetyLabel: string
  imageUrl?: string
  biome?: BiomeId
  scannedAt: string
  jsonData: ScanResult
}

export interface BiomePack {
  id: BiomeId
  name: string
  description: string
  region: string
  speciesCount: number
  imageUrl: string
  downloaded: boolean
}

export type SafetyFilter = 'all' | 'safe' | 'caution' | 'danger'
export type SortOrder = 'newest' | 'oldest' | 'confidence' | 'safety'
