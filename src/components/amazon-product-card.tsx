import Image from "next/image";
import { buttonVariants } from "@/components/ui/button-variants";

type AmazonProductCardProps = {
  name: string;
  asin: string;
  imageId: string;
  price?: string;
  storeId?: string;
};

export function AmazonProductCard({
  name,
  asin,
  imageId,
  price,
  storeId = "constellahdli-22",
}: AmazonProductCardProps) {
  const amazonUrl = `https://www.amazon.co.jp/dp/${asin}?tag=${storeId}`;
  const imageUrl = `https://m.media-amazon.com/images/I/${imageId}._SL300_.jpg`;

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 rounded-xl border border-border/50 bg-card p-4 text-sm">
      <a
        href={amazonUrl}
        rel="noopener noreferrer nofollow sponsored"
        className="shrink-0"
      >
        <Image
          src={imageUrl}
          alt={name}
          width={120}
          height={120}
          className="rounded-lg object-contain"
        />
      </a>
      <div className="flex flex-1 flex-col items-center sm:items-start gap-2 text-center sm:text-left">
        <p className="font-medium text-foreground leading-snug">{name}</p>
        {price && (
          <p className="text-xs text-muted-foreground">{price}</p>
        )}
        <a
          href={amazonUrl}
          rel="noopener noreferrer nofollow sponsored"
          className={buttonVariants({ variant: "outline", size: "sm" })}
        >
          Amazonで見る
        </a>
      </div>
    </div>
  );
}
