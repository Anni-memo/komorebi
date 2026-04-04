import { generateOgImage, ogSize, ogContentType } from "@/components/seo/og-image-template";

export const alt = "赤ちゃんの行事カレンダー | こもれび";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return generateOgImage({
    title: "赤ちゃんの行事カレンダー",
    badges: [{ label: "行事", bg: "#fff3e0", color: "#e65100" }],
  });
}
