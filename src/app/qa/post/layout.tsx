import { unauthorized } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function QAPostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    unauthorized();
  }

  return <>{children}</>;
}
