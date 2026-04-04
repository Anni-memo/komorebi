"use client";

type ShareButtonsProps = {
  title: string;
  path: string;
};

const SITE_URL = "https://komorebi.constella-hd.co.jp";

export function ShareButtons({ title, path }: ShareButtonsProps) {
  const url = `${SITE_URL}${path}`;
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-muted-foreground">共有:</span>
      <a
        href={`https://social-plugins.line.me/lineit/share?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#06C755] text-white text-xs font-bold hover:opacity-80 transition-opacity"
        aria-label="LINEで共有"
      >
        L
      </a>
      <a
        href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-foreground text-background text-xs font-bold hover:opacity-80 transition-opacity"
        aria-label="Xで共有"
      >
        X
      </a>
      <button
        onClick={() => {
          if (navigator.share) {
            navigator.share({ title, url });
          } else {
            navigator.clipboard.writeText(url);
          }
        }}
        className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-muted text-muted-foreground text-xs hover:bg-muted/80 transition-colors"
        aria-label="リンクをコピー"
      >
        🔗
      </button>
    </div>
  );
}
