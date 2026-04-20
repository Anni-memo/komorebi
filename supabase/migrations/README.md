# Supabase マイグレーション実行手順

## 今回実行するマイグレーション

ファイル: `20260420_add_ai_guidance_cache.sql`
目的: 「今日のAIカード」のClaude生成ガイダンスを24時間キャッシュするため、`profiles`テーブルに2カラム追加する

---

## 前提：実行可能な人

- Supabaseプロジェクト `komorebi` にオーナー or 編集者として招待されている人
- ダッシュボード https://supabase.com/dashboard にログインできる人

→ さやかさんがSupabaseプロジェクトのメンバーに入っていれば実行可能。入っていない場合は mineo さんが実行。

---

## 手順（所要約1分）

### 1. Supabaseダッシュボードを開く

https://supabase.com/dashboard にログイン

### 2. プロジェクト `komorebi` を選択

複数プロジェクトがある場合は「komorebi」または該当するプロジェクトをクリック

### 3. 左メニューから「SQL Editor」を選択

鉛筆アイコン（SQL Editor）、または `</>` のようなアイコン

### 4. 「New query」ボタンをクリック

右上の「+ New query」

### 5. 以下のSQLを貼り付ける

```sql
-- Phase 2: 今日のAIガイダンス動的生成用キャッシュカラム
alter table public.profiles
  add column if not exists ai_guidance_cached jsonb,
  add column if not exists ai_guidance_cached_at timestamptz;

comment on column public.profiles.ai_guidance_cached is
  '今日のAIカード用ガイダンス（TodayGuidance JSON）のキャッシュ';
comment on column public.profiles.ai_guidance_cached_at is
  '上記キャッシュの生成時刻。24h以内なら再利用';
```

### 6. 右下の「Run」ボタンをクリック

緑のチェックマークが出れば成功。以下のメッセージが出る想定：

```
Success. No rows returned
```

---

## 確認方法

### 方法A: ダッシュボードで確認

1. 左メニュー「Table Editor」
2. `profiles` テーブルをクリック
3. 列一覧に `ai_guidance_cached` と `ai_guidance_cached_at` が追加されていればOK

### 方法B: SQLで確認

SQL Editorで以下を実行：

```sql
select column_name, data_type
from information_schema.columns
where table_schema = 'public'
  and table_name = 'profiles'
  and column_name like 'ai_guidance%';
```

2行返ってくればOK：

| column_name | data_type |
|---|---|
| ai_guidance_cached | jsonb |
| ai_guidance_cached_at | timestamp with time zone |

---

## 実行後にやってほしいこと

1. Slack `#こもれび` の該当スレッドに「実行しました」と一言返信
2. 本番 https://komorebi.constella-hd.co.jp/home を開き、カード表示に異常がないことを確認（プロフィール登録済みアカウントで）

---

## 失敗した場合

### エラーが出た場合

エラーメッセージをSlackに貼ってください。`add column if not exists` を使っているので、既に列があっても失敗はしない想定です。

### ロールバック（万一戻したい場合）

```sql
alter table public.profiles
  drop column if exists ai_guidance_cached,
  drop column if exists ai_guidance_cached_at;
```

---

## 影響範囲

- **実行前でも画面は壊れません**。未適用の場合、`/api/today-guidance` がcache読み書きでエラーを吐きますが、フォールバックでルールベースのカードが表示されます
- **他のユーザー機能に影響なし**。既存の `profiles` の他のカラム・データには一切触れません
- **既存データに影響なし**。`if not exists` かつ列追加のみなので、行の更新はありません
