import type { Locale } from "@/i18n/config";
import {
  CA_FACADE_BODY,
  CA_OZONE_BODY,
  CA_UPHOLSTERY_BODY,
  EN_FACADE_BODY,
  EN_OZONE_BODY,
  EN_UPHOLSTERY_BODY,
  ES_FACADE_BODY,
  ES_OZONE_BODY,
  ES_UPHOLSTERY_FREQUENCY_BODY,
} from "@/lib/blog-long-form-bodies";

export type BlogStarterArticle = {
  slug: string;
  categorySlug: "news" | "hygiene-guides" | "service-tips";
  primaryImageUrl: string;
  primaryImageAlt: string;
  articleImageUrls: string[];
  publishedAt: string;
  title: string;
  excerpt: string;
  body: string;
  seoTitle: string;
  seoDescription: string;
};

const starterByLocale: Record<Locale, BlogStarterArticle[]> = {
  en: [
    {
      slug: "how-ozone-therapy-removes-persistent-odors",
      categorySlug: "hygiene-guides",
      primaryImageUrl: "/images/sofa-after-cleaning.png",
      primaryImageAlt: "Clean sofa in a bright living room",
      articleImageUrls: ["/images/sofa-after-cleaning.png", "/images/car-seats-after-cleaning.png"],
      publishedAt: "2026-03-20T09:00:00.000Z",
      title: "How ozone therapy removes persistent odors from upholstery and cars",
      excerpt:
        "Learn why ozone reaches deep fibres to neutralize smoke, pet and humidity odors without harsh residues.",
      body: EN_OZONE_BODY,
      seoTitle: "Ozone Therapy for Car and Sofa Odors | HigiRapid",
      seoDescription:
        "Discover how ozone therapy eliminates persistent odors in upholstery and car interiors safely and effectively.",
    },
    {
      slug: "how-often-should-you-clean-upholstery-at-home",
      categorySlug: "service-tips",
      primaryImageUrl: "/images/armchair-after-cleaning.png",
      primaryImageAlt: "Freshly cleaned armchair",
      articleImageUrls: ["/images/armchair-after-cleaning.png", "/images/rug-after-cleaning.png"],
      publishedAt: "2026-03-15T09:00:00.000Z",
      title: "How often should you clean and disinfect upholstery at home?",
      excerpt: "A practical schedule for families with pets, children or allergy concerns.",
      body: EN_UPHOLSTERY_BODY,
      seoTitle: "Upholstery Cleaning Frequency Guide | HigiRapid",
      seoDescription:
        "See the ideal sofa and upholstery cleaning schedule for healthier homes with pets and children.",
    },
    {
      slug: "facade-cleaning-benefits-for-homes-and-businesses",
      categorySlug: "news",
      primaryImageUrl: "/images/commercial-space-after-cleaning.png",
      primaryImageAlt: "Clean commercial facade and entrance",
      articleImageUrls: ["/images/commercial-space-after-cleaning.png", "/images/office-upholstery-cleaning.png"],
      publishedAt: "2026-03-10T09:00:00.000Z",
      title: "Facade cleaning benefits for homes and businesses in Barcelona",
      excerpt:
        "Pressure-washer facade cleaning improves image, hygiene and long-term surface protection.",
      body: EN_FACADE_BODY,
      seoTitle: "Facade Cleaning Barcelona | HigiRapid",
      seoDescription:
        "Why professional facade cleaning improves building appearance and helps prevent moisture-related damage.",
    },
  ],
  es: [
    {
      slug: "como-la-terapia-de-ozono-elimina-olores-persistentes",
      categorySlug: "hygiene-guides",
      primaryImageUrl: "/images/sofa-after-cleaning.png",
      primaryImageAlt: "Sofa limpio en una sala luminosa",
      articleImageUrls: ["/images/sofa-after-cleaning.png", "/images/car-seats-after-cleaning.png"],
      publishedAt: "2026-03-20T09:00:00.000Z",
      title: "Cómo la terapia de ozono elimina olores persistentes en tapicerías y coches",
      excerpt:
        "Descubre por qué el ozono llega a las fibras profundas y neutraliza olores sin residuos agresivos.",
      body: ES_OZONE_BODY,
      seoTitle: "Terapia de Ozono para Olores de Coche y Sofá | HigiRapid",
      seoDescription:
        "Cómo la terapia de ozono elimina olores persistentes en tapicerías e interiores de coche de forma segura.",
    },
    {
      slug: "cada-cuanto-limpiar-y-desinfectar-tapicerias",
      categorySlug: "service-tips",
      primaryImageUrl: "/images/armchair-after-cleaning.png",
      primaryImageAlt: "Butaca recién limpiada",
      articleImageUrls: ["/images/armchair-after-cleaning.png", "/images/rug-after-cleaning.png"],
      publishedAt: "2026-03-15T09:00:00.000Z",
      title: "¿Cada cuánto conviene limpiar y desinfectar tapicerías en casa?",
      excerpt: "Una frecuencia práctica para familias con mascotas, niños o alergias.",
      body: ES_UPHOLSTERY_FREQUENCY_BODY,
      seoTitle: "Frecuencia de Limpieza de Tapicerías | HigiRapid",
      seoDescription:
        "Guía de frecuencia recomendada para limpiar sofás y tapicerías en hogares con niños y mascotas.",
    },
    {
      slug: "beneficios-de-limpiar-fachadas-en-barcelona",
      categorySlug: "news",
      primaryImageUrl: "/images/commercial-space-after-cleaning.png",
      primaryImageAlt: "Fachada de negocio limpia",
      articleImageUrls: ["/images/commercial-space-after-cleaning.png", "/images/office-upholstery-cleaning.png"],
      publishedAt: "2026-03-10T09:00:00.000Z",
      title: "Beneficios de la limpieza de fachadas para hogares y negocios en Barcelona",
      excerpt: "La limpieza profesional de fachadas mejora la imagen y protege los materiales.",
      body: ES_FACADE_BODY,
      seoTitle: "Limpieza de Fachadas en Barcelona | HigiRapid",
      seoDescription:
        "Por qué la limpieza profesional de fachadas mejora la estética y ayuda a prevenir daños por humedad.",
    },
  ],
  ca: [
    {
      slug: "com-la-terapia-dozo-elimina-olors-persistents",
      categorySlug: "hygiene-guides",
      primaryImageUrl: "/images/sofa-after-cleaning.png",
      primaryImageAlt: "Sofa net en una sala lluminosa",
      articleImageUrls: ["/images/sofa-after-cleaning.png", "/images/car-seats-after-cleaning.png"],
      publishedAt: "2026-03-20T09:00:00.000Z",
      title: "Com la teràpia d'ozó elimina olors persistents en tapissos i cotxes",
      excerpt: "Descobreix com l'ozó neutralitza olors de fum, mascotes i humitat sense residus agressius.",
      body: CA_OZONE_BODY,
      seoTitle: "Teràpia d'Ozó per Olor de Cotxe i Sofà | HigiRapid",
      seoDescription: "Com la teràpia d'ozó elimina olors persistents en tapissos i interiors de cotxe.",
    },
    {
      slug: "cada-quant-cal-netejar-i-desinfectar-tapissos",
      categorySlug: "service-tips",
      primaryImageUrl: "/images/armchair-after-cleaning.png",
      primaryImageAlt: "Butaca acabada de netejar",
      articleImageUrls: ["/images/armchair-after-cleaning.png", "/images/rug-after-cleaning.png"],
      publishedAt: "2026-03-15T09:00:00.000Z",
      title: "Cada quant cal netejar i desinfectar els tapissos de casa?",
      excerpt: "Una guia pràctica per llars amb infants, mascotes o sensibilitat al·lèrgica.",
      body: CA_UPHOLSTERY_BODY,
      seoTitle: "Freqüència de Neteja de Tapissos | HigiRapid",
      seoDescription:
        "Guia de freqüència recomanada per netejar sofàs i tapissos en llars amb mascotes i infants.",
    },
    {
      slug: "beneficis-de-la-neteja-de-facanes-a-barcelona",
      categorySlug: "news",
      primaryImageUrl: "/images/commercial-space-after-cleaning.png",
      primaryImageAlt: "Façana comercial neta",
      articleImageUrls: ["/images/commercial-space-after-cleaning.png", "/images/office-upholstery-cleaning.png"],
      publishedAt: "2026-03-10T09:00:00.000Z",
      title: "Beneficis de la neteja de façanes per a llars i negocis a Barcelona",
      excerpt: "La neteja professional de façanes millora la imatge i protegeix els materials.",
      body: CA_FACADE_BODY,
      seoTitle: "Neteja de Façanes a Barcelona | HigiRapid",
      seoDescription:
        "Per què la neteja professional de façanes millora l'estètica i ajuda a prevenir danys per humitat.",
    },
  ],
};

export function getBlogStarterArticles(locale: Locale): BlogStarterArticle[] {
  return starterByLocale[locale] ?? starterByLocale.en;
}
