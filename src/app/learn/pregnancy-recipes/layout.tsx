import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "妊娠月別おすすめ料理ガイド｜2〜10ヶ月の簡単レシピ63品 | こもれび",
  description:
    "妊娠2ヶ月から10ヶ月まで、月ごとの体調と必要な栄養素に合わせた簡単レシピを各7品ずつ紹介。つわり期・安定期・後期それぞれに最適な料理を管理栄養士監修情報に基づいてセレクト。",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
