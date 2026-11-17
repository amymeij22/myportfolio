import { Metadata } from "next"
import { notFound } from "next/navigation"
import { getBlogById, getAllBlogs, getLatestBlogs } from "@/lib/supabase"
import BlogDetailClient, { BlogPostDetail } from "../../../blog/[id]/BlogDetailClient"
import { getBreadcrumbSchema } from "@/lib/seo-schema"

export const revalidate = 60

interface BlogPageProps {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  try {
    const blogs = await getAllBlogs()
    return (blogs || []).map((blog) => ({
      id: blog.id.toString(),
    }))
  } catch (err) {
    console.warn("Failed to generate static params for blogs:", err)
    return []
  }
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { id } = await params
  const blogId = parseInt(id, 10)

  if (isNaN(blogId)) {
    return {
      title: "Article Not Found",
    }
  }

  const blog = await getBlogById(blogId)

  if (!blog) {
    return {
      title: "Article Not Found",
      description: "The article you are looking for could not be found.",
    }
  }

  const title = blog.title
  const description = blog.excerpt || blog.title
  const url = `https://amymeij.web.id/en/blog/${blog.id}`
  const imageUrl = blog.image_url || "https://1h1v9ndzh4okzjrr.public.blob.vercel-storage.com/amymeij-LB69SQ3DTpLlezoXEDVbOpdg9hG5Ud"

  return {
    title: `${title} | Ahmad Meijlan Yasir`,
    description: description,
    authors: [{ name: blog.author || "Ahmad Meijlan Yasir" }],
    alternates: {
      canonical: url,
      languages: {
        "id-ID": `https://amymeij.web.id/blog/${blog.id}`,
        "en-US": `https://amymeij.web.id/en/blog/${blog.id}`,
        "x-default": `https://amymeij.web.id/blog/${blog.id}`,
      },
    },
    openGraph: {
      type: "article",
      url: url,
      title: `${title} | Ahmad Meijlan Yasir`,
      description: description,
      publishedTime: blog.date,
      authors: [blog.author || "Ahmad Meijlan Yasir"],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Ahmad Meijlan Yasir`,
      description: description,
      images: [imageUrl],
      creator: "@amymeij",
    },
  }
}

export default async function BlogDetailPageEn({ params }: BlogPageProps) {
  const { id } = await params
  const blogId = parseInt(id, 10)

  if (isNaN(blogId)) {
    notFound()
  }

  const blog = await getBlogById(blogId)

  if (!blog) {
    notFound()
  }

  // Fetch adjacent and latest blogs for navigation
  const allBlogs = await getAllBlogs()
  const sortedBlogs = [...allBlogs].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  const currentIndex = sortedBlogs.findIndex((b) => b.id === blogId)
  const prevBlog = currentIndex < sortedBlogs.length - 1 ? sortedBlogs[currentIndex + 1] : null
  const nextBlog = currentIndex > 0 ? sortedBlogs[currentIndex - 1] : null

  const latestBlogs = await getLatestBlogs(3)

  // Princeton GEO & Google Article Schema Markup
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.excerpt || blog.title,
    image: blog.image_url ? [blog.image_url] : [],
    datePublished: blog.date,
    dateModified: blog.date,
    inLanguage: "en-US",
    author: {
      "@type": "Person",
      name: blog.author || "Ahmad Meijlan Yasir",
      url: "https://amymeij.web.id/en",
    },
    publisher: {
      "@type": "Person",
      name: "Ahmad Meijlan Yasir",
      url: "https://amymeij.web.id/en",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://amymeij.web.id/en/blog/${blog.id}`,
    },
  }

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "https://amymeij.web.id/en" },
    { name: "Blog", url: "https://amymeij.web.id/en/blog" },
    { name: blog.title, url: `https://amymeij.web.id/en/blog/${blog.id}` },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <BlogDetailClient
        blog={blog as BlogPostDetail}
        latestBlogs={latestBlogs as BlogPostDetail[]}
        prevBlog={prevBlog as BlogPostDetail | null}
        nextBlog={nextBlog as BlogPostDetail | null}
      />
    </>
  )
}
