import type { Metadata } from "next";
import "./globals.css";
import { DEFAULT_SITE_ORIGIN } from "@/lib/seo/site-url";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL?.trim() || DEFAULT_SITE_ORIGIN),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="antialiased">{children}</body>
    </html>
  );
}
