import {
  boolean,
  integer,
  pgTable,
  primaryKey,
  text,
  uuid,
} from "drizzle-orm/pg-core";

/** Singleton row id=1: WhatsApp, contact, optional hero image URL. */
export const siteSettings = pgTable("site_settings", {
  id: integer("id").primaryKey().default(1),
  whatsappE164: text("whatsapp_e164").notNull(),
  contactEmail: text("contact_email"),
  heroImageUrl: text("hero_image_url"),
});

export const serviceOfferings = pgTable("service_offerings", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: text("slug").notNull().unique(),
  sortOrder: integer("sort_order").notNull().default(0),
  published: boolean("published").notNull().default(true),
  iconKey: text("icon_key").notNull(),
});

export const serviceOfferingI18n = pgTable(
  "service_offering_i18n",
  {
    serviceId: uuid("service_id")
      .notNull()
      .references(() => serviceOfferings.id, { onDelete: "cascade" }),
    locale: text("locale").notNull(),
    title: text("title").notNull(),
    description: text("description").notNull(),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.serviceId, t.locale] }),
  })
);

export const galleryItems = pgTable("gallery_items", {
  id: uuid("id").defaultRandom().primaryKey(),
  category: text("category").notNull(),
  imageUrl: text("image_url").notNull(),
  imageAlt: text("image_alt").notNull(),
  objectPosition: text("object_position"),
  priceFrom: integer("price_from").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const galleryItemI18n = pgTable(
  "gallery_item_i18n",
  {
    galleryItemId: uuid("gallery_item_id")
      .notNull()
      .references(() => galleryItems.id, { onDelete: "cascade" }),
    locale: text("locale").notNull(),
    caption: text("caption"),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.galleryItemId, t.locale] }),
  })
);

/** Dot-key per locale, e.g. hero.headline + en → value. */
export const contentEntries = pgTable(
  "content_entries",
  {
    entryKey: text("entry_key").notNull(),
    locale: text("locale").notNull(),
    value: text("value").notNull(),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.entryKey, t.locale] }),
  })
);
