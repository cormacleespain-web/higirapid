import { cache } from "react";
import { asc, eq } from "drizzle-orm";
import {
  blogCategories,
  blogCategoryI18n,
  blogPostI18n,
  blogPosts,
  contentEntries,
  galleryItemI18n,
  galleryItems,
  serviceOfferingI18n,
  serviceOfferings,
  siteSettings,
} from "@/db/schema";
import { getDb, isDatabaseConfigured } from "@/db/index";
import { ensureStarterBlogPosts } from "@/lib/blog-starter-sync";

/** Matches `GalleryItemCategory` in components/sections/Gallery.tsx */
type GalleryItemCategory = "car" | "upholstery" | "carpet" | "rug" | "business";

const FALLBACK_WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER
  ? process.env.NEXT_PUBLIC_WHATSAPP_NUMBER.replace(/\D/g, "")
  : "34600000000";

export type PublicSiteSettings = {
  whatsappE164: string;
  contactEmail: string | null;
  heroImageUrl: string | null;
  hrClubRecipientEmail: string | null;
};

export const getSiteSettings = cache(async function getSiteSettings(): Promise<PublicSiteSettings> {
  const fallback: PublicSiteSettings = {
    whatsappE164: FALLBACK_WHATSAPP,
    contactEmail: process.env.CONTACT_EMAIL ?? null,
    heroImageUrl: null,
    hrClubRecipientEmail: process.env.HR_CLUB_RECIPIENT_EMAIL ?? process.env.CONTACT_EMAIL ?? null,
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
      hrClubRecipientEmail: row.hrClubRecipientEmail,
    };
  } catch {
    return fallback;
  }
});

export type BlogPostDTO = {
  id: string;
  slug: string;
  publishedAt: string | null;
  categorySlug: string | null;
  categoryLabel: string | null;
  primaryImageUrl: string | null;
  primaryImageAlt: string | null;
  primaryImageObjectPosition: string | null;
  articleImageUrls: string[];
  title: string;
  excerpt: string;
  body: string;
  seoTitle: string | null;
  seoDescription: string | null;
};

export type BlogCategoryDTO = {
  id: string;
  slug: string;
  label: string;
};

function parseJsonArray(value: string | null): string[] {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item): item is string => typeof item === "string" && item.length > 0);
  } catch {
    return [];
  }
}

export const getActiveBlogCategories = cache(async function getActiveBlogCategories(
  locale: string
): Promise<BlogCategoryDTO[]> {
  if (!isDatabaseConfigured()) return [];
  try {
    const db = getDb();
    const categories = await db
      .select()
      .from(blogCategories)
      .where(eq(blogCategories.active, true))
      .orderBy(asc(blogCategories.sortOrder), asc(blogCategories.slug));
    const labels = await db.select().from(blogCategoryI18n);
    return categories
      .map((category) => {
        const row =
          labels.find((label) => label.categoryId === category.id && label.locale === locale) ??
          labels.find((label) => label.categoryId === category.id && label.locale === "en");
        if (!row) return null;
        return { id: category.id, slug: category.slug, label: row.label };
      })
      .filter((row): row is BlogCategoryDTO => Boolean(row));
  } catch {
    return [];
  }
});

export const getPublishedBlogPosts = cache(async function getPublishedBlogPosts(
  locale: string
): Promise<BlogPostDTO[]> {
  if (!isDatabaseConfigured()) return [];
  try {
    await ensureStarterBlogPosts();
    const db = getDb();
    const categories = await db.select().from(blogCategories);
    const categoryLabels = await db.select().from(blogCategoryI18n);
    const posts = await db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.published, true))
      .orderBy(asc(blogPosts.sortOrder), asc(blogPosts.slug));
    const out: BlogPostDTO[] = [];
    for (const post of posts) {
      const i18nRows = await db
        .select()
        .from(blogPostI18n)
        .where(eq(blogPostI18n.postId, post.id));
      const row =
        i18nRows.find((r) => r.locale === locale) ?? i18nRows.find((r) => r.locale === "en");
      if (!row) continue;
      const category = categories.find((c) => c.id === post.categoryId);
      const label =
        categoryLabels.find((l) => l.categoryId === post.categoryId && l.locale === locale) ??
        categoryLabels.find((l) => l.categoryId === post.categoryId && l.locale === "en");
      out.push({
        id: post.id,
        slug: post.slug,
        publishedAt: post.publishedAt ?? null,
        categorySlug: category?.slug ?? null,
        categoryLabel: label?.label ?? null,
        primaryImageUrl: post.primaryImageUrl ?? null,
        primaryImageAlt: post.primaryImageAlt ?? null,
        primaryImageObjectPosition: post.primaryImageObjectPosition ?? null,
        articleImageUrls: parseJsonArray(post.articleImageUrls),
        title: row.title,
        excerpt: row.excerpt,
        body: row.body,
        seoTitle: row.seoTitle ?? null,
        seoDescription: row.seoDescription ?? null,
      });
    }
    return out;
  } catch {
    return [];
  }
});

export const getPublishedBlogPostBySlug = cache(async function getPublishedBlogPostBySlug(
  locale: string,
  slug: string
): Promise<BlogPostDTO | null> {
  const posts = await getPublishedBlogPosts(locale);
  return posts.find((post) => post.slug === slug) ?? null;
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
