"use server";

import { and, eq } from "drizzle-orm";
import { z } from "zod";
import {
  contentEntries,
  galleryItemI18n,
  galleryItems,
  serviceOfferingI18n,
  serviceOfferings,
  siteSettings,
} from "@/db/schema";
import { getDb, isDatabaseConfigured } from "@/db/index";
import { requireAdminSession } from "@/lib/admin-session";
import { checkAdminTranslateRateLimit } from "@/lib/admin-translate-rate-limit";
import { isDeepLConfigured, translateTextsDeepL } from "@/lib/admin-translate";
import { SERVICE_ICON_KEYS } from "@/lib/service-icons";
import { revalidateAllLocales } from "@/lib/revalidate-public";

const locales = ["en", "es", "ca"] as const;

function ensureDb() {
  if (!isDatabaseConfigured()) {
    throw new Error("DATABASE_URL is not configured");
  }
  return getDb();
}

export async function saveSiteSettingsAction(formData: FormData): Promise<void> {
  const session = await requireAdminSession();
  if (!session) return;

  const whatsapp = String(formData.get("whatsapp_e164") ?? "").replace(/\D/g, "");
  if (!whatsapp || whatsapp.length < 8) return;

  const contactEmailRaw = String(formData.get("contact_email") ?? "").trim();
  const heroImageUrlRaw = String(formData.get("hero_image_url") ?? "").trim();

  try {
    const db = ensureDb();
    await db
      .insert(siteSettings)
      .values({
        id: 1,
        whatsappE164: whatsapp,
        contactEmail: contactEmailRaw || null,
        heroImageUrl: heroImageUrlRaw || null,
      })
      .onConflictDoUpdate({
        target: siteSettings.id,
        set: {
          whatsappE164: whatsapp,
          contactEmail: contactEmailRaw || null,
          heroImageUrl: heroImageUrlRaw || null,
        },
      });
    revalidateAllLocales();
  } catch (e) {
    console.error(e);
  }
}

const iconKeySchema = z
  .string()
  .refine((v) => SERVICE_ICON_KEYS.includes(v as (typeof SERVICE_ICON_KEYS)[number]), {
    message: "Invalid icon",
  });
const galleryCats = z.enum(["car", "upholstery", "carpet", "rug", "business"]);

export async function saveServiceAction(formData: FormData): Promise<void> {
  const session = await requireAdminSession();
  if (!session) return;

  const id = String(formData.get("id") ?? "").trim();
  const slug = String(formData.get("slug") ?? "")
    .trim()
    .toLowerCase();
  const sortOrder = Number(formData.get("sort_order") ?? 0);
  const published = formData.get("published") === "on" || formData.get("published") === "true";
  const iconKey = iconKeySchema.safeParse(String(formData.get("icon_key") ?? ""));
  if (!slug || !iconKey.success) return;

  const titles: Record<string, string> = {};
  const descriptions: Record<string, string> = {};
  for (const loc of locales) {
    titles[loc] = String(formData.get(`title_${loc}`) ?? "").trim();
    descriptions[loc] = String(formData.get(`description_${loc}`) ?? "").trim();
  }
  if (!titles.en && !titles.es && !titles.ca) return;

  try {
    const db = ensureDb();
    let serviceId = id;

    if (!id) {
      const [inserted] = await db
        .insert(serviceOfferings)
        .values({
          slug,
          sortOrder: Number.isFinite(sortOrder) ? sortOrder : 0,
          published,
          iconKey: iconKey.data,
        })
        .returning({ id: serviceOfferings.id });
      serviceId = inserted.id;
    } else {
      await db
        .update(serviceOfferings)
        .set({
          slug,
          sortOrder: Number.isFinite(sortOrder) ? sortOrder : 0,
          published,
          iconKey: iconKey.data,
        })
        .where(eq(serviceOfferings.id, id));
      serviceId = id;
      await db.delete(serviceOfferingI18n).where(eq(serviceOfferingI18n.serviceId, id));
    }

    for (const loc of locales) {
      const title = titles[loc] || titles.en || titles.es || titles.ca;
      const description = descriptions[loc] || descriptions.en || descriptions.es || descriptions.ca;
      if (!title || !description) continue;
      await db.insert(serviceOfferingI18n).values({
        serviceId,
        locale: loc,
        title,
        description,
      });
    }

    revalidateAllLocales();
  } catch (e) {
    console.error(e);
  }
}

export async function deleteServiceAction(serviceId: string) {
  const session = await requireAdminSession();
  if (!session) return { ok: false, error: "Unauthorized" };
  try {
    const db = ensureDb();
    await db.delete(serviceOfferings).where(eq(serviceOfferings.id, serviceId));
    revalidateAllLocales();
    return { ok: true as const };
  } catch (e) {
    console.error(e);
    return { ok: false as const, error: "Could not delete." };
  }
}

export async function deleteServiceFormAction(formData: FormData): Promise<void> {
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  await deleteServiceAction(id);
}

export async function updateServiceSortOrderAction(serviceIds: string[]) {
  const session = await requireAdminSession();
  if (!session) return { ok: false as const, error: "Unauthorized" };
  try {
    const parsed = z.array(z.string().uuid()).safeParse(serviceIds);
    if (!parsed.success) return { ok: false as const, error: "Invalid request" };
    const db = ensureDb();
    for (let i = 0; i < parsed.data.length; i += 1) {
      await db
        .update(serviceOfferings)
        .set({ sortOrder: i })
        .where(eq(serviceOfferings.id, parsed.data[i]));
    }
    revalidateAllLocales();
    return { ok: true as const };
  } catch {
    return { ok: false as const, error: "Could not update order." };
  }
}

export async function saveGalleryItemAction(formData: FormData): Promise<void> {
  const session = await requireAdminSession();
  if (!session) return;

  const id = String(formData.get("id") ?? "").trim();
  const imageUrl = String(formData.get("image_url") ?? "").trim();
  const imageAlt = String(formData.get("image_alt") ?? "").trim();
  const category = galleryCats.safeParse(String(formData.get("category") ?? ""));
  const priceFrom = Number(formData.get("price_from") ?? 0);
  const sortOrder = Number(formData.get("sort_order") ?? 0);
  const objectPosition = String(formData.get("object_position") ?? "").trim() || null;

  if (!imageUrl || !imageAlt || !category.success || !Number.isFinite(priceFrom)) return;

  const captions: Record<string, string> = {};
  for (const loc of locales) {
    captions[loc] = String(formData.get(`caption_${loc}`) ?? "").trim();
  }

  try {
    const db = ensureDb();
    let itemId = id;

    if (!id) {
      const [inserted] = await db
        .insert(galleryItems)
        .values({
          category: category.data,
          imageUrl,
          imageAlt,
          objectPosition:
            objectPosition === "bottom" ? "bottom" : objectPosition === "center" ? "center" : null,
          priceFrom: Math.round(priceFrom),
          sortOrder: Number.isFinite(sortOrder) ? sortOrder : 0,
        })
        .returning({ id: galleryItems.id });
      itemId = inserted.id;
    } else {
      await db
        .update(galleryItems)
        .set({
          category: category.data,
          imageUrl,
          imageAlt,
          objectPosition:
            objectPosition === "bottom" ? "bottom" : objectPosition === "center" ? "center" : null,
          priceFrom: Math.round(priceFrom),
          sortOrder: Number.isFinite(sortOrder) ? sortOrder : 0,
        })
        .where(eq(galleryItems.id, id));
      itemId = id;
      await db.delete(galleryItemI18n).where(eq(galleryItemI18n.galleryItemId, id));
    }

    for (const loc of locales) {
      const cap = captions[loc];
      if (!cap) continue;
      await db.insert(galleryItemI18n).values({
        galleryItemId: itemId,
        locale: loc,
        caption: cap,
      });
    }

    revalidateAllLocales();
  } catch (e) {
    console.error(e);
  }
}

export async function deleteGalleryItemAction(itemId: string) {
  const session = await requireAdminSession();
  if (!session) return { ok: false, error: "Unauthorized" };
  try {
    const db = ensureDb();
    await db.delete(galleryItems).where(eq(galleryItems.id, itemId));
    revalidateAllLocales();
    return { ok: true as const };
  } catch (e) {
    console.error(e);
    return { ok: false as const, error: "Could not delete." };
  }
}

export async function deleteGalleryItemFormAction(formData: FormData): Promise<void> {
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  await deleteGalleryItemAction(id);
}

const entrySchema = z.object({
  entryKey: z.string().min(1).max(200),
  locale: z.enum(locales),
  value: z.string().max(20000),
});

export async function saveContentEntriesAction(
  entries: { entryKey: string; locale: string; value: string }[]
) {
  const session = await requireAdminSession();
  if (!session) return { ok: false, error: "Unauthorized" };

  try {
    const db = ensureDb();
    for (const raw of entries) {
      const parsed = entrySchema.safeParse(raw);
      if (!parsed.success) continue;
      const { entryKey, locale, value } = parsed.data;
      if (!value.trim()) {
        await db
          .delete(contentEntries)
          .where(
            and(eq(contentEntries.entryKey, entryKey), eq(contentEntries.locale, locale))
          );
        continue;
      }
      await db
        .insert(contentEntries)
        .values({ entryKey, locale, value: value.trim() })
        .onConflictDoUpdate({
          target: [contentEntries.entryKey, contentEntries.locale],
          set: { value: value.trim() },
        });
    }
    revalidateAllLocales();
    return { ok: true as const };
  } catch (e) {
    console.error(e);
    return { ok: false as const, error: "Could not save content." };
  }
}

const locale3 = z.enum(locales);

export async function translateContentSectionAction(payload: {
  sourceLocale: (typeof locales)[number];
  fields: { entryKey: string; text: string }[];
}) {
  const session = await requireAdminSession();
  if (!session) return { ok: false as const, error: "Unauthorized" };

  if (!isDeepLConfigured()) {
    return { ok: false as const, error: "Translation is not configured." };
  }

  const allowed = await checkAdminTranslateRateLimit();
  if (!allowed) {
    return { ok: false as const, error: "Too many translation requests. Please wait a minute." };
  }

  const parsed = z
    .object({
      sourceLocale: locale3,
      fields: z
        .array(z.object({ entryKey: z.string().min(1).max(200), text: z.string().max(20000) }))
        .max(80),
    })
    .safeParse(payload);

  if (!parsed.success) {
    return { ok: false as const, error: "Invalid request." };
  }

  const { sourceLocale, fields } = parsed.data;
  const targets = locales.filter((l) => l !== sourceLocale);

  try {
    const updates: { entryKey: string; locale: string; value: string }[] = [];
    for (const target of targets) {
      const translated = await translateTextsDeepL({
        texts: fields.map((f) => f.text),
        sourceLocale,
        targetLocale: target,
      });
      fields.forEach((f, i) => {
        updates.push({ entryKey: f.entryKey, locale: target, value: translated[i] ?? "" });
      });
    }
    return { ok: true as const, updates };
  } catch {
    return { ok: false as const, error: "Translation failed. Try again or edit manually." };
  }
}

export async function translateServiceCopyAction(payload: {
  sourceLocale: (typeof locales)[number];
  title: string;
  description: string;
}) {
  const session = await requireAdminSession();
  if (!session) return { ok: false as const, error: "Unauthorized" };

  if (!isDeepLConfigured()) {
    return { ok: false as const, error: "Translation is not configured." };
  }

  const allowed = await checkAdminTranslateRateLimit();
  if (!allowed) {
    return { ok: false as const, error: "Too many translation requests. Please wait a minute." };
  }

  const parsed = z
    .object({
      sourceLocale: locale3,
      title: z.string().max(5000),
      description: z.string().max(20000),
    })
    .safeParse(payload);

  if (!parsed.success) {
    return { ok: false as const, error: "Invalid request." };
  }

  const { sourceLocale, title, description } = parsed.data;
  const targets = locales.filter((l) => l !== sourceLocale);

  try {
    const translations: Partial<
      Record<(typeof locales)[number], { title: string; description: string }>
    > = {};
    for (const target of targets) {
      const out = await translateTextsDeepL({
        texts: [title, description],
        sourceLocale,
        targetLocale: target,
      });
      translations[target] = {
        title: out[0] ?? "",
        description: out[1] ?? "",
      };
    }
    return { ok: true as const, translations };
  } catch {
    return { ok: false as const, error: "Translation failed. Try again or edit manually." };
  }
}
