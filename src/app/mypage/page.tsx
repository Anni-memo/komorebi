import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function MyPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 py-10">
          <h1 className="text-2xl font-bold text-foreground mb-6">マイページ</h1>

          <div className="space-y-6">
            <Card className="border-border/50 shadow-none">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">基本情報</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">ニックネーム</span>
                    <span className="text-foreground">未設定</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">メールアドレス</span>
                    <span className="text-foreground">未設定</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 shadow-none">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">お子さまの情報</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">段階</span>
                    <Badge variant="secondary">0歳</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">お子さま</span>
                    <span className="text-foreground">第一子</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 shadow-none">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">地域情報</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">お住まいの地域</span>
                    <span className="text-foreground">未設定</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 shadow-none">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">気になるテーマ</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">睡眠</Badge>
                  <Badge variant="secondary">手続き・制度</Badge>
                  <Badge variant="secondary">保活</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 shadow-none">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">通知設定</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  {["手続き期限", "健診・受診", "保活", "おすすめ記事"].map((item) => (
                    <div key={item} className="flex items-center justify-between">
                      <span className="text-foreground">{item}</span>
                      <span className="text-xs text-primary">ON</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="pt-4 text-center">
              <p className="text-xs text-muted-foreground">
                情報が勝手に広がることはありません。いつでも変更・削除できます。
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
