import GalleryItemForm from "../GalleryItemForm";

export default function NewGalleryItemPage() {
  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-content-primary">New gallery item</h1>
      <p className="mt-2 text-sm text-content-secondary">Upload sets a public Blob URL you can edit below.</p>
      <div className="mt-8">
        <GalleryItemForm item={null} i18n={[]} />
      </div>
    </div>
  );
}
