"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { AdminImageField } from "@/components/admin/AdminImageField";
import { saveSiteSettingsAction } from "../../actions";

export default function SiteSettingsForm({
  defaultWhatsappDigits,
  initialContactEmail,
  initialHeroImageUrl,
  initialHrClubRecipientEmail,
}: {
  defaultWhatsappDigits: string;
  initialContactEmail: string;
  initialHeroImageUrl: string;
  initialHrClubRecipientEmail: string;
}) {
  const [heroUrl, setHeroUrl] = useState(initialHeroImageUrl);
  const [pending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const result = await saveSiteSettingsAction(formData);
      if (result.ok) {
        toast.success("Settings saved — stored in the database.");
      } else {
        toast.error(result.error ?? "Save failed. Please check your settings and try again.");
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-4">
      <div>
        <label htmlFor="whatsapp_e164" className="block text-sm font-medium text-content-primary">
          WhatsApp (digits only, country code included)
        </label>
        <input
          id="whatsapp_e164"
          name="whatsapp_e164"
          type="text"
          inputMode="numeric"
          required
          defaultValue={defaultWhatsappDigits}
          className="focus-ring mt-1 w-full rounded-md border border-border bg-surface-primary px-3 py-2 text-content-primary shadow-sm"
        />
        <p className="mt-1 text-xs text-content-secondary">Used for quote and contact links across the whole site.</p>
      </div>

      <div>
        <label htmlFor="contact_email" className="block text-sm font-medium text-content-primary">
          Contact email (optional)
        </label>
        <input
          id="contact_email"
          name="contact_email"
          type="email"
          defaultValue={initialContactEmail}
          className="focus-ring mt-1 w-full rounded-md border border-border bg-surface-primary px-3 py-2 text-content-primary shadow-sm"
        />
      </div>

      <div>
        <label htmlFor="hr_club_recipient_email" className="block text-sm font-medium text-content-primary">
          HR-Club recipient email
        </label>
        <input
          id="hr_club_recipient_email"
          name="hr_club_recipient_email"
          type="email"
          defaultValue={initialHrClubRecipientEmail}
          className="focus-ring mt-1 w-full rounded-md border border-border bg-surface-primary px-3 py-2 text-content-primary shadow-sm"
        />
        <p className="mt-1 text-xs text-content-secondary">
          New HR-Club and service booking leads are emailed here. Leave blank to use{" "}
          <code className="rounded bg-surface-subtle px-1">HR_CLUB_RECIPIENT_EMAIL</code> or{" "}
          <code className="rounded bg-surface-subtle px-1">CONTACT_EMAIL</code> from the server (e.g. Vercel env).
        </p>
      </div>

      <div>
        <span className="block text-sm font-medium text-content-primary">Homepage hero image</span>
        <p className="mt-1 text-xs text-content-secondary">
          This is the large photo behind the headline on the homepage. You can upload a new file or paste a link under
          Advanced.
        </p>
        <div className="mt-3">
          <AdminImageField
            name="hero_image_url"
            value={heroUrl}
            onChange={setHeroUrl}
            variant="hero"
            builtInFallbackSrc="/images/hero.png"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="focus-ring rounded-md bg-primary px-4 py-2 text-sm font-medium text-content-inverse hover:opacity-90 disabled:opacity-50"
      >
        {pending ? "Saving…" : "Save settings"}
      </button>
    </form>
  );
}
