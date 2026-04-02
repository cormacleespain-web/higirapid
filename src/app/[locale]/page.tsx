import { setRequestLocale } from "next-intl/server";
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

type Props = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const settings = await getSiteSettings();
  const servicesList = await getPublishedServicesList(locale);
  const dbGallery = await getGalleryItems(locale);

  return (
    <>
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
