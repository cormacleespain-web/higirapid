import type { MetadataRoute } from "next";
import { locales, type Locale } from "@/i18n/config";
import { getPublishedBlogPosts } from "@/lib/site-data";

const DEFAULT_BASE_URL = "https://higirapid.es";

function getBaseUrl(): string {
  const configured = process.env.NEXT_PUBLIC_BASE_URL?.trim() || DEFAULT_BASE_URL;
  return configured.replace(/\/+$/, "");
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getBaseUrl();
  const now = new Date();

  const staticPaths = ["", "/facade-cleaning", "/hr-club", "/blog", "/services"] as const;

  const staticEntries: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    staticPaths.map((path) => ({
      url: `${baseUrl}/${locale}${path}`,
      lastModified: now,
      alternates: {
        languages: Object.fromEntries(
          locales.map((altLocale) => [altLocale, `${baseUrl}/${altLocale}${path}`])
        ) as Record<Locale, string>,
      },
    }))
  );

  const blogEntries: MetadataRoute.Sitemap = [];
  for (const locale of locales) {
    const posts = await getPublishedBlogPosts(locale);
    for (const post of posts) {
      const path = `/blog/${post.slug}`;
      blogEntries.push({
        url: `${baseUrl}/${locale}${path}`,
        lastModified: post.publishedAt ? new Date(post.publishedAt) : now,
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
