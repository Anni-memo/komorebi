import { NextResponse } from "next/server";
import { cookies } from "next/headers";

// 既存アカウントにLINEを紐付けるためのOAuthフロー開始
export async function GET() {
  const state = crypto.randomUUID();
  const cookieStore = await cookies();

  // link modeであることを記録
  cookieStore.set("line_oauth_state", state, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 600,
    path: "/",
  });
  cookieStore.set("line_oauth_mode", "link", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 600,
    path: "/",
  });

  const params = new URLSearchParams({
    response_type: "code",
    client_id: process.env.LINE_CHANNEL_ID!,
    redirect_uri: process.env.LINE_CALLBACK_URL!,
    state,
    scope: "profile openid email",
    bot_prompt: "aggressive", // LINE公式アカウントの友だち追加を促す
  });

  return NextResponse.redirect(
    `https://access.line.me/oauth2/v2.1/authorize?${params.toString()}`
  );
}
