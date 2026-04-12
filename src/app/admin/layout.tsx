import "../globals.css";
import AdminSessionProvider from "./AdminSessionProvider";
import { AdminToaster } from "./AdminToaster";
import { fontSans, fontGaretExtrabold, fontNunitoHeading } from "@/lib/fonts";

export const dynamic = "force-dynamic";

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminSessionProvider>
      <div
        className={`min-h-screen bg-surface-subtle font-sans text-content-primary antialiased ${fontSans.variable} ${fontGaretExtrabold.variable} ${fontNunitoHeading.variable}`}
      >
        <AdminToaster />
        {children}
      </div>
    </AdminSessionProvider>
  );
}
