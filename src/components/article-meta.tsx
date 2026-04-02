import { Calendar, UserCheck } from "lucide-react";

interface ArticleMetaProps {
  updatedAt: string;       // "2026-04-03" 形式
  supervisor?: string;     // "○○医院 小児科医 ○○先生" 等。未設定時はテンプレート表示
  supervisorNote?: string; // 補足（任意）
}

export function ArticleMeta({ updatedAt, supervisor, supervisorNote }: ArticleMetaProps) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground mb-4">
      <span className="inline-flex items-center gap-1">
        <Calendar className="size-3" />
        最終更新: {updatedAt}
      </span>
      {supervisor && (
        <span className="inline-flex items-center gap-1">
          <UserCheck className="size-3" />
          監修: {supervisor}
          {supervisorNote && <span className="text-muted-foreground/70">（{supervisorNote}）</span>}
        </span>
      )}
    </div>
  );
}
