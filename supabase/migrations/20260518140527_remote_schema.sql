create extension
if not exists "pgcrypto"
with schema "extensions";

create table
if not exists public.profiles
(
  user_id uuid primary key references auth.users
(id) on
delete cascade,
  full_name text,
  phone text,
  address_line1 text,
  address_line2 text,
  city text,
  state text,
  pincode text,
  created_at timestamptz
not null default now
(),
  updated_at timestamptz not null default now
()
);

create or replace function public.handle_new_user
()
returns trigger
language plpgsql
security definer
set search_path
= public
as $$
begin
  insert into public.profiles
    (user_id)
  values
    (new.id)
  on conflict
  (user_id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created
on auth.users;
create trigger on_auth_user_created
after
insert on
auth.users
for each row
execute function
public.handle_new_user
();

alter table public.profiles enable row level security;

drop policy
if exists "Users can view own profile" on public.profiles;
drop policy
if exists "Users can insert own profile" on public.profiles;
drop policy
if exists "Users can update own profile" on public.profiles;

create policy "Users can view own profile"
on public.profiles
for
select
  to authenticated
using
(auth.uid
() = user_id);

create policy "Users can insert own profile"
on public.profiles
for
insert
to authenticated
with check (
auth.uid()
= user_id);

create policy "Users can update own profile"
on public.profiles
for
update
to authenticated
using (auth.uid() = user_id)
with check
(auth.uid
() = user_id);

revoke all on table public.profiles from anon;
grant select, insert, update on table public.profiles to authenticated;
grant all on table public.profiles to service_role;