import { notFound } from "next/navigation";
import { getServiceByIdAdmin } from "@/lib/admin-queries";
import { isDeepLConfigured } from "@/lib/admin-translate";
import ServiceForm from "../ServiceForm";

type Props = { params: Promise<{ id: string }> };

export default async function EditServicePage({ params }: Props) {
  const { id } = await params;
  const data = await getServiceByIdAdmin(id);
  if (!data) notFound();
  const translationEnabled = isDeepLConfigured();

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-content-primary">Edit service</h1>
      <p className="mt-2 text-sm text-content-secondary">{data.service.slug}</p>
      <div className="mt-8">
        <ServiceForm
          service={data.service}
          i18n={data.i18n}
          translationEnabled={translationEnabled}
        />
      </div>
    </div>
  );
}
