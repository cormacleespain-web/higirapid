"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { CONTENT_GROUPS, LOCALES } from "@/lib/content-admin-keys";
import type { ContentDefaultsMap } from "@/lib/content-defaults";
import { localeNames, type Locale } from "@/i18n/config";
import { saveContentEntriesAction, translateContentSectionAction } from "../../actions";

function cellKey(locale: string, entryKey: string) {
  return `${locale}::${entryKey}`;
}

function visibleGroups(showAllSections: boolean) {
  return CONTENT_GROUPS.filter((g) => showAllSections || g.editorTier === "essential");
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
  const [showAllSections, setShowAllSections] = useState(false);
  const [showFieldKeys, setShowFieldKeys] = useState(false);
  const [sourceLocale, setSourceLocale] = useState<Locale>("en");

  const groups = useMemo(() => visibleGroups(showAllSections), [showAllSections]);
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
    const fields = activeGroup.fields.map((field) => {
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

      <div className="flex flex-wrap items-center gap-4">
        <label className="flex cursor-pointer items-center gap-2 text-sm text-content-secondary">
          <input
            type="checkbox"
            checked={showAllSections}
            onChange={(e) => {
              setShowAllSections(e.target.checked);
              setActiveSectionIndex(0);
            }}
            className="h-4 w-4 rounded border-border text-primary"
          />
          Show all sections (FAQ, testimonials, process, areas, …)
        </label>
        <label className="flex cursor-pointer items-center gap-2 text-sm text-content-secondary">
          <input
            type="checkbox"
            checked={showFieldKeys}
            onChange={(e) => setShowFieldKeys(e.target.checked)}
            className="h-4 w-4 rounded border-border text-primary"
          />
          Show field keys (for support)
        </label>
      </div>

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
          {activeGroup.fields.map((field) => (
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
              {showFieldKeys && (
                <p className="mt-1 font-mono text-xs text-content-secondary/80">{field.key}</p>
              )}

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
          ))}
        </div>

        <button
          type="button"
          disabled={pending}
          onClick={() => saveGroup(activeGroup.id)}
          className="focus-ring rounded-md bg-primary px-4 py-2 text-sm font-medium text-content-inverse hover:opacity-90 disabled:opacity-50"
        >
          {pending ? "Saving…" : `Save “${activeGroup.title}”`}
        </button>
      </section>
    </div>
  );
}
