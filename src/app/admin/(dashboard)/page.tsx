import Link from "next/link";
import { isDatabaseConfigured } from "@/db/index";

export default function AdminHomePage() {
  const dbOk = isDatabaseConfigured();

  return (
    <div className="max-w-2xl">
      <h1 className="font-heading text-2xl font-bold text-content-primary">Dashboard</h1>
      <p className="mt-2 text-sm text-content-secondary">
        Quick guide: use <strong className="font-medium text-content-primary">Site settings</strong> for WhatsApp
        number, email, and the big homepage photo. Use <strong className="font-medium text-content-primary">Page copy</strong>{" "}
        for headlines and section wording (with the built-in text shown as reference). Use{" "}
        <strong className="font-medium text-content-primary">Gallery</strong> for photos of jobs and{" "}
        <strong className="font-medium text-content-primary">Services</strong> for the service cards.
      </p>

      {!dbOk && (
        <div
          className="mt-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900"
          role="status"
        >
          <strong className="font-medium">DATABASE_URL is not set.</strong> The public site still uses JSON and static
          assets. Add a Neon connection string and run{" "}
          <code className="rounded bg-surface-subtle px-1 font-mono text-xs">npm run db:migrate</code> to enable the
          admin CMS.
        </div>
      )}

      <ul className="mt-8 space-y-3 text-sm">
        <li>
          <Link href="/admin/settings" className="font-medium text-primary hover:underline">
            Site settings
          </Link>
          <span className="text-content-secondary"> — WhatsApp, contact email, homepage hero image</span>
        </li>
        <li>
          <Link href="/admin/content" className="font-medium text-primary hover:underline">
            Page copy
          </Link>
          <span className="text-content-secondary">
            {" "}
            — Section titles, FAQ, testimonials (defaults shown next to your edits)
          </span>
        </li>
        <li>
          <Link href="/admin/services" className="font-medium text-primary hover:underline">
            Services
          </Link>
          <span className="text-content-secondary"> — Homepage service cards in EN / ES / CA</span>
        </li>
        <li>
          <Link href="/admin/gallery" className="font-medium text-primary hover:underline">
            Gallery
          </Link>
          <span className="text-content-secondary"> — Job photos, captions, prices, upload or replace images</span>
        </li>
      </ul>
    </div>
  );
}
