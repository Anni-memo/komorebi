import { generateOgImage, ogSize, ogContentType } from "@/components/seo/og-image-template";

export const alt = "保活の基本と始めるタイミング | こもれび";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return generateOgImage({
    title: "保活の基本と始めるタイミング",
    badges: [{ label: "保活", bg: "#efebe9", color: "#4e342e" }],
  });
}
