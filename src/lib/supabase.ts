import type { IdentificationRecord, UserProfile } from './types'

type SupabaseAuth = {
  getSession: () => Promise<{ data: { session: { user: { id: string } } | null } }>
  signInWithPassword: (credentials: { email: string; password: string }) => Promise<{ data: unknown; error: { message: string } | null }>
  signUp: (credentials: { email: string; password: string }) => Promise<{ data: unknown; error: { message: string } | null }>
}

export const supabase: { auth: SupabaseAuth } = {
  auth: {
    getSession: async () => ({ data: { session: null } }),
    signInWithPassword: async () => ({ data: {}, error: null }),
    signUp: async () => ({ data: {}, error: null }),
  },
}

export async function getIdentificationHistory(_userId?: string, _limit?: number): Promise<IdentificationRecord[]> {
  void _userId
  void _limit
  return []
}

export async function getUserProfile(_userId?: string): Promise<UserProfile | null> {
  void _userId
  return null
}

export async function signOut(): Promise<boolean> {
  return true
}
