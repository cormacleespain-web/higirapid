import { isDeepLConfigured } from "@/lib/admin-translate";
import ServiceForm from "../ServiceForm";

export default async function NewServicePage() {
  const translationEnabled = isDeepLConfigured();
  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-content-primary">New service</h1>
      <p className="mt-2 text-sm text-content-secondary">
        Slug must be unique. Fill at least one language completely.
      </p>
      <div className="mt-8">
        <ServiceForm service={null} i18n={[]} translationEnabled={translationEnabled} />
      </div>
    </div>
  );
}
