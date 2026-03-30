import { ImageResponse } from "next/og";

export const alt = "RSVワクチン（アブリスボ）判断ガイド | こもれび";
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
          backgroundColor: "#f8f6f0",
          padding: "60px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 40,
          }}
        >
          <div style={{ fontSize: 32 }}>🌿</div>
          <div
            style={{
              fontSize: 22,
              fontWeight: 500,
              color: "#4a8c6f",
            }}
          >
            こもれび — 子育ての案内所
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 12,
              marginBottom: 24,
            }}
          >
            <div
              style={{
                backgroundColor: "#e8f5e9",
                color: "#2e7d32",
                fontSize: 16,
                padding: "6px 16px",
                borderRadius: 6,
                fontWeight: 500,
              }}
            >
              妊婦向け
            </div>
            <div
              style={{
                backgroundColor: "#fff3e0",
                color: "#e65100",
                fontSize: 16,
                padding: "6px 16px",
                borderRadius: 6,
                fontWeight: 500,
              }}
            >
              予防接種
            </div>
          </div>
          <div
            style={{
              fontSize: 48,
              fontWeight: 700,
              color: "#2d2d2d",
              lineHeight: 1.3,
              marginBottom: 20,
            }}
          >
            RSVワクチン（アブリスボ）
          </div>
          <div
            style={{
              fontSize: 28,
              color: "#6b6b6b",
              lineHeight: 1.5,
            }}
          >
            リスク・リターン判断ガイド
          </div>
        </div>
        <div
          style={{
            fontSize: 16,
            color: "#a0a0a0",
          }}
        >
          komorebi-red.vercel.app
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
