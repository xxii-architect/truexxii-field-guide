import { createClient } from '@supabase/supabase-js'
import type { IdentificationRecord, UserProfile } from './types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

export async function getSession() {
  const { data: { session } } = await supabase.auth.getSession()
  return session
}

export async function signOut() {
  await supabase.auth.signOut()
}

export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('user_id', userId)
    .single()
  if (error) { console.error(error); return null }
  return data as UserProfile
}

export async function createUserProfile(userId: string, username: string): Promise<UserProfile | null> {
  const { data, error } = await supabase
    .from('user_profiles')
    .insert({
      user_id: userId,
      username,
      skill_level: 'B',
      active_biome: 'rocky-mountain',
      total_scans: 0,
      species_identified: 0,
      rare_finds: 0,
      danger_encounters: 0,
    })
    .select()
    .single()
  if (error) { console.error(error); return null }
  return data as UserProfile
}

export async function updateUserProfile(userId: string, updates: Partial<UserProfile>): Promise<void> {
  const { error } = await supabase
    .from('user_profiles')
    .update(updates)
    .eq('user_id', userId)
  if (error) console.error(error)
}

export async function getIdentificationHistory(userId: string, limit = 50): Promise<IdentificationRecord[]> {
  const { data, error } = await supabase
    .from('identification_records')
    .select('*')
    .eq('user_id', userId)
    .order('scanned_at', { ascending: false })
    .limit(limit)
  if (error) { console.error(error); return [] }
  return (data ?? []) as IdentificationRecord[]
}

export async function saveIdentification(record: Omit<IdentificationRecord, 'id'>): Promise<string | null> {
  const { data, error } = await supabase
    .from('identification_records')
    .insert({
      user_id: record.userId,
      common_name: record.commonName,
      scientific_name: record.scientificName,
      confidence_score: record.confidenceScore,
      safety_tier: record.safetyTier,
      safety_label: record.safetyLabel,
      image_url: record.imageUrl,
      biome: record.biome,
      scanned_at: record.scannedAt,
      json_data: record.jsonData,
    })
    .select('id')
    .single()
  if (error) { console.error(error); return null }
  return data.id
}

export async function deleteIdentification(id: string): Promise<void> {
  const { error } = await supabase
    .from('identification_records')
    .delete()
    .eq('id', id)
  if (error) console.error(error)
}
