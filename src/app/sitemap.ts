import type { MetadataRoute } from "next";
import { locales, type Locale } from "@/i18n/config";
import { getPublishedBlogPosts } from "@/lib/site-data";
import { getSiteOrigin } from "@/lib/seo/site-url";

function staticPriority(path: string): { changeFrequency: MetadataRoute.Sitemap[0]["changeFrequency"]; priority: number } {
  if (path === "") return { changeFrequency: "monthly", priority: 1 };
  if (path === "/blog") return { changeFrequency: "weekly", priority: 0.7 };
  return { changeFrequency: "monthly", priority: 0.8 };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getSiteOrigin();
  const now = new Date();

  const staticPaths = ["", "/facade-cleaning", "/hr-club", "/blog", "/services"] as const;

  const staticEntries: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    staticPaths.map((path) => {
      const { changeFrequency, priority } = staticPriority(path);
      return {
        url: `${baseUrl}/${locale}${path}`,
        lastModified: now,
        changeFrequency,
        priority,
        alternates: {
          languages: Object.fromEntries(
            locales.map((altLocale) => [altLocale, `${baseUrl}/${altLocale}${path}`])
          ) as Record<Locale, string>,
        },
      };
    })
  );

  const blogEntries: MetadataRoute.Sitemap = [];
  for (const locale of locales) {
    const posts = await getPublishedBlogPosts(locale);
    for (const post of posts) {
      const path = `/blog/${post.slug}`;
      blogEntries.push({
        url: `${baseUrl}/${locale}${path}`,
        lastModified: post.publishedAt ? new Date(post.publishedAt) : now,
        changeFrequency: "monthly",
        priority: 0.6,
        alternates: {
          languages: Object.fromEntries(
            locales.map((altLocale) => [altLocale, `${baseUrl}/${altLocale}${path}`])
          ) as Record<Locale, string>,
        },
      });
    }
  }

  return [...staticEntries, ...blogEntries];
}
