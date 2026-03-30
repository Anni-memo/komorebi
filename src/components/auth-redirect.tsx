"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function AuthRedirect() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        const supabase = createClient();
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          setChecking(false);
          return;
        }

        const { data: profile } = await supabase
          .from("profiles")
          .select("onboarding_completed")
          .eq("id", user.id)
          .single();

        if (profile?.onboarding_completed) {
          router.replace("/home");
        } else {
          router.replace("/onboarding");
        }
      } catch {
        setChecking(false);
      }
    }

    checkAuth();
  }, [router]);

  if (checking) {
    return (
      <div className="fixed inset-0 z-50 bg-background flex items-center justify-center">
        <div className="flex items-center gap-2 text-muted-foreground">
          <span className="text-2xl" aria-hidden>🌿</span>
          <span className="text-sm">読み込み中...</span>
        </div>
      </div>
    );
  }

  return null;
}
