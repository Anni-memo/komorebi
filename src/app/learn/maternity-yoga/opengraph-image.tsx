import { generateOgImage, ogSize, ogContentType } from "@/components/seo/og-image-template";

export const alt = "妊娠後期にできるマタニティヨガ | こもれび";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return generateOgImage({
    title: "妊娠後期にできるマタニティヨガ",
    badges: [{ label: "運動・ヨガ", bg: "#f1f8e9", color: "#558b2f" }],
  });
}
