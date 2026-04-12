"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { AdminConfirmDeleteForm } from "@/components/admin/AdminConfirmDeleteForm";
import { deleteServiceFormAction, updateServiceSortOrderAction } from "../../actions";

type ServiceItem = {
  id: string;
  slug: string;
  sortOrder: number;
  published: boolean;
  title: string;
};

function arrayMove<T>(arr: T[], from: number, to: number) {
  const next = [...arr];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}

export default function ServicesOrderList({ initial }: { initial: ServiceItem[] }) {
  const [items, setItems] = useState(initial);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);

  const dirty = useMemo(
    () => items.some((item, idx) => item.id !== initial[idx]?.id),
    [items, initial]
  );

  async function saveOrder() {
    setSaving(true);
    try {
      const res = await updateServiceSortOrderAction(items.map((x) => x.id));
      if (!res.ok) {
        toast.error(res.error ?? "Could not save order.");
        return;
      }
      toast.success("Services order saved — stored in the database.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mt-8 space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm text-content-secondary">
          Drag services to reorder how they appear on the website.
        </p>
        <button
          type="button"
          disabled={!dirty || saving}
          onClick={() => void saveOrder()}
          className="focus-ring rounded-md bg-primary px-3 py-2 text-sm font-medium text-content-inverse disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save order"}
        </button>
      </div>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li
            key={item.id}
            draggable
            onDragStart={() => setDragIndex(index)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => {
              if (dragIndex === null || dragIndex === index) return;
              setItems((prev) => arrayMove(prev, dragIndex, index));
              setDragIndex(null);
            }}
            className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-border bg-surface-primary px-4 py-3 shadow-sm"
          >
            <div className="min-w-0">
              <span className="mr-2 cursor-grab select-none text-content-secondary">::</span>
              <span className="font-medium text-content-primary">{item.title}</span>
              <span className="ml-2 text-sm text-content-secondary">{item.slug}</span>
              {item.published ? (
                <span className="ml-2 rounded bg-emerald-100 px-1.5 py-0.5 text-xs font-medium text-emerald-800">
                  Live
                </span>
              ) : (
                <span className="ml-2 rounded bg-amber-100 px-1.5 py-0.5 text-xs font-medium text-amber-900">
                  Draft
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Link
                href={`/admin/services/${item.id}`}
                className="focus-ring text-sm font-medium text-primary hover:underline"
              >
                Edit
              </Link>
              <AdminConfirmDeleteForm
                action={deleteServiceFormAction}
                confirmMessage="Delete this service? This cannot be undone."
              >
                <input type="hidden" name="id" value={item.id} />
                <button type="submit" className="focus-ring text-sm text-error hover:underline" title="Delete">
                  Delete
                </button>
              </AdminConfirmDeleteForm>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
