import { eq } from "drizzle-orm";
import { getDb, isDatabaseConfigured } from "@/db/index";
import { blogCategories, blogCategoryI18n, blogPostI18n, blogPosts } from "@/db/schema";
import { getBlogStarterArticles } from "@/lib/blog-starter-content";

const categorySeed = [
  { slug: "news", labels: { en: "News", es: "Noticias", ca: "Noticies" } },
  { slug: "hygiene-guides", labels: { en: "Hygiene guides", es: "Guias de higiene", ca: "Guies d'higiene" } },
  { slug: "service-tips", labels: { en: "Service tips", es: "Consejos de servicio", ca: "Consells de servei" } },
] as const;

export async function ensureStarterBlogPosts(): Promise<void> {
  if (!isDatabaseConfigured()) return;
  try {
    const db = getDb();
    const existingPosts = await db.select({ id: blogPosts.id }).from(blogPosts).limit(1);
    if (existingPosts.length > 0) return;

    const categoryIdBySlug = new Map<string, string>();
    for (let i = 0; i < categorySeed.length; i += 1) {
      const category = categorySeed[i];
      const existing = await db
        .select({ id: blogCategories.id })
        .from(blogCategories)
        .where(eq(blogCategories.slug, category.slug))
        .limit(1);
      const categoryId =
        existing[0]?.id ??
        (
          await db
            .insert(blogCategories)
            .values({ slug: category.slug, sortOrder: i, active: true })
            .returning({ id: blogCategories.id })
        )[0].id;
      categoryIdBySlug.set(category.slug, categoryId);

      for (const locale of ["en", "es", "ca"] as const) {
        await db
          .insert(blogCategoryI18n)
          .values({ categoryId, locale, label: category.labels[locale] })
          .onConflictDoUpdate({
            target: [blogCategoryI18n.categoryId, blogCategoryI18n.locale],
            set: { label: category.labels[locale] },
          });
      }
    }

    const byLocale = {
      en: getBlogStarterArticles("en"),
      es: getBlogStarterArticles("es"),
      ca: getBlogStarterArticles("ca"),
    } as const;

    for (let i = 0; i < byLocale.en.length; i += 1) {
      const enPost = byLocale.en[i];
      const [post] = await db
        .insert(blogPosts)
        .values({
          slug: enPost.slug,
          categoryId: categoryIdBySlug.get(enPost.categorySlug) ?? null,
          status: "published",
          published: true,
          sortOrder: i,
          publishedAt: enPost.publishedAt,
          primaryImageUrl: enPost.primaryImageUrl,
          primaryImageAlt: enPost.primaryImageAlt,
          primaryImageObjectPosition: "center",
          articleImageUrls: JSON.stringify(enPost.articleImageUrls),
        })
        .returning({ id: blogPosts.id });

      for (const locale of ["en", "es", "ca"] as const) {
        const localized = byLocale[locale][i] ?? enPost;
        await db.insert(blogPostI18n).values({
          postId: post.id,
          locale,
          title: localized.title,
          excerpt: localized.excerpt,
          body: localized.body,
          seoTitle: localized.seoTitle,
          seoDescription: localized.seoDescription,
        });
      }
    }
  } catch {
    // Leave pages functional even if starter sync fails.
  }
}
