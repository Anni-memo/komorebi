"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button-variants";

type Category = "必需品" | "あれば助かる" | "まだ急がない";
type AgeTag = "妊娠中" | "0-3ヶ月" | "3-6ヶ月" | "6-12ヶ月" | "1歳以上";
type ConcernTag = "睡眠" | "外出" | "食事" | "体調" | "日常のお世話";
type TabValue = "すべて" | Category | "月齢別" | "悩み別";

interface PrepareItem {
  name: string;
  category: Category;
  scene: string;
  audience: string;
  ageTag: AgeTag;
  concernTag: ConcernTag;
  href?: string;
}

const tabs: TabValue[] = [
  "すべて",
  "必需品",
  "あれば助かる",
  "まだ急がない",
  "月齢別",
  "悩み別",
];

const items: PrepareItem[] = [
  // ── 必需品 ──
  {
    name: "ベビーベッド / ベビー布団",
    category: "必需品",
    scene: "睡眠環境の確保",
    audience: "すべての家庭",
    ageTag: "妊娠中",
    concernTag: "睡眠",
    href: "/prepare/baby-bed",
  },
  {
    name: "おむつ（新生児用）",
    category: "必需品",
    scene: "日常のお世話",
    audience: "すべての家庭",
    ageTag: "0-3ヶ月",
    concernTag: "日常のお世話",
    href: "/prepare/diapers",
  },
  {
    name: "おしりふき",
    category: "必需品",
    scene: "日常のお世話",
    audience: "すべての家庭",
    ageTag: "0-3ヶ月",
    concernTag: "日常のお世話",
    href: "/prepare/wipes",
  },
  {
    name: "抱っこ紐",
    category: "必需品",
    scene: "外出・寝かしつけ",
    audience: "すべての家庭",
    ageTag: "0-3ヶ月",
    concernTag: "外出",
    href: "/prepare/baby-carrier",
  },
  {
    name: "ベビーカー",
    category: "必需品",
    scene: "外出・散歩",
    audience: "すべての家庭",
    ageTag: "3-6ヶ月",
    concernTag: "外出",
    href: "/prepare/stroller",
  },
  {
    name: "チャイルドシート",
    category: "必需品",
    scene: "車での移動",
    audience: "車を使う家庭",
    ageTag: "0-3ヶ月",
    concernTag: "外出",
    href: "/prepare/childseat",
  },
  {
    name: "哺乳瓶・ミルク",
    category: "必需品",
    scene: "授乳・ミルク",
    audience: "混合・ミルク育児の家庭",
    ageTag: "0-3ヶ月",
    concernTag: "食事",
    href: "/prepare/bottle",
  },
  {
    name: "肌着・ウェア（短肌着、コンビ肌着、ツーウェイオール）",
    category: "必需品",
    scene: "着替え・体温調節",
    audience: "すべての家庭",
    ageTag: "妊娠中",
    concernTag: "日常のお世話",
  },
  {
    name: "ガーゼ・タオル",
    category: "必需品",
    scene: "授乳・沐浴・日常のお世話",
    audience: "すべての家庭",
    ageTag: "妊娠中",
    concernTag: "日常のお世話",
  },
  {
    name: "ベビーバス",
    category: "必需品",
    scene: "沐浴",
    audience: "すべての家庭",
    ageTag: "妊娠中",
    concernTag: "日常のお世話",
  },
  {
    name: "体温計",
    category: "必需品",
    scene: "体調管理",
    audience: "すべての家庭",
    ageTag: "0-3ヶ月",
    concernTag: "体調",
  },
  {
    name: "つめ切りばさみ",
    category: "必需品",
    scene: "日常のお世話",
    audience: "すべての家庭",
    ageTag: "0-3ヶ月",
    concernTag: "日常のお世話",
  },

  // ── あれば助かる ──
  {
    name: "授乳クッション",
    category: "あれば助かる",
    scene: "授乳・妊娠中の睡眠",
    audience: "母乳・混合育児の家庭",
    ageTag: "0-3ヶ月",
    concernTag: "食事",
    href: "/prepare/nursing-pillow",
  },
  {
    name: "バウンサー",
    category: "あれば助かる",
    scene: "家事中の見守り",
    audience: "ワンオペになりやすい家庭",
    ageTag: "3-6ヶ月",
    concernTag: "日常のお世話",
    href: "/prepare/bouncer",
  },
  {
    name: "電動鼻吸い器",
    category: "あれば助かる",
    scene: "風邪・鼻詰まりのとき",
    audience: "すべての家庭",
    ageTag: "0-3ヶ月",
    concernTag: "体調",
    href: "/prepare/nasal-aspirator",
  },
  {
    name: "ベビーモニター",
    category: "あれば助かる",
    scene: "別室での見守り",
    audience: "部屋数が多い家庭",
    ageTag: "0-3ヶ月",
    concernTag: "睡眠",
    href: "/prepare/baby-monitor",
  },
  {
    name: "おくるみ・スワドル",
    category: "あれば助かる",
    scene: "寝かしつけ・外出時",
    audience: "すべての家庭",
    ageTag: "0-3ヶ月",
    concernTag: "睡眠",
  },
  {
    name: "授乳ケープ",
    category: "あれば助かる",
    scene: "外出先での授乳",
    audience: "母乳育児の家庭",
    ageTag: "0-3ヶ月",
    concernTag: "外出",
  },
  {
    name: "ベビーワゴン（収納）",
    category: "あれば助かる",
    scene: "お世話グッズの整理",
    audience: "すべての家庭",
    ageTag: "妊娠中",
    concernTag: "日常のお世話",
  },
  {
    name: "おむつ替えシート",
    category: "あれば助かる",
    scene: "外出先でのおむつ替え",
    audience: "すべての家庭",
    ageTag: "0-3ヶ月",
    concernTag: "外出",
  },

  // ── まだ急がない ──
  {
    name: "離乳食グッズ",
    category: "まだ急がない",
    scene: "離乳食開始（5ヶ月頃から）",
    audience: "すべての家庭",
    ageTag: "6-12ヶ月",
    concernTag: "食事",
    href: "/prepare/baby-food-goods",
  },
  {
    name: "ストローマグ",
    category: "まだ急がない",
    scene: "飲む練習（6ヶ月頃から）",
    audience: "すべての家庭",
    ageTag: "6-12ヶ月",
    concernTag: "食事",
  },
  {
    name: "ベビーチェア",
    category: "まだ急がない",
    scene: "お座り・食事（6ヶ月頃から）",
    audience: "すべての家庭",
    ageTag: "6-12ヶ月",
    concernTag: "食事",
  },
  {
    name: "ベビーゲート",
    category: "まだ急がない",
    scene: "安全対策（はいはい開始後）",
    audience: "すべての家庭",
    ageTag: "1歳以上",
    concernTag: "日常のお世話",
  },
  {
    name: "ファーストシューズ",
    category: "まだ急がない",
    scene: "お外歩き（つかまり立ち後）",
    audience: "すべての家庭",
    ageTag: "1歳以上",
    concernTag: "外出",
  },
  {
    name: "三輪車・手押し車",
    category: "まだ急がない",
    scene: "外遊び（1歳頃から）",
    audience: "すべての家庭",
    ageTag: "1歳以上",
    concernTag: "外出",
  },
];

const ageTagOrder: AgeTag[] = [
  "妊娠中",
  "0-3ヶ月",
  "3-6ヶ月",
  "6-12ヶ月",
  "1歳以上",
];

const concernTagOrder: ConcernTag[] = [
  "睡眠",
  "外出",
  "食事",
  "体調",
  "日常のお世話",
];

function groupBy<T, K extends string>(list: T[], keyFn: (item: T) => K): Map<K, T[]> {
  const map = new Map<K, T[]>();
  for (const item of list) {
    const key = keyFn(item);
    const group = map.get(key);
    if (group) {
      group.push(item);
    } else {
      map.set(key, [item]);
    }
  }
  return map;
}

function ItemCard({ item }: { item: PrepareItem }) {
  const categoryVariant =
    item.category === "必需品"
      ? "default"
      : item.category === "あれば助かる"
        ? "secondary"
        : "outline";

  const cardContent = (
    <CardContent className="pt-5">
      <div className="flex items-start justify-between gap-3 mb-2">
        <h3 className="font-semibold text-foreground">{item.name}</h3>
        <div className="flex gap-2 shrink-0">
          {item.href && (
            <Badge variant="outline" className="text-xs">
              比較ガイドあり
            </Badge>
          )}
          <Badge variant={categoryVariant} className="text-xs">
            {item.category}
          </Badge>
        </div>
      </div>
      <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
        <span>使用シーン: {item.scene}</span>
        <span>向いている家庭: {item.audience}</span>
        <span>月齢: {item.ageTag}</span>
      </div>
    </CardContent>
  );

  return item.href ? (
    <Link href={item.href} className="block">
      <Card className="border-border/50 shadow-none hover:border-primary/30 hover:shadow-sm transition-all cursor-pointer">
        {cardContent}
      </Card>
    </Link>
  ) : (
    <Card className="border-border/50 shadow-none">
      {cardContent}
    </Card>
  );
}

function ItemList({ items: list }: { items: PrepareItem[] }) {
  return (
    <div className="space-y-4">
      {list.map((item) => (
        <ItemCard key={item.name} item={item} />
      ))}
    </div>
  );
}

function GroupedView({
  items: allItems,
  groupKey,
  order,
}: {
  items: PrepareItem[];
  groupKey: "ageTag" | "concernTag";
  order: string[];
}) {
  const grouped = groupBy(allItems, (item) => item[groupKey]);

  return (
    <div className="space-y-8">
      {order.map((key) => {
        const group = grouped.get(key as AgeTag & ConcernTag);
        if (!group || group.length === 0) return null;
        return (
          <section key={key}>
            <h2 className="text-lg font-semibold text-foreground mb-3 border-b border-border/50 pb-2">
              {key}
            </h2>
            <ItemList items={group} />
          </section>
        );
      })}
    </div>
  );
}

export default function PreparePage() {
  const [activeTab, setActiveTab] = useState<TabValue>("すべて");

  const filteredItems =
    activeTab === "すべて" || activeTab === "月齢別" || activeTab === "悩み別"
      ? items
      : items.filter((item) => item.category === activeTab);

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 py-10">
          <h1 className="text-2xl font-bold text-foreground mb-2">準備する</h1>
          <p className="text-muted-foreground mb-6">
            必要なものを、今の状況に合わせて整理しています。
            <br />
            量より「今の自分に必要かどうか」で考えると楽になります。
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            {tabs.map((tab) => (
              <Button
                key={tab}
                variant={tab === activeTab ? "default" : "outline"}
                size="sm"
                className="rounded-full px-4 transition-colors"
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </Button>
            ))}
          </div>

          {activeTab === "月齢別" ? (
            <GroupedView items={items} groupKey="ageTag" order={ageTagOrder} />
          ) : activeTab === "悩み別" ? (
            <GroupedView
              items={items}
              groupKey="concernTag"
              order={concernTagOrder}
            />
          ) : (
            <ItemList items={filteredItems} />
          )}

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/concierge"
              className={buttonVariants({ variant: "outline" })}
            >
              AIに今必要なものだけ聞く
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
