import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { routing } from "@/i18n/routing";
import { fontSans, fontGaretExtrabold, fontNunitoHeading } from "@/lib/fonts";
import type { Locale } from "@/i18n/config";
import SetLocale from "@/components/layout/SetLocale";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingCta from "@/components/layout/FloatingCta";
import MotionConfigProvider from "@/components/providers/MotionConfigProvider";
import { ContentOverridesProvider } from "@/components/providers/ContentOverridesProvider";
import { getSiteSettings, getContentOverrideMap } from "@/lib/site-data";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

/** Public marketing routes read CMS data from Neon; force dynamic rendering so visitors always get fresh HTML/RSC, not a stale Full Route Cache after admin saves. */
export const dynamic = "force-dynamic";

const titles: Record<Locale, string> = {
  es: "HigiRapid — Limpieza profesional | El Masnou, Barcelona",
  ca: "HigiRapid — Neteja professional | El Masnou, Barcelona",
  en: "HigiRapid — Professional cleaning | El Masnou, Barcelona",
};

const descriptions: Record<Locale, string> = {
  es: "Limpieza de tapicerías, alfombras, interiores de coche e higiene en casa. El Masnou y Barcelona. Presupuesto sin compromiso.",
  ca: "Neteja de tapissos, catifes, interiors de cotxe i higiene a casa. El Masnou i Barcelona. Pressupost sense compromís.",
  en: "Upholstery, carpet, car interior and in-house hygiene cleaning. El Masnou and Barcelona. Free quote.",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!routing.locales.includes(locale as Locale)) return {};
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://higirapid.es";
  const alternates = {
    languages: Object.fromEntries(
      routing.locales.map((loc) => [loc, `${baseUrl}/${loc}`])
    ) as Record<Locale, string>,
  };
  return {
    title: titles[locale as Locale],
    description: descriptions[locale as Locale],
    alternates,
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }
  setRequestLocale(locale);
  const messages = await getMessages();
  const t = await getTranslations("common");
  const settings = await getSiteSettings();
  const contentOverrides = await getContentOverrideMap(locale);

  return (
    <NextIntlClientProvider messages={messages}>
      <ContentOverridesProvider value={contentOverrides}>
        <MotionConfigProvider>
          <div
            className={`min-h-screen flex flex-col font-sans ${fontSans.variable} ${fontGaretExtrabold.variable} ${fontNunitoHeading.variable}`}
          >
            <SetLocale />
            <a
              href="#main"
              className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-content-inverse focus:rounded-md"
            >
              {t("skipToContent")}
            </a>
            <Header whatsappE164={settings.whatsappE164} />
            <main id="main" className="flex-1">
              {children}
            </main>
            <Footer whatsappE164={settings.whatsappE164} />
            <FloatingCta whatsappE164={settings.whatsappE164} />
          </div>
        </MotionConfigProvider>
      </ContentOverridesProvider>
      <Analytics />
      <SpeedInsights />
    </NextIntlClientProvider>
  );
}
