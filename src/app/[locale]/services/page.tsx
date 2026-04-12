import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getPublishedServicesList, getSiteSettings } from "@/lib/site-data";
import ServicesPageContent from "@/components/services/ServicesPageContent";
import type { Locale } from "@/i18n/config";
import { buildPageMetadata } from "@/lib/seo/build-page-metadata";
import { routing } from "@/i18n/routing";
import ServicesJsonLd from "@/components/seo/ServicesJsonLd";
import Breadcrumb from "@/components/seo/Breadcrumb";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!routing.locales.includes(locale as Locale)) return {};
  const t = await getTranslations({ locale, namespace: "servicesPage" });
  return buildPageMetadata({
    locale: locale as Locale,
    pathAfterLocale: "/services",
    title: t("metaTitle"),
    description: t("metaDescription"),
    ogImagePath: "/images/hero.png",
  });
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  const [items, settings, tCommon, tNav] = await Promise.all([
    getPublishedServicesList(locale),
    getSiteSettings(),
    getTranslations({ locale, namespace: "common" }),
    getTranslations({ locale, namespace: "nav" }),
  ]);

  return (
    <>
      <ServicesJsonLd items={items} />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8">
        <Breadcrumb
          locale={locale}
          items={[
            { label: tCommon("breadcrumbHome"), path: "/" },
            { label: tNav("services"), path: "/services" },
          ]}
        />
      </div>
      <ServicesPageContent items={items} whatsappE164={settings.whatsappE164} />
    </>
  );
}
