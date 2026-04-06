import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");

  // エラーチェック
  if (error || !code) {
    return NextResponse.redirect(`${origin}/auth/login?error=line_auth_failed`);
  }

  // CSRF検証
  const cookieStore = await cookies();
  const savedState = cookieStore.get("line_oauth_state")?.value;
  cookieStore.delete("line_oauth_state");

  if (!savedState || savedState !== state) {
    return NextResponse.redirect(`${origin}/auth/login?error=invalid_state`);
  }

  try {
    // 1. LINEからアクセストークンを取得
    const tokenRes = await fetch("https://api.line.me/oauth2/v2.1/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: process.env.LINE_CALLBACK_URL!,
        client_id: process.env.LINE_CHANNEL_ID!,
        client_secret: process.env.LINE_CHANNEL_SECRET!,
      }),
    });

    if (!tokenRes.ok) {
      return NextResponse.redirect(`${origin}/auth/login?error=line_token_failed`);
    }

    const tokenData = await tokenRes.json();
    const accessToken = tokenData.access_token;

    // 2. LINEユーザープロフィールを取得
    const profileRes = await fetch("https://api.line.me/v2/profile", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!profileRes.ok) {
      return NextResponse.redirect(`${origin}/auth/login?error=line_profile_failed`);
    }

    const profile = await profileRes.json();
    const lineUserId = profile.userId as string;
    const displayName = profile.displayName as string;
    const pictureUrl = profile.pictureUrl as string | undefined;

    // 3. Supabase Admin Clientでユーザーを検索/作成
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // LINE IDでユーザーを検索
    const { data: existingUsers } = await supabaseAdmin
      .from("profiles")
      .select("id")
      .eq("line_user_id", lineUserId)
      .limit(1);

    let userId: string;

    if (existingUsers && existingUsers.length > 0) {
      // 既存ユーザー
      userId = existingUsers[0].id;
    } else {
      // 新規ユーザー作成
      const email = `line_${lineUserId}@line.placeholder`;
      const { data: newUser, error: createError } =
        await supabaseAdmin.auth.admin.createUser({
          email,
          email_confirm: true,
          user_metadata: {
            line_user_id: lineUserId,
            display_name: displayName,
            avatar_url: pictureUrl,
            provider: "line",
          },
        });

      if (createError || !newUser.user) {
        return NextResponse.redirect(
          `${origin}/auth/login?error=user_creation_failed`
        );
      }

      userId = newUser.user.id;

      // profilesテーブルにLINE情報を保存
      await supabaseAdmin.from("profiles").upsert({
        id: userId,
        line_user_id: lineUserId,
        display_name: displayName,
        avatar_url: pictureUrl,
      });
    }

    // 4. マジックリンク用のトークンを生成してセッションを作成
    const { data: linkData, error: linkError } =
      await supabaseAdmin.auth.admin.generateLink({
        type: "magiclink",
        email: `line_${lineUserId}@line.placeholder`,
      });

    if (linkError || !linkData) {
      return NextResponse.redirect(
        `${origin}/auth/login?error=session_creation_failed`
      );
    }

    // トークンを使ってコールバックにリダイレクト
    const token_hash = linkData.properties?.hashed_token;
    if (token_hash) {
      const redirectUrl = new URL(`${origin}/auth/callback`);
      redirectUrl.searchParams.set("token_hash", token_hash);
      redirectUrl.searchParams.set("type", "magiclink");
      redirectUrl.searchParams.set("next", "/home");
      return NextResponse.redirect(redirectUrl.toString());
    }

    return NextResponse.redirect(`${origin}/auth/login?error=token_failed`);
  } catch {
    return NextResponse.redirect(`${origin}/auth/login?error=unexpected`);
  }
}
