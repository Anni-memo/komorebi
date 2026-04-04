import { generateOgImage, ogSize, ogContentType } from "@/components/seo/og-image-template";

export const alt = "身体調和ガイド | こもれび";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return generateOgImage({
    title: "身体調和ガイド",
    subtitle: "赤ちゃんの発達を月齢で知る",
    badges: [{ label: "身体発達", bg: "#e8f5e9", color: "#2e7d32" }],
  });
}
