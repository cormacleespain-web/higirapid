import Link from "next/link";
import { getAllBlogPostsAdmin } from "@/lib/admin-queries";
import { isDatabaseConfigured } from "@/db/index";
import BlogOrderList from "./BlogOrderList";

export default async function AdminBlogPage() {
  const dbOk = isDatabaseConfigured();
  const rows = dbOk ? await getAllBlogPostsAdmin() : [];
  const listRows = rows.map(({ post, i18n, category }) => ({
    id: post.id,
    slug: post.slug,
    title: i18n.find((x) => x.locale === "en")?.title ?? post.slug,
    published: post.published,
    sortOrder: post.sortOrder,
    categoryLabel: category?.label ?? null,
    hasPrimaryImage: Boolean(post.primaryImageUrl),
  }));

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold text-content-primary">Blog posts</h1>
          <p className="mt-1 text-sm text-content-secondary">
            Manage blog articles, edit copy for each language, and control homepage/blog order.
          </p>
        </div>
        <Link
          href="/admin/blog/new"
          className="focus-ring rounded-md bg-primary px-4 py-2 text-sm font-medium text-content-inverse hover:opacity-90"
        >
          Add post
        </Link>
      </div>

      {!dbOk && <p className="mt-6 text-sm text-amber-800">Set DATABASE_URL and run migrations to manage posts.</p>}

      {dbOk && listRows.length === 0 ? (
        <div className="mt-6 rounded-lg border border-border bg-surface-primary p-6 text-sm text-content-secondary">
          No blog posts yet. Create your first post, then reorder it here.
        </div>
      ) : null}

      {dbOk && listRows.length > 0 ? <div className="mt-6"><BlogOrderList initialRows={listRows} /></div> : null}
    </div>
  );
}
