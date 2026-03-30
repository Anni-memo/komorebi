"use client";

import { useEffect, useState, useCallback } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/client";

interface Notification {
  id: string;
  title: string;
  category: string;
  description: string;
  urgent: boolean;
  read: boolean;
  created_at: string;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "児童手当の申請期限が近づいています",
    category: "手続き",
    description:
      "出生日から15日以内に申請が必要です。お住まいの自治体窓口で確認してください。",
    urgent: true,
    read: false,
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    title: "1ヶ月健診の時期です",
    category: "健診",
    description: "産院または小児科で1ヶ月健診を受けましょう。",
    urgent: false,
    read: false,
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "3",
    title: "新生児の睡眠についての記事が追加されました",
    category: "学び",
    description: "あなたの時期に多い悩みをまとめた記事があります。",
    urgent: false,
    read: false,
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "4",
    title: "保育園の申請時期が近づいています",
    category: "保活",
    description: "来年度の申請スケジュールを確認しておくと安心です。",
    urgent: false,
    read: true,
    created_at: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "5",
    title: "出生届の提出はお済みですか？",
    category: "手続き",
    description:
      "出生日を含めて14日以内に届出が必要です。届出先はお住まいの市区町村役場です。",
    urgent: false,
    read: true,
    created_at: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

function getTimeGroup(dateStr: string): "今日" | "今週" | "過去" {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffDays = diffMs / (1000 * 60 * 60 * 24);

  if (diffDays < 1 && now.getDate() === date.getDate()) {
    return "今日";
  }
  if (diffDays < 7) {
    return "今週";
  }
  return "過去";
}

function formatRelativeTime(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMinutes < 1) return "たった今";
  if (diffMinutes < 60) return `${diffMinutes}分前`;
  if (diffHours < 24) return `${diffHours}時間前`;
  if (diffDays < 7) return `${diffDays}日前`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}週間前`;
  return `${Math.floor(diffDays / 30)}ヶ月前`;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const fetchNotifications = useCallback(async () => {
    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setIsLoggedIn(true);
        const { data, error } = await supabase
          .from("notifications")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (!error && data && data.length > 0) {
          setNotifications(data);
        } else {
          // Supabaseにデータがない場合はモックデータを使用
          setNotifications(mockNotifications);
        }
      } else {
        setNotifications(mockNotifications);
      }
    } catch {
      // Supabase接続エラー時はモックデータにフォールバック
      setNotifications(mockNotifications);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const markAsRead = async (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );

    if (isLoggedIn) {
      try {
        const supabase = createClient();
        await supabase
          .from("notifications")
          .update({ read: true })
          .eq("id", id);
      } catch {
        // サイレントフェイル — UIは既に更新済み
      }
    }
  };

  const markAllAsRead = async () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

    if (isLoggedIn) {
      try {
        const supabase = createClient();
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (user) {
          await supabase
            .from("notifications")
            .update({ read: true })
            .eq("user_id", user.id)
            .eq("read", false);
        }
      } catch {
        // サイレントフェイル
      }
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  // 通知をグループ別に分類
  const grouped = notifications.reduce(
    (acc, n) => {
      const group = getTimeGroup(n.created_at);
      if (!acc[group]) acc[group] = [];
      acc[group].push(n);
      return acc;
    },
    {} as Record<string, Notification[]>
  );

  const groupOrder: Array<"今日" | "今週" | "過去"> = ["今日", "今週", "過去"];

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 py-10">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-bold text-foreground">通知</h1>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-xs text-primary hover:text-primary/80 transition-colors"
              >
                すべて既読にする
              </button>
            )}
          </div>
          <p className="text-muted-foreground mb-6">
            忘れやすいことを、やさしくお知らせします。
            {unreadCount > 0 && (
              <span className="ml-2 text-sm text-primary font-medium">
                {unreadCount}件の未読
              </span>
            )}
          </p>

          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="border-border/50 shadow-none animate-pulse">
                  <CardContent className="pt-5">
                    <div className="h-4 bg-muted rounded w-3/4 mb-3" />
                    <div className="h-3 bg-muted rounded w-full mb-2" />
                    <div className="h-3 bg-muted rounded w-1/4" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : notifications.length === 0 ? (
            <Card className="border-border/50 shadow-none">
              <CardContent className="pt-8 pb-8 text-center">
                <p className="text-muted-foreground">
                  通知はまだありません。
                  <br />
                  お知らせがあるときにお届けします。
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-8">
              {groupOrder.map((group) => {
                const items = grouped[group];
                if (!items || items.length === 0) return null;

                return (
                  <div key={group}>
                    <h2 className="text-sm font-medium text-muted-foreground mb-3">
                      {group}
                    </h2>
                    <div className="space-y-3">
                      {items.map((n) => (
                        <Card
                          key={n.id}
                          className={`border-border/50 shadow-none transition-all ${
                            n.urgent
                              ? "border-l-4 border-l-komorebi-warm"
                              : ""
                          } ${n.read ? "opacity-60" : ""}`}
                        >
                          <CardContent className="pt-5">
                            <div className="flex items-start justify-between gap-3 mb-1">
                              <div className="flex items-start gap-2 min-w-0">
                                {!n.read && (
                                  <span className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1.5" />
                                )}
                                <h3
                                  className={`text-sm ${
                                    n.read
                                      ? "text-muted-foreground"
                                      : "font-semibold text-foreground"
                                  }`}
                                >
                                  {n.title}
                                </h3>
                              </div>
                              <span className="text-xs text-muted-foreground shrink-0">
                                {formatRelativeTime(n.created_at)}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground leading-relaxed mb-2 ml-4">
                              {n.description}
                            </p>
                            <div className="flex items-center justify-between ml-4">
                              <Badge variant="outline" className="text-xs">
                                {n.category}
                              </Badge>
                              {!n.read && (
                                <button
                                  onClick={() => markAsRead(n.id)}
                                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                                >
                                  既読にする
                                </button>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
