import { Header } from "@/components/layout/header";
import { ChatUI } from "@/components/chat/chat-ui";

export const metadata = {
  title: "AIコンシェルジュ",
  description: "AIがあなたの状況を整理し、今必要な情報・手続き・準備を案内します。",
};

export default function ConciergeChatPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <ChatUI />
      </main>
    </>
  );
}
