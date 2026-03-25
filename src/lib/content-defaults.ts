import en from "@/i18n/messages/en.json";
import es from "@/i18n/messages/es.json";
import ca from "@/i18n/messages/ca.json";
import { CONTENT_GROUPS, LOCALES } from "@/lib/content-admin-keys";

/** Locale → entryKey → default string from translation JSON (same paths as `useMergedT` namespaces). */
export type ContentDefaultsMap = Record<(typeof LOCALES)[number], Record<string, string>>;

function getStringAtPath(obj: unknown, path: string): string {
  const parts = path.split(".");
  let cur: unknown = obj;
  for (const p of parts) {
    if (cur === null || typeof cur !== "object") return "";
    cur = (cur as Record<string, unknown>)[p];
  }
  return typeof cur === "string" ? cur : "";
}

export function getContentDefaultsForAdmin(): ContentDefaultsMap {
  const byLocale = { en, es, ca } as const;
  const keys = new Set<string>();
  for (const g of CONTENT_GROUPS) {
    for (const f of g.fields) keys.add(f.key);
  }
  const out: ContentDefaultsMap = { en: {}, es: {}, ca: {} };
  for (const loc of LOCALES) {
    const messages = byLocale[loc];
    for (const key of keys) {
      out[loc][key] = getStringAtPath(messages, key);
    }
  }
  return out;
}
