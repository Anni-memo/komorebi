import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { pushFlexMessage } from "@/lib/line";
import {
  pregnancyMilestones,
  postnatalMilestones,
  getPregnancyWeek,
  getChildMonths,
  findPregnancyMilestone,
  findPostnatalMilestone,
} from "@/lib/milestone-messages";
import type { messagingApi } from "@line/bot-sdk";

// Vercel Cron: 毎朝9時（JST = UTC+9 → UTC 0時）に実行
// vercel.json で "0 0 * * *" を設定

export async function GET(request: NextRequest) {
  // Vercel Cron認証
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const today = new Date();
  const results: { userId: string; milestone: string; status: string }[] = [];

  // ─── 1. 妊娠中ユーザーの節目チェック ───

  const { data: pregnantUsers } = await supabaseAdmin
    .from("profiles")
    .select("id, line_user_id, expected_due_date, notification_channels, notification_categories")
    .eq("stage", "pregnant")
    .not("line_user_id", "is", null)
    .not("expected_due_date", "is", null);

  if (pregnantUsers) {
    for (const user of pregnantUsers) {
      const channels: string[] = user.notification_channels || [];
      if (!channels.includes("line")) continue;

      const week = getPregnancyWeek(user.expected_due_date, today);
      const milestone = findPregnancyMilestone(week);
      if (!milestone) continue;

      // カテゴリフィルタ
      const categories: string[] = user.notification_categories || [];
      if (categories.length > 0 && !categories.includes(milestone.category)) continue;

      // 重複チェック: 同じmilestone_keyで既に通知済みか
      const { data: existing } = await supabaseAdmin
        .from("notifications")
        .select("id")
        .eq("user_id", user.id)
        .eq("milestone_key", milestone.key)
        .limit(1);

      if (existing && existing.length > 0) {
        results.push({ userId: user.id, milestone: milestone.key, status: "already_sent" });
        continue;
      }

      try {
        // LINE Flex Message送信
        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://komorebi.constella-hd.co.jp";
        const contents = buildFlexMessage(milestone.title, milestone.body, milestone.actionUrl ? `${siteUrl}${milestone.actionUrl}` : undefined);
        await pushFlexMessage(user.line_user_id, milestone.title, contents);

        // 通知履歴に記録
        await supabaseAdmin.from("notifications").insert({
          user_id: user.id,
          title: milestone.title,
          description: milestone.body,
          category: milestone.category,
          urgent: false,
          read: false,
          milestone_key: milestone.key,
          reason: `妊娠${week}週の節目メッセージです`,
        });

        results.push({ userId: user.id, milestone: milestone.key, status: "sent" });
      } catch (error) {
        console.error(`Milestone push failed for user ${user.id}:`, error);
        results.push({ userId: user.id, milestone: milestone.key, status: "error" });
      }
    }
  }

  // ─── 2. 産後ユーザーの節目チェック ───

  const postnatalStages = ["newborn", "0", "1", "2", "3+"];

  const { data: postnatalUsers } = await supabaseAdmin
    .from("profiles")
    .select("id, line_user_id, child_birthdate, notification_channels, notification_categories")
    .in("stage", postnatalStages)
    .not("line_user_id", "is", null)
    .not("child_birthdate", "is", null);

  if (postnatalUsers) {
    for (const user of postnatalUsers) {
      const channels: string[] = user.notification_channels || [];
      if (!channels.includes("line")) continue;

      const months = getChildMonths(user.child_birthdate, today);
      const milestone = findPostnatalMilestone(months);
      if (!milestone) continue;

      // 出産当日（month=0）は誕生日当日のみ送信
      if (milestone.key === "postnatal_day_0") {
        const birth = new Date(user.child_birthdate);
        const isBirthday =
          today.getFullYear() === birth.getFullYear() &&
          today.getMonth() === birth.getMonth() &&
          today.getDate() === birth.getDate();
        if (!isBirthday) continue;
      }

      // カテゴリフィルタ
      const categories: string[] = user.notification_categories || [];
      if (categories.length > 0 && !categories.includes(milestone.category)) continue;

      // 重複チェック
      const { data: existing } = await supabaseAdmin
        .from("notifications")
        .select("id")
        .eq("user_id", user.id)
        .eq("milestone_key", milestone.key)
        .limit(1);

      if (existing && existing.length > 0) {
        results.push({ userId: user.id, milestone: milestone.key, status: "already_sent" });
        continue;
      }

      try {
        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://komorebi.constella-hd.co.jp";
        const contents = buildFlexMessage(milestone.title, milestone.body, milestone.actionUrl ? `${siteUrl}${milestone.actionUrl}` : undefined);
        await pushFlexMessage(user.line_user_id, milestone.title, contents);

        const reasonText = milestone.key === "postnatal_day_0"
          ? "ご出産のお祝いメッセージです"
          : `生後${months}ヶ月の節目メッセージです`;

        await supabaseAdmin.from("notifications").insert({
          user_id: user.id,
          title: milestone.title,
          description: milestone.body,
          category: milestone.category,
          urgent: false,
          read: false,
          milestone_key: milestone.key,
          reason: reasonText,
        });

        results.push({ userId: user.id, milestone: milestone.key, status: "sent" });
      } catch (error) {
        console.error(`Milestone push failed for user ${user.id}:`, error);
        results.push({ userId: user.id, milestone: milestone.key, status: "error" });
      }
    }
  }

  const sent = results.filter((r) => r.status === "sent").length;
  const skipped = results.filter((r) => r.status === "already_sent").length;
  const errors = results.filter((r) => r.status === "error").length;

  return NextResponse.json({
    ok: true,
    summary: { sent, skipped, errors, total: results.length },
    results,
  });
}

// ─── Flex Message Builder ───

function buildFlexMessage(
  title: string,
  body: string,
  actionUrl?: string
): messagingApi.FlexBubble {
  const contents: messagingApi.FlexComponent[] = [
    {
      type: "text",
      text: "🌿 こもれび",
      size: "xs",
      color: "#4a7c59",
    },
    {
      type: "separator",
      margin: "md",
      color: "#e8f0e4",
    },
    {
      type: "text",
      text: title,
      weight: "bold",
      size: "lg",
      margin: "lg",
      wrap: true,
      color: "#333333",
    },
    {
      type: "text",
      text: body,
      size: "sm",
      color: "#666666",
      margin: "md",
      wrap: true,
      lineSpacing: "6px",
    },
  ];

  const bubble: messagingApi.FlexBubble = {
    type: "bubble",
    body: {
      type: "box",
      layout: "vertical",
      contents,
      paddingAll: "20px",
    },
  };

  if (actionUrl) {
    bubble.footer = {
      type: "box",
      layout: "vertical",
      contents: [
        {
          type: "button",
          action: {
            type: "uri",
            label: "こもれびで詳しく見る",
            uri: actionUrl,
          },
          style: "primary",
          color: "#4a7c59",
          height: "sm",
        },
      ],
      paddingAll: "12px",
    };
  }

  return bubble;
}
