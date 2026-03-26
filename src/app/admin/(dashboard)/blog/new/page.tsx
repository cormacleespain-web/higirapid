import BlogPostForm from "../BlogPostForm";
import { getBlogCategoriesAdmin } from "@/lib/admin-queries";

export default async function NewBlogPostPage() {
  const categories = await getBlogCategoriesAdmin();
  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-content-primary">New blog post</h1>
      <p className="mt-2 text-sm text-content-secondary">Create a post in English and provide Spanish/Catalan translations.</p>
      <div className="mt-8">
        <BlogPostForm post={null} categories={categories} i18n={[]} />
      </div>
    </div>
  );
}
