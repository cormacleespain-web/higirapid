"use client";

import Link from "next/link";
import { useState } from "react";
import { ServiceIconChoice } from "@/components/admin/ServiceIconChoice";
import { saveServiceAction, translateServiceCopyAction } from "../../actions";
import type { InferSelectModel } from "drizzle-orm";
import { serviceOfferingI18n, serviceOfferings } from "@/db/schema";
import { localeNames, type Locale } from "@/i18n/config";

type ServiceRow = InferSelectModel<typeof serviceOfferings>;
type I18nRow = InferSelectModel<typeof serviceOfferingI18n>;

const LOCALES = ["en", "es", "ca"] as const;

export default function ServiceForm({
  service,
  i18n,
  translationEnabled,
}: {
  service: ServiceRow | null;
  i18n: I18nRow[];
  translationEnabled: boolean;
}) {
  const byLocale = (loc: string) => i18n.find((r) => r.locale === loc);

  const [titles, setTitles] = useState<Record<(typeof LOCALES)[number], string>>({
    en: byLocale("en")?.title ?? "",
    es: byLocale("es")?.title ?? "",
    ca: byLocale("ca")?.title ?? "",
  });
  const [descriptions, setDescriptions] = useState<Record<(typeof LOCALES)[number], string>>({
    en: byLocale("en")?.description ?? "",
    es: byLocale("es")?.description ?? "",
    ca: byLocale("ca")?.description ?? "",
  });
  const [sourceLocale, setSourceLocale] = useState<Locale>("en");
  const [message, setMessage] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [translatePending, setTranslatePending] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage(null);
    const form = e.currentTarget;
    const fd = new FormData(form);
    for (const loc of LOCALES) {
      fd.set(`title_${loc}`, titles[loc]);
      fd.set(`description_${loc}`, descriptions[loc]);
    }
    setPending(true);
    try {
      await saveServiceAction(fd);
      setMessage("Saved. The public site will update shortly.");
    } finally {
      setPending(false);
    }
  }

  async function suggestTranslations() {
    setMessage(null);
    if (!titles[sourceLocale].trim() && !descriptions[sourceLocale].trim()) {
      setMessage("Add a title or description in the source language first.");
      return;
    }
    setTranslatePending(true);
    try {
      const res = await translateServiceCopyAction({
        sourceLocale,
        title: titles[sourceLocale],
        description: descriptions[sourceLocale],
      });
      if (!res.ok) {
        setMessage(res.error ?? "Translation failed");
        return;
      }
      setTitles((prev) => {
        const next = { ...prev };
        for (const loc of LOCALES) {
          if (loc === sourceLocale) continue;
          const t = res.translations[loc];
          if (t?.title) next[loc] = t.title;
        }
        return next;
      });
      setDescriptions((prev) => {
        const next = { ...prev };
        for (const loc of LOCALES) {
          if (loc === sourceLocale) continue;
          const t = res.translations[loc];
          if (t?.description) next[loc] = t.description;
        }
        return next;
      });
      setMessage(
        "Translations suggested for the other languages. Review them, then save. Machine translation—always review before publishing."
      );
    } finally {
      setTranslatePending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-8">
      {service && <input type="hidden" name="id" value={service.id} />}

      {message && (
        <p
          className={`rounded-md px-4 py-2 text-sm ${
            message.includes("failed") || message.includes("Unauthorized") || message.includes("not configured")
              ? "bg-red-50 text-error"
              : "bg-emerald-50 text-success"
          }`}
          role="status"
        >
          {message}
        </p>
      )}

      <section className="space-y-4 rounded-lg border border-border bg-surface-primary p-4 shadow-sm">
        <h2 className="text-base font-semibold text-content-primary">What customers see</h2>
        <p className="text-sm text-content-secondary">
          These titles and descriptions appear on the services section of the homepage. Fill at least one language;
          empty fields fall back to English if present.
        </p>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="published"
            name="published"
            value="true"
            defaultChecked={service?.published !== false}
            className="h-4 w-4 rounded border-border text-primary"
          />
          <label htmlFor="published" className="text-sm text-content-primary">
            Published (visible on the website)
          </label>
        </div>

        {translationEnabled ? (
          <div className="rounded-md border border-border bg-surface-subtle/80 p-3">
            <p className="text-sm font-medium text-content-primary">Suggest translations</p>
            <p className="mt-1 text-xs text-content-secondary">
              Text is sent to DeepL. Review before saving.
            </p>
            <div className="mt-2 flex flex-wrap items-end gap-3">
              <div>
                <label htmlFor="svc-source-locale" className="block text-xs font-medium text-content-secondary">
                  From
                </label>
                <select
                  id="svc-source-locale"
                  value={sourceLocale}
                  onChange={(e) => setSourceLocale(e.target.value as Locale)}
                  className="focus-ring mt-1 rounded-md border border-border bg-surface-primary px-3 py-2 text-sm"
                >
                  {LOCALES.map((loc) => (
                    <option key={loc} value={loc}>
                      {localeNames[loc]}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="button"
                disabled={translatePending || pending}
                onClick={() => void suggestTranslations()}
                className="focus-ring rounded-md border border-primary bg-primary/10 px-3 py-2 text-sm font-medium text-primary hover:bg-primary/15 disabled:opacity-50"
              >
                {translatePending ? "Working…" : "Suggest translations for other languages"}
              </button>
            </div>
          </div>
        ) : null}

        {LOCALES.map((loc) => (
          <div key={loc} className="rounded-lg border border-border bg-surface-subtle/50 p-4">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-content-secondary">
              {localeNames[loc]} ({loc})
            </h3>
            <div className="mt-3 space-y-3">
              <div>
                <label className="block text-xs text-content-secondary" htmlFor={`title_${loc}`}>
                  Title
                </label>
                <input
                  id={`title_${loc}`}
                  value={titles[loc]}
                  onChange={(e) => setTitles((p) => ({ ...p, [loc]: e.target.value }))}
                  className="focus-ring mt-1 w-full rounded-md border border-border bg-surface-primary px-3 py-2 text-content-primary"
                />
              </div>
              <div>
                <label className="block text-xs text-content-secondary" htmlFor={`description_${loc}`}>
                  Description
                </label>
                <textarea
                  id={`description_${loc}`}
                  rows={4}
                  value={descriptions[loc]}
                  onChange={(e) => setDescriptions((p) => ({ ...p, [loc]: e.target.value }))}
                  className="focus-ring mt-1 w-full rounded-md border border-border bg-surface-primary px-3 py-2 text-content-primary"
                />
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="space-y-4 rounded-lg border border-border bg-surface-subtle/40 p-4 shadow-sm">
        <h2 className="text-base font-semibold text-content-primary">Advanced</h2>
        <p className="text-sm text-content-secondary">
          URL segment and ordering. Only change these if you are comfortable with how links work.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="slug" className="block text-sm font-medium text-content-primary">
              URL key (slug)
            </label>
            <input
              id="slug"
              name="slug"
              required
              defaultValue={service?.slug ?? ""}
              className="focus-ring mt-1 w-full rounded-md border border-border bg-surface-primary px-3 py-2 text-content-primary"
              placeholder="upholstery-cleaning"
            />
            <p className="mt-1 text-xs text-content-secondary">Short phrase in the address bar, lowercase, no spaces.</p>
          </div>
          <div>
            <label htmlFor="sort_order" className="block text-sm font-medium text-content-primary">
              Sort order
            </label>
            <input
              id="sort_order"
              name="sort_order"
              type="number"
              defaultValue={service?.sortOrder ?? 0}
              className="focus-ring mt-1 w-full rounded-md border border-border bg-surface-primary px-3 py-2 text-content-primary"
            />
            <p className="mt-1 text-xs text-content-secondary">Lower numbers appear first.</p>
          </div>
        </div>

        <ServiceIconChoice defaultValue={service?.iconKey ?? "upholstery"} />
      </section>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={pending}
          className="focus-ring rounded-md bg-primary px-4 py-2 text-sm font-medium text-content-inverse hover:opacity-90 disabled:opacity-50"
        >
          {pending ? "Saving…" : "Save service"}
        </button>
        <Link
          href="/admin/services"
          className="focus-ring rounded-md border border-border px-4 py-2 text-sm text-content-secondary hover:bg-surface-primary"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
