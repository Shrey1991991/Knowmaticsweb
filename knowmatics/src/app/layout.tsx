import type { Metadata } from "next";
// Self-hosted variable fonts (no external network call at build or run time —
// see README if you'd rather switch to next/font/google).
import "@fontsource-variable/inter/wght.css";
import "@fontsource-variable/space-grotesk/wght.css";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.knowmatics.in";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Knowmatics by Shrey — Metal Cutting Industry News & Insight",
    template: "%s | Knowmatics by Shrey",
  },
  description:
    "Press releases and thought leadership for India's metal cutting industry — CNC machining, cutting tools, automation, additive manufacturing, and the people building the shop floor of the future.",
  openGraph: {
    type: "website",
    siteName: "Knowmatics by Shrey",
    title: "Knowmatics by Shrey — Metal Cutting Industry News & Insight",
    description:
      "Press releases and thought leadership for India's metal cutting industry.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Knowmatics by Shrey",
    description:
      "Press releases and thought leadership for India's metal cutting industry.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[var(--color-paper)]">{children}</body>
    </html>
  );
}
