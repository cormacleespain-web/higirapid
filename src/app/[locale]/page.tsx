import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Process from "@/components/sections/Process";
import Gallery from "@/components/sections/Gallery";
import Testimonials from "@/components/sections/Testimonials";
import ServiceAreas from "@/components/sections/ServiceAreas";
import FAQ from "@/components/sections/FAQ";
import HRClubTeaser from "@/components/sections/HRClubTeaser";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import { getSiteSettings, getPublishedServicesList, getGalleryItems } from "@/lib/site-data";
import { buildPageMetadata } from "@/lib/seo/build-page-metadata";
import type { Locale } from "@/i18n/config";
import { routing } from "@/i18n/routing";
import HomeJsonLd from "@/components/seo/HomeJsonLd";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!routing.locales.includes(locale as Locale)) return {};
  const t = await getTranslations({ locale, namespace: "homePage" });
  return buildPageMetadata({
    locale: locale as Locale,
    pathAfterLocale: "",
    title: t("metaTitle"),
    description: t("metaDescription"),
    ogImagePath: "/images/hero.png",
  });
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const settings = await getSiteSettings();
  const servicesList = await getPublishedServicesList(locale);
  const dbGallery = await getGalleryItems(locale);

  return (
    <>
      <HomeJsonLd locale={locale} />
      <Hero whatsappE164={settings.whatsappE164} heroImageSrc={settings.heroImageUrl} />
      <Services items={servicesList} />
      <Process />
      <HRClubTeaser />
      <Gallery initialItems={dbGallery} />
      <Testimonials />
      <ServiceAreas />
      <WhyChooseUs />
      <FAQ />
    </>
  );
}
