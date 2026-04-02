"use server";

import { and, asc, eq } from "drizzle-orm";
import { z } from "zod";
import {
  blogCategories,
  blogPostI18n,
  blogPosts,
  contentEntries,
  galleryItemI18n,
  galleryItems,
  hrClubLeads,
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
import { getBlogStarterArticles } from "@/lib/blog-starter-content";
import type { Locale } from "@/i18n/config";

const locales = ["en", "es", "ca"] as const;

function ensureDb() {
  if (!isDatabaseConfigured()) {
    throw new Error("DATABASE_URL is not configured");
  }
  return getDb();
}

export async function saveSiteSettingsAction(
  formData: FormData
): Promise<{ ok: boolean; error?: string }> {
  const session = await requireAdminSession();
  if (!session) return { ok: false, error: "Unauthorized" };

  const whatsapp = String(formData.get("whatsapp_e164") ?? "").replace(/\D/g, "");
  if (!whatsapp || whatsapp.length < 8) return { ok: false, error: "Invalid WhatsApp number." };

  const contactEmailRaw = String(formData.get("contact_email") ?? "").trim();
  const heroImageUrlRaw = String(formData.get("hero_image_url") ?? "").trim();
  const hrClubRecipientEmailRaw = String(formData.get("hr_club_recipient_email") ?? "").trim();
  const parsedRecipient =
    hrClubRecipientEmailRaw.length > 0 ? z.string().email().safeParse(hrClubRecipientEmailRaw) : null;
  if (parsedRecipient && !parsedRecipient.success) {
    return { ok: false, error: "Invalid HR-Club recipient email." };
  }

  try {
    const db = ensureDb();
    await db
      .insert(siteSettings)
      .values({
        id: 1,
        whatsappE164: whatsapp,
        contactEmail: contactEmailRaw || null,
        heroImageUrl: heroImageUrlRaw || null,
        hrClubRecipientEmail: hrClubRecipientEmailRaw || null,
      })
      .onConflictDoUpdate({
        target: siteSettings.id,
        set: {
          whatsappE164: whatsapp,
          contactEmail: contactEmailRaw || null,
          heroImageUrl: heroImageUrlRaw || null,
          hrClubRecipientEmail: hrClubRecipientEmailRaw || null,
        },
      });
    revalidateAllLocales();
    return { ok: true };
  } catch (e) {
    console.error(e);
    return {
      ok: false,
      error: "Could not save settings. Ensure database migrations are applied.",
    };
  }
}

export async function saveBlogPostAction(
  formData: FormData
): Promise<{ ok: boolean; error?: string }> {
  const session = await requireAdminSession();
  if (!session) return { ok: false, error: "Unauthorized" };

  const id = String(formData.get("id") ?? "").trim();
  const slug = String(formData.get("slug") ?? "").trim().toLowerCase();
  const sortOrder = Number(formData.get("sort_order") ?? 0);
  const published = formData.get("published") === "on" || formData.get("published") === "true";
  const categoryId = String(formData.get("category_id") ?? "").trim() || null;
  const primaryImageUrl = String(formData.get("primary_image_url") ?? "").trim() || null;
  const primaryImageAlt = String(formData.get("primary_image_alt") ?? "").trim() || null;
  const primaryImageObjectPosition =
    String(formData.get("primary_image_object_position") ?? "").trim() || null;
  const articleImageUrls = String(formData.get("article_image_urls") ?? "")
    .split("\n")
    .map((url) => url.trim())
    .filter(Boolean);
  const articleImageUrlsJson = articleImageUrls.length > 0 ? JSON.stringify(articleImageUrls) : null;
  if (!slug) return { ok: false, error: "Slug is required." };

  const titles: Record<string, string> = {};
  const excerpts: Record<string, string> = {};
  const bodies: Record<string, string> = {};
  const seoTitles: Record<string, string> = {};
  const seoDescriptions: Record<string, string> = {};
  for (const loc of locales) {
    titles[loc] = String(formData.get(`title_${loc}`) ?? "").trim();
    excerpts[loc] = String(formData.get(`excerpt_${loc}`) ?? "").trim();
    bodies[loc] = String(formData.get(`body_${loc}`) ?? "").trim();
    seoTitles[loc] = String(formData.get(`seo_title_${loc}`) ?? "").trim();
    seoDescriptions[loc] = String(formData.get(`seo_description_${loc}`) ?? "").trim();
  }
  if (!titles.en || !excerpts.en || !bodies.en) {
    return { ok: false, error: "English title, excerpt, and body are required." };
  }
  if (primaryImageUrl && !primaryImageAlt) {
    return { ok: false, error: "Primary image alt text is required when an image URL is set." };
  }

  try {
    const db = ensureDb();
    if (categoryId) {
      const matched = await db
        .select({ id: blogCategories.id })
        .from(blogCategories)
        .where(eq(blogCategories.id, categoryId))
        .limit(1);
      if (!matched[0]) return { ok: false, error: "Selected category is invalid." };
    }
    let postId = id;

    if (!id) {
      const [inserted] = await db
        .insert(blogPosts)
        .values({
          slug,
          categoryId,
          status: published ? "published" : "draft",
          published,
          sortOrder: Number.isFinite(sortOrder) ? sortOrder : 0,
          publishedAt: published ? new Date().toISOString() : null,
          primaryImageUrl,
          primaryImageAlt,
          primaryImageObjectPosition,
          articleImageUrls: articleImageUrlsJson,
        })
        .returning({ id: blogPosts.id });
      postId = inserted.id;
    } else {
      await db
        .update(blogPosts)
        .set({
          slug,
          categoryId,
          status: published ? "published" : "draft",
          published,
          sortOrder: Number.isFinite(sortOrder) ? sortOrder : 0,
          publishedAt: published ? new Date().toISOString() : null,
          primaryImageUrl,
          primaryImageAlt,
          primaryImageObjectPosition,
          articleImageUrls: articleImageUrlsJson,
        })
        .where(eq(blogPosts.id, id));
      postId = id;
      await db.delete(blogPostI18n).where(eq(blogPostI18n.postId, id));
    }

    for (const loc of locales) {
      const title = titles[loc] || titles.en;
      const excerpt = excerpts[loc] || excerpts.en;
      const body = bodies[loc] || bodies.en;
      if (!title || !excerpt || !body) continue;
      await db.insert(blogPostI18n).values({
        postId,
        locale: loc,
        title,
        excerpt,
        body,
        seoTitle: seoTitles[loc] || null,
        seoDescription: seoDescriptions[loc] || null,
      });
    }

    revalidateAllLocales();
    return { ok: true };
  } catch (e) {
    console.error(e);
    return { ok: false, error: "Could not save blog post." };
  }
}

export async function deleteBlogPostAction(postId: string) {
  const session = await requireAdminSession();
  if (!session) return { ok: false, error: "Unauthorized" };
  try {
    const db = ensureDb();
    await db.delete(blogPosts).where(eq(blogPosts.id, postId));
    revalidateAllLocales();
    return { ok: true as const };
  } catch (e) {
    console.error(e);
    return { ok: false as const, error: "Could not delete." };
  }
}

export async function deleteBlogPostFormAction(formData: FormData): Promise<void> {
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  await deleteBlogPostAction(id);
}

export async function updateBlogSortOrderAction(postIds: string[]) {
  const session = await requireAdminSession();
  if (!session) return { ok: false as const, error: "Unauthorized" };
  try {
    const parsed = z.array(z.string().uuid()).safeParse(postIds);
    if (!parsed.success) return { ok: false as const, error: "Invalid request" };
    const db = ensureDb();
    const existing = await db
      .select({ id: blogPosts.id })
      .from(blogPosts)
      .orderBy(asc(blogPosts.sortOrder), asc(blogPosts.slug));
    if (existing.length !== parsed.data.length) {
      return { ok: false as const, error: "Post list changed. Refresh and try again." };
    }
    const existingIds = new Set(existing.map((x) => x.id));
    for (const id of parsed.data) {
      if (!existingIds.has(id)) return { ok: false as const, error: "Invalid post selection." };
    }
    for (let i = 0; i < parsed.data.length; i += 1) {
      await db.update(blogPosts).set({ sortOrder: i }).where(eq(blogPosts.id, parsed.data[i]));
    }
    revalidateAllLocales();
    return { ok: true as const };
  } catch {
    return { ok: false as const, error: "Could not update blog order." };
  }
}

export async function importStarterBlogPostsAction() {
  const session = await requireAdminSession();
  if (!session) return { ok: false as const, error: "Unauthorized" };
  try {
    const db = ensureDb();
    const byLocale: Record<Locale, ReturnType<typeof getBlogStarterArticles>> = {
      en: getBlogStarterArticles("en"),
      es: getBlogStarterArticles("es"),
      ca: getBlogStarterArticles("ca"),
    };
    const existing = await db.select({ slug: blogPosts.slug }).from(blogPosts);
    const existingSlugs = new Set(existing.map((row) => row.slug));
    let inserted = 0;

    for (let i = 0; i < byLocale.en.length; i += 1) {
      const enPost = byLocale.en[i];
      if (!enPost || existingSlugs.has(enPost.slug)) continue;

      const [post] = await db
        .insert(blogPosts)
        .values({
          slug: enPost.slug,
          categoryId: null,
          status: "published",
          published: true,
          sortOrder: 100 + i,
          publishedAt: enPost.publishedAt ?? new Date().toISOString(),
          primaryImageUrl: enPost.primaryImageUrl ?? null,
          primaryImageAlt: enPost.primaryImageAlt ?? null,
          primaryImageObjectPosition: "center",
          articleImageUrls: JSON.stringify(enPost.articleImageUrls ?? []),
        })
        .returning({ id: blogPosts.id });

      for (const loc of locales) {
        const localized = byLocale[loc][i] ?? enPost;
        await db.insert(blogPostI18n).values({
          postId: post.id,
          locale: loc,
          title: localized.title,
          excerpt: localized.excerpt,
          body: localized.body,
          seoTitle: localized.seoTitle ?? localized.title,
          seoDescription: localized.seoDescription ?? localized.excerpt,
        });
      }
      inserted += 1;
    }

    revalidateAllLocales();
    return { ok: true as const, inserted };
  } catch (e) {
    console.error(e);
    return { ok: false as const, error: "Could not create starter blog posts." };
  }
}

export async function importStarterBlogPostsFormAction(_: FormData): Promise<void> {
  await importStarterBlogPostsAction();
}

export async function updateLeadStatusAction(formData: FormData): Promise<void> {
  const session = await requireAdminSession();
  if (!session) return;
  const id = String(formData.get("id") ?? "").trim();
  const status = String(formData.get("status") ?? "").trim();
  const notes = String(formData.get("internal_notes") ?? "").trim();
  if (!id) return;
  const statusParsed = z.enum(["new", "contacted", "qualified", "closed"]).safeParse(status);
  if (!statusParsed.success) return;
  try {
    const db = ensureDb();
    const now = new Date().toISOString();
    await db
      .update(hrClubLeads)
      .set({
        status: statusParsed.data,
        internalNotes: notes || null,
        updatedAt: now,
        contactedAt: statusParsed.data === "contacted" ? now : null,
        closedAt: statusParsed.data === "closed" ? now : null,
      })
      .where(eq(hrClubLeads.id, id));
  } catch (e) {
    console.error(e);
  }
}

export async function deleteLeadAction(id: string) {
  const session = await requireAdminSession();
  if (!session) return { ok: false as const, error: "Unauthorized" };
  try {
    const db = ensureDb();
    await db.delete(hrClubLeads).where(eq(hrClubLeads.id, id));
    return { ok: true as const };
  } catch (e) {
    console.error(e);
    return { ok: false as const, error: "Could not delete lead." };
  }
}

export async function deleteLeadFormAction(formData: FormData): Promise<void> {
  const id = String(formData.get("id") ?? "").trim();
  if (!id) return;
  await deleteLeadAction(id);
}

const iconKeySchema = z
  .string()
  .refine((v) => SERVICE_ICON_KEYS.includes(v as (typeof SERVICE_ICON_KEYS)[number]), {
    message: "Invalid icon",
  });
const galleryCats = z.enum(["car", "upholstery", "carpet", "rug", "business"]);

export async function saveServiceAction(
  formData: FormData
): Promise<{ ok: boolean; error?: string }> {
  const session = await requireAdminSession();
  if (!session) return { ok: false, error: "Unauthorized" };

  const id = String(formData.get("id") ?? "").trim();
  const slug = String(formData.get("slug") ?? "")
    .trim()
    .toLowerCase();
  const sortOrder = Number(formData.get("sort_order") ?? 0);
  const published = formData.get("published") === "on" || formData.get("published") === "true";
  const iconKey = iconKeySchema.safeParse(String(formData.get("icon_key") ?? ""));
  if (!slug || !iconKey.success) return { ok: false, error: "Invalid slug or icon." };

  const imageUrlRaw = String(formData.get("image_url") ?? "").trim();
  const imageUrl = imageUrlRaw.length > 0 ? imageUrlRaw : null;
  const objPosRaw = String(formData.get("image_object_position") ?? "").trim();
  const imageObjectPosition =
    objPosRaw === "bottom" || objPosRaw === "center" ? objPosRaw : null;

  const priceRaw = String(formData.get("price_from") ?? "").trim();
  let priceFrom: number | null = null;
  if (priceRaw.length > 0) {
    const n = Number(priceRaw);
    if (!Number.isFinite(n) || n < 0 || n > 1_000_000) {
      return { ok: false, error: "From price must be a valid number." };
    }
    priceFrom = Math.round(n);
  }

  const priceWasRaw = String(formData.get("price_was") ?? "").trim();
  let priceWas: number | null = null;
  if (priceWasRaw.length > 0) {
    const nw = Number(priceWasRaw);
    if (!Number.isFinite(nw) || nw < 0 || nw > 1_000_000) {
      return { ok: false, error: "Was price must be a valid number." };
    }
    priceWas = Math.round(nw);
  }
  if (priceWas != null && priceFrom == null) {
    return {
      ok: false,
      error: "Set a current (from) price when using a sale was-price.",
    };
  }
  if (priceWas != null && priceFrom != null && priceWas <= priceFrom) {
    return {
      ok: false,
      error: "Was price must be higher than the current from price for a sale.",
    };
  }

  const titles: Record<string, string> = {};
  const descriptions: Record<string, string> = {};
  const imageAlts: Record<string, string> = {};
  for (const loc of locales) {
    titles[loc] = String(formData.get(`title_${loc}`) ?? "").trim();
    descriptions[loc] = String(formData.get(`description_${loc}`) ?? "").trim();
    imageAlts[loc] = String(formData.get(`image_alt_${loc}`) ?? "").trim();
  }
  if (!titles.en && !titles.es && !titles.ca) {
    return { ok: false, error: "Add at least one language with title and description." };
  }

  for (const loc of locales) {
    const title = titles[loc] || titles.en || titles.es || titles.ca;
    const description = descriptions[loc] || descriptions.en || descriptions.es || descriptions.ca;
    if (!title || !description) continue;
    if (imageUrl && !imageAlts[loc]) {
      return {
        ok: false,
        error: `When a service image is set, add image description (alt) for ${loc.toUpperCase()}.`,
      };
    }
    if (imageAlts[loc].length > 200) {
      return { ok: false, error: `Image description for ${loc} is too long (max 200 characters).` };
    }
  }

  try {
    const db = ensureDb();
    let serviceId = id;

    const baseValues = {
      slug,
      sortOrder: Number.isFinite(sortOrder) ? sortOrder : 0,
      published,
      iconKey: iconKey.data,
      imageUrl,
      imageObjectPosition,
      priceFrom,
      priceWas,
    };

    if (!id) {
      const [inserted] = await db.insert(serviceOfferings).values(baseValues).returning({ id: serviceOfferings.id });
      serviceId = inserted.id;
    } else {
      await db.update(serviceOfferings).set(baseValues).where(eq(serviceOfferings.id, id));
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
        imageAlt: imageAlts[loc] || null,
      });
    }

    revalidateAllLocales();
    return { ok: true };
  } catch (e) {
    console.error(e);
    return { ok: false, error: "Could not save. Check the database connection." };
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
