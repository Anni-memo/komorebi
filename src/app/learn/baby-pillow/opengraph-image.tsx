import { generateOgImage, ogSize, ogContentType } from "@/components/seo/og-image-template";

export const alt = "新生児のまくら | こもれび";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return generateOgImage({
    title: "新生児のまくら",
    subtitle: "必要性・窒息リスク・商品比較",
    badges: [{ label: "日常ケア", bg: "#e0f2f1", color: "#00695c" }],
  });
}
