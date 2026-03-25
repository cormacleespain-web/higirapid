import { headers } from "next/headers";

const WINDOW_MS = 60_000;
const MAX_REQUESTS = 40;

const buckets = new Map<string, { count: number; resetAt: number }>();

function clientKey(): string {
  return "translate-limit";
}

/** Rate limit translate actions per client IP (or single bucket when IP missing). */
export async function checkAdminTranslateRateLimit(): Promise<boolean> {
  const h = await headers();
  const forwarded = h.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || h.get("x-real-ip") || clientKey();
  const now = Date.now();
  const b = buckets.get(ip);
  if (!b || now > b.resetAt) {
    buckets.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (b.count >= MAX_REQUESTS) {
    return false;
  }
  b.count += 1;
  return true;
}
