"use client";

import Link from "next/link";
import { useMemo, useState, useTransition } from "react";
import { updateBlogSortOrderAction, deleteBlogPostFormAction } from "../../actions";
import { AdminConfirmDeleteForm } from "@/components/admin/AdminConfirmDeleteForm";

type BlogRow = {
  id: string;
  slug: string;
  title: string;
  published: boolean;
  sortOrder: number;
  categoryLabel: string | null;
  hasPrimaryImage: boolean;
};

export default function BlogOrderList({ initialRows }: { initialRows: BlogRow[] }) {
  const [rows, setRows] = useState(
    [...initialRows].sort((a, b) => a.sortOrder - b.sortOrder || a.slug.localeCompare(b.slug))
  );
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const isDirty = useMemo(
    () => rows.some((row, idx) => row.id !== initialRows[idx]?.id),
    [rows, initialRows]
  );

  function moveRow(index: number, direction: -1 | 1) {
    const next = index + direction;
    if (next < 0 || next >= rows.length) return;
    setMessage(null);
    setError(null);
    setRows((prev) => {
      const copy = [...prev];
      const [row] = copy.splice(index, 1);
      copy.splice(next, 0, row);
      return copy;
    });
  }

  function saveOrder() {
    setMessage(null);
    setError(null);
    startTransition(async () => {
      const result = await updateBlogSortOrderAction(rows.map((row) => row.id));
      if (!result.ok) {
        setError(result.error ?? "Could not save order.");
        return;
      }
      setMessage("Order saved. Blog cards now follow this sequence.");
    });
  }

  return (
    <div className="space-y-3">
      <p className="text-sm text-content-secondary">Change display order, then select Save order.</p>
      {message ? <p className="rounded-md bg-emerald-50 px-4 py-2 text-sm text-success">{message}</p> : null}
      {error ? <p className="rounded-md bg-red-50 px-4 py-2 text-sm text-error">{error}</p> : null}
      {rows.map((row, idx) => (
        <article
          key={row.id}
          className="rounded-lg border border-border bg-surface-primary p-4 shadow-sm flex items-center justify-between gap-4"
        >
          <div>
            <p className="font-medium text-content-primary">{row.title}</p>
            <p className="text-xs text-content-secondary mt-1">
              /blog/{row.slug} · {row.published ? "Published" : "Draft"} · Sort: {idx}
            </p>
            <p className="text-xs text-content-secondary mt-1">
              Category: {row.categoryLabel ?? "None"} · Primary image: {row.hasPrimaryImage ? "Set" : "Missing"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => moveRow(idx, -1)}
              disabled={idx === 0 || pending}
              className="focus-ring rounded-md border border-border px-2.5 py-1.5 text-sm hover:bg-surface-subtle disabled:opacity-40"
              aria-label={`Move ${row.title} up`}
            >
              Up
            </button>
            <button
              type="button"
              onClick={() => moveRow(idx, 1)}
              disabled={idx === rows.length - 1 || pending}
              className="focus-ring rounded-md border border-border px-2.5 py-1.5 text-sm hover:bg-surface-subtle disabled:opacity-40"
              aria-label={`Move ${row.title} down`}
            >
              Down
            </button>
            <Link
              href={`/admin/blog/${row.id}`}
              className="focus-ring rounded-md border border-border px-3 py-1.5 text-sm hover:bg-surface-subtle"
            >
              Edit
            </Link>
            <AdminConfirmDeleteForm
              action={deleteBlogPostFormAction}
              confirmMessage="Delete this blog post? This cannot be undone."
            >
              <input type="hidden" name="id" value={row.id} />
              <button
                type="submit"
                className="focus-ring rounded-md border border-error/40 px-3 py-1.5 text-sm text-error hover:bg-error/10"
              >
                Delete
              </button>
            </AdminConfirmDeleteForm>
          </div>
        </article>
      ))}
      <div className="pt-2">
        <button
          type="button"
          onClick={saveOrder}
          disabled={!isDirty || pending}
          className="focus-ring rounded-md bg-primary px-4 py-2 text-sm font-medium text-content-inverse hover:opacity-90 disabled:opacity-50"
        >
          {pending ? "Saving order..." : "Save order"}
        </button>
      </div>
    </div>
  );
}
