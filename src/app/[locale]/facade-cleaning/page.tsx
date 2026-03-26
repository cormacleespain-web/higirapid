import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";

type Props = { params: Promise<{ locale: string }> };

export default async function FacadeCleaningPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("facadeCleaning");

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16">
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
