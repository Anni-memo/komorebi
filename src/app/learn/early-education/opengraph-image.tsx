import { generateOgImage, ogSize, ogContentType } from "@/components/seo/og-image-template";

export const alt = "知育の基本ガイド | こもれび";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return generateOgImage({
    title: "知育の基本ガイド",
    subtitle: "月齢別の発達と遊び",
    badges: [{ label: "発達・知育", bg: "#ede7f6", color: "#4527a0" }],
  });
}
