import { NextRequest, NextResponse } from "next/server";
import { lineClient } from "@/lib/line";
import type { messagingApi } from "@line/bot-sdk";

export async function POST(request: NextRequest) {
  // 内部APIとして認証
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { title, body, actionUrl } = await request.json();

  try {
    let messages: messagingApi.Message[];

    if (actionUrl) {
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

      messages = [{ type: "flex", altText: title, contents }];
    } else {
      messages = [{ type: "text", text: `🌿 ${title}\n\n${body}` }];
    }

    await lineClient.broadcast({ messages });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("LINE broadcast failed:", error);
    return NextResponse.json({ error: "Broadcast failed" }, { status: 500 });
  }
}
