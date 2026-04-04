import Link from "next/link";

export function MedicalDisclaimer() {
  return (
    <div className="p-4 bg-muted/30 rounded-lg">
      <p className="text-xs text-muted-foreground leading-relaxed">
        <strong className="text-foreground">注意:</strong>{" "}
        この記事は一般的な情報提供を目的としており、医師の診断や治療に代わるものではありません。
        お子さまの健康について気になることがある場合は、かかりつけの医師にご相談ください。
        詳しくは
        <Link
          href="/disclaimer"
          className="text-primary hover:underline"
        >
          免責事項
        </Link>
        をご確認ください。
      </p>
    </div>
  );
}
