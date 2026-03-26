import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { getPublishedBlogPostBySlug } from "@/lib/site-data";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";

type Props = { params: Promise<{ locale: string; slug: string }> };

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("blog");

  const post = await getPublishedBlogPostBySlug(locale, slug);
  if (!post) notFound();

  const paragraphs = post.body.split("\n\n").filter(Boolean);

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      <Link href="/blog" className="inline-flex text-sm font-medium text-primary hover:underline">
        {t("backToBlog")}
      </Link>
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
          />
        </div>
      ) : null}
      {post.articleImageUrls.length > 0 ? (
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {post.articleImageUrls.map((url, index) => (
            <div key={`${url}-${index}`} className="relative aspect-[4/3] overflow-hidden rounded-lg border border-border bg-surface-subtle">
              <Image src={url} alt={`${post.title} image ${index + 1}`} fill className="object-cover" sizes="(min-width: 640px) 50vw, 100vw" />
            </div>
          ))}
        </div>
      ) : null}
      <div className="mt-8 space-y-5 text-content-primary leading-8">
        {paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}
