import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HigiRapid — Limpieza profesional | El Masnou, Barcelona",
  description:
    "Limpieza de tapicerías, alfombras, interiores de coche e higiene en casa. El Masnou y Barcelona. Presupuesto sin compromiso.",
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
