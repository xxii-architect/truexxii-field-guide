import type { UserProfile } from '@/lib/types'

export const AUTH_ENABLED = process.env.NEXT_PUBLIC_AUTH_ENABLED === 'true'
export const DEMO_USER_ID = 'demo-user'

export const DEMO_USER_PROFILE: UserProfile = {
  id: DEMO_USER_ID,
  username: 'Trail Scout',
  skillLevel: 'Field Guide',
  activeBiome: 'rocky-mountain',
  totalScans: 14,
  speciesIdentified: 44,
  rareFinds: 3,
  dangerEncounters: 1,
}
