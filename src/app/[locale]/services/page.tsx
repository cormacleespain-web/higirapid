import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getPublishedServicesList, getSiteSettings } from "@/lib/site-data";
import ServicesPageContent from "@/components/services/ServicesPageContent";
import type { Locale } from "@/i18n/config";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "servicesPage" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  const [items, settings] = await Promise.all([
    getPublishedServicesList(locale),
    getSiteSettings(),
  ]);

  return <ServicesPageContent items={items} whatsappE164={settings.whatsappE164} />;
}
