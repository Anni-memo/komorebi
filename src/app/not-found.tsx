import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { buttonVariants } from "@/components/ui/button-variants";

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main" className="flex-1 flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 py-20 text-center">
          <p className="text-6xl font-bold text-primary/20 mb-4">404</p>
          <h1 className="text-xl font-bold text-foreground mb-3">
            ページが見つかりません
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed mb-8">
            お探しのページは移動または削除された可能性があります。
            URLが正しいかご確認ください。
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/" className={buttonVariants({ variant: "default" })}>
              トップページへ
            </Link>
            <Link
              href="/learn"
              className={buttonVariants({ variant: "outline" })}
            >
              学ぶ
            </Link>
            <Link
              href="/concierge"
              className={buttonVariants({ variant: "ghost" })}
            >
              AIに相談する
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
