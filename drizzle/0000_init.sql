CREATE TABLE "content_entries" (
	"entry_key" text NOT NULL,
	"locale" text NOT NULL,
	"value" text NOT NULL,
	CONSTRAINT "content_entries_entry_key_locale_pk" PRIMARY KEY("entry_key","locale")
);
--> statement-breakpoint
CREATE TABLE "gallery_item_i18n" (
	"gallery_item_id" uuid NOT NULL,
	"locale" text NOT NULL,
	"caption" text,
	CONSTRAINT "gallery_item_i18n_gallery_item_id_locale_pk" PRIMARY KEY("gallery_item_id","locale")
);
--> statement-breakpoint
CREATE TABLE "gallery_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"category" text NOT NULL,
	"image_url" text NOT NULL,
	"image_alt" text NOT NULL,
	"object_position" text,
	"price_from" integer NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "service_offering_i18n" (
	"service_id" uuid NOT NULL,
	"locale" text NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	CONSTRAINT "service_offering_i18n_service_id_locale_pk" PRIMARY KEY("service_id","locale")
);
--> statement-breakpoint
CREATE TABLE "service_offerings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"published" boolean DEFAULT true NOT NULL,
	"icon_key" text NOT NULL,
	CONSTRAINT "service_offerings_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "site_settings" (
	"id" integer PRIMARY KEY DEFAULT 1 NOT NULL,
	"whatsapp_e164" text NOT NULL,
	"contact_email" text,
	"hero_image_url" text
);
--> statement-breakpoint
ALTER TABLE "gallery_item_i18n" ADD CONSTRAINT "gallery_item_i18n_gallery_item_id_gallery_items_id_fk" FOREIGN KEY ("gallery_item_id") REFERENCES "public"."gallery_items"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "service_offering_i18n" ADD CONSTRAINT "service_offering_i18n_service_id_service_offerings_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."service_offerings"("id") ON DELETE cascade ON UPDATE no action;