import JsonLd from "@/components/seo/JsonLd";
import { getSiteOrigin } from "@/lib/seo/site-url";
import type { ServiceCardDTO } from "@/lib/site-data";

export default function ServicesJsonLd({ items }: { items: ServiceCardDTO[] }) {
  const base = getSiteOrigin();
  return (
    <>
      {items.map((item) => (
        <JsonLd
          key={item.id}
          data={{
            "@context": "https://schema.org",
            "@type": "Service",
            name: item.title,
            description: item.description,
            provider: {
              "@type": "LocalBusiness",
              name: "HigiRapid",
              url: base,
            },
            areaServed: ["Barcelona", "El Masnou", "Maresme"],
            ...(item.priceFrom != null
              ? {
                  offers: {
                    "@type": "Offer",
                    priceCurrency: "EUR",
                    price: item.priceFrom,
                    description: "From price",
                  },
                }
              : {}),
          }}
        />
      ))}
    </>
  );
}
