import { generateOgImage, ogSize, ogContentType } from "@/components/seo/og-image-template";

export const alt = "入院バッグ準備リスト | こもれび";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return generateOgImage({
    title: "入院バッグ準備リスト",
    badges: [{ label: "出産準備", bg: "#fce4ec", color: "#ad1457" }],
  });
}
