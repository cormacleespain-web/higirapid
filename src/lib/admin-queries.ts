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

export async function getSiteSettingsRow() {
  if (!isDatabaseConfigured()) return null;
  try {
    const db = getDb();
    const rows = await db.select().from(siteSettings).where(eq(siteSettings.id, 1)).limit(1);
    return rows[0] ?? null;
  } catch {
    return null;
  }
}

export async function getAllServicesAdmin() {
  if (!isDatabaseConfigured()) return [];
  const db = getDb();
  const services = await db
    .select()
    .from(serviceOfferings)
    .orderBy(asc(serviceOfferings.sortOrder), asc(serviceOfferings.slug));
  const out: { service: (typeof services)[0]; i18n: (typeof serviceOfferingI18n.$inferSelect)[] }[] = [];
  for (const s of services) {
    const i18n = await db
      .select()
      .from(serviceOfferingI18n)
      .where(eq(serviceOfferingI18n.serviceId, s.id));
    out.push({ service: s, i18n });
  }
  return out;
}

export async function getServiceByIdAdmin(id: string) {
  if (!isDatabaseConfigured()) return null;
  const db = getDb();
  const rows = await db.select().from(serviceOfferings).where(eq(serviceOfferings.id, id)).limit(1);
  if (!rows[0]) return null;
  const i18n = await db
    .select()
    .from(serviceOfferingI18n)
    .where(eq(serviceOfferingI18n.serviceId, id));
  return { service: rows[0], i18n };
}

export async function getAllGalleryAdmin() {
  if (!isDatabaseConfigured()) return [];
  const db = getDb();
  const items = await db.select().from(galleryItems).orderBy(asc(galleryItems.sortOrder));
  const out: { item: (typeof items)[0]; i18n: (typeof galleryItemI18n.$inferSelect)[] }[] = [];
  for (const item of items) {
    const i18n = await db
      .select()
      .from(galleryItemI18n)
      .where(eq(galleryItemI18n.galleryItemId, item.id));
    out.push({ item, i18n });
  }
  return out;
}

export async function getGalleryItemByIdAdmin(id: string) {
  if (!isDatabaseConfigured()) return null;
  const db = getDb();
  const rows = await db.select().from(galleryItems).where(eq(galleryItems.id, id)).limit(1);
  if (!rows[0]) return null;
  const i18n = await db
    .select()
    .from(galleryItemI18n)
    .where(eq(galleryItemI18n.galleryItemId, id));
  return { item: rows[0], i18n };
}

export async function getAllContentEntriesAdmin() {
  if (!isDatabaseConfigured()) return [];
  const db = getDb();
  return db
    .select()
    .from(contentEntries)
    .orderBy(asc(contentEntries.entryKey), asc(contentEntries.locale));
}
