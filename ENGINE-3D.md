create extension if not exists pgcrypto;
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique,
  role text not null default 'user' check (role in ('user','admin')),
  created_at timestamptz not null default now()
);
create table if not exists public.loadouts (
  id uuid primary key default gen_random_uuid(), name text not null, slug text unique not null,
  mode text not null check (mode in ('battle-royale','resurgence','ranked','multiplayer','zombies')),
  category text not null, role text not null, tier text not null check (tier in ('S+','S','A','B')),
  score integer not null check (score between 0 and 100), code text not null default '', description text not null default '',
  tags jsonb not null default '[]'::jsonb, attachments jsonb not null default '[]'::jsonb,
  published boolean not null default false, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.favorites (
  user_id uuid not null references auth.users(id) on delete cascade,
  loadout_id uuid not null references public.loadouts(id) on delete cascade,
  created_at timestamptz not null default now(), primary key(user_id,loadout_id)
);
alter table public.profiles enable row level security;
alter table public.loadouts enable row level security;
alter table public.favorites enable row level security;
create policy "published loadouts are public" on public.loadouts for select using (published = true or exists(select 1 from public.profiles p where p.id=auth.uid() and p.role='admin'));
create policy "admins manage loadouts" on public.loadouts for all using (exists(select 1 from public.profiles p where p.id=auth.uid() and p.role='admin')) with check (exists(select 1 from public.profiles p where p.id=auth.uid() and p.role='admin'));
create policy "users read own profile" on public.profiles for select using (id=auth.uid());
create policy "users update own profile" on public.profiles for update using (id=auth.uid());
create policy "users manage own favorites" on public.favorites for all using (user_id=auth.uid()) with check (user_id=auth.uid());
create or replace function public.handle_new_user() returns trigger language plpgsql security definer set search_path=public as $$ begin insert into public.profiles(id,username) values(new.id,split_part(new.email,'@',1)); return new; end; $$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_user();
