import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0b1220",
          borderRadius: 16,
        }}
      >
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <line x1="13" y1="9" x2="13" y2="31" stroke="white" strokeWidth="5" strokeLinecap="round" />
          <line x1="13" y1="20" x2="27" y2="9" stroke="white" strokeWidth="5" strokeLinecap="round" />
          <line x1="13" y1="20" x2="27" y2="31" stroke="#f97316" strokeWidth="5" strokeLinecap="round" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
