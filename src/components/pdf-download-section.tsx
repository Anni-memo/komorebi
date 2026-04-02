import { Card, CardContent } from "@/components/ui/card";
import { Download, Printer, Share2 } from "lucide-react";

interface UsageTip {
  icon: "print" | "share" | "other";
  text: string;
}

interface PdfDownloadSectionProps {
  title: string;
  catchcopy: string;
  description: string;
  pdfPath: string;
  usageTips: UsageTip[];
}

const tipIcons = {
  print: Printer,
  share: Share2,
  other: Download,
} as const;

export function PdfDownloadSection({
  title,
  catchcopy,
  description,
  pdfPath,
  usageTips,
}: PdfDownloadSectionProps) {
  return (
    <Card className="border-primary/20 shadow-none bg-primary/[0.03]">
      <CardContent className="pt-6 pb-6">
        <div className="text-center mb-4">
          <p className="text-xs font-medium text-primary tracking-wider mb-1">
            PDF DOWNLOAD
          </p>
          <h3 className="text-lg font-bold text-foreground mb-1">{title}</h3>
          <p className="text-sm font-medium text-primary">{catchcopy}</p>
          <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
            {description}
          </p>
        </div>

        <div className="flex justify-center mb-4">
          <a
            href={pdfPath}
            download
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors"
          >
            <Download className="size-4" />
            PDFをダウンロード
          </a>
        </div>

        <div className="border-t border-border/50 pt-3">
          <p className="text-xs font-medium text-muted-foreground mb-2 text-center">
            こんな使い方ができます
          </p>
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            {usageTips.map((tip, i) => {
              const Icon = tipIcons[tip.icon];
              return (
                <div
                  key={i}
                  className="flex items-center gap-2 text-xs text-muted-foreground bg-background rounded-md px-3 py-2"
                >
                  <Icon className="size-3.5 text-primary shrink-0" />
                  {tip.text}
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
