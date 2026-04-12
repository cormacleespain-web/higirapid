import type { Metadata } from "next";
import { locales, type Locale } from "@/i18n/config";
import { getSiteOrigin } from "@/lib/seo/site-url";

const OG_LOCALE: Record<Locale, string> = {
  es: "es_ES",
  ca: "ca_ES",
  en: "en_GB",
};

export type PageMetadataOptions = {
  locale: Locale;
  /** Path after locale, e.g. `""` for home, `"/services"`, `"/blog/post-slug"`. Must start with `/` or be empty. */
  pathAfterLocale: string;
  title: string;
  description: string;
  ogType?: "website" | "article";
  /** Path starting with / for default share image */
  ogImagePath?: string;
  /** Full URL for remote images (e.g. blob); takes precedence over ogImagePath */
  ogImageAbsoluteUrl?: string | null;
  article?: { publishedTime?: string; modifiedTime?: string };
};

function normalizePathAfterLocale(path: string): string {
  if (!path || path === "/") return "";
  return path.startsWith("/") ? path : `/${path}`;
}

/**
 * Self-referencing canonical per locale, full hreflang cluster + x-default → Spanish URL for the same path.
 */
export function buildPageMetadata(opts: PageMetadataOptions): Metadata {
  const base = getSiteOrigin();
  const suffix = normalizePathAfterLocale(opts.pathAfterLocale);
  const canonical = `${base}/${opts.locale}${suffix}`;
  const languages: Record<string, string> = {
    ...Object.fromEntries(
      locales.map((loc) => [`${loc}`, `${base}/${loc}${suffix}`])
    ),
    "x-default": `${base}/es${suffix}`,
  };

  const imagePath = opts.ogImagePath ?? "/images/hero.png";
  const ogImageUrl =
    opts.ogImageAbsoluteUrl?.trim() ||
    (imagePath.startsWith("http") ? imagePath : `${base}${imagePath.startsWith("/") ? imagePath : `/${imagePath}`}`);

  const openGraph = {
    type: opts.ogType ?? "website",
    locale: OG_LOCALE[opts.locale],
    url: canonical,
    siteName: "HigiRapid",
    title: opts.title,
    description: opts.description,
    images: [{ url: ogImageUrl, width: 1200, height: 630, alt: opts.title }],
    ...(opts.ogType === "article" && opts.article
      ? {
          publishedTime: opts.article.publishedTime,
          modifiedTime: opts.article.modifiedTime,
        }
      : {}),
  } satisfies NonNullable<Metadata["openGraph"]>;

  return {
    title: opts.title,
    description: opts.description,
    alternates: {
      canonical,
      languages,
    },
    openGraph,
    twitter: {
      card: "summary_large_image",
      title: opts.title,
      description: opts.description,
      images: [ogImageUrl],
    },
  };
}
