CREATE TABLE IF NOT EXISTS "blog_categories" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "slug" text NOT NULL,
  "sort_order" integer DEFAULT 0 NOT NULL,
  "active" boolean DEFAULT true NOT NULL,
  CONSTRAINT "blog_categories_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "blog_category_i18n" (
  "category_id" uuid NOT NULL,
  "locale" text NOT NULL,
  "label" text NOT NULL,
  CONSTRAINT "blog_category_i18n_category_id_locale_pk" PRIMARY KEY("category_id","locale")
);
--> statement-breakpoint
ALTER TABLE "blog_posts" ADD COLUMN IF NOT EXISTS "category_id" uuid;
--> statement-breakpoint
ALTER TABLE "blog_posts" ADD COLUMN IF NOT EXISTS "primary_image_url" text;
--> statement-breakpoint
ALTER TABLE "blog_posts" ADD COLUMN IF NOT EXISTS "primary_image_alt" text;
--> statement-breakpoint
ALTER TABLE "blog_posts" ADD COLUMN IF NOT EXISTS "primary_image_object_position" text;
--> statement-breakpoint
ALTER TABLE "blog_posts" ADD COLUMN IF NOT EXISTS "article_image_urls" text;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "blog_category_i18n" ADD CONSTRAINT "blog_category_i18n_category_id_blog_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."blog_categories"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "blog_posts" ADD CONSTRAINT "blog_posts_category_id_blog_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."blog_categories"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
