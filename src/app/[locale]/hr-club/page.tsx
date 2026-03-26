import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import HRClubLeadForm from "@/components/forms/HRClubLeadForm";

type Props = { params: Promise<{ locale: string }> };

export default async function HRClubPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("hrClubPage");

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      <section className="grid gap-8 lg:grid-cols-2">
        <div>
          <Image
            src="/images/hr-club-logo.svg"
            alt="HR Club logo"
            width={160}
            height={64}
            className="h-auto w-48 md:w-56"
            priority
          />
          <h1 className="mt-4 text-3xl md:text-4xl font-bold text-content-primary">Join the Club!</h1>
          <p className="mt-3 text-content-secondary">{t("subtitle")}</p>
          <ul className="mt-4 space-y-2 text-content-secondary">
            <li>• {t("item1")}</li>
            <li>• {t("item2")}</li>
            <li>• {t("item3")}</li>
            <li>• {t("item4")}</li>
          </ul>
        </div>
        <HRClubLeadForm />
      </section>
    </div>
  );
}
