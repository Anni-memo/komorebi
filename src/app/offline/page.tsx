export default function OfflinePage() {
  return (
    <main className="flex-1 flex items-center justify-center min-h-screen px-4">
      <div className="text-center">
        <span className="text-5xl mb-4 block" aria-hidden>
          🌿
        </span>
        <h1 className="text-2xl font-bold text-foreground mb-3">
          オフラインです
        </h1>
        <p className="text-muted-foreground leading-relaxed">
          インターネット接続を確認して、もう一度お試しください。
        </p>
      </div>
    </main>
  );
}
