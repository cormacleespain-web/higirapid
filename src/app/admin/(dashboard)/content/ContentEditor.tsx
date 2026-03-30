"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { CONTENT_GROUPS, LOCALES } from "@/lib/content-admin-keys";
import type { ContentDefaultsMap } from "@/lib/content-defaults";
import { localeNames, type Locale } from "@/i18n/config";
import { saveContentEntriesAction, translateContentSectionAction } from "../../actions";
import { parseFaqOrder } from "@/lib/faq-content";
import FaqItemsAdmin from "./FaqItemsAdmin";

function cellKey(locale: string, entryKey: string) {
  return `${locale}::${entryKey}`;
}

function visibleGroups() {
  return CONTENT_GROUPS;
}

export default function ContentEditor({
  initialRows,
  defaults,
  translationEnabled,
}: {
  initialRows: { entryKey: string; locale: string; value: string }[];
  defaults: ContentDefaultsMap;
  translationEnabled: boolean;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [translatePending, setTranslatePending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [sourceLocale, setSourceLocale] = useState<Locale>("en");
  const [previewLocale, setPreviewLocale] = useState<Locale>("en");

  const groups = useMemo(() => visibleGroups(), []);
  const safeIndex = activeSectionIndex >= groups.length ? 0 : activeSectionIndex;
  const activeGroup = groups[safeIndex] ?? groups[0];

  const initialMap = useMemo(() => {
    const m: Record<string, string> = {};
    for (const r of initialRows) {
      m[cellKey(r.locale, r.entryKey)] = r.value;
    }
    return m;
  }, [initialRows]);

  const [values, setValues] = useState<Record<string, string>>(initialMap);

  function setCell(locale: string, entryKey: string, value: string) {
    setValues((prev) => ({ ...prev, [cellKey(locale, entryKey)]: value }));
  }

  function buildEntriesForGroup(groupId: string) {
    const group = CONTENT_GROUPS.find((g) => g.id === groupId);
    if (!group) return [];
    const entries: { entryKey: string; locale: string; value: string }[] = [];
    for (const field of group.fields) {
      for (const loc of LOCALES) {
        const v = values[cellKey(loc, field.key)] ?? "";
        entries.push({ entryKey: field.key, locale: loc, value: v });
      }
    }
    return entries;
  }

  function effectiveValue(loc: Locale, key: string): string {
    const override = (values[cellKey(loc, key)] ?? "").trim();
    const fallback = (defaults[loc][key] ?? "").trim();
    return override || fallback || "";
  }

  function sectionSnapshot(loc: Locale, mobile: boolean) {
    const c = (key: string) => effectiveValue(loc, key);
    const shell = mobile ? "mx-auto max-w-[360px]" : "max-w-full";
    switch (activeGroup.id) {
      case "hero":
        return (
          <div className={`${shell} space-y-3 rounded-xl border border-border bg-surface-primary p-4`}>
            <h4 className={`${mobile ? "text-xl" : "text-2xl"} font-bold text-content-primary`}>{c("hero.headline")}</h4>
            <p className="text-sm text-content-secondary">{c("hero.subhead")}</p>
            <div className={`flex ${mobile ? "flex-col" : "flex-row"} gap-2`}>
              <span className="rounded-md bg-primary px-3 py-2 text-xs font-medium text-content-inverse">{c("hero.ctaQuote")}</span>
              <span className="rounded-md border border-border px-3 py-2 text-xs font-medium text-content-primary">{c("hero.ctaContactUs")}</span>
            </div>
          </div>
        );
      case "process":
        return (
          <div className={`${shell} space-y-3 rounded-xl border border-border bg-surface-primary p-4`}>
            <h4 className={`${mobile ? "text-lg" : "text-xl"} font-bold text-content-primary`}>{c("process.title")}</h4>
            <p className="text-sm text-content-secondary">{c("process.subtitle")}</p>
            {[1, 2, 3].map((n) => (
              <div key={n} className="rounded-md border border-border bg-surface-subtle p-3">
                <p className="text-sm font-medium text-content-primary">{c(`process.step${n}.title`)}</p>
                <p className="mt-1 text-xs text-content-secondary">{c(`process.step${n}.description`)}</p>
              </div>
            ))}
          </div>
        );
      case "faq": {
        const orderRaw =
          (values[cellKey(loc, "faq.order")] ?? "").trim() || (defaults[loc]["faq.order"] ?? "").trim();
        const slots = parseFaqOrder(orderRaw || null);
        return (
          <div className={`${shell} space-y-3 rounded-xl border border-border bg-surface-primary p-4`}>
            <h4 className={`${mobile ? "text-lg" : "text-xl"} font-bold text-content-primary`}>{c("faq.title")}</h4>
            {slots.map((n) => (
              <div key={n} className="rounded-md border border-border bg-surface-subtle p-3">
                <p className="text-sm font-medium text-content-primary">{c(`faq.q${n}`)}</p>
                <p className="mt-1 text-xs text-content-secondary">{c(`faq.a${n}`)}</p>
              </div>
            ))}
          </div>
        );
      }
      case "hrClubTeaser":
        return (
          <div className={`${shell} space-y-3 rounded-xl border border-border bg-[#50d9b2] p-4`}>
            <h4 className={`${mobile ? "text-lg" : "text-xl"} font-bold text-white`}>{c("hrClubTeaser.title")}</h4>
            <p className="text-sm text-white/90">{c("hrClubTeaser.subtitle")}</p>
            <ul className="space-y-1 text-xs text-white/95">
              <li>• {c("hrClubTeaser.benefit1")}</li>
              <li>• {c("hrClubTeaser.benefit2")}</li>
              <li>• {c("hrClubTeaser.benefit3")}</li>
            </ul>
            <span className="inline-flex rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-content-inverse">
              {c("hrClubTeaser.cta")}
            </span>
          </div>
        );
      default:
        return (
          <div className={`${shell} space-y-3 rounded-xl border border-border bg-surface-primary p-4`}>
            <h4 className={`${mobile ? "text-lg" : "text-xl"} font-bold text-content-primary`}>
              {c(`${activeGroup.id}.title`) || activeGroup.title}
            </h4>
            <p className="text-sm text-content-secondary">{c(`${activeGroup.id}.subtitle`)}</p>
          </div>
        );
    }
  }

  function saveGroup(groupId: string) {
    setMessage(null);
    const entries = buildEntriesForGroup(groupId);
    startTransition(async () => {
      const res = await saveContentEntriesAction(entries);
      if (res.ok) {
        setMessage("Saved. The public site will update shortly.");
        router.refresh();
      } else {
        setMessage(res.error ?? "Save failed");
      }
    });
  }

  async function suggestTranslationsForSection() {
    if (!activeGroup) return;
    setMessage(null);
    const fields = activeGroup.fields
      .filter((field) => field.key !== "faq.order")
      .map((field) => {
        const override = (values[cellKey(sourceLocale, field.key)] ?? "").trim();
        const fallback = (defaults[sourceLocale][field.key] ?? "").trim();
        const text = override || fallback;
        return { entryKey: field.key, text };
      });

    setTranslatePending(true);
    try {
      const res = await translateContentSectionAction({
        sourceLocale,
        fields,
      });
      if (!res.ok) {
        setMessage(res.error ?? "Translation failed");
        return;
      }
      const { updates } = res;
      setValues((prev) => {
        const next = { ...prev };
        for (const u of updates) {
          next[cellKey(u.locale, u.entryKey)] = u.value;
        }
        return next;
      });
      setMessage(
        "Translations suggested for the other languages. Review them, then save this section. Machine translation—always review before publishing."
      );
    } finally {
      setTranslatePending(false);
    }
  }

  if (!activeGroup) {
    return <p className="text-sm text-content-secondary">No sections to show.</p>;
  }

  return (
    <div className="space-y-6">
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

      <div className="flex flex-wrap gap-1 border-b border-border pb-2">
        {groups.map((g, i) => (
          <button
            key={g.id}
            type="button"
            onClick={() => setActiveSectionIndex(i)}
            className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              i === safeIndex
                ? "bg-primary/15 text-primary"
                : "text-content-secondary hover:bg-surface-primary hover:text-content-primary"
            }`}
          >
            {g.title}
          </button>
        ))}
      </div>

      <section className="space-y-8">
        <div>
          <h2 className="font-heading text-xl font-bold text-content-primary">{activeGroup.title}</h2>
          <p className="mt-1 text-xs text-content-secondary">
            “Website default” is the built-in text. Your override replaces it for that language only. Leave “Your
            text” empty to use the default.
          </p>
        </div>

        {translationEnabled ? (
          <div className="rounded-lg border border-border bg-surface-primary p-4 shadow-sm">
            <p className="text-sm font-medium text-content-primary">Suggest translations</p>
            <p className="mt-1 text-xs text-content-secondary">
              Uses your “Your text” for the chosen language, or the website default if that field is empty. Text is sent
              to DeepL; review results before saving.
            </p>
            <div className="mt-3 flex flex-wrap items-end gap-3">
              <div>
                <label htmlFor="copy-source-locale" className="block text-xs font-medium text-content-secondary">
                  Translate from
                </label>
                <select
                  id="copy-source-locale"
                  value={sourceLocale}
                  onChange={(e) => setSourceLocale(e.target.value as Locale)}
                  className="focus-ring mt-1 rounded-md border border-border bg-surface-primary px-3 py-2 text-sm text-content-primary"
                >
                  {LOCALES.map((loc) => (
                    <option key={loc} value={loc}>
                      {localeNames[loc as Locale]}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="button"
                disabled={translatePending || pending}
                onClick={() => void suggestTranslationsForSection()}
                className="focus-ring rounded-md border border-primary bg-primary/10 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/15 disabled:opacity-50"
              >
                {translatePending ? "Working…" : "Suggest translations for other languages"}
              </button>
            </div>
          </div>
        ) : null}

        <div className="space-y-8">
          {activeGroup.id === "faq" ? (
            <>
              {activeGroup.fields
                .filter((f) => f.key === "faq.title")
                .map((field) => (
                  <div
                    key={field.key}
                    className="rounded-lg border border-border bg-surface-primary p-4 shadow-sm"
                  >
                    <div className="flex flex-wrap items-baseline gap-2">
                      <p className="text-sm font-medium text-content-primary">{field.label}</p>
                      {LOCALES.some((loc) => (values[cellKey(loc, field.key)] ?? "").trim() !== "") && (
                        <span className="rounded bg-amber-100 px-1.5 py-0.5 text-xs font-medium text-amber-900">
                          Custom text
                        </span>
                      )}
                    </div>
                    {field.hint && <p className="mt-1 text-xs text-content-secondary">{field.hint}</p>}
                    <div className="mt-4 grid gap-6 md:grid-cols-3">
                      {LOCALES.map((loc) => {
                        const def = defaults[loc][field.key] ?? "";
                        const overrideVal = values[cellKey(loc, field.key)] ?? "";
                        return (
                          <div key={loc} className="space-y-2">
                            <p className="text-xs font-semibold uppercase tracking-wide text-content-secondary">
                              {localeNames[loc as Locale]} ({loc})
                            </p>
                            <div>
                              <p className="text-xs text-content-secondary">Website default</p>
                              <div className="mt-1 rounded-md border border-border bg-surface-subtle px-3 py-2 text-sm text-content-secondary">
                                {def || (
                                  <span className="italic text-content-secondary/70">
                                    No default string in translations
                                  </span>
                                )}
                              </div>
                            </div>
                            <div>
                              <label className="text-xs text-content-secondary" htmlFor={cellKey(loc, field.key)}>
                                Your text
                              </label>
                              <textarea
                                id={cellKey(loc, field.key)}
                                name={cellKey(loc, field.key)}
                                rows={2}
                                value={overrideVal}
                                onChange={(e) => setCell(loc, field.key, e.target.value)}
                                placeholder="Leave empty to use the default above"
                                className="focus-ring mt-1 w-full rounded-md border border-border bg-surface-primary px-3 py-2 text-sm text-content-primary placeholder:text-content-secondary/60"
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              <FaqItemsAdmin values={values} setCell={setCell} defaults={defaults} />
            </>
          ) : (
            activeGroup.fields.map((field) => (
              <div
                key={field.key}
                className="rounded-lg border border-border bg-surface-primary p-4 shadow-sm"
              >
                <div className="flex flex-wrap items-baseline gap-2">
                  <p className="text-sm font-medium text-content-primary">{field.label}</p>
                  {LOCALES.some((loc) => (values[cellKey(loc, field.key)] ?? "").trim() !== "") && (
                    <span className="rounded bg-amber-100 px-1.5 py-0.5 text-xs font-medium text-amber-900">
                      Custom text
                    </span>
                  )}
                </div>
                {field.hint && <p className="mt-1 text-xs text-content-secondary">{field.hint}</p>}
                <div className="mt-4 grid gap-6 md:grid-cols-3">
                  {LOCALES.map((loc) => {
                    const def = defaults[loc][field.key] ?? "";
                    const overrideVal = values[cellKey(loc, field.key)] ?? "";
                    return (
                      <div key={loc} className="space-y-2">
                        <p className="text-xs font-semibold uppercase tracking-wide text-content-secondary">
                          {localeNames[loc as Locale]} ({loc})
                        </p>
                        <div>
                          <p className="text-xs text-content-secondary">Website default</p>
                          <div className="mt-1 rounded-md border border-border bg-surface-subtle px-3 py-2 text-sm text-content-secondary">
                            {def || (
                              <span className="italic text-content-secondary/70">No default string in translations</span>
                            )}
                          </div>
                        </div>
                        <div>
                          <label className="text-xs text-content-secondary" htmlFor={cellKey(loc, field.key)}>
                            Your text
                          </label>
                          <textarea
                            id={cellKey(loc, field.key)}
                            name={cellKey(loc, field.key)}
                            rows={
                              field.key.includes("description") || field.key.startsWith("faq.a") ? 4 : 2
                            }
                            value={overrideVal}
                            onChange={(e) => setCell(loc, field.key, e.target.value)}
                            placeholder="Leave empty to use the default above"
                            className="focus-ring mt-1 w-full rounded-md border border-border bg-surface-primary px-3 py-2 text-sm text-content-primary placeholder:text-content-secondary/60"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>

        <button
          type="button"
          disabled={pending}
          onClick={() => saveGroup(activeGroup.id)}
          className="focus-ring rounded-md bg-primary px-4 py-2 text-sm font-medium text-content-inverse hover:opacity-90 disabled:opacity-50"
        >
          {pending ? "Saving…" : `Save “${activeGroup.title}”`}
        </button>
        <button
          type="button"
          onClick={() => setPreviewOpen(true)}
          className="focus-ring ml-2 rounded-md border border-border px-4 py-2 text-sm font-medium text-content-primary hover:bg-surface-subtle"
        >
          Preview
        </button>
      </section>

      {previewOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[85vh] w-full max-w-5xl overflow-auto rounded-lg border border-border bg-surface-primary p-5 shadow-lg">
            <h3 className="font-heading text-xl font-bold text-content-primary">{activeGroup.title} preview</h3>
            <p className="mt-1 text-sm text-content-secondary">
              Snapshot preview of the actual section layout.
            </p>
            <div className="mt-3">
              <label htmlFor="preview-locale" className="block text-xs font-medium text-content-secondary">
                Preview locale
              </label>
              <select
                id="preview-locale"
                value={previewLocale}
                onChange={(e) => setPreviewLocale(e.target.value as Locale)}
                className="focus-ring mt-1 rounded-md border border-border bg-surface-primary px-3 py-2 text-sm text-content-primary"
              >
                {LOCALES.map((loc) => (
                  <option key={loc} value={loc}>
                    {localeNames[loc as Locale]} ({loc})
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-4 grid gap-6 lg:grid-cols-2">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-content-secondary">Desktop</p>
                {sectionSnapshot(previewLocale, false)}
              </div>
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-content-secondary">Mobile</p>
                {sectionSnapshot(previewLocale, true)}
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setPreviewOpen(false)}
                className="focus-ring rounded-md border border-border px-4 py-2 text-sm font-medium text-content-secondary hover:bg-surface-subtle"
              >
                Close
              </button>
              <button
                type="button"
                disabled={pending}
                onClick={() => {
                  saveGroup(activeGroup.id);
                  setPreviewOpen(false);
                }}
                className="focus-ring rounded-md bg-primary px-4 py-2 text-sm font-medium text-content-inverse hover:opacity-90 disabled:opacity-50"
              >
                {pending ? "Saving…" : "Save changes"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
