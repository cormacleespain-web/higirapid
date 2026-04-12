"use client";

import Link from "next/link";
import { useTransition } from "react";
import { toast } from "sonner";
import { saveBlogPostAction } from "../../actions";

type Locale = "en" | "es" | "ca";
const locales: Locale[] = ["en", "es", "ca"];

function parseImageLines(value: string | null | undefined): string {
  if (!value) return "";
  try {
    const parsed = JSON.parse(value);
    if (!Array.isArray(parsed)) return "";
    return parsed.filter((item): item is string => typeof item === "string").join("\n");
  } catch {
    return "";
  }
}

type Props = {
  post: {
    id: string;
    slug: string;
    categoryId: string | null;
    sortOrder: number;
    published: boolean;
    primaryImageUrl: string | null;
    primaryImageAlt: string | null;
    primaryImageObjectPosition: string | null;
    articleImageUrls: string | null;
  } | null;
  categories: Array<{ id: string; slug: string; label: string }>;
  i18n: Array<{
    locale: string;
    title: string;
    excerpt: string;
    body: string;
    seoTitle: string | null;
    seoDescription: string | null;
  }>;
};

export default function BlogPostForm({ post, categories, i18n }: Props) {
  const [pending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const result = await saveBlogPostAction(formData);
      if (!result.ok) {
        toast.error(result.error ?? "Could not save post.");
        return;
      }
      toast.success("Post saved — stored in the database.");
    });
  }

  const byLocale = (loc: Locale) => i18n.find((row) => row.locale === loc);

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
      {post && <input type="hidden" name="id" value={post.id} />}

      <section className="rounded-lg border border-border bg-surface-primary p-4">
        <h2 className="text-base font-semibold text-content-primary">Post settings</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="slug" className="block text-sm font-medium text-content-primary">
              Slug
            </label>
            <input
              id="slug"
              name="slug"
              defaultValue={post?.slug ?? ""}
              required
              className="focus-ring mt-1 w-full rounded-md border border-border bg-surface-primary px-3 py-2"
            />
          </div>
          <div>
            <label htmlFor="sort_order" className="block text-sm font-medium text-content-primary">
              Sort order
            </label>
            <input
              id="sort_order"
              name="sort_order"
              type="number"
              defaultValue={post?.sortOrder ?? 0}
              className="focus-ring mt-1 w-full rounded-md border border-border bg-surface-primary px-3 py-2"
            />
          </div>
          <div>
            <label htmlFor="category_id" className="block text-sm font-medium text-content-primary">
              Category
            </label>
            <select
              id="category_id"
              name="category_id"
              defaultValue={post?.categoryId ?? ""}
              className="focus-ring mt-1 w-full rounded-md border border-border bg-surface-primary px-3 py-2"
            >
              <option value="">Select category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="primary_image_url" className="block text-sm font-medium text-content-primary">
              Primary image URL
            </label>
            <input
              id="primary_image_url"
              name="primary_image_url"
              defaultValue={post?.primaryImageUrl ?? ""}
              placeholder="/images/blog-example.png"
              className="focus-ring mt-1 w-full rounded-md border border-border bg-surface-primary px-3 py-2"
            />
            <p className="mt-1 text-xs text-content-secondary">Use an existing path now. Upload flow can be wired to this field later.</p>
          </div>
          <div>
            <label htmlFor="primary_image_alt" className="block text-sm font-medium text-content-primary">
              Primary image alt text
            </label>
            <input
              id="primary_image_alt"
              name="primary_image_alt"
              defaultValue={post?.primaryImageAlt ?? ""}
              className="focus-ring mt-1 w-full rounded-md border border-border bg-surface-primary px-3 py-2"
            />
          </div>
        </div>
        <div className="mt-4">
          <label htmlFor="primary_image_object_position" className="block text-sm font-medium text-content-primary">
            Primary image position
          </label>
          <select
            id="primary_image_object_position"
            name="primary_image_object_position"
            defaultValue={post?.primaryImageObjectPosition ?? "center"}
            className="focus-ring mt-1 w-full rounded-md border border-border bg-surface-primary px-3 py-2 sm:max-w-xs"
          >
            <option value="center">Center</option>
            <option value="bottom">Bottom</option>
          </select>
        </div>
        <div className="mt-4">
          <label htmlFor="article_image_urls" className="block text-sm font-medium text-content-primary">
            Article images (ordered, one URL per line)
          </label>
          <textarea
            id="article_image_urls"
            name="article_image_urls"
            rows={4}
            defaultValue={parseImageLines(post?.articleImageUrls)}
            className="focus-ring mt-1 w-full rounded-md border border-border bg-surface-primary px-3 py-2"
          />
          <p className="mt-1 text-xs text-content-secondary">
            These images are shown on the article page in the same order. Set the main hero image separately above.
          </p>
        </div>
        <label className="mt-3 inline-flex items-center gap-2 text-sm text-content-primary">
          <input
            type="checkbox"
            name="published"
            defaultChecked={post?.published ?? true}
            className="h-4 w-4 rounded border-border text-primary"
          />
          Published
        </label>
      </section>

      {locales.map((loc) => (
        <section key={loc} className="rounded-lg border border-border bg-surface-primary p-4">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-content-secondary">{loc}</h3>
          {loc !== "en" && (
            <p className="mt-1 text-xs text-content-secondary">
              Add localized content for this language. Empty fields fall back to English.
            </p>
          )}
          <div className="mt-3 space-y-3">
            <div>
              <label htmlFor={`title_${loc}`} className="block text-xs text-content-secondary">
                Title
              </label>
              <input
                id={`title_${loc}`}
                name={`title_${loc}`}
                defaultValue={byLocale(loc)?.title ?? ""}
                className="focus-ring mt-1 w-full rounded-md border border-border bg-surface-primary px-3 py-2"
              />
            </div>
            <div>
              <label htmlFor={`excerpt_${loc}`} className="block text-xs text-content-secondary">
                Excerpt
              </label>
              <textarea
                id={`excerpt_${loc}`}
                name={`excerpt_${loc}`}
                rows={3}
                defaultValue={byLocale(loc)?.excerpt ?? ""}
                className="focus-ring mt-1 w-full rounded-md border border-border bg-surface-primary px-3 py-2"
              />
            </div>
            <div>
              <label htmlFor={`body_${loc}`} className="block text-xs text-content-secondary">
                Body (paragraphs separated by blank lines)
              </label>
              <textarea
                id={`body_${loc}`}
                name={`body_${loc}`}
                rows={10}
                defaultValue={byLocale(loc)?.body ?? ""}
                className="focus-ring mt-1 w-full rounded-md border border-border bg-surface-primary px-3 py-2"
              />
            </div>
            <div>
              <label htmlFor={`seo_title_${loc}`} className="block text-xs text-content-secondary">
                SEO title
              </label>
              <input
                id={`seo_title_${loc}`}
                name={`seo_title_${loc}`}
                defaultValue={byLocale(loc)?.seoTitle ?? ""}
                className="focus-ring mt-1 w-full rounded-md border border-border bg-surface-primary px-3 py-2"
              />
            </div>
            <div>
              <label htmlFor={`seo_description_${loc}`} className="block text-xs text-content-secondary">
                SEO description
              </label>
              <textarea
                id={`seo_description_${loc}`}
                name={`seo_description_${loc}`}
                rows={2}
                defaultValue={byLocale(loc)?.seoDescription ?? ""}
                className="focus-ring mt-1 w-full rounded-md border border-border bg-surface-primary px-3 py-2"
              />
            </div>
          </div>
        </section>
      ))}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={pending}
          className="focus-ring rounded-md bg-primary px-4 py-2 text-sm font-medium text-content-inverse hover:opacity-90 disabled:opacity-50"
        >
          {pending ? "Saving…" : "Save post"}
        </button>
        <Link
          href="/admin/blog"
          className="focus-ring rounded-md border border-border px-4 py-2 text-sm text-content-secondary hover:bg-surface-primary"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
