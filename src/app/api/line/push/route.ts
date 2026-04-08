import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { pushTextMessage, pushFlexMessage } from "@/lib/line";
import type { messagingApi } from "@line/bot-sdk";

export async function POST(request: NextRequest) {
  // 内部APIとして認証（Supabase service role keyで保護）
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { userId, title, body, actionUrl, category } = await request.json();

  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // ユーザーのLINE IDと通知設定を取得
  const { data: profile } = await supabaseAdmin
    .from("profiles")
    .select("line_user_id, notification_channels, notification_categories")
    .eq("id", userId)
    .single();

  if (!profile?.line_user_id) {
    return NextResponse.json({ error: "No LINE ID linked" }, { status: 404 });
  }

  const channels = profile.notification_channels || [];
  if (!channels.includes("line")) {
    return NextResponse.json({ error: "LINE notification disabled" }, { status: 400 });
  }

  // カテゴリフィルタ
  const categories = profile.notification_categories || [];
  if (categories.length > 0 && category && !categories.includes(category)) {
    return NextResponse.json({ error: "Category not subscribed" }, { status: 400 });
  }

  try {
    if (actionUrl) {
      // リッチなFlex Message
      const contents: messagingApi.FlexBubble = {
        type: "bubble",
        body: {
          type: "box",
          layout: "vertical",
          contents: [
            {
              type: "text",
              text: "🌿 こもれび",
              size: "xs",
              color: "#4a7c59",
            },
            {
              type: "text",
              text: title,
              weight: "bold",
              size: "lg",
              margin: "md",
              wrap: true,
            },
            {
              type: "text",
              text: body,
              size: "sm",
              color: "#666666",
              margin: "md",
              wrap: true,
            },
          ],
        },
        footer: {
          type: "box",
          layout: "vertical",
          contents: [
            {
              type: "button",
              action: {
                type: "uri",
                label: "詳しく見る",
                uri: actionUrl,
              },
              style: "primary",
              color: "#4a7c59",
            },
          ],
        },
      };

      await pushFlexMessage(profile.line_user_id, title, contents);
    } else {
      await pushTextMessage(
        profile.line_user_id,
        `🌿 ${title}\n\n${body}`
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("LINE push failed:", error);
    return NextResponse.json({ error: "Push failed" }, { status: 500 });
  }
}
