"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/client";

const benefits = [
  {
    title: "出産育児一時金",
    category: "給付",
    timing: "出産時",
    summary: "出産にかかる費用の負担を軽減するため、一定額が支給される制度。",
    audience: "出産を控えている方",
  },
  {
    title: "児童手当",
    category: "手当",
    timing: "出生後15日以内に申請",
    summary: "中学校卒業までの児童を養育している方に支給される手当。",
    audience: "すべての親",
  },
  {
    title: "育児休業給付金",
    category: "給付",
    timing: "育休開始後",
    summary: "育児休業中の所得を補填するための給付金。",
    audience: "会社員の方",
  },
  {
    title: "乳幼児医療費助成",
    category: "助成",
    timing: "出生後",
    summary: "乳幼児の医療費の自己負担分を助成する制度。地域により内容が異なる。",
    audience: "すべての親",
  },
  {
    title: "産前産後期間の保険料免除",
    category: "免除",
    timing: "出産予定日の前後",
    summary: "国民年金保険料が一定期間免除される制度。",
    audience: "自営業・フリーランスの方",
  },
];

const categories = ["給付", "手当", "助成", "免除"] as const;

export default function BenefitsPage() {
  const [municipality, setMunicipality] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [profileLoaded, setProfileLoaded] = useState(false);

  useEffect(() => {
    async function loadProfile() {
      try {
        const supabase = createClient();
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user) {
          const { data } = await supabase
            .from("profiles")
            .select("municipality")
            .eq("id", user.id)
            .single();

          if (data?.municipality) {
            setMunicipality(data.municipality);
          }
        }
      } catch {
        // ログインしていない場合は静かに失敗
      } finally {
        setProfileLoaded(true);
      }
    }
    loadProfile();
  }, []);

  const filteredBenefits = activeCategory
    ? benefits.filter((b) => b.category === activeCategory)
    : benefits;

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 py-10">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            制度を調べる
          </h1>
          <p className="text-muted-foreground mb-6">
            地域と状況に応じて、確認しておきたい制度を案内します。
          </p>

          <Card className="border-border/50 shadow-none mb-8">
            <CardContent className="pt-5">
              <p className="text-sm text-muted-foreground mb-3">
                お住まいの地域を設定すると、より正確な情報をお届けできます。
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="市区町村名を入力"
                  value={municipality}
                  onChange={(e) => setMunicipality(e.target.value)}
                  className="flex-1 rounded-lg border border-border bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </CardContent>
          </Card>

          {/* カテゴリフィルター */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                activeCategory === null
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background text-foreground border-border hover:border-primary/50 hover:bg-muted/50"
              }`}
            >
              すべて
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() =>
                  setActiveCategory(activeCategory === cat ? null : cat)
                }
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background text-foreground border-border hover:border-primary/50 hover:bg-muted/50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {filteredBenefits.map((benefit) => (
              <Card
                key={benefit.title}
                className="border-border/50 shadow-none hover:border-primary/30 transition-colors cursor-pointer"
              >
                <CardContent className="pt-5">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="font-semibold text-foreground">
                      {benefit.title}
                    </h3>
                    <Badge variant="secondary" className="text-xs shrink-0">
                      {benefit.category}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                    {benefit.summary}
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                    <span>対象: {benefit.audience}</span>
                    <span>時期: {benefit.timing}</span>
                  </div>
                </CardContent>
              </Card>
            ))}

            {filteredBenefits.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground text-sm">
                  該当する制度はありません。
                </p>
              </div>
            )}
          </div>

          {/* 地域の制度を調べる */}
          {municipality && (
            <Card className="border-border/50 shadow-none mt-8">
              <CardContent className="pt-5">
                <h3 className="font-semibold text-foreground mb-2">
                  地域の制度を調べる
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {municipality}
                  の子育て支援制度について、自治体の公式サイトで詳しく確認できます。
                </p>
                <a
                  href={`https://www.google.com/search?q=${encodeURIComponent(
                    municipality + " 子育て支援 公式サイト"
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                >
                  {municipality}の子育て支援情報を検索
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                    />
                  </svg>
                </a>
              </CardContent>
            </Card>
          )}

          <div className="mt-8 p-4 bg-muted/30 rounded-lg">
            <p className="text-xs text-muted-foreground leading-relaxed">
              制度の正式な要件や申請先は自治体で異なる場合があります。最終確認は、自治体窓口や公式案内とあわせて行うと安心です。
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
