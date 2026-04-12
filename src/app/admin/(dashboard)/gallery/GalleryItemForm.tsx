"use client";

import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { AdminImageField } from "@/components/admin/AdminImageField";
import { saveGalleryItemAction } from "../../actions";
import type { InferSelectModel } from "drizzle-orm";
import { galleryItemI18n, galleryItems } from "@/db/schema";

type ItemRow = InferSelectModel<typeof galleryItems>;
type GI18n = InferSelectModel<typeof galleryItemI18n>;

const CATEGORIES = [
  { value: "car", label: "Cars" },
  { value: "upholstery", label: "Sofas & upholstery" },
  { value: "carpet", label: "Carpets" },
  { value: "rug", label: "Rugs" },
  { value: "business", label: "Business" },
] as const;

export default function GalleryItemForm({
  item,
  i18n,
}: {
  item: ItemRow | null;
  i18n: GI18n[];
}) {
  const byLocale = (loc: string) => i18n.find((r) => r.locale === loc);
  const [imageUrl, setImageUrl] = useState(item?.imageUrl ?? "");
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    fd.set("image_url", imageUrl);
    setPending(true);
    try {
      const res = await saveGalleryItemAction(fd);
      if (!res.ok) {
        toast.error(res.error ?? "Could not save.");
        return;
      }
      toast.success("Gallery item saved — stored in the database.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      {item && <input type="hidden" name="id" value={item.id} />}

      <div>
        <span className="block text-sm font-medium text-content-primary">Photo</span>
        <p className="mt-1 text-xs text-content-secondary">
          Describe the image for accessibility in “Short description for screen readers” below (required).
        </p>
        <div className="mt-3">
          <AdminImageField value={imageUrl} onChange={setImageUrl} variant="gallery" />
        </div>
      </div>

      <div>
        <label htmlFor="image_alt" className="block text-sm font-medium text-content-primary">
          Short description for screen readers (required)
        </label>
        <input
          id="image_alt"
          name="image_alt"
          required
          defaultValue={item?.imageAlt ?? ""}
          className="focus-ring mt-1 w-full rounded-md border border-border bg-surface-primary px-3 py-2 text-content-primary"
        />
        <p className="mt-1 text-xs text-content-secondary">
          Helps visitors who use assistive technology understand the photo.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-content-primary">
            Category
          </label>
          <select
            id="category"
            name="category"
            required
            defaultValue={item?.category ?? "upholstery"}
            className="focus-ring mt-1 w-full rounded-md border border-border bg-surface-primary px-3 py-2 text-content-primary"
          >
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="object_position" className="block text-sm font-medium text-content-primary">
            Photo crop focus
          </label>
          <select
            id="object_position"
            name="object_position"
            defaultValue={item?.objectPosition ?? ""}
            className="focus-ring mt-1 w-full rounded-md border border-border bg-surface-primary px-3 py-2 text-content-primary"
          >
            <option value="">Automatic (centre)</option>
            <option value="bottom">Lower part of the photo</option>
            <option value="center">Centre of the photo</option>
          </select>
          <p className="mt-1 text-xs text-content-secondary">
            Adjust if the important part of the image is cut off in the grid.
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="price_from" className="block text-sm font-medium text-content-primary">
            From price (€)
          </label>
          <input
            id="price_from"
            name="price_from"
            type="number"
            required
            min={0}
            defaultValue={item?.priceFrom ?? 0}
            className="focus-ring mt-1 w-full rounded-md border border-border bg-surface-primary px-3 py-2 text-content-primary"
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
            defaultValue={item?.sortOrder ?? 0}
            className="focus-ring mt-1 w-full rounded-md border border-border bg-surface-primary px-3 py-2 text-content-primary"
          />
          <p className="mt-1 text-xs text-content-secondary">Lower numbers appear first in the gallery.</p>
        </div>
      </div>

      {(["en", "es", "ca"] as const).map((loc) => (
        <div key={loc}>
          <label className="block text-sm font-medium text-content-primary" htmlFor={`caption_${loc}`}>
            Caption ({loc})
          </label>
          <input
            id={`caption_${loc}`}
            name={`caption_${loc}`}
            defaultValue={byLocale(loc)?.caption ?? ""}
            className="focus-ring mt-1 w-full rounded-md border border-border bg-surface-primary px-3 py-2 text-content-primary"
          />
          <p className="mt-1 text-xs text-content-secondary">Optional short line shown with the image on the site.</p>
        </div>
      ))}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={pending || !imageUrl.trim()}
          className="focus-ring rounded-md bg-primary px-4 py-2 text-sm font-medium text-content-inverse hover:opacity-90 disabled:opacity-50"
        >
          {pending ? "Saving…" : "Save gallery item"}
        </button>
        <Link
          href="/admin/gallery"
          className="focus-ring rounded-md border border-border px-4 py-2 text-sm text-content-secondary hover:bg-surface-primary"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
