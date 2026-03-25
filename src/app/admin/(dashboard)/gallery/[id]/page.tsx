import { notFound } from "next/navigation";
import { getGalleryItemByIdAdmin } from "@/lib/admin-queries";
import GalleryItemForm from "../GalleryItemForm";

type Props = { params: Promise<{ id: string }> };

export default async function EditGalleryItemPage({ params }: Props) {
  const { id } = await params;
  const data = await getGalleryItemByIdAdmin(id);
  if (!data) notFound();

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-content-primary">Edit gallery item</h1>
      <div className="mt-8">
        <GalleryItemForm item={data.item} i18n={data.i18n} />
      </div>
    </div>
  );
}
