import Link from "next/link";
import { getAllServicesAdmin } from "@/lib/admin-queries";
import { isDatabaseConfigured } from "@/db/index";
import ServicesOrderList from "./ServicesOrderList";

export default async function AdminServicesPage() {
  const dbOk = isDatabaseConfigured();
  const rows = dbOk ? await getAllServicesAdmin() : [];

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold text-content-primary">Services</h1>
          <p className="mt-1 text-sm text-content-secondary">
            Cards on the homepage services section. Edit titles and descriptions in each language; advanced options
            control links. Drag rows below to change display order.
          </p>
        </div>
        <Link
          href="/admin/services/new"
          className="focus-ring rounded-md bg-primary px-4 py-2 text-sm font-medium text-content-inverse hover:opacity-90"
        >
          Add service
        </Link>
      </div>

      {!dbOk && (
        <p className="mt-6 text-sm text-amber-800">Set DATABASE_URL and run migrations to manage services.</p>
      )}

      <ServicesOrderList
        initial={rows.map(({ service, i18n }) => ({
          id: service.id,
          slug: service.slug,
          sortOrder: service.sortOrder,
          published: service.published,
          title: i18n.find((r) => r.locale === "en")?.title ?? service.slug,
        }))}
      />

      {dbOk && rows.length === 0 && (
        <p className="mt-8 text-sm text-content-secondary">
          No services in the database yet. Add one or run{" "}
          <code className="rounded bg-surface-subtle px-1 font-mono text-xs">npm run db:seed</code> to import defaults.
        </p>
      )}
    </div>
  );
}
