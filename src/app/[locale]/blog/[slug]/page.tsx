import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { getPublishedBlogPostBySlug } from "@/lib/site-data";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/config";
import { routing } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo/build-page-metadata";
import Breadcrumb from "@/components/seo/Breadcrumb";
import BlogArticleJsonLd from "@/components/seo/BlogArticleJsonLd";

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!routing.locales.includes(locale as Locale)) return {};
  const post = await getPublishedBlogPostBySlug(locale, slug);
  if (!post) return {};
  const title = post.seoTitle?.trim() || `${post.title} | HigiRapid`;
  const description = post.seoDescription?.trim() || post.excerpt;
  const primary = post.primaryImageUrl?.trim();
  const remote = primary?.startsWith("http");
  return buildPageMetadata({
    locale: locale as Locale,
    pathAfterLocale: `/blog/${slug}`,
    title,
    description,
    ogType: "article",
    ogImagePath: primary && !remote ? primary : "/images/hero.png",
    ogImageAbsoluteUrl: remote ? primary : null,
    article: {
      publishedTime: post.publishedAt ?? undefined,
      modifiedTime: post.publishedAt ?? undefined,
    },
  });
}

function wordCountFromBody(body: string): number {
  return body.trim().split(/\s+/).filter(Boolean).length;
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("blog");
  const tCommon = await getTranslations({ locale, namespace: "common" });

  const post = await getPublishedBlogPostBySlug(locale, slug);
  if (!post) notFound();

  const paragraphs = post.body.split("\n\n").filter(Boolean);
  const wc = wordCountFromBody(post.body);

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      <BlogArticleJsonLd locale={locale} post={post} wordCount={wc} />
      <Breadcrumb
        locale={locale}
        items={[
          { label: tCommon("breadcrumbHome"), path: "/" },
          { label: t("title"), path: "/blog" },
          { label: post.title, path: `/blog/${slug}` },
        ]}
      />
      <div className="mt-4 flex items-center gap-3 text-xs uppercase tracking-[0.08em] text-content-secondary">
        <span>{post.categoryLabel ?? t("uncategorized")}</span>
        {post.publishedAt ? <span>• {new Date(post.publishedAt).toLocaleDateString(locale)}</span> : null}
      </div>
      <h1 className="mt-3 text-3xl md:text-4xl font-bold text-content-primary">{post.title}</h1>
      <p className="mt-3 text-lg text-content-secondary">{post.excerpt}</p>
      {post.primaryImageUrl ? (
        <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-xl border border-border bg-surface-subtle">
          <Image
            src={post.primaryImageUrl}
            alt={post.primaryImageAlt ?? post.title}
            fill
            className="object-cover"
            style={{ objectPosition: post.primaryImageObjectPosition ?? "center" }}
            sizes="(min-width: 1024px) 768px, 100vw"
            priority
          />
        </div>
      ) : null}
      {post.articleImageUrls.length > 0 ? (
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {post.articleImageUrls.map((url, index) => (
            <div
              key={`${url}-${index}`}
              className="relative aspect-[4/3] overflow-hidden rounded-lg border border-border bg-surface-subtle"
            >
              <Image
                src={url}
                alt={t("articleGalleryAlt", { n: index + 1, title: post.title })}
                fill
                className="object-cover"
                sizes="(min-width: 640px) 50vw, 100vw"
              />
            </div>
          ))}
        </div>
      ) : null}
      <div className="mt-8 space-y-5 text-content-primary leading-8">
        {paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
      <aside className="mt-12 rounded-lg border border-border bg-surface-subtle p-5 text-sm text-content-secondary">
        <p className="font-semibold text-content-primary">{t("relatedHeading")}</p>
        <div className="mt-3 flex flex-wrap gap-4">
          <Link href="/services" className="text-primary font-medium hover:underline">
            {t("relatedServicesLink")}
          </Link>
          <Link href="/facade-cleaning" className="text-primary font-medium hover:underline">
            {t("relatedFacadeLink")}
          </Link>
        </div>
      </aside>
    </article>
  );
}
