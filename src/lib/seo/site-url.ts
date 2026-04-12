/** Canonical production host for sitemaps, metadata, and JSON-LD (www preferred). */
export const DEFAULT_SITE_ORIGIN = "https://www.higirapid.es";

export function getSiteOrigin(): string {
  const configured = process.env.NEXT_PUBLIC_BASE_URL?.trim();
  if (configured) return configured.replace(/\/+$/, "");
  return DEFAULT_SITE_ORIGIN;
}

/** True when the deployment should be indexed (production only on Vercel; local dev allowed). */
export function shouldAllowIndexing(): boolean {
  const v = process.env.VERCEL_ENV;
  if (v === "preview") return false;
  return true;
}
