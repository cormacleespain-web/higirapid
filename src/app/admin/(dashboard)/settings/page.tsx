import { getSiteSettingsRow } from "@/lib/admin-queries";
import { isDatabaseConfigured } from "@/db/index";
import SiteSettingsForm from "./SiteSettingsForm";

export default async function AdminSettingsPage() {
  const row = await getSiteSettingsRow();
  const dbOk = isDatabaseConfigured();

  const defaultWa =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "") ?? "34600000000";

  return (
    <div className="max-w-xl">
      <h1 className="font-heading text-2xl font-bold text-content-primary">Site settings</h1>
      <p className="mt-2 text-sm text-content-secondary">
        Phone number for WhatsApp and the large homepage photo. Other wording on the site is under{" "}
        <a className="text-primary hover:underline" href="/admin/content">
          Page copy
        </a>
        .
      </p>

      {!dbOk && (
        <p className="mt-4 text-sm text-amber-800">Connect DATABASE_URL to persist settings.</p>
      )}

      <SiteSettingsForm
        defaultWhatsappDigits={row?.whatsappE164?.replace(/\D/g, "") ?? defaultWa}
        initialContactEmail={row?.contactEmail ?? ""}
        initialHeroImageUrl={row?.heroImageUrl ?? ""}
      />
    </div>
  );
}
