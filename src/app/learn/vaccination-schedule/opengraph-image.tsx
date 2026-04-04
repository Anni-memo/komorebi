import { generateOgImage, ogSize, ogContentType } from "@/components/seo/og-image-template";

export const alt = "予防接種スケジュール | こもれび";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return generateOgImage({
    title: "予防接種スケジュール",
    subtitle: "チェックリスト付き",
    badges: [{ label: "予防接種", bg: "#e3f2fd", color: "#1565c0" }],
  });
}
