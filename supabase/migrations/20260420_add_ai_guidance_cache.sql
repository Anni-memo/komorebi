-- Phase 2: 今日のAIガイダンス動的生成用キャッシュカラム
-- profiles テーブルに ai_guidance_cached (JSONB) と ai_guidance_cached_at (TIMESTAMPTZ) を追加
-- 同プロフィールで1日1回までClaude APIを叩くためのサーバー側キャッシュ

alter table public.profiles
  add column if not exists ai_guidance_cached jsonb,
  add column if not exists ai_guidance_cached_at timestamptz;

comment on column public.profiles.ai_guidance_cached is
  '今日のAIカード用ガイダンス（TodayGuidance JSON）のキャッシュ';
comment on column public.profiles.ai_guidance_cached_at is
  '上記キャッシュの生成時刻。24h以内なら再利用';
