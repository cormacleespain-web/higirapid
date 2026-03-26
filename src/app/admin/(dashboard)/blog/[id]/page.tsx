import { notFound } from "next/navigation";
import { getBlogPostByIdAdmin } from "@/lib/admin-queries";
import BlogPostForm from "../BlogPostForm";

type Props = { params: Promise<{ id: string }> };

export default async function EditBlogPostPage({ params }: Props) {
  const { id } = await params;
  const data = await getBlogPostByIdAdmin(id);
  if (!data) notFound();

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-content-primary">Edit blog post</h1>
      <p className="mt-2 text-sm text-content-secondary">{data.post.slug}</p>
      <div className="mt-8">
        <BlogPostForm post={data.post} categories={data.categories} i18n={data.i18n} />
      </div>
    </div>
  );
}
