import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="text-6xl">🔒</div>
        <h1 className="text-2xl font-bold text-gray-800">
          ログインが必要です
        </h1>
        <p className="text-gray-600 text-sm leading-relaxed">
          このページを利用するにはログインしてください。
          <br />
          アカウントをお持ちでない方は、無料で登録できます。
        </p>
        <div className="flex flex-col gap-3">
          <Link
            href="/auth/login"
            className="inline-flex items-center justify-center rounded-lg bg-pink-500 px-6 py-3 text-sm font-medium text-white hover:bg-pink-600 transition-colors"
          >
            ログイン
          </Link>
          <Link
            href="/auth/signup"
            className="inline-flex items-center justify-center rounded-lg border border-pink-200 px-6 py-3 text-sm font-medium text-pink-600 hover:bg-pink-50 transition-colors"
          >
            新規登録
          </Link>
          <Link
            href="/"
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors mt-2"
          >
            トップページに戻る
          </Link>
        </div>
      </div>
    </div>
  );
}
