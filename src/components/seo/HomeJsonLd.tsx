import JsonLd from "@/components/seo/JsonLd";
import { getFaqPairsForLocale } from "@/lib/seo/faq-for-schema";
import { getSiteOrigin } from "@/lib/seo/site-url";
import { getSiteSettings } from "@/lib/site-data";

export default async function HomeJsonLd({ locale }: { locale: string }) {
  const [settings, faqPairs] = await Promise.all([getSiteSettings(), getFaqPairsForLocale(locale)]);
  const base = getSiteOrigin();
  const digits = settings.whatsappE164.replace(/\D/g, "");
  const telephone = digits ? (digits.startsWith("+") ? digits : `+${digits}`) : undefined;

  const cleaningService = {
    "@context": "https://schema.org",
    "@type": "CleaningService",
    name: "HigiRapid",
    url: base,
    ...(telephone ? { telephone } : {}),
    description:
      locale === "es"
        ? "Servicio móvil de limpieza profesional a domicilio en Barcelona y el Maresme. Tapicerías, sofás, interiores de coche, fachadas y tratamiento de ozono."
        : locale === "ca"
          ? "Servei mòbil de neteja professional a domicili a Barcelona i el Maresme."
          : "Professional mobile cleaning for homes and vehicles in Barcelona and the Maresme.",
    priceRange: "€€",
    openingHours: "Mo-Sa 08:00-19:00",
    areaServed: ["El Masnou", "Barcelona", "Maresme", "Badalona", "Alella", "Tiana", "Montgat"],
    address: {
      "@type": "PostalAddress",
      addressLocality: "El Masnou",
      addressRegion: "Barcelona",
      addressCountry: "ES",
    },
    serviceType: [
      "Upholstery cleaning",
      "Sofa cleaning",
      "Car interior cleaning",
      "Facade cleaning",
      "Mattress cleaning",
      "Ozone treatment",
    ],
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqPairs.map((pair) => ({
      "@type": "Question" as const,
      name: pair.question,
      acceptedAnswer: {
        "@type": "Answer" as const,
        text: pair.answer,
      },
    })),
  };

  return (
    <>
      <JsonLd data={cleaningService} />
      <JsonLd data={faqPage} />
    </>
  );
}
