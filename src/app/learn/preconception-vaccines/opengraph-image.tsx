import { generateOgImage, ogSize, ogContentType } from "@/components/seo/og-image-template";

export const alt = "妊活前に受けておきたい予防接種 | こもれび";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return generateOgImage({
    title: "妊活前に受けておきたい予防接種",
    badges: [{ label: "予防接種", bg: "#e3f2fd", color: "#1565c0" }],
  });
}
