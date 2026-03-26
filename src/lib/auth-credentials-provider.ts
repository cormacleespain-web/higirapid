import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

const loginFailures = new Map<string, number[]>();
const FAILURE_WINDOW_MS = 15 * 60 * 1000;
const MAX_FAILURES = 10;

function rateLimitEnabled(): boolean {
  if (process.env.NODE_ENV !== "development") return true;
  // Dev: failed logins stack up quickly; set AUTH_RATE_LIMIT_IN_DEV=1 to test the limiter.
  return process.env.AUTH_RATE_LIMIT_IN_DEV === "1";
}

function isRateLimited(email: string): boolean {
  if (!rateLimitEnabled()) return false;
  const now = Date.now();
  const key = email.toLowerCase();
  const arr = (loginFailures.get(key) ?? []).filter((t) => now - t < FAILURE_WINDOW_MS);
  return arr.length >= MAX_FAILURES;
}

function recordFailure(email: string) {
  const now = Date.now();
  const key = email.toLowerCase();
  const arr = (loginFailures.get(key) ?? []).filter((t) => now - t < FAILURE_WINDOW_MS);
  arr.push(now);
  loginFailures.set(key, arr);
}

function clearFailures(email: string) {
  loginFailures.delete(email.toLowerCase());
}

/**
 * Modular crypt bcrypt: $2(a|b|x|y)$NN$ + 53 salt/hash chars (60 chars total).
 * `$2x$` appears in some interop hashes; `$2a$`/`$2b$`/`$2y$` are common.
 */
const BCRYPT_MCF_STRICT = /^\$2[abxy]\$\d{2}\$[./A-Za-z0-9]{53}$/;
const BCRYPT_MCF_FIND = /\$2[abxy]\$\d{2}\$[./A-Za-z0-9]{53}/;

/** Map fullwidth / confusable chars so pasted hashes match bcrypt’s alphabet. */
function coerceBcryptHashCharacters(h: string): string {
  let s = h.normalize("NFKC");
  s = s.replace(/\$\$/g, "$");
  s = s.replace(/\\\$/g, "$");
  s = s.replace(/[\uFF0E\u3002\uFE52\uFF61]/g, ".");
  s = s.replace(/[\uFF10-\uFF19]/g, (c) =>
    String.fromCharCode(c.charCodeAt(0) - 0xff10 + 0x30),
  );
  s = s.replace(/[\uFF21-\uFF3A\uFF41-\uFF5A]/g, (c) => {
    const cp = c.charCodeAt(0);
    return String.fromCharCode(cp - 0xfee0);
  });
  return s;
}

/**
 * Strip BOM, quotes, whitespace, `.env` line comments; extract bcrypt hash or repair leading `$`
 * lost to env `$VAR` expansion.
 */
function parseAdminBcryptHash(raw: string): string | null {
  if (!raw) return null;
  let h = raw
    .replace(/^\uFEFF/, "")
    .replace(/[\u200B-\u200D\uFEFF]/g, "")
    .trim();

  // Trailing `# …` on the same line is a common .env footgun (comment eats the hash tail).
  const hashComment = h.indexOf("#");
  if (hashComment !== -1) {
    h = h.slice(0, hashComment).trim();
  }

  while (
    (h.startsWith("'") && h.endsWith("'")) ||
    (h.startsWith('"') && h.endsWith('"'))
  ) {
    h = h.slice(1, -1).trim();
  }

  h = h.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  h = h.replace(/\s+/g, "");
  h = coerceBcryptHashCharacters(h);

  if (BCRYPT_MCF_STRICT.test(h)) return h;

  const found = h.match(BCRYPT_MCF_FIND);
  if (found) return found[0];

  // Unquoted .env: `$2b` / `$2a` / `$2y` can be parsed as empty `$VAR` refs — first `$` missing.
  if (/^2[abxy]\$\d{2}\$[./A-Za-z0-9]{53}$/.test(h)) {
    return `$${h}`;
  }

  return null;
}

function logHashParseHint(where: "plain" | "b64") {
  if (process.env.AUTH_DEBUG_LOGIN !== "1") return;
  const raw =
    where === "b64"
      ? process.env.ADMIN_PASSWORD_HASH_B64
      : process.env.ADMIN_PASSWORD_HASH;
  if (!raw?.trim()) return;
  const cleaned = raw
    .replace(/^\uFEFF/, "")
    .replace(/[\u200B-\u200D\uFEFF]/g, "")
    .trim()
    .split("#")[0]
    .trim();
  const inner = coerceBcryptHashCharacters(
    cleaned.replace(/\r\n/g, "\n").replace(/\r/g, "\n").replace(/\s+/g, ""),
  );
  const dollar = inner.indexOf("$");
  console.info(
    "[auth debug] hash parse failed:",
    where,
    "approxLen",
    inner.length,
    "firstDollarAt",
    dollar,
    "starts2b",
    inner.startsWith("2b$") || inner.startsWith("$2"),
  );
}

function stripEnvQuotes(s: string): string {
  let v = s.trim().replace(/^\uFEFF/, "");
  while (
    (v.startsWith("'") && v.endsWith("'")) ||
    (v.startsWith('"') && v.endsWith('"'))
  ) {
    v = v.slice(1, -1).trim();
  }
  return v;
}

/** If the hash was pasted into `ADMIN_PASSWORD_HASH` as base64 (no `$`), decode and parse. */
function tryParseHashFromLikelyBase64(raw: string): string | null {
  const t = stripEnvQuotes(raw)
    .split("#")[0]
    .trim()
    .replace(/\s+/g, "");
  if (t.includes("$")) return null;
  // Full bcrypt-as-utf8 base64 is ~88 chars; allow shorter attempts for odd pastes
  if (t.length < 32 || !/^[A-Za-z0-9+/]+=*$/.test(t)) return null;
  try {
    const decoded = Buffer.from(t, "base64").toString("utf8");
    return parseAdminBcryptHash(decoded);
  } catch {
    return null;
  }
}

/** Non-secret hint for misconfigured ADMIN_PASSWORD_HASH (length / shape only). */
function describeWrongHashEnvValue(raw: string): string {
  const t = coerceBcryptHashCharacters(
    stripEnvQuotes(raw)
      .split("#")[0]
      .trim()
      .replace(/\r\n/g, "\n")
      .replace(/\r/g, "\n")
      .replace(/\s+/g, ""),
  );
  const parts: string[] = [];
  parts.push(`length ${t.length} (bcrypt must be 60 chars)`);
  if (!t.includes("$")) {
    parts.push('no `$` — real bcrypt always starts with `$2a$`, `$2b$`, `$2x$`, or `$2y$`');
  }
  if (/^[0-9a-f]{32}$/i.test(t)) {
    parts.push("looks like 32-char hex (e.g. MD5) — that is not bcrypt; run `npm run admin:hash-password`");
  }
  if (/^[0-9a-f]{40}$/i.test(t)) {
    parts.push("looks like 40-char hex (e.g. SHA-1) — not bcrypt");
  }
  if (t.length > 0 && t.length < 60 && /^[A-Za-z0-9+/]+=*$/.test(t) && !t.includes("$")) {
    parts.push(
      "looks like base64 — put it in `ADMIN_PASSWORD_HASH_B64=...`, not `ADMIN_PASSWORD_HASH`",
    );
  }
  return parts.join("; ");
}

/**
 * Try `ADMIN_PASSWORD_HASH_B64` first (avoids `$` mangling in env). If B64 is set but invalid,
 * fall back to `ADMIN_PASSWORD_HASH` so a stale B64 line does not block a good plain hash.
 */
function resolveAdminPasswordHash(): string | null {
  const b64Raw = process.env.ADMIN_PASSWORD_HASH_B64?.trim();
  const plainRaw = process.env.ADMIN_PASSWORD_HASH?.trim();

  const tryPlain = (): string | null => {
    const raw = process.env.ADMIN_PASSWORD_HASH;
    if (!raw?.trim()) return null;
    return parseAdminBcryptHash(raw) ?? tryParseHashFromLikelyBase64(raw);
  };

  if (b64Raw) {
    const b64 = stripEnvQuotes(b64Raw)
      .split("#")[0]
      .trim()
      .replace(/\s+/g, "");
    try {
      const decoded = Buffer.from(b64, "base64").toString("utf8");
      const h = parseAdminBcryptHash(decoded);
      if (h) return h;
      logHashParseHint("b64");
      console.error(
        "ADMIN_PASSWORD_HASH_B64 is invalid (wrong value, truncated base64, or bad decode).",
      );
    } catch {
      console.error("ADMIN_PASSWORD_HASH_B64 is not valid base64");
    }
    if (plainRaw) {
      const fromPlain = tryPlain();
      if (fromPlain) {
        console.warn(
          "[auth] Using ADMIN_PASSWORD_HASH because ADMIN_PASSWORD_HASH_B64 did not decode to a valid bcrypt hash. Remove or fix B64 to avoid this warning.",
        );
        return fromPlain;
      }
      logHashParseHint("plain");
    }
    console.error(
      "Fix B64 with: npm run admin:hash-password -- \"YourPassword\" (paste ADMIN_PASSWORD_HASH_B64 only), or fix ADMIN_PASSWORD_HASH.",
    );
    return null;
  }

  if (!plainRaw) return null;
  const h = tryPlain();
  if (!h) {
    logHashParseHint("plain");
    const hint = process.env.ADMIN_PASSWORD_HASH
      ? describeWrongHashEnvValue(process.env.ADMIN_PASSWORD_HASH)
      : "";
    console.error(
      `ADMIN_PASSWORD_HASH is not a valid bcrypt hash (${hint}). Generate: npm run admin:hash-password -- "YourLoginPassword" — then set ADMIN_PASSWORD_HASH_B64=<printed line> or ADMIN_PASSWORD_HASH='<60-char $2…>' in single quotes.`,
    );
  }
  return h;
}

export const credentialsProvider = Credentials({
  name: "Credentials",
  credentials: {
    email: { label: "Email", type: "email" },
    password: { label: "Password", type: "password" },
  },
  async authorize(credentials) {
    const email = credentials?.email as string | undefined;
    const password = credentials?.password as string | undefined;
    if (!email || !password) return null;

    if (!process.env.AUTH_SECRET?.trim()) {
      console.warn(
        "AUTH_SECRET is empty — set it in .env.local (openssl rand -base64 32). Sessions may not work reliably.",
      );
    }

    const adminEmail = process.env.ADMIN_EMAIL;
    const hash = resolveAdminPasswordHash();
    if (!adminEmail) {
      console.error("ADMIN_EMAIL is not configured");
      return null;
    }
    if (!hash) {
      const hasHashEnv =
        Boolean(process.env.ADMIN_PASSWORD_HASH_B64?.trim()) ||
        Boolean(process.env.ADMIN_PASSWORD_HASH?.trim());
      if (!hasHashEnv) {
        console.error(
          "Admin password hash is not configured (set ADMIN_PASSWORD_HASH_B64 or ADMIN_PASSWORD_HASH)",
        );
      }
      return null;
    }

    if (isRateLimited(email)) {
      if (process.env.AUTH_DEBUG_LOGIN === "1") {
        console.info("[auth debug] rate limited for this email (restart dev or wait 15m, or unset AUTH_RATE_LIMIT_IN_DEV)");
      }
      return null;
    }

    const emailNorm = email.trim().toLowerCase();
    const adminNorm = adminEmail.trim().toLowerCase();
    if (emailNorm !== adminNorm) {
      recordFailure(email);
      if (process.env.AUTH_DEBUG_LOGIN === "1") {
        console.info("[auth debug] email mismatch (login vs ADMIN_EMAIL length)", emailNorm.length, adminNorm.length);
      }
      return null;
    }

    if (!hash.startsWith("$2")) {
      console.error(
        "Resolved admin password hash does not look like bcrypt (should start with $2a$, $2b$, or $2y$)",
      );
      return null;
    }

    if (process.env.AUTH_DEBUG_LOGIN === "1") {
      console.info("[auth debug] email ok, hashLen", hash.length, "prefix", hash.slice(0, 7));
    }

    const ok = await bcrypt.compare(password, hash);
    if (!ok) {
      recordFailure(email);
      if (process.env.AUTH_DEBUG_LOGIN === "1") {
        console.info("[auth debug] bcrypt.compare returned false (wrong password or hash not for this password)");
      }
      return null;
    }

    clearFailures(email);
    return { id: "admin", email, name: "Admin" };
  },
});
