import type { Metadata } from "next"
import { getAllBlogs } from "@/lib/supabase"
import BlogListClient, { BlogPostItem } from "./BlogListClient"
import { getBlogCollectionSchema, getBreadcrumbSchema } from "@/lib/seo-schema"

export const revalidate = 60

export const metadata: Metadata = {
  title: "Catatan & Gagasan — Ahmad Meijlan Yasir | Artikel Teknologi, IoT & Riset",
  description:
    "Eksplorasi wawasan, dokumentasi teknis, dan gagasan seputar instrumentasi, Internet of Things (IoT), kecerdasan buatan, keamanan siber, dan rekayasa web oleh Ahmad Meijlan Yasir.",
  keywords: [
    "Blog Ahmad Meijlan Yasir",
    "Artikel IoT",
    "Artikel Machine Learning",
    "Keamanan Siber",
    "Web Development",
    "Next.js",
    "Instrumentasi Meteorologi",
    "Catatan Rekayasa Sistem",
  ],
  alternates: {
    canonical: "https://amymeij.web.id/blog",
    languages: {
      "id-ID": "https://amymeij.web.id/blog",
      "en-US": "https://amymeij.web.id/en/blog",
      "x-default": "https://amymeij.web.id/blog",
    },
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    alternateLocale: "en_US",
    url: "https://amymeij.web.id/blog",
    title: "Catatan & Gagasan — Ahmad Meijlan Yasir",
    description:
      "Kumpulan artikel, catatan teknis, dan gagasan rekayasa sistem oleh Ahmad Meijlan Yasir.",
    siteName: "Ahmad Meijlan Yasir",
    images: [
      {
        url: "https://amymeij.web.id/images/og-image.jpg",
        secureUrl: "https://amymeij.web.id/images/og-image.jpg",
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "Catatan & Gagasan — Ahmad Meijlan Yasir",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Catatan & Gagasan — Ahmad Meijlan Yasir",
    description:
      "Kumpulan artikel, catatan teknis, dan gagasan rekayasa sistem oleh Ahmad Meijlan Yasir.",
    images: [
      {
        url: "https://amymeij.web.id/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Catatan & Gagasan — Ahmad Meijlan Yasir",
      },
    ],
    creator: "@amymeij",
  },
}

export default async function BlogPage() {
  const blogs = await getAllBlogs()
  const collectionSchema = getBlogCollectionSchema(blogs as BlogPostItem[])
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Beranda", url: "https://amymeij.web.id" },
    { name: "Blog", url: "https://amymeij.web.id/blog" },
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
