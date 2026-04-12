import { revalidatePath } from "next/cache";
import { routing } from "@/i18n/routing";

/**
 * Invalidate cached public pages for all locales after CMS / DB changes.
 * Covers home layout, services, blog (index + posts), and standalone marketing routes.
 */
export function revalidateAllLocales() {
  for (const locale of routing.locales) {
    revalidatePath(`/${locale}`, "layout");
    revalidatePath(`/${locale}/services`);
    revalidatePath(`/${locale}/blog`, "layout");
    revalidatePath(`/${locale}/hr-club`);
    revalidatePath(`/${locale}/facade-cleaning`);
  }
}
