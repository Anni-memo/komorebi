import { buttonVariants } from "@/components/ui/button-variants";

type AmazonProductCardProps = {
  name: string;
  asin: string;
  price?: string;
  storeId?: string;
  officialUrl?: string;
  officialName?: string;
};

export function AmazonProductCard({
  name,
  asin,
  price,
  storeId = "constellahdli-22",
  officialUrl,
  officialName,
}: AmazonProductCardProps) {
  const amazonUrl = `https://www.amazon.co.jp/dp/${asin}?tag=${storeId}`;
  const imageUrl = `https://m.media-amazon.com/images/P/${asin}.01._SL200_.jpg`;

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
            Amazonで見る
          </a>
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
    </div>
  );
}
