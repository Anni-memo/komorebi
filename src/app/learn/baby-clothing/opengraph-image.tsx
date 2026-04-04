import { generateOgImage, ogSize, ogContentType } from "@/components/seo/og-image-template";

export const alt = "ベビー服・肌着の選びかた | こもれび";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return generateOgImage({
    title: "ベビー服・肌着の選びかた",
    badges: [{ label: "日常ケア", bg: "#e0f2f1", color: "#00695c" }],
  });
}
