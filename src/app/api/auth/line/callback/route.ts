import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import { createClient as createServerClient } from "@/lib/supabase/server";

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
  const mode = cookieStore.get("line_oauth_mode")?.value;
  cookieStore.delete("line_oauth_state");
  cookieStore.delete("line_oauth_mode");

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

    // 3. Supabase Admin Client
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // === Link Mode: 既存アカウントにLINEを紐付け ===
    if (mode === "link") {
      const supabase = await createServerClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        return NextResponse.redirect(`${origin}/auth/login?error=not_logged_in`);
      }

      // 既に別ユーザーが同じLINE IDを使っていないか確認
      const { data: existing } = await supabaseAdmin
        .from("profiles")
        .select("id")
        .eq("line_user_id", lineUserId)
        .limit(1);

      if (existing && existing.length > 0 && existing[0].id !== user.id) {
        return NextResponse.redirect(`${origin}/mypage?error=line_already_linked`);
      }

      // プロフィールにLINE情報を保存
      await supabaseAdmin.from("profiles").upsert({
        id: user.id,
        line_user_id: lineUserId,
        line_display_name: displayName,
        line_picture_url: pictureUrl,
      });

      return NextResponse.redirect(`${origin}/mypage?line_linked=true`);
    }

    // === Login Mode: LINEでログイン/新規登録 ===
    const { data: existingUsers } = await supabaseAdmin
      .from("profiles")
      .select("id")
      .eq("line_user_id", lineUserId)
      .limit(1);

    let userId: string;
    let email: string;

    if (existingUsers && existingUsers.length > 0) {
      userId = existingUsers[0].id;
      // 既存ユーザーのメールを取得
      const { data: userData } = await supabaseAdmin.auth.admin.getUserById(userId);
      email = userData?.user?.email || `line_${lineUserId}@line.placeholder`;
    } else {
      // 新規ユーザー作成
      email = `line_${lineUserId}@line.placeholder`;
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
        return NextResponse.redirect(`${origin}/auth/login?error=user_creation_failed`);
      }

      userId = newUser.user.id;

      await supabaseAdmin.from("profiles").upsert({
        id: userId,
        line_user_id: lineUserId,
        line_display_name: displayName,
        line_picture_url: pictureUrl,
      });
    }

    // マジックリンクでセッション作成
    const { data: linkData, error: linkError } =
      await supabaseAdmin.auth.admin.generateLink({
        type: "magiclink",
        email,
      });

    if (linkError || !linkData) {
      return NextResponse.redirect(`${origin}/auth/login?error=session_creation_failed`);
    }

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
