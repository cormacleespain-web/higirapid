import JsonLd from "@/components/seo/JsonLd";
import { getSiteOrigin } from "@/lib/seo/site-url";
import type { BlogPostDTO } from "@/lib/site-data";

export default function BlogArticleJsonLd({
  locale,
  post,
  wordCount,
}: {
  locale: string;
  post: BlogPostDTO;
  wordCount: number;
}) {
  const base = getSiteOrigin();
  const url = `${base}/${locale}/blog/${post.slug}`;
  const image =
    post.primaryImageUrl && post.primaryImageUrl.startsWith("http")
      ? post.primaryImageUrl
      : post.primaryImageUrl
        ? `${base}${post.primaryImageUrl.startsWith("/") ? post.primaryImageUrl : `/${post.primaryImageUrl}`}`
        : undefined;

  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt ?? undefined,
    dateModified: post.publishedAt ?? undefined,
    wordCount,
    author: {
      "@type": "Organization",
      name: "HigiRapid",
      url: base,
    },
    publisher: {
      "@type": "Organization",
      name: "HigiRapid",
      url: base,
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    ...(image ? { image: [image] } : {}),
  };

  return <JsonLd data={article} />;
}
