import { ImageResponse } from "next/og";

export const alt = "こもれび — 子育ての案内所";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f8f6f0",
          padding: "60px",
        }}
      >
        <div
          style={{
            fontSize: 72,
            marginBottom: 24,
          }}
        >
          🌿
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: "#2d2d2d",
            marginBottom: 16,
            letterSpacing: "0.05em",
          }}
        >
          こもれび
        </div>
        <div
          style={{
            fontSize: 28,
            fontWeight: 500,
            color: "#4a8c6f",
            marginBottom: 24,
          }}
        >
          子育ての案内所
        </div>
        <div
          style={{
            fontSize: 20,
            color: "#6b6b6b",
            textAlign: "center",
            lineHeight: 1.6,
            maxWidth: 700,
          }}
        >
          子育ての負担と不安を減らし、子に向ける時間を増やす
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 40,
            fontSize: 16,
            color: "#a0a0a0",
          }}
        >
          komorebi.constella-hd.co.jp
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
