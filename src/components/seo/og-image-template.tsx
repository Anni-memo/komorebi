import { ImageResponse } from "next/og";

type OgImageProps = {
  title: string;
  subtitle?: string;
  badges?: { label: string; bg: string; color: string }[];
};

export const ogSize = {
  width: 1200,
  height: 630,
};

export const ogContentType = "image/png";

export function generateOgImage({ title, subtitle, badges }: OgImageProps) {
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
          {badges && badges.length > 0 && (
            <div
              style={{
                display: "flex",
                gap: 12,
                marginBottom: 24,
              }}
            >
              {badges.map((badge) => (
                <div
                  key={badge.label}
                  style={{
                    backgroundColor: badge.bg,
                    color: badge.color,
                    fontSize: 16,
                    padding: "6px 16px",
                    borderRadius: 6,
                    fontWeight: 500,
                  }}
                >
                  {badge.label}
                </div>
              ))}
            </div>
          )}
          <div
            style={{
              fontSize: title.length > 20 ? 40 : 48,
              fontWeight: 700,
              color: "#2d2d2d",
              lineHeight: 1.3,
              marginBottom: subtitle ? 20 : 0,
            }}
          >
            {title}
          </div>
          {subtitle && (
            <div
              style={{
                fontSize: 28,
                color: "#6b6b6b",
                lineHeight: 1.5,
              }}
            >
              {subtitle}
            </div>
          )}
        </div>
        <div
          style={{
            fontSize: 16,
            color: "#a0a0a0",
          }}
        >
          komorebi.constella-hd.co.jp
        </div>
      </div>
    ),
    {
      ...ogSize,
    }
  );
}
