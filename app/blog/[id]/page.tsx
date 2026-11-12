import { Metadata } from "next"
import { notFound } from "next/navigation"
import { getBlogById, getAllBlogs, getLatestBlogs } from "@/lib/supabase"
import BlogDetailClient, { BlogPostDetail } from "./BlogDetailClient"

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
      title: "Artikel Tidak Ditemukan",
    }
  }

  const blog = await getBlogById(blogId)

  if (!blog) {
    return {
      title: "Artikel Tidak Ditemukan",
      description: "Artikel yang Anda cari tidak dapat ditemukan.",
    }
  }

  const title = blog.title
  const description = blog.excerpt || blog.title
  const url = `https://amymeij.web.id/blog/${blog.id}`
  const imageUrl = blog.image_url || "https://1h1v9ndzh4okzjrr.public.blob.vercel-storage.com/amymeij-LB69SQ3DTpLlezoXEDVbOpdg9hG5Ud"

  return {
    title: title,
    description: description,
    authors: [{ name: blog.author || "Ahmad Meijlan Yasir" }],
    alternates: {
      canonical: url,
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

export default async function BlogDetailPage({ params }: BlogPageProps) {
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

  const latest = await getLatestBlogs(10)
  const filteredLatest = latest.filter((b) => b.id !== blogId)

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": blog.title,
    "description": blog.excerpt,
    "image": blog.image_url,
    "datePublished": blog.date,
    "dateModified": blog.updated_at || blog.date,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://amymeij.web.id/blog/${blog.id}`,
    },
    "author": {
      "@type": "Person",
      "name": blog.author || "Ahmad Meijlan Yasir",
      "url": "https://amymeij.web.id",
    },
    "publisher": {
      "@type": "Person",
      "name": "Ahmad Meijlan Yasir",
      "url": "https://amymeij.web.id",
    },
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Beranda",
        "item": "https://amymeij.web.id",
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://amymeij.web.id/blog",
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": blog.title,
        "item": `https://amymeij.web.id/blog/${blog.id}`,
      },
    ],
  }

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
        latestBlogs={filteredLatest as BlogPostDetail[]}
        prevBlog={prevBlog as BlogPostDetail | null}
        nextBlog={nextBlog as BlogPostDetail | null}
      />
    </>
  )
}
