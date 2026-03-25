import { cache } from "react";
import { asc, eq } from "drizzle-orm";
import {
  contentEntries,
  galleryItemI18n,
  galleryItems,
  serviceOfferingI18n,
  serviceOfferings,
  siteSettings,
} from "@/db/schema";
import { getDb, isDatabaseConfigured } from "@/db/index";

/** Matches `GalleryItemCategory` in components/sections/Gallery.tsx */
type GalleryItemCategory = "car" | "upholstery" | "carpet" | "rug" | "business";

const FALLBACK_WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER
  ? process.env.NEXT_PUBLIC_WHATSAPP_NUMBER.replace(/\D/g, "")
  : "34600000000";

export type PublicSiteSettings = {
  whatsappE164: string;
  contactEmail: string | null;
  heroImageUrl: string | null;
};

export const getSiteSettings = cache(async function getSiteSettings(): Promise<PublicSiteSettings> {
  const fallback: PublicSiteSettings = {
    whatsappE164: FALLBACK_WHATSAPP,
    contactEmail: process.env.CONTACT_EMAIL ?? null,
    heroImageUrl: null,
  };

  if (!isDatabaseConfigured()) return fallback;

  try {
    const db = getDb();
    const rows = await db.select().from(siteSettings).where(eq(siteSettings.id, 1)).limit(1);
    if (rows.length === 0) return fallback;
    const row = rows[0];
    return {
      whatsappE164: row.whatsappE164.replace(/\D/g, "") || FALLBACK_WHATSAPP,
      contactEmail: row.contactEmail,
      heroImageUrl: row.heroImageUrl,
    };
  } catch {
    return fallback;
  }
});

export type ServiceCardDTO = {
  id: string;
  slug: string;
  iconKey: string;
  title: string;
  description: string;
};

export const getServiceCards = cache(async function getServiceCards(
  locale: string
): Promise<ServiceCardDTO[] | null> {
  if (!isDatabaseConfigured()) return null;
  try {
    const db = getDb();
    const services = await db
      .select()
      .from(serviceOfferings)
      .where(eq(serviceOfferings.published, true))
      .orderBy(asc(serviceOfferings.sortOrder), asc(serviceOfferings.slug));

    if (services.length === 0) return null;

    const out: ServiceCardDTO[] = [];
    for (const s of services) {
      const i18n = await db
        .select()
        .from(serviceOfferingI18n)
        .where(eq(serviceOfferingI18n.serviceId, s.id));

      const row = i18n.find((r) => r.locale === locale) ?? i18n.find((r) => r.locale === "en");
      if (!row) continue;
      out.push({
        id: s.id,
        slug: s.slug,
        iconKey: s.iconKey,
        title: row.title,
        description: row.description,
      });
    }
    return out.length ? out : null;
  } catch {
    return null;
  }
});

export type GalleryItemDTO = {
  id: string;
  category: GalleryItemCategory;
  imageSrc: string;
  imageAlt: string;
  objectPosition?: "bottom" | "center";
  caption?: string;
  priceFrom: number;
};

export const getGalleryItems = cache(async function getGalleryItems(
  locale: string
): Promise<GalleryItemDTO[] | null> {
  if (!isDatabaseConfigured()) return null;
  try {
    const db = getDb();
    const items = await db.select().from(galleryItems).orderBy(asc(galleryItems.sortOrder));
    if (items.length === 0) return null;

    const out: GalleryItemDTO[] = [];
    for (const item of items) {
      const i18nRows = await db
        .select()
        .from(galleryItemI18n)
        .where(eq(galleryItemI18n.galleryItemId, item.id));
      const cap =
        i18nRows.find((r) => r.locale === locale)?.caption ??
        i18nRows.find((r) => r.locale === "en")?.caption ??
        undefined;

      const cat = item.category as GalleryItemDTO["category"];
      out.push({
        id: item.id,
        category: cat,
        imageSrc: item.imageUrl,
        imageAlt: item.imageAlt,
        objectPosition: (item.objectPosition as "bottom" | "center" | undefined) ?? undefined,
        caption: cap ?? undefined,
        priceFrom: item.priceFrom,
      });
    }
    return out;
  } catch {
    return null;
  }
});

export const getContentOverrideMap = cache(async function getContentOverrideMap(
  locale: string
): Promise<Record<string, string>> {
  if (!isDatabaseConfigured()) return {};
  try {
    const db = getDb();
    const rows = await db
      .select()
      .from(contentEntries)
      .where(eq(contentEntries.locale, locale));
    return Object.fromEntries(rows.map((r) => [r.entryKey, r.value]));
  } catch {
    return {};
  }
});
