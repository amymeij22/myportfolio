import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog & Articles",
  description: "Kumpulan artikel dan tulisan terbaru dari Ahmad Meijlan Yasir tentang teknologi, IoT, machine learning, instrumentasi, dan pengembangan web.",
  alternates: {
    canonical: 'https://amymeij.web.id/blog',
  },
  openGraph: {
    title: "Blog & Articles | Ahmad Meijlan Yasir",
    description: "Kumpulan artikel dan tulisan terbaru tentang teknologi, IoT, machine learning, dan instrumentasi.",
    url: "https://amymeij.web.id/blog",
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
      "item": "https://amymeij.web.id"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Blog & Articles",
      "item": "https://amymeij.web.id/blog"
    }
  ]
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="w-full">
        {children}
      </div>
    </>
  )
}
