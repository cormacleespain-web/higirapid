ALTER TABLE "service_offerings" ADD COLUMN IF NOT EXISTS "image_url" text;
--> statement-breakpoint
ALTER TABLE "service_offerings" ADD COLUMN IF NOT EXISTS "image_object_position" text;
--> statement-breakpoint
ALTER TABLE "service_offerings" ADD COLUMN IF NOT EXISTS "price_from" integer;
--> statement-breakpoint
ALTER TABLE "service_offering_i18n" ADD COLUMN IF NOT EXISTS "image_alt" text;
--> statement-breakpoint
ALTER TABLE "hr_club_leads" ADD COLUMN IF NOT EXISTS "service_slug" text;
