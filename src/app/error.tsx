"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { buttonVariants } from "@/components/ui/button-variants";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <>
      <Header />
      <main id="main" className="flex-1 flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 py-20 text-center">
          <p className="text-5xl font-bold text-primary/20 mb-4">Error</p>
          <h1 className="text-xl font-bold text-foreground mb-3">
            問題が発生しました
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed mb-8">
            一時的な問題が発生しました。お手数ですが、もう一度お試しください。
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={reset}
              className={buttonVariants({ variant: "default" })}
            >
              もう一度試す
            </button>
            <a href="/" className={buttonVariants({ variant: "outline" })}>
              トップページへ
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
