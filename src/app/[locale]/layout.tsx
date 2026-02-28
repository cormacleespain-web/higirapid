import type { Metadata, Viewport } from "next";
import { Inter, Montserrat } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { WhatsAppFab } from "@/components/shared/whatsapp-fab";
import "../globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#2B6098",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEs = locale === "es";

  return {
    title: {
      default: isEs
        ? "Higirap - Higienización con Rapidez"
        : "Higirap - Professional Cleaning Services",
      template: isEs ? "%s | Higirap" : "%s | Higirap",
    },
    description: isEs
      ? "Servicio profesional de limpieza de tapicerías y detailing de coches a domicilio. Eliminamos manchas, olores y bacterias."
      : "Professional upholstery cleaning and car detailing at your doorstep. We eliminate stains, odors, and bacteria.",
    icons: { icon: "/images/logo.png" },
    openGraph: {
      type: "website",
      locale: isEs ? "es_ES" : "en_US",
      siteName: "Higirap",
      images: [{ url: "/images/logo.png", width: 1200, height: 630 }],
    },
    robots: { index: true, follow: true },
    other: {
      "google-site-verification": "PLACEHOLDER",
    },
  };
}

function LocalBusinessJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Higirap",
    description:
      "Professional upholstery cleaning and car detailing service.",
    url: "https://higirap.com",
    telephone: "+34600000000",
    email: "info@higirap.com",
    image: "https://higirap.com/images/logo.png",
    priceRange: "€€",
    openingHours: "Mo-Sa 09:00-20:00",
    areaServed: {
      "@type": "Country",
      name: "Spain",
    },
    sameAs: [],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <LocalBusinessJsonLd />
      </head>
      <body
        className={`${inter.variable} ${montserrat.variable} font-sans antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <WhatsAppFab />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
