create table if not exists public.customer_reviews (
  id uuid primary key default gen_random_uuid(),
  reviewer_name text not null,
  review_text text not null,
  created_at timestamptz not null default now()
);

alter table public.customer_reviews enable row level security;

grant select, insert on public.customer_reviews to anon;
grant select, insert on public.customer_reviews to authenticated;

drop policy if exists "Anyone can read customer reviews" on public.customer_reviews;
create policy "Anyone can read customer reviews"
on public.customer_reviews
for select
using (true);

drop policy if exists "Anyone can submit customer reviews" on public.customer_reviews;
create policy "Anyone can submit customer reviews"
on public.customer_reviews
for insert
with check (
  length(trim(reviewer_name)) between 1 and 80
  and length(trim(review_text)) between 1 and 1000
);
