import type { Locale } from "@/i18n/config";

export type FallbackBlogPost = {
  slug: string;
  categorySlug: "news" | "hygiene-guides" | "service-tips";
  categoryLabel: string;
  primaryImageUrl: string;
  primaryImageAlt: string;
  primaryImageObjectPosition?: "center" | "bottom";
  articleImageUrls: string[];
  publishedAt: string;
  title: string;
  excerpt: string;
  body: string;
  seoTitle: string;
  seoDescription: string;
};

const posts: Record<Locale, FallbackBlogPost[]> = {
  en: [
    {
      slug: "how-ozone-therapy-removes-persistent-odors",
      categorySlug: "hygiene-guides",
      categoryLabel: "Hygiene guides",
      primaryImageUrl: "/images/sofa-after-cleaning.png",
      primaryImageAlt: "Clean sofa in a bright living room",
      articleImageUrls: ["/images/sofa-after-cleaning.png", "/images/car-seats-after-cleaning.png"],
      publishedAt: "2026-03-20T09:00:00.000Z",
      title: "How ozone therapy removes persistent odors from upholstery and cars",
      excerpt: "Learn why ozone reaches deep fibres to neutralize smoke, pet and humidity odors without harsh residues.",
      body: "Ozone therapy works at a molecular level. Instead of masking smells, it oxidizes the compounds that cause them.\n\nAt HigiRapid, we use ozone when regular deep cleaning is not enough, especially for smoke, pet and humidity odors in upholstery and car interiors.\n\nThe treatment is applied in controlled conditions and followed by ventilation. This keeps the process safe and leaves spaces ready to use with fresher air quality.",
      seoTitle: "Ozone Therapy for Car and Sofa Odors | HigiRapid",
      seoDescription: "Discover how ozone therapy eliminates persistent odors in upholstery and car interiors safely and effectively."
    },
    {
      slug: "how-often-should-you-clean-upholstery-at-home",
      categorySlug: "service-tips",
      categoryLabel: "Service tips",
      primaryImageUrl: "/images/armchair-after-cleaning.png",
      primaryImageAlt: "Freshly cleaned armchair",
      articleImageUrls: ["/images/armchair-after-cleaning.png", "/images/rug-after-cleaning.png"],
      publishedAt: "2026-03-15T09:00:00.000Z",
      title: "How often should you clean and disinfect upholstery at home?",
      excerpt: "A practical schedule for families with pets, children or allergy concerns.",
      body: "For most homes, upholstery deep cleaning every 6 months keeps fabrics in good condition and reduces hidden dust accumulation.\n\nIf you have pets, children or allergy sensitivity, a 3-4 month cycle helps control mites, bacteria and odors before they become harder to remove.\n\nRegular maintenance extends furniture lifespan and improves everyday indoor comfort. A subscription plan can make this routine simpler and more cost predictable.",
      seoTitle: "Upholstery Cleaning Frequency Guide | HigiRapid",
      seoDescription: "See the ideal sofa and upholstery cleaning schedule for healthier homes with pets and children."
    },
    {
      slug: "facade-cleaning-benefits-for-homes-and-businesses",
      categorySlug: "news",
      categoryLabel: "News",
      primaryImageUrl: "/images/commercial-space-after-cleaning.png",
      primaryImageAlt: "Clean commercial facade and entrance",
      articleImageUrls: ["/images/commercial-space-after-cleaning.png", "/images/office-upholstery-cleaning.png"],
      publishedAt: "2026-03-10T09:00:00.000Z",
      title: "Facade cleaning benefits for homes and businesses in Barcelona",
      excerpt: "Pressure-washer facade cleaning improves image, hygiene and long-term surface protection.",
      body: "Facade surfaces collect pollution, algae, mould and moisture marks over time. Professional cleaning restores appearance and helps prevent premature material deterioration.\n\nAt HigiRapid, each facade is assessed first to apply the correct pressure and safe products for the specific surface.\n\nFor businesses, a clean facade supports brand perception. For homes, it preserves curb appeal and reduces long-term maintenance costs.",
      seoTitle: "Facade Cleaning Barcelona | HigiRapid",
      seoDescription: "Why professional facade cleaning improves building appearance and helps prevent moisture-related damage."
    }
  ],
  es: [
    {
      slug: "como-la-terapia-de-ozono-elimina-olores-persistentes",
      categorySlug: "hygiene-guides",
      categoryLabel: "Guias de higiene",
      primaryImageUrl: "/images/sofa-after-cleaning.png",
      primaryImageAlt: "Sofa limpio en una sala luminosa",
      articleImageUrls: ["/images/sofa-after-cleaning.png", "/images/car-seats-after-cleaning.png"],
      publishedAt: "2026-03-20T09:00:00.000Z",
      title: "Cómo la terapia de ozono elimina olores persistentes en tapicerías y coches",
      excerpt: "Descubre por qué el ozono llega a las fibras profundas y neutraliza olores sin residuos agresivos.",
      body: "La terapia de ozono actúa a nivel molecular. En lugar de tapar olores, oxida los compuestos que los provocan.\n\nEn HigiRapid la usamos cuando una limpieza profunda no es suficiente, especialmente en humo, mascotas y humedad en tapicerías e interiores de coche.\n\nEl tratamiento se realiza en condiciones controladas y con ventilación posterior. Así se mantiene un proceso seguro y un ambiente más fresco.",
      seoTitle: "Terapia de Ozono para Olores de Coche y Sofá | HigiRapid",
      seoDescription: "Cómo la terapia de ozono elimina olores persistentes en tapicerías e interiores de coche de forma segura."
    },
    {
      slug: "cada-cuanto-limpiar-y-desinfectar-tapicerias",
      categorySlug: "service-tips",
      categoryLabel: "Consejos de servicio",
      primaryImageUrl: "/images/armchair-after-cleaning.png",
      primaryImageAlt: "Butaca recién limpiada",
      articleImageUrls: ["/images/armchair-after-cleaning.png", "/images/rug-after-cleaning.png"],
      publishedAt: "2026-03-15T09:00:00.000Z",
      title: "¿Cada cuánto conviene limpiar y desinfectar tapicerías en casa?",
      excerpt: "Una frecuencia práctica para familias con mascotas, niños o alergias.",
      body: "En la mayoría de hogares, una limpieza profunda cada 6 meses mantiene los tejidos en buen estado y reduce acumulación de polvo invisible.\n\nSi hay mascotas, niños o sensibilidad alérgica, un ciclo cada 3-4 meses ayuda a controlar ácaros, bacterias y olores antes de que se fijen.\n\nUn mantenimiento regular prolonga la vida útil del mobiliario y mejora el confort diario en casa.",
      seoTitle: "Frecuencia de Limpieza de Tapicerías | HigiRapid",
      seoDescription: "Guía de frecuencia recomendada para limpiar sofás y tapicerías en hogares con niños y mascotas."
    },
    {
      slug: "beneficios-de-limpiar-fachadas-en-barcelona",
      categorySlug: "news",
      categoryLabel: "Noticias",
      primaryImageUrl: "/images/commercial-space-after-cleaning.png",
      primaryImageAlt: "Fachada de negocio limpia",
      articleImageUrls: ["/images/commercial-space-after-cleaning.png", "/images/office-upholstery-cleaning.png"],
      publishedAt: "2026-03-10T09:00:00.000Z",
      title: "Beneficios de la limpieza de fachadas para hogares y negocios en Barcelona",
      excerpt: "La limpieza profesional de fachadas mejora la imagen y protege los materiales.",
      body: "Con el tiempo, las fachadas acumulan contaminación, algas, moho y marcas de humedad. Una limpieza profesional recupera su aspecto y ayuda a prevenir desgaste prematuro.\n\nEn HigiRapid evaluamos cada superficie antes de trabajar para aplicar la presión adecuada y evitar daños.\n\nEn negocios, una fachada limpia mejora la percepción de marca. En viviendas, conserva valor y reduce futuros costes de mantenimiento.",
      seoTitle: "Limpieza de Fachadas en Barcelona | HigiRapid",
      seoDescription: "Por qué la limpieza profesional de fachadas mejora la estética y ayuda a prevenir daños por humedad."
    }
  ],
  ca: [
    {
      slug: "com-la-terapia-dozo-elimina-olors-persistents",
      categorySlug: "hygiene-guides",
      categoryLabel: "Guies d'higiene",
      primaryImageUrl: "/images/sofa-after-cleaning.png",
      primaryImageAlt: "Sofa net en una sala lluminosa",
      articleImageUrls: ["/images/sofa-after-cleaning.png", "/images/car-seats-after-cleaning.png"],
      publishedAt: "2026-03-20T09:00:00.000Z",
      title: "Com la teràpia d'ozó elimina olors persistents en tapissos i cotxes",
      excerpt: "Descobreix com l'ozó neutralitza olors de fum, mascotes i humitat sense residus agressius.",
      body: "La teràpia d'ozó actua a nivell molecular. No amaga l'olor, sinó que destrueix els compostos que la causen.\n\nA HigiRapid la fem servir quan la neteja profunda no és suficient, sobretot en olors de fum, mascotes i humitat.\n\nEl tractament es fa en condicions controlades i amb ventilació posterior per garantir seguretat i un aire més net.",
      seoTitle: "Teràpia d'Ozó per Olor de Cotxe i Sofà | HigiRapid",
      seoDescription: "Com la teràpia d'ozó elimina olors persistents en tapissos i interiors de cotxe."
    },
    {
      slug: "cada-quant-cal-netejar-i-desinfectar-tapissos",
      categorySlug: "service-tips",
      categoryLabel: "Consells de servei",
      primaryImageUrl: "/images/armchair-after-cleaning.png",
      primaryImageAlt: "Butaca acabada de netejar",
      articleImageUrls: ["/images/armchair-after-cleaning.png", "/images/rug-after-cleaning.png"],
      publishedAt: "2026-03-15T09:00:00.000Z",
      title: "Cada quant cal netejar i desinfectar els tapissos de casa?",
      excerpt: "Una guia pràctica per llars amb infants, mascotes o sensibilitat al·lèrgica.",
      body: "Per a la majoria de llars, una neteja profunda cada 6 mesos manté els teixits en bon estat i redueix l'acumulació de pols.\n\nSi hi ha mascotes, infants o al·lèrgies, fer-ho cada 3-4 mesos ajuda a controlar àcars, bacteris i olors.\n\nEl manteniment regular allarga la vida del mobiliari i millora el confort diari de la llar.",
      seoTitle: "Freqüència de Neteja de Tapissos | HigiRapid",
      seoDescription: "Guia de freqüència recomanada per netejar sofàs i tapissos en llars amb mascotes i infants."
    },
    {
      slug: "beneficis-de-la-neteja-de-facanes-a-barcelona",
      categorySlug: "news",
      categoryLabel: "Noticies",
      primaryImageUrl: "/images/commercial-space-after-cleaning.png",
      primaryImageAlt: "Façana comercial neta",
      articleImageUrls: ["/images/commercial-space-after-cleaning.png", "/images/office-upholstery-cleaning.png"],
      publishedAt: "2026-03-10T09:00:00.000Z",
      title: "Beneficis de la neteja de façanes per a llars i negocis a Barcelona",
      excerpt: "La neteja professional de façanes millora la imatge i protegeix els materials.",
      body: "Amb el temps, les façanes acumulen contaminació, algues, floridura i marques d'humitat. Una neteja professional n'actualitza l'aspecte i ajuda a prevenir degradació.\n\nA HigiRapid avaluem cada material abans d'actuar per aplicar la pressió adequada i evitar danys.\n\nEn negocis, una façana neta reforça la imatge de marca. En habitatges, conserva valor i redueix costos futurs.",
      seoTitle: "Neteja de Façanes a Barcelona | HigiRapid",
      seoDescription: "Per què la neteja professional de façanes millora l'estètica i ajuda a prevenir danys per humitat."
    }
  ]
};

export function getFallbackBlogPosts(locale: Locale): FallbackBlogPost[] {
  return posts[locale] ?? posts.en;
}

export function getFallbackBlogPostBySlug(locale: Locale, slug: string): FallbackBlogPost | null {
  return getFallbackBlogPosts(locale).find((post) => post.slug === slug) ?? null;
}
