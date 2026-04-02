import { asc, desc, eq } from "drizzle-orm";
import {
  blogCategories,
  blogCategoryI18n,
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
import { ensureStarterBlogPosts } from "@/lib/blog-starter-sync";

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

export async function getAllBlogPostsAdmin() {
  if (!isDatabaseConfigured()) return [];
  try {
    await ensureStarterBlogPosts();
    const db = getDb();
    let categories: (typeof blogCategories.$inferSelect)[] = [];
    let categoryI18nRows: (typeof blogCategoryI18n.$inferSelect)[] = [];
    try {
      categories = await db.select().from(blogCategories);
      categoryI18nRows = await db.select().from(blogCategoryI18n);
    } catch {
      categories = [];
      categoryI18nRows = [];
    }

    const posts = await db.select().from(blogPosts).orderBy(asc(blogPosts.sortOrder), asc(blogPosts.slug));
    const out: {
      post: (typeof posts)[0];
      i18n: (typeof blogPostI18n.$inferSelect)[];
      category: { id: string; slug: string; label: string } | null;
    }[] = [];
    for (const post of posts) {
      const i18n = await db.select().from(blogPostI18n).where(eq(blogPostI18n.postId, post.id));
      const category = categories.find((row) => row.id === post.categoryId);
      const categoryLabel =
        categoryI18nRows.find((row) => row.categoryId === post.categoryId && row.locale === "en")
          ?.label ?? null;
      out.push({
        post,
        i18n,
        category: category ? { id: category.id, slug: category.slug, label: categoryLabel ?? category.slug } : null,
      });
    }
    return out;
  } catch {
    return [];
  }
}

export async function getBlogPostByIdAdmin(id: string) {
  if (!isDatabaseConfigured()) return null;
  try {
    const db = getDb();
    const rows = await db.select().from(blogPosts).where(eq(blogPosts.id, id)).limit(1);
    if (!rows[0]) return null;
    const i18n = await db.select().from(blogPostI18n).where(eq(blogPostI18n.postId, id));
    const categories = await getBlogCategoriesAdmin();
    return { post: rows[0], i18n, categories };
  } catch {
    return null;
  }
}

export async function getBlogCategoriesAdmin() {
  if (!isDatabaseConfigured()) return [];
  try {
    const db = getDb();
    const categories = await db
      .select()
      .from(blogCategories)
      .where(eq(blogCategories.active, true))
      .orderBy(asc(blogCategories.sortOrder), asc(blogCategories.slug));
    const i18n = await db.select().from(blogCategoryI18n);
    return categories.map((category) => ({
      ...category,
      label:
        i18n.find((row) => row.categoryId === category.id && row.locale === "en")?.label ??
        i18n.find((row) => row.categoryId === category.id)?.label ??
        category.slug,
    }));
  } catch {
    return [];
  }
}

export async function getAllHrClubLeadsAdmin() {
  if (!isDatabaseConfigured()) return [];
  try {
    const db = getDb();
    return await db.select().from(hrClubLeads).orderBy(desc(hrClubLeads.createdAt));
  } catch (error) {
    console.error("Could not load HR-Club leads. Did you run DB migrations?", error);
    return [];
  }
}

export type ServiceAdminRow = {
  service: typeof serviceOfferings.$inferSelect;
  i18n: (typeof serviceOfferingI18n.$inferSelect)[];
};

export async function getAllServicesAdmin(): Promise<
  { rows: ServiceAdminRow[]; error: null } | { rows: []; error: string }
> {
  if (!isDatabaseConfigured()) return { rows: [], error: null };
  try {
    const db = getDb();
    const services = await db
      .select()
      .from(serviceOfferings)
      .orderBy(asc(serviceOfferings.sortOrder), asc(serviceOfferings.slug));
    const out: ServiceAdminRow[] = [];
    for (const s of services) {
      const i18n = await db
        .select()
        .from(serviceOfferingI18n)
        .where(eq(serviceOfferingI18n.serviceId, s.id));
      out.push({ service: s, i18n });
    }
    return { rows: out, error: null };
  } catch (e) {
    console.error("getAllServicesAdmin failed (run npm run db:migrate if schema is out of date):", e);
    return {
      rows: [],
      error:
        "Could not load services from the database. Run npm run db:migrate, confirm DATABASE_URL, then refresh.",
    };
  }
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
