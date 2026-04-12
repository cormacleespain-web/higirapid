import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/config";
import { routing } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo/build-page-metadata";
import Breadcrumb from "@/components/seo/Breadcrumb";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!routing.locales.includes(locale as Locale)) return {};
  const t = await getTranslations({ locale, namespace: "facadeCleaning" });
  return buildPageMetadata({
    locale: locale as Locale,
    pathAfterLocale: "/facade-cleaning",
    title: t("metaTitle"),
    description: t("metaDescription"),
    ogImagePath: "/images/commercial-space-after-cleaning.png",
  });
}

export default async function FacadeCleaningPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("facadeCleaning");
  const tCommon = await getTranslations({ locale, namespace: "common" });
  const tNav = await getTranslations({ locale, namespace: "nav" });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      <Breadcrumb
        locale={locale}
        items={[
          { label: tCommon("breadcrumbHome"), path: "/" },
          { label: tNav("services"), path: "/services" },
          { label: t("title"), path: "/facade-cleaning" },
        ]}
      />
      <h1 className="text-3xl md:text-4xl font-bold text-content-primary">{t("title")}</h1>
      <p className="mt-3 text-content-secondary">{t("intro")}</p>
      <h2 className="mt-8 text-xl font-semibold text-content-primary">{t("whatWeCleanTitle")}</h2>
      <ul className="mt-3 space-y-2 text-content-secondary">
        <li>• {t("whatWeClean1")}</li>
        <li>• {t("whatWeClean2")}</li>
        <li>• {t("whatWeClean3")}</li>
      </ul>
      <h2 className="mt-8 text-xl font-semibold text-content-primary">{t("benefitsTitle")}</h2>
      <ul className="mt-3 space-y-2 text-content-secondary">
        <li>• {t("benefit1")}</li>
        <li>• {t("benefit2")}</li>
        <li>• {t("benefit3")}</li>
      </ul>
    </div>
  );
}
