import { generateOgImage, ogSize, ogContentType } from "@/components/seo/og-image-template";

export const alt = "妊娠中・産後の食事ガイド | こもれび";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return generateOgImage({
    title: "妊娠中・産後の食事ガイド",
    badges: [{ label: "食事", bg: "#fff3e0", color: "#e65100" }],
  });
}
