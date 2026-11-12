import { getAllBlogs } from "@/lib/supabase"
import BlogListClient, { BlogPostItem } from "./BlogListClient"

export default async function BlogPage() {
  const blogs = await getAllBlogs()

  return (
    <BlogListClient initialBlogs={blogs as BlogPostItem[]} />
  )
}
