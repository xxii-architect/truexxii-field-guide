-- TRUE XXII — Supabase Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ── User Profiles ─────────────────────────────────────────────
create table if not exists public.user_profiles (
  id              uuid primary key default uuid_generate_v4(),
  user_id         uuid not null references auth.users(id) on delete cascade,
  username        text not null,
  skill_level     text not null default 'B' check (skill_level in ('B','I','E','SE')),
  active_biome    text not null default 'rocky-mountain',
  total_scans     integer not null default 0,
  species_identified integer not null default 0,
  rare_finds      integer not null default 0,
  danger_encounters integer not null default 0,
  created_at      timestamptz not null default now(),
  unique(user_id)
);

alter table public.user_profiles enable row level security;

create policy "Users can view own profile"
  on public.user_profiles for select
  using (auth.uid() = user_id);

create policy "Users can insert own profile"
  on public.user_profiles for insert
  with check (auth.uid() = user_id);

create policy "Users can update own profile"
  on public.user_profiles for update
  using (auth.uid() = user_id);

-- ── Identification Records ─────────────────────────────────────
create table if not exists public.identification_records (
  id              uuid primary key default uuid_generate_v4(),
  user_id         uuid not null references auth.users(id) on delete cascade,
  common_name     text not null,
  scientific_name text not null,
  confidence_score integer not null check (confidence_score between 0 and 100),
  safety_tier     integer not null check (safety_tier between 1 and 5),
  safety_label    text not null,
  image_url       text,
  biome           text,
  scanned_at      timestamptz not null default now(),
  json_data       jsonb
);

alter table public.identification_records enable row level security;

create policy "Users can view own records"
  on public.identification_records for select
  using (auth.uid() = user_id);

create policy "Users can insert own records"
  on public.identification_records for insert
  with check (auth.uid() = user_id);

create policy "Users can delete own records"
  on public.identification_records for delete
  using (auth.uid() = user_id);

-- ── Indexes ────────────────────────────────────────────────────
create index if not exists idx_records_user_id
  on public.identification_records(user_id);

create index if not exists idx_records_scanned_at
  on public.identification_records(scanned_at desc);

create index if not exists idx_records_safety_tier
  on public.identification_records(safety_tier);
