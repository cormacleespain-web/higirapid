/**
 * Overwrite `services.<slugKey>.title` and `.description` in locale JSON files
 * from Neon `service_offerings` + `service_offering_i18n` (ordered by sort_order).
 *
 * Prerequisite: remote DB schema must match `src/db/schema.ts` (run `npm run db:migrate` on Neon).
 *
 * Usage: `npm run i18n:sync-services` (requires DATABASE_URL in .env.local)
 */
import { config } from "dotenv";
import path from "path";
import fs from "fs";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { asc, eq } from "drizzle-orm";
import { serviceOfferingI18n, serviceOfferings } from "../src/db/schema";

config({ path: path.join(process.cwd(), ".env.local") });
config();

function slugToMessageKey(slug: string): string {
  const parts = slug.split("-").filter(Boolean);
  if (parts.length === 0) return slug;
  return parts[0] + parts.slice(1).map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join("");
}

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.error("DATABASE_URL is not set (.env.local)");
    process.exit(1);
  }

  const db = drizzle(neon(url), { schema: { serviceOfferings, serviceOfferingI18n } });
  const services = await db
    .select()
    .from(serviceOfferings)
    .orderBy(asc(serviceOfferings.sortOrder), asc(serviceOfferings.slug));

  const messagesDir = path.join(process.cwd(), "src/i18n/messages");
  const locales = ["en", "es", "ca"] as const;

  for (const loc of locales) {
    const filePath = path.join(messagesDir, `${loc}.json`);
    const raw = fs.readFileSync(filePath, "utf8");
    const data = JSON.parse(raw) as Record<string, unknown>;
    const servicesBlock = { ...((data.services as Record<string, unknown>) ?? {}) };

    for (const s of services) {
      const key = slugToMessageKey(s.slug);
      const rows = await db
        .select()
        .from(serviceOfferingI18n)
        .where(eq(serviceOfferingI18n.serviceId, s.id));
      const row = rows.find((r) => r.locale === loc) ?? rows.find((r) => r.locale === "en");
      if (!row) continue;

      const prev = (servicesBlock[key] as Record<string, string> | undefined) ?? {};
      servicesBlock[key] = {
        ...prev,
        title: row.title,
        description: row.description,
      };
    }

    data.services = servicesBlock;
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + "\n", "utf8");
    console.log(`Updated ${loc}.json`);
  }

  console.log("Done. Review diffs and commit.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
