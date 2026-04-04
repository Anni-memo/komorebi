import { generateOgImage, ogSize, ogContentType } from "@/components/seo/og-image-template";

export const alt = "子どもがかかりやすい病気ガイド | こもれび";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return generateOgImage({
    title: "子どもがかかりやすい病気ガイド",
    badges: [{ label: "健康・病気", bg: "#fce4ec", color: "#c62828" }],
  });
}
