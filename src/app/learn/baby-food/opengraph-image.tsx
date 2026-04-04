import { generateOgImage, ogSize, ogContentType } from "@/components/seo/og-image-template";

export const alt = "離乳食のはじめかた | こもれび";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return generateOgImage({
    title: "離乳食のはじめかた",
    badges: [{ label: "食事", bg: "#fff3e0", color: "#e65100" }],
  });
}
