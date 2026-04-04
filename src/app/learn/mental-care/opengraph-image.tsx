import { generateOgImage, ogSize, ogContentType } from "@/components/seo/og-image-template";

export const alt = "産後のメンタルケア | こもれび";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return generateOgImage({
    title: "産後のメンタルケア",
    badges: [{ label: "メンタル", bg: "#f3e5f5", color: "#6a1b9a" }],
  });
}
