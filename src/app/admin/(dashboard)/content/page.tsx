import { getAllContentEntriesAdmin } from "@/lib/admin-queries";
import { getContentDefaultsForAdmin } from "@/lib/content-defaults";
import { isDeepLConfigured } from "@/lib/admin-translate";
import { isDatabaseConfigured } from "@/db/index";
import ContentEditor from "./ContentEditor";

export default async function AdminContentPage() {
  const dbOk = isDatabaseConfigured();
  const rows = dbOk ? await getAllContentEntriesAdmin() : [];
  const defaults = getContentDefaultsForAdmin();
  const translationEnabled = isDeepLConfigured();

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-content-primary">Page copy</h1>
      <p className="mt-2 max-w-2xl text-sm text-content-secondary">
        Each section saves separately. Built-in defaults are shown for reference. Leave “Your text” empty to use the
        default. WhatsApp links use{" "}
        <a className="text-primary hover:underline" href="/admin/settings">
          site settings
        </a>
        .
      </p>
      {!translationEnabled && (
        <p className="mt-3 max-w-2xl text-xs text-content-secondary">
          Optional: set <code className="rounded bg-surface-subtle px-1">DEEPL_API_KEY</code> in the environment to
          enable “Suggest translations” (copy is sent to DeepL—review before publishing).
        </p>
      )}

      {!dbOk && (
        <p className="mt-6 text-sm text-amber-800">Set DATABASE_URL and run migrations to store copy overrides.</p>
      )}

      <div className="mt-8">
        <ContentEditor
          initialRows={rows}
          defaults={defaults}
          translationEnabled={translationEnabled}
        />
      </div>
    </div>
  );
}
