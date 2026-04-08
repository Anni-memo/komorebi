import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

function verifySignature(body: string, signature: string): boolean {
  const hash = crypto
    .createHmac("SHA256", process.env.LINE_MESSAGING_CHANNEL_SECRET!)
    .update(body)
    .digest("base64");
  return hash === signature;
}

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("x-line-signature") || "";

  if (!verifySignature(body, signature)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 403 });
  }

  const data = JSON.parse(body);
  const events = data.events || [];

  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  for (const event of events) {
    if (event.type === "follow") {
      // 友だち追加イベント: LINE IDがprofilesに紐付いていれば通知チャネルを有効化
      const lineUserId = event.source.userId;

      const { data: profile } = await supabaseAdmin
        .from("profiles")
        .select("id, notification_channels")
        .eq("line_user_id", lineUserId)
        .single();

      if (profile) {
        const channels = profile.notification_channels || [];
        if (!channels.includes("line")) {
          channels.push("line");
          await supabaseAdmin
            .from("profiles")
            .update({ notification_channels: channels })
            .eq("id", profile.id);
        }
      }
    }

    if (event.type === "unfollow") {
      // ブロック/友だち解除: LINE通知チャネルを無効化
      const lineUserId = event.source.userId;

      const { data: profile } = await supabaseAdmin
        .from("profiles")
        .select("id, notification_channels")
        .eq("line_user_id", lineUserId)
        .single();

      if (profile) {
        const channels = (profile.notification_channels || []).filter(
          (ch: string) => ch !== "line"
        );
        await supabaseAdmin
          .from("profiles")
          .update({ notification_channels: channels })
          .eq("id", profile.id);
      }
    }
  }

  return NextResponse.json({ ok: true });
}
