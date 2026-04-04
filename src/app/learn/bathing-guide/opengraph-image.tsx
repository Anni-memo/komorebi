import { generateOgImage, ogSize, ogContentType } from "@/components/seo/og-image-template";

export const alt = "沐浴・お風呂ガイド | こもれび";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return generateOgImage({
    title: "沐浴・お風呂ガイド",
    badges: [{ label: "日常ケア", bg: "#e0f2f1", color: "#00695c" }],
  });
}
