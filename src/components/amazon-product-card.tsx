import { buttonVariants } from "@/components/ui/button-variants";

// アフィリエイトID設定（取得後にここを更新）
const AFFILIATE_CONFIG = {
  amazon: "constellahdli-22",
  rakuten: "", // 楽天アフィリエイトID取得後に設定
  yahoo: "",   // ValueCommerce sid/pid 取得後に設定
};

type AmazonProductCardProps = {
  name: string;
  asin: string;
  price?: string;
  storeId?: string;
  rakutenUrl?: string;
  yahooUrl?: string;
  officialUrl?: string;
  officialName?: string;
};

function buildRakutenSearchUrl(productName: string): string {
  const query = encodeURIComponent(productName);
  const base = `https://search.rakuten.co.jp/search/mall/${query}/`;
  if (AFFILIATE_CONFIG.rakuten) {
    return `${base}?affiliateId=${AFFILIATE_CONFIG.rakuten}`;
  }
  return base;
}

function buildYahooSearchUrl(productName: string): string {
  const query = encodeURIComponent(productName);
  const base = `https://shopping.yahoo.co.jp/search?p=${query}`;
  if (AFFILIATE_CONFIG.yahoo) {
    return `${base}&sid=${AFFILIATE_CONFIG.yahoo}`;
  }
  return base;
}

export function AmazonProductCard({
  name,
  asin,
  price,
  storeId = AFFILIATE_CONFIG.amazon,
  rakutenUrl,
  yahooUrl,
  officialUrl,
  officialName,
}: AmazonProductCardProps) {
  const amazonUrl = `https://www.amazon.co.jp/dp/${asin}?tag=${storeId}`;
  const imageUrl = `https://m.media-amazon.com/images/P/${asin}.01._SL200_.jpg`;
  const finalRakutenUrl = rakutenUrl || buildRakutenSearchUrl(name);
  const finalYahooUrl = yahooUrl || buildYahooSearchUrl(name);

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 rounded-xl border border-border/50 bg-card p-4 text-sm">
      <a
        href={amazonUrl}
        rel="noopener noreferrer nofollow sponsored"
        className="shrink-0"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl}
          alt={name}
          width={120}
          height={120}
          className="rounded-lg object-contain bg-white"
          loading="lazy"
        />
      </a>
      <div className="flex flex-1 flex-col items-center sm:items-start gap-2 text-center sm:text-left">
        <p className="font-medium text-foreground leading-snug">{name}</p>
        {price && (
          <p className="text-xs text-muted-foreground">{price}</p>
        )}
        <div className="flex flex-wrap gap-2">
          <a
            href={amazonUrl}
            rel="noopener noreferrer nofollow sponsored"
            className={buttonVariants({ variant: "outline", size: "sm" })}
          >
            <span className="text-[#FF9900]">●</span> Amazon
          </a>
          <a
            href={finalRakutenUrl}
            rel="noopener noreferrer nofollow sponsored"
            className={buttonVariants({ variant: "outline", size: "sm" })}
          >
            <span className="text-[#BF0000]">●</span> 楽天
          </a>
          <a
            href={finalYahooUrl}
            rel="noopener noreferrer nofollow sponsored"
            className={buttonVariants({ variant: "outline", size: "sm" })}
          >
            <span className="text-[#FF0033]">●</span> Yahoo!
          </a>
        </div>
        {officialUrl && (
          <a
            href={officialUrl}
            rel="noopener noreferrer"
            className={buttonVariants({ variant: "ghost", size: "sm" })}
          >
            {officialName ?? "公式サイト"}
          </a>
        )}
      </div>
    </div>
  );
}
