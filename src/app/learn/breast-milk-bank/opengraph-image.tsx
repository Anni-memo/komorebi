import { generateOgImage, ogSize, ogContentType } from "@/components/seo/og-image-template";

export const alt = "母乳バンクの基礎知識と利用ガイド | こもれび";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return generateOgImage({
    title: "母乳バンクの基礎知識と利用ガイド",
    badges: [{ label: "健康・病気", bg: "#fce4ec", color: "#c62828" }],
  });
}
