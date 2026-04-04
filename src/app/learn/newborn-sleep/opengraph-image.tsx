import { generateOgImage, ogSize, ogContentType } from "@/components/seo/og-image-template";

export const alt = "新生児の睡眠パターンを知ろう | こもれび";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return generateOgImage({
    title: "新生児の睡眠パターンを知ろう",
    badges: [{ label: "睡眠", bg: "#e8eaf6", color: "#283593" }],
  });
}
