import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getPublishedBlogPosts } from "@/lib/site-data";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { locales, type Locale } from "@/i18n/config";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string }>;
};

export async function generateMetadata({ params }: Pick<Props, "params">): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = locales.includes(locale as Locale) ? (locale as Locale) : "en";
  const baseUrl = (process.env.NEXT_PUBLIC_BASE_URL || "https://higirapid.es").replace(/\/+$/, "");
  const canonicalPath = `/${safeLocale}/blog`;

  return {
    alternates: {
      canonical: `${baseUrl}${canonicalPath}`,
      languages: Object.fromEntries(
        locales.map((altLocale) => [altLocale, `${baseUrl}/${altLocale}/blog`])
      ) as Record<Locale, string>,
    },
  };
}

export default async function BlogIndexPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const { category: categoryQuery } = await searchParams;
  setRequestLocale(locale);
  const t = await getTranslations("blog");
  const list = await getPublishedBlogPosts(locale);
  const selectedCategory = (categoryQuery ?? "all").toLowerCase();
  const dynamicCategories = new Map<string, string>();
  for (const post of list) {
    if (!post.categorySlug) continue;
    dynamicCategories.set(post.categorySlug, post.categoryLabel ?? post.categorySlug);
  }
  const categories = [
    { slug: "all", label: t("categoryAll") },
    ...Array.from(dynamicCategories.entries()).map(([slug, label]) => ({ slug, label })),
  ].filter((category) => Boolean(category.slug));
  const filteredList =
    selectedCategory === "all"
      ? list
      : list.filter((post) => (post.categorySlug ?? "").toLowerCase() === selectedCategory);
  const [featured, ...rest] = filteredList;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      <h1 className="text-4xl md:text-5xl font-bold text-content-primary">{t("title")}</h1>
      <p className="mt-3 text-content-secondary max-w-3xl">{t("subtitle")}</p>
      <nav className="mt-6 flex flex-wrap gap-2" aria-label={t("categoryNavLabel")}>
        {categories.map((category) => {
          const active = category.slug.toLowerCase() === selectedCategory;
          const href = category.slug === "all" ? "/blog" : `/blog?category=${encodeURIComponent(category.slug)}`;
          return (
            <Link
              key={category.slug}
              href={href}
              className={`inline-flex rounded-sm border px-4 py-1.5 text-sm font-medium transition-colors ${
                active
                  ? "border-content-primary bg-content-primary text-content-inverse"
                  : "border-border bg-surface-primary text-content-secondary hover:bg-surface-subtle"
              }`}
            >
              {category.label}
            </Link>
          );
        })}
      </nav>

      {filteredList.length === 0 ? (
        <div className="mt-8 rounded-lg border border-border bg-surface-primary p-6 text-content-secondary">
          {t("empty")}
        </div>
      ) : (
        <>
          {featured && (
            <article className="mt-8 grid gap-6 rounded-xl border border-border bg-surface-primary p-4 shadow-sm md:grid-cols-[1.05fr_1fr] md:p-6">
              <div className="relative aspect-[16/10] overflow-hidden rounded-md bg-surface-subtle">
                {featured.primaryImageUrl ? (
                  <Image
                    src={featured.primaryImageUrl}
                    alt={featured.primaryImageAlt ?? featured.title}
                    fill
                    className="object-cover"
                    style={{ objectPosition: featured.primaryImageObjectPosition ?? "center" }}
                    sizes="(min-width: 768px) 45vw, 100vw"
                  />
                ) : null}
              </div>
              <div className="flex flex-col">
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-content-secondary">
                  {featured.categoryLabel ?? t("uncategorized")}
                  {featured.publishedAt ? ` • ${new Date(featured.publishedAt).toLocaleDateString(locale)}` : ""}
                </p>
                <h2 className="mt-3 text-3xl font-bold leading-tight text-content-primary">{featured.title}</h2>
                <p className="mt-4 text-content-secondary">{featured.excerpt}</p>
                <Link
                  href={`/blog/${featured.slug}`}
                  className="mt-6 inline-flex w-fit rounded-md bg-content-primary px-4 py-2 text-sm font-medium text-content-inverse hover:opacity-90"
                >
                  {t("readMore")}
                </Link>
              </div>
            </article>
          )}
          <div className="mt-6 grid gap-4">
            {rest.map((post) => (
              <article key={post.slug} className="grid gap-4 rounded-lg border border-border bg-surface-primary p-4 shadow-sm sm:grid-cols-[180px_1fr]">
                <div className="relative aspect-[16/10] overflow-hidden rounded-md bg-surface-subtle">
                  {post.primaryImageUrl ? (
                    <Image
                      src={post.primaryImageUrl}
                      alt={post.primaryImageAlt ?? post.title}
                      fill
                      className="object-cover"
                      style={{ objectPosition: post.primaryImageObjectPosition ?? "center" }}
                      sizes="180px"
                    />
                  ) : null}
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.08em] text-content-secondary">
                    {post.categoryLabel ?? t("uncategorized")}
                    {post.publishedAt ? ` • ${new Date(post.publishedAt).toLocaleDateString(locale)}` : ""}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold text-content-primary">{post.title}</h3>
                  <p className="mt-2 text-content-secondary">{post.excerpt}</p>
                  <Link href={`/blog/${post.slug}`} className="mt-4 inline-flex text-sm font-medium text-primary hover:underline">
                    {t("readMore")}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
