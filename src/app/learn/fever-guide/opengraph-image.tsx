import { generateOgImage, ogSize, ogContentType } from "@/components/seo/og-image-template";

export const alt = "子どもの発熱対応ガイド | こもれび";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return generateOgImage({
    title: "子どもの発熱対応ガイド",
    badges: [{ label: "健康・病気", bg: "#fce4ec", color: "#c62828" }],
  });
}
