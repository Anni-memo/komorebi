import { generateOgImage, ogSize, ogContentType } from "@/components/seo/og-image-template";

export const alt = "乳幼児健診ガイド | こもれび";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return generateOgImage({
    title: "乳幼児健診ガイド",
    subtitle: "月齢別にわかる健診の流れと準備",
    badges: [{ label: "健診", bg: "#fce4ec", color: "#c62828" }],
  });
}
