import { anthropic } from "@ai-sdk/anthropic";
import { generateObject } from "ai";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { getTodayGuidance, type TodayGuidance } from "@/lib/today-guidance";

export const maxDuration = 30;

const CACHE_TTL_MS = 24 * 60 * 60 * 1000;

const guidanceSchema = z.object({
  statusLevel: z.enum(["green", "yellow", "red"]),
  statusText: z.string().max(60),
  caution: z.string().max(100),
  todos: z
    .array(
      z.object({
        label: z.string().max(40),
        href: z.string().optional(),
      })
    )
    .length(3),
});

interface ProfileRow {
  stage: string | null;
  expected_due_date: string | null;
  child_birthdate: string | null;
  municipality: string | null;
  is_first_child: boolean | null;
  family_situation: string[] | null;
  interests: string[] | null;
  ai_guidance_cached?: TodayGuidance | null;
  ai_guidance_cached_at?: string | null;
}

const systemPrompt = `あなたは「こもれび」の子育て支援AIです。
ユーザーのプロフィールに基づき、今日のホーム画面に表示する短い個別ガイダンスをJSONで返します。

## 出典（以下の範囲内で答える）
- 厚生労働省「妊産婦のための食生活指針」
- 厚生労働省「授乳・離乳の支援ガイド」
- 母子健康手帳（日本版）
- 日本産科婦人科学会ガイドライン

## トーン
- 急かさない・責めない・不安を煽らない
- やさしく静か、信頼感がある
- 医療判断はしない（「気になれば医師へ」と添える）
- 制度の申請可否は断定しない

## 出力仕様
- statusLevel: green（安定）/ yellow（注意時期）/ red（受診や期限あり）
- statusText: 今日の状態を1文で（60字以内、例「体調が安定しやすい時期です」）
- caution: 受診の目安や注意点を1文（100字以内）
- todos: ちょうど3件。labelは40字以内、短く動詞で終わる

## NG表現
- 「早く申請しないと損です」「まだやっていないのですか」
- 「絶対に」「必ず」「問題ありません」`;

function buildUserPrompt(profile: ProfileRow): string {
  const lines: string[] = [];
  const stageLabel: Record<string, string> = {
    pregnant: "妊娠中",
    newborn: "出産直後",
    "0": "0歳児育児中",
    "1": "1歳児育児中",
    "2": "2歳児育児中",
    "3+": "3歳以上の育児中",
  };
  lines.push(`ステージ: ${profile.stage ? stageLabel[profile.stage] ?? profile.stage : "未設定"}`);

  if (profile.stage === "pregnant" && profile.expected_due_date) {
    const due = new Date(profile.expected_due_date);
    const days = Math.ceil((due.getTime() - Date.now()) / 86400000);
    const weeks = 40 - Math.floor(days / 7);
    lines.push(`妊娠週数: ${weeks}週 / 出産予定日まで${days}日`);
  }
  if (profile.child_birthdate) {
    const birth = new Date(profile.child_birthdate);
    const months =
      (new Date().getFullYear() - birth.getFullYear()) * 12 +
      (new Date().getMonth() - birth.getMonth());
    lines.push(`子どもの月齢: ${months}ヶ月`);
  }
  if (profile.is_first_child !== null) {
    lines.push(`第一子: ${profile.is_first_child ? "はい" : "いいえ"}`);
  }
  if (profile.family_situation?.length) {
    lines.push(`家族状況: ${profile.family_situation.join(", ")}`);
  }
  if (profile.interests?.length) {
    lines.push(`興味: ${profile.interests.join(", ")}`);
  }
  if (profile.municipality) {
    lines.push(`お住まい: ${profile.municipality}`);
  }

  lines.push("");
  lines.push("上記プロフィールに合わせて、今日のガイダンスをJSONで返してください。");
  return lines.join("\n");
}

export async function POST() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return Response.json({ error: "unauthorized" }, { status: 401 });
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select(
        "stage, expected_due_date, child_birthdate, municipality, is_first_child, family_situation, interests, ai_guidance_cached, ai_guidance_cached_at"
      )
      .eq("id", user.id)
      .single<ProfileRow>();

    if (profileError || !profile) {
      return Response.json({ error: "profile_not_found" }, { status: 404 });
    }

    if (profile.ai_guidance_cached && profile.ai_guidance_cached_at) {
      const cachedAt = new Date(profile.ai_guidance_cached_at).getTime();
      if (Date.now() - cachedAt < CACHE_TTL_MS) {
        return Response.json({ guidance: profile.ai_guidance_cached, source: "cache" });
      }
    }

    const { object } = await generateObject({
      model: anthropic("claude-haiku-4-5-20251001"),
      schema: guidanceSchema,
      system: systemPrompt,
      prompt: buildUserPrompt(profile),
    });

    const guidance: TodayGuidance = object;

    await supabase
      .from("profiles")
      .update({
        ai_guidance_cached: guidance,
        ai_guidance_cached_at: new Date().toISOString(),
      })
      .eq("id", user.id);

    return Response.json({ guidance, source: "ai" });
  } catch (err) {
    console.error("[today-guidance] error:", err);
    const fallback = await (async () => {
      try {
        const supabase = await createClient();
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) return null;
        const { data } = await supabase
          .from("profiles")
          .select("stage, expected_due_date, child_birthdate")
          .eq("id", user.id)
          .single();
        if (!data) return null;
        return getTodayGuidance(data);
      } catch {
        return null;
      }
    })();
    if (fallback) {
      return Response.json({ guidance: fallback, source: "fallback" });
    }
    return Response.json({ error: "generation_failed" }, { status: 500 });
  }
}
