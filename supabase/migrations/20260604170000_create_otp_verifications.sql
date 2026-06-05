create extension if not exists "pgcrypto" with schema "extensions";

create table if not exists public.otp_verifications (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  otp_code text not null,
  mode text not null check (mode in ('user', 'admin')),
  created_at timestamptz not null default now(),
  expires_at timestamptz not null,
  used boolean not null default false
);

create index if not exists otp_verifications_lookup_idx
  on public.otp_verifications (email, otp_code, mode, used, created_at desc);

alter table public.otp_verifications enable row level security;

revoke all on table public.otp_verifications from anon;
revoke all on table public.otp_verifications from authenticated;
grant all on table public.otp_verifications to service_role;
