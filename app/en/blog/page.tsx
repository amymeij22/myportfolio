import type { Metadata } from "next"
import { getAllBlogs } from "@/lib/supabase"
import BlogListClient, { BlogPostItem } from "../../blog/BlogListClient"
import { getBlogCollectionSchema, getBreadcrumbSchema } from "@/lib/seo-schema"

export const revalidate = 60

export const metadata: Metadata = {
  title: "Articles & Perspectives — Ahmad Meijlan Yasir | Technology, IoT & Research Insights",
  description:
    "Engineering analyses, technical field notes, and perspectives on instrumentation, Internet of Things (IoT), artificial intelligence, and software systems by Ahmad Meijlan Yasir.",
  keywords: [
    "Ahmad Meijlan Yasir Blog",
    "IoT Articles",
    "Machine Learning Engineering",
    "Systems Architecture",
    "Web Engineering",
    "Next.js",
    "Meteorological Instrumentation",
    "Applied Research Notes",
  ],
  alternates: {
    canonical: "https://amymeij.web.id/en/blog",
    languages: {
      "id-ID": "https://amymeij.web.id/blog",
      "en-US": "https://amymeij.web.id/en/blog",
      "x-default": "https://amymeij.web.id/blog",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "id_ID",
    url: "https://amymeij.web.id/en/blog",
    title: "Articles & Perspectives — Ahmad Meijlan Yasir",
    description:
      "A curation of articles, technical field notes, and systems engineering insights by Ahmad Meijlan Yasir.",
    siteName: "Ahmad Meijlan Yasir",
    images: [
      {
        url: "https://amymeij.web.id/images/og-image.jpg",
        secureUrl: "https://amymeij.web.id/images/og-image.jpg",
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "Articles & Perspectives — Ahmad Meijlan Yasir",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Articles & Perspectives — Ahmad Meijlan Yasir",
    description:
      "A curation of articles, technical field notes, and systems engineering insights by Ahmad Meijlan Yasir.",
    images: [
      {
        url: "https://amymeij.web.id/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Articles & Perspectives — Ahmad Meijlan Yasir",
      },
    ],
    creator: "@amymeij",
  },
}

export default async function BlogPageEn() {
  const blogs = await getAllBlogs()
  const collectionSchema = getBlogCollectionSchema(blogs as BlogPostItem[])
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "https://amymeij.web.id/en" },
    { name: "Blog", url: "https://amymeij.web.id/en/blog" },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <BlogListClient initialBlogs={blogs as BlogPostItem[]} />
    </>
  )
}
