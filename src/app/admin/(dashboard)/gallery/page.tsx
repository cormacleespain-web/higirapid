import Link from "next/link";
import { getAllGalleryAdmin } from "@/lib/admin-queries";
import { isDatabaseConfigured } from "@/db/index";
import { AdminConfirmDeleteForm } from "@/components/admin/AdminConfirmDeleteForm";
import { deleteGalleryItemFormAction } from "../../actions";

const CATEGORY_LABELS: Record<string, string> = {
  car: "Cars",
  upholstery: "Sofas & upholstery",
  carpet: "Carpets",
  rug: "Rugs",
  business: "Business",
};

export default async function AdminGalleryPage() {
  const dbOk = isDatabaseConfigured();
  const rows = dbOk ? await getAllGalleryAdmin() : [];

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold text-content-primary">Gallery</h1>
          <p className="mt-1 text-sm text-content-secondary">
            Photos of your work, captions in each language, and starting prices. Upload or replace images on the edit
            screen.
          </p>
        </div>
        <Link
          href="/admin/gallery/new"
          className="focus-ring rounded-md bg-primary px-4 py-2 text-sm font-medium text-content-inverse hover:opacity-90"
        >
          Add item
        </Link>
      </div>

      {!dbOk && (
        <p className="mt-6 text-sm text-amber-800">Set DATABASE_URL and run migrations to manage gallery.</p>
      )}

      <ul className="mt-8 space-y-2">
        {rows.map(({ item, i18n }) => {
          const cap = i18n.find((r) => r.locale === "en")?.caption ?? item.imageAlt;
          const catLabel = CATEGORY_LABELS[item.category] ?? item.category;
          return (
            <li
              key={item.id}
              className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-border bg-surface-primary px-4 py-3 shadow-sm"
            >
              <div className="flex min-w-0 flex-1 items-center gap-4">
                <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-md border border-border bg-surface-subtle">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.imageUrl} alt="" className="h-full w-full object-cover" />
                </div>
                <div className="min-w-0">
                  <span className="block font-medium text-content-primary">{cap}</span>
                  <span className="mt-0.5 block text-sm text-content-secondary">
                    {catLabel} · From €{item.priceFrom}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href={`/admin/gallery/${item.id}`}
                  className="focus-ring text-sm font-medium text-primary hover:underline"
                >
                  Edit
                </Link>
                <AdminConfirmDeleteForm
                  action={deleteGalleryItemFormAction}
                  confirmMessage="Delete this gallery photo? This cannot be undone."
                >
                  <input type="hidden" name="id" value={item.id} />
                  <button type="submit" className="focus-ring text-sm text-error hover:underline">
                    Delete
                  </button>
                </AdminConfirmDeleteForm>
              </div>
            </li>
          );
        })}
      </ul>

      {dbOk && rows.length === 0 && (
        <p className="mt-8 text-sm text-content-secondary">
          No gallery rows yet. Add one or run{" "}
          <code className="rounded bg-surface-subtle px-1 font-mono text-xs">npm run db:seed</code>.
        </p>
      )}
    </div>
  );
}
