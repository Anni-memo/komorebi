import { generateOgImage, ogSize, ogContentType } from "@/components/seo/og-image-template";

export const alt = "出産後に必要な手続き一覧 | こもれび";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return generateOgImage({
    title: "出産後に必要な手続き一覧",
    badges: [{ label: "手続き", bg: "#efebe9", color: "#4e342e" }],
  });
}
