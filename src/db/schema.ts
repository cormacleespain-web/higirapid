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
  hrClubRecipientEmail: text("hr_club_recipient_email"),
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

export const blogPosts = pgTable("blog_posts", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: text("slug").notNull().unique(),
  categoryId: uuid("category_id").references(() => blogCategories.id, { onDelete: "set null" }),
  status: text("status").notNull().default("draft"),
  published: boolean("published").notNull().default(false),
  sortOrder: integer("sort_order").notNull().default(0),
  publishedAt: text("published_at"),
  primaryImageUrl: text("primary_image_url"),
  primaryImageAlt: text("primary_image_alt"),
  primaryImageObjectPosition: text("primary_image_object_position"),
  articleImageUrls: text("article_image_urls"),
});

export const blogCategories = pgTable("blog_categories", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: text("slug").notNull().unique(),
  sortOrder: integer("sort_order").notNull().default(0),
  active: boolean("active").notNull().default(true),
});

export const blogCategoryI18n = pgTable(
  "blog_category_i18n",
  {
    categoryId: uuid("category_id")
      .notNull()
      .references(() => blogCategories.id, { onDelete: "cascade" }),
    locale: text("locale").notNull(),
    label: text("label").notNull(),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.categoryId, t.locale] }),
  })
);

export const blogPostI18n = pgTable(
  "blog_post_i18n",
  {
    postId: uuid("post_id")
      .notNull()
      .references(() => blogPosts.id, { onDelete: "cascade" }),
    locale: text("locale").notNull(),
    title: text("title").notNull(),
    excerpt: text("excerpt").notNull(),
    body: text("body").notNull(),
    seoTitle: text("seo_title"),
    seoDescription: text("seo_description"),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.postId, t.locale] }),
  })
);

export const hrClubLeads = pgTable("hr_club_leads", {
  id: uuid("id").defaultRandom().primaryKey(),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
  locale: text("locale").notNull(),
  sourcePath: text("source_path").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  inquiryType: text("inquiry_type").notNull(),
  message: text("message").notNull(),
  consent: boolean("consent").notNull().default(false),
  status: text("status").notNull().default("new"),
  internalNotes: text("internal_notes"),
  contactedAt: text("contacted_at"),
  closedAt: text("closed_at"),
});
