import { generateOgImage, ogSize, ogContentType } from "@/components/seo/og-image-template";

export const alt = "妊娠カレンダー | こもれび";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return generateOgImage({
    title: "妊娠カレンダー",
    badges: [{ label: "妊娠・出産", bg: "#fce4ec", color: "#c62828" }],
  });
}
