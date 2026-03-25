/**
 * Seed Neon after migrations: `npm run db:seed`
 * Requires DATABASE_URL in .env or .env.local
 */
import { config } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import fs from "fs";
import path from "path";
import {
  galleryItemI18n,
  galleryItems,
  serviceOfferingI18n,
  serviceOfferings,
  siteSettings,
} from "./schema";

config({ path: path.join(process.cwd(), ".env.local") });
config();

const serviceSlugs = ["upholstery", "carpet", "rug", "car", "hygiene"] as const;

const GALLERY_SEED = [
  {
    category: "car" as const,
    imageUrl: "/images/car-seats-after-cleaning.png",
    imageAlt: "Car seats after cleaning",
    caption: "Car seats",
    priceFrom: 45,
    sortOrder: 0,
    objectPosition: null as string | null,
  },
  {
    category: "car" as const,
    imageUrl: "/images/car-interior-after-cleaning.png",
    imageAlt: "Car interior after cleaning",
    caption: "Car interior",
    priceFrom: 65,
    sortOrder: 1,
    objectPosition: null,
  },
  {
    category: "upholstery" as const,
    imageUrl: "/images/sofa-after-cleaning.png",
    imageAlt: "Sofa after cleaning",
    caption: "Sofa",
    priceFrom: 55,
    sortOrder: 2,
    objectPosition: "bottom" as const,
  },
  {
    category: "upholstery" as const,
    imageUrl: "/images/armchair-after-cleaning.png",
    imageAlt: "Armchair after cleaning",
    caption: "Armchair",
    priceFrom: 35,
    sortOrder: 3,
    objectPosition: "bottom" as const,
  },
  {
    category: "carpet" as const,
    imageUrl: "/images/carpet-after-cleaning.png",
    imageAlt: "Carpet after cleaning",
    caption: "Carpet",
    priceFrom: 40,
    sortOrder: 4,
    objectPosition: null,
  },
  {
    category: "rug" as const,
    imageUrl: "/images/rug-after-cleaning.png",
    imageAlt: "Rug after cleaning",
    caption: "Rug",
    priceFrom: 50,
    sortOrder: 5,
    objectPosition: null,
  },
  {
    category: "business" as const,
    imageUrl: "/images/office-upholstery-cleaning.png",
    imageAlt: "Office upholstery cleaning",
    caption: "Office cleaning",
    priceFrom: 120,
    sortOrder: 6,
    objectPosition: null,
  },
  {
    category: "business" as const,
    imageUrl: "/images/commercial-space-after-cleaning.png",
    imageAlt: "Commercial space after cleaning",
    caption: "Commercial space",
    priceFrom: 150,
    sortOrder: 7,
    objectPosition: null,
  },
];

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.error("DATABASE_URL is not set");
    process.exit(1);
  }

  const db = drizzle(neon(url), {
    schema: { siteSettings, serviceOfferings, serviceOfferingI18n, galleryItems, galleryItemI18n },
  });

  const wa =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "") || "34600000000";

  await db
    .insert(siteSettings)
    .values({
      id: 1,
      whatsappE164: wa,
      contactEmail: process.env.CONTACT_EMAIL ?? null,
      heroImageUrl: null,
    })
    .onConflictDoUpdate({
      target: siteSettings.id,
      set: { whatsappE164: wa },
    });
  console.log("Seeded site_settings id=1");

  const existingServices = await db.select().from(serviceOfferings).limit(1);
  if (existingServices.length === 0) {
    const messagesDir = path.join(process.cwd(), "src/i18n/messages");
    const en = JSON.parse(fs.readFileSync(path.join(messagesDir, "en.json"), "utf8")) as Record<
      string,
      Record<string, Record<string, string>>
    >;
    const es = JSON.parse(fs.readFileSync(path.join(messagesDir, "es.json"), "utf8")) as typeof en;
    const ca = JSON.parse(fs.readFileSync(path.join(messagesDir, "ca.json"), "utf8")) as typeof en;

    let order = 0;
    for (const slug of serviceSlugs) {
      const [svc] = await db
        .insert(serviceOfferings)
        .values({
          slug,
          sortOrder: order++,
          published: true,
          iconKey: slug,
        })
        .returning({ id: serviceOfferings.id });
      if (!svc) continue;

      const sEn = en.services?.[slug];
      const sEs = es.services?.[slug];
      const sCa = ca.services?.[slug];
      if (sEn) {
        await db.insert(serviceOfferingI18n).values({
          serviceId: svc.id,
          locale: "en",
          title: sEn.title,
          description: sEn.description,
        });
      }
      if (sEs) {
        await db.insert(serviceOfferingI18n).values({
          serviceId: svc.id,
          locale: "es",
          title: sEs.title,
          description: sEs.description,
        });
      }
      if (sCa) {
        await db.insert(serviceOfferingI18n).values({
          serviceId: svc.id,
          locale: "ca",
          title: sCa.title,
          description: sCa.description,
        });
      }
    }
    console.log(`Seeded ${serviceSlugs.length} services`);
  } else {
    console.log("Services already present, skip service seed");
  }

  const existingGallery = await db.select().from(galleryItems).limit(1);
  if (existingGallery.length === 0) {
    for (const row of GALLERY_SEED) {
      const [item] = await db
        .insert(galleryItems)
        .values({
          category: row.category,
          imageUrl: row.imageUrl,
          imageAlt: row.imageAlt,
          objectPosition: row.objectPosition,
          priceFrom: row.priceFrom,
          sortOrder: row.sortOrder,
        })
        .returning({ id: galleryItems.id });

      for (const loc of ["en", "es", "ca"] as const) {
        await db.insert(galleryItemI18n).values({
          galleryItemId: item.id,
          locale: loc,
          caption: row.caption,
        });
      }
    }
    console.log(`Seeded ${GALLERY_SEED.length} gallery items`);
  } else {
    console.log("Gallery already present, skip gallery seed");
  }

  console.log("Done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
